
import axios from "axios";
import { API_URL } from "../base";

export const apiLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        "email" :email,
        "password" : password
    },
    );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      throw new Error('Invalid credentials or network error');
    }
  };
  
  export const apiLogout = async (token: string) => {
    try {
        await axios.post(`${API_URL}/logout`, null, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    } catch (error) {
        throw new Error('failed to logout');
    }

  };
  
  export const apiChangePassword = async (oldPassword: string, newPassword: string, token: string) => {
    const response = await axios.post(`${API_URL}/change-password`, {
      oldPassword,
      newPassword,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  export const checkSession = async (): Promise<boolean> => {
    try {
      const response = await axios.get(`${API_URL}/user-session-status`);
      console.log(response);
      return response.data.metadata;
    } catch (error) {
      console.error("Erreur lors de la vérification de la session:", error);
      return false;
    }
  };