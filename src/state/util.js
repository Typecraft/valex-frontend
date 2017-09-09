export function addByIdToObject(state, object) {
  return {
    ...state,
    [object.id]: object
  }
}

export function addManyByIdToObject(state, objects) {
  let clone = Object.assign({}, state)
  for (let object of objects) {
    clone[object.id] = object
  }
  return clone
}

export function removeFromObjectById(state, id) {
  return Object.keys(state)
    .filter(x => x !== id.toString())
    .reduce((acc, next) => {
      acc[next] = state[next]
      return acc
    }, {});
}
