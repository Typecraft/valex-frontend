import $${moduleName} from './index'

describe('$${singularName} reducer', () => {
  it('should handle LOAD_SUCCESS', () => {
    const state = {}
    const action = $${moduleName}.actions.loadSuccess([{
      id: '$${singularName}1',
      val1: 'val1'
    }])

    const nextState = $${moduleName}.reducer(state, action)
    expect(nextState).toEqual({
      $${singularName}1: {
        id: '$${singularName}1',
        val1: 'val1'
      }
    })
  });
  it('should handle CREATE_SUCCESS and UPDATE_SUCCESS', () => {
    const state = {
      $${singularName}1: {
        id: '$${singularName}1',
        val: 'val0'
      }
    }
    const action = $${moduleName}.actions.updateSuccess({
      id: '$${singularName}1',
      val: 'val1'
    })

    const nextState = $${moduleName}.reducer(state, action)
    expect(nextState).toEqual({
      $${singularName}1: {
        id: '$${singularName}1',
        val: 'val1'
      }
    })

    const action2 = $${moduleName}.actions.updateSuccess({
      id: '$${singularName}2',
      val: 'val3'
    })
    const nextState2 = $${moduleName}.reducer(nextState, action2)
    expect(nextState2).toEqual({
      $${singularName}1: {
        id: '$${singularName}1',
        val: 'val1'
      },
      $${singularName}2: {
        id: '$${singularName}2',
        val: 'val3'
      }
    })
  });
  it('should handle REMOVE_SUCCESS', () => {
    const state = {
      $${singularName}1: {
        id: '$${singularName}1',
        val: 'val0'
      }
    }
    const action = $${moduleName}.actions.removeSuccess('$${singularName}1')

    const nextState = $${moduleName}.reducer(state, action)
    expect(nextState).toEqual({})
  });
})