import { useMutation } from "@tanstack/react-query";

import { api } from "@/services/api-client";
import { AxiosError } from "axios";
import { queryClient } from "@/services/query-client";

interface IPayload {
  id: string;
  token: string;
}

interface IVerifyUserResponse {
  data: {
    message: string;
  };
  error: { message: string } | null;
}

export function useVerifyUser() {
  async function fetchUserVerify(payload: IPayload) {
    const { data } = await api.post<IVerifyUserResponse>(`/api/auth/verify`, {
      ...payload,
    });
    return data.data;
  }

  return useMutation({
    mutationFn: fetchUserVerify,
    onError: (e) => {
      const error = e as AxiosError<IVerifyUserResponse>;
      throw new Error(error.response?.data.error?.message);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["user-verify"] }),
  });
}
