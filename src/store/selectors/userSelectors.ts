import { RootState } from '../../app/store';

export const selectUsername = (state: RootState) => state.user.user.username;
export const selectEmail = (state: RootState) => state.user.user.email;
export const selectToken = (state: RootState) => state.user.user.token;
export const selectUserId = (state: RootState) => state.user.user.userId;
export const selectRole = (state: RootState) => state.user.user.roles[0];
export const selectPermissions = (state: RootState) => state.user.user.permissions;
export const seclectRoleId = (state: RootState) => state.user.user.roleId;
