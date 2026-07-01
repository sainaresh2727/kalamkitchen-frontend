"use client";

import {
    FaUtensils,
    FaSchool,
    FaBreadSlice,
    FaCloud,
    FaTruck,
    FaHospital,
    FaGraduationCap,
    FaStore,
    FaHotel,
  } from "react-icons/fa6";

import Marquee from "react-fast-marquee";


export default function IndustryMarquee() {
  
 const industries = [
    { icon: FaUtensils, title: "Restaurants" },
    { icon: FaSchool, title: "Canteens" },
    { icon: FaBreadSlice, title: "Bakeries" },
    { icon: FaCloud, title: "Cloud Kitchens" },
    { icon: FaTruck, title: "Catering Businesses" },
    { icon: FaHospital, title: "Hospital Kitchens" },
    { icon: FaGraduationCap, title: "Educational Institutes" },
    { icon: FaStore, title: "Food Courts" },
    { icon: FaHotel, title: "Hotels" },
  ];
  return (

    <section className="lg:pt-20  container">


    <div className="flex justify-center">
    <div className='trusted-badge'>
    <div className="dot"></div>
    <p className="uppercase" style={{letterSpacing:"1px"}}>Serving businesses Across  & beyond</p>
    </div>
    </div>

    <Marquee
  speed={45}
  pauseOnHover
  gradient={false}
  className="py-4 mt-3"
>
  {industries.map((item, index) => {
    const Icon = item.icon;

    return (
      <div key={index} className="flex items-center">
        <div className="mx-4 flex items-center gap-2 px-3 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full">
            <Icon className="text-[20px] text-[#27A8A3]" />
          </div>

          <span
            className="text-[13px] font-semibold whitespace-nowrap text-[#27A8A3]"
            style={{ letterSpacing: "2px" }}
          >
            {item.title}
          </span>
        </div>

        {/* Vertical Divider */}
        <div className="h-8 w-px bg-[#27A8A3]/40 mx-2"></div>
      </div>
    );
  })}
    </Marquee>
    </section>
  );
}