import React from 'react'
import ContactBtn from '../Buttons/ContactBtn'
import Image from 'next/image'
import brandLogo from '../../../../public/Images/BrandLogo/brandlogo.png'
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import Link from 'next/link'
import { IoChevronForward,IoLocationOutline,
  IoCallOutline,
  IoMailOutline,
  IoTimeOutline, } from "react-icons/io5";

function Footer() {
  return (
    <>
    
    <section className="footer-cf py-12 border-t border-gray-200">
  <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

    {/* Company Info */}
    <div className="flex flex-col gap-3">
      <Image
        src={brandLogo}
        alt="Kalam Kitchen Equipments"
        className="w-[170px] h-auto"
      />

      <p className="text-[12px] text-gray-300 leading-7">
        Kalam Kitchen Equipments is a trusted manufacturer of commercial
        kitchen equipment, delivering durable stainless steel solutions for
        hotels, restaurants, canteens, and catering businesses.
      </p>

      <div className="flex gap-3">
        {[FaInstagram, FaFacebook, FaYoutube, FaPinterest].map(
          (Icon, index) => (
            <div
              key={index}
              className="social-media-parent h-[30] w-[30] rounded-lg flex items-center justify-center"
            >
              <Icon className="media-icon text-[#27A8A3] text-[16px]" />
            </div>
          )
        )}
      </div>
    </div>

    {/* Quick Links */}
    <div className="flex flex-col lg:items-center">
  <h3 className="text-sm font-semibold mb-5 text-[#27A8A3] tracking-wider">
    Quick Links
  </h3>

  <div className="flex flex-col gap-3">
    
    <Link
      href="/"
      className="group flex items-center gap-2 text-gray-300 text-[12px] transition-all duration-300 hover:text-[#27A8A3] hover:translate-x-1"
    >
      <IoChevronForward className="text-[#27A8A3] text-sm transition-transform duration-300 group-hover:translate-x-1" />
      Home
    </Link>

    <Link
      href="#"
      className="group flex items-center gap-2 text-gray-300 text-[12px] transition-all duration-300 hover:text-[#27A8A3] hover:translate-x-1"
    >
      <IoChevronForward className="text-[#27A8A3] text-sm transition-transform duration-300 group-hover:translate-x-1" />
      About Us
    </Link>

    <Link
      href="#"
      className="group flex items-center gap-2 text-gray-300 text-[12px] transition-all duration-300 hover:text-[#27A8A3] hover:translate-x-1"
    >
      <IoChevronForward className="text-[#27A8A3] text-sm transition-transform duration-300 group-hover:translate-x-1" />
      Products
    </Link>

    <Link
      href="#"
      className="group flex items-center gap-2 text-gray-300 text-[12px] transition-all duration-300 hover:text-[#27A8A3] hover:translate-x-1"
    >
      <IoChevronForward className="text-[#27A8A3] text-sm transition-transform duration-300 group-hover:translate-x-1" />
      Blogs
    </Link>

    <Link
      href="#"
      className="group flex items-center gap-2 text-gray-300 text-[12px] transition-all duration-300 hover:text-[#27A8A3] hover:translate-x-1"
    >
      <IoChevronForward className="text-[#27A8A3] text-sm transition-transform duration-300 group-hover:translate-x-1" />
      Contact Us
    </Link>

  </div>
    </div>

    {/* Products */}
    <div className="flex flex-col">
  <h3 className="text-sm font-semibold mb-5 text-[#27A8A3] tracking-wider">
    Our Products
  </h3>

  <div className="flex flex-col gap-3">

    <Link
      href=""
      className="group flex items-center gap-2 text-gray-300 text-[12px] transition-all duration-300 hover:text-[#27A8A3] hover:translate-x-2"
    >
      <IoChevronForward className="text-[#27A8A3] text-sm transition-all duration-300 group-hover:translate-x-1 group-hover:scale-125" />
      Commercial Kitchen Equipment
    </Link>

    <Link
      href=""
      className="group flex items-center gap-2 text-gray-300 text-[12px] transition-all duration-300 hover:text-[#27A8A3] hover:translate-x-2"
    >
      <IoChevronForward className="text-[#27A8A3] text-sm transition-all duration-300 group-hover:translate-x-1 group-hover:scale-125" />
      Stainless Steel Tables
    </Link>

    <Link
      href=""
      className="group flex items-center gap-2 text-gray-300 text-[12px] transition-all duration-300 hover:text-[#27A8A3] hover:translate-x-2"
    >
      <IoChevronForward className="text-[#27A8A3] text-sm transition-all duration-300 group-hover:translate-x-1 group-hover:scale-125" />
      Kitchen Storage Units
    </Link>

    <Link
      href=""
      className="group flex items-center gap-2 text-gray-300 text-[12px] transition-all duration-300 hover:text-[#27A8A3] hover:translate-x-2"
    >
      <IoChevronForward className="text-[#27A8A3] text-sm transition-all duration-300 group-hover:translate-x-1 group-hover:scale-125" />
      Refrigeration Equipment
    </Link>

    <Link
      href=""
      className="group flex items-center gap-2 text-gray-300 text-[12px] transition-all duration-300 hover:text-[#27A8A3] hover:translate-x-2"
    >
      <IoChevronForward className="text-[#27A8A3] text-sm transition-all duration-300 group-hover:translate-x-1 group-hover:scale-125" />
      Bakery Equipment
    </Link>

    <Link
      href=""
      className="group flex items-center gap-2 text-gray-300 text-[12px] transition-all duration-300 hover:text-[#27A8A3] hover:translate-x-2"
    >
      <IoChevronForward className="text-[#27A8A3] text-sm transition-all duration-300 group-hover:translate-x-1 group-hover:scale-125" />
      Canteen Equipment
    </Link>

  </div>
   </div>

    {/* Contact Info */}
   <div className="flex flex-col">
  <h3 className="text-sm font-semibold mb-5 text-[#27A8A3] tracking-wider">
    Contact Info
  </h3>

  <div className="flex flex-col gap-4">

    <div className="flex items-start gap-3 group">
      <IoLocationOutline className="text-[#27A8A3] text-5xl"/>
      <p className="text-gray-300 text-[12px] group-hover:text-[#27A8A3] transition">
      Kalam Kitchen Equipments NO 3273,PHASE 1/2,TNHB, AYAPAKKAM, THIRUVALLUR CHENNAI 600077
    </p>
    </div>

    <div className="flex items-center gap-3 group">
      <IoCallOutline className="text-[#27A8A3] text-lg" />
      <p className="text-gray-300 text-[12px] group-hover:text-[#27A8A3] transition">
        +91 XXXXX XXXXX
      </p>
    </div>

    <div className="flex items-center gap-3 group">
      <IoMailOutline className="text-[#27A8A3] text-lg" />
      <p className="text-gray-300 text-[12px] group-hover:text-[#27A8A3] transition">
      kalamkitchenequipments@gmail.com
      </p>
    </div>

    <div className="flex items-center gap-3 group">
      <IoTimeOutline className="text-[#27A8A3] text-lg mt-1" />
      <p className="text-gray-300 text-[12px] group-hover:text-[#27A8A3] transition">
        Mon - Sat : 9:00 AM - 7:00 PM
      </p>
    </div>

  </div>
  </div>

  {/* Input div */}
  <div className="flex flex-col gap-2">
  <p className="text-sm text-[#27A8A3] font-bold tracking-wider">Subscribe for updates</p>

  <div className="flex items-center gap-2">
    <input
      type="email"
      placeholder="Enter your email"
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-[#27A8A3] text-white"
    />

    <button className="bg-[#27A8A3] text-white px-4 py-2 rounded-md text-sm hover:bg-[#1e8e8a] transition text-[12px]">
      Send
    </button>
  </div>
</div>

  </div>
  </section>

{/* Bottom Bar */}
<section className="bg-black py-4">
  <div className="container flex items-center justify-center">

    <p className="text-white text-[12px] text-center">
      © 2026 Kalam Kitchen Equipments. All Rights Reserved, Designed By <u className='font-semibold'>@RANKRAZE</u>
    </p>

  

  </div>
</section>

 
    </>
  )
}

export default Footer