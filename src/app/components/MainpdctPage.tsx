"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import ContactBtn from '../components/Buttons/ContactBtn';
import CallUsBtn from '../components/Buttons/CallUsBtn';
import { Swiper, SwiperSlide } from "swiper/react";
import {findRelated} from '../utils/product'
import { FaRegHeart } from "react-icons/fa";
import Link from 'next/link'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {Pagination, Autoplay } from "swiper/modules";
import { IoArrowRedo } from "react-icons/io5";
import api from '../../services/api'
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

function MainpdctPage({ product }: any) {
  
   // Related Products
   const relatedProducts=findRelated(product)
   const [open,setOpen]=useState(false)

   // Form Datas
   const [contactDatas,setContactDatas]=useState({
      name:"",
      email:"",
      phNumber:"",
      description:"",
      productName:product.name || ""
   })

   const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
  
    setContactDatas((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  

   async function addContactDatas(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try{
      const res=await api.post('/user/add/contact',contactDatas)
      // alert(res.data.message)
      toast.success(res.data.message);
      setContactDatas({
        name:"",
        email:"",
        phNumber:"",
        description:"",
        productName:""
     })
     setOpen(false)
    }
    catch(err){
      const error =err as AxiosError<{ message: string }>;

      alert(error.response?.data?.message || "Something went wrong");
    }
   }


  return (
   <>
   
   <section className='lg:py-20 py-10 flex flex-col gap-16'>
    {/* Main Product Section */}
    <div className="container">
    

    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
    
    <div className='flex items-center justify-center'>
    <Image src={product.img} alt={`${product.slug}-Image`} className='h-[400px] w-auto dynamic-pdct-img'></Image>
    </div>

    <div className='flex flex-col gap-4'>
    <div className='trusted-badge'>
    <div className="dot"></div>
    <p>{product.type}</p>
    </div>
    <h2 className='text-2xl lg:text-5xl leading-normal font-semibold text-[#27A8A3]'>{product.name}</h2>
    
    <div className='flex justify-between items-center'>
    <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) =>
                 index < product.ratingStar ? (
                 <IoIosStar  key={index} className="text-yellow-500 text-[18px]"/>
            ) : (
           <IoIosStarOutline
        key={index}
        className="text-yellow-500 text-[18px]"/> ) )}
    </div>
    <div>
    <p className='text-gray-700 text-[13px]'><span className='tracking-wider font-semibold'>{product.reviewNumber}</span>({product.reviewCound})</p>
    </div>
    <div className='in-stock'>
    <div className="dot-stock"></div>
    <p className='font-semibold tracking-wider'>{product.stock}</p>
    </div>
    </div>
    
    <p className='text-gray-700 text-[13px] leading-loose relative pl-3 before:content-[""] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[#27A8A3] before:rounded-sm'>
    {product.des}
    </p>
    <div className="grid grid-cols-2 gap-5 mt-3">
    <button className='contact-us-btn' onClick={()=>setOpen(true)}>CONTACT US</button>
    <CallUsBtn/>
    </div>
    </div>

    </div>

    </div>

    {/* Related Product Section */}
    <div className="container">
    <h6 className='text-1xl tracking-wider font-bold text-[#27A8A3]'>EXPLORE MORE SIMILAR PRODUCTS </h6>
     <Swiper
  modules={[Pagination, Autoplay]}
  breakpoints={{
    320: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2, 
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  }}
  spaceBetween={24}
  
  pagination={{ clickable: true }}
  autoplay={{ delay: 2500 }}
  loop
  className="!pb-10 [&_.swiper-button-next]:w-[38px] [&_.swiper-button-next]:h-[38px] [&_.swiper-button-next]:rounded-full [&_.swiper-button-next]:bg-white [&_.swiper-button-next]:border [&_.swiper-button-next]:border-[rgba(39,168,163,0.25)] [&_.swiper-button-next]:shadow-[0_4px_16px_rgba(39,168,163,0.15)] [&_.swiper-button-next]:top-[42%] [&_.swiper-button-prev]:w-[38px] [&_.swiper-button-prev]:h-[38px] [&_.swiper-button-prev]:rounded-full [&_.swiper-button-prev]:bg-white [&_.swiper-button-prev]:border [&_.swiper-button-prev]:border-[rgba(39,168,163,0.25)] [&_.swiper-button-prev]:shadow-[0_4px_16px_rgba(39,168,163,0.15)] [&_.swiper-button-prev]:top-[42%] [&_.swiper-button-next:after]:text-[12px] [&_.swiper-button-next:after]:font-bold [&_.swiper-button-next:after]:text-[#27A8A3] [&_.swiper-button-prev:after]:text-[12px] [&_.swiper-button-prev:after]:font-bold [&_.swiper-button-prev:after]:text-[#27A8A3] [&_.swiper-pagination-bullet]:w-[6px] [&_.swiper-pagination-bullet]:h-[6px] [&_.swiper-pagination-bullet]:bg-[rgba(39,168,163,0.25)] [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet-active]:w-[20px] [&_.swiper-pagination-bullet-active]:rounded-full [&_.swiper-pagination-bullet-active]:bg-[#27A8A3] mt-6"
>
  {relatedProducts.map((x) => (
    <SwiperSlide key={x.slug}>
      <div className="group relative cursor-pointer overflow-hidden rounded-[20px] bg-white border border-[rgba(39,168,163,0.10)] shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-[6px] hover:shadow-[0_20px_40px_rgba(39,168,163,0.3)] hover:border-[rgba(39,168,163,0.28)]" style={{marginTop:"20px"}}>

        {/* TOP GRADIENT BAR */}
        <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#27A8A3] via-[#4FD1CC] to-[#1E8E8A] opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />

        {/* IMAGE AREA */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[rgba(39,168,163,0.05)] to-[rgba(79,209,204,0.03)] flex justify-center items-center h-[200px] border-b border-[rgba(39,168,163,0.08)]">
          <Image
            src={x.img}
            alt={x.name}
            className="h-[160px] w-auto object-contain transition-transform duration-500 group-hover:scale-[1.06]"
          />
          {/* category pill */}
          <span className="absolute top-3 left-3 text-[9px] font-bold tracking-[0.14em] uppercase text-[#27A8A3] bg-white border border-[rgba(39,168,163,0.22)] px-3 py-[3px] rounded-full">
            {x.type}
          </span>
        </div>

        {/* CONTENT */}
        <div className="p-4 flex flex-col gap-3">

          {/* title */}
          <h3
            className="text-[15px] font-bold text-[#0d2222] leading-snug tracking-[0.01em] transition-colors duration-200 group-hover:text-[#27A8A3]"
            style={{ fontFamily: 'var(--secodary-font)' }}
          >
            {x.name}
          </h3>

          {/* desc with left line */}
          <p className="text-[11.5px] text-gray-400 font-light leading-relaxed relative pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:rounded-sm before:bg-[#27A8A3]">
            {x.des?.length > 70 ? x.des.slice(0, 70) + '…' : x.des}
          </p>

          {/* divider */}
          <div className="h-[1px] bg-gradient-to-r from-[rgba(39,168,163,0.15)] to-transparent" />

          <div className='flex items-center justify-between'>
                <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) =>
                 index < x.ratingStar ? (
                 <IoIosStar  key={index} className="text-yellow-500 text-[14px]"/>
            ) : (
           <IoIosStarOutline
        key={index}
        className="text-yellow-500 text-[14px]"/> ) )}
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#edf9f6] dark:bg-[rgba(60,186,153,0.1)] border-[1.5px] border-[#c8ede4] dark:border-[rgba(60,186,153,0.2)] transition-all duration-300 group-hover:bg-[#3cba99] group-hover:border-[#3cba99] group-hover:scale-110 group-hover:-rotate-[4deg]">
                <FaRegHeart  className="w-4 h-4 text-[#3cba99] group-hover:text-white transition-colors duration-300" />
                </div>
         </div>
          
          {/* CTA */}
          <Link href={`/product-page/${x.slug}`} className="w-full flex items-center justify-center gap-2 text-[11px] font-bold tracking-[1.2px] uppercase text-white bg-gradient-to-r from-[#27A8A3] to-[#1E8E8A] rounded-full py-[10px] shadow-[0_6px_20px_rgba(39,168,163,0.25)] transition-all duration-300 hover:shadow-[0_10px_28px_rgba(39,168,163,0.4)] hover:-translate-y-[2px]">
            View Details
            <IoArrowRedo className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

    </div>
   </section>

   {/* Modal Overlay */}
        {open && (
      <div
    onClick={() => setOpen(false)}
    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
  />
    )}

{/* Modal */}
  <div
    className={`fixed top-1/2 left-1/2 z-50 w-[95%] max-w-[850px]
  -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl
  bg-white shadow-2xl transition-all duration-300
  ${
    open
      ? "opacity-100 scale-100"
      : "opacity-0 scale-95 pointer-events-none"
  }`}
>
  <div className="grid lg:grid-cols-2">

    {/* Left Side */}
    <div className="relative overflow-hidden bg-gradient-to-br from-[#113B5C] via-[#1b4b72] to-[#27A8A3] text-white p-10 flex flex-col justify-center">

{/* Glow Effects */}
<div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-white/10 blur-3xl" />
<div className="absolute -bottom-20 -left-20 w-52 h-52 rounded-full bg-[#5EEAD4]/20 blur-3xl" />

<div className="relative z-10">
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
    <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></span>
    <span className="text-sm tracking-wider">
      Available For New Projects
    </span>
  </div>

  <h2 className="text-4xl font-bold mt-6 leading-tight">
    Let's Build Something
    <span className="block text-[#5EEAD4]">
      Extraordinary Together
    </span>
  </h2>

  <p className="mt-5 text-white/80 leading-relaxed">
    Transform your ideas into powerful digital experiences with our expert team.
  </p>

  <div className="mt-10 grid gap-4">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
        🚀
      </div>
      <span>Fast Project Delivery</span>
    </div>

    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
        💎
      </div>
      <span>Premium Quality Solutions</span>
    </div>

    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
        🤝
      </div>
      <span>Dedicated Support Team</span>
    </div>
  </div>
</div>
</div>

    {/* Right Side */}
    <div className="p-8 bg-white">

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold" style={{ fontFamily: "var(--secodary-font)" }}>
          Contact Us
        </h3>

        <button
          onClick={() => setOpen(false)}
          className="text-3xl text-gray-500 hover:text-red-500"
        >
          ×
        </button>
      </div>

      <form className="space-y-5" onSubmit={(e)=>addContactDatas(e)} >

  {/* Name */}
  <div >
    <label className="block text-sm font-semibold text-[#113B5C] mb-2 tracking-wider" style={{ fontFamily: "var(--secodary-font)" }}>
      Full Name
    </label>
    <div className="relative">
      <input
        type="text"
        placeholder="Enter your full name"
        className="w-full h-14 pl-5 rounded-2xl border border-gray-200 bg-[#f8fbfd]
        focus:bg-white focus:border-[#27A8A3]
        focus:ring-4 focus:ring-[#27A8A3]/10
        transition-all duration-300 outline-none"
      style={{ fontFamily: "var(--secodary-font)" }} onChange={(e)=>handleChange(e)} name='name' value={contactDatas.name}/>
    </div>
  </div>

  {/* Email */}
  <div>
    <label className="block text-sm font-semibold text-[#113B5C] mb-2 tracking-wider" style={{ fontFamily: "var(--secodary-font)" }}>
      Email Address
    </label>
    <input
      type="email"
      placeholder="you@example.com"
      className="w-full h-14 pl-5 rounded-2xl border border-gray-200 bg-[#f8fbfd]
      focus:bg-white focus:border-[#27A8A3]
      focus:ring-4 focus:ring-[#27A8A3]/10
      transition-all duration-300 outline-none"
      style={{ fontFamily: "var(--secodary-font)" }} onChange={(e)=>handleChange(e)} name='email' value={contactDatas.email}  />
  </div>
      
       <div>
      <label className="block text-sm font-semibold text-[#113B5C] mb-2 tracking-wider" style={{ fontFamily: "var(--secodary-font)" }}>
        Phone Number
      </label>
      <input
        type="tel"
        placeholder="+91 xxxxxxxxxx"
        className="w-full h-14 pl-5 rounded-2xl border border-gray-200 bg-[#f8fbfd]
        focus:bg-white focus:border-[#27A8A3]
        focus:ring-4 focus:ring-[#27A8A3]/10
        transition-all duration-300 outline-none"
        style={{ fontFamily: "var(--secodary-font)" }} onChange={(e)=>handleChange(e)} name='phNumber' value={contactDatas.phNumber}  />
    </div>

    <div>
      <label className="block text-sm font-semibold text-[#113B5C] mb-2 tracking-wider" style={{ fontFamily: "var(--secodary-font)" }}>
        Service
      </label>
      <input
        type="text"
        placeholder=""
        className="w-full h-14 pl-5 rounded-2xl border border-gray-200 bg-[#f8fbfd]
        focus:bg-white focus:border-[#27A8A3]
        focus:ring-4 focus:ring-[#27A8A3]/10
        transition-all duration-300 outline-none"
        style={{ fontFamily: "var(--secodary-font)" }} value={contactDatas.productName}/>
    
    </div>

   {/* Message */}
  <div>
    <label className="block text-sm font-semibold text-[#113B5C] mb-2 tracking-wider" style={{ fontFamily: "var(--secodary-font)" }}>
      Project Details
    </label>

    <textarea
      rows={5}
      placeholder="Tell us about your project requirements..."
      className="w-full rounded-2xl border border-gray-200 bg-[#f8fbfd]
      p-5 resize-none
      focus:bg-white focus:border-[#27A8A3]
      focus:ring-4 focus:ring-[#27A8A3]/10
      transition-all duration-300 outline-none"
      style={{ fontFamily: "var(--secodary-font)" }} onChange={(e)=>handleChange(e)} name='description' value={contactDatas.description}  />
  </div>

  {/* Trust Badge */}
  <div className="flex items-center gap-2 text-sm text-gray-500">
    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
    We typically respond within 24 hours
  </div>

  {/* Button */}
  <button
    type="submit"
    className="group relative overflow-hidden w-full h-14 rounded-2xl
    hover:scale-[1.02]
    transition-all duration-300" style={{background:"var(--gradient-primary)",fontFamily: "var(--secodary-font)",color:"white"}}>
    <span className="relative z-10">
      Send Enquiry →
    </span>

    <div className="absolute inset-0 translate-x-[-100%]
    group-hover:translate-x-[100%]
    bg-gradient-to-r from-transparent via-white/20 to-transparent
    transition-all duration-700" />
  </button>

      </form>

    </div>
    </div>
   </div>

  
   
   

   </>

   
  )
}

export default MainpdctPage