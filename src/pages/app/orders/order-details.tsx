import { DialogDescription } from "@radix-ui/react-dialog";

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

// export interface OrderDetailsProps {}

export function OrderDetails() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido</DialogTitle>
        <DialogDescription className="text-muted-foreground">
          Detalhes do pedido
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  <span className="font-medium text-muted-foreground">
                    Pendente
                  </span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell className="flex justify-end">Lucas Monteiro</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Telefone</TableCell>
              <TableCell className="flex justify-end">(85) 99802776</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">E-mail</TableCell>
              <TableCell className="flex justify-end">lucas@mail.com</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Realizado há
              </TableCell>
              <TableCell className="flex justify-end">3 minutos</TableCell>
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
            <TableRow>
              <TableCell className="font-medium">Produto 1</TableCell>
              <TableCell className="text-right">2</TableCell>
              <TableCell className="text-right">R$ 49,90</TableCell>
              <TableCell className="text-right">R$ 99,80</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Produto 2</TableCell>
              <TableCell className="text-right">1</TableCell>
              <TableCell className="text-right">R$ 49,90</TableCell>
              <TableCell className="text-right">R$ 49,90</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="font-medium">Total do pedido</TableCell>
              <TableCell className="text-right" colSpan={3}>
                R$ 149,70
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  );
}
