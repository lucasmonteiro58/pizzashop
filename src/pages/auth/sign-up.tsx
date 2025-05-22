import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

import { registerRestaurant } from "@/api/register-restaurant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const signUpSchema = z.object({
  restaurantName: z
    .string()
    .min(1, { message: "Nome do restaurante é obrigatório" })
    .max(255, {
      message: "Nome do restaurante deve ter no máximo 255 caracteres",
    }),
  managerName: z
    .string()
    .min(1, { message: "Nome do responsável é obrigatório" })
    .max(255, {
      message: "Nome do responsável deve ter no máximo 255 caracteres",
    }),
  phone: z
    .string()
    .min(1, { message: "Telefone é obrigatório" })
    .max(255, { message: "Telefone deve ter no máximo 255 caracteres" }),
  email: z
    .string()
    .min(1, { message: "E-mail é obrigatório" })
    .email({ message: "E-mail inválido" })
    .max(255, { message: "E-mail deve ter no máximo 255 caracteres" }),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpFormData>({ resolver: zodResolver(signUpSchema) });

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  });

  async function handleSignUp(data: SignUpFormData) {
    try {
      await registerRestaurantFn({
        email: data.email,
        phone: data.phone,
        managerName: data.managerName,
        restaurantName: data.restaurantName,
      });
      toast.success("Cadastro realizado com sucesso", {
        action: {
          label: "Fazer login",
          onClick: () => {
            navigate(`/sign-in?email=${data.email}`);
          },
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Erro ao realizar o cadastro");
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link to="/sign-in" className="absolute right-8 top-8">
            Fazer login
          </Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e aumente suas vendas
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register("restaurantName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerName">Nome do responsável</Label>
              <Input
                id="managerName"
                type="text"
                {...register("managerName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" type="text" {...register("phone")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Finalizar cadastro
            </Button>
            <p className="px-3 text-center text-sm leading-relaxed text-muted-foreground">
              Ao clicar em "Finalizar cadastro", você concorda com os{" "}
              <a className="underline underline-offset-4" href="#">
                termos de serviços
              </a>{" "}
              e a{" "}
              <a className="underline underline-offset-4" href="#">
                política de privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
