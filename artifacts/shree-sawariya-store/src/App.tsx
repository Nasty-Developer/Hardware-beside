import { useMemo, useState, type FormEvent } from "react";
import { Link, Route, Switch, useLocation, useParams } from "wouter";
import {
  ArrowRight,
  BadgeCheck,
  Box,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Drill,
  Hammer,
  Heart,
  LampCeiling,
  Menu,
  Minus,
  PackageCheck,
  Paintbrush,
  Plus,
  Search,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Star,
  Tag,
  Truck,
  Zap,
  Wrench,
  X,
} from "lucide-react";
import { categories, products, type Product } from "@/data/products";
import heroToolsImage from "../attached_assets/generated_images/shree-sawariya-hero-tools.png";

const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;
const STORE_NAME = "Shree Sawariya";
const STORE_PHONE = "9136211245";
const STORE_ADDRESS =
  "Halav Pool Road, Opp. Rolex Hotel, Kurla (West), Mumbai - 400070, Maharashtra, India";

function ProductArt({
  kind,
  image,
  small = false,
}: {
  kind: Product["art"];
  image?: string;
  small?: boolean;
}) {
  const common = { size: small ? 43 : 82, strokeWidth: 1.3 };
  const art = {
    drill: <Drill {...common} />,
    box: <Box {...common} />,
    paint: <Paintbrush {...common} />,
    ladder: <Building2 {...common} />,
    socket: <Wrench {...common} />,
    helmet: <ShieldCheck {...common} />,
    tap: <Wrench {...common} />,
    brick: <Building2 {...common} />,
    bulb: <LampCeiling {...common} />,
    saw: <Hammer {...common} />,
  }[kind];
  return (
    <div
      className={`br-product-art flex items-center justify-center ${small ? "h-16 w-16 rounded-lg" : "h-44 w-full"}`}
    >
      {image ? (
        <img
          src={image}
          alt=""
          className={`relative z-10 h-full w-full object-contain ${small ? "p-1" : "p-3"}`}
        />
      ) : (
        <>
          <div className="relative z-10 text-[#07518b]">{art}</div>
          <div className="absolute bottom-3 left-1/2 h-1 w-20 -translate-x-1/2 rounded-full bg-[#f23868]/35" />
        </>
      )}
    </div>
  );
}

function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      href="/"
      data-testid="link-brand"
      className="flex shrink-0 items-center gap-2.5"
    >
      <div
        className="relative flex h-11 w-11 items-center justify-center rounded-lg bg-[#07518b] text-white"
        style={{
          clipPath: "polygon(14% 0, 86% 0, 100% 14%, 100% 86%, 86% 100%, 14% 100%, 0 86%, 0 14%)",
        }}
      >
        <Zap size={23} strokeWidth={2.8} fill="currentColor" />
      </div>
      <div className="leading-none">
        <div className={`font-display text-[21px] font-bold tracking-[-.04em] ${inverse ? "text-white" : "text-[#07518b]"}`}>
          Shree <span className="text-[#f23868]">Sawariya</span>
        </div>
        <div className={`mt-1 text-[9px] font-bold tracking-[.2em] ${inverse ? "text-blue-200" : "text-slate-500"}`}>
          ELECTRICAL & HARDWARE
        </div>
      </div>
    </Link>
  );
}

