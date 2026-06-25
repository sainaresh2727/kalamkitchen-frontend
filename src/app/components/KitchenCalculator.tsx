"use client";

import { useState, useMemo, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface InputSpec {
  key: string;
  label: string;
  val: number;
  unit: string;
}

interface DerivedSpec {
  key: string;
  fn: (i: Record<string, number>) => number;
}

interface PartContext {
  rows: ComputedRow[];
  byKey: Record<string, ComputedRow>;
  unitWeight?: number;
  L?: number;
  W?: number;
  T?: number;
  qty?: number;
}

interface PartSpec {
  sno: number;
  gauge: string;
  material: string;
  desc: string;
  L: number | ((i: Record<string, number>, c?: PartContext) => number);
  W: number | ((i: Record<string, number>, c?: PartContext) => number);
  T: number | ((i: Record<string, number>, c?: PartContext) => number);
  qty: number | ((i: Record<string, number>, c?: PartContext) => number);
  key?: string;
  inBody?: boolean;
  totalWeight?: (i: Record<string, number>, c: PartContext & { unitWeight: number; L: number; W: number; T: number; qty: number }) => number;
}

interface PriceSpec {
  label: string;
  rate: number;
  ms?: number;
  note?: string;
  weight?: (i: Record<string, number>, c: { rows: ComputedRow[]; byKey: Record<string, ComputedRow>; bodyWeight: number }) => number;
  price: (i: Record<string, number>, c: { rows: ComputedRow[]; byKey: Record<string, ComputedRow>; bodyWeight: number }) => number;
}

interface VariantSpec {
  title: string;
  prices: { label: string; rate: number; ms?: number; price: (i: Record<string, number>, w: Record<string, number>) => number }[];
  weight: (w: Record<string, number>) => number;
}

interface ProductSpec {
  id: string;
  name: string;
  inputs: InputSpec[];
  derived?: DerivedSpec[];
  parts: PartSpec[];
  weight?: ((i: Record<string, number>, c: { rows: ComputedRow[]; byKey: Record<string, ComputedRow> }) => number) | null;
  prices: PriceSpec[];
  variants?: VariantSpec[];
  extraWeights?: (c: { byKey: Record<string, ComputedRow> }) => Record<string, number>;
}

interface ComputedRow extends Omit<PartSpec, "L" | "W" | "T" | "qty" | "totalWeight"> {
  L: number;
  W: number;
  T: number;
  qty: number;
  unitWeight: number;
  totalWeight: number;
}

interface ComputedPrice {
  label: string;
  rate: number;
  ms?: number;
  weightUsed: number;
  price: number;
  note?: string;
}

interface ComputedVariant {
  title: string;
  weightUsed: number;
  prices: { label: string; rate: number; ms?: number; price: number }[];
}

interface ComputedResult {
  i: Record<string, number>;
  rows: ComputedRow[];
  bodyWeight: number;
  prices: ComputedPrice[];
  variants?: ComputedVariant[];
  extraWeights?: Record<string, number>;
  error?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const round = (x: number, d = 0) => { const f = Math.pow(10, d); return Math.round(x * f) / f; };
const roundUp = (x: number, d = 0) => { const f = Math.pow(10, d); return Math.ceil(x * f) / f; };
const roundDown = (x: number, d = 0) => { const f = Math.pow(10, d); return Math.floor(x * f) / f; };
const DENS = 8;

function part(sno: number, gauge: string, material: string, desc: string, L: PartSpec["L"], W: PartSpec["W"], T: PartSpec["T"], qty: PartSpec["qty"], key?: string, inBody?: boolean): PartSpec {
  return { sno, gauge, material, desc, L, W, T, qty, key, inBody };
}

function val(field: PartSpec["L"], i: Record<string, number>, ctx: PartContext): number {
  return typeof field === "function" ? field(i, ctx) : (field as number);
}

function computeProduct(spec: ProductSpec, inputs: Record<string, number>): ComputedResult {
  const i: Record<string, number> = { ...inputs };
  if (spec.derived) {
    for (const d of spec.derived) i[d.key] = d.fn(i);
  }

  const rows: ComputedRow[] = [];
  const byKey: Record<string, ComputedRow> = {};

  for (const p of spec.parts) {
    const ctx: PartContext = { rows, byKey };
    const L = val(p.L, i, ctx);
    const W = val(p.W, i, ctx);
    const T = val(p.T, i, ctx);
    const qty = val(p.qty, i, ctx);
    const unitWeight = (L * W * T * DENS) / 1e6;
    let totalWeight: number;
    if (p.totalWeight) {
      totalWeight = p.totalWeight(i, { rows, byKey, unitWeight, L, W, T, qty });
    } else {
      totalWeight = unitWeight * qty;
    }
    const row: ComputedRow = { ...p, L, W, T, qty, unitWeight, totalWeight };
    rows.push(row);
    if (p.key) byKey[p.key] = row;
  }

  if (spec.id === "baine-marie") byKey["_gn"] = { totalWeight: roundDown(i.L / 325) } as ComputedRow;

  const bodyWeight = spec.weight
    ? spec.weight(i, { rows, byKey })
    : rows.filter((r) => r.inBody !== false).reduce((s, r) => s + r.totalWeight, 0);

  if (spec.variants && spec.extraWeights) {
    const w = spec.extraWeights({ byKey });
    const variants: ComputedVariant[] = spec.variants.map((v) => ({
      title: v.title,
      weightUsed: v.weight(w),
      prices: v.prices.map((pr) => ({ label: pr.label, rate: pr.rate, ms: pr.ms, price: pr.price(i, w) })),
    }));
    return { i, rows, bodyWeight, prices: [], variants, extraWeights: w };
  }

  const prices: ComputedPrice[] = spec.prices.map((pr) => ({
    label: pr.label,
    rate: pr.rate,
    ms: pr.ms,
    weightUsed: pr.weight ? pr.weight(i, { rows, byKey, bodyWeight }) : bodyWeight,
    price: pr.price(i, { rows, byKey, bodyWeight }),
    note: pr.note,
  }));

  return { i, rows, bodyWeight, prices };
}

// ─── Product Specs ────────────────────────────────────────────────────────────

const PRODUCTS: ProductSpec[] = [];

// 1. Wall Mounted Hand Wash
PRODUCTS.push({
  id: "wall-hand-wash",
  name: "Wall Mounted Hand Wash",
  inputs: [
    { key: "L", label: "Length", val: 450, unit: "mm" },
    { key: "W", label: "Width", val: 450, unit: "mm" },
    { key: "sinkDepth", label: "Sink Depth", val: 300, unit: "mm" },
    { key: "backsplash", label: "Backsplash", val: 1, unit: "0 or 1" },
    { key: "drainCost", label: "Drain Coupling Cost", val: 300, unit: "Rs/pc" },
    { key: "drainNos", label: "No. of Drain Coupling", val: 1, unit: "Nos" },
    { key: "tTop", label: "Top Thickness", val: 1.2, unit: "mm" },
    { key: "tSide", label: "Side Cover Thickness", val: 1.2, unit: "mm" },
    { key: "tTube", label: "Tube/Pipe Thickness", val: 1.2, unit: "mm" },
    { key: "tBack", label: "Backsplash Thickness", val: 1.2, unit: "mm" },
  ],
  parts: [
    part(1, "16G", "Sheet", "Top", (i) => i.L + 150, (i) => i.W + i.sinkDepth * 2 + 150, (i) => i.tTop, 1),
    part(2, "16G", "Sheet", "Side Cover", (i) => i.W, (i) => i.W + 75, (i) => i.tSide, 2),
    part(3, "16G", "Tube/Pipe", "Clamp", (i) => i.W + i.sinkDepth, 100, (i) => i.tTube, 2),
    part(4, "16G", "Sheet", "BackSplash", (i) => i.L + 50, 190, (i) => i.tBack, (i) => i.backsplash),
  ],
  prices: [
    { label: "SS 316", rate: 700, price: (i, c) => round(700 * c.bodyWeight) + i.drainCost * i.drainNos },
    { label: "SS 304", rate: 600, price: (i, c) => round(600 * c.bodyWeight) + i.drainCost * i.drainNos },
    { label: "SS 202", rate: 500, price: (i, c) => round(500 * c.bodyWeight) + i.drainCost * i.drainNos },
  ],
});

// 2. Hand Wash Trough Sink with legs
PRODUCTS.push({
  id: "trough-sink-legs",
  name: "Hand Wash Trough Sink (with legs)",
  inputs: [
    { key: "L", label: "Length", val: 1150, unit: "mm" },
    { key: "W", label: "Width", val: 500, unit: "mm" },
    { key: "H", label: "Height", val: 850, unit: "mm" },
    { key: "underShelf", label: "Under Shelf", val: 0, unit: "Nos" },
    { key: "sinkDepth", label: "Sink Depth", val: 300, unit: "mm" },
    { key: "backsplash", label: "Backsplash", val: 1, unit: "0 or 1" },
    { key: "drainCost", label: "Drain Coupling Cost", val: 300, unit: "Rs/pc" },
    { key: "drainNos", label: "No. of Drain Coupling", val: 2, unit: "Nos" },
    { key: "tTop", label: "Top Thickness", val: 1.2, unit: "mm" },
    { key: "tSide", label: "Side Cover Thickness", val: 1.2, unit: "mm" },
    { key: "tUp", label: "Vertical Uprights Thickness", val: 1.6, unit: "mm" },
    { key: "tCross", label: "Cross Support Thickness", val: 1.6, unit: "mm" },
    { key: "tBack", label: "BackSplash Thickness", val: 1.2, unit: "mm" },
  ],
  derived: [{ key: "cross", fn: (i) => (i.underShelf === 0 ? 2 : 0) }],
  parts: [
    part(1, "16G", "Sheet", "Top", (i) => i.L + 150, (i) => i.W + i.sinkDepth * 2 + 150, (i) => i.tTop, 1),
    part(2, "16G", "Sheet", "Side Cover", (i) => i.W, (i) => i.W + 75, (i) => i.tSide, 2),
    part(3, "16G", "Tube/Pipe", "Vertical Uprights", (i) => i.H, 160, (i) => i.tUp, 4),
    part(4, "16G", "Tube/Pipe", "Cross Support", (i) => i.L - 110, 100, (i) => i.tCross, (i) => i.cross),
    part(5, "16G", "Tube/Pipe", "Cross Support", (i) => i.W - 110, 100, (i) => i.tCross, (i) => i.cross),
    part(6, "16G", "Sheet", "BackSplash", (i) => i.L + 50, 190, (i) => i.tBack, (i) => i.backsplash),
  ],
  prices: [
    { label: "SS 316", rate: 750, price: (i, c) => round(750 * c.bodyWeight) + i.drainCost * i.drainNos },
    { label: "SS 304", rate: 600, price: (i, c) => round(600 * c.bodyWeight) + i.drainCost * i.drainNos },
    { label: "SS 202", rate: 500, price: (i, c) => round(500 * c.bodyWeight) + i.drainCost * i.drainNos },
  ],
});

// 3. Dining Table
PRODUCTS.push({
  id: "dining-table",
  name: "Dining Table",
  inputs: [
    { key: "L", label: "Length", val: 1200, unit: "mm" },
    { key: "W", label: "Width", val: 600, unit: "mm" },
    { key: "H", label: "Height", val: 850, unit: "mm" },
    { key: "plateCost", label: "Plate Cost", val: 120, unit: "Rs/plate" },
    { key: "tTop", label: "Top Thickness", val: 1.6, unit: "mm" },
    { key: "tUp", label: "Vertical Uprights Thickness", val: 1.6, unit: "mm" },
    { key: "tCross", label: "Cross Support Thickness", val: 1.6, unit: "mm" },
    { key: "tTopSup", label: "Top Support MS/SS Thickness", val: 1.6, unit: "mm" },
    { key: "tChairTop", label: "Chair Top Support Thickness", val: 1.6, unit: "mm" },
    { key: "tChairLeg", label: "Chair Leg Support Thickness", val: 1.6, unit: "mm" },
    { key: "tChairTopMS", label: "Chair Top Support (MS) Thickness", val: 3, unit: "mm" },
  ],
  parts: [
    part(1, "16G", "Sheet", "Top", (i) => i.L + 120, (i) => i.W + 120, (i) => i.tTop, 1, "p1"),
    part(2, "16G", "Tube/Pipe", "Vertical Uprights", (i) => i.H, 160, (i) => i.tUp, 4, "p2"),
    part(3, "16G", "Tube/Pipe", "Cross Support", (i) => i.L - 110, 100, (i) => i.tCross, 2, "p3"),
    part(4, "16G", "Tube/Pipe", "Cross Support", (i) => i.W - 110, 100, (i) => i.tCross, 2, "p4"),
    part(5, "16G", "Tube/Pipe", "Top Support MS/SS", (i) => i.L, 160, (i) => i.tTopSup, 2, "p5"),
    part(6, "16G", "Tube/Pipe", "Top Support MS/SS", (i) => i.W, 160, 1.6, 3, "p6"),
    part(7, "16G", "Tube/Pipe", "Chair Top Support", 325, 100, (i) => i.tChairTop, (i) => 2 * (2 * roundUp(i.L / 600)), "p7"),
    part(8, "16G", "Tube/Pipe", "Chair Leg Support", 900, 160, (i) => i.tChairLeg, (i) => 2 * (2 * roundUp(i.L / 600)), "p8"),
    part(9, "", "MS Sheet", "Chair Top Support", 325, 325, (i) => i.tChairTopMS, (i) => 2 * roundUp(i.L / 600), "p9"),
  ],
  weight: (i, c) => ["p1","p2","p3","p4","p5","p6","p7","p8"].reduce((s, k) => s + c.byKey[k].totalWeight, 0),
  extraWeights: (c) => {
    const b = c.byKey;
    return {
      P48: b.p5.totalWeight + b.p6.totalWeight + b.p9.totalWeight,
      P49: b.p1.totalWeight + b.p2.totalWeight + b.p3.totalWeight + b.p4.totalWeight + b.p8.totalWeight,
      P50: ["p1","p2","p3","p4","p5","p6","p7","p8"].reduce((s, k) => s + b[k].totalWeight, 0),
      P51: b.p1.totalWeight,
      P52: ["p2","p3","p4","p5","p6","p8","p9"].reduce((s, k) => s + b[k].totalWeight, 0),
    };
  },
  variants: [
    {
      title: "Complete SS",
      prices: [
        { label: "SS 316", rate: 700, price: (i, w) => round(700 * w.P50) + i.plateCost * 2 * roundUp(i.L / 600) },
        { label: "SS 304", rate: 450, price: (i, w) => round(450 * w.P50) + i.plateCost * 2 * roundUp(i.L / 600) },
        { label: "SS 202", rate: 300, price: (i, w) => round(300 * w.P50) + i.plateCost * 2 * roundUp(i.L / 600) },
      ],
      weight: (w) => w.P50,
    },
    {
      title: "SS Top + MS Legs/Frame + 3mm Plate (A)",
      prices: [
        { label: "SS 316", rate: 700, ms: 150, price: (i, w) => round(700 * w.P49) + round(150 * w.P48) + i.plateCost * 2 * roundUp(i.L / 600) },
        { label: "SS 304", rate: 450, ms: 150, price: (i, w) => round(450 * w.P49) + round(150 * w.P48) + i.plateCost * 2 * roundUp(i.L / 600) },
        { label: "SS 202", rate: 300, ms: 150, price: (i, w) => round(300 * w.P49) + round(150 * w.P48) + i.plateCost * 2 * roundUp(i.L / 600) },
      ],
      weight: (w) => w.P49 + w.P48,
    },
    {
      title: "SS Top + MS Legs/Frame + 3mm Plate (B)",
      prices: [
        { label: "SS 316", rate: 700, ms: 150, price: (i, w) => round(700 * w.P51) + round(150 * w.P52) + i.plateCost * 2 * roundUp(i.L / 600) },
        { label: "SS 304", rate: 450, ms: 150, price: (i, w) => round(450 * w.P51) + round(150 * w.P52) + i.plateCost * 2 * roundUp(i.L / 600) },
        { label: "SS 202", rate: 300, ms: 150, price: (i, w) => round(300 * w.P51) + round(150 * w.P52) + i.plateCost * 2 * roundUp(i.L / 600) },
      ],
      weight: (w) => w.P51 + w.P52,
    },
  ],
  prices: [],
});

// 4. Dosa Plate
PRODUCTS.push({
  id: "dosa-plate",
  name: "Dosa Plate (with/without Griddle)",
  inputs: [
    { key: "L", label: "Length", val: 1400, unit: "mm" },
    { key: "W", label: "Width", val: 750, unit: "mm" },
    { key: "H", label: "Height", val: 850, unit: "mm" },
    { key: "underShelf", label: "Under Shelf", val: 0, unit: "Nos" },
    { key: "backsplash", label: "Backsplash", val: 1, unit: "0 or 1" },
    { key: "pilotBurner", label: "Pilot Burner", val: 1, unit: "0 or 1" },
    { key: "hotPlate", label: "MS Hot Plate", val: 1, unit: "0 or 1" },
    { key: "burner", label: "Burner", val: 2, unit: "Nos" },
    { key: "burnerCost", label: "Cost of Burner", val: 3000, unit: "Rs" },
    { key: "griddle", label: "Griddle Plate", val: 0, unit: "0 or 1" },
    { key: "tTop", label: "Top Thickness", val: 1.6, unit: "mm" },
    { key: "tVF", label: "Vertical Front Thickness", val: 1, unit: "mm" },
    { key: "tVS", label: "Vertical Side Thickness", val: 1, unit: "mm" },
    { key: "tUp", label: "Vertical Uprights Thickness", val: 1.6, unit: "mm" },
    { key: "tCross", label: "Cross Support Thickness", val: 1.6, unit: "mm" },
    { key: "tUnder", label: "Under Shelf Thickness", val: 1.2, unit: "mm" },
    { key: "tStiff", label: "Stiffner Thickness", val: 1, unit: "mm" },
    { key: "tBack", label: "BackSplash Thickness", val: 1.6, unit: "mm" },
    { key: "tHot", label: "MS Hot Plate Thickness", val: 20, unit: "mm" },
    { key: "tGriddle", label: "MS Griddle Plate Thickness", val: 20, unit: "mm" },
  ],
  derived: [{ key: "cross", fn: (i) => (i.H > 450 ? 2 : 1) * (i.underShelf === 0 ? 2 : 0) }],
  parts: [
    part(1, "16G", "Sheet", "Top", (i) => i.L + 120, (i) => i.W + 120, (i) => i.tTop, 0),
    part(2, "20G", "Sheet", "Vertical Front", (i) => i.L, 300, (i) => i.tVF, 2),
    part(3, "20G", "Sheet", "Vertical Side", (i) => i.W, 300, (i) => i.tVS, 2),
    part(4, "16G", "Tube/Pipe", "Vertical Uprights", (i) => i.H, 160, (i) => i.tUp, 4),
    part(5, "16G", "Tube/Pipe", "Cross Support", (i) => i.L - 110, 100, (i) => i.tCross, (i) => i.cross),
    part(6, "16G", "Tube/Pipe", "Cross Support", (i) => i.W - 110, 100, (i) => i.tCross, (i) => i.cross),
    part(7, "16G", "Sheet", "Under Shelf", (i) => i.L + 120 - 110, (i) => i.W + 120, (i) => i.tUnder, (i) => i.underShelf, "p7"),
    part(8, "16G", "Sheet", "Stiffner", (i) => i.L, 185, (i) => i.tStiff, (i) => i.underShelf),
    part(9, "16G", "Sheet", "BackSplash", (i) => i.L + i.W * 2 + 50, 290, (i) => i.tBack, (i) => i.backsplash),
    part(10, "", "Plate", "MS HOT PLATE", (i) => i.L - 50, (i) => i.W - 50, (i) => i.tHot, (i) => i.pilotBurner, "pHot", false),
    part(11, "", "Plate", "MS Griddle Plate", 600, 300, (i) => i.tGriddle, (i) => i.hotPlate, "pGrid", false),
  ],
  weight: (i, c) => c.rows.slice(0, 9).reduce((s, r) => s + r.totalWeight, 0),
  prices: [
    { label: "SS 316", rate: 750, price: (i, c) => round(750 * c.bodyWeight) + i.pilotBurner * 500 + i.hotPlate * c.byKey.pHot.totalWeight * 100 + i.burner * i.burnerCost + i.griddle * c.byKey.pGrid.totalWeight * 100 },
    { label: "SS 304", rate: 600, price: (i, c) => round(600 * c.bodyWeight) + i.pilotBurner * 500 + i.hotPlate * c.byKey.pHot.totalWeight * 100 + i.burner * i.burnerCost + i.griddle * c.byKey.pGrid.totalWeight * 100 },
    { label: "SS 202", rate: 500, price: (i, c) => round(500 * c.bodyWeight) + i.pilotBurner * 500 + i.hotPlate * c.byKey.pHot.totalWeight * 100 + i.burner * i.burnerCost + i.griddle * c.byKey.pGrid.totalWeight * 100 },
  ],
});

// 5. Burner Range
PRODUCTS.push({
  id: "burner-range",
  name: "Burner Range",
  inputs: [
    { key: "L", label: "Length", val: 1800, unit: "mm" },
    { key: "W", label: "Width", val: 800, unit: "mm" },
    { key: "H", label: "Height", val: 850, unit: "mm" },
    { key: "underShelf", label: "Under Shelf", val: 1, unit: "Nos" },
    { key: "backsplash", label: "Backsplash", val: 1, unit: "0 or 1" },
    { key: "pilotBurner", label: "Pilot Burner", val: 3, unit: "Nos" },
    { key: "grating", label: "Grating", val: 3, unit: "Nos" },
    { key: "gratingCost", label: "Cost per Grating", val: 1000, unit: "Rs" },
    { key: "fittings", label: "Fittings", val: 3, unit: "Nos" },
    { key: "fittingsCost", label: "Cost per Fittings", val: 1200, unit: "Rs" },
    { key: "tTop", label: "Top Thickness", val: 1.6, unit: "mm" },
    { key: "tVF", label: "Vertical Front Thickness", val: 1, unit: "mm" },
    { key: "tVS", label: "Vertical Side Thickness", val: 1, unit: "mm" },
    { key: "tUp", label: "Vertical Uprights Thickness", val: 1.6, unit: "mm" },
    { key: "tCross", label: "Cross Support Thickness", val: 1.6, unit: "mm" },
    { key: "tUnder", label: "Under Shelf Thickness", val: 1.2, unit: "mm" },
    { key: "tStiff", label: "Stiffner Thickness", val: 1.6, unit: "mm" },
    { key: "tBack", label: "BackSplash Thickness", val: 1.6, unit: "mm" },
  ],
  derived: [{ key: "cross", fn: (i) => (i.H > 450 ? 2 : 1) * (i.underShelf === 0 ? 2 : 0) }],
  parts: [
    part(1, "16G", "Sheet", "Top", (i) => i.L + 120, (i) => i.W + 120, (i) => i.tTop, 1, "p1"),
    part(2, "20G", "Sheet", "Vertical Front", (i) => i.L, 300, (i) => i.tVF, 2),
    part(3, "20G", "Sheet", "Vertical Side", (i) => i.W, 300, (i) => i.tVS, 2),
    part(4, "16G", "Tube/Pipe", "Vertical Uprights", (i) => i.H, 160, (i) => i.tUp, 4),
    part(5, "16G", "Tube/Pipe", "Cross Support", (i) => i.L - 110, 100, (i) => i.tCross, (i) => i.cross),
    part(6, "16G", "Tube/Pipe", "Cross Support", (i) => i.W - 110, 100, (i) => i.tCross, (i) => i.cross),
    part(7, "16G", "Sheet", "Under Shelf", (i) => i.L + 120 - 110, (i) => i.W + 120, (i) => i.tUnder, (i) => i.underShelf, "p7"),
    part(8, "16G", "Sheet", "Stiffner", (i) => i.L, 185, (i) => i.tStiff, (i, c) => c?.byKey?.p7?.qty ?? 0),
    part(9, "16G", "Sheet", "BackSplash", (i) => i.L + 50, 190, (i) => i.tBack, (i) => i.backsplash),
  ],
  prices: [
    { label: "SS 316", rate: 750, price: (i, c) => round(750 * c.bodyWeight) + i.pilotBurner * 500 + i.grating * i.gratingCost + i.fittings * i.fittingsCost },
    { label: "SS 304", rate: 600, price: (i, c) => round(600 * c.bodyWeight) + i.pilotBurner * 500 + i.grating * i.gratingCost + i.fittings * i.fittingsCost },
    { label: "SS 202", rate: 500, price: (i, c) => round(500 * c.bodyWeight) + i.pilotBurner * 500 + i.grating * i.gratingCost + i.fittings * i.fittingsCost },
  ],
});

// 6. Stock Pot Range
PRODUCTS.push({
  id: "stock-pot-range",
  name: "Stock Pot Range",
  inputs: [
    { key: "L", label: "Length", val: 750, unit: "mm" },
    { key: "W", label: "Width", val: 750, unit: "mm" },
    { key: "H", label: "Height", val: 450, unit: "mm" },
    { key: "underShelf", label: "Under Shelf", val: 0, unit: "Nos" },
    { key: "backsplash", label: "Backsplash", val: 0, unit: "0 or 1" },
    { key: "pilotBurner", label: "Pilot Burner", val: 1, unit: "Nos" },
    { key: "grating", label: "Grating", val: 1, unit: "Nos" },
    { key: "gratingCost", label: "Cost per Grating", val: 1500, unit: "Rs" },
    { key: "fittings", label: "Fittings", val: 1, unit: "Nos" },
    { key: "fittingsCost", label: "Cost per Fittings", val: 1200, unit: "Rs" },
    { key: "tTop", label: "Top Thickness", val: 1.6, unit: "mm" },
    { key: "tVF", label: "Vertical Front Thickness", val: 1, unit: "mm" },
    { key: "tVS", label: "Vertical Side Thickness", val: 1, unit: "mm" },
    { key: "tUp", label: "Vertical Uprights Thickness", val: 1.6, unit: "mm" },
    { key: "tCross", label: "Cross Support Thickness", val: 1.6, unit: "mm" },
    { key: "tUnder", label: "Under Shelf Thickness", val: 1.6, unit: "mm" },
    { key: "tStiff", label: "Stiffner Thickness", val: 1.6, unit: "mm" },
    { key: "tBack", label: "BackSplash Thickness", val: 1.6, unit: "mm" },
  ],
  derived: [{ key: "cross", fn: (i) => (i.H > 450 ? 2 : 1) * (i.underShelf === 0 ? 2 : 0) }],
  parts: [
    part(1, "16G", "Sheet", "Top", (i) => i.L + 120, (i) => i.W + 120, (i) => i.tTop, 1),
    part(2, "20G", "Sheet", "Vertical Front", (i) => i.L, 300, (i) => i.tVF, 2),
    part(3, "20G", "Sheet", "Vertical Side", (i) => i.W, 300, (i) => i.tVS, 2),
    part(4, "16G", "Tube/Pipe", "Vertical Uprights", (i) => i.H, 160, (i) => i.tUp, 4),
    part(5, "16G", "Tube/Pipe", "Cross Support", (i) => i.L - 110, 100, (i) => i.tCross, (i) => i.cross),
    part(6, "16G", "Tube/Pipe", "Cross Support", (i) => i.W - 110, 100, (i) => i.tCross, (i) => i.cross),
    part(7, "16G", "Sheet", "Under Shelf", (i) => i.L + 10, (i) => i.W + 120, (i) => i.tUnder, (i) => i.underShelf, "p7"),
    part(8, "16G", "Sheet", "Stiffner", (i) => i.L, 185, (i) => i.tStiff, (i, c) => c?.byKey?.p7?.qty ?? 0),
    part(9, "16G", "Sheet", "BackSplash", (i) => i.L + 50, 190, (i) => i.tBack, (i) => i.backsplash),
  ],
  prices: [
    { label: "SS 316", rate: 700, price: (i, c) => round(700 * c.bodyWeight) + i.pilotBurner * 500 + i.grating * i.gratingCost + i.fittings * i.fittingsCost },
    { label: "SS 304", rate: 550, price: (i, c) => round(550 * c.bodyWeight) + i.pilotBurner * 500 + i.grating * i.gratingCost + i.fittings * i.fittingsCost },
    { label: "SS 202", rate: 300, price: (i, c) => round(300 * c.bodyWeight) + i.pilotBurner * 500 + i.grating * i.gratingCost + i.fittings * i.fittingsCost },
  ],
});

// 7. Plate Collection Trolley
PRODUCTS.push({
  id: "plate-collection-trolley",
  name: "Plate Collection Trolley",
  inputs: [
    { key: "L", label: "Length", val: 900, unit: "mm" },
    { key: "W", label: "Width", val: 500, unit: "mm" },
    { key: "H", label: "Height", val: 750, unit: "mm" },
    { key: "tRack", label: "Rack Thickness", val: 1.2, unit: "mm" },
    { key: "tHandle", label: "Vertical Handle Thickness", val: 1.6, unit: "mm" },
    { key: "tCross", label: "Cross Support Thickness", val: 1.6, unit: "mm" },
    { key: "tStiff", label: "Stiffner Thickness", val: 1, unit: "mm" },
    { key: "tier", label: "No. of Tier", val: 2, unit: "Nos" },
    { key: "wheelsCost", label: "Cost of 4 Wheels", val: 2000, unit: "Rs" },
    { key: "binsCost", label: "Cost of Bins", val: 2000, unit: "Rs" },
  ],
  parts: [
    part(1, "16G", "Tube/Pipe", "Vertical Handle", (i) => i.W + i.H * 2, 160, (i) => i.tHandle, 2, "p1"),
    part(2, "16G", "Tube/Pipe", "Cross Support", (i) => i.W, 120, (i) => i.tCross, (i, c) => c?.byKey?.p1?.qty ?? 0),
    part(3, "16G", "Sheet", "Rack", (i) => i.L + 140, (i) => i.W + 140, (i) => i.tRack, (i) => i.tier),
    part(4, "16G", "Sheet", "Stiffner", (i) => i.L, 215, (i) => i.tStiff, (i) => i.tier),
  ],
  prices: [
    { label: "SS 316", rate: 700, price: (i, c) => round(700 * c.bodyWeight) + i.wheelsCost + i.binsCost },
    { label: "SS 304", rate: 600, price: (i, c) => round(600 * c.bodyWeight) + i.wheelsCost + i.binsCost },
    { label: "SS 202", rate: 500, price: (i, c) => round(500 * c.bodyWeight) + i.wheelsCost + i.binsCost },
  ],
});

// 8. Multi Purpose Trolley
PRODUCTS.push({
  id: "multi-purpose-trolley",
  name: "Multi Purpose Trolley",
  inputs: [
    { key: "L", label: "Length", val: 900, unit: "mm" },
    { key: "W", label: "Width", val: 600, unit: "mm" },
    { key: "H", label: "Height", val: 850, unit: "mm" },
    { key: "tRack", label: "Rack Thickness", val: 1.6, unit: "mm" },
    { key: "tHandle", label: "Vertical Handle Thickness", val: 1.6, unit: "mm" },
    { key: "tCross", label: "Cross Support Thickness", val: 1.6, unit: "mm" },
    { key: "tStiff", label: "Stiffner Thickness", val: 1.6, unit: "mm" },
    { key: "tier", label: "No. of Tier", val: 2, unit: "Nos" },
    { key: "wheelsCost", label: "Cost of 4 Wheels", val: 2000, unit: "Rs" },
  ],
  parts: [
    part(1, "16G", "Tube/Pipe", "Vertical Handle", (i) => i.W + i.H * 2, 160, (i) => i.tHandle, 2, "p1"),
    part(2, "16G", "Tube/Pipe", "Cross Support", (i) => i.W, 120, (i) => i.tCross, (i, c) => c?.byKey?.p1?.qty ?? 0),
    part(3, "16G", "Sheet", "Tray", (i) => i.L + 140, (i) => i.W + 140, (i) => i.tRack, (i) => i.tier),
    part(4, "16G", "Sheet", "Stiffner", (i) => i.L, 215, (i) => i.tStiff, (i) => i.tier),
  ],
  prices: [
    { label: "SS 316", rate: 700, price: (i, c) => round(700 * c.bodyWeight) + i.wheelsCost },
    { label: "SS 304", rate: 600, price: (i, c) => round(600 * c.bodyWeight) + i.wheelsCost },
    { label: "SS 202", rate: 500, price: (i, c) => round(500 * c.bodyWeight) + i.wheelsCost },
  ],
});

// 9. Platform Trolley
PRODUCTS.push({
  id: "platform-trolley",
  name: "Platform Trolley",
  inputs: [
    { key: "L", label: "Length", val: 900, unit: "mm" },
    { key: "W", label: "Width", val: 600, unit: "mm" },
    { key: "H", label: "Height", val: 900, unit: "mm" },
    { key: "tRack", label: "Rack Thickness", val: 1.6, unit: "mm" },
    { key: "tStiff", label: "Stiffner Thickness", val: 1.6, unit: "mm" },
    { key: "tHandle", label: "Vertical Handle Thickness", val: 1.6, unit: "mm" },
    { key: "tCross", label: "Cross Support Thickness", val: 1.6, unit: "mm" },
    { key: "tVCross", label: "Vertical Cross Support Thickness", val: 1.6, unit: "mm" },
    { key: "wheelsCost", label: "Cost of 4 Wheels", val: 2000, unit: "Rs" },
  ],
  parts: [
    part(1, "16G", "Tube/Pipe", "Vertical Handle", (i) => i.W + i.H * 2, 160, (i) => i.tHandle, 1),
    part(2, "16G", "Tube/Pipe", "Cross Support", (i) => i.W, 120, (i) => i.tCross, 1),
    part(3, "16G", "Tube/Pipe", "Vertical Cross Support", (i) => i.H - 300, 120, (i) => i.tVCross, 2),
    part(4, "16G", "Sheet", "Tray", (i) => i.L + 140, (i) => i.W + 140, (i) => i.tRack, 1),
    part(5, "16G", "Sheet", "Stiffner", (i) => i.L, 215, (i) => i.tStiff, 1),
  ],
  prices: [
    { label: "SS 316", rate: 700, price: (i, c) => round(700 * c.bodyWeight) + i.wheelsCost },
    { label: "SS 304", rate: 600, price: (i, c) => round(600 * c.bodyWeight) + i.wheelsCost },
    { label: "SS 202", rate: 500, price: (i, c) => round(500 * c.bodyWeight) + i.wheelsCost },
  ],
});

// 10. Pot Rack
PRODUCTS.push({
  id: "pot-rack",
  name: "Pot Rack",
  inputs: [
    { key: "L", label: "Length", val: 1500, unit: "mm" },
    { key: "W", label: "Width", val: 600, unit: "mm" },
    { key: "H", label: "Height", val: 1700, unit: "mm" },
    { key: "tier", label: "No. of Tier", val: 4, unit: "Nos" },
    { key: "tUp", label: "Vertical Uprights Thickness", val: 1.6, unit: "mm" },
    { key: "tCross", label: "Cross Support Thickness", val: 1.6, unit: "mm" },
    { key: "tHoriz", label: "Horizontal Pipe Thickness", val: 1.6, unit: "mm" },
  ],
  parts: [
    part(1, "16G", "Tube/Pipe", "Vertical Uprights", (i) => i.H, 160, (i) => i.tUp, 4),
    part(2, "16G", "Tube/Pipe", "Cross Support", (i) => i.L, 120, (i) => i.tCross, (i) => 2 * i.tier),
    part(3, "16G", "Tube/Pipe", "Cross Support", (i) => i.W, 120, (i) => i.tCross, (i) => 2 * i.tier),
    part(4, "16G", "Tube/Pipe", "Horizontal Pipe", (i) => i.W, 80, (i) => i.tHoriz, (i) => i.tier * roundDown(i.L / 75)),
  ],
  prices: [
    { label: "SS 316", rate: 750, price: (i, c) => round(750 * c.bodyWeight) },
    { label: "SS 304", rate: 600, price: (i, c) => round(600 * c.bodyWeight) },
    { label: "SS 202", rate: 500, price: (i, c) => round(500 * c.bodyWeight) },
  ],
});

// 11. Baine Marie
function baineCanopy(c: number): number {
  const map: Record<number, number> = { 0: 0, 1: 6000, 2: 6000, 3: 9000, 4: 11600, 5: 14000, 6: 14500, 7: 15200, 8: 16000 };
  return map[c] ?? 0;
}

PRODUCTS.push({
  id: "baine-marie",
  name: "Baine Marie (with Canopy/OHS)",
  inputs: [
    { key: "L", label: "Length", val: 1800, unit: "mm" },
    { key: "W", label: "Width", val: 900, unit: "mm" },
    { key: "H", label: "Height", val: 850, unit: "mm" },
    { key: "underShelf", label: "Under Shelf", val: 1, unit: "Nos" },
    { key: "canopy", label: "Canopy (Ft)", val: 0, unit: "0–8 Ft" },
    { key: "overheadShelf", label: "Overhead Shelf", val: 0, unit: "Nos" },
    { key: "rail", label: "Rail", val: 1, unit: "Single/Double" },
    { key: "sides3", label: "3 Sides Cover", val: 1, unit: "0 or 1" },
  ],
  derived: [
    { key: "cross", fn: (i) => (i.underShelf === 0 ? 2 : 0) },
    { key: "gn", fn: (i) => roundDown(i.L / 325) },
  ],
  parts: [
    part(1, "16G", "Sheet", "Top", (i) => i.L + 120, (i) => i.W + 120, 1.6, 1, "p1"),
    part(2, "16G", "Tube/Pipe", "Vertical Uprights", 150, 160, 1.6, 4),
    part(3, "16G", "Tube/Pipe", "Cross Support", (i) => i.L - 110, 100, 1.6, (i) => i.cross),
    part(4, "16G", "Tube/Pipe", "Cross Support", (i) => i.W - 110, 100, 1.6, (i) => i.cross),
    part(5, "18G", "Sheet", "Under Shelf", (i) => i.L + 10, (i) => i.W + 120, 1.2, (i) => i.underShelf),
    part(6, "16G", "Sheet", "Vertical Pipe", (i) => (i.overheadShelf === 0 ? 0 : i.overheadShelf === 1 ? 450 : 750), 100, 1.6, 4),
    part(7, "18G", "Sheet", "Overhead Shelves", (i) => (i.L + 120) - 50, 410, 1.2, (i) => i.overheadShelf),
    part(8, "", "Sheet", "3 Sides Cover", (i) => i.L + i.W + i.W, (i) => i.H, 1, (i) => i.sides3),
    part(9, "16G", "Sheet", "Rail", (i) => i.L, 80, 1.6, 3, "p9"),
    part(10, "16G", "Sheet", "Water Chamber", (i) => i.L + 120, (i) => i.W + 650, 1.2, 1, "p10"),
  ],
  weight: null,
  prices: [
    { label: "SS 316", rate: 700, price: (i, c) => round(700 * c.bodyWeight) + 5000 + 2100 * (c.byKey["_gn"]?.totalWeight ?? 0) + baineCanopy(i.canopy) },
    { label: "SS 304", rate: 600, price: (i, c) => round(600 * c.bodyWeight) + 5000 + 2100 * (c.byKey["_gn"]?.totalWeight ?? 0) + baineCanopy(i.canopy) },
    { label: "SS 202", rate: 500, price: (i, c) => round(500 * c.bodyWeight) + 5000 + 2100 * (c.byKey["_gn"]?.totalWeight ?? 0) + baineCanopy(i.canopy) },
  ],
});
{
  const bm = PRODUCTS.find((p) => p.id === "baine-marie")!;
  bm.parts[0].totalWeight = (i, c) => (c.unitWeight / 2) * c.qty;
  bm.parts[8].totalWeight = (i, c) => {
    return i.rail * ((c.unitWeight * c.qty) + (0.325 * 0.325 * 1.6 * 8 * 3) + (0.35 * ((i.L + 50) / 1000)) * 8 * 1.6);
  };
  bm.parts[9].totalWeight = (i, c) => (c.unitWeight - 4.5 + 3) * c.qty;
}

// 12. Counters - OHS
PRODUCTS.push({
  id: "counters-ohs",
  name: "Counters (OHS)",
  inputs: [
    { key: "L", label: "Length", val: 1500, unit: "mm" },
    { key: "W", label: "Width", val: 600, unit: "mm" },
    { key: "H", label: "Height", val: 850, unit: "mm" },
    { key: "underShelf", label: "Under Shelf", val: 1, unit: "Nos" },
    { key: "overheadShelf", label: "Overhead Shelf", val: 2, unit: "Nos" },
    { key: "backsplash", label: "Backsplash", val: 1, unit: "0 or 1" },
    { key: "backsplashH", label: "Backsplash Height", val: 150, unit: "mm" },
    { key: "sides3", label: "3 Sides Cover", val: 1, unit: "0 or 1" },
    { key: "tTop", label: "Top Thickness", val: 1.6, unit: "mm" },
    { key: "tStiff", label: "Stiffner Thickness", val: 1, unit: "mm" },
    { key: "tUp", label: "Vertical Uprights Thickness", val: 1.6, unit: "mm" },
    { key: "tCross", label: "Cross Support Thickness", val: 1.6, unit: "mm" },
    { key: "tUnder", label: "Under Shelf Thickness", val: 1.2, unit: "mm" },
    { key: "tStiff2", label: "Stiffner 2 Thickness", val: 1, unit: "mm" },
    { key: "tBack", label: "BackSplash Thickness", val: 1.6, unit: "mm" },
    { key: "tVPipe", label: "Vertical Pipe Thickness", val: 1.6, unit: "mm" },
    { key: "tOHS", label: "Overhead Shelves Thickness", val: 1, unit: "mm" },
    { key: "tSides", label: "3 Sides Cover Thickness", val: 0.8, unit: "mm" },
  ],
  derived: [{ key: "cross", fn: (i) => (i.underShelf === 0 ? 2 : 0) }],
  parts: [
    part(1, "16G", "Sheet", "Top", (i) => i.L + 120, (i) => i.W + 120, (i) => i.tTop, 1),
    part(2, "16G", "Sheet", "Stiffner", (i) => i.L, 180, (i) => i.tStiff, 1),
    part(3, "16G", "Tube/Pipe", "Vertical Uprights", (i) => i.H, 160, (i) => i.tUp, 4),
    part(4, "16G", "Tube/Pipe", "Cross Support", (i) => i.L - 110, 100, (i) => i.tCross, (i) => i.cross),
    part(5, "16G", "Tube/Pipe", "Cross Support", (i) => i.W - 110, 100, (i) => i.tCross, (i) => i.cross),
    part(6, "18G", "Sheet", "Under Shelf", (i) => i.L + 10, (i) => i.W + 120, (i) => i.tUnder, (i) => i.underShelf),
    part(7, "16G", "Sheet", "Stiffner", (i) => i.L - 110, 180, (i) => i.tStiff2, (i) => i.underShelf),
    part(8, "16G", "Sheet", "BackSplash", (i) => i.L + 50, (i) => i.backsplashH + 40, (i) => i.tBack, (i) => i.backsplash),
    part(9, "16G", "Sheet", "Vertical Pipe", (i) => (i.overheadShelf === 0 ? 0 : i.overheadShelf === 1 ? 450 : 750), 100, (i) => i.tVPipe, 4),
    part(10, "18G", "Sheet", "Overhead Shelves", (i) => (i.L + 120) - 50, 410, (i) => i.tOHS, (i) => i.overheadShelf),
    part(11, "", "Sheet", "3 Sides Cover", (i) => i.L + i.W + i.W, (i) => i.H, (i) => i.tSides, (i) => i.sides3),
  ],
  prices: [
    { label: "SS 316", rate: 700, price: (i, c) => round(700 * c.bodyWeight) },
    { label: "SS 304", rate: 600, price: (i, c) => round(600 * c.bodyWeight) },
    { label: "SS 202", rate: 500, price: (i, c) => round(500 * c.bodyWeight) },
  ],
});

// 13. Storage Rack
PRODUCTS.push({
  id: "storage-rack",
  name: "Storage Rack",
  inputs: [
    { key: "L", label: "Length", val: 1500, unit: "mm" },
    { key: "W", label: "Width", val: 500, unit: "mm" },
    { key: "H", label: "Height", val: 1500, unit: "mm" },
    { key: "rack", label: "No. of Rack", val: 4, unit: "Nos" },
    { key: "tRack", label: "Rack Thickness", val: 1.2, unit: "mm" },
    { key: "tStiff", label: "Stiffner Thickness", val: 0.8, unit: "mm" },
    { key: "tUp", label: "Vertical Uprights Thickness", val: 1.6, unit: "mm" },
  ],
  parts: [
    part(1, "18G", "Sheet", "Rack", (i) => i.L + 40, (i) => i.W + 120, (i) => i.tRack, (i) => i.rack),
    part(2, "18G", "Sheet", "Stiffner", (i) => i.L, 185, (i) => i.tStiff, (i) => i.rack),
    part(3, "16G", "Tube/Pipe", "Vertical Uprights", (i) => i.H, 160, (i) => i.tUp, 4),
  ],
  prices: [
    { label: "SS 316", rate: 750, price: (i, c) => round(750 * c.bodyWeight) },
    { label: "SS 304", rate: 600, price: (i, c) => round(600 * c.bodyWeight) },
    { label: "SS 202", rate: 500, price: (i, c) => round(500 * c.bodyWeight) },
  ],
});

// 14. Work Table with Sink & OHS
PRODUCTS.push({
  id: "wt-sink-ohs",
  name: "Work Table with Sink & Overhead Shelf",
  inputs: [
    { key: "L", label: "Length", val: 1150, unit: "mm" },
    { key: "W", label: "Width", val: 600, unit: "mm" },
    { key: "H", label: "Height", val: 850, unit: "mm" },
    { key: "underShelf", label: "Under Shelf", val: 2, unit: "Nos" },
    { key: "overheadShelf", label: "Overhead Shelf", val: 0, unit: "Nos" },
    { key: "backsplash", label: "Backsplash", val: 0, unit: "0 or 1" },
    { key: "sink", label: "Sink", val: 0, unit: "Nos" },
    { key: "tTop", label: "Top Thickness", val: 1.6, unit: "mm" },
    { key: "tStiff", label: "Stiffner Thickness", val: 1, unit: "mm" },
    { key: "tUp", label: "Vertical Uprights Thickness", val: 1.6, unit: "mm" },
    { key: "tCross", label: "Cross Support Thickness", val: 1.6, unit: "mm" },
    { key: "tUnder", label: "Under Shelf Thickness", val: 1.2, unit: "mm" },
    { key: "tStiff2", label: "Stiffner 2 Thickness", val: 1, unit: "mm" },
    { key: "tBack", label: "BackSplash Thickness", val: 1.6, unit: "mm" },
    { key: "tVPipe", label: "Vertical Pipe Thickness", val: 1.6, unit: "mm" },
    { key: "tOHS", label: "Overhead Shelves Thickness", val: 1.2, unit: "mm" },
  ],
  derived: [{ key: "cross", fn: (i) => (i.underShelf === 0 ? 2 : 0) }],
  parts: [
    part(1, "16G", "Sheet", "Top", (i) => i.L + 120, (i) => i.W + 120, (i) => i.tTop, 1),
    part(2, "16G", "Sheet", "Stiffner", (i) => i.L, 180, (i) => i.tStiff, 1),
    part(3, "16G", "Tube/Pipe", "Vertical Uprights", (i) => i.H, 160, (i) => i.tUp, 4),
    part(4, "16G", "Tube/Pipe", "Cross Support", (i) => i.L - 110, 100, (i) => i.tCross, (i) => i.cross),
    part(5, "16G", "Tube/Pipe", "Cross Support", (i) => i.W - 110, 100, (i) => i.tCross, (i) => i.cross),
    part(6, "18G", "Sheet", "Under Shelf", (i) => i.L + 10, (i) => i.W + 120, (i) => i.tUnder, (i) => i.underShelf, "p6"),
    part(7, "16G", "Sheet", "Stiffner", (i) => i.L - 110, 180, (i) => i.tStiff2, (i, c) => c?.byKey?.p6?.qty ?? 0),
    part(8, "16G", "Sheet", "BackSplash", (i) => i.L + 50, 190, (i) => i.tBack, (i) => i.backsplash),
    part(9, "16G", "Sheet", "Vertical Pipe", (i) => (i.overheadShelf === 0 ? 0 : i.overheadShelf === 1 ? 450 : 750), 100, (i) => i.tVPipe, 4),
    part(10, "18G", "Sheet", "Overhead Shelves", (i) => (i.L + 120) - 50, 410, (i) => i.tOHS, (i) => i.overheadShelf),
    part(11, "16G", "Sink", "Sink Bowl", 0, 0, 0, (i) => i.sink, "p11"),
  ],
  prices: [
    { label: "SS 316", rate: 700, price: (i, c) => round(700 * c.bodyWeight) },
    { label: "SS 304", rate: 600, price: (i, c) => round(600 * c.bodyWeight) },
    { label: "SS 202", rate: 500, price: (i, c) => round(500 * c.bodyWeight) },
  ],
});
{
  const wt = PRODUCTS.find((p) => p.id === "wt-sink-ohs")!;
  wt.parts[10].totalWeight = (i, c) => 8 * c.qty;
}

// ─── Format helpers ───────────────────────────────────────────────────────────
const fmtKg = (n: number) => isNaN(n) ? "—" : n.toLocaleString("en-IN", { maximumFractionDigits: 3 });
const fmtRs = (n: number) => isNaN(n) ? "—" : Math.round(n).toLocaleString("en-IN");
const fmtMm = (n: number) => isNaN(n) ? "—" : (Math.round(n * 100) / 100).toLocaleString("en-IN");

// ─── Sub-components ───────────────────────────────────────────────────────────

function NumberField({ label, unit, value, onChange }: { label: string; unit: string; value: number | string; onChange: (v: number | string) => void }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-medium text-[#27A8A3] uppercase tracking-wider">{label}</span>
      <div className="flex items-center bg-white border border-[#27A8A3]/20 rounded-lg overflow-hidden focus-within:border-[#27A8A3] focus-within:shadow-[0_0_0_3px_rgba(39,168,163,0.12)] transition-all">
        <input
          type="number"
          step="any"
          value={value}
          onChange={(e) => onChange(e.target.value === "" ? "" : parseFloat(e.target.value))}
          className="flex-1 bg-transparent border-none outline-none text-gray-800 font-mono text-[13px] px-3 py-2 w-full"
        />
        {unit && (
          <span className="px-2.5 text-[11px] text-[#27A8A3]/70 font-mono border-l border-[#27A8A3]/15 self-stretch flex items-center bg-[#27A8A3]/5 whitespace-nowrap">
            {unit}
          </span>
        )}
      </div>
    </label>
  );
}

function PriceCard({ label, rate, ms, price }: { label: string; rate: number; ms?: number; price: number }) {
  const is316 = label.includes("316");
  const is304 = label.includes("304");
  const is202 = label.includes("202");
  const borderColor = is316 ? "#27A8A3" : is304 ? "#4FD1CC" : "#1E8E8A";
  const badgeBg = is316 ? "bg-[#27A8A3]" : is304 ? "bg-[#4FD1CC]" : "bg-[#1E8E8A]";

  return (
    <div
      className="relative bg-white rounded-xl border overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg group"
      style={{ borderColor: `${borderColor}30` }}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: borderColor }} />
      <div className="p-4 pt-5">
        <div className="flex items-center justify-between mb-1">
          <span className={`text-white text-[11px] font-bold px-2 py-0.5 rounded-full ${badgeBg}`}>{label}</span>
        </div>
        <div className="text-[10.5px] text-gray-400 font-mono mt-1">
          @ ₹{rate}/kg{ms ? ` · MS @ ₹${ms}/kg` : ""}
        </div>
        <div className="mt-3 flex items-baseline gap-0.5">
          <span className="text-gray-400 text-sm">₹</span>
          <span className="text-[22px] font-bold text-gray-800 font-mono">{fmtRs(price)}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function KitchenCalculator() {
  const [activeId, setActiveId] = useState(PRODUCTS[0].id);
  const [query, setQuery] = useState("");
  const [showParts, setShowParts] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allInputs, setAllInputs] = useState<Record<string, Record<string, number | string>>>(() => {
    const o: Record<string, Record<string, number | string>> = {};
    for (const sp of PRODUCTS) {
      o[sp.id] = {};
      for (const inp of sp.inputs) o[sp.id][inp.key] = inp.val;
    }
    return o;
  });

  const spec = PRODUCTS.find((p) => p.id === activeId)!;
  const inputs = allInputs[activeId];

  const result = useMemo<ComputedResult>(() => {
    const clean: Record<string, number> = {};
    for (const k in inputs) {
      const v = inputs[k];
      clean[k] = v === "" || v == null ? 0 : Number(v);
    }
    try {
      return computeProduct(spec, clean);
    } catch (e) {
      return { i: clean, error: String(e), rows: [], bodyWeight: 0, prices: [] };
    }
  }, [spec, inputs]);

  const setInput = useCallback((key: string, v: number | string) => {
    setAllInputs((prev) => ({ ...prev, [activeId]: { ...prev[activeId], [key]: v } }));
  }, [activeId]);

  const resetProduct = () => {
    const o: Record<string, number | string> = {};
    for (const inp of spec.inputs) o[inp.key] = inp.val;
    setAllInputs((prev) => ({ ...prev, [activeId]: o }));
  };

  const handleProductSelect = (id: string) => {
    setActiveId(id);
    setSidebarOpen(false);
  };

  const filtered = PRODUCTS.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
  const dimInputs = spec.inputs.filter((i) => !/thickness/i.test(i.label));
  const thickInputs = spec.inputs.filter((i) => /thickness/i.test(i.label));

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex justify-center p-10">
      {/* ── Mobile header ── */}
      <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-[#27A8A3]/20 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ background: "linear-gradient(135deg,#27A8A3,#1E8E8A)" }}>
            SS
          </div>
          <span className="font-bold text-gray-800 text-sm">Fab Price</span>
        </div>
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg border border-[#27A8A3]/20 text-[#27A8A3]" aria-label="Open menu">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </header>

      {/* ── Mobile sidebar overlay ── */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-[280px] bg-white h-full flex flex-col shadow-2xl">
            <SidebarContent
              products={PRODUCTS}
              filtered={filtered}
              activeId={activeId}
              query={query}
              setQuery={setQuery}
              onSelect={handleProductSelect}
              onClose={() => setSidebarOpen(false)}
            />
          </aside>
        </div>
      )}

      <div className="flex min-h-screen">
        {/* ── Desktop Sidebar ── */}
        <aside className="hidden lg:flex w-[280px] flex-shrink-0 flex-col bg-white border-r border-[#27A8A3]/15 sticky top-0 h-screen overflow-hidden shadow-[2px_0_20px_rgba(39,168,163,0.06)]">
          <SidebarContent
            products={PRODUCTS}
            filtered={filtered}
            activeId={activeId}
            query={query}
            setQuery={setQuery}
            onSelect={handleProductSelect}
          />
        </aside>

        {/* ── Main ── */}
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-[1100px]">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] mb-1" style={{ color: "#27A8A3" }}>
                Product Estimate
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">{spec.name}</h1>
            </div>
            <button
              onClick={resetProduct}
              className="flex items-center gap-1.5 px-3.5 py-2 text-sm text-[#27A8A3] border border-[#27A8A3]/30 rounded-lg hover:bg-[#27A8A3]/5 transition-colors font-medium"
            >
              <span>↺</span> Reset
            </button>
          </div>

          {result.error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-mono">{result.error}</div>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-5">
            {/* ── Inputs panel ── */}
            <section className="bg-white rounded-2xl border border-[#27A8A3]/15 overflow-hidden shadow-sm xl:sticky xl:top-6 self-start">
              <div className="px-4 py-3 border-b border-[#27A8A3]/10 bg-[#27A8A3]/4">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1E8E8A]">Specifications</h2>
              </div>
              <div className="p-4 flex flex-col gap-3">
                {dimInputs.map((inp) => (
                  <NumberField key={inp.key} label={inp.label} unit={inp.unit} value={inputs[inp.key]} onChange={(v) => setInput(inp.key, v)} />
                ))}
              </div>
              {thickInputs.length > 0 && (
                <>
                  <div className="px-4 py-2 border-t border-b border-[#27A8A3]/10 bg-[#27A8A3]/4">
                    <h2 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#27A8A3]/70">Material Thickness</h2>
                  </div>
                  <div className="p-4 flex flex-col gap-3">
                    {thickInputs.map((inp) => (
                      <NumberField key={inp.key} label={inp.label} unit={inp.unit} value={inputs[inp.key]} onChange={(v) => setInput(inp.key, v)} />
                    ))}
                  </div>
                </>
              )}
            </section>

            {/* ── Results ── */}
            <section className="flex flex-col gap-4">
              {/* Weight banner */}
              <div className="relative rounded-2xl p-5 overflow-hidden text-white" style={{ background: "linear-gradient(135deg,#27A8A3 0%,#4FD1CC 50%,#1E8E8A 100%)" }}>
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(135deg,rgba(255,255,255,.15) 0 2px,transparent 2px 9px)" }} />
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">Fabricated Weight</p>
                <p className="text-5xl font-bold mt-1 leading-none font-mono">
                  {fmtKg(result.bodyWeight)}<span className="text-2xl text-white/60 font-normal ml-1">kg</span>
                </p>
                {result.i?.cross != null && (
                  <span className="absolute top-4 right-4 bg-white/20 border border-white/30 text-white text-[11px] font-mono px-3 py-1 rounded-full">
                    Cross supports: {result.i.cross}
                  </span>
                )}
              </div>

              {/* Prices / Variants */}
              {result.variants
                ? result.variants.map((v, vi) => (
                  <div key={vi} className="bg-white rounded-2xl border border-[#27A8A3]/15 overflow-hidden shadow-sm">
                    <div className="px-4 py-3 border-b border-[#27A8A3]/10 flex justify-between items-center">
                      <h3 className="text-sm font-semibold text-gray-700">{v.title}</h3>
                      <span className="text-[11px] font-mono bg-[#27A8A3]/10 text-[#1E8E8A] px-2.5 py-1 rounded-full">{fmtKg(v.weightUsed)} kg</span>
                    </div>
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {v.prices.map((p, pi) => <PriceCard key={pi} label={p.label} rate={p.rate} ms={p.ms} price={p.price} />)}
                    </div>
                  </div>
                ))
                : (
                  <div className="bg-white rounded-2xl border border-[#27A8A3]/15 overflow-hidden shadow-sm">
                    <div className="px-4 py-3 border-b border-[#27A8A3]/10">
                      <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1E8E8A]">Selling Price by Grade</h3>
                    </div>
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {result.prices.map((p, pi) => <PriceCard key={pi} label={p.label} rate={p.rate} ms={p.ms} price={p.price} />)}
                    </div>
                  </div>
                )
              }

              {/* Cut list toggle */}
              <button
                onClick={() => setShowParts((s) => !s)}
                className="flex items-center gap-2 text-sm text-[#27A8A3] font-medium hover:text-[#1E8E8A] transition-colors self-start"
              >
                <span>{showParts ? "▾" : "▸"}</span>
                Cut List & Weight Breakdown ({result.rows.length} parts)
              </button>

              {showParts && (
                <div className="bg-white rounded-2xl border border-[#27A8A3]/15 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-[12px] border-collapse">
                      <thead>
                        <tr className="bg-[#27A8A3]/5 border-b border-[#27A8A3]/15">
                          {["#", "Gauge", "Material", "Description", "L (mm)", "W (mm)", "T (mm)", "ρ", "Unit Wt", "Qty", "Total Wt"].map((h, hi) => (
                            <th key={hi} className={`px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider text-[#27A8A3] whitespace-nowrap ${hi >= 4 ? "text-right" : ""}`}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {result.rows.map((r, ri) => (
                          <tr key={ri} className={`border-b border-gray-100 hover:bg-[#27A8A3]/3 transition-colors ${r.qty === 0 ? "opacity-30" : ""}`}>
                            <td className="px-3 py-2 text-gray-400 font-mono">{r.sno}</td>
                            <td className="px-3 py-2 text-gray-500">{r.gauge || "—"}</td>
                            <td className="px-3 py-2 text-gray-500">{r.material}</td>
                            <td className="px-3 py-2 text-gray-800 font-medium">{r.desc}</td>
                            <td className="px-3 py-2 text-right font-mono text-gray-600">{fmtMm(r.L)}</td>
                            <td className="px-3 py-2 text-right font-mono text-gray-600">{fmtMm(r.W)}</td>
                            <td className="px-3 py-2 text-right font-mono text-gray-600">{fmtMm(r.T)}</td>
                            <td className="px-3 py-2 text-right font-mono text-gray-400">8</td>
                            <td className="px-3 py-2 text-right font-mono text-gray-600">{fmtKg(r.unitWeight)}</td>
                            <td className="px-3 py-2 text-right font-mono text-gray-600">{r.qty}</td>
                            <td className="px-3 py-2 text-right font-mono font-bold text-gray-800">{fmtKg(r.totalWeight)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t-2 border-[#27A8A3]/20 bg-[#27A8A3]/5">
                          <td colSpan={10} className="px-3 py-2.5 text-right text-[11px] font-bold uppercase tracking-wider text-[#1E8E8A]">Total Fabricated Weight</td>
                          <td className="px-3 py-2.5 text-right font-mono font-bold text-[#27A8A3]">{fmtKg(result.bodyWeight)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              )}

              <p className="text-[10.5px] text-gray-400 font-mono">
                Weight = L×W×T×8 ÷ 10⁶ per piece · {PRODUCTS.length} products
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── Sidebar Content ──────────────────────────────────────────────────────────

function SidebarContent({
  products,
  filtered,
  activeId,
  query,
  setQuery,
  onSelect,
  onClose,
}: {
  products: ProductSpec[];
  filtered: ProductSpec[];
  activeId: string;
  query: string;
  setQuery: (q: string) => void;
  onSelect: (id: string) => void;
  onClose?: () => void;
}) {
  return (
    <>
      {/* Brand */}
      <div className="px-4 py-4 border-b border-[#27A8A3]/15" style={{ background: "linear-gradient(135deg,#27A8A3 0%,#1E8E8A 100%)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center text-white font-bold text-sm shadow-inner">SS</div>
            <div>
              <div className="text-white font-bold text-sm tracking-wider">FAB PRICE</div>
              <div className="text-white/60 text-[10px] mt-0.5">Kitchen Equipment Estimator</div>
            </div>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-white/60 hover:text-white transition-colors p-1" aria-label="Close">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-3 border-b border-[#27A8A3]/10">
        <div className="flex items-center gap-2 bg-gray-50 border border-[#27A8A3]/20 rounded-lg px-3 py-2 focus-within:border-[#27A8A3] focus-within:shadow-[0_0_0_3px_rgba(39,168,163,0.1)] transition-all">
          <svg className="w-3.5 h-3.5 text-[#27A8A3]/50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" strokeLinecap="round" /></svg>
          <input
            className="bg-transparent outline-none text-[12.5px] text-gray-700 placeholder-gray-400 w-full"
            placeholder="Search products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {filtered.map((p) => {
          const idx = products.indexOf(p);
          const isActive = p.id === activeId;
          return (
            <button
              key={p.id}
              onClick={() => onSelect(p.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-[12.5px] transition-all duration-150 mb-0.5 ${
                isActive
                  ? "text-white shadow-sm font-medium"
                  : "text-gray-600 hover:bg-[#27A8A3]/8 hover:text-[#1E8E8A]"
              }`}
              style={isActive ? { background: "linear-gradient(135deg,#27A8A3,#1E8E8A)" } : {}}
            >
              <span className={`font-mono text-[10px] min-w-[22px] ${isActive ? "text-white/70" : "text-gray-400"}`}>
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="leading-snug">{p.name}</span>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 text-[12px] py-6">No products found</p>
        )}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-[#27A8A3]/10 text-[10px] text-gray-400 font-mono leading-relaxed">
        Weight = L×W×T×8 ÷ 10⁶
      </div>
    </>
  );
}
