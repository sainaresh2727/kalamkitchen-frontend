import React from 'react'
import {allProduct} from '../data/all-product-page/product'
import Image from 'next/image'
import Link from 'next/link'
import { IoArrowRedo } from "react-icons/io5";

function page() {
   
  return (
    <>
    <section className='lg:py-20' style={{background: "linear-gradient(135deg, #071828 0%, #0d2a3c 55%, #0a2218 100%)"}}>
    <div className="container flex flex-col items-center gap-5">
    
    <div className='trusted-badge mx-auto'>
    <div className="dot"></div>
    <p>PROFESSIONAL KITCHEN EQUIPMENTS</p>
    </div>

    <div className='flex flex-col gap-2 items-center'>
    <h2 className='text-3xl lg:text-5xl font-bold leading-normal text-center text-white'> Discover Our <span className='special-text'> Wide Range</span> <br /> of Product Categories</h2>
    <p className='text-gray-400 para-content text-center'>Precision-fabricated stainless steel kitchen equipment for commercial kitchens, hotels, canteens, and food processing units.</p>
    <div className="flex flex-wrap justify-center border border-[#27A8A3]/40 rounded-[18px] bg-[#27A8A3]/5 backdrop-blur-lg overflow-hidden mt-6 shadow-[0_0_0_1px_rgba(39,168,163,0.15),0_8px_32px_rgba(39,168,163,0.12),0_2px_8px_rgba(0,0,0,0.2)] w-full max-w-lg mx-auto p-x-3">
  {[
    { num: "6+",      label: "Categories"    },
    { num: "SS 316",  label: "Top Grade"     },
    { num: "Custom",  label: "Sizing"        },
    { num: "Chennai", label: "Made in India" },
  ].map((item, i, arr) => (
    <div
      key={i}
      className={`relative flex-1 min-w-[80px] px-4 sm:px-6 md:px-8 py-4 sm:py-5 text-center group transition-all duration-300 hover:bg-[#27A8A3]/10
        ${i !== arr.length - 1 ? "border-r border-[#27A8A3]/25" : ""}
        ${i >= 2 ? "border-t border-[#27A8A3]/25 sm:border-t-0" : ""}
      `}
    >
      {/* Hover glow dot */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#27A8A3] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_6px_2px_rgba(39,168,163,0.6)]" />

      {/* Number */}
      <div className="font-['Sora',sans-serif] text-[14px] sm:text-[14px] md:text-[16px] font-bold leading-none text-[#27A8A3] drop-shadow-[0_0_8px_rgba(39,168,163,0.4)] group-hover:drop-shadow-[0_0_14px_rgba(39,168,163,0.7)] transition-all duration-300">
        {item.num}
      </div>

      {/* Label */}
      <div className="text-[8px] sm:text-[10px] text-white font-medium mt-[5px] tracking-[0.08em] opacity-50 group-hover:opacity-75 transition-opacity duration-300 whitespace-nowrap">
        {item.label}
      </div>
    </div>
  ))}
</div>
    </div>

    </div>
    </section>

    <section className='pt-15'>
    <div className="container">
    
    <div className='flex flex-col gap-2'>
    <h2 className='text-3xl lg:text-5xl font-bold leading-normal text-center'> Everything Your <span className='special-text'>Kitchen Needs</span> <br /> of Product Categories</h2>
    <p className='text-gray-700 para-content text-center'>From storage to cooking — every product fabricated to your exact dimensions with your choice of SS grade.</p>
    </div>

    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6'>
    {
        allProduct.map((x,y)=>{
            return(
                <div key={x.id} className='product-card flex flex-col gap-3  relative'>
                <div className="relative overflow-hidden bg-gradient-to-br from-[rgba(39,168,163,0.05)] to-[rgba(79,209,204,0.03)] flex justify-center items-center h-[200px] border-b border-[rgba(39,168,163,0.08)] group">
           <Image
             src={x.image}
             alt={x.name}
             className="h-[160px] w-auto object-contain transition-transform duration-500 group-hover:scale-[1.06]"
           />
           {/* category pill */}
           <span className="absolute top-3 left-3 text-[9px] font-bold tracking-[0.14em] uppercase text-[#27A8A3] bg-white border border-[rgba(39,168,163,0.22)] px-3 py-[3px] rounded-full">
             {x.category}
           </span>
              </div>
                 <div className='flex flex-col gap-2 px-5 py-2 pb-6'>
                 {/* <p className='tracking-wider text-[#27A8A3] text-[12px] font-bold'>{x.type}</p> */}
                 <h6 className='tracking-wider text-[13px] font-semibold'>{x.name}</h6>
                 <p className='text-gray-700 text-[13px]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique, pariatur!</p>
                 <p className="text-[11.5px] text-gray-400 font-light leading-relaxed relative pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:rounded-sm before:bg-[#27A8A3]">
                </p>
                <div className='flex flex-col gap-3'>
                {
                    x.keyPoints.map((x,y)=>{
                        return(
                            <div className='flex items-center justify-center gap-2 border-1 p-3 comman-green-div'>
                            <p className='text-[14px]' style={{fontFamily:"Playfair Display SC,serif"}}>{x.key}:</p>
                            <p className='text-[12px] '>{x.value}</p>
                            </div>
                        )
                    })
                }
                </div>
 
           {/* divider */}
           <div className="h-[1px] bg-gradient-to-r from-[rgba(39,168,163,0.15)] to-transparent" />
                
                 <Link href={x.slug} className='full-details-btn mt-2'>VIEW MORE <IoArrowRedo className='text-lg' /></Link>
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