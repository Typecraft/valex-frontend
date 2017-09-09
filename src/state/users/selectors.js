export const getAll = state => state.users.all
export const getCurrentUserId = state => state.users.current
export const getCurrentUser = state => getAll(state)[state.users.current]