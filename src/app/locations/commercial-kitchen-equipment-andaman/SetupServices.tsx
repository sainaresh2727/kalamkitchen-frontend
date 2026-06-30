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
      <div className="container flex flex-col items-center gap-4">

      <div className='trusted-badge mx-auto'>
    <div className="dot"></div>
    <p>SETUP SERVICES</p>
    </div>


        {/* Heading */}
        <h2 className='text-center text-3xl lg:text-5xl leading-normal font-semibold'>
          Cloud Kitchen & Electric
          <br />
          Kitchen <span className="special-text">Setup Services</span>
        </h2>

        {/* Rule */}
       

        {/* Description */}
        <p className='text-gray-700 para-content w-full lg:w-[800px]'>
          The food delivery industry is growing rapidly, creating demand for
          specialized cloud kitchen infrastructure. We ensure every electric
          kitchen setup Andaman is customized to maximize efficiency and
          productivity.
        </p>

        {/* Process timeline */}
        <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-4 mt-14">
          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute top-[29px] left-10 right-10 h-[2px] bg-gradient-to-r from-[#27A8A3]/[0.08] via-[#4FD1CC] to-[#27A8A3]/[0.08] z-0" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative z-10 text-center px-2.5 group">
                <div className="w-[58px] h-[58px] rounded-full bg-white border-[2.5px] border-[#27A8A3] flex items-center justify-center mx-auto mb-4 shadow-[0_6px_20px_rgba(39,168,163,0.18)] transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#27A8A3] group-hover:via-[#4FD1CC] group-hover:to-[#1E8E8A] group-hover:scale-110 group-hover:shadow-[0_10px_30px_rgba(39,168,163,0.35)]">
                  <Icon className="text-[#27A8A3] group-hover:text-white transition-colors duration-300" size={22} />
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