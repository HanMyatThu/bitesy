import { useMutation } from "@tanstack/react-query";
import { api } from "@/services/api-client";
import { IUser } from "@/interfaces/IUser";
import { queryClient } from "@/services/query-client";

interface IUserApiResponse {
  profile: IUser;
}

type tokens = {
  refresh: string;
  accessToken: string;
};

interface IUserLoginResponse extends IUserApiResponse {
  tokens: tokens;
}

interface IUserRegisterResponse {
  message: string;
}

interface IPayload {
  email: string;
  password: string;
  name?: string;
}

export function useUserLogin() {
  async function fetchUserLogin(payload: IPayload) {
    const { data } = await api.post<IUserLoginResponse>(`/api/auth/login`, {
      params: {
        ...payload,
      },
    });

    return data;
  }

  return useMutation({
    mutationFn: fetchUserLogin,
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["user-login"] }),
  });
}

export function useUserRegister() {
  async function fetchUserRegister(payload: IPayload) {
    const { data } = await api.post<IUserRegisterResponse>(
      `/api/auth/register`,
      {
        params: {
          ...payload,
        },
      },
    );

    return data;
  }

  return useMutation({
    mutationFn: fetchUserRegister,
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["user-signup"] }),
  });
}
