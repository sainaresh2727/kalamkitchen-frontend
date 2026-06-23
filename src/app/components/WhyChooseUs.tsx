import React from 'react'
import img1 from '../../../public/Images/whychooseimg1.png'
import img2 from '../../../public/Images/whychooseimg2.png'
import img3 from '../../../public/Images/whychooseimg3.png'
import img4 from '../../../public/Images/whychooseimg4.png'
import Image from 'next/image'
import imgcard from '../../../public/Images/whychooseimgcard.png'

function WhyChooseUs() {
    const whyChooseData = [
        {
          img:img2,
          title: "Industry Experience",
          desc: "We are one of Tamil Nadu’s leading commercial kitchen equipment suppliers with over a decade of expertise.",
        },
        {
          img:img1,
          title: "Kitchen Design Support",
          desc: "We help you design efficient and modern kitchen layouts based on your requirements.",
        },
        {
          img:img3,
          title: "Installation & Setup",
          desc: "We install, fit, modify, and upgrade your kitchen equipment with professional support.",
        },
        {
          img:img4,
          title: "Service & Maintenance",
          desc: "We provide planned service and maintenance programs for long-term reliability.",
        },
      ];
  return (
   <>
   
   <section className='pt-10 lg:py-20'>
   <div className="container grid grid-cols-1 lg:grid-cols-2 gap-6">
    
   <div className="why-choose-us-img">
    <Image src={imgcard} alt='why-choose-us-img'/>
    </div>


   <div className='flex flex-col gap-3'>
   
   <div className='trusted-badge'>
   <div className="dot"></div>
   <p>WHY CHOOSE US</p>
   </div>
   <h2 className='text-3xl font-bold leading-normal'>Reliable Solutions for <span className='special-text'>Modern <br /> Commercial Kitchens</span></h2>
   <p className='text-gray-700 para-content'>We are one of Commercial Kitchen Equipment Suppliers Tamilnadu largest kitchen equipment providers.</p>
   <p className='text-gray-700 para-content'>We specialize in providing end-to-end kitchen solutions including design, installation, and maintenance.</p>
   <p className='text-gray-700 para-content'>Our expert team ensures high-quality equipment, reliable service, and complete customer satisfaction for hotels, restaurants, and catering businesses.</p>
   
   <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5'>
  { 
    whyChooseData.map((x,y)=>{
        return(
            <div key={y} className='flex flex-col gap-2 why-choose-us-card text-center'>
            
            <div className='flex items-center justify-center h-[70] w-[70] rounded-md mx-auto'>
            <Image src={x.img} alt='why-choose-card-img'/>
            </div>

            <h6 className='mt-3'>{x.title}</h6>
            <p className='text-gray-700 para-content'>{x.desc}</p>

            </div>
        )
    })
  }
   </div>
   
   </div>

 

   </div>
   </section>

   </>
  )
}

export default WhyChooseUs