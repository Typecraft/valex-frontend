import * as constants from './constants'

export const getAll = state => state[constants.NAME]
export const getDetail = (state, props) => getById(state, props.match.params.lemmaId)
export const getById = (state, id) => getAll(state)[id]
