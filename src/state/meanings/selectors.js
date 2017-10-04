import * as constants from './constants'

export const getAll = state => state[constants.NAME]
export const getById = (state, id) => getAll(state)[id]
export const getDetail = (state, ownProps) => getById(state, ownProps.match.params.meaningId)
export const getRelatedMeanings = (state, id) =>
  ((getById(state, id) || {}).relatedMeanings || []).map(relatedId => getById(state, relatedId))
export const getDetailRelatedMeanings = (state, ownProps) =>
  getRelatedMeanings(state, ownProps.match.params.meaningId)
