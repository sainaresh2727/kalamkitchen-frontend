import React from 'react'
import {canteenEquipments} from '../../data/products/canteenEquipments'
import Image from 'next/image'
import { IoArrowRedo } from "react-icons/io5";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import Link from 'next/link';

function page() {

  return (
    <>
    
    <section className='lg:py-20'>
    <div className="container flex flex-col gap-6">
    
    <div className='trusted-badge mx-auto'>
    <div className="dot"></div>
    <p>CANTEEN EQUIPMENTS</p>
    </div>

    <div className='flex flex-col gap-3 items-center'>
  <h2 className='text-3xl lg:text-5xl font-bold leading-normal text-center'>
    Complete Solutions for <span className='special-text'>Modern Canteen <br /> Equipment</span>
  </h2>

  <p className='text-center para-content text-gray-700 w-full lg:w-[700px]'>
    Our Canteen Equipment is designed to support efficient food preparation, serving, and storage in high-volume commercial kitchens. Engineered for durability and performance, our solutions help streamline daily operations while maintaining hygiene and food quality. Crafted from premium stainless steel with user-friendly designs, our equipment delivers reliable performance for schools, colleges, hospitals, corporate cafeterias, restaurants, and large-scale catering facilities.
  </p>
    </div>

    <div className='grid grid-cols-1 lg:grid-cols-4 gap-8 mt-5'>
    {
        canteenEquipments.map((x,y)=>{
            return(
                <div key={x.id} className='product-card flex flex-col gap-3  relative'>
               <div className="relative overflow-hidden bg-gradient-to-br from-[rgba(39,168,163,0.05)] to-[rgba(79,209,204,0.03)] flex justify-center items-center h-[200px] border-b border-[rgba(39,168,163,0.08)] group">
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
                <div className='flex flex-col gap-2 p-5'>
                {/* <p className='tracking-wider text-[#27A8A3] text-[12px] font-bold'>{x.type}</p> */}
                <h6 className='tracking-wide text-[15px] font-semibold'>{x.name}</h6>
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
                <div className="w-10 h-10 rounded-xl flex items-center justify-center 
                 bg-[#edf9f6] border-[1.5px] border-[#c8ede4] 
                 transition-all duration-300
                 group-hover:bg-[#3cba99] group-hover:border-[#3cba99] 
                group-hover:scale-110 group-hover:-rotate-[4deg]">
                <FaRegHeart className="w-4 h-4 text-[#3cba99] group-hover:text-white transition-colors duration-300" />
                </div>
                </div>
                <Link href={`/product-page/${x.slug}`} className='full-details-btn mt-2'>VIEW FULL DETAILS <IoArrowRedo className='text-lg' /></Link>
                </div>
                </div>
            )
        })
    }
    </div>

    </div>
    </section>
    
    </>
  )
}

export default page