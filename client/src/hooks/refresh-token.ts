import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/services/api-client";
import { queryClient } from "@/services/query-client";

interface IPayload {
  refreshToken: string;
}

interface ITokenResponse {
  data: {
    tokens: {
      refresh: string;
      access: string;
    };
  };
  error: {
    message: string;
  } | null;
}

export function useRefreshToken() {
  async function fetchUserLogin(payload: IPayload) {
    const { data } = await api.post<ITokenResponse>(`/api/auth/refresh-token`, {
      ...payload,
    });

    //save token in session storage
    if (data.data.tokens) {
      sessionStorage.setItem("accesstoken", data.data.tokens.access);
      sessionStorage.setItem("refreshtoken", data.data.tokens.refresh);
    }
    return "token is refreshed";
  }

  return useMutation({
    mutationFn: fetchUserLogin,
    onError: (e) => {
      const error = e as AxiosError<ITokenResponse>;
      throw new Error(error.response?.data.error?.message);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["refresh-token"] }),
  });
}
