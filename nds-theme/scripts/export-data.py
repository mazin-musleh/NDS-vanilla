#!/usr/bin/env python3
"""Export NDS Jekyll YAML content collections into a WordPress import bundle.

Reads _data/content/*.yml from the source repository and writes
nds-theme/assets/data/nds-import.json keyed by WP post type, ready for:

    wp nds import nds-theme/assets/data/nds-import.json

Run from the source repo root:
    python3 nds-theme/scripts/export-data.py [output.json]

Field mapping (per collection):
  components.yml  -> nds_component  (title, excerpt, category, tags, url, icon)
  templates.yml   -> nds_template   (same shape)
  examples.yml    -> nds_example    (same shape)
  services.yml    -> nds_service    (title, excerpt, system -> category, tags)
  faqs.yml        -> nds_faq        (question -> title, answer -> content,
                                     category -> nds_category term, tags)
  events.yml      -> nds_event      (title, excerpt, category, tags, url)
"""

import argparse
import json
import os
import re
import sys

try:
    import yaml
except ImportError:  # pragma: no cover
    sys.exit("PyYAML is required: pip install pyyaml")


DEFAULT_OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "data", "nds-import.json")

COLLECTIONS = {
    "nds_component": "components.yml",
    "nds_template": "templates.yml",
    "nds_example": "examples.yml",
    "nds_service": "services.yml",
    "nds_faq": "faqs.yml",
    "nds_event": "events.yml",
}


def icon_class(icon_html):
    """Extract 'hgi-<name>' from '<i class="hgi hgi-stroke hgi-NAME"></i>'."""
    names = re.findall(r"hgi-[a-z0-9-]+", icon_html or "")
    if not names:
        return ""
    # Class order is 'hgi hgi-stroke hgi-<glyph>'; the glyph is the last token.
    return names[-1]


def tag_names(tags):
    """Normalize tags: strings or {name, style} objects -> list of names."""
    out = []
    for tag in tags or []:
        if isinstance(tag, dict):
            out.append(str(tag.get("name", "")))
        else:
            out.append(str(tag))
    return [t for t in out if t]


def item_base(item, post_type):
    """Common fields for card-like collections."""
    meta = {}
    icon = icon_class(item.get("icon", ""))
    if icon:
        meta["_nds_icon_class"] = icon
    url = item.get("url", "")
    if url:
        meta["_nds_source_url"] = url
    if post_type == "nds_faq":
        meta["_nds_faq_id"] = item.get("id", "")

    return {
        "title": item.get("title") or item.get("question") or "",
        "excerpt": item.get("description", ""),
        "category": item.get("category", "") or item.get("system", ""),
        "tags": tag_names(item.get("tags")),
        "content": item.get("answer", ""),
        "meta": meta,
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("output", nargs="?", default=DEFAULT_OUT)
    parser.add_argument("--data-dir", default="_data/content",
                        help="Path to the source _data/content directory")
    args = parser.parse_args()

    bundle = {}
    for post_type, filename in COLLECTIONS.items():
        path = os.path.join(args.data_dir, filename)
        if not os.path.exists(path):
            print(f"skip (missing): {filename}")
            continue
        with open(path, encoding="utf-8") as f:
            data = yaml.safe_load(f) or []
        items = [item_base(i, post_type) for i in data if isinstance(i, dict) and (i.get("title") or i.get("question"))]
        bundle[post_type] = items
        print(f"{post_type}: {len(items)} items ({filename})")

    os.makedirs(os.path.dirname(args.output), exist_ok=True)
    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(bundle, f, ensure_ascii=False, indent=2)
    print(f"wrote {args.output}")


if __name__ == "__main__":
    main()
