import lemmas from './index'

describe('lemma reducer', () => {
  it('should handle LOAD_SUCCESS', () => {
    const state = {}
    const action = lemmas.actions.loadSuccess([{
      id: 'lemma1',
      val1: 'val1'
    }])

    const nextState = lemmas.reducer(state, action)
    expect(nextState).toEqual({
      lemma1: {
        id: 'lemma1',
        val1: 'val1'
      }
    })
  });
  it('should handle CREATE_SUCCESS and UPDATE_SUCCESS', () => {
    const state = {
      lemma1: {
        id: 'lemma1',
        val: 'val0'
      }
    }
    const action = lemmas.actions.updateSuccess({
      id: 'lemma1',
      val: 'val1'
    })

    const nextState = lemmas.reducer(state, action)
    expect(nextState).toEqual({
      lemma1: {
        id: 'lemma1',
        val: 'val1'
      }
    })

    const action2 = lemmas.actions.updateSuccess({
      id: 'lemma2',
      val: 'val3'
    })
    const nextState2 = lemmas.reducer(nextState, action2)
    expect(nextState2).toEqual({
      lemma1: {
        id: 'lemma1',
        val: 'val1'
      },
      lemma2: {
        id: 'lemma2',
        val: 'val3'
      }
    })
  });
  it('should handle REMOVE_SUCCESS', () => {
    const state = {
      lemma1: {
        id: 'lemma1',
        val: 'val0'
      }
    }
    const action = lemmas.actions.removeSuccess('lemma1')

    const nextState = lemmas.reducer(state, action)
    expect(nextState).toEqual({})
  });
})
