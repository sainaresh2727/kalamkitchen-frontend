import React from 'react'
import ContactBtn from '../../components/Buttons/ContactBtn'
import CallUsBtn from '../../components/Buttons/CallUsBtn'
import Image from 'next/image'
import heroCardImg from '../../../../public/Images/andamon-herocard-image.png'
import IndustryMarquee from '../../components/Marquee'
import { FaFireBurner } from "react-icons/fa6";
import { PiOven, PiCookingPot, PiBowlFood } from "react-icons/pi";
import { MdOutlineOutdoorGrill } from "react-icons/md";
import { LuSoup } from "react-icons/lu";
import { IoMdArrowDropright } from "react-icons/io";
import SetupServices from './SetupServices'
import {
    FaIndustry,
    FaBoxesStacked,
  } from "react-icons/fa6";

function page() {
    const electricKitchenEquipment = [
        {
          title: "Electric Cooking Ranges",
          para: "High-performance electric cooking ranges designed for commercial kitchens, delivering precise temperature control, energy efficiency, and reliable cooking for hotels, restaurants, cafés, and catering businesses.",
          icon: <PiOven/>,
        },
        {
          title: "Commercial Induction Stoves",
          para: "Advanced commercial induction stoves provide rapid heating, lower energy consumption, enhanced safety, and consistent performance for professional food service operations.",
          icon: <FaFireBurner/>,
        },
        {
          title: "Electric Steamers",
          para: "Premium electric steamers ensure healthy, uniform, and efficient cooking while preserving nutrients, making them ideal for restaurants, hotels, cloud kitchens, and institutional catering.",
          icon: <PiCookingPot/>,
        },
        {
          title: "Griddles and Fryers",
          para: "Commercial griddles and fryers engineered for fast, even cooking with superior heat distribution, high productivity, and durable stainless steel construction.",
          icon: <MdOutlineOutdoorGrill/>,
        },
        {
          title: "Food Preparation Equipment",
          para: "Professional food preparation equipment designed to simplify slicing, chopping, mixing, and processing while improving kitchen productivity and food consistency.",
          icon: <PiBowlFood/>,
        },
        {
          title: "Food Holding Systems",
          para: "Commercial food holding systems maintain optimal serving temperatures, preserve food quality, and support efficient service in restaurants, hotels, buffets, and catering operations.",
          icon: <LuSoup/>,
        },
      ];
      const industrialKitchenFeatures = [
        {
          title: "Industrial Kitchen Equipment",
          para:["Our industrial kitchen equipment Andaman is designed to handle heavy-duty cooking requirements while maintaining operational efficiency and reliability.","We supply premium industrial kitchen equipment Andaman for factories, educational institutions, hospitals, government facilities, and large-scale catering operations.","We provide high-quality industrial kitchen equipment Andaman designed for factories, hospitals, institutions, commercial kitchens, and large-scale food production facilities."],
          icon: <FaIndustry/>,
        },
        {
          title: "Bulk Kitchen Equipment Suppliers",
          para: ["As experienced bulk kitchen equipment suppliers Andaman, we provide large-scale kitchen equipment solutions for hotels, resorts, institutions, and commercial food facilities.","Our bulk electric kitchen equipment Andaman solutions are ideal for organizations requiring multiple cooking stations and large-capacity kitchen operations. Businesses trust us as leading bulk kitchen equipment suppliers Andaman for quality products and competitive pricing.","We also specialize in supplying bulk electric kitchen equipment Andaman for commercial and industrial kitchen projects throughout the region."],
          icon: <FaBoxesStacked/>,
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
    <p className='uppercase'>Port Blair, Andaman & Nicobar Islands</p>
    </div>

    <div className='flex flex-col gap-3'>
    <h1 className='text-3xl lg:text-5xl leading-normal font-bold'>Trusted Commercial <br /> Kitchen Equipment <br /> In <span className='special-text'>Andaman</span></h1>
    <div className='flex flex-col gap-2'>
    <p className='text-gray-700 para-content'>Kalam Kitchen Equipments is a leading provider of commercial kitchen equipment Andaman, offering complete kitchen design, manufacturing, supply, and installation services for hotels, restaurants, resorts, cloud kitchens, industrial canteens, and catering businesses. With years of industry experience, Kalam Kitchen Equipments delivers high-quality electric kitchen equipment Andaman, induction kitchen equipment Andaman, and customized commercial kitchen solutions that meet modern food service requirements.</p>
    <p className='text-gray-700 para-content'>As a trusted electric kitchen equipment supplier Andaman, Kalam Kitchen Equipments specializes in energy-efficient cooking systems, advanced induction technology, and turnkey kitchen projects across Port Blair and the Andaman & Nicobar Islands. Whether you require hotel kitchen equipment Andaman, restaurant kitchen equipment Port Blair, or a complete electric kitchen setup Andaman, our expert team ensures reliable solutions, professional installation, and long-term support..</p>
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
      In Andaman
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
      Trusted Commercial Kitchen Equipment Solutions In Andaman
    </p>
  </div>
    </div>
    
    
    </div>

    </div>

    </div>
    </section>

    <IndustryMarquee/>

    <section className='lg:pt-20 py-5'>
    <div className="container flex flex-col items-center gap-4">
    
    <div className='trusted-badge mx-auto'>
    <div className="dot"></div>
    <p className='uppercase tracking-wider'>Electric Equipment</p>
    </div>

    <div className='flex flex-col gap-3'>
    <h2 className='text-center text-3xl lg:text-5xl leading-normal font-semibold'>Electric Kitchen Equipment for <br /> <span className='special-text'>Modern Commercial</span> Kitchens</h2>
    <p className='text-gray-700 para-content w-full lg:w-[800px] text-center mx-auto'>We offer premium electric kitchen equipment Andaman designed for restaurants, hotels, resorts, bakeries, institutional kitchens, and catering facilities. Our solutions improve operational efficiency while reducing fuel costs.</p>
    <p  className='text-gray-700 para-content w-full lg:w-[800px] text-center mx-auto'>Businesses seeking reliable electric kitchen equipment Andaman Nicobar can trust our high-quality products and professional installation services. We are also recognized as a trusted electric kitchen equipment supplier Andaman for commercial kitchen projects of every scale.</p>
    <p className='text-gray-700 para-content w-full lg:w-[800px] text-center mx-auto font-bold'>Our comprehensive range of electric kitchen equipment Port Blair includes:</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-3">
  {electricKitchenEquipment.map((x, i) => {


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

     <h2 className='secondary-font font-bold tracking-wider'>Advanced Induction Kitchen Equipments In Andaman</h2>
    <p className='para-content'>Modern food businesses are rapidly adopting induction kitchen equipment Andaman to improve safety, cooking speed, and energy efficiency. Our advanced induction cooking equipment Andaman is suitable for restaurants, hotels, cloud kitchens, and industrial kitchens.</p>
    <p className='para-content'>We supply premium induction kitchen equipment Port Blair Andaman that delivers precise temperature control and consistent cooking performance. Businesses looking for innovative kitchen solutions can benefit from our energy-efficient induction systems.</p>
    <ul className='flex flex-col gap-3'>
   {
     [
        "Advanced induction technology for faster and precise cooking",
        "Energy-efficient design that reduces electricity consumption",
        "Instant and uniform heat distribution for consistent results",
        "Premium stainless steel construction for long-lasting durability",
        
      ].map((x,y)=>{
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
    <p className='tracking-wider text-[14px] sf-pill'>MOST LATEST</p>
    </div>
   <div className='flex flex-col gap-3'>
   <h2 className='secondary-font font-bold tracking-wider'>Commercial Induction Stoves for Restaurants</h2>
   <p className='para-content text-gray-600'>If you need an efficient induction stove for restaurant Andaman, we offer commercial-grade induction solutions designed for high-volume cooking environments.</p>
   <p className='para-content text-gray-600'>Every induction stove for restaurant Andaman is engineered to deliver exceptional performance while reducing operational costs. Our commercial induction stove Andaman solutions are trusted by hospitality businesses throughout the islands.</p>
   <ul className='flex flex-col gap-3'>
   {
     [
        "High-performance induction cooking for busy restaurant kitchens",
        "Energy-efficient technology reduces electricity and operating costs",
        "Rapid heating with precise temperature control for faster cooking",
        "Uniform heat distribution ensures consistent food quality every time",
        
      ].map((x,y)=>{
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

 

    <section className='lg:py-10'>
    <div className="container flex flex-col gap-5 items-center">
    
    <div className='trusted-badge mx-auto'>
    <div className="dot"></div>
    <p className='tracking-wider'>HOSPITALITY SOLUTIONS</p>
    </div>

    <div className='flex flex-col gap-3 items-center'>
    <h2 className='text-center text-3xl lg:text-5xl leading-normal font-semibold'>Hotel & Restaurant Kitchen
    Equipment In <span className='special-text'> <br /> Port Blair</span></h2>
    
    </div>

    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4'>

     <div className='special-card px-12 py-10'>

    <div>
    <p className='tracking-wider text-[14px] sp-pill'>COMPLETE SETUP</p>
    </div>

     <h2 className='secondary-font font-bold tracking-wider'>HOTEL KITCHEN  Equipments In Andaman</h2>
    <p className='para-content'>Complete hotel kitchen equipment solutions for hospitality businesses seeking durable, efficient kitchen systems — built for luxury resorts and local restaurants alike.</p>
    
    <ul className='flex flex-col gap-3'>
   {
     [
        "Cooking equipment & preparation stations",
        "Storage systems and cleaning solutions",
        "Tailored for resorts and restaurants of any scale",
        "Professional installation included",
        
      ].map((x,y)=>{
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
    <p className='tracking-wider text-[14px] sf-pill'>TRUSTED SUPPLIER</p>
    </div>
   <div className='flex flex-col gap-3'>
   <h2 className='secondary-font font-bold tracking-wider'>Restaurant Kitchen Equipment Port Blair</h2>
   <p className='para-content text-gray-600'>Our extensive collection covers everything from cooking equipment to storage — designed for the unique demands of island hospitality businesses.</p>
   
   <ul className='flex flex-col gap-3'>
   {
     [
      "Cooking & preparation stations",
  "Storage and cleaning systems",
  "Durable, efficient kitchen systems",
  "Trusted across Port Blair & the Andaman Islands",
        
      ].map((x,y)=>{
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

    <SetupServices/>

    <section className='lg:py-20'>
    <div className="container flex flex-col gap-8 items-center">
  
    <div className='trusted-badge mx-auto'>
    <div className="dot"></div>
    <p className='tracking-wider'>LARGE SCALE SUPPLY</p>
    </div>
  
    <div className='flex flex-col gap-3 items-center'>
    <h1 className='text-3xl lg:text-5xl leading-normal font-bold text-center'><span className='special-text'>Industrial & Bulk </span>Kitchen <br /> Equipment Andaman</h1>
   </div>


   <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
   {industrialKitchenFeatures.map((x, i) => {


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

    <div className='flex flex-col gap-3 mt-3'>
    {
        x.para.map((x,y)=>{
            return(
                <p key={x} className='para-content text-gray-700 flex items-center justify-center gap-2'> <span><IoMdArrowDropright className='text-2xl text-[#27A8A3]'/></span> {x}</p>
            )
        })
    }
    </div>
    
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