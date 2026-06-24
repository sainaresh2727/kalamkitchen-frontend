"use client"

import React from 'react'
import Image from 'next/image'
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import ContactBtn from '../components/Buttons/ContactBtn';
import CallUsBtn from '../components/Buttons/CallUsBtn';
import { Swiper, SwiperSlide } from "swiper/react";
import {findRelated} from '../utils/product'
import { FaRegHeart } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {Pagination, Autoplay } from "swiper/modules";
import { IoArrowRedo } from "react-icons/io5";

function MainpdctPage({ product }: any) {
  
   // Related Products
   const relatedProducts=findRelated(product)
  
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
    <ContactBtn/>
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
      <div className="group relative cursor-pointer overflow-hidden rounded-[20px] bg-white border border-[rgba(39,168,163,0.10)] shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-[6px] hover:shadow-[0_20px_40px_rgba(39,168,163,0.3)] hover:border-[rgba(39,168,163,0.28)]">

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
          <button className="w-full flex items-center justify-center gap-2 text-[11px] font-bold tracking-[1.2px] uppercase text-white bg-gradient-to-r from-[#27A8A3] to-[#1E8E8A] rounded-full py-[10px] shadow-[0_6px_20px_rgba(39,168,163,0.25)] transition-all duration-300 hover:shadow-[0_10px_28px_rgba(39,168,163,0.4)] hover:-translate-y-[2px]">
            View Details
            <IoArrowRedo className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
          </button>

        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

    </div>
   </section>

   </>
  )
}

export default MainpdctPage