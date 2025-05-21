import { Pizza } from "lucide-react";
import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-lg text-foreground">
          <Pizza className="h-5 w-5" />
          <span className="font-semibold">pizza.shop</span>
        </div>
        <footer className="text-center text-sm">
          Painel do parceiro &copy; pizza.shop - {new Date().getFullYear()}{" "}
          Todos os direitos reservados
        </footer>
      </div>
      <div className="relative flex h-full flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
