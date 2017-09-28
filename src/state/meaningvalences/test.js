import meaningvalences from './index'

describe('meaningValence reducer', () => {
  it('should handle LOAD_SUCCESS', () => {
    const state = {}
    const action = meaningvalences.actions.loadSuccess([{
      id: 'meaningValence1',
      val1: 'val1'
    }])

    const nextState = meaningvalences.reducer(state, action)
    expect(nextState).toEqual({
      meaningValence1: {
        id: 'meaningValence1',
        val1: 'val1'
      }
    })
  });
  it('should handle CREATE_SUCCESS and UPDATE_SUCCESS', () => {
    const state = {
      meaningValence1: {
        id: 'meaningValence1',
        val: 'val0'
      }
    }
    const action = meaningvalences.actions.updateSuccess({
      id: 'meaningValence1',
      val: 'val1'
    })

    const nextState = meaningvalences.reducer(state, action)
    expect(nextState).toEqual({
      meaningValence1: {
        id: 'meaningValence1',
        val: 'val1'
      }
    })

    const action2 = meaningvalences.actions.updateSuccess({
      id: 'meaningValence2',
      val: 'val3'
    })
    const nextState2 = meaningvalences.reducer(nextState, action2)
    expect(nextState2).toEqual({
      meaningValence1: {
        id: 'meaningValence1',
        val: 'val1'
      },
      meaningValence2: {
        id: 'meaningValence2',
        val: 'val3'
      }
    })
  });
  it('should handle REMOVE_SUCCESS', () => {
    const state = {
      meaningValence1: {
        id: 'meaningValence1',
        val: 'val0'
      }
    }
    const action = meaningvalences.actions.removeSuccess('meaningValence1')

    const nextState = meaningvalences.reducer(state, action)
    expect(nextState).toEqual({})
  });
})