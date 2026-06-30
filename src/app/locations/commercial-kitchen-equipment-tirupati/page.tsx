import React from 'react'
import ContactBtn from '../../components/Buttons/ContactBtn'
import CallUsBtn from '../../components/Buttons/CallUsBtn'
import heroCardImg from '../../../../public/Images/tirupathi-herocard-image.png'
import Image from 'next/image'
import IndustryMarquee from '../../components/Marquee'
import { FaFireBurner, FaWind } from "react-icons/fa6";
import { IoMdArrowDropright } from "react-icons/io";

import {
  MdOutlineOutdoorGrill,
  MdOutlineTableRestaurant,
  MdOutlineSoupKitchen,
} from "react-icons/md";

import {
  PiOven,
  PiCookingPot,
  PiBowlFood,
} from "react-icons/pi";
import {
    FaRegMap,
    FaAward,
    FaBolt,
    FaTools,
    FaHandshake,
  } from "react-icons/fa";
  import { TbAdjustmentsCog } from "react-icons/tb";

function page() {
    const kitchenEquipmentIcons = [
        {
          title: "Commercial Induction Stoves",
          para: "Energy-efficient induction stoves designed for fast, safe, and high-performance commercial cooking.",
          icon: <FaFireBurner/>,
        },
        {
          title: "Electric Cooking Ranges",
          para: "Reliable electric cooking ranges that provide consistent heat distribution for professional kitchens.",
          icon: <PiOven/>,
        },
        {
          title: "Steam Cooking Equipment",
          para: "Advanced steam cooking equipment for healthy, uniform, and energy-efficient food preparation.",
          icon: <PiCookingPot/>,
        },
        {
          title: "Hot Bain Maries",
          para: "Keep food warm and fresh for extended periods with premium stainless steel hot bain maries.",
          icon: <MdOutlineSoupKitchen/>,
        },
        {
          title: "Griddles and Fryers",
          para: "Commercial griddles and fryers engineered for fast cooking, even heating, and high-volume food service.",
          icon: <MdOutlineOutdoorGrill/>,
        },
        {
          title: "Work Tables and Sinks",
          para: "Durable stainless steel work tables and sinks designed for hygienic food preparation and cleaning.",
          icon: <MdOutlineTableRestaurant/>,
        },
        {
          title: "Exhaust and Ventilation Systems",
          para: "Efficient exhaust and ventilation systems that improve air quality and maintain a safe kitchen environment.",
          icon: <FaWind/>,
        },
        {
          title: "Food Preparation Equipment",
          para: "Professional food preparation equipment that increases productivity while delivering consistent results.",
          icon: <PiBowlFood/>,
        },
      ];
     const whyChooseUs = [
        {
          title: "Complete Kitchen Planning & Design",
          para: "We analyze your kitchen space, workflow, and menu requirements before creating a fully customized end-to-end commercial kitchen solution.",
          icon: <FaRegMap/>,
        },
        {
          title: "Premium-Quality Equipment",
          para: "Every product meets industry standards for performance, durability, and long-lasting reliability in commercial kitchens.",
          icon: <FaAward/>,
        },
        {
          title: "Energy-Efficient Solutions",
          para: "Our induction and electric kitchen equipment reduces operating costs while delivering high productivity and consistent performance.",
          icon: <FaBolt/>,
        },
        {
          title: "Customized for Your Business",
          para: "From restaurants and cafés to hotels and cloud kitchens, we tailor every solution to your business needs and budget.",
          icon: <TbAdjustmentsCog/>,
        },
        {
          title: "Professional Installation",
          para: "Our experienced technicians provide safe and reliable installation services across Tirupati and Andhra Pradesh.",
          icon: <FaTools/>,
        },
        {
          title: "After-Sales Support",
          para: "Dedicated maintenance and technical support ensure your commercial kitchen equipment performs efficiently for years.",
          icon: <FaHandshake/>,
        },
      ];
  return (
    <>
    <section className='lg:py-20'>
    <div className="container">
    
    <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-20 gap-10'>
    
    <div className='flex flex-col gap-4 justify-center'>
   
    <div className='trusted-badge'>
    <div className="dot"></div>
    <p>TIRUPATI, ANDHRA PRADESH</p>
    </div>

    <div className='flex flex-col gap-3'>
    <h1 className='text-3xl lg:text-5xl leading-normal font-bold'>Premium Commercial <br /> Kitchen Equipment <br /> In <span className='special-text'>Tirupati</span></h1>
    <div className='flex flex-col gap-2'>
    <p className='text-gray-700 para-content'>Kalam Kitchen Equipments is a trusted name for commercial kitchen equipment Tirupati , providing high-quality kitchen solutions for hotels, restaurants, canteens, bakeries, cloud kitchens, and catering businesses. We specialize in designing, manufacturing, and supplying advanced electric kitchen equipment Tirupati businesses can rely on for efficient and cost-effective operations.</p>
    <p className='text-gray-700 para-content'>Whether you are starting a new restaurant or upgrading your existing kitchen, our team delivers complete solutions with the latest induction kitchen equipment Tirupati and energy-efficient cooking systems.</p>
    </div>
    </div>

    <div className='grid grid-cols-2 lg:gap-12 gap-5'>
    <ContactBtn/>
    <CallUsBtn/>
    </div>

    </div>

    <div className='hero-img relative'>
    
    <Image src={heroCardImg} alt='tirupathi-hero-card-img' className='float-animation'/>
    
    <div className="absolute bottom-2 right-2 lg:bottom-12 lg:right-5">
    <div className="chat-card
    w-[120px] h-[80px]
    sm:w-[140px] sm:h-[100px]
    md:w-[160px] md:h-[120px]
    lg:w-[180px] lg:h-[130px]
    p-2 sm:p-3 lg:p-4
    rounded-2xl
    bg-white/10 backdrop-blur-xl
    border border-white/20 shadow-xl">

    <p className="text-white text-[8px] sm:text-[10px] lg:text-[12px]
      leading-3 sm:leading-4 lg:leading-5 secondary-font">
      Advanced Commercial
      <br />
      Kitchen Equipment
      <br />
      In Tirupati
    </p>
    </div>
    </div>

    <div className="absolute top-14 left-2 sm:top-20 sm:left-4 lg:top-28 lg:left-5">
  <div className="chat-card
    w-[120px] h-[100px]
    sm:w-[140px] sm:h-[100px]
    md:w-[160px] md:h-[120px]
    lg:w-[180px] lg:h-[130px]
    p-2 sm:p-3 lg:p-4
    rounded-2xl
    bg-white/10 backdrop-blur-xl
    border border-white/20 shadow-xl">

    <p className="text-white text-[8px] sm:text-[10px] lg:text-[12px]
      leading-3 sm:leading-4 lg:leading-5 secondary-font">
      Trusted Commercial Kitchen Equipment Solutions In Tirupati
    </p>
  </div>
    </div>
    
    
    </div>

    </div>

    </div>
    </section>

    <IndustryMarquee/>

    <section className='lg:pt-20 py-10'>
    <div className="container flex flex-col items-center gap-4">
    
    <div className='trusted-badge mx-auto'>
    <div className="dot"></div>
    <p className='uppercase tracking-wider'>Equipment Range</p>
    </div>

    <div className='flex flex-col gap-3'>
    <h2 className='text-center text-3xl lg:text-5xl leading-normal font-semibold'>Complete Hotel & Restaurant Kitchen <br /> <span className='special-text'>Equipment In Tripati</span></h2>
    <p className='text-gray-700 para-content w-full lg:w-[800px] text-center mx-auto'>We offer a wide range of hotel kitchen equipment Tirupati businesses need to create productive commercial kitchens. From cooking stations and preparation counters to storage and washing systems, we provide end-to-end kitchen solutions.</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-3">
  {kitchenEquipmentIcons.map((x, i) => {


    return (
      <div
        key={i}
        className="group rounded-3xl border border-gray-200 bg-white p-8 transition-all duration-500 hover:-translate-y-3 hover:border-[#27A8A3] hover:border-t-4 hover:shadow-[0_20px_45px_rgba(39,168,163,0.15)]"
      >
        <div className="w-16 h-16 rounded-3xl bg-[#EEF8F7] flex items-center justify-center transition-all duration-500 group-hover:bg-[#27A8A3]">
         
        <span className="text-3xl text-[#27A8A3] transition-all duration-500 group-hover:text-white" >{x.icon}</span>
        </div>

        <h6 className="mt-6 text-[15px] font-semibold">
          {x.title}
        </h6>

        <p className="mt-3 text-gray-600 leading-7 text-[13px]">
          {x.para}
        </p>
      </div>
    );
  })}
    </div>

    </div>
    </section>

    <section className='lg:py-20'>
    <div className="container flex flex-col gap-5 items-center">
    
    <div className='trusted-badge mx-auto'>
    <div className="dot"></div>
    <p className='tracking-wider'>ADVANCED TECHNOLOGY</p>
    </div>

    <div className='flex flex-col gap-3 items-center'>
    <h2 className='text-center text-3xl lg:text-5xl leading-normal font-semibold'><span className='special-text'>Commercial &  Advanced </span><br /> Kitchen Equipments</h2>
    <p className='text-gray-700 para-content w-full lg:w-[800px] text-center mx-auto'>Experience the next generation of commercial kitchen equipment with our innovative electric and induction cooking solutions Designed for professional kitchens, our energy-efficient, stainless steel equipment delivers faster cooking, superior safety, and long-lasting performance.</p>
    </div>

    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4'>

     <div className='special-card px-12 py-10'>

    <div>
    <p className='tracking-wider text-[14px] sp-pill'>MOST POPULAR</p>
    </div>

     <h2 className='secondary-font font-bold tracking-wider'>Advanced Electrical Kitchen Equipments</h2>
    <p className='para-content'>Modern commercial kitchens are increasingly adopting electric solutions due to energy efficiency and ease of operation. Our premium electric kitchen equipment Tirupati AP range helps businesses reduce fuel costs while maintaining high productivity.</p>
    <ul className='flex flex-col gap-3'>
   {
     [  "Energy-efficient — reduces operating costs by up to 40%",
        "Fast heating with advanced induction technology",
        "Uniform heat distribution for consistent cooking",
        "Durable stainless steel construction",
        "Easy to clean and maintain",].map((x,y)=>{
        return(
            <li key={x} className='text-[13px] flex items-center gap-1'>
           <IoMdArrowDropright  className='text-2xl'/> {x}
            </li>
        )
     })
   }
    </ul>
    </div>

   <div className=' px-12 py-10 bg-white border-[1.5px] border-[#27A8A3]/15 rounded-3xl p-11 shadow-[0_2px_16px_rgba(39,168,163,0.08)] hover:shadow-[0_10px_40px_rgba(39,168,163,0.14)] transition-shadow duration-300 '>
   <div>
    <p className='tracking-wider text-[14px] sf-pill'>FAST HEATING</p>
    </div>
   <div className='flex flex-col gap-3'>
   <h2 className='secondary-font font-bold tracking-wider'>Commercial Induction Stove Solutions</h2>
   <p className='para-content text-gray-600'>Our specialized induction kitchen equipment Tirupati collection offers fast heating, precise temperature control, and enhanced safety. Choose from multiple capacities and configurations.</p>
   <ul className='flex flex-col gap-3'>
   {
     [  "Fast heating — ready in seconds, not minutes",
        "Precise temperature control for consistent results",
        "Enhanced safety — no open flame, cool surfaces",
        "Multiple capacities and configurations",
        "Minimized energy consumption",].map((x,y)=>{
        return(
            <li key={x} className='text-[13px] flex items-center gap-1'>
           <IoMdArrowDropright  className='text-2xl text-[#27A8A3]'/> {x}
            </li>
        )
     })
   }
    </ul>
   </div>
   
   </div>

   </div>
  </div>
   </section>

   <section className='lg:py-20'>
   <div className="container flex flex-col items-center gap-2">
   
   <div className='trusted-badge mx-auto'>
    <div className="dot"></div>
    <p>WHY KALAM KITCHEN</p>
    </div>

    <div className='flex flex-col gap-2'>
    <h2 className='text-center text-3xl lg:text-5xl leading-normal font-semibold'>Trusted Across <span className='special-text'>Andhra Pradesh</span></h2>
    <p className='para-content text-gray-700 w-full lg:w-[800] text-center'>As a leading supplier of commercial kitchen equipment Andhra Pradesh, we serve businesses across Tirupati and nearby regions with commitment to quality, innovation, and customer satisfaction.</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-3">
  {whyChooseUs.map((x, i) => {


    return (
      <div
        key={i}
        className="group rounded-3xl border border-gray-200 bg-white p-8 transition-all duration-500 hover:-translate-y-3 hover:border-[#27A8A3] hover:border-t-4 hover:shadow-[0_20px_45px_rgba(39,168,163,0.15)]"
      >
        <div className="w-16 h-16 rounded-3xl bg-[#EEF8F7] flex items-center justify-center transition-all duration-500 group-hover:bg-[#27A8A3]">
         
        <span className="text-3xl text-[#27A8A3] transition-all duration-500 group-hover:text-white" >{x.icon}</span>
        </div>

        <h6 className="mt-6 text-[15px] font-semibold">
          {x.title}
        </h6>

        <p className="mt-3 text-gray-600 leading-7 text-[13px]">
          {x.para}
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

export default page