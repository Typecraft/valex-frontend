import * as constants from './constants'

export const getAll = state => state[constants.NAME]
export const getDetail = (state, ownProps) => getAll(state)[ownProps.match.params.valenceFrameId]
