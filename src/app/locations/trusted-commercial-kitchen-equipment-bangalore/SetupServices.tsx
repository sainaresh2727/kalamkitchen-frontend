"use client";

import { FiPenTool, FiShoppingCart, FiTool, FiShield, FiTrendingUp } from "react-icons/fi";
import { IconType } from "react-icons";

interface SetupStep {
  icon: IconType;
  title: string;
}

const steps: SetupStep[] = [
  { icon: FiPenTool, title: "Kitchen Planning &\nLayout Design" },
  { icon: FiShoppingCart, title: "Equipment\nSelection" },
  { icon: FiTool, title: "Installation &\nCommissioning" },
  { icon: FiShield, title: "Safety\nCompliance" },
  { icon: FiTrendingUp, title: "Operational\nOptimization" },
];

export default function SetupServices() {
  return (
    <section className="bg-white lg:py-20">
      <div className="container flex flex-col gap-6 lg:gap-15 grid grid-cols-1 lg:grid-cols-2">


        <div className="flex flex-col gap-4">
        <div className='trusted-badge'>
        <div className="dot"></div>
        <p>SETUP SERVICES</p>
         </div>
        {/* Heading */}
        <h2 className=' text-3xl lg:text-5xl leading-normal font-semibold'>
          Cloud Kitchen & Electric
          <br />
          Kitchen <span className="special-text">Setup Services</span>
        </h2>

       {/* Description */}
        <p className='text-gray-700 para-content w-full lg:w-[800px]'>
        With the growing demand for delivery-based food businesses, Kalam Kitchen Equipments provides complete cloud kitchen electric setup Bangalore services. Our experts help design and install highly efficient kitchens optimized for delivery operations.</p>
        <p className='text-gray-700 para-content w-full lg:w-[800px]'>
        We also offer end-to-end electric kitchen setup Bangalore services, including planning, equipment selection, installation, and commissioning. Businesses looking for a professional cloud kitchen electric setup Bangalore can benefit from our customized solutions.</p>
        <p className='text-gray-700 para-content w-full lg:w-[800px]'>
        Our team ensures every electric kitchen setup Bangalore is designed for maximum efficiency, safety, and future scalability.</p>
        </div>
    

        {/* Process timeline */}
        <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-4 mt-14 place-items-center">
  {/* Connector line */}
  <div className="hidden lg:block absolute left-10 right-10 top-46 -translate-y-1/2 h-[2px] bg-gradient-to-r from-[#27A8A3]/10 via-[#4FD1CC] to-[#27A8A3]/10 z-0" />

  {steps.map((step, i) => {
    const Icon = step.icon;

    return (
      <div key={i} className="relative z-10 text-center px-2.5 group">
        <div className="w-[58px] h-[58px] rounded-full bg-white border-[2.5px] border-[#27A8A3] flex items-center justify-center mx-auto mb-4 shadow-[0_6px_20px_rgba(39,168,163,0.18)] transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#27A8A3] group-hover:via-[#4FD1CC] group-hover:to-[#1E8E8A] group-hover:scale-110">
          <Icon
            className="text-[#27A8A3] group-hover:text-white transition-colors duration-300"
            size={22}
          />
        </div>

        <div className="text-[13px] font-bold text-[#0e1f1f] leading-snug whitespace-pre-line">
          {step.title}
        </div>
      </div>
    );
  })}
        </div>
     
     
      </div>
    </section>
  );
} 