import React from 'react'
import {allProduct} from '../data/all-product-page/product'
import Image from 'next/image'
import Link from 'next/link'
import { IoArrowRedo } from "react-icons/io5";

function page() {
  
  function CheckIcon() {
    return (
      <div className="w-5 h-5 rounded-full bg-[#27A8A3] flex items-center justify-center flex-shrink-0">
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    );
  }

  function ArrowIcon() {
    return (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
        />
      </svg>
    );
  }

  return (
    <>
    <section className='lg:py-20 py-10' style={{background: "linear-gradient(135deg, #071828 0%, #0d2a3c 55%, #0a2218 100%)"}}>
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
    { num: "10+",      label: "Categories"    },
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

    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
    {
        allProduct.map((x,y)=>{
            return(
              <div className="w-full rounded-3xl overflow-hidden flex flex-col md:flex-row  border border-[#27A8A3]/15 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(39,168,163,0.14)] hover:-translate-y-1 transition-all duration-300">

              {/* ── LEFT: Text Content ── */}
              <div className="flex-1 flex flex-col justify-center px-8 py-10 md:px-10 md:py-12">
        
                {/* Category eyebrow */}
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#27A8A3] mb-3">
                  {x.category}
                </p>
        
                {/* Product name */}
                <h2 className="text-[1.5rem] md:text-[1.75rem] font-bold text-[#0f1f2e] leading-[1.2] mb-6">
                  {x.name}
                </h2>
        
                {/* Key Points */}
                <ul className="flex flex-col gap-3 mb-8">
                  {x.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckIcon />
                      <span className="text-[13.5px] text-[#3a4f6a] leading-snug">
                        <span className="font-semibold text-[#0f1f2e]">{point.key}:</span>{" "}
                        {point.value}
                      </span>
                    </li>
                  ))}
                </ul>
        
                {/* Learn More button */}
                <div>
                  <Link href={x.slug}>
                    <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#27A8A3] text-white text-[13.5px] font-semibold hover:bg-[#1E8E8A] transition-colors duration-200 group">
                      Learn More
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        <ArrowIcon />
                      </span>
                    </button>
                  </Link>
                </div>
        
              </div>
        
              {/* ── RIGHT: Image ── */}
              <div className="w-full md:w-[55%] h-[220px] md:h-auto flex-shrink-0 overflow-hidden">
                <Image
                  src={x.image}
                  alt={x.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  width={800}
                  height={450}
                />
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