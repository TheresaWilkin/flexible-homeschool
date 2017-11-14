import { createSelector } from 'reselect';

export const getAuthenticated = state => state.auth.authenticated;
export const getAuthErrorMessage = state => state.auth.errorMessage;
export const getAuthError = state => state.auth.error;
export const getUserRoles = state => (state.auth.user ? state.auth.user.roles : {});

export const makeIsAuthorized = authorizedRoles => createSelector(
  [getUserRoles],
  userRoles => authorizedRoles.some(role => userRoles[role]),
);
