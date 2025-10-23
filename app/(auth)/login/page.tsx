"use client";
import { UserStar } from "lucide-react";
import { LoginForm } from "./_components/login-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "@/schemas/login-schema";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth-context";

export default function LoginPage() {
  const { loginMutation } = useContext(AuthContext);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      cpf: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchema) => loginMutation.mutate(data);

  return (
    <div className="grid min-h-svh ">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start"></div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <a href="#" className="flex mb-6 items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <UserStar className="size-4" />
            </div>
            Lune Teacher
          </a>
          <div className="w-full max-w-xs">
            <LoginForm form={form} onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
