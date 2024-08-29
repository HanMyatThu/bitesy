import { useMutation } from "@tanstack/react-query";

import { api } from "@/services/api-client";
import { IUser } from "@/interfaces/IUser";
import { queryClient } from "@/services/query-client";
import { AxiosError } from "axios";

type tokens = {
  refresh: string;
  accessToken: string;
};

interface IUserLoginResponse {
  data: {
    profile: IUser;
    tokens: tokens;
  };
  error: null | { message: string };
}

interface IUserRegisterResponse {
  data: { message: string };
  error: null | { message: string };
}

interface IPayload {
  email: string;
  password: string;
  name?: string;
}

export function useUserLogin() {
  async function fetchUserLogin(payload: IPayload) {
    const { data } = await api.post<IUserLoginResponse>(`/api/auth/sign-in`, {
      ...payload,
    });

    //save token in session storage
    if (data.data.tokens) {
      sessionStorage.setItem("accesstoken", data.data.tokens.accessToken);
      sessionStorage.setItem("refreshtoken", data.data.tokens.refresh);
    }
    return data.data;
  }

  return useMutation({
    mutationFn: fetchUserLogin,
    onError: (e) => {
      const error = e as AxiosError<IUserLoginResponse>;
      throw new Error(error.response?.data.error?.message);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["user-login"] }),
  });
}

export function useUserRegister() {
  async function fetchUserRegister(payload: IPayload) {
    const { data } = await api.post<IUserRegisterResponse>(
      `/api/auth/sign-up`,
      {
        ...payload,
      },
    );

    return data.data;
  }

  return useMutation({
    mutationFn: fetchUserRegister,
    onError: (e) => {
      const error = e as AxiosError<IUserRegisterResponse>;
      throw new Error(error.response?.data.error?.message);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["user-signup"] }),
  });
}

export function useUserLogout() {
  async function fetchUserLogout() {
    const { data } =
      await api.post<IUserRegisterResponse>(`/api/auth/sign-out`);
    sessionStorage.removeItem("accesstoken");
    sessionStorage.removeItem("refreshtoken");
    return data.data;
  }

  return useMutation({
    mutationFn: fetchUserLogout,
    onError: (e) => {
      const error = e as AxiosError<IUserRegisterResponse>;
      throw new Error(error.response?.data.error?.message);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["user-sign-out"] }),
  });
}
