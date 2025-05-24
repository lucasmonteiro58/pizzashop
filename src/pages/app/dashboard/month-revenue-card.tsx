import { useQuery } from "@tanstack/react-query";
import { DollarSign, Loader2 } from "lucide-react";

import { getMonthRevenue } from "@/api/get-month-revenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CardSkeleton } from "./card-skeleton";

export function MonthRevenueCard() {
  const { data: monthRevenue, isFetching: isLoadingMonthRevenue } = useQuery({
    queryKey: ["metrics", "month-revenue"],
    queryFn: getMonthRevenue,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>
        {isLoadingMonthRevenue ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent className="space-y-1">
        {monthRevenue ? (
          <>
            <span className="text-2xl font-bold">
              {monthRevenue.receipt.toLocaleString("pt-BR", {
                currency: "BRL",
                style: "currency",
              })}
            </span>
            <p className="text-xs text-muted-foreground">
              <span
                className={
                  monthRevenue.diffFromLastMonth > 0
                    ? "text-emerald-500"
                    : "text-red-500"
                }
              >
                {monthRevenue.diffFromLastMonth > 0
                  ? `+${monthRevenue.diffFromLastMonth}`
                  : monthRevenue.diffFromLastMonth}
                %
              </span>{" "}
              em relação ao mês passado
            </p>
          </>
        ) : (
          <CardSkeleton />
        )}
      </CardContent>
    </Card>
  );
}
