import axios from 'axios'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import { configureSearchParams } from 'api/util'


const createTypes = (name) => ({
  INVALIDATE: `nirissia/${name}/pagination/invalidate`,
  INVALIDATE_ALL: `nirissia/${name}/pagination/invalidate-all`,
  LOAD: `nirissia/${name}/pagination/load`,
  LOAD_SUCCESS: `nirissia/${name}/pagination/load-success`,
  LOAD_ERROR: `nirissia/${name}/pagination/load-error`
})

const createReducer = (name, types, reducerName) => {
  return (state = {[reducerName]: {}}, {type, payload = {}}) => {
    const { page, next, previous, results, config, count} = payload
    switch (type) {
      case types.LOAD:
        return {
          ...state,
          [reducerName]: {
            ...state[reducerName],
            [config]: {
              ...(state[reducerName] || {})[config],
              loading: (((state[reducerName] || {})[config] || {}).loading || 0) + 1
            }
          }
        }
      case types.LOAD_SUCCESS:
        return {
          ...state,
          [reducerName]: {
            ...state[reducerName],
            [config]: {
              ...(state[reducerName] || {})[config],
              count: count,
              loading: (((state[reducerName] || {})[config] || {}).loading || 0) - 1,
              [page]: {
                page,
                results,
                previous,
                next
              }
            }
          }
        }
      case types.INVALIDATE:
        return {
          ...state,
          [reducerName]: {
            [config]: undefined
          }
        }
      case types.INVALIDATE_ALL:
        return {
          ...state,
          pagination: {}
        }
      default:
        return { ...state } 
    }
  }
}

const createActionCreators = (name, types) => ({
  load(page = 1, config = "", meta=undefined) {
    return {
      type: types.LOAD,
      payload: {
        page,
        config,
        meta
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
  },
  invalidate (config = "", meta = undefined) {
    return {
      type: types.INVALIDATE,
      payload: {
        config,
        meta
      }
    }
  },
  invalidateAll () {
    return {
      type: types.INVALIDATE_ALL
    }
  }
})


function readApi (url) {
  return axios.get(url).then(data => data.data)
}

const createSaga = (baseEndpoint, name, types, actions) => {
  const endpointFunction = typeof baseEndpoint === 'function' ? baseEndpoint : () => baseEndpoint
  function* load(action) {
    const { page, config } = action.payload
    const convertedConfig = config.constructor === String ? config : configureSearchParams(config)
    try {
      const endpoint = endpointFunction(action, name, types, actions)
      const finalQueryString = `?page=${page}&${convertedConfig}`
      const results = yield call(readApi, `${endpoint}${finalQueryString}`)
      yield put(actions.loadSuccess(
        Object.assign(
          {config: config, page: page},
          results
        )
      ))
    } catch (e) {
      yield put(actions.loadError({
        detail: JSON.stringify((e.response || {}).data || e.toString()),
        title: `Error loading page defined by: baseUrl=${baseEndpoint} config=${config} page=${page}`,
        meta: {...action.meta, payload: action.payload}
      }))
    }
  }

  function* reload(action) {
    const { config, meta } = action.payload
    try {
      yield put(actions.load(1, config, meta))
    } catch (e) {
      yield put(actions.loadError({
        detail: JSON.stringify((e.response || {}).data || e.toString()),
        title: `Error reloading page 1 with config ${config} and meta ${meta}`,
        meta: {...action.meta, payload: action.payload}
      }))
    }
  }

  return function* () {
    yield all([
      takeEvery(types.LOAD, load),
      takeEvery(types.INVALIDATE, reload)
    ])
  }
}

export const createSelectors = (getState) => {
  const getAll = state => getState(state)
  const getConfig = (state, config) => (getAll(state) || {})[config || ""]
  const getConfigCount = (state, config) => (getConfig(state, config) || {}).count
  const getConfigPagesLoaded = (state, config) =>
    Object.values((getConfig(state, config) || {}))
      .filter(x => x.constructor === Object)
      .map(x => x.page)
  const getPage = (state, page, config) => (getConfig(state, config) || {})[page]
  const getPageResults = (state, page, config) => (getPage(state, page, config) || {}).results

  const getPagesUpTo = (state, maxPage, config) => {
    if (maxPage <= 0) {
      return []
    }
    return [...Array(maxPage || 1).keys()].map(page => getPage(state, page+1, config))
  }

  const getPagesUpToResults = (state, maxPage, config) =>
    getPagesUpTo(state, maxPage, config)
      .map(page => (page || {}).results)
      .reduce((acc, arr) => acc.concat(arr), [])

  const getHasNext = (state, page, config) => !!(getPage(state, page, config) || {}).next

  const getLastLoadedPageIndex = (state, config) =>
    Math.max.apply(null, getConfigPagesLoaded(state, config))

  const getLastLoadedPage = (state, config) =>
    (getConfig(state, config) || {})[(getLastLoadedPageIndex(state, config))]

  const getConfigHasNext = (state, config) =>
    !!(getLastLoadedPage(state, config) || {}).next

  const getConfigAllResults = (state, config) =>
    getPagesUpToResults(
      state,
      getLastLoadedPageIndex(state, config) || 1,
      config
    )

  const getIsLoading = (state, config) => (getConfig(state, config) || {}).loading > 0

  return {
    getAll,
    getConfig,
    getConfigCount,
    getPage,
    getPageResults,
    getPagesUpTo,
    getPagesUpToResults,
    getHasNext,
    getLastLoadedPageIndex,
    getLastLoadedPage,
    getConfigPagesLoaded,
    getConfigHasNext,
    getConfigAllResults,
    getIsLoading
  }
}

export const withSelectors = (selectors, getState, name='pagination') => {
  return {
    ...selectors,
    [name]: createSelectors(getState)
  }
}

export default function createPaginationInterface(baseEndpoint, name, getState) {
  const reducerName = `${name}-pagination`
  const types = createTypes(name)
  const reducer = createReducer(name, types, reducerName)
  const actions = createActionCreators(name, types)
  const saga = createSaga(baseEndpoint, name, types, actions)
  const _withSelectors = (selectors, getState) => withSelectors(selectors, getState, name)
  const selectors = createSelectors(state => getState(state)[reducerName])

  return {
    actions,
    reducer,
    reducerName,
    saga,
    selectors,
    types,
    withSelectors: _withSelectors
  }
}
