"""Generate/check the static header from one source (no runtime dependency)."""
import argparse
import pathlib
import re
ROOT=pathlib.Path(__file__).resolve().parents[1]
PAGES={"index.html":None,"work/index.html":"work","background/index.html":"journey","life/index.html":"life","life/music/index.html":"life","life/music/recording/index.html":"life","life/travel/index.html":"life","projects/vision-router/index.html":"work","projects/computer-history/index.html":"work"}
HEADER=re.compile(r'<header class="topbar">[\s\S]*?</header>')
def render(template,page,active):
    if active:
        template=template.replace(f'data-chapter="{active}" aria-expanded',f'data-chapter="{active}" data-active aria-expanded')
    if page=="work/index.html":
        template=re.sub(r'href="/work/(#\w+)"',r'href="\1"',template)
        template=template.replace('href="/work/" data-nav-destination="work"','href="#work" data-nav-destination="work"')
    if page=="background/index.html":
        template=re.sub(r'href="/background/(#\w+)"',r'href="\1"',template)
        template=template.replace('href="/background/" data-nav-destination="journey"','href="#journey" data-nav-destination="journey"')
    return template
def main():
    parser=argparse.ArgumentParser()
    parser.add_argument("--check",action="store_true")
    args=parser.parse_args()
    template=(ROOT/"templates/site-header.html").read_text(encoding="utf-8").strip()
    stale=[]
    for page,active in PAGES.items():
        path=ROOT/page
        source=path.read_text(encoding="utf-8")
        updated,n=HEADER.subn(lambda _:render(template,page,active),source)
        if n!=1:raise SystemExit(f"Expected one header in {page}, got {n}")
        if updated!=source:
            stale.append(page)
            if not args.check:path.write_text(updated,encoding="utf-8")
    if args.check and stale:raise SystemExit("Stale headers: "+", ".join(stale))
    print(f"Shared headers: {len(PAGES)} checked, {len(stale)} differences")
if __name__=="__main__":main()
