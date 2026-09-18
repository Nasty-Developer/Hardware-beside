import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, Route, Switch, useLocation, useParams } from "wouter";
import {
  ArrowRight,
  BadgeCheck,
  Box,
  Building2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Drill,
  Hammer,
  Heart,
  LampCeiling,
  Menu,
  MessageCircle,
  Minus,
  PackageCheck,
  Paintbrush,
  Plus,
  PhoneCall,
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
import {
  categories,
  categoryReferenceImages,
  featuredProducts,
  products,
  type Product,
} from "@/data/products";
import heroToolsImage from "../attached_assets/generated_images/shree-sawariya-hero-tools.png";

const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;
const STORE_NAME = "Shree Sawariya";
const STORE_PHONE = "+91 91362 11245";
const STORE_PHONE_LINK = "919136211245";
const WHATSAPP_NUMBER = "919136211245";
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
          loading="lazy"
          decoding="async"
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
              className="flex items-center gap-3 rounded-lg p-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              <ProductArt kind={category.art} image={category.image} small />
              <span className="min-w-0 flex-1">{category.label}</span>
              <ChevronRight size={16} className="shrink-0" />
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
        {categories.slice(0, 9).map((category) => (
          <button
            key={category.label}
            onClick={() => select?.(category.label)}
            data-testid={`category-tile-${category.label.toLowerCase().replaceAll(" ", "-")}`}
            className="group flex min-h-[94px] flex-col items-center justify-center gap-2 rounded-xl border border-white bg-white/80 p-2 text-center transition hover:-translate-y-0.5 hover:border-[#a9d7eb] hover:bg-white"
          >
            <ProductArt kind={category.art} image={category.image} small />
            <span className="text-[11px] font-bold leading-tight text-[#14283a]">
              {category.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function ReferenceCategoryHighlights() {
  const highlightIds = [
    "cat-power-tools",
    "cat-door-hardware",
    "cat-abrasives-cutting",
    "cat-pipe-fittings",
  ];

  return (
    <section className="bg-white py-8 sm:py-10">
      <div className="br-container">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#f23868]">
              Reference picks
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-[-.03em] text-[#14283a]">
              Shop by specialty
            </h2>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1 text-xs font-bold text-[#07518b] hover:text-[#f23868]"
          >
            All Categories <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {highlightIds.map((categoryId) => {
            const category = categories.find((item) => item.id === categoryId);
            const references = categoryReferenceImages[categoryId] ?? [];
            if (!category || references.length === 0) return null;
            return (
              <Link
                key={category.id}
                href={`/products?category=${encodeURIComponent(category.label)}`}
                className="group overflow-hidden rounded-xl border border-slate-200 bg-[#f7fbfd] transition hover:-translate-y-0.5 hover:border-[#9bcde3] hover:shadow-[0_10px_28px_rgba(7,81,139,.1)]"
              >
                <div className="grid h-40 gap-1 bg-white p-2 [grid-template-columns:repeat(2,minmax(0,1fr))]">
                  {references.map((reference, index) => (
                    <div
                      key={reference.label}
                      className={`${references.length === 1 || index === 0 ? "row-span-2" : ""} overflow-hidden rounded-lg bg-white`}
                    >
                      <img
                        src={reference.image}
                        alt={reference.label}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-2 px-4 py-3">
                  <div>
                    <p className="text-sm font-bold text-[#14283a]">{category.label}</p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      {references.map((reference) => reference.label).join(" · ")}
                    </p>
                  </div>
                  <ChevronRight size={16} className="shrink-0 text-[#07518b]" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CategoryDirectory() {
  return (
    <section className="mt-7 rounded-xl border border-[#c9e1eb] bg-[#f0f6fa] p-4 sm:p-5">
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-[#f23868]">
          Browse the full range
        </p>
        <h2 className="mt-1 font-display text-2xl font-bold tracking-[-.03em] text-[#14283a]">
          All Categories
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Explore electrical, hardware, plumbing, tools, and project supplies.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${encodeURIComponent(category.label)}`}
            className="group rounded-lg border border-white bg-white p-3 transition hover:-translate-y-0.5 hover:border-[#9bcde3] hover:shadow-[0_8px_20px_rgba(7,81,139,.08)]"
          >
            <ProductArt kind={category.art} image={category.image} />
            <div className="mt-2 flex items-start justify-between gap-2">
              <span className="text-xs font-bold leading-4 text-[#14283a]">
                {category.label}
              </span>
              <ChevronRight size={14} className="mt-0.5 shrink-0 text-[#07518b]" />
            </div>
            <span className="mt-1 block text-[10px] text-slate-400">
              {category.count} items
            </span>
          </Link>
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
  onOrder,
  onOpen,
}: {
  product: Product;
  wished: boolean;
  onWish: () => void;
  onAdd: () => void;
  onOrder: () => void;
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
      {product.reviews > 0 ? (
        <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
          <Star size={13} fill="#f7b928" strokeWidth={0} />
          <b className="text-slate-700">{product.rating}</b> ({product.reviews})
        </div>
      ) : (
        <div className="mt-1 text-[11px] text-slate-500">
          New catalogue item
        </div>
      )}
      <div className="mt-2 flex items-end gap-2">
        <span className="text-base font-bold text-[#14283a]">
          {money(product.price)}
        </span>
        {product.priceIsEstimate && (
          <span className="text-[10px] text-slate-400">estimate</span>
        )}
        {product.originalPrice && (
          <del className="text-xs text-slate-400">
            {money(product.originalPrice)}
          </del>
        )}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          onClick={onOrder}
          data-testid={`button-order-now-${product.id}`}
          className="flex h-9 items-center justify-center gap-1 rounded border border-[#07518b] px-2 text-[11px] font-bold text-[#07518b] transition hover:bg-[#e7f4fa]"
        >
          <MessageCircle size={14} /> Order Now
        </button>
        <button
          onClick={onAdd}
          data-testid={`button-add-cart-${product.id}`}
          className="flex h-9 items-center justify-center rounded bg-[#07518b] px-2 text-[11px] font-bold text-white transition hover:bg-[#053b67]"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

function ProductSection({
  wished,
  toggleWish,
  addToCart,
  orderProduct,
  openProduct,
  productsToShow = featuredProducts,
  title = "Featured Products",
  subtitle,
}: {
  wished: Set<string>;
  toggleWish: (id: string) => void;
  addToCart: (product: Product) => void;
  orderProduct: (product: Product) => void;
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
              onOrder={() => orderProduct(product)}
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
            href="/products?category=Cement%20Mortar%20%26%20Civil%20Materials"
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
            href="/products?category=Paints%20%26%20Primers"
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
            <b className="block text-sm">Simple Ordering</b>
            <small className="text-xs text-slate-500">
              Request sent on WhatsApp
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
              href={`tel:${STORE_PHONE_LINK}`}
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
                href={`tel:${STORE_PHONE_LINK}`}
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

function NeedProductSection() {
  return (
    <section id="need-product" className="bg-[#e7f4fa] py-9 sm:py-12">
      <div className="br-container">
        <div className="relative overflow-hidden rounded-2xl bg-[#07518b] px-5 py-8 text-white shadow-[0_14px_34px_rgba(7,81,139,.18)] sm:px-10 sm:py-9">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full border-[28px] border-white/10" />
          <div className="absolute -bottom-32 right-28 h-64 w-64 rounded-full border-[20px] border-[#6dd6ff]/10" />
          <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#a8e6ff]">
                Personal product support
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-[-.04em] sm:text-4xl">
                Need Any Other Product?
              </h2>
              <p className="mt-2 text-sm text-blue-100 sm:text-base">
                Can't find what you're looking for?
                <br className="sm:hidden" /> Call us and we'll help you find it.
              </p>
              <a
                href={`tel:${STORE_PHONE_LINK}`}
                className="mt-4 inline-flex items-center gap-2 text-lg font-bold text-white hover:text-[#ffb2c4]"
              >
                <PhoneCall size={19} /> {STORE_PHONE}
              </a>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${STORE_PHONE_LINK}`}
                data-testid="link-need-product-call"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f23868] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#ff557e]"
              >
                <PhoneCall size={17} /> Call Us
              </a>
              <Link
                href="/order"
                data-testid="link-need-product-whatsapp"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#07518b] transition hover:bg-[#e7f7ff]"
              >
                <MessageCircle size={17} /> Order via WhatsApp
              </Link>
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
                href={`tel:${STORE_PHONE_LINK}`}
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
              <a href={`tel:${STORE_PHONE_LINK}`} className="block hover:text-white">Contact</a>
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

function ProductDetailPage({
  addToCart,
  orderProduct,
  toggleWish,
  wished,
}: Pick<StoreState, "addToCart" | "orderProduct" | "toggleWish" | "wished">) {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const product = products.find((item) => item.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <main className="br-container py-16 text-center">
        <h1 className="font-display text-3xl font-bold text-[#14283a]">
          Product not found
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          This catalogue item may have moved or is no longer available.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex rounded bg-[#07518b] px-5 py-3 text-sm font-bold text-white"
        >
          Browse the catalogue
        </Link>
      </main>
    );
  }

  const related = products
    .filter(
      (item) => item.categoryId === product.categoryId && item.id !== product.id,
    )
    .slice(0, 4);
  const isWished = wished.has(product.id);

  return (
    <main className="br-container py-7 sm:py-10">
      <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-[#07518b]">
        <Link href="/" data-testid="product-breadcrumb-home">
          Home
        </Link>
        <ChevronRight size={13} />
        <Link
          href={`/products?category=${encodeURIComponent(product.category)}`}
          data-testid="product-breadcrumb-category"
        >
          {product.category}
        </Link>
        <ChevronRight size={13} />
        <span className="truncate text-slate-500">{product.name}</span>
      </div>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-8">
          <ProductArt kind={product.art} image={product.image} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#f23868]">
            {product.category}
          </p>
          <h1
            data-testid={`text-product-detail-${product.id}`}
            className="mt-2 font-display text-3xl font-bold leading-tight tracking-[-.04em] text-[#14283a] sm:text-4xl"
          >
            {product.name}
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Specification: <b className="text-slate-700">{product.specification}</b>
          </p>
          <p className="mt-5 text-sm leading-7 text-slate-600">
            {product.description}
          </p>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-[#14283a]">
              {money(product.price)}
            </span>
            {product.originalPrice && (
              <del className="text-sm text-slate-400">
                {money(product.originalPrice)}
              </del>
            )}
            {product.priceIsEstimate && (
              <span className="text-xs text-slate-400">
                catalogue estimate
              </span>
            )}
          </div>
          <div className="mt-5 rounded-lg bg-[#f0f6fa] p-4 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="font-semibold text-[#07518b]">Stock status</span>
              <span className="font-bold text-slate-700">
                {product.stockStatus}
              </span>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Catalogue prices and availability can change. Confirm the latest
              store price before ordering.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded border border-slate-300">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="p-3 text-slate-600"
              >
                <Minus size={16} />
              </button>
              <span className="w-10 text-center text-sm font-bold">{quantity}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQuantity((value) => value + 1)}
                className="p-3 text-slate-600"
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              data-testid={`button-detail-add-${product.id}`}
              onClick={() => {
                for (let index = 0; index < quantity; index += 1) {
                  addToCart(product);
                }
              }}
              className="flex flex-1 items-center justify-center gap-2 rounded bg-[#07518b] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#053b67]"
            >
              <ShoppingCart size={17} /> Add to Cart
            </button>
            <button
              data-testid={`button-detail-order-${product.id}`}
              onClick={() =>
                navigate(
                  `/order?product=${encodeURIComponent(product.id)}&quantity=${quantity}`,
                )
              }
              className="flex flex-1 items-center justify-center gap-2 rounded border border-[#07518b] px-5 py-3 text-sm font-bold text-[#07518b] transition hover:bg-[#e7f4fa]"
            >
              <MessageCircle size={17} /> Order Now
            </button>
            <button
              data-testid={`button-detail-wishlist-${product.id}`}
              onClick={() => toggleWish(product.id)}
              className={`rounded border p-3 ${isWished ? "border-[#f23868] text-[#f23868]" : "border-slate-300 text-slate-600"}`}
              aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart size={19} fill={isWished ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </section>

      <section className="mt-12 border-t border-slate-200 pt-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#14283a]">
              Related products
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              More catalogue items from {product.category}.
            </p>
          </div>
          <Link
            href={`/products?category=${encodeURIComponent(product.category)}`}
            className="text-xs font-bold text-[#07518b]"
          >
            View category
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {related.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              wished={wished.has(item.id)}
              onWish={() => toggleWish(item.id)}
              onAdd={() => addToCart(item)}
              onOrder={() => orderProduct(item)}
              onOpen={() => navigate(`/product/${item.id}`)}
            />
          ))}
        </div>
      </section>
    </main>
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
              <MessageCircle size={17} /> Order via WhatsApp
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
      <ReferenceCategoryHighlights />
      <ProductSection {...props} />
      <PromotionalBands />
      <TrustStrip />
      <StoreInfo />
      <NeedProductSection />
      <Footer />
    </>
  );
}

type StoreState = {
  wished: Set<string>;
  toggleWish: (id: string) => void;
  addToCart: (product: Product) => void;
  orderProduct: (product: Product) => void;
  openProduct: (product: Product) => void;
  productsToShow?: Product[];
  setCategory: (category: string) => void;
};

function ProductsPage(props: StoreState) {
  const [location] = useLocation();
  const params = useMemo(
    () => new URLSearchParams(window.location.search),
    [location],
  );
  const category = params.get("category");
  const search = params.get("search")?.toLowerCase() ?? "";
  const [sort, setSort] = useState("featured");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 24;
  const categoryInfo = categories.find((item) => item.label === category);

  useEffect(() => {
    setPage(1);
  }, [category, search, sort, availableOnly]);

  const filtered = useMemo(
    () =>
      products
        .filter(
          (product) =>
            (!category || product.category === category) &&
            (!search || product.searchText.includes(search)) &&
            (!availableOnly || product.stockStatus === "Available to order"),
        )
        .sort((first, second) => {
          if (sort === "price-low") return first.price - second.price;
          if (sort === "price-high") return second.price - first.price;
          if (sort === "name") return first.name.localeCompare(second.name);
          return Number(Boolean(second.originalPrice)) - Number(Boolean(first.originalPrice));
        }),
    [availableOnly, category, search, sort],
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleProducts = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const filterControls = (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-[#14283a]">
        Sort products
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          className="mt-2 w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm font-normal outline-none focus:border-[#07518b]"
        >
          <option value="featured">Featured first</option>
          <option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </label>
      <label className="flex items-center gap-2 text-sm text-slate-600">
        <input
          type="checkbox"
          checked={availableOnly}
          onChange={(event) => setAvailableOnly(event.target.checked)}
          className="accent-[#07518b]"
        />
        Show items marked available to order
      </label>
    </div>
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
            {filtered.length.toLocaleString("en-IN")} catalogue items for your
            next job
          </p>
        </div>
        <button
          data-testid="button-filter-products"
          onClick={() => setFiltersOpen(true)}
          className="flex items-center gap-2 rounded border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-[#07518b]"
        >
          <SlidersHorizontal size={16} /> Filter & Sort{" "}
          <ChevronDown size={15} />
        </button>
      </div>
      {categoryInfo && (
        <section className="mt-6 grid items-center gap-5 rounded-xl border border-[#c9e1eb] bg-[#f0f6fa] p-4 sm:grid-cols-[150px_1fr] sm:p-5">
          <img
            src={categoryInfo.image}
            alt=""
            loading="lazy"
            className="h-28 w-full rounded-lg bg-white object-contain p-2 sm:h-24"
          />
          <div>
            <p className="text-sm leading-6 text-slate-600">
              {categoryInfo.description}
            </p>
            <p className="mt-2 text-xs font-bold text-[#07518b]">
              {categoryInfo.count} catalogue entries · one representative image
              reused across this category
            </p>
          </div>
        </section>
      )}
      {!category && !search && <CategoryDirectory />}
      {category && categoryReferenceImages[categoryInfo?.id ?? ""] && (
        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#f23868]">
              Category references
            </p>
            <h2 className="mt-1 font-display text-xl font-bold text-[#14283a]">
              {category} examples
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(categoryReferenceImages[categoryInfo?.id ?? ""] ?? []).map(
              (reference) => (
                <div
                  key={reference.label}
                  className="overflow-hidden rounded-lg border border-slate-200 bg-[#f7fbfd]"
                >
                  <div className="h-40 bg-white p-2 sm:h-48">
                    <img
                      src={reference.image}
                      alt={reference.label}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <p className="px-3 py-2 text-xs font-bold text-[#14283a]">
                    {reference.label}
                  </p>
                </div>
              ),
            )}
          </div>
        </section>
      )}
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
                <span className="flex items-center justify-between gap-2">
                  {item.label}
                  <small className="text-[10px] text-slate-400">
                    {item.count}
                  </small>
                </span>
              </Link>
            ))}
            <div className="mt-5 border-t border-slate-100 pt-4">
              {filterControls}
            </div>
          </div>
        </aside>
        <div>
          {visibleProducts.length ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  wished={props.wished.has(product.id)}
                  onWish={() => props.toggleWish(product.id)}
                  onAdd={() => props.addToCart(product)}
                  onOrder={() => props.orderProduct(product)}
                  onOpen={() => props.openProduct(product)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 py-20 text-center">
              <p className="font-bold text-[#14283a]">No catalogue items found</p>
              <p className="mt-1 text-sm text-slate-500">
                Try a broader search or clear the availability filter.
              </p>
            </div>
          )}
          {filtered.length > pageSize && (
            <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-slate-500">
                Showing {(currentPage - 1) * pageSize + 1}–
                {Math.min(currentPage * pageSize, filtered.length)} of{" "}
                {filtered.length.toLocaleString("en-IN")}
              </p>
              <div className="flex items-center gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                  className="rounded border border-slate-300 px-3 py-2 text-xs font-bold text-[#07518b] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>
                {Array.from(
                  { length: Math.min(5, totalPages) },
                  (_, index) => {
                    const pageNumber = Math.min(
                      Math.max(1, currentPage - 2) + index,
                      totalPages,
                    );
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setPage(pageNumber)}
                        className={`h-8 min-w-8 rounded border px-2 text-xs font-bold ${pageNumber === currentPage ? "border-[#07518b] bg-[#07518b] text-white" : "border-slate-300 text-[#07518b]"}`}
                      >
                        {pageNumber}
                      </button>
                    );
                  },
                )}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setPage((value) => Math.min(totalPages, value + 1))
                  }
                  className="rounded border border-slate-300 px-3 py-2 text-xs font-bold text-[#07518b] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {filtersOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#051d31]/40 p-4 lg:hidden"
          onClick={() => setFiltersOpen(false)}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="mx-auto mt-16 max-w-md rounded-xl bg-white p-5 shadow-2xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-[#14283a]">
                Filter & Sort
              </h2>
              <button onClick={() => setFiltersOpen(false)}>
                <X size={20} />
              </button>
            </div>
            {filterControls}
            <button
              onClick={() => setFiltersOpen(false)}
              className="mt-6 w-full rounded bg-[#07518b] py-3 text-sm font-bold text-white"
            >
              Show {filtered.length.toLocaleString("en-IN")} items
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

type OrderRequestValues = {
  name: string;
  mobile: string;
  productName: string;
  quantity: string;
  address: string;
  landmark: string;
  deliveryNotes: string;
};

function OrderRequestPage({ cart }: { cart: Record<string, number> }) {
  const [location] = useLocation();
  const params = useMemo(
    () => new URLSearchParams(window.location.search),
    [location],
  );
  const product = products.find((item) => item.id === params.get("product"));
  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, quantity]) => ({
          product: products.find((item) => item.id === id),
          quantity,
        }))
        .filter(
          (item): item is { product: Product; quantity: number } =>
            Boolean(item.product),
        ),
    [cart],
  );
  const requestedQuantity = Math.max(
    1,
    Number.parseInt(params.get("quantity") ?? "1", 10) || 1,
  );
  const defaults = useMemo<OrderRequestValues>(
    () => ({
      name: "",
      mobile: "",
      productName:
        product?.name ??
        cartItems
          .map((item) => `${item.product.name} (Qty: ${item.quantity})`)
          .join(", "),
      quantity: product
        ? String(requestedQuantity)
        : String(
            cartItems.reduce((total, item) => total + item.quantity, 0) || 1,
          ),
      address: "",
      landmark: "",
      deliveryNotes: "",
    }),
    [cartItems, product, requestedQuantity],
  );
  const [form, setForm] = useState<OrderRequestValues>(defaults);

  useEffect(() => {
    setForm(defaults);
  }, [defaults]);

  const summaryItems = product
    ? [{ product, quantity: requestedQuantity }]
    : cartItems;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const message = [
      "ORDER REQUEST - Shree Sawariya",
      "",
      `Name: ${form.name}`,
      `Mobile Number: ${form.mobile}`,
      `Product Name: ${form.productName}`,
      `Quantity: ${form.quantity}`,
      `Address: ${form.address}`,
      `Landmark: ${form.landmark || "Not provided"}`,
      `Delivery Notes: ${form.deliveryNotes || "Not provided"}`,
      "",
      "This is an order request. Please confirm availability, final price, and delivery details on WhatsApp.",
    ].join("\n");
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message,
    )}`;
    const popup = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (!popup) window.location.assign(whatsappUrl);
  };

  return (
    <main className="br-container py-7 sm:py-10">
      <div className="mb-7 flex items-center gap-2 text-xs font-semibold text-[#07518b]">
        <Link href="/" data-testid="order-breadcrumb-home">
          Home
        </Link>
        <ChevronRight size={13} />
        <span>WhatsApp Order Request</span>
      </div>
      <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_350px]">
        <section>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#f23868]">
            No online payment
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-[-.04em] text-[#14283a] sm:text-4xl">
            Send an Order Request
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Share your details and we’ll open WhatsApp with a pre-filled
            request for {STORE_NAME}. Your order is not confirmed until our
            team replies.
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-7 rounded-xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(7,81,139,.06)] sm:p-7"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-[#14283a]">
                Name
                <input
                  required
                  autoComplete="name"
                  data-testid="input-order-name"
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, name: event.target.value }))
                  }
                  placeholder="Your full name"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm font-normal outline-none transition focus:border-[#07518b] focus:ring-2 focus:ring-[#07518b]/10"
                />
              </label>
              <label className="text-sm font-semibold text-[#14283a]">
                Mobile Number
                <input
                  required
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  data-testid="input-order-mobile"
                  value={form.mobile}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, mobile: event.target.value }))
                  }
                  placeholder="+91 98765 43210"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm font-normal outline-none transition focus:border-[#07518b] focus:ring-2 focus:ring-[#07518b]/10"
                />
              </label>
              <label className="text-sm font-semibold text-[#14283a] sm:col-span-2">
                Product Name
                <input
                  required
                  data-testid="input-order-product"
                  value={form.productName}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      productName: event.target.value,
                    }))
                  }
                  placeholder="What would you like to order?"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm font-normal outline-none transition focus:border-[#07518b] focus:ring-2 focus:ring-[#07518b]/10"
                />
              </label>
              <label className="text-sm font-semibold text-[#14283a]">
                Quantity
                <input
                  required
                  min="1"
                  type="number"
                  inputMode="numeric"
                  data-testid="input-order-quantity"
                  value={form.quantity}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, quantity: event.target.value }))
                  }
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm font-normal outline-none transition focus:border-[#07518b] focus:ring-2 focus:ring-[#07518b]/10"
                />
              </label>
              <label className="text-sm font-semibold text-[#14283a] sm:col-span-2">
                Address
                <textarea
                  required
                  rows={3}
                  autoComplete="street-address"
                  data-testid="input-order-address"
                  value={form.address}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, address: event.target.value }))
                  }
                  placeholder="Full delivery address"
                  className="mt-2 w-full resize-y rounded-lg border border-slate-300 px-3 py-3 text-sm font-normal outline-none transition focus:border-[#07518b] focus:ring-2 focus:ring-[#07518b]/10"
                />
              </label>
              <label className="text-sm font-semibold text-[#14283a]">
                Landmark <span className="font-normal text-slate-400">(optional)</span>
                <input
                  data-testid="input-order-landmark"
                  value={form.landmark}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, landmark: event.target.value }))
                  }
                  placeholder="Nearby landmark"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm font-normal outline-none transition focus:border-[#07518b] focus:ring-2 focus:ring-[#07518b]/10"
                />
              </label>
              <label className="text-sm font-semibold text-[#14283a]">
                Delivery Notes <span className="font-normal text-slate-400">(optional)</span>
                <input
                  data-testid="input-order-notes"
                  value={form.deliveryNotes}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      deliveryNotes: event.target.value,
                    }))
                  }
                  placeholder="Timing or delivery instructions"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm font-normal outline-none transition focus:border-[#07518b] focus:ring-2 focus:ring-[#07518b]/10"
                />
              </label>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="submit"
                data-testid="button-order-via-whatsapp"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#07518b] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#053b67]"
              >
                <MessageCircle size={18} /> Order via WhatsApp
              </button>
              <a
                href={`tel:${STORE_PHONE_LINK}`}
                data-testid="link-order-call-us"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#07518b] px-5 py-3 text-sm font-bold text-[#07518b] transition hover:bg-[#e7f4fa]"
              >
                <PhoneCall size={18} /> Call Us
              </a>
            </div>
            <p className="mt-4 text-center text-xs leading-5 text-slate-500">
              This sends an ORDER REQUEST to {STORE_NAME} via WhatsApp. No
              online payment is processed and no order is marked confirmed.
            </p>
          </form>
        </section>
        <aside className="h-fit rounded-xl border border-[#c9e1eb] bg-[#f0f6fa] p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#f23868]">
            Request summary
          </p>
          <h2 className="mt-2 font-display text-xl font-bold text-[#14283a]">
            What you’re requesting
          </h2>
          {summaryItems.length ? (
            <div className="mt-5 space-y-3">
              {summaryItems.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3 rounded-lg bg-white p-3">
                  <ProductArt kind={item.product.art} image={item.product.image} small />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#14283a]">{item.product.name}</p>
                    <p className="mt-1 text-xs text-slate-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-5 rounded-lg bg-white p-4 text-sm leading-6 text-slate-600">
              Add a product name in the form and we’ll send it to the store team.
            </p>
          )}
          <div className="mt-5 border-t border-[#c9e1eb] pt-4 text-sm leading-6 text-slate-600">
            <p className="font-bold text-[#14283a]">WhatsApp order desk</p>
            <p>{STORE_PHONE}</p>
            <p className="mt-2 text-xs">
              The store will confirm availability, final pricing, and delivery
              details directly with you.
            </p>
          </div>
        </aside>
      </div>
    </main>
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
                onOrder={() => props.orderProduct(product)}
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
      orderProduct: (product: Product) =>
        navigate(`/order?product=${encodeURIComponent(product.id)}&quantity=1`),
      openProduct: (product: Product) => navigate(`/product/${product.id}`),
      setCategory,
    }),
    [navigate, wished],
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
        <Route
          path="/product/:id"
          component={() => <ProductDetailPage {...shared} />}
        />
        <Route path="/deals" component={() => <DealsPage {...shared} />} />
        <Route
          path="/wishlist"
          component={() => <WishlistPage {...shared} />}
        />
        <Route
          path="/order"
          component={() => <OrderRequestPage cart={cart} />}
        />
        <Route
          path="/checkout"
          component={() => <OrderRequestPage cart={cart} />}
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
            navigate("/order");
          }}
        />
      )}
    </div>
  );
}

export default App;
