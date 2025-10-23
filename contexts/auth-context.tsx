"use client";
import React, { createContext, useContext } from "react";

//next
import { useRouter } from "next/navigation";

//config
import api from "@/config/api";
import { destroyCookie, parseCookies, setCookie } from "nookies";

//styles
import { toast } from "sonner";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { LoginSchema } from "@/schemas/login-schema";
import { AxiosError, AxiosResponse } from "axios";
import { LoginResponse } from "@/interfaces/login-interface";
import { CurrentUser } from "@/interfaces/current-user-interface";

export interface AuthContextType {
  loginMutation: UseMutationResult<
    AxiosResponse<LoginResponse>,
    AxiosError,
    LoginSchema,
    unknown
  >;
  signOut: () => Promise<void>;
  currentUser: CurrentUser | null;
  isLoadingCurrentUser: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  loginMutation: {} as UseMutationResult<
    AxiosResponse<LoginResponse>,
    AxiosError,
    LoginSchema,
    unknown
  >,
  signOut: () => Promise.resolve(),
  currentUser: null,
  isLoadingCurrentUser: false,
});

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = parseCookies();
  const { push } = useRouter();

  const queryClient = useQueryClient();

  const { data: currentUser, isPending } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await api.get("api/v1/auth/teacher/me");
      return data;
    },
    enabled: Boolean(token),
  });

  const loginMutation = useMutation<
    AxiosResponse<LoginResponse>,
    AxiosError,
    LoginSchema,
    unknown
  >({
    mutationKey: ["login"],
    mutationFn: async (data: LoginSchema) => await api.post("api/v1/auth/teacher/login", data),
    onSuccess: (response) => {
      setCookie(undefined, "token", response.data.accessToken);
      queryClient.setQueryData(["currentUser"], response.data.teacher);
      push("/");
    },
    onError: (err: unknown) => {
      console.error(err);
      if (!(err instanceof AxiosError)) return;

      if (err?.response?.status === 401) {
        return toast.error("Email ou senha incorretos");
      }
      if (err?.response?.status === 404) {
        return toast.error("Usuário não encontrado");
      }
    },
  });

  async function signOut() {
    destroyCookie(undefined, "token");
    queryClient.removeQueries({ queryKey: ["currentUser"] });
    return push("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        loginMutation,
        signOut,
        currentUser,
        isLoadingCurrentUser: isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}