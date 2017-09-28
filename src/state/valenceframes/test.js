import valenceframes from './index'

describe('valenceFrame reducer', () => {
  it('should handle LOAD_SUCCESS', () => {
    const state = {}
    const action = valenceframes.actions.loadSuccess([{
      id: 'valenceFrame1',
      val1: 'val1'
    }])

    const nextState = valenceframes.reducer(state, action)
    expect(nextState).toEqual({
      valenceFrame1: {
        id: 'valenceFrame1',
        val1: 'val1'
      }
    })
  });
  it('should handle CREATE_SUCCESS and UPDATE_SUCCESS', () => {
    const state = {
      valenceFrame1: {
        id: 'valenceFrame1',
        val: 'val0'
      }
    }
    const action = valenceframes.actions.updateSuccess({
      id: 'valenceFrame1',
      val: 'val1'
    })

    const nextState = valenceframes.reducer(state, action)
    expect(nextState).toEqual({
      valenceFrame1: {
        id: 'valenceFrame1',
        val: 'val1'
      }
    })

    const action2 = valenceframes.actions.updateSuccess({
      id: 'valenceFrame2',
      val: 'val3'
    })
    const nextState2 = valenceframes.reducer(nextState, action2)
    expect(nextState2).toEqual({
      valenceFrame1: {
        id: 'valenceFrame1',
        val: 'val1'
      },
      valenceFrame2: {
        id: 'valenceFrame2',
        val: 'val3'
      }
    })
  });
  it('should handle REMOVE_SUCCESS', () => {
    const state = {
      valenceFrame1: {
        id: 'valenceFrame1',
        val: 'val0'
      }
    }
    const action = valenceframes.actions.removeSuccess('valenceFrame1')

    const nextState = valenceframes.reducer(state, action)
    expect(nextState).toEqual({})
  });
})