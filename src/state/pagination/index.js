import axios from 'axios'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import { configureSearchParams } from 'api/util'


const createTypes = (name) => ({
  INVALIDATE: `valex/${name}/pagination/invalidate`,
  INVALIDATE_ALL: `valex/${name}/pagination/invalidate-all`,
  LOAD: `valex/${name}/pagination/load`,
  LOAD_SUCCESS: `valex/${name}/pagination/load-success`,
  LOAD_ERROR: `valex/${name}/pagination/load-error`
})

const createReducer = (name, types) => (state = {}, {type, payload}) => {
  let { pagination = {} } = state
  switch (type) {
    case types.LOAD_SUCCESS:
      const { page, next, prev, results, config, count} = payload
      pagination = {
        ...pagination,
        [config]: {
          ...pagination[config],
          count: count,
          [page]: {
            page,
            results,
            prev,
            next
          }
        }
      }
      break
    case types.INVALIDATE:
      pagination = {
        ...pagination,
        [payload.config]: undefined
      }
      break
    case types.INVALIDATE_ALL:
      pagination = {}
      break
    default:
      break
  }
  return { ...state, pagination } 
}

const createActionCreators = (name, types) => ({
  load(page = 1, config = "") {
    return {
      type: types.LOAD,
      payload: {
        page,
        config
      }
    }
  },
  loadSuccess (data) {
    return {
      type: types.LOAD_SUCCESS,
      payload: data
    }
  },
  loadError (data) {
    return {
      type: types.LOAD_ERROR,
      payload: data
    }
  }
})


function readApi (url) {
  return axios.get(url).then(data => data.data)
}

const createSaga = (baseEndpoint, name, types, actions) => {
  function* load(action) {
    const { page, config } = action.payload
    const convertedConfig = config.constructor === String ? config : configureSearchParams(config)
    try {
      const finalQueryString = `?page=${page}&${convertedConfig}`
      const results = yield call(readApi, `${baseEndpoint}${finalQueryString}`)
      yield put(actions.loadSuccess(
        Object.assign(
          {config: config, page: page},
          results
        )
      ))
    } catch (e) {
      yield put(actions.loadError({
        detail: JSON.stringify(e.response.data),
        title: `Error loading page defined by: baseUrl=${baseEndpoint} config=${config} page=${page}`,
        meta: {...action.meta, payload: action.payload}
      }))
    }
  }

  return function* () {
    yield all([
      takeEvery(types.LOAD, load)
    ])
  }
}

export const createSelectors = (getState) => {
  const getAll = state => getState(state)
  const getConfig = (state, config) => getAll(state)[config || ""]
  const getConfigCount = (state, config) => (getConfig(state, config) || {}).count
  const getPage = (state, page, config) => (getConfig(state, config) || {})[page]
  const getPageResults = (state, page, config) => (getPage(state, page, config) || {}).results
  const getHasNext = (state, page, config) => (getPage(state, page, config) || {}).next !== null

  return {
    getAll,
    getConfig,
    getConfigCount,
    getPage,
    getPageResults,
    getHasNext
  }
}

export const withSelectors = (selectors, getState) => {
  return {
    ...selectors,
    pagination: createSelectors(getState)
  }
}

export default function createPaginationInterface(baseEndpoint, name, getState=null) {
  const types = createTypes(name)
  const reducer = createReducer(name, types)
  const actions = createActionCreators(name, types)
  const saga = createSaga(baseEndpoint, name, types, actions)

  return {
    actions,
    reducer,
    saga,
    types
  }
}
