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
