import examples from './index'

describe('example reducer', () => {
  it('should handle LOAD_SUCCESS', () => {
    const state = {}
    const action = examples.actions.loadSuccess([{
      id: 'example1',
      val1: 'val1'
    }])

    const nextState = examples.reducer(state, action)
    expect(nextState).toEqual({
      example1: {
        id: 'example1',
        val1: 'val1'
      }
    })
  });
  it('should handle CREATE_SUCCESS and UPDATE_SUCCESS', () => {
    const state = {
      example1: {
        id: 'example1',
        val: 'val0'
      }
    }
    const action = examples.actions.updateSuccess({
      id: 'example1',
      val: 'val1'
    })

    const nextState = examples.reducer(state, action)
    expect(nextState).toEqual({
      example1: {
        id: 'example1',
        val: 'val1'
      }
    })

    const action2 = examples.actions.updateSuccess({
      id: 'example2',
      val: 'val3'
    })
    const nextState2 = examples.reducer(nextState, action2)
    expect(nextState2).toEqual({
      example1: {
        id: 'example1',
        val: 'val1'
      },
      example2: {
        id: 'example2',
        val: 'val3'
      }
    })
  });
  it('should handle REMOVE_SUCCESS', () => {
    const state = {
      example1: {
        id: 'example1',
        val: 'val0'
      }
    }
    const action = examples.actions.removeSuccess('example1')

    const nextState = examples.reducer(state, action)
    expect(nextState).toEqual({})
  });
})