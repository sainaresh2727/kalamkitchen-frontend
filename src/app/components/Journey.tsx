"use client"

import React from 'react'
import { FaProjectDiagram, FaCalendarAlt, FaMapMarkedAlt, FaIndustry } from "react-icons/fa";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { CgSearchFound } from "react-icons/cg";
import { FaRegLightbulb,FaChartLine  } from "react-icons/fa6";
import { FaAward } from "react-icons/fa";

function Journey() {
    const statsData = [
        { icon: FaProjectDiagram, value: 2000, suffix: "+", label: "Projects" },
         { icon: FaCalendarAlt, value: 9, suffix: "+", label: "Years Exp" },
         { icon: FaMapMarkedAlt, value: 1, suffix: "", label: "Pan India Presence" },
         { icon: FaIndustry, value: 100, suffix: "%", label: "Premium SS Mfg" },
         ];
    const { ref, inView } = useInView({
               triggerOnce: true,
               threshold: 0.3,
    });

    const journeySteps = [
        {
          id: "01",
          title: "Founded",
          desc: "Started with a vision to transform kitchen storage and commercial kitchen solutions.",
          icon:<CgSearchFound/>,
        },
        {
          id: "02",
          title: "Innovation",
          desc: "Introduced standout products like Rava Bins, Atta Bins, and Pallets.",
          icon:<FaRegLightbulb />,
        },
        {
          id: "03",
          title: "Expansion",
          desc: "Expanded our product range and refined manufacturing standards.",
          icon: <FaChartLine />,
        },
        {
          id: "04",
          title: "Today",
          desc: "A trusted commercial kitchen equipment supplier across Tamil Nadu.",
          icon: <FaAward />,
        },
      ];

  return (
   <>
   <section className='lg:py-20'>
   
   <div className="container grid grid-cols-1 lg:grid-cols-2 gap-6">
   
   <div className='flex flex-col gap-3'>
    <div className='trusted-badge'>
    <div className="dot"></div>
    <p>OUR JOURNEY</p>
    </div>
    <h2 className='font-bold text-3xl lg:text-5xl leading-normal'>From Humble Beginnings to <span className='special-text'>Trusted Names.</span></h2>
    <p className='text-gray-700 para-content'>Kalam Kitchen was founded with a vision to transform kitchen storage and commercial kitchen solutions. From humble beginnings, we have grown into one of the dependable Kitchen Equipment Suppliers in Tamil Nadu, recognized for innovative products such as Rava Bins, Atta Bins, and Pallets.</p>
    <p className='text-gray-700 para-content'>Over the years, we have continuously evolved by expanding our product range, improving manufacturing standards, and refining our solutions to meet modern commercial kitchen requirements. Our journey reflects commitment, innovation, and a strong dedication to delivering excellence in every product we manufacture.</p>
    
    <div>
    
    </div>

   </div>

   <div className='grid grid-cols-2 gap-5'  ref={ref}>
   {statsData.map((item, index) => {
  const Icon = item.icon;

  return (
    <div key={index} className="text-center  value-card flex flex-col gap-2 justify-center">

      {/* ICON */}
      <Icon className="text-3xl mx-auto mb-2 text-[#27A8A3]" />

      {/* NUMBER */}
      <h2 className="text-2xl font-bold">
        {inView ? (
          <CountUp
            end={item.value}
            duration={5.1}
            suffix={item.suffix}
          />
        ) : (
          0
        )}
      </h2>

      {/* LABEL */}
      <p className="text-sm text-gray-600 mt-1">
        {item.label}
      </p>

    </div>
  );
})}
   </div>

   

   </div>

    <div className="container">
    <div className="relative mt-16 flex justify-center">
  {/* Line */}
  <div className="absolute top-6 left-0 w-full h-[2px] bg-[#BDE9E6]"></div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative">
    {journeySteps.map((step) => (
      <div key={step.id} className="relative">
        
        {/* Circle */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#27A8A3] to-[#1E8E8A] flex items-center justify-center text-white text-lg shadow-lg">
          {step.icon}
        </div>

        {/* Number */}
        <p className="text-[#27A8A3] text-xs font-semibold mt-4 tracking-widest">
          {step.id}
        </p>

        {/* Title */}
        <h4 className="font-bold text-xl mt-2">
          {step.title}
        </h4>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-7 mt-3">
          {step.desc}
        </p>

      </div>
    ))}
  </div>
    </div>
    </div>

   </section>
   </>
  )
}

export default Journey