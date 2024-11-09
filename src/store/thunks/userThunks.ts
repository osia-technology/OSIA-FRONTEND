import { AppDispatch } from '../../app/store';
import { loginSuccess, logout, changePasswordSuccess } from '../slices/userSlice';
import { apiLogin, apiChangePassword, apiLogout } from '../../services/userServices/authServices';
import { User } from '../../models/user';

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await apiLogin(email, password);

    const user: User = {
      userId: response.metadata.user.userId,
      username: response.metadata.user.name,
      email: response.metadata.user.email,
      token: response.metadata.token,
      roles: response.metadata.user.roles,
      permissions: response.metadata.user.permissions,
      roleId: response.metadata.roleId
    };
    dispatch(loginSuccess(user));
    return response.metadata.user.roles[0];
  } catch (error) {
    throw new Error('Failed to login', error);
  }
};

export const performLogout = (token: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await apiLogout(token);
    dispatch(logout());
  } catch (error) {
    throw new Error('Failed to logout', error);
  }
};

export const changePassword = (oldPassword: string, newPassword: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await apiChangePassword(oldPassword, newPassword, token);

    dispatch(changePasswordSuccess(response.token));
  } catch (error) {
    console.error('Failed to change password', error);
  }
};
