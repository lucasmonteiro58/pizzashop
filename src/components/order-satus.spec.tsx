import { render } from "@testing-library/react";

import { OrderStatus } from "./order-status";

describe("OrderStatus", () => {
  it("deve exibir o texto correto para o status 'pending'", () => {
    const { getByText, container } = render(<OrderStatus status="pending" />);
    expect(getByText("Pendente")).toBeInTheDocument();
    const indicador = container.querySelector("span");
    expect(indicador).toHaveClass("bg-slate-400");
  });

  it("deve exibir o texto correto para o status 'canceled'", () => {
    const { getByText, container } = render(<OrderStatus status="canceled" />);
    expect(getByText("Cancelado")).toBeInTheDocument();
    const indicador = container.querySelector("span");
    expect(indicador).toHaveClass("bg-rose-500");
  });

  it("deve exibir o texto correto para o status 'processing'", () => {
    const { getByText, container } = render(
      <OrderStatus status="processing" />,
    );
    expect(getByText("Em preparo")).toBeInTheDocument();
    const indicador = container.querySelector("span");
    expect(indicador).toHaveClass("bg-amber-500");
  });

  it("deve exibir o texto correto para o status 'delivering'", () => {
    const { getByText, container } = render(
      <OrderStatus status="delivering" />,
    );
    expect(getByText("Em entrega")).toBeInTheDocument();
    const indicador = container.querySelector("span");
    expect(indicador).toHaveClass("bg-blue-500");
  });

  it("deve exibir o texto correto para o status 'delivered'", () => {
    const { getByText, container } = render(<OrderStatus status="delivered" />);
    expect(getByText("Entregue")).toBeInTheDocument();
    const indicador = container.querySelector("span");
    expect(indicador).toHaveClass("bg-emerald-500");
  });
});
