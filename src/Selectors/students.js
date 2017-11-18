export const getStudentIds = state => state.students.all;
export const getStudentById = (state, id) => state.students.byId[id];
export const getStudentError = (state) => state.students.error;
export const getStudentErrorMessage = (state) => state.students.errorMessage;
