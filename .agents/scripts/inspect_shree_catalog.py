from pathlib import Path
import json
import fitz

pdf_path = Path("attached_assets/Shree_Sawariya_3000_Product_Catalog_1789225433947.pdf")
output_dir = Path(".agents/outputs/shree-catalog")
output_dir.mkdir(parents=True, exist_ok=True)

doc = fitz.open(pdf_path)
page_summaries = []
all_text = []

for index, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5), alpha=False)
    pix.save(output_dir / f"page-{index + 1:02d}.png")

    page_dict = page.get_text("dict")
    blocks = []
    for block in page_dict.get("blocks", []):
        if block.get("type") != 0:
            continue
        text = " ".join(
            span.get("text", "").strip()
            for line in block.get("lines", [])
            for span in line.get("spans", [])
            if span.get("text", "").strip()
        ).strip()
        if text:
            blocks.append({"bbox": block.get("bbox"), "text": text})

    page_summaries.append({
        "page": index + 1,
        "width": page.rect.width,
        "height": page.rect.height,
        "blocks": blocks,
    })
    all_text.append(f"\n=== PAGE {index + 1} ===\n" + "\n".join(item["text"] for item in blocks))

(output_dir / "page-summaries.json").write_text(
    json.dumps(page_summaries, ensure_ascii=False, indent=2),
    encoding="utf-8",
)
(output_dir / "catalogue-text.txt").write_text("\n".join(all_text), encoding="utf-8")

print(f"pages={len(doc)}")
print(f"output={output_dir}")
for summary in page_summaries:
    print(f"page {summary['page']}: {len(summary['blocks'])} text blocks")