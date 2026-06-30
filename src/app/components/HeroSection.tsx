"use client"

import React from 'react'
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { TypeAnimation } from "react-type-animation";
import ContactBtn from './Buttons/ContactBtn';
import CallUsBtn from './Buttons/CallUsBtn';
import Image from 'next/image'
import img1 from '../../../public/Images/Herosecimages/Hero-sec-img-1.png'

function HeroSection() {
  
  return (
   <>
   
   <section className='hero-sec-cf'>
   <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10">

    {/* Left Side Content */}
    <div className="hero-content flex flex-col gap-3 justify-center">
    
    <div className='trusted-badge'>
    <div className="dot"></div>
    <p>India's Most Trusted Commercial Kitchen Experts</p>
    </div>
    
    <div className='flex flex-col gap-4'>
    <h1 className=' text-3xl lg:text-6xl leading-normal font-semibold'>Building <span className='special-text'>Professional Kitchens</span> That <br /> Power Business.</h1>
    <h2 className="hero-heading italic text-2xl">
    We Deliver{" "}
    <TypeAnimation
    sequence={[
      "Commercial Kitchen Solutions.",
      2000,
      "Restaurant Kitchen Experts.",
      2000,
      "Hotel Kitchen Specialists.",
      2000,
      "Turnkey Kitchen Projects.",
      2000,
    ]}
    speed={50}
    repeat={Infinity}
    className="animation-text"/>
   </h2>
    <div className='flex flex-col gap-2'>
    <p className='text-gray-700 para-content'>With years of expertise in commercial kitchen equipment manufacturing, we help businesses create efficient, hygienic, and future-ready kitchen environments.</p>
    <p className='text-gray-700 para-content'>Delivering innovative commercial kitchen solutions designed for performance, efficiency, and long-term reliability.</p>
    </div>
    </div>

    <div className='flex items-center gap-5' style={{marginTop:"8px"}}>
    <ContactBtn/>
    <CallUsBtn/>
    </div>

    </div>

   {/* Right Side Image Section */}
   <div className="relative w-full flex justify-center items-center">

  {/* Base Image */}
  <Image
    alt="hero-sec-image"
    src={img1}
    className="hero-img rounded-xl"
  />

  {/* TOP LEFT */}
  <div className="absolute top-5 left-5 sm:left-5 left-2">
    <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-xl float-animation">
      <p className="text-xs sm:text-sm font-semibold">
        Commercial Kitchen <br /> Equipments.
      </p>
    </div>
  </div>

  {/* RIGHT TOP */}
  <div className="absolute top-5 right-5 sm:right-5 right-2">
    <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-xl float-animation">
      <p className="text-xs sm:text-sm font-semibold">
        Stainless Steel <br /> Grade.
      </p>
    </div>
  </div>

  {/* BOTTOM LEFT */}
  <div className="absolute bottom-5 left-5 sm:left-5 left-2">
    <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-xl float-animation">
      <p className="text-xs sm:text-sm font-semibold">
        Industrial Kitchen <br /> Tools.
      </p>
    </div>
  </div>

  {/* CENTER */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-xl float-animation">
      <p className="text-xs sm:text-sm font-semibold text-center">
        Durability, Hygiene <br /> and High Performance <br /> Stainless Steel Materials.
      </p>
    </div>
  </div>

  {/* BOTTOM RIGHT */}
  <div className="absolute bottom-5 right-5 sm:right-5 right-2">
    <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-xl float-animation">
      <p className="text-xs sm:text-sm font-semibold">
        High-quality Kitchen <br /> Equipments.
      </p>
    </div>
  </div>

   </div>

   </div>
   </section>



   </>
  )
}

export default HeroSection