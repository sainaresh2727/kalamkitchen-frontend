import React from 'react'
import {
  FaWarehouse,
  FaSitemap,
  FaCheckCircle,
} from "react-icons/fa";
import {
  MdFactory,
  MdVerified,
  MdInventory,
  MdScience,
  MdLocalShipping,
  MdWarehouse,
} from "react-icons/md";

function Infrastructure() {

const infrastructureStats = [
  {
    id: 1,
    value: "50,000+",
    label: "sq.ft Manufacturing Facility",
    icon: <FaWarehouse/>,
  },
  {
    id: 2,
    value: "5+",
    label: "Departments Working in Sync",
    icon: <FaSitemap/>,
  },
  {
    id: 3,
    value: "100%",
    label: "In-house Quality Checked",
    icon: <FaCheckCircle/>,
  },
  ];

  const infrastructureDepartments = [
    {
      id: 1,
      title: "Manufacturing",
      description: "Precision craftsmanship for reliable commercial kitchen equipment.",
      icon: <MdFactory/>,
    },
    {
      id: 2,
      title: "Quality Testing",
      description: "Stringent quality standards ensure product excellence and durability.",
      icon: <MdVerified/>,
    },
    {
      id: 3,
      title: "Packing",
      description: "Secure and efficient packaging safeguards products during transit.",
      icon: <MdInventory/>,
    },
    {
      id: 4,
      title: "R&D",
      description: "Innovation-driven research creates cutting-edge kitchen solutions.",
      icon: <MdScience/>,
    },
    {
      id: 5,
      title: "Logistics",
      description: "Efficient handling and timely delivery across multiple locations.",
      icon: <MdLocalShipping/>,
    },
    {
      id: 6,
      title: "Warehousing",
      description: "Organized storage systems maintain inventory accuracy and integrity.",
      icon: <MdWarehouse/>,
    },
  ];
  return (
    <>
    <section className='lg:py-20'>
    <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10">
    
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 items-center'>
    {
      infrastructureDepartments.map((x,y)=>{
        return(
          <div className='infra-dept-card'>
          
          <div className='icon-parent'>
          <span className='text-2xl'>{x.icon}</span>
          </div>

          <h6 className='mt-2 text-[14px] font-300'>{x.title}</h6>
          <p className='text-gray-700  text-[13px]'>{x.description}</p>

          </div>
        )
      })
    }
    </div>
    
    <div className='flex flex-col gap-4 place-items-center lg:place-items-start'>
    
    <div className='trusted-badge'>
    <div className="dot"></div>
    <p>OUR INFRASTRUCTURE</p>
    </div>
    <h2 className='text-5xl text-3xl font-bold leading-normal'>Built on Precision, Powered by <span className='special-text'>Advanced Infrastructure</span></h2>
    <p className='content-para text-gray-700'>Our Corporation has Built an Ultra-modern Infrastructural Unit Where all of our working activities are carried out in a smooth way. The unit is fully backed with the sound machines and apparatus. As it is widen over an ample area of land, we have parted it appropriately into several departments to bring out our occupational operations efficiently. These departments are as follows:</p>
    <p className='content-para text-gray-700'>With a well-organized and technology-driven infrastructure, we streamline every stage of manufacturing. Our facility enables us to maintain superior quality standards while delivering reliable and innovative kitchen equipment solutions.</p>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-3">
    {
      infrastructureStats.map((x,y)=>{
        return(
          <div className='grid grid-cols-2  infra-card items-center' key={x.id} >
          
          <div className='icon-parent-infra'>
          <span className='text-2xl'>{x.icon}</span>
          </div>

          <div>
          <h6 className='text-2xl font-bold italic text-[#27A8A3]'>{x.value}</h6>
          <p className='text-gray-700 text-[12px]'>{x.label}</p>
          </div>

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

export default Infrastructure