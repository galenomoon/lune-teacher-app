import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/global/form-input";
import { UseFormReturn } from "react-hook-form";
import { LoginSchema } from "@/schemas/login-schema";
import { Form } from "@/components/ui/form";

export function LoginForm({
  form,
  onSubmit,
}: {
  form: UseFormReturn<LoginSchema>;
  onSubmit: (data: LoginSchema) => void;
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Faça login na sua conta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Digite seu CPF e senha abaixo para fazer login na sua conta
          </p>
        </div>
        <div className="grid gap-6">
          <FormInput
            name="cpf"
            control={form.control}
            label="CPF"
            mask="999.999.999-99"
            maskOptions={{
              placeholder: "___.___.___-__",
              showMaskOnHover: true,
            }}
            placeholder="Digite o CPF"
          />
          <FormInput
            name="password"
            control={form.control}
            type="password"
            label="Senha"
            placeholder="Digite a senha"
          />
          {/* <div className="grid gap-3">
          <Label htmlFor="cpf">CPF</Label>
          <Input id="cpf" type="cpf" placeholder="000.000.000-00" required />
        </div> */}
          {/* <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
          </div>
          <Input id="password" type="password" required />
        </div> */}
          <Button type="submit" className="w-full">
            Entrar
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              ou
            </span>
          </div>
        </div>
        <div className="text-center text-sm">
          Quer ser professor na Lune?{" "}
          <a href="#" className="underline underline-offset-4">
            Entre em contato
          </a>
        </div>
      </form>
    </Form>
  );
}
