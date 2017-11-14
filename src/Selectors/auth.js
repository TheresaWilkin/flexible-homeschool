import { createSelector } from 'reselect';

export const getAuthenticated = state => state.auth.authenticated;
export const getAuthErrorMessage = state => state.auth.errorMessage;
export const getAuthError = state => state.auth.error;
export const getUserRole = state => (state.auth.user ? state.auth.user.role : '');
export const getUserSchool = state => (state.auth.user ? state.auth.user.school : '');

export const makeIsAuthorized = authorizedRoles => createSelector(
  [getUserRole],
  userRole => authorizedRoles.includes(userRole),
);
