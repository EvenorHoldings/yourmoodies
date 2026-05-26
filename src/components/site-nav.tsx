import { Link } from "@tanstack/react-router";
import { CartButton } from "./cart-drawer";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link to="/" className="font-semibold tracking-tight text-foreground">
          moodies<span className="text-foreground/40">.site</span>
        </Link>
        <nav className="hidden gap-6 text-sm text-foreground/70 md:flex">
          <Link to="/" className="hover:text-foreground" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground" }}>Home</Link>
          <Link to="/shop" className="hover:text-foreground" activeProps={{ className: "text-foreground" }}>Shop</Link>
          <a href="mailto:hello@moodies.site" className="hover:text-foreground">Contact</a>
        </nav>
        <CartButton />
      </div>
    </header>
  );
}
