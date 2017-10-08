import * as constants from './constants'

export const getAll = state => state[constants.NAME]
export const getDetail = (state, ownProps) => getById(state, ownProps.match.params.valenceFrameId)
export const getById = (state, id) => getAll(state)[id]
