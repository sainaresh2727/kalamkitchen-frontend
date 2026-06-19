import React from 'react'
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import img1 from '../../../../public/Images/whoweareimg.png'
import Image from 'next/image';
import {
    FaAward,
    FaRocket,
    FaClipboardCheck,
    FaHandshake,
    FaShippingFast,
  } from "react-icons/fa";

function WhatWeAre() {
     const coreValues = [
        {
          icon: <FaAward/>,
          title: "Excellence",
        },
        {
          icon: <FaRocket/>,
          title: "Endeavor",
        },
        {
          icon: <FaClipboardCheck/>,
          title: "Discipline",
        },
        {
          icon: <FaHandshake/>,
          title: "Trust",
        },
        {
          icon: <FaShippingFast/>,
          title: "Delivery",
        },
      ];
  return (
    <>
    <section className='py-10 lg:py-20'>
    <div className="container flex justify-center flex-col gap-6">
    
      
    <div className='trusted-badge mx-auto'>
    <div className="dot"></div>
    <p>WHAT WE ARE</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    
    <div className='flex flex-col lg:gap-3 justify-center gap-1'>
    <h2 className='lg:text-4xl text-3xl font-bold leading-normal text-center lg:text-left'>Crafting Excellence in Commercial <br /> <span className='special-text'>Kitchen Solutions.</span></h2>
    <p className='text-gray-700 para-content text-center flex items-center justify-center lg:text-left p-3 lg:p-0'>We are a trusted manufacturer of commercial kitchen equipment, dedicated to delivering quality, innovation, and reliability. With years of industry experience, we provide durable stainless steel solutions designed to enhance efficiency, performance, and hygiene standards. Our commitment to excellence and customer satisfaction drives us to deliver products that meet the highest expectations.</p>
    <p  className='text-gray-700 para-content text-center flex items-center justify-center lg:text-left p-3 lg:p-0'>We specialize in manufacturing high-quality commercial kitchen equipment that combines durability, performance, and innovation. Our focus is on delivering reliable solutions that help businesses operate efficiently and successfully.</p>
    <p  className='text-gray-700 para-content text-center flex items-center justify-center lg:text-left p-3 lg:p-0'>We are committed to providing premium stainless steel kitchen equipment designed for quality, efficiency, and long-lasting performance. Customer satisfaction remains at the heart of everything we do.</p>
    <div className='grid grid-cols-5 gap-6'>
    {
        coreValues.map((x,y)=>{
            return(
                <div className='flex items-center justify-center gap-3 core-values-card'>
                <div className='what-we-are-icon-parent'>
                <span className='my-auto text-[#1E8E8A] text-2xl'>{x.icon}</span>
                </div>
                <p className='my-auto text-sm'>{x.title}</p>
                </div>
            )
        })
    }
    </div>
    </div>
    
    <div className="what-we-are-img">
    <Image src={img1} alt='what-we-are-img'/>
    </div>
    
    </div>



    </div>
    </section>
    </>
  )
}

export default WhatWeAre