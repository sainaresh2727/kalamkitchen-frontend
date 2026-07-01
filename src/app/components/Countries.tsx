// components/ServiceAreas.tsx
// Kalam Kitchen Equipments — Service Areas Section
// Next.js + TypeScript + Tailwind CSS
// Fonts: Playfair Display (display) + Sora (body)

"use client";

import Link from "next/link";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Location {
  name: string;
  sub: string;
  slug:string;
  popular?: boolean;
  flag?: string;
}

interface Region {
  tag: string;
  title: string;
  locations: Location[];

}

interface Stat {
  num: string;
  label: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const INDIA: Region = {
  tag: "IND",
  title: "India",
  locations: [
    {
      name: "Commercial Kitchen Equipment Tirupati",
      sub: "Andhra Pradesh",
      slug:"/locations/commercial-kitchen-equipment-tirupati"
    },
    {
      name: "Commercial Kitchen Equipment Andaman",
      sub: "Andaman & Nicobar Islands",
      slug:"/locations/commercial-kitchen-equipment-andaman"
    },
    {
      name: "Trusted Commercial Kitchen Equipment Bangalore",
      sub: "Karnataka",
      popular: true,
      slug:"/locations/commercial-kitchen-equipment-tirupati"
    },
  ],
};

const INTERNATIONAL: Region = {
  tag: "INTL",
  title: "International",
  locations: [
    { name: "Commercial Kitchen Equipment Malaysia", sub: "Kuala Lumpur", flag: "🇲🇾", slug:"/locations/commercial-kitchen-equipment-tirupati"},
    { name: "Commercial Kitchen Equipment Maldives", sub: "Malé", flag: "🇲🇻",slug:"/locations/commercial-kitchen-equipment-tirupati" },
    { name: "Commercial Kitchen Equipment South Korea", sub: "Seoul", flag: "🇰🇷",slug:"/locations/commercial-kitchen-equipment-tirupati" },
    { name: "Commercial Kitchen Equipment Sri Lanka", sub: "Colombo", flag: "🇱🇰",slug:"/locations/commercial-kitchen-equipment-tirupati" },
  ],
};

const STATS: Stat[] = [
  { num: "7", label: "Total locations" },
  { num: "3", label: "Indian cities" },
  { num: "4", label: "Countries served" },
  { num: "2015", label: "Founded Chennai" },
];

// ─── LocationItem ─────────────────────────────────────────────────────────────

function LocationItem({
  loc,
  isLast,
}: {
  loc: Location;
  isLast: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex items-start py-[13px] transition-all duration-200 cursor-default"
      style={{
        paddingLeft: hovered ? "6px" : "0px",
        borderBottom: isLast ? "none" : "1px solid #eaf5f4",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Pulse dot */}
      <div className="flex-shrink-0 mt-[5px] mr-[11px]">
        <div
          className="w-[6px] h-[6px] rounded-full transition-colors duration-200"
          style={{ background: hovered ? "#4FD1CC" : "#27A8A3" }}
        />
      </div>

      {/* Name + state */}
      <Link className="flex flex-col gap-[2px] flex-1 min-w-0" href={loc.slug}>
        <span className="text-[15px] font-bold text-[#0d2e2c]">
          {loc.name}
        </span>
        <span className="text-[13px] text-[#27A8A3] font-bold">{loc.sub}</span>
      </Link>

      {/* Badges */}
      <div className="flex items-center gap-[6px] flex-shrink-0 ml-2">
        {loc.popular && (
          <span className="text-[9.5px] font-semibold text-[#a06000] bg-[#fff4db] border border-[#fcd98a] px-2 py-[2px] rounded-full whitespace-nowrap">
            ★ Popular
          </span>
        )}
        {loc.flag && (
          <span className="text-[15px] leading-none" style={{ opacity: 0.85 }}>
            {loc.flag}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── RegionPanel ──────────────────────────────────────────────────────────────

function RegionPanel({
  region,
  isIntl = false,
}: {
  region: Region;
  isIntl?: boolean;
}) {
  return (
    <div className="px-0 md:px-7">
      {/* Header */}
      <div className="flex items-center gap-[10px] mb-6 pb-[18px] border-b-[1.5px] border-[#d0edeb]">
        <span
          className="text-[9.5px] font-bold tracking-[0.12em] text-white px-[10px] py-[5px] rounded-[7px]"
          style={{ background: isIntl ? "#1E8E8A" : "#0a1e1d" }}
        >
          {region.tag}
        </span>
        <span
          className="text-[17px] font-semibold text-[#0d2e2c]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {region.title}
        </span>
        <span className="ml-auto text-[11px] font-medium text-[#27A8A3] bg-[#edfaf9] border border-[#d0edeb] px-[10px] py-[3px] rounded-full whitespace-nowrap">
          {region.locations.length} {isIntl ? "countries" : "locations"}
        </span>
      </div>

      {/* List */}
      <u className="flex flex-col">
        {region.locations.map((loc, i) => (
          <LocationItem
            key={loc.name}
            loc={loc}
            isLast={i === region.locations.length - 1}
          />
        ))}
      </u>
    </div>
  );
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="flex-1 text-center px-3 py-[18px] border-r border-[#d0edeb] last:border-r-0 min-w-0">
      <div
        className="text-[22px] font-bold text-[#27A8A3] leading-none"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {stat.num}
      </div>
      <div className="text-[10.5px] text-[#5a7a78] mt-1 font-medium tracking-[0.03em]">
        {stat.label}
      </div>
    </div>
  );
}

// ─── ServiceAreas (main export) ───────────────────────────────────────────────

export default function ServiceAreas() {
  return (
    <section className="relative overflow-hidden bg-[#f2faf9] px-5 py-16 md:py-20">

      {/* Glow blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, #c8f0ee 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-16 h-60 w-60 rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, #b2ece8 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-[860px]">

        {/* ── Header ── */}
        <div className="mb-12 text-center">
        
        <div className='trusted-badge mx-auto'>
        <div className="dot"></div>
         <p>SERVICE AREAS</p>
        </div>

          <h2
            className="mb-3 mt-4 text-[28px] font-bold leading-tight text-[#0a1e1d] md:text-[32px]">
            Commercial Kitchen Equipment{" "}
            <span className="text-[#27A8A3]">Locations</span>
          </h2>

          <p className="para-content text-[#5a7a78]">
            Trusted by hospitality leaders worldwide — explore our presence across
            India and international markets.
          </p>
        </div>

        {/* ── Panels ── */}
        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-0">
          {/* Vertical divider — md+ only */}
          <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-[#d0edeb] md:block" />

          <RegionPanel region={INDIA} />
          <RegionPanel region={INTERNATIONAL} isIntl />
        </div>

        {/* ── Stats bar ── */}
        <div className="mt-10 flex overflow-hidden rounded-2xl border border-[#d0edeb] bg-white">
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>

      </div>
    </section>
  );
}
