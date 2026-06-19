"use client"

import React, { useState } from 'react'
import brandLogo from '../../../../public/Images/BrandLogo/brandlogo.png'
import Image from 'next/image'
import Link from 'next/link'
import { IoIosArrowDown } from "react-icons/io";
import { MdAddCall } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { FiMenu, FiX,FiChevronDown } from "react-icons/fi";

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
   
   <div className="brand-logo-lg">
   <Image src={brandLogo} alt='brand-logo' className='brand-logo-img h-[70] w-[160]'/>
   </div>

   <ul className='flex items-center justify-center gap-12'>
   <li><Link href={'/'} className='links-ul'>Home</Link></li>
   <li> <Link href={'/'} className='links-ul'>About Us</Link></li>
   
   <li className="products-menu group">
  <Link href="/" className="links-ul flex items-center justify-center gap-1">
    Products <IoIosArrowDown className='transition-transform duration-300 group-hover:rotate-180'/>
  </Link>

  <div className="products-dropdown">
    <Link href="/">Kitchen Storage Equipments</Link>
    <Link href="/">Kitchen Preparation Equipments</Link>
    <Link href="/">Kitchen Cooking Equipments</Link>
    <Link href="/">Steam Cooking Equipments</Link>
    <Link href="/">Kitchen Machines</Link>
    <Link href="/">Refrigeration Equipments</Link>
    <Link href="/">Serving / Canteen Equipments</Link>
    <Link href="/">Kitchen Trolleys</Link>
    <Link href="/">Wash / Plate Wash Equipments</Link>
  </div>
   </li>
   <li><Link href={'/'} className='links-ul'>Blogs</Link></li>
   </ul>

   <div className='flex items-center justify-center gap-6'>
   <button className='contact-us-btn'>CONTACT  US</button>
   <button className='call-us-btn'>CALL US <MdAddCall className='text-lg'/></button>
   </div>

   </div>
   </section>

   {/* Only Visible For Small Screens */}
   <section className='lg:hidden block navbar-cf-sm'>
   <div className="container flex items-center justify-between navbar-sm-container">
   
   <div className="brand-logo-lg flex items-center justify-center">
   <Image src={brandLogo} alt='brand-logo' className='brand-logo-img h-[55] w-[135]'/>
   </div>

    <button>
    <FiMenu size={26} />
   </button>

   </div>
   </section>

   
   
    </>
  );
}



export default Navbar