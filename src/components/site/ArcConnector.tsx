import { useEffect, useRef, useState } from "react";

// Az Előadások kártyáit összekötő korallszínű ív.
// - Asztali nézet (lg+): a Rólam fotó eltolt keretéből indul, és a kártyák fölött ívet ír.
// - Mobil (<640 px): a kártyák bal oldalán futó, jobbra kidomborodó ív (a két középső kártya be van húzva).
// - Közte (tablet): nincs ív.
// Csak a böngészőben rajzolódik (méréssel, ezért nincs hydration eltérés).
// Elvárja, hogy a szülő `relative` legyen, és tartalmazza a [data-arc-start] keretet (About),
// a [data-arc-label] feliratot és a [data-arc-card] kártyákat (OnStage).

const FRAME_OFFSET = 12; // a fotókeret eltolása (translate-x-3 / translate-y-3)
const LIFT = 30; // asztalon az ív ennyivel a kártyák teteje fölött fut
const CORNER = 40; // asztalon a lefelé induló vonal lekerekítése az ívbe
const SIDE_GAP = 16; // mobilon az ív ennyivel a kártyák bal széle előtt fut

type Pt = { x: number; y: number };
type Geo = { w: number; h: number; d: string; marks: { dot: Pt; to: Pt }[] };

// Oldalkoordináta az offset-láncon át: a transzformok (FadeUp) nem számítanak bele.
function pagePos(el: HTMLElement): Pt {
  let x = 0;
  let y = 0;
  let n: HTMLElement | null = el;
  while (n) {
    x += n.offsetLeft;
    y += n.offsetTop;
    n = n.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

// Catmull-Rom görbe a megadott pontokon át (a pontok maguk a görbén vannak).
function smooth(points: Pt[]): string {
  const tangent = (i: number): Pt =>
    i === 0
      ? { x: points[1].x - points[0].x, y: points[1].y - points[0].y }
      : i === points.length - 1
        ? { x: points[i].x - points[i - 1].x, y: points[i].y - points[i - 1].y }
        : { x: (points[i + 1].x - points[i - 1].x) / 2, y: (points[i + 1].y - points[i - 1].y) / 2 };
  let d = "";
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const ta = tangent(i);
    const tb = tangent(i + 1);
    d += ` C ${a.x + ta.x / 3} ${a.y + ta.y / 3} ${b.x - tb.x / 3} ${b.y - tb.y / 3} ${b.x} ${b.y}`;
  }
  return d;
}

function measureWide(wrapper: HTMLElement): Geo | null {
  const frame = wrapper.querySelector<HTMLElement>("[data-arc-start]");
  const cards = Array.from(wrapper.querySelectorAll<HTMLElement>("[data-arc-card]"));
  if (!frame || cards.length < 2) return null;

  const base = pagePos(wrapper);
  const f = pagePos(frame);
  const sx = f.x - base.x + FRAME_OFFSET + 1;
  const sy = f.y - base.y + frame.offsetHeight + FRAME_OFFSET - 24;

  const tops = cards.map((c) => {
    const p = pagePos(c);
    return { x: p.x - base.x + c.offsetWidth / 2, top: p.y - base.y };
  });
  const A: Pt[] = tops.map((t) => ({ x: t.x, y: t.top - LIFT }));

  const r = Math.max(0, Math.min(CORNER, A[0].x - sx - 8));
  const P0: Pt = { x: sx + r, y: A[0].y };

  let d = `M ${sx} ${sy} L ${sx} ${A[0].y - r}`;
  if (r > 0) d += ` Q ${sx} ${A[0].y} ${sx + r} ${A[0].y}`;
  d += ` L ${A[0].x} ${A[0].y}`;
  // A görbe első szakasza (P0 -> A[0]) kimarad, mert az egyenes vonal már odavitt.
  const segs = smooth([P0, ...A]).split(" C ").filter(Boolean).slice(1);
  d += segs.map((s) => ` C ${s}`).join("");

  return {
    w: wrapper.offsetWidth,
    h: wrapper.offsetHeight,
    d,
    marks: A.map((p, i) => ({ dot: p, to: { x: p.x, y: tops[i].top } })),
  };
}

function measureNarrow(wrapper: HTMLElement): Geo | null {
  const label = wrapper.querySelector<HTMLElement>("[data-arc-label]");
  const cards = Array.from(wrapper.querySelectorAll<HTMLElement>("[data-arc-card]"));
  if (!label || cards.length < 2) return null;

  const base = pagePos(wrapper);
  const boxes = cards.map((c) => {
    const p = pagePos(c);
    return {
      left: p.x - base.x,
      top: p.y - base.y,
      mid: p.y - base.y + c.offsetHeight / 2,
      bottom: p.y - base.y + c.offsetHeight,
    };
  });
  const edge = boxes[0].left - SIDE_GAP;
  const l = pagePos(label);
  const start: Pt = { x: edge, y: l.y - base.y + label.offsetHeight + 4 };
  const B: Pt[] = boxes.map((b) => ({ x: b.left - SIDE_GAP, y: b.mid }));
  const end: Pt = { x: B[B.length - 1].x, y: boxes[boxes.length - 1].bottom + 24 };

  const d = `M ${start.x} ${start.y}${smooth([start, ...B, end])}`;
  return {
    w: wrapper.offsetWidth,
    h: wrapper.offsetHeight,
    d,
    marks: B.map((p, i) => ({ dot: p, to: { x: boxes[i].left, y: p.y } })),
  };
}

export function ArcConnector() {
  const ref = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);

  useEffect(() => {
    const wrapper = ref.current?.parentElement;
    if (!wrapper) return;
    const wide = window.matchMedia("(min-width: 1024px)");
    const narrow = window.matchMedia("(max-width: 639px)");
    const update = () =>
      setGeo(wide.matches ? measureWide(wrapper) : narrow.matches ? measureNarrow(wrapper) : null);

    update();
    const ro = new ResizeObserver(update);
    ro.observe(wrapper);
    window.addEventListener("load", update);
    wide.addEventListener("change", update);
    narrow.addEventListener("change", update);
    document.fonts?.ready.then(update);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", update);
      wide.removeEventListener("change", update);
      narrow.removeEventListener("change", update);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {geo && (
        <svg width={geo.w} height={geo.h} className="absolute left-0 top-0" style={{ overflow: "visible" }}>
          <path
            d={geo.d}
            fill="none"
            stroke="var(--color-coral)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {geo.marks.map((m, i) => (
            <g key={i}>
              <line
                x1={m.dot.x}
                y1={m.dot.y}
                x2={m.to.x}
                y2={m.to.y}
                stroke="var(--color-coral)"
                strokeWidth={1.5}
                strokeOpacity={0.5}
              />
              <circle cx={m.dot.x} cy={m.dot.y} r={4} fill="var(--color-coral)" />
            </g>
          ))}
        </svg>
      )}
    </div>
  );
}
