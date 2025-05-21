import { Link, type LinkProps, useLocation } from "react-router";

export type NavLinkProps = LinkProps;

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation();
  return (
    <Link
      {...props}
      data-active={pathname === props.to}
      className="flex items-center gap-1.5 rounded-md p-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-muted/50 data-[active=true]:text-foreground data-[active=true]:shadow-sm dark:focus:ring-offset-0 dark:data-[active=true]:bg-muted/50 dark:data-[active=true]:text-foreground dark:data-[active=true]:shadow-sm lg:text-sm lg:leading-6 lg:transition-colors lg:hover:bg-transparent lg:focus:ring-offset-0 lg:disabled:pointer-events-none lg:disabled:opacity-50 lg:data-[active=true]:bg-transparent lg:data-[active=true]:text-foreground lg:data-[active=true]:shadow-none lg:dark:data-[active=true]:bg-transparent lg:dark:data-[active=true]:text-foreground lg:dark:data-[active=true]:shadow-none"
    />
  );
}
