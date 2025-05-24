import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";

import { getDaysOrdersAmount } from "@/api/get-days-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DayOrdersAmountCard() {
  const { data: dayOrdersAmount } = useQuery({
    queryKey: ["day-orders-amount"],
    queryFn: getDaysOrdersAmount,
  });
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {dayOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {dayOrdersAmount?.amount.toLocaleString("pt-BR")}
            </span>
            <p className="text-xs text-muted-foreground">
              <span
                className={
                  dayOrdersAmount?.diffFromYesterday >= 0
                    ? "text-emerald-500 dark:text-emerald-400"
                    : "text-rose-500 dark:text-rose-400"
                }
              >
                {dayOrdersAmount?.diffFromYesterday > 0 ? "+" : ""}
                {dayOrdersAmount?.diffFromYesterday}%
              </span>{" "}
              em relação a ontem
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
