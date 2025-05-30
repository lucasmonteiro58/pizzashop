import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
});

type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>;

export function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");

  const { register, handleSubmit, control, reset } =
    useForm<OrderFiltersSchema>({
      resolver: zodResolver(orderFiltersSchema),
      defaultValues: {
        orderId: orderId ?? "",
        customerName: customerName ?? "",
        status: status ?? "all",
      },
    });

  function handleFilter({ orderId, customerName, status }: OrderFiltersSchema) {
    setSearchParams((params) => {
      const newParams = new URLSearchParams(params);

      const setOrDelete = (key: string, value?: string) => {
        if (value && value !== "all") {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      };

      setOrDelete("orderId", orderId);
      setOrDelete("customerName", customerName);
      setOrDelete("status", status);

      newParams.set("page", "1");

      return newParams;
    });
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete("orderId");
      state.delete("customerName");
      state.delete("status");
      state.set("page", "1");

      return state;
    });

    reset({
      orderId: "",
      customerName: "",
      status: "all",
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        placeholder="Identificador"
        className="h-8 w-auto"
        {...register("orderId")}
      />
      <Input
        placeholder="Nome do cliente"
        className="h-8 w-[320px]"
        {...register("customerName")}
      />

      <Controller
        control={control}
        name="status"
        render={({ field: { name, onChange, value, disabled } }) => (
          <Select
            defaultValue="all"
            onValueChange={onChange}
            disabled={disabled}
            value={value}
            name={name}
          >
            <SelectTrigger className="h-8 w-[200px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="canceled">Cancelado</SelectItem>
              <SelectItem value="processing">Em Preparo</SelectItem>
              <SelectItem value="delivering">Em entrega</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>
      <Button
        size="xs"
        variant="secondary"
        onClick={handleClearFilters}
        type="button"
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  );
}
