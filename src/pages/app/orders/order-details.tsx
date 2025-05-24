import { DialogDescription } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import { getOrderDetails } from "@/api/get-order-details";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { OrderDetailsSkeleton } from "./order-details-skeleton";

export interface OrderDetailsProps {
  orderId: string;
  isOpen: boolean;
}

export function OrderDetails({ orderId, isOpen }: OrderDetailsProps) {
  const { data: order } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => {
      return getOrderDetails({ orderId });
    },
    enabled: isOpen,
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: {orderId}</DialogTitle>
        <DialogDescription className="text-muted-foreground">
          Detalhes do pedido
        </DialogDescription>
      </DialogHeader>
      {order ? (
        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Status</TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                    <span className="font-medium text-muted-foreground">
                      {order?.status}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Cliente</TableCell>
                <TableCell className="flex justify-end">
                  {order?.customer.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Telefone
                </TableCell>
                <TableCell className="flex justify-end">
                  {order?.customer.phone ?? "Não informado"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">E-mail</TableCell>
                <TableCell className="flex justify-end">
                  {order?.customer.email}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Realizado há
                </TableCell>
                <TableCell className="flex justify-end">
                  {order?.createdAt
                    ? formatDistanceToNow(new Date(order.createdAt), {
                        addSuffix: true,
                        locale: ptBR,
                      })
                    : "-"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Produto</TableCell>
                <TableCell className="text-right">Qtd.</TableCell>
                <TableCell className="text-right">Preço</TableCell>
                <TableCell className="text-right">Subtotal</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order?.orderItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.product.name}
                  </TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    {(item.priceInCents / 100).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    {((item.priceInCents * item.quantity) / 100).toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      },
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className="font-medium">Total do pedido</TableCell>
                <TableCell className="text-right" colSpan={3}>
                  {(order.totalInCents / 100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      ) : (
        <OrderDetailsSkeleton />
      )}
    </DialogContent>
  );
}
