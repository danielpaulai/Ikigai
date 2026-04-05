#!/usr/bin/env python3
"""One-off script to render public/og.png (1200×630). Requires Pillow: pip install pillow"""
from __future__ import annotations

import os

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "og.png")

W, H = 1200, 630
CREAM = (255, 249, 250)
PLUM = (45, 27, 34)
PINK = (255, 141, 161)
PINK_SOFT = (255, 183, 197)


def pick_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/Supplemental/Georgia.ttf",
        "/System/Library/Fonts/Georgia.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Italic.ttf",
        "/Library/Fonts/Georgia.ttf",
    ]
    for path in candidates:
        if os.path.isfile(path):
            try:
                return ImageFont.truetype(path, size)
            except OSError:
                continue
    return ImageFont.load_default()


def main() -> None:
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    img = Image.new("RGB", (W, H), CREAM)
    draw = ImageDraw.Draw(img)

    # Soft gradient bands (simple vertical blend)
    for y in range(H):
        t = y / H
        r = int(CREAM[0] + (255 - CREAM[0]) * 0.04 * (1 - t))
        g = int(CREAM[1] + (232 - CREAM[1]) * 0.08 * (1 - t))
        b = int(CREAM[2] + (238 - CREAM[2]) * 0.06 * (1 - t))
        draw.line([(0, y), (W, y)], fill=(r, g, b))

    margin = 56
    draw.rounded_rectangle(
        [margin, margin, W - margin, H - margin],
        radius=28,
        outline=PINK_SOFT,
        width=3,
    )

    font_label = pick_font(20)
    font_head = pick_font(76)
    font_sub = pick_font(34)
    font_by = pick_font(26)

    label = "PURELY PERSONAL"
    draw.text((W // 2, 150), label, fill=(PLUM[0], PLUM[1], PLUM[2], 115), font=font_label, anchor="mm")

    title = "Find Your Ikigai"
    draw.text((W // 2, 260), title, fill=PLUM, font=font_head, anchor="mm")

    sub = "Your purpose. Your path. Your profit."
    draw.text((W // 2, 360), sub, fill=PINK, font=font_sub, anchor="mm")

    byline = "Daniel Paul  ·  danielpaul.ai"
    draw.text((W // 2, 470), byline, fill=(PLUM[0], PLUM[1], PLUM[2], 180), font=font_by, anchor="mm")

    img.save(OUT, "PNG", optimize=True)
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