function Header({
  cartCount,
  wishlistCount,
  onCart,
  onMenu,
}: {
  cartCount: number;
  wishlistCount: number;
  onCart: () => void;
  onMenu: () => void;
}) {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState("");
  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    if (query.trim())
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
  };
  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_1px_0_rgba(7,81,139,.12)]">
      <div className="br-topbar">
        <div className="br-container flex h-7 items-center justify-between">
          <span className="font-semibold tracking-wide">
             Electrical essentials for every project.
          </span>
          <div className="br-desktop flex items-center gap-5">
            <a href="#store" className="transition hover:text-[#f23868]">Store Locator</a>
            <span>Track Order</span>
            <span>Login / Sign Up</span>
          </div>
        </div>
      </div>
      <div className="br-container flex min-h-[74px] items-center gap-4 py-3">
        <button
          data-testid="button-mobile-menu"
          onClick={onMenu}
          className="br-mobile rounded-md p-2 text-[#07518b]"
        >
          <Menu size={23} />
        </button>
        <BrandMark />
        <form
          onSubmit={submitSearch}
          className="br-desktop mx-auto flex h-10 max-w-[560px] flex-1 overflow-hidden rounded-xl border border-slate-300 bg-slate-50 focus-within:border-[#07518b] focus-within:ring-2 focus-within:ring-[#07518b]/10"
        >
          <Search className="ml-3 self-center text-slate-400" size={18} />
          <input
            data-testid="input-search-desktop"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for tools, materials, and more..."
            className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-slate-400"
          />
          <button
            data-testid="button-search"
            className="bg-[#07518b] px-5 text-white transition hover:bg-[#053b67]"
          >
            <Search size={18} />
          </button>
        </form>
        <div className="ml-auto flex items-center gap-2 sm:gap-5">
          <Link
            href="/wishlist"
            data-testid="link-wishlist"
            className="relative hidden items-center gap-2 text-sm font-semibold text-slate-700 sm:flex"
          >
            <Heart size={22} strokeWidth={1.8} />
            <span>Wishlist</span>
            {wishlistCount > 0 && (
              <b className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#f23868] px-1 text-[10px] text-white">
                {wishlistCount}
              </b>
            )}
          </Link>
          <button
            data-testid="button-cart"
            onClick={onCart}
            className="relative flex items-center gap-2 text-sm font-semibold text-slate-700"
          >
            <ShoppingCart size={23} strokeWidth={1.8} />
            <span className="br-desktop">Cart</span>
            <b className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#07518b] px-1 text-[11px] text-white">
              {cartCount}
            </b>
          </button>
        </div>
      </div>
      <div className="br-desktop border-t border-slate-100">
        <nav className="br-container flex h-11 items-center gap-7 text-xs font-semibold text-[#14283a]">
          <Link
            href="/products"
            data-testid="link-all-categories"
            className="flex items-center gap-2 text-[#07518b]"
          >
            <Menu size={15} /> All Categories
          </Link>
          {categories.slice(0, 7).map((category) => (
            <Link
              key={category.label}
              href={`/products?category=${encodeURIComponent(category.label)}`}
              data-testid={`link-category-${category.label.toLowerCase().replaceAll(" ", "-")}`}
              className="whitespace-nowrap transition hover:text-[#f23868]"
            >
              {category.label}
            </Link>
          ))}
          <Link
            href="/deals"
            data-testid="link-deals"
            className="ml-auto flex h-full items-center gap-2 bg-[#f23868] px-6 text-white transition hover:bg-[#d92856]"
          >
            <Tag size={15} /> Deals & Offers
          </Link>
        </nav>
      </div>
      <div className="br-mobile border-t border-slate-100 px-3 pb-3">
        <form
          onSubmit={submitSearch}
          className="flex h-10 overflow-hidden rounded-lg border border-slate-300 bg-slate-50"
        >
          <Search className="ml-3 self-center text-slate-400" size={17} />
          <input
            data-testid="input-search-mobile"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools, materials..."
            className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none"
          />
          <button
            data-testid="button-search-mobile"
            className="bg-[#07518b] px-4 text-white"
          >
            <Search size={17} />
          </button>
        </form>
      </div>
    </header>
  );
}

function MobileMenu({ close }: { close: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-[#0b2944]/40 md:hidden"
      onClick={close}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className="h-full w-[min(320px,88vw)] bg-white p-5 shadow-2xl"
      >
        <div className="mb-8 flex items-center justify-between">
          <BrandMark />
          <button data-testid="button-close-menu" onClick={close}>
            <X size={22} />
          </button>
        </div>
        <div className="space-y-1">
          <Link
            href="/products"
            onClick={close}
            data-testid="mobile-link-all-products"
            className="flex items-center justify-between rounded-lg p-3 font-semibold text-[#07518b]"
          >
            All Products <ChevronRight size={17} />
          </Link>
          {categories.map((category) => (
            <Link
              key={category.label}
              href={`/products?category=${encodeURIComponent(category.label)}`}
              onClick={close}
              data-testid={`mobile-link-${category.label.toLowerCase().replaceAll(" ", "-")}`}
              className="flex items-center justify-between rounded-lg p-3 text-sm text-slate-700 hover:bg-slate-50"
            >
              {category.label}
              <ChevronRight size={16} />
            </Link>
          ))}
          <Link
            href="/deals"
            onClick={close}
            data-testid="mobile-link-deals"
            className="mt-3 flex items-center gap-2 rounded-lg bg-[#f23868] p-3 font-semibold text-white"
          >
            <Tag size={16} /> Deals & Offers
          </Link>
        </div>
      </aside>
    </div>
  );
}

function Hero() {
  return (
    <section className="br-hero-grid overflow-hidden bg-[#07518b] text-white">
      <div className="br-container grid min-h-[375px] items-center gap-8 py-10 md:grid-cols-[1fr_1.05fr] md:py-0">
        <div className="br-fade max-w-[510px]">
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#a8e6ff]">
            <Sparkles size={16} /> Built for every project
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.06] tracking-[-.045em] sm:text-5xl lg:text-[58px]">
            Everything You Need
            <br />
            <span className="text-[#6dd6ff]">For Every Project</span>
          </h1>
          <p className="mt-4 max-w-[430px] text-base leading-7 text-blue-50">
            Electrical products, hardware, tools, and everyday project
            essentials from a store you can count on.
          </p>
          <Link
            href="/products"
            data-testid="link-shop-now"
            className="mt-6 inline-flex items-center gap-3 rounded-md bg-[#f23868] px-6 py-3 text-sm font-bold shadow-lg shadow-[#042f55]/30 transition hover:bg-[#ff557e]"
          >
            Shop Now <ArrowRight size={17} />
          </Link>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-5 text-[11px]">
            <span className="flex items-center gap-2">
              <Truck size={23} />{" "}
              <span>
                <b className="block text-white">Fast Delivery</b>
                <em className="not-italic text-blue-100">Across 500 Pincode</em>
              </span>
            </span>
            <span className="flex items-center gap-2">
              <BadgeCheck size={23} />{" "}
              <span>
                <b className="block text-white">Genuine Products</b>
                <em className="not-italic text-blue-100">100% Authentic</em>
              </span>
            </span>
            <span className="flex items-center gap-2">
              <CircleHelp size={23} />{" "}
              <span>
                <b className="block text-white">Expert Support</b>
                <em className="not-italic text-blue-100">
                  Always Here to Help
                </em>
              </span>
            </span>
          </div>
        </div>
        <div className="relative hidden h-[375px] overflow-hidden md:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,117,177,.65),transparent_67%)]" />
          <img
            src={heroToolsImage}
            alt="Professional tools arranged on a workshop bench"
            className="relative h-full w-full object-cover object-center mix-blend-screen opacity-95"
          />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#07518b] to-transparent" />
        </div>
      </div>
    </section>
  );
}

function CategoryStrip({ select }: { select?: (category: string) => void }) {
  return (
    <section className="bg-[#f0f6fa] py-5">
      <div className="br-container grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-9">
        {categories.map((category) => (
          <button
            key={category.label}
            onClick={() => select?.(category.label)}
            data-testid={`category-tile-${category.label.toLowerCase().replaceAll(" ", "-")}`}
            className="group flex min-h-[94px] flex-col items-center justify-center gap-2 rounded-xl border border-white bg-white/80 p-2 text-center transition hover:-translate-y-0.5 hover:border-[#a9d7eb] hover:bg-white"
          >
            <ProductArt kind={category.art} small />
            <span className="text-[11px] font-bold leading-tight text-[#14283a]">
              {category.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  wished,
  onWish,
  onAdd,
  onOpen,
}: {
  product: Product;
  wished: boolean;
  onWish: () => void;
  onAdd: () => void;
  onOpen: () => void;
}) {
  return (
    <article
      data-testid={`card-product-${product.id}`}
      className="group relative flex min-w-0 flex-col rounded-lg border border-slate-200 bg-white p-3 transition hover:-translate-y-1 hover:border-[#9bcde3] hover:shadow-[0_10px_28px_rgba(7,81,139,.12)]"
    >
      <button
        onClick={onWish}
        data-testid={`button-wishlist-${product.id}`}
        aria-label={`Add ${product.name} to wishlist`}
        className={`absolute right-4 top-4 z-10 rounded-full bg-white p-2 shadow-sm ${wished ? "text-[#f23868]" : "text-slate-500 hover:text-[#f23868]"}`}
      >
        <Heart size={17} fill={wished ? "currentColor" : "none"} />
      </button>
      <button
        onClick={onOpen}
        data-testid={`button-open-product-${product.id}`}
        className="text-left"
      >
        <div className="relative">
          {product.badge && (
            <span className="absolute left-1 top-1 z-10 rounded bg-[#f23868] px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white">
              {product.badge}
            </span>
          )}
          <ProductArt kind={product.art} image={product.image} />
        </div>
        <div className="mt-3 line-clamp-2 min-h-10 text-sm font-bold leading-5 text-[#14283a]">
          {product.name}
        </div>
      </button>
      <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
        <Star size={13} fill="#f7b928" strokeWidth={0} />
        <b className="text-slate-700">{product.rating}</b> ({product.reviews})
      </div>
      <div className="mt-2 flex items-end gap-2">
        <span className="text-base font-bold text-[#14283a]">
          {money(product.price)}
        </span>
        {product.originalPrice && (
          <del className="text-xs text-slate-400">
            {money(product.originalPrice)}
          </del>
        )}
      </div>
      <button
        onClick={onAdd}
        data-testid={`button-add-cart-${product.id}`}
        className="mt-3 flex h-9 items-center justify-center rounded bg-[#07518b] text-xs font-bold text-white transition hover:bg-[#053b67]"
      >
        Add to Cart
      </button>
    </article>
  );
}

function ProductSection({
  wished,
  toggleWish,
  addToCart,
  openProduct,
  productsToShow = products.slice(0, 6),
  title = "Featured Products",
  subtitle,
}: {
  wished: Set<string>;
  toggleWish: (id: string) => void;
  addToCart: (product: Product) => void;
  openProduct: (product: Product) => void;
  productsToShow?: Product[];
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="br-container py-7 sm:py-9">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-[-.03em] text-[#14283a]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>
        <Link
          href="/products"
          data-testid="link-view-all"
          className="flex items-center gap-1 text-xs font-bold text-[#07518b] hover:text-[#f23868]"
        >
          View All <ArrowRight size={15} />
        </Link>
      </div>
      {productsToShow.length ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {productsToShow.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              wished={wished.has(product.id)}
              onWish={() => toggleWish(product.id)}
              onAdd={() => addToCart(product)}
              onOpen={() => openProduct(product)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 py-16 text-center text-slate-500">
          No products match this search yet.
        </div>
      )}
    </section>
  );
}

function PromotionalBands() {
  return (
    <section className="br-container grid gap-3 pb-10 md:grid-cols-2">
      <div className="relative min-h-[145px] overflow-hidden rounded-lg bg-[#dcecf3] p-5">
        <div className="relative z-10 max-w-[230px]">
          <h3 className="font-display text-2xl font-bold leading-[1.05] text-[#092f52]">
            Strong Foundations
            <br />
            Brighter Futures
          </h3>
          <p className="mt-2 text-xs text-[#315a75]">
            Premium building materials for every project
          </p>
          <Link
            href="/products?category=Building%20Materials"
            data-testid="link-shop-building"
            className="mt-3 inline-flex items-center gap-2 rounded bg-[#07518b] px-3 py-2 text-[10px] font-bold text-white"
          >
            Shop Building Materials <ArrowRight size={13} />
          </Link>
        </div>
        <div className="absolute -right-1 bottom-0 flex items-end gap-1 opacity-75">
          <div className="h-16 w-12 rounded-sm bg-[#b66b48]" />
          <div className="h-24 w-12 rounded-sm bg-[#c27850]" />
          <div className="h-10 w-24 rounded-sm bg-[#e3b067]" />
        </div>
      </div>
      <div className="relative min-h-[145px] overflow-hidden rounded-lg bg-[#ffdce5] p-5">
        <div className="relative z-10 max-w-[220px]">
          <h3 className="font-display text-2xl font-bold leading-[1.05] text-[#ca174b]">
            Add Color
            <br />
            To Your Ideas
          </h3>
          <p className="mt-2 text-xs text-[#a84762]">
            Wide range of paints & finishes
          </p>
          <Link
            href="/products?category=Paint%20%26%20Finishes"
            data-testid="link-explore-paints"
            className="mt-3 inline-flex items-center gap-2 rounded bg-[#f23868] px-3 py-2 text-[10px] font-bold text-white"
          >
            Explore Paints <ArrowRight size={13} />
          </Link>
        </div>
        <div className="absolute -right-2 bottom-[-14px] flex gap-2 opacity-80">
          <div className="h-32 w-16 rounded-t-xl bg-[#1670a4]" />
          <div className="h-28 w-16 rounded-t-xl bg-[#e3ad2b]" />
          <div className="h-24 w-16 rounded-t-xl bg-[#dc5260]" />
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="border-y border-slate-200 bg-white py-6">
      <div className="br-container grid grid-cols-2 gap-5 sm:grid-cols-4">
        <div className="flex items-center gap-3">
          <Truck className="text-[#07518b]" />
          <span>
            <b className="block text-sm">Fast Delivery</b>
            <small className="text-xs text-slate-500">
              Across 500+ pin codes
            </small>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <BadgeCheck className="text-[#07518b]" />
          <span>
            <b className="block text-sm">Genuine Products</b>
            <small className="text-xs text-slate-500">
              Trusted brands only
            </small>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-[#07518b]" />
          <span>
            <b className="block text-sm">Secure Payments</b>
            <small className="text-xs text-slate-500">
              Safe & encrypted checkout
            </small>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <CircleHelp className="text-[#07518b]" />
          <span>
            <b className="block text-sm">Expert Support</b>
            <small className="text-xs text-slate-500">
              Advice when you need it
            </small>
          </span>
        </div>
      </div>
    </section>
  );
}

function StoreInfo() {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(STORE_ADDRESS)}`;
  return (
    <section id="store" className="bg-[#f0f6fa] py-10 sm:py-14">
      <div className="br-container grid items-center gap-7 md:grid-cols-[1.1fr_.9fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#f23868]">
            Your neighbourhood electrical & hardware store
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-[-.04em] text-[#14283a]">
            Visit {STORE_NAME}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
            Find trusted supplies, practical advice, and project essentials at
            our Kurla West store.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              data-testid="link-get-directions"
              className="inline-flex items-center gap-2 rounded bg-[#07518b] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#053b67]"
            >
              <Building2 size={17} /> Get Directions
            </a>
            <a
              href={`tel:${STORE_PHONE}`}
              data-testid="link-call-store"
              className="inline-flex items-center gap-2 rounded border border-[#07518b] bg-white px-5 py-3 text-sm font-bold text-[#07518b] transition hover:bg-[#e3f2f8]"
            >
              <PhoneIcon /> Call Store
            </a>
          </div>
        </div>
        <div className="rounded-xl border border-[#c9e1eb] bg-white p-5 shadow-[0_10px_30px_rgba(7,81,139,.08)]">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-[#e3f2f8] p-2 text-[#07518b]">
              <Building2 size={20} />
            </div>
            <div className="text-sm leading-6 text-slate-600">
              <p className="font-bold text-[#14283a]">{STORE_NAME}</p>
              <p>
                Halav Pool Road,
                <br />
                Opp. Rolex Hotel,
                <br />
                Kurla (West),
                <br />
                Mumbai - 400070,
                <br />
                Maharashtra, India
              </p>
              <a
                href={`tel:${STORE_PHONE}`}
                className="mt-3 inline-flex items-center gap-2 font-bold text-[#07518b] hover:text-[#f23868]"
              >
                <PhoneIcon /> {STORE_PHONE}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#082e4d] pt-10 text-blue-100">
      <div className="br-container grid gap-8 pb-9 sm:grid-cols-2 md:grid-cols-4">
        <div>
           <BrandMark inverse />
           <p className="mt-4 max-w-[260px] text-xs leading-6 text-blue-200">
             {STORE_NAME}
             <br />
             Electrical & Hardware Store
             <br />
             Halav Pool Road, Opp. Rolex Hotel,
             <br />
             Kurla (West), Mumbai - 400070,
             <br />
             Maharashtra, India
           </p>
           <a
             href={`tel:${STORE_PHONE}`}
             className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-[#ff9ab3]"
           >
             <PhoneIcon /> {STORE_PHONE}
           </a>
        </div>
        <div>
          <h4 className="mb-3 font-bold text-white">Shop</h4>
          <div className="space-y-2 text-xs">
             <Link
              href="/products"
              data-testid="footer-link-products"
              className="block hover:text-white"
            >
               Products
            </Link>
             <a href="#store" className="block hover:text-white">Categories</a>
             <a href="#store" className="block hover:text-white">About Us</a>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-bold text-white">Help & Support</h4>
          <div className="space-y-2 text-xs">
             <a href={`tel:${STORE_PHONE}`} className="block hover:text-white">Contact</a>
             <a href="#store" className="block hover:text-white">Store Location</a>
             <span className="block">Privacy Policy</span>
             <span className="block">Terms</span>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-bold text-white">For Professionals</h4>
          <p className="text-xs leading-5 text-blue-200">
            Get project pricing and reliable bulk supply for your next site.
          </p>
          <button
            data-testid="button-business-enquiry"
            className="mt-3 rounded bg-[#f23868] px-4 py-2 text-xs font-bold text-white"
          >
            Business Enquiry
          </button>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-[11px] text-blue-300">
         © 2026 {STORE_NAME} · Electrical & Hardware Store
      </div>
    </footer>
  );
}

function PhoneIcon() {
  return <span aria-hidden="true">☎</span>;
}

function ProductModal({
  product,
  close,
  add,
}: {
  product: Product;
  close: () => void;
  add: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#051d31]/55 p-4"
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-5 shadow-2xl sm:p-7"
      >
        <button
          data-testid="button-close-product"
          onClick={close}
          className="absolute right-4 top-4 rounded-full bg-slate-100 p-2 text-slate-600"
        >
          <X size={19} />
        </button>
        <div className="grid gap-6 sm:grid-cols-2">
          <ProductArt kind={product.art} image={product.image} />
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#f23868]">
              {product.category}
            </span>
            <h2
              data-testid={`text-product-modal-${product.id}`}
              className="mt-2 font-display text-2xl font-bold text-[#14283a]"
            >
              {product.name}
            </h2>
            <div className="mt-2 flex items-center gap-1 text-sm">
              <Star size={15} fill="#f7b928" strokeWidth={0} />
              <b>{product.rating}</b>
              <span className="text-slate-500">
                ({product.reviews} reviews)
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {product.description}
            </p>
            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-2xl font-bold text-[#14283a]">
                {money(product.price)}
              </span>
              {product.originalPrice && (
                <del className="text-sm text-slate-400">
                  {money(product.originalPrice)}
                </del>
              )}
            </div>
            <div className="mt-5 rounded-lg bg-[#f0f6fa] p-3 text-xs font-semibold text-[#07518b]">
              {product.pack} · In stock and ready to ship
            </div>
            <button
              data-testid={`button-modal-add-${product.id}`}
              onClick={add}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded bg-[#07518b] py-3 text-sm font-bold text-white hover:bg-[#053b67]"
            >
              <ShoppingCart size={17} /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({
  cart,
  close,
  change,
  remove,
  checkout,
}: {
  cart: Record<string, number>;
  close: () => void;
  change: (id: string, amount: number) => void;
  remove: (id: string) => void;
  checkout: () => void;
}) {
  const items = Object.entries(cart)
    .map(([id, quantity]) => ({
      product: products.find((p) => p.id === id)!,
      quantity,
    }))
    .filter((item) => item.product);
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  return (
    <div className="fixed inset-0 z-50 bg-[#051d31]/40" onClick={close}>
      <aside
        onClick={(e) => e.stopPropagation()}
        className="ml-auto flex h-full w-[min(430px,94vw)] flex-col bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div>
            <h2 className="font-display text-xl font-bold text-[#14283a]">
              Your Cart
            </h2>
            <p className="text-xs text-slate-500">
              {items.length} product{items.length === 1 ? "" : "s"}
            </p>
          </div>
          <button
            data-testid="button-close-cart"
            onClick={close}
            className="rounded-full bg-slate-100 p-2"
          >
            <X size={19} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {items.length ? (
            <div className="space-y-4">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  data-testid={`cart-item-${product.id}`}
                  className="flex gap-3 border-b border-slate-100 pb-4"
                >
                  <ProductArt kind={product.art} image={product.image} small />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold">{product.name}</div>
                    <div className="mt-1 text-sm font-semibold text-[#07518b]">
                      {money(product.price)}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        data-testid={`button-decrease-${product.id}`}
                        onClick={() => change(product.id, -1)}
                        className="rounded border p-1 text-slate-600"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-5 text-center text-xs font-bold">
                        {quantity}
                      </span>
                      <button
                        data-testid={`button-increase-${product.id}`}
                        onClick={() => change(product.id, 1)}
                        className="rounded border p-1 text-slate-600"
                      >
                        <Plus size={13} />
                      </button>
                      <button
                        data-testid={`button-remove-${product.id}`}
                        onClick={() => remove(product.id)}
                        className="ml-auto text-xs font-semibold text-[#f23868]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingCart size={42} className="text-slate-300" />
              <h3 className="mt-4 font-bold text-[#14283a]">
                Your cart is waiting
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Add the gear for your next job.
              </p>
            </div>
          )}
        </div>
        {items.length > 0 && (
          <div className="border-t border-slate-200 p-5">
            <div className="flex justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <b className="text-lg text-[#14283a]">{money(total)}</b>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Delivery calculated at checkout
            </p>
            <button
              data-testid="button-go-checkout"
              onClick={checkout}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded bg-[#f23868] py-3 text-sm font-bold text-white hover:bg-[#d92856]"
            >
              Proceed to Checkout <ArrowRight size={17} />
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

function HomePage(props: StoreState) {
  return (
    <>
      <Hero />
      <CategoryStrip select={props.setCategory} />
      <ProductSection {...props} />
      <PromotionalBands />
      <TrustStrip />
      <StoreInfo />
      <section className="bg-[#f0f6fa] py-8 text-center">
        <h2 className="font-display text-2xl font-bold text-[#14283a]">
          Need help choosing the right product?
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Talk to a {STORE_NAME} expert before you buy.
        </p>
        <button
          data-testid="button-talk-expert"
          className="mt-4 rounded bg-[#07518b] px-5 py-2.5 text-sm font-bold text-white"
        >
          Talk to an Expert
        </button>
      </section>
      <Footer />
    </>
  );
}

type StoreState = {
  wished: Set<string>;
  toggleWish: (id: string) => void;
  addToCart: (product: Product) => void;
  openProduct: (product: Product) => void;
  productsToShow?: Product[];
  setCategory: (category: string) => void;
};

function ProductsPage(props: StoreState) {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const search = params.get("search")?.toLowerCase() ?? "";
  const filtered = products.filter(
    (product) =>
      (!category || product.category === category) &&
      (!search ||
        `${product.name} ${product.category}`.toLowerCase().includes(search)),
  );
  return (
    <main className="br-container py-7 sm:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#07518b]">
            <Link href="/" data-testid="breadcrumb-home">
              Home
            </Link>
            <ChevronRight size={13} />
            <span>Products</span>
          </div>
          <h1 className="font-display text-3xl font-bold tracking-[-.04em] text-[#14283a]">
            {category ||
              (search ? `Search results for "${search}"` : "All Products")}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {filtered.length} dependable products for your next job
          </p>
        </div>
        <button
          data-testid="button-filter-products"
          className="flex items-center gap-2 rounded border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-[#07518b]"
        >
          <SlidersHorizontal size={16} /> Filter & Sort{" "}
          <ChevronDown size={15} />
        </button>
      </div>
      <div className="mt-7 grid gap-5 lg:grid-cols-[220px_1fr]">
        <aside className="br-desktop h-fit rounded-lg border border-slate-200 bg-white p-4">
          <h3 className="font-bold text-[#14283a]">Shop by category</h3>
          <div className="mt-3 space-y-1">
            {categories.map((item) => (
              <Link
                key={item.label}
                href={`/products?category=${encodeURIComponent(item.label)}`}
                data-testid={`sidebar-category-${item.label.toLowerCase().replaceAll(" ", "-")}`}
                className={`block rounded px-2 py-2 text-sm ${category === item.label ? "bg-[#e3f2f8] font-bold text-[#07518b]" : "text-slate-600 hover:bg-slate-50"}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </aside>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              wished={props.wished.has(product.id)}
              onWish={() => props.toggleWish(product.id)}
              onAdd={() => props.addToCart(product)}
              onOpen={() => props.openProduct(product)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function CheckoutPage({
  cart,
  change,
  remove,
  placeOrder,
}: {
  cart: Record<string, number>;
  change: (id: string, amount: number) => void;
  remove: (id: string) => void;
  placeOrder: () => void;
}) {
  const items = Object.entries(cart)
    .map(([id, quantity]) => ({
      product: products.find((p) => p.id === id)!,
      quantity,
    }))
    .filter((x) => x.product);
  const total = items.reduce((sum, x) => sum + x.product.price * x.quantity, 0);
  const [placed, setPlaced] = useState(false);
  if (placed)
    return (
      <main className="br-container flex min-h-[60vh] items-center justify-center py-12">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e1f5e8] text-[#188548]">
            <Check size={32} />
          </div>
          <h1 className="mt-5 font-display text-3xl font-bold text-[#14283a]">
            Order placed with confidence
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Thanks for choosing {STORE_NAME}. Your order BR-24081 is confirmed
            and our team will begin preparing it shortly.
          </p>
          <Link
            href="/"
            data-testid="link-back-home-order"
            className="mt-6 inline-flex items-center gap-2 rounded bg-[#07518b] px-5 py-3 text-sm font-bold text-white"
          >
            Continue Shopping <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  return (
    <main className="br-container py-7 sm:py-10">
      <div className="mb-8 flex items-center gap-2 text-xs font-semibold text-[#07518b]">
        <Link href="/" data-testid="checkout-breadcrumb-home">
          Home
        </Link>
        <ChevronRight size={13} />
        <span>Checkout</span>
      </div>
      <h1 className="font-display text-3xl font-bold tracking-[-.04em] text-[#14283a]">
        Checkout
      </h1>
      {!items.length ? (
        <div className="mt-8 rounded-xl border border-dashed border-slate-300 py-16 text-center">
          <ShoppingCart className="mx-auto text-slate-300" size={40} />
          <p className="mt-4 font-bold">Your cart is empty</p>
          <Link
            href="/products"
            data-testid="link-shop-checkout-empty"
            className="mt-4 inline-flex rounded bg-[#07518b] px-5 py-2 text-sm font-bold text-white"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_380px]">
          <div className="space-y-5">
            <section className="rounded-lg border border-slate-200 bg-white p-5">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <MapPinIcon /> Delivery Details
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <input
                  data-testid="input-checkout-name"
                  placeholder="Full name"
                  className="rounded border border-slate-300 px-3 py-3 text-sm outline-none focus:border-[#07518b]"
                />
                <input
                  data-testid="input-checkout-phone"
                  placeholder="Mobile number"
                  className="rounded border border-slate-300 px-3 py-3 text-sm outline-none focus:border-[#07518b]"
                />
                <input
                  data-testid="input-checkout-address"
                  placeholder="Address"
                  className="rounded border border-slate-300 px-3 py-3 text-sm outline-none focus:border-[#07518b] sm:col-span-2"
                />
                <input
                  data-testid="input-checkout-city"
                  placeholder="City"
                  className="rounded border border-slate-300 px-3 py-3 text-sm outline-none focus:border-[#07518b]"
                />
                <input
                  data-testid="input-checkout-pincode"
                  placeholder="Pincode"
                  className="rounded border border-slate-300 px-3 py-3 text-sm outline-none focus:border-[#07518b]"
                />
              </div>
            </section>
            <section className="rounded-lg border border-slate-200 bg-white p-5">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <CreditCard size={19} className="text-[#07518b]" /> Payment
                Method
              </h2>
              <label className="mt-4 flex items-center gap-3 rounded border border-[#8fc9e2] bg-[#f0f8fb] p-4 text-sm">
                <input type="radio" checked readOnly /> Cash on Delivery{" "}
                <span className="ml-auto text-xs text-slate-500">
                  Available
                </span>
              </label>
              <label className="mt-2 flex items-center gap-3 rounded border border-slate-200 p-4 text-sm text-slate-500">
                <input type="radio" disabled /> UPI / Cards{" "}
                <span className="ml-auto text-xs">Coming soon</span>
              </label>
            </section>
          </div>
          <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="font-display text-lg font-bold">Order Summary</h2>
            <div className="mt-4 space-y-3">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-3">
                  <ProductArt kind={product.art} image={product.image} small />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <button
                        data-testid={`checkout-decrease-${product.id}`}
                        onClick={() => change(product.id, -1)}
                      >
                        <Minus size={12} />
                      </button>
                      Qty {quantity}
                      <button
                        data-testid={`checkout-increase-${product.id}`}
                        onClick={() => change(product.id, 1)}
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        data-testid={`checkout-remove-${product.id}`}
                        onClick={() => remove(product.id)}
                        className="ml-2 text-[#f23868]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <b className="text-sm">{money(product.price * quantity)}</b>
                </div>
              ))}
            </div>
            <div className="my-5 border-t border-slate-200 pt-4">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span>{money(total)}</span>
              </div>
              <div className="mt-2 flex justify-between text-sm text-slate-600">
                <span>Delivery</span>
                <span className="text-[#188548]">FREE</span>
              </div>
              <div className="mt-4 flex justify-between text-lg font-bold text-[#14283a]">
                <span>Total</span>
                <span>{money(total)}</span>
              </div>
            </div>
            <button
              data-testid="button-place-order"
              onClick={() => {
                placeOrder();
                setPlaced(true);
              }}
              className="flex w-full items-center justify-center gap-2 rounded bg-[#f23868] py-3 text-sm font-bold text-white"
            >
              Place Order <ArrowRight size={16} />
            </button>
            <p className="mt-3 text-center text-[11px] text-slate-500">
              Your details are protected with {STORE_NAME}'s secure checkout.
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}

function MapPinIcon() {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e3f2f8] text-xs font-bold text-[#07518b]">
      1
    </span>
  );
}

function DealsPage(props: StoreState) {
  const deals = products.filter((p) => p.originalPrice);
  return (
    <main>
      <section className="bg-[#07518b] py-12 text-white">
        <div className="br-container">
          <p className="text-sm font-semibold text-[#a8e6ff]">
            Limited-time savings for your next project
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-[-.04em]">
            Deals & Offers
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-6 text-blue-100">
            Better prices on the tools and materials that keep your work moving.
          </p>
        </div>
      </section>
      <ProductSection
        {...props}
        title="Today's dependable deals"
        subtitle="Real value from brands you already trust"
        productsToShow={deals}
      />
      <TrustStrip />
    </main>
  );
}

function WishlistPage(props: StoreState) {
  const wished = products.filter((product) => props.wished.has(product.id));
  return (
    <main className="br-container py-8">
      <h1 className="font-display text-3xl font-bold text-[#14283a]">
        Your Wishlist
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Keep the products you are considering close.
      </p>
      <div className="mt-7">
        {wished.length ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {wished.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                wished
                onWish={() => props.toggleWish(product.id)}
                onAdd={() => props.addToCart(product)}
                onOpen={() => props.openProduct(product)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed border-slate-300 py-20 text-center">
            <Heart className="mx-auto text-slate-300" size={40} />
            <h2 className="mt-4 font-bold text-[#14283a]">
              Your wishlist is empty
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Tap the heart on a product to save it here.
            </p>
            <Link
              href="/products"
              data-testid="link-browse-wishlist"
              className="mt-5 inline-flex rounded bg-[#07518b] px-5 py-2.5 text-sm font-bold text-white"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

function App() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [wished, setWished] = useState<Set<string>>(new Set());
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [, navigate] = useLocation();
  const cartCount = Object.values(cart).reduce((sum, value) => sum + value, 0);
  const wishlistCount = wished.size;
  const addToCart = (product: Product) => {
    setCart((current) => ({
      ...current,
      [product.id]: (current[product.id] ?? 0) + 1,
    }));
    setCartOpen(true);
  };
  const changeCart = (id: string, amount: number) =>
    setCart((current) => {
      const next = (current[id] ?? 0) + amount;
      if (next <= 0) {
        const { [id]: _removed, ...rest } = current;
        return rest;
      }
      return { ...current, [id]: next };
    });
  const removeFromCart = (id: string) =>
    setCart((current) => {
      const { [id]: _removed, ...rest } = current;
      return rest;
    });
  const toggleWish = (id: string) =>
    setWished((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const setCategory = (category: string) =>
    navigate(`/products?category=${encodeURIComponent(category)}`);
  const shared: StoreState = useMemo(
    () => ({
      wished,
      toggleWish,
      addToCart,
      openProduct: setSelectedProduct,
      setCategory,
    }),
    [wished],
  );
  return (
    <div className="br-shell br-noise">
      <Header
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onCart={() => setCartOpen(true)}
        onMenu={() => setMenuOpen(true)}
      />
      {menuOpen && <MobileMenu close={() => setMenuOpen(false)} />}
      <Switch>
        <Route
          path="/products"
          component={() => <ProductsPage {...shared} />}
        />
        <Route path="/deals" component={() => <DealsPage {...shared} />} />
        <Route
          path="/wishlist"
          component={() => <WishlistPage {...shared} />}
        />
        <Route
          path="/checkout"
          component={() => (
            <CheckoutPage
              cart={cart}
              change={changeCart}
              remove={removeFromCart}
              placeOrder={() => setCart({})}
            />
          )}
        />
        <Route path="/" component={() => <HomePage {...shared} />} />
        <Route component={() => <ProductsPage {...shared} />} />
      </Switch>
      {cartOpen && (
        <CartDrawer
          cart={cart}
          close={() => setCartOpen(false)}
          change={changeCart}
          remove={removeFromCart}
          checkout={() => {
            setCartOpen(false);
            navigate("/checkout");
          }}
        />
      )}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          close={() => setSelectedProduct(null)}
          add={() => {
            addToCart(selectedProduct);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
