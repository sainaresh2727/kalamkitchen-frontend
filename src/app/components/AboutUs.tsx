import React from 'react'
import CallUsBtn from './Buttons/CallUsBtn'
import ContactBtn from './Buttons/ContactBtn'
import aboutUsImg from '../../../public/Images/aboutUsImg.png'
import Image from 'next/image'

function AboutUs() {
  return (
    <>
    <section className='lg:py-20'>
    <div className="container grid grid-cols-1 lg:grid-cols-2 gap-6">
    

    <div className='flex flex-col gap-3'>
    <div className='trusted-badge'>
    <div className="dot"></div>
    <p>ABOUT US</p>
    </div>
    <h2 className='font-bold text-3xl lg:text-5xl leading-normal'>Welcome to <span className='special-text'>Kalam Kitchen</span> Equipments.</h2>
    <p className='text-gray-700 para-content'>Under the admired guidance of Indu (Sales Manager), our organization has achieved a wide and satisfied client base across the region. As trusted Kitchen Equipment Suppliers in Tamilnadu, we focus on quality manufacturing, practical designs, and customer satisfaction to support smooth kitchen operations for hotels, restaurants, and catering businesses.</p>
    <p className='text-gray-700 para-content'>As trusted Kitchen Equipment Suppliers in Tamil Nadu, we specialize in designing, manufacturing, and supplying a comprehensive range of commercial kitchen equipment tailored to the unique requirements of hotels, restaurants, bakeries, canteens, hospitals, cloud kitchens, and catering businesses. Our products are crafted using premium-grade Stainless Steel.</p>
    <p className='text-gray-700 para-content'>At Kalam Kitchen Equipments, we believe that every successful food business starts with a well-planned and efficient kitchen. From kitchen layout planning and equipment selection to installation and after-sales support.</p>
    <div className="grid grid-cols-2 gap-6">
    <ContactBtn/>
    <CallUsBtn/>
    </div>
    <div>
    
    </div>

    </div>

    <div className='about-us-img'>
    <Image src={aboutUsImg} alt='about-us-image'/>
    </div>

    </div>
    </section>
    </>
  )
}

export default AboutUs