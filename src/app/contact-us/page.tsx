"use client";

import React from 'react'


import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdAddCall } from "react-icons/md";
import { CiMail } from "react-icons/ci";


function page() {
  const contactArray=[
    {
      id:1,
      title:"CALL US",
      value:"+91 8248321081",
      time:"Mon – Sat, 9am – 6pm",
      icon:<MdAddCall/>
    },
    {
      id:2,
      title:"EMAIL",
      value:"kalamkitchenequipments@gmail.com",
      time:"Response within 4 hours",
      icon:<CiMail/>
    },
    {
      id:3,
      title:"SHOWROOM",
      value: [
        "Kalam Kitchen Equipments,",
        "NO 3273, Phase 1/2, TNHB,",
        "Ayapakkam, Thiruvallur,",
        "Chennai – 600077."
      ],
      time:"Walk In, No Appoinment.",
      icon:<FaLocationDot/>
    },
  ]

  
  return (
    <>
    <section>
    <div className="container flex flex-col gap-6">
    
    <div className='trusted-badge mx-auto'>
    <div className="dot"></div>
    <p>CONTACT US</p>
    </div>

    <div className='flex flex-col gap-3 items-center'>
    <h2 className='text-3xl lg:text-5xl font-bold leading-normal text-center'>Equip Your Kitchen In <span className='special-text'>Right Way</span> </h2>
    <p className='text-gray-700 para-content text-center'>Outfitting a New Restaurant or Upgrading Your Commercial Kitchen? Our Team Will Help You Find Exactly What You Need.</p>
    </div>

    <div className='grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 mt-4 lg:mt-8 max-w-7xl mx-auto'>

    <div>
    <p className='text-sm text-gray-700 tracking-wider'>REACH US DIRECTLY</p>
    <div className="grid grid-cols-1 gap-6 mt-4">
    {
      contactArray.map((x,y)=>{
        return(
          <div className="flex items-center gap-5 border border-dashed border-[#27A8A3]/30 bg-white hover:bg-[#27A8A3]/5 rounded-2xl px-5 py-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" key={x.id}>
         <div className="w-14 h-14 rounded-2xl bg-[#27A8A3]/10 flex items-center justify-center shrink-0">
        <span className="text-2xl text-[#27A8A3]">
       {x.icon}
        </span>
        </div>
          <div className='flex flex-col gap-1'>
          <p className='text-gray-700 text-[12px] tracking-wider'>{x.title} :</p>
          <h6 className=' text-[12px]  text-[#27A8A3] tracking-wide whitespace-pre-line'>
          {Array.isArray(x.value)
         ? x.value.map((line, i) => (
         <span key={i} className="block">
          {line}
        </span>
          ))
          : x.value}
          </h6>

          <p className='text-gray-700 text-[12px]'>{x.time}</p>
          </div>
          </div>
        )
      })
    }
    </div>
    </div>

    <div className='flex flex-col gap-3 bg-white rounded-3xl p-6 lg:p-8 border border-[#27A8A3]/10 shadow-xl shadow-[#27A8A3]/5'>
    <div className='flex flex-col gap-2'>
    <h2 className='font-bold text-3xl text-center text-[#27A8A3]'>Get A Free Quote</h2>
    <p className='text-gray-700 text-center para-content mt-1'>Tell Us What You Need — We'll Put Together A Custom Proposal Within 24 Hours.</p>
    </div>

    <form action="">
    <div className='grid grid-cols-2 gap-5'>
    <div className='flex flex-col gap-2'>
    <label className='text-gray-700 tracking-wider text-[12px]'>YOUR NAME:</label>
    <input type="text" placeholder='Name' className='border-1 input border-[#27A8A3] border-solid rounded-2xl p-3 text-[12px]' />
    </div>
    <div className='flex flex-col gap-2'>
    <label className='text-gray-700 tracking-wider text-[12px]'>PHONE NUMBER:</label>
    <input type="text" placeholder='Number' className='border-1 input border-[#27A8A3] border-solid rounded-2xl p-3 text-[12px]' />
    </div>
    <div className='flex flex-col gap-2'>
    <label className='text-gray-700 tracking-wider text-[12px]'>BUSINESS EMAIL:</label>
    <input type="mail" placeholder='Number' className='border-1 input border-[#27A8A3] border-solid rounded-2xl p-3 text-[12px]' />
    </div>
     <div className='flex flex-col gap-2'>
    <label className='text-gray-700 tracking-wider text-[12px]'>TYPE OF ESTABLISHMENT:</label>
    <select name="" id="" className='border-1 input border-[#27A8A3] border-solid rounded-2xl p-3 text-[12px] text-gray-700'>
    <option hidden>Select Your Business Type </option>
    <option value="">Restaurent / Hotel</option>
    <option value="">Cloud Kitchen</option>
    <option value="">Cloud Kitchen</option>
    <option value="">Cloud Kitchen</option>
    <option value="">Cloud Kitchen</option>
    </select>
    </div>
    </div>

    <div className='flex flex-col gap-2 mt-5'>
    <label className='text-gray-700 text-[12px] tracking-wider'>DETAILS:</label>
    <textarea name="" id="" className='border-1 input border-[#27A8A3] border-solid rounded-2xl p-3 text-[12px] text-gray-700' placeholder='Details' rows={5}></textarea>
    </div>

    <div className='mt-6'>
    <input type="submit" className='contact-submit-btn mt-3' value={"CONTACT HERE"} />
    </div>
    </form>

    </div>

    </div>

    </div>
    </section>

     

    </>
  )
}

export default page