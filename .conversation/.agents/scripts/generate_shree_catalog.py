from html import escape
from pathlib import Path
import re


SOURCE = Path(".agents/outputs/shree-catalog/catalogue-text.txt")
DATA_DIR = Path("artifacts/shree-sawariya-store/src/data")
IMAGE_DIR = Path("artifacts/shree-sawariya-store/src/assets/catalog")

ART_BY_CATEGORY = {
    "electrical": "bulb",
    "switch": "bulb",
    "mcb": "bulb",
    "led": "bulb",
    "fan": "bulb",
    "plumbing": "tap",
    "pipe": "tap",
    "valve": "tap",
    "sanitary": "tap",
    "kitchen": "tap",
    "tool": "drill",
    "measuring": "drill",
    "ladder": "ladder",
    "garden": "saw",
    "cleaning": "saw",
    "chain": "box",
    "rope": "box",
    "paint": "paint",
    "adhesive": "paint",
    "waterproof": "paint",
    "cement": "brick",
    "mortar": "brick",
    "civil": "brick",
    "plywood": "brick",
    "board": "brick",
    "glass": "box",
    "aluminium": "box",
    "welding": "socket",
    "metalwork": "socket",
    "abrasive": "socket",
    "cutting": "socket",
    "safety": "helmet",
    "ppe": "helmet",
    "hardware": "socket",
    "fastener": "socket",
    "screw": "socket",
    "bolt": "socket",
    "anchor": "socket",
    "rivet": "socket",
    "nail": "socket",
    "door": "socket",
    "lock": "socket",
    "furniture": "socket",
    "cabinet": "socket",
    "home repair": "box",
    "diy": "box",
}

PALETTE_BY_ART = {
    "bulb": ("#0b548d", "#d8f1fb", "#6dd6ff"),
    "tap": ("#087d87", "#d9f4f1", "#68d9d2"),
    "drill": ("#80500c", "#fff0ce", "#f5bc39"),
    "ladder": ("#48677d", "#e6f1f6", "#a6cde2"),
    "saw": ("#2f6a46", "#e0f3e7", "#82cf9d"),
    "paint": ("#a8295d", "#ffe3ed", "#f379a1"),
    "brick": ("#874f3f", "#f8e3d9", "#df9e7a"),
    "helmet": ("#986a00", "#fff1c8", "#f6c94c"),
    "socket": ("#374a67", "#e3eafa", "#91a9d4"),
    "box": ("#5e4e37", "#f1eadc", "#c7a56c"),
}


def slug(value: str) -> str:
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", value.lower())).strip("-")


def category_art(label: str) -> str:
    lower = label.lower()
    for key, art in ART_BY_CATEGORY.items():
        if key in lower:
            return art
    return "box"


def category_id(label: str) -> str:
    return f"cat-{slug(label)}"


def parse_catalogue():
    raw = SOURCE.read_text(encoding="utf-8")
    cleaned = re.sub(r"=== PAGE \d+ ===", "\n", raw)
    cleaned = re.sub(
        r"Shree Sawariya • 3,000-product catalogue blueprint Page \d+",
        "\n",
        cleaned,
    )
    cleaned = re.sub(r"Research basis.*", "", cleaned, flags=re.S)
    cleaned = re.sub(r"Replit implementation rule.*", "", cleaned, flags=re.S)

    categories = []
    for line in cleaned.splitlines():
        match = re.fullmatch(r"(.*?) 81", line.strip())
        if match and match.group(1).strip() not in categories:
            categories.append(match.group(1).strip())

    parsed = []
    search_start = cleaned.find("Electrical Wires & Cables")
    catalogue_text = cleaned[search_start:]
    for category_index, label in enumerate(categories):
        start = catalogue_text.find(f"\n{label}\n")
        if start < 0:
            start = catalogue_text.find(label)
        end = len(catalogue_text)
        for next_label in categories[category_index + 1 :]:
            next_start = catalogue_text.find(f"\n{next_label}\n", start + 1)
            if next_start >= 0:
                end = min(end, next_start)

        section = catalogue_text[start:end]
        section = " ".join(section.split())
        products = {}
        for number, name in re.findall(
            r"(?<!\d)(\d{1,2})\.\s*(.*?)(?=\s+\d{1,2}\.\s|$)",
            section,
        ):
            number = int(number)
            if number <= 81:
                products[number] = name.strip()

        ordered = [products[index] for index in range(1, 82) if index in products]
        if len(ordered) != 81:
            raise ValueError(f"{label}: expected 81 products, found {len(ordered)}")
        parsed.append((label, ordered))

    if len(parsed) != 37:
        raise ValueError(f"expected 37 categories, found {len(parsed)}")
    return parsed


def price_for(category_index: int, product_index: int) -> int:
    bases = [149, 299, 499, 699, 899, 1299, 1699, 2499, 3999]
    base = bases[category_index % len(bases)]
    multiplier = 1 + ((product_index * 7 + category_index * 11) % 18) / 10
    return max(49, round(base * multiplier / 10) * 10)


def write_category_image(category_index: int, label: str, art: str):
    fill, background, accent = PALETTE_BY_ART[art]
    short_label = label.replace(" & ", " · ").replace(" and ", " · ")
    lines = []
    words = short_label.split()
    current = ""
    for word in words:
        if len(current) + len(word) + 1 > 22 and current:
            lines.append(current)
            current = word
        else:
            current = f"{current} {word}".strip()
    if current:
        lines.append(current)
    lines = lines[:3]
    text_lines = "\n".join(
        f'<text x="44" y="{270 + i * 26}" font-family="Arial, sans-serif" font-size="19" font-weight="700" fill="{fill}">{escape(line)}</text>'
        for i, line in enumerate(lines)
    )
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="640" height="420" viewBox="0 0 640 420">
  <rect width="640" height="420" rx="28" fill="{background}"/>
  <path d="M0 78C116 18 206 114 322 62S525 22 640 76V0H0Z" fill="{accent}" opacity=".28"/>
  <circle cx="510" cy="142" r="96" fill="{accent}" opacity=".28"/>
  <circle cx="510" cy="142" r="64" fill="{fill}" opacity=".92"/>
  <path d="M474 146h72M510 110v72" stroke="white" stroke-width="10" stroke-linecap="round" opacity=".9"/>
  <rect x="44" y="48" width="118" height="10" rx="5" fill="{fill}" opacity=".32"/>
  <rect x="44" y="70" width="78" height="8" rx="4" fill="{fill}" opacity=".2"/>
  {text_lines}
  <text x="44" y="367" font-family="Arial, sans-serif" font-size="12" letter-spacing="2" font-weight="700" fill="{fill}" opacity=".72">SHREE SAWARIYA CATALOGUE</text>
</svg>
"""
    IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    (IMAGE_DIR / f"{category_index:02d}-{slug(label)}.svg").write_text(svg, encoding="utf-8")


def ts_string(value: str) -> str:
    return '"' + value.replace("\\", "\\\\").replace('"', '\\"') + '"'


def generate():
    parsed = parse_catalogue()
    imports = []
    category_rows = []
    product_rows = []
    product_ids_by_category = []

    for category_index, (label, names) in enumerate(parsed, start=1):
        cid = category_id(label)
        art = category_art(label)
        filename = f"{category_index:02d}-{slug(label)}.svg"
        import_name = f"categoryImage{category_index}"
        imports.append(f'import {import_name} from "../assets/catalog/{filename}";')
        write_category_image(category_index, label, art)
        description = (
            f"Browse {label.lower()} for home repairs, trade work, and building projects. "
            "Catalogue pricing is an estimate and availability should be confirmed with the store."
        )
        category_rows.append(
            "  { "
            f"id: {ts_string(cid)}, label: {ts_string(label)}, art: {ts_string(art)}, "
            f"image: {import_name}, description: {ts_string(description)}, count: 81 "
            "},"
        )

        category_product_ids = []
        for product_index, name in enumerate(names, start=1):
            product_id = f"{slug(label)}-{product_index:03d}"
            category_product_ids.append(product_id)
            if " - " in name:
                base_name, specification = name.rsplit(" - ", 1)
            else:
                base_name, specification = name, "Standard"
            keywords = sorted(
                set(
                    [
                        *re.findall(r"[A-Za-z0-9]+", label.lower()),
                        *re.findall(r"[A-Za-z0-9]+", base_name.lower()),
                        *re.findall(r"[A-Za-z0-9]+", specification.lower()),
                    ]
                )
            )
            price = price_for(category_index, product_index)
            original = price + max(20, round(price * 0.12 / 10) * 10) if product_index % 9 == 0 else None
            stock_status = "Available to order" if product_index % 7 else "Confirm availability"
            product_rows.append(
                "  { "
                f"id: {ts_string(product_id)}, categoryId: {ts_string(cid)}, "
                f"name: {ts_string(name)}, category: {ts_string(label)}, "
                f"specification: {ts_string(specification)}, "
                f"price: {price}, "
                + (f"originalPrice: {original}, " if original else "")
                + "rating: 0, reviews: 0, "
                f"art: {ts_string(art)} as Product['art'], image: {import_name}, "
                f"description: {ts_string(f'{base_name} for practical {label.lower()} work. This catalogue listing uses the {specification} specification.')}, "
                f"pack: {ts_string(specification)}, stockStatus: {ts_string(stock_status)}, "
                "priceIsEstimate: true, "
                f"keywords: {ts_string(', '.join(keywords))}, "
                f"searchText: {ts_string(' '.join([name, label, specification, ' '.join(keywords)]).lower())} "
                "},"
            )
        product_ids_by_category.append(category_product_ids)

    output = """// Generated from the Shree Sawariya catalogue PDF. Do not hand-edit individual rows.
import type { ComponentType } from "react";
""" + "\n".join(imports) + """

export type Product = {
  id: string;
  categoryId: string;
  name: string;
  category: string;
  specification: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  art: "drill" | "box" | "paint" | "ladder" | "socket" | "helmet" | "tap" | "brick" | "bulb" | "saw";
  description: string;
  pack: string;
  image: string;
  stockStatus: string;
  priceIsEstimate: boolean;
  keywords: string;
  searchText: string;
};

export const categories = [
""" + "\n".join(category_rows) + """
] as const;

export const products: Product[] = [
""" + "\n".join(product_rows) + """
];

const featuredIds = [
""" + "\n".join(
        f"  {ts_string(ids[0])}," for ids in product_ids_by_category[:6]
    ) + """
  """ + ts_string(product_ids_by_category[10][0]) + """,
  """ + ts_string(product_ids_by_category[11][0]) + """,
  """ + ts_string(product_ids_by_category[28][0]) + """,
  """ + ts_string(product_ids_by_category[30][0]) + """,
];

export const featuredProducts = featuredIds
  .map((id) => products.find((product) => product.id === id))
  .filter((product): product is Product => Boolean(product));
"""
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    (DATA_DIR / "products.ts").write_text(output, encoding="utf-8")
    print(f"Generated {len(parsed)} categories and {len(product_rows)} products")


if __name__ == "__main__":
    generate()