
"use client";
import React from 'react'
import { FaGlobe, FaSyncAlt, FaAward,FaChartLine, FaProjectDiagram, FaCalendarAlt, FaMapMarkedAlt, FaIndustry } from "react-icons/fa";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";


import Image from "next/image";

import certificationImg from '../../../public/Images/CertificationImg.jpg'

function Certification() {
    const isoFeatures = [
        {
          icon: <FaGlobe/>,
          title: "International Standards",
          desc: "Products and services that meet the highest global benchmarks.",
        },
        {
          icon: <FaSyncAlt/>,
          title: "Continuous Improvement",
          desc: "A culture of ongoing refinement embedded in every process.",
        },
        {
          icon: <FaAward/>,
          title: "Verified Excellence",
          desc: "Independently audited and certified for consistent performance.",
        },
        {
            icon: <FaChartLine/>,
            title: "Commitment to Improvement",
            desc: "We continuously enhance our processes to deliver better efficiency and performance.",
          },
      ];
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
   
  return (
    <>
    <section className='certification-cf  lg:py-20'>
 
    <div className="container flex justify-center flex-col gap-7">
    
    <div className='trusted-badge mx-auto'>
    <div className="dot"></div>
    <p>OUR CERTIFICATION</p>
    </div>
    
    <div className='grid grid-cols-1 lg:grid-cols-2'>
    
   <div className="cert-left">

        {/* background layers */}
        <div className="cert-grid" />
        <div className="cert-orb cert-orb-1" />
        <div className="cert-orb cert-orb-2" />
        <div className="cert-orb cert-orb-3" />

        {/* floating image with all animations */}
        <div className="img-float-wrapper">
          <div className="pulse-ring-1" />
          <div className="pulse-ring-2" />
          <div className="pulse-ring-3" />
          <div className="rotate-border">
            <div className="rotate-border-inner" />
          </div>

          <div className="cert-img-wrap">
            <div className="cert-scan-line" />
            <div className="cert-corner cert-corner-tl" />
            <div className="cert-corner cert-corner-tr" />
            <div className="cert-corner cert-corner-bl" />
            <div className="cert-corner cert-corner-br" />

            <div className="cert-img-wrap relative">
            <Image src={certificationImg} alt="ISO 9001:2015 Certificate"
            fill style={{ objectFit: "cover", objectPosition: "top center", }}priority /></div>

            <div className="cert-img-overlay" />
            {/* <div className="cert-num-badge">CERT NO: ABMS134016</div> */}
          </div>
        </div>

        {/* verified badge */}
        <div className="verified-badge">
          <div className="badge-dot" />
          <span className="badge-label">Verified Certificate</span>
        </div>

        {/* chips */}
        <div className="chips-row">
          <span className="chip chip-1">ISO 9001:2015</span>
          <span className="chip chip-2">BMQR</span>
          <span className="chip chip-3">AIAO-BAR</span>
        </div>
    </div>
   
   <div className='flex flex-col gap-4'>

    <div className='flex flex-col gap-3 text-center lg:text-left'>
    <h2 className='text-4xl font-bold mt-3'>Trusted Quality <span className='text-[#27A8A3]'>Management</span></h2>
    </div>

    <p className='text-gray-700 para-content text-center lg:text-left'>We are proud to hold ISO 9001:2015 certification — a testament to our unwavering  commitment to quality, safety, and continuous improvement in  every service we deliver.</p>

    <div className='grid grid-cols-1 lg:grid-cols-2  gap-7 mt-2'>
    {
        isoFeatures.map((x,y)=>{
            return(
                <div className='certification-card flex flex-col gap-2'>
                
                <div className='icon-parent'>
                <span className='text-2xl'>{x.icon}</span>
                </div>

                <h6 className='mt-3 text-1xl'>{x.title}</h6>
                <p className='text-sm text-gray-700'>{x.desc}</p>
                </div>
            )
        })
    }
    </div>
   
    </div>

    </div>

    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">

      {statsData.map((item, index) => {
  const Icon = item.icon;

  return (
    <div key={index} className="text-center  value-card flex flex-col gap-2">

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
    </section>



    </>
  )
}

export default Certification