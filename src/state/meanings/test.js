import meanings from './index'

describe('meaning reducer', () => {
  it('should handle LOAD_SUCCESS', () => {
    const state = {}
    const action = meanings.actions.loadSuccess([{
      id: 'meaning1',
      val1: 'val1'
    }])

    const nextState = meanings.reducer(state, action)
    expect(nextState).toEqual({
      meaning1: {
        id: 'meaning1',
        val1: 'val1'
      }
    })
  });
  it('should handle CREATE_SUCCESS and UPDATE_SUCCESS', () => {
    const state = {
      meaning1: {
        id: 'meaning1',
        val: 'val0'
      }
    }
    const action = meanings.actions.updateSuccess({
      id: 'meaning1',
      val: 'val1'
    })

    const nextState = meanings.reducer(state, action)
    expect(nextState).toEqual({
      meaning1: {
        id: 'meaning1',
        val: 'val1'
      }
    })

    const action2 = meanings.actions.updateSuccess({
      id: 'meaning2',
      val: 'val3'
    })
    const nextState2 = meanings.reducer(nextState, action2)
    expect(nextState2).toEqual({
      meaning1: {
        id: 'meaning1',
        val: 'val1'
      },
      meaning2: {
        id: 'meaning2',
        val: 'val3'
      }
    })
  });
  it('should handle REMOVE_SUCCESS', () => {
    const state = {
      meaning1: {
        id: 'meaning1',
        val: 'val0'
      }
    }
    const action = meanings.actions.removeSuccess('meaning1')

    const nextState = meanings.reducer(state, action)
    expect(nextState).toEqual({})
  });
})