import lemmas from './lemmas'
import meanings from './meanings'
import meaningvalences from './meaningvalences'
import examples from './examples'
import { createSelector } from 'reselect'

export const getLemmaMeanings = createSelector(
  lemmas.selectors.getAll,
  meanings.selectors.getAll,
  (state, lemmaId) => lemmaId,
  (lemmas, meanings, lemmaId) => {
    const lemma = lemmas[lemmaId] || {}
    const lemmaMeanings = lemma.meanings || []
    return lemmaMeanings.reduce((acc, meaningId) => {
      acc[meaningId] = meanings[meaningId]
      return acc
    }, {})
  }
)


export const getMeaningValences = createSelector(
  meanings.selectors.getAll,
  meaningvalences.selectors.getAll,
  (state, meaningId) => meaningId,
  (meanings, valences, meaningId) => {
    const meaning = meanings[meaningId] || {}
    const meaningValences = meaning.valences || []
    return meaningValences.reduce((acc, valenceId) => {
      acc[valenceId] = valences[valenceId]
      return acc
    }, {})
  }
)


export const getMeaningValenceExamples = createSelector(
  meaningvalences.selectors.getAll,
  examples.selectors.getAll,
  (state, meaningValenceId) => meaningValenceId,
  (meaningValences, examples, meaningValenceId) => {
    const meaningValence = meaningValences[meaningValenceId] || {}
    const meaningValenceExamples = meaningValence.examples || []
    return meaningValenceExamples.reduce((acc, exampleId) => {
      acc[exampleId] = examples[exampleId]
      return acc
    }, {})
  }
)

export const getMeaningLemma = createSelector(
  meanings.selectors.getAll,
  lemmas.selectors.getAll,
  (state, meaningId) => meaningId,
  (meanings, lemmas, meaningId) => {
    const meaning = meanings[meaningId] || {}
    return lemmas[meaning.lemma]
  }
)

export const getMeaningDetailLemma =
  (state, ownProps) => getMeaningLemma(state, ownProps.match.params.meaningId)


export const getMeaningValenceMeaning = createSelector(
  meaningvalences.selectors.getById,
  meanings.selectors.getAll,
  (meaningValence, meanings) => meanings[(meaningValence || {}).meaning]
)
export const getMeaningValenceDetailMeaning =
  (state, ownProps) => getMeaningValenceMeaning(state, ownProps.match.params.meaningValenceId)

export const getMeaningValenceLemma = createSelector(
  meaningvalences.selectors.getById,
  meanings.selectors.getAll,
  lemmas.selectors.getAll,
  (meaningValence, meanings, lemmas) => {
    const meaning = meanings[(meaningValence || {}).meaning] || {}
    return lemmas[meaning.lemma]
  }
)

export const getMeaningValenceDetailLemma =
  (state, ownProps) => getMeaningValenceLemma(state, ownProps.match.params.meaningValenceId)