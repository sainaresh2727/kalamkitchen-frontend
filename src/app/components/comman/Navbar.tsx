"use client"

import React, { useState } from 'react'
import brandLogo from '../../../../public/Images/BrandLogo/brandlogo.png'
import Image from 'next/image'
import Link from 'next/link'
import { IoIosArrowDown } from "react-icons/io";

import { FaBars } from "react-icons/fa";
import { FiMenu, FiX,FiChevronDown } from "react-icons/fi";
import ContactBtn from '../Buttons/ContactBtn'
import CallUsBtn from '../Buttons/CallUsBtn'

function Navbar() {
  
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  
  const productLinks = [
  'Kitchen Storage Equipments',
  'Kitchen Preparation Equipments',
  'Kitchen Cooking Equipments',
  'Steam Cooking Equipments',
  'Kitchen Machines',
  'Refrigeration Equipments',
  'Serving / Canteen Equipments',
  'Kitchen Trolleys',
  'Wash / Plate Wash Equipments',
];

const closeDrawer = () => {
    setOpen(false);
    setProductsOpen(false);
  };

  return (
   <>

   {/* Only Visible For Large Screens */}

   <section className='navbar-cf-lg  hidden lg:block'>
   <div className="container flex items-center justify-between">
   
   <Link href='/' className="brand-logo-lg">
   <Image src={brandLogo} alt='brand-logo' className='brand-logo-img h-[70] w-[160]'/>
   </Link>

   <ul className='flex items-center justify-center gap-12'>
   <li><Link href='/' className='links-ul'>Home</Link></li>
   <li> <Link href='/About' className='links-ul'>About Us</Link></li>
   
   <li className="products-menu group">
  <Link href="/all-product" className="links-ul flex items-center justify-center gap-1">
    Products <IoIosArrowDown className='transition-transform duration-300 group-hover:rotate-180'/>
  </Link>

  <div className="products-dropdown">
    <Link href='/pages/kitchen-storage-equipments'>Kitchen Storage Equipments</Link>
    <Link href="/pages/kitchen-preparation-equipments">Kitchen Preparation Equipments</Link>
    <Link href="/pages/kitchen-cooking-equipments">Kitchen Cooking Equipments</Link>
    <Link href="/pages/kitchen-steaming-equipments">Steam Cooking Equipments</Link>
    <Link href="/pages/kitchen-machine-equipments">Kitchen Machines</Link>
    <Link href="/pages/refrigenator-equipments">Refrigeration Equipments</Link>
    <Link href="/pages/canteen-equipments">Serving / Canteen Equipments</Link>
    <Link href="/pages/kitchen-trolleys">Kitchen Trolleys</Link>
    <Link href="/pages/wash-equipments">Washing Equipments</Link>
    <Link href="/pages/kitchen-exhaust-equipments">Exhaust / LPG /  Steam Panel Equipments</Link>
    <Link href="/pages/baking-equipments">Bakery Equipments</Link>
    <Link href="/pages/Customized-Fabrication">Customized Fabrication</Link>
    <Link href="/pages/table-dinning">Dinning Table & Chairs</Link>
  </div>
   </li>
   
   <li><Link href='#' className='links-ul'>Blogs</Link></li>
   <li><Link href={'/tool'} className='links-ul'>Tool</Link></li>
   </ul>

   <div className='flex items-center justify-center gap-5'>
   <ContactBtn/>
   <CallUsBtn/>
   </div>

   </div>
   </section>

   {/* Only Visible For Small Screens */}
   <section className='lg:hidden block navbar-cf-sm'>
   <div className="container flex items-center justify-between navbar-sm-container">
   
   <div className="brand-logo-lg flex items-center justify-center">
   <Image src={brandLogo} alt='brand-logo' className='brand-logo-img h-[55] w-[135]'/>
   </div>

    <button className='flex items-center justify-center'>
    <FiMenu size={22} className='icons text-[#27A8A3]'  />
   </button>

   </div>
   </section>

   
   
    </>
  );
}



export default Navbar