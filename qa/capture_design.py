"""Independent visual evidence, even if later interaction acceptance fails."""
import os
from pathlib import Path
from playwright.sync_api import sync_playwright
BASE=os.environ.get("SITE_URL","http://127.0.0.1:8080").rstrip("/")
OUT=Path("qa/current/design")
OUT.mkdir(parents=True,exist_ok=True)
PAGES={"home":"/","work":"/work/","background":"/background/","life":"/life/","music":"/life/music/","travel":"/life/travel/","vision":"/projects/vision-router/","history":"/projects/computer-history/"}
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,args=["--no-sandbox"],**({"executable_path":os.environ["SITE_CHROME"]} if os.environ.get("SITE_CHROME") else {}))
    for width in [375,1440]:
        context=browser.new_context(viewport={"width":width,"height":900},device_scale_factor=1,reduced_motion="reduce")
        page=context.new_page()
        for lang in ["zh","en"]:
            for name,url in PAGES.items():
                page.goto(BASE+url,wait_until="domcontentloaded")
                page.evaluate("document.fonts.ready")
                page.wait_for_function("!document.querySelector('[data-archive][aria-busy=true],[data-music-view][aria-busy=true]')")
                if page.locator("#lang-toggle").count() and not page.evaluate("document.documentElement.lang").startswith(lang):
                    page.locator("#lang-toggle").click()
                page.evaluate("""async()=>{for(const img of document.images)img.loading='eager';await Promise.race([Promise.allSettled([...document.images].map(i=>i.decode())),new Promise(r=>setTimeout(r,2500))])}""")
                if name=="travel":
                    route=page.locator(".route-map")
                    route.scroll_into_view_if_needed()
                    page.wait_for_function("document.querySelectorAll('.route-map path.route-arc').length===19",timeout=20000)
                    try:
                        page.wait_for_function("Array.from(document.querySelectorAll('.route-map img.leaflet-tile')).some(i=>i.complete&&i.naturalWidth>0)",timeout=10000)
                    except Exception as exc:
                        print("Map tile capture unavailable:",str(exc),flush=True)
                    route.screenshot(path=str(OUT/f"flight-map-{width}-{lang}.png"),animations="disabled")
                page.evaluate("window.scrollTo({top:0,behavior:'instant'})")
                page.screenshot(path=str(OUT/f"{name}-{width}-{lang}.png"),animations="disabled")
                print(name,width,lang,flush=True)
        context.close()
    browser.close()
