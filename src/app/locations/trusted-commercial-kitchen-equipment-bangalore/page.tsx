import React from 'react'

import Image from 'next/image'
import IndustryMarquee from '../../components/Marquee'
import { FaFireBurner, FaWind } from "react-icons/fa6";
import { IoMdArrowDropright } from "react-icons/io";
import ContactBtn from '../../components/Buttons/ContactBtn';
import CallUsBtn from '../../components/Buttons/CallUsBtn';
import heroCardImg from '../../../../public/Images/bangalorebranch.png'
import { FiPackage, FiZap } from "react-icons/fi";
import {
    GiCookingPot,
    GiElectric,
    GiPressureCooker,
    GiMeal,
    GiKnifeFork,
    GiHotMeal,
  } from "react-icons/gi";
  import {
    FiAward,
    FiStar,
    FiPower,
    FiTool,
    FiSettings,
    FiHeadphones,
    FiDollarSign,
    FiUsers,
    FiMapPin,
  } from "react-icons/fi";
import SetupServices from './SetupServices';

function page() {
    const electricCookingEquipment = [
        {
          title: "Electric Cooking Ranges",
          icon: <GiCookingPot/>,
          para: "Heavy-duty electric cooking ranges built for hotels, restaurants, and commercial kitchens. Designed for energy-efficient performance, uniform heating, and reliable daily cooking operations.",
        },
        {
          title: "Commercial Induction Stoves",
          icon: <GiElectric/>,
          para: "Commercial induction stoves provide fast heating, precise temperature control, and excellent energy efficiency. Perfect for modern professional kitchens with safe and easy-to-clean operation.",
        },
        {
          title: "Electric Steamers",
          icon: <GiPressureCooker/>,
          para: "Commercial electric steamers deliver healthy, uniform cooking while preserving nutrients and flavor. Ideal for hotels, canteens, catering kitchens, and bulk food preparation.",
        },
        {
          title: "Griddles & Fryers",
          icon: <GiMeal/>,
          para: "Professional griddles and fryers offer quick heat recovery, even cooking, and durable performance for grilling, frying, and high-volume commercial food preparation.",
        },
        {
          title: "Food Preparation Equipment",
          icon: <GiKnifeFork/>,
          para: "Commercial food preparation equipment improves kitchen efficiency by simplifying chopping, slicing, mixing, and processing tasks with reliable heavy-duty performance.",
        },
        {
          title: "Hot Holding Equipment",
          icon: <GiHotMeal/>,
          para: "Commercial hot holding equipment keeps food fresh at the ideal serving temperature, making it perfect for buffets, restaurants, hotels, and catering businesses.",
        },
      ];

    const bulkServices = [
        {
          icon: <FiPackage/>,
          title: "Bulk Kitchen Equipment Supply",
          description:
            "Competitive pricing and project-based solutions for large-scale kitchen installations across hotels, restaurant chains, food courts, educational institutions, and industrial canteens.",
        },
        {
          icon: <FiZap/>,
          title: "Bulk Electric Kitchen Equipment",
          description:
            "Ideal for organizations requiring multiple cooking stations and high-capacity kitchen operations with energy-efficient commercial systems.",
        },
      ];

      
      
      const whyChooseUs = [
        {
            icon: <FiAward/>,
            title: "Trusted electric kitchen equipment supplier Bangalore",
            description:
              "Delivering reliable commercial kitchen equipment with a strong focus on quality, durability, and customer satisfaction.",
          },
          {
            icon: <FiStar/>,
            title: "Premium electric cooking equipment Bangalore",
            description:
              "Offering high-performance electric cooking solutions designed for hotels, restaurants, and commercial kitchens.",
          },
          {
            icon: <FiPower/>,
            title: "Advanced induction cooking equipment Bangalore",
            description:
              "Energy-efficient induction systems that provide faster cooking, precise temperature control, and reduced operating costs.",
          },
          {
            icon: <FiTool/>,
            title: "Professional electric kitchen equipment Bengaluru installations",
            description:
              "Expert installation services ensuring every kitchen is set up safely, efficiently, and ready for operation.",
          },
          {
            icon: <FiSettings/>,
            title: "Customized cloud kitchen and restaurant setups",
            description:
              "Tailor-made kitchen layouts and equipment solutions designed to match your business requirements and workflow.",
          },
          {
            icon: <FiHeadphones/>,
            title: "Reliable after-sales service and technical support",
            description:
              "Dedicated maintenance and technical assistance to keep your commercial kitchen operating without interruptions.",
          },
          {
            icon: <FiDollarSign/>,
            title: "Affordable solutions for startups and established businesses",
            description:
              "Cost-effective kitchen equipment packages suitable for new ventures as well as expanding businesses.",
          },
          {
            icon: <FiUsers/>,
            title: "Experienced commercial kitchen design and installation team",
            description:
              "Skilled professionals providing end-to-end planning, design, installation, and project execution.",
          },
          {
            icon: <FiMapPin/>,
            title: "Commercial Kitchen Solutions Across Karnataka",
            description:
              "Serving businesses across Karnataka with complete commercial kitchen equipment, installation, and support services.",
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
    <p>BANGALORE,KARNATAKA</p>
    </div>

    <div className='flex flex-col gap-3'>
    <h1 className='text-3xl lg:text-5xl leading-normal font-bold'>Trusted Commercial <br /> Kitchen Equipment <br /> In <span className='special-text'>Bangalore</span></h1>
    <div className='flex flex-col gap-2'>
    <p className='text-gray-700 para-content'>Kalam Kitchen Equipments is a leading provider of commercial kitchen equipment Bangalore solutions for hotels, restaurants, cloud kitchens, bakeries, catering businesses, and institutional kitchens. We offer complete commercial kitchen design, supply, installation, and maintenance services with advanced electric and induction cooking systems.</p>
    <p className='text-gray-700 para-content'>As a trusted name in commercial kitchen equipment Bangalore, Kalam Kitchen Equipments helps food businesses improve efficiency, reduce operational costs, and create modern cooking environments. Our expertise also extends across commercial kitchen equipment Karnataka, serving businesses throughout the state with high-quality kitchen solutions.</p>
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
      In Bangalore
    </p>
    </div>
    </div>

    <div className="absolute top-14 left-2 sm:top-20 sm:left-4 lg:top-40 lg:left-5">
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
      Trusted Commercial Kitchen Equipment Solutions In Bangalore
    </p>
  </div>
    </div>
    
    
    </div>

    </div>

    </div>
    </section>

    <IndustryMarquee/>

    <section className='lg:pt-20 py-10'>
    <div className="flex flex-col items-center gap-4 container">
    
    <div className='trusted-badge mx-auto'>
    <div className="dot"></div>
    <p className='uppercase tracking-wider'>Electric EQUIPMENT</p>
    </div>

    <div className='flex flex-col gap-3'>
    <h2 className='text-center text-3xl lg:text-5xl leading-normal font-semibold'>Complete Electric Kitchen <br /> <span className='special-text'>Equipment For Commercial Kitchens</span></h2>
    <p className='text-gray-700 para-content w-full lg:w-[800px] text-center mx-auto'>At Kalam Kitchen Equipments, we offer a wide range of electric kitchen equipment Bangalore designed for hotels, restaurants, bakeries, canteens, and institutional kitchens. Our energy-efficient systems help businesses transition from traditional fuel-based cooking to modern electric solutions.</p>
    <p className='text-gray-700 para-content w-full lg:w-[800px] text-center mx-auto'>Businesses seeking high-quality electric kitchen equipment Bengaluru can rely on the durable and performance-driven solutions provided by Kalam Kitchen Equipments. We are also recognized as a trusted electric kitchen equipment supplier Bangalore for commercial projects of all sizes.</p>
    <p className='text-gray-700 para-content w-full lg:w-[800px] text-center mx-auto'>Our premium electric kitchen equipment Bangalore Karnataka range includes:</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-3">
   {electricCookingEquipment.map((x, i) => {
 

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

    <section className='lg:py-20 py-10 flex flex-col items-center gap-5 container'>

    <div className='trusted-badge mx-auto'>
    <div className="dot"></div>
    <p className='tracking-wider'>INDUCTION TECHNOLOGY</p>
    </div>

    <div className='flex flex-col gap-3 items-center'>
    <h2 className='text-center text-3xl lg:text-5xl leading-normal font-semibold'><span className='special-text'>Advanced Induction </span><br /> Kitchen Equipments In Bangalore</h2>
    <p className='text-gray-700 para-content w-full lg:w-[800px] text-center mx-auto'>Experience the next generation of commercial kitchen equipment with our innovative induction cooking solutions Designed for professional kitchens, our energy-efficient, stainless steel equipment delivers faster cooking, superior safety, and long-lasting performance.</p>
    </div>

    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4'>

     <div className='special-card px-12 py-10'>

    <div>
    <p className='tracking-wider text-[14px] sp-pill'>MOST ADVANCED</p>
    </div>

     <h2 className='secondary-font font-bold tracking-wider'>Induction Kitchen Equipment Bangalore</h2>
    <p className='para-content'>Modern commercial kitchens are rapidly adopting induction kitchen equipment Bangalore for its safety, speed, and energy efficiency. Kalam Kitchen Equipments supplies advanced induction cooking equipment Bangalore suitable for restaurants, hotels, and cloud kitchens.</p>
    <p className='para-content'>Our commercial-grade induction kitchen equipment Bangalore helps reduce cooking time while providing precise temperature control. Whether you need a single cooking station or a complete induction kitchen, Kalam Kitchen Equipments offers customized solutions tailored to your business requirements.</p>
    <ul className='flex flex-col gap-3'>
   {
     [   "Precise temperature control, every time",
        "Faster cooking — ready in seconds",
        "Enhanced safety — no open flame",
        "Customized single-station or complete induction kitchens",
        "Significantly reduces energy consumption",].map((x,y)=>{
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
    <p className='tracking-wider text-[14px] sf-pill'>COMMERCIAL GRADE</p>
    </div>
   <div className='flex flex-col gap-3'>
   <h2 className='secondary-font font-bold tracking-wider'>Induction Stove for Restaurant Bangalore</h2>
   <p className='para-content text-gray-600'>If you're searching for an efficient induction stove for restaurant Bangalore, Kalam Kitchen Equipments offers premium induction cooking systems designed for heavy-duty commercial operations.</p>
   <p className='para-content text-gray-600'>Every induction stove for restaurant Bangalore supplied by Kalam Kitchen Equipments is built to handle continuous commercial cooking requirements. Our reliable commercial induction stove Bangalore solutions improve productivity while lowering energy consumption.</p>
   <p className='para-content text-gray-600'>Kalam Kitchen Equipments specializes in supplying premium hotel kitchen equipment Bangalore for hospitality businesses of every size. From cooking equipment and preparation counters to storage and washing systems, we provide complete commercial kitchen solutions.</p>
   <p className='para-content text-gray-600'>Our extensive collection of restaurant kitchen equipment Bengaluru is designed to support efficient workflow and maximize kitchen productivity. Whether you operate a luxury hotel or a quick-service restaurant, our hotel kitchen equipment Bangalore and restaurant kitchen equipment Bengaluru solutions are customized to meet your operational needs.</p>
   {/* <ul className='flex flex-col gap-3'>
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
    </ul> */}
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
    <h1 className='text-3xl lg:text-5xl leading-normal font-bold text-center'><span className='special-text'>Bulk </span>Kitchen <br /> Suppliers In Bangalore</h1>
    <p className='para-content text-gray-700 w-full lg:w-[800px] mx-auto mt-3'>Kalam Kitchen Equipments is among the preferred bulk kitchen equipment suppliers Bangalore, serving hotels, restaurant chains, food courts, educational institutions, and industrial canteens with competitive pricing and project-based solutions.</p>
   </div>


   <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
   {bulkServices.map((x, i) => {


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

    <p className='para-content text-gray-700 mt-3'>{x.description}</p>

    
  </div>
);
})}
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
    <h2 className='text-center text-3xl lg:text-5xl leading-normal font-semibold'>Trusted Across <span className='special-text'>Bangalore</span></h2>
    <p className='para-content text-gray-700 w-full lg:w-[800] text-center mt-2'>Kalam Kitchen Equipments proudly serves businesses across Bangalore and Karnataka with premium electric kitchen equipment Bangalore Karnataka solutions. Whether you need electric cooking equipment Bangalore, induction kitchen equipment Bangalore, or a complete commercial kitchen equipment Bangalore installation, our experts deliver tailored solutions that meet your operational requirements.</p>
    <p className='para-content text-gray-700 w-full lg:w-[800] text-center mt-3'>With a strong focus on quality, innovation, and customer satisfaction, Kalam Kitchen Equipments has become a preferred choice for commercial kitchen projects throughout Karnataka.</p>
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
          {x.description}
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