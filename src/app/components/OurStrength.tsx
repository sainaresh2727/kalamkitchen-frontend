import React from 'react'
import {
    FaCogs,
    FaIndustry,
    FaWarehouse,
    FaShippingFast,
    FaTools,
    FaBolt,
    FaUserTie,
    FaTags,
    FaSmile
  } from "react-icons/fa";
  
  

function OurStrength() {
    const strengthData = [
        {
          id:1,
          icon: <FaCogs/>,
          title: "Customized Solution",
          desc: "Tailor-made kitchen equipment solutions based on client requirements."
        },
        {
          id:2,
          icon: <FaIndustry/>,
          title: "Modern Infrastructure",
          desc: "Advanced manufacturing setup ensuring quality and efficiency."
        },
        {
          id:3,
          icon: <FaWarehouse/>,
          title: "High Capacity Warehouse",
          desc: "Large storage facility for fast order handling and dispatch."
        },
        {
          id:4,
          icon: <FaShippingFast/>,
          title: "On-Time Delivery",
          desc: "We ensure all deliveries are completed within the committed time frame."
        },
        {
          id:5,
          icon: <FaTools/>,
          title: "Low Maintenance",
          desc: "Products designed for long life with minimal maintenance needs."
        },
        {
          id:6,
          icon: <FaBolt/>,
          title: "Energy Saving",
          desc: "Equipment designed to reduce electricity consumption efficiently."
        },
        {
          id:7,
          icon: <FaUserTie/>,
          title: "Qualified Professionals",
          desc: "Skilled experts ensuring precision in every manufacturing step."
        },
        {
          id:8,
          icon: <FaTags/>,
          title: "Affordable Pricing",
          desc: "High-quality products at reasonable and attractive price range."
        },
      
      ];
  return (
    <>
    <section className='lg:py-20 py-10'>
    <div className="container flex flex-col items-center gap-5">
    
    <div className='trusted-badge mx-auto'>
    <div className="dot"></div>
    <p>OUR STRENGTH</p>
    </div>

    <div className='flex flex-col gap-2'>
    <h2 className='text-3xl lg:text-5xl font-bold leading-normal text-center'> Our Strengths That <span className='special-text'>Drive Excellence</span></h2>
    <p className='text-gray-700 para-content text-center w-full lg:w-[800px]'>Kitchen Equipment is a trusted name among kitchen equipment manufacturers in Chennai, delivering high-quality commercial kitchen solutions across India and international markets. Established in 2004, we specialize in manufacturing refrigeration equipment, hot kitchen equipment, and customized fabricated kitchen solutions designed to meet the evolving needs of hotels, restaurants, canteens, and food service industries.</p>
    <p className='text-gray-700 para-content text-center w-full lg:w-[800px]'>As experienced hotel kitchen equipment manufacturers in Chennai, we also provide expert kitchen consultancy, planning, and complete setup solutions for kitchen equipment suppliers and food industry businesses. Our focus on innovation, precision engineering, and performance-driven manufacturing.</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
    {strengthData.map((x, i) => {


return (
  <div
    key={i}
    className="group rounded-3xl border border-gray-200 bg-white p-8 transition-all duration-500 hover:-translate-y-3 hover:border-[#27A8A3] hover:border-t-4 hover:shadow-[0_20px_45px_rgba(39,168,163,0.15)]"
  >
    <div className="w-16 h-16 rounded-3xl bg-[#EEF8F7] flex items-center justify-center transition-all duration-500 group-hover:bg-[#27A8A3]">
     
    <span className="text-3xl text-[#27A8A3] transition-all duration-500 group-hover:text-white" >{x.icon}</span>
    </div>

    <h6 className="mt-6 text-[15px] font-semibold">
      {x.title}
    </h6>

    <p className="mt-3 text-gray-600 leading-7 text-[13px]">
      {x.desc}
    </p>
  </div>
);
})}
    </div>

    </div>
    </section>
    </>
  )
}

export default OurStrength