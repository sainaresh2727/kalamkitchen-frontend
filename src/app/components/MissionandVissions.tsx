import React from 'react'
import ContactBtn from './Buttons/ContactBtn'
import CallUsBtn from './Buttons/CallUsBtn'
import Image from 'next/image'
import visionImg from '../../../public/Images/visonimg.jpg'
import missionimg from '../../../public/Images/missiontargetImg.avif'

function MissionandVissions() {
  return (
   <>
   <section className='lg:py-20'>
   <div className="container flex flex-col gap-5">

   <div className='trusted-badge mx-auto'>
    <div className="dot"></div>
    <p>MISSIONS & VISSIONS</p>
    </div>

    <div>
    <h2 className='text-3xl lg:text-5xl font-bold leading-normal text-center'>Where Strategy Becomes Outcomes <br/> For
    every <span className='special-text'>Brand We Touch.</span></h2>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-[1fr_80px_1fr] gap-6 lg:gap-10 lg:mt-6  mt-3 items-stretch">

{/* Mission */}
<div className="mission-card flex flex-col gap-3">
  <div className='mision-vision-img'>
  <Image src={missionimg} alt='vision-img' />
  </div>
  <p className="text-xl font-bold text-[#27A8A3] text-center lg:text-left">NOW - OUR MISSION</p>
  <h2 className="text-2xl font-bold text-center lg:text-left">Delivering Value Every Day</h2>
  <p className="text-gray-700 para-content text-center lg:text-left">
    Our mission is to be a leading manufacturer of commercial kitchen
    equipment Chennai, delivering high-quality catering equipment that
    meets global standards. We focus on building strong customer
    relationships, exceeding expectations in quality, delivery, and cost
    through continuous improvement, innovation, and close customer
    interaction. As trusted kitchen equipment suppliers in Chennai, we aim
    to provide reliable solutions.
  </p>
  <div className='grid grid-cols-2 gap-5'>
  <ContactBtn/>
  <CallUsBtn/>
  </div>
</div>

{/* Connector */}
<div className="hidden lg:flex items-center justify-self-center">
  <svg viewBox="0 0 64 220" preserveAspectRatio="none" className="h-full w-16">
    <defs>
      <linearGradient id="rzGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#14C7B5" />
        <stop offset="100%" stopColor="#2D6CF6" />
      </linearGradient>
    </defs>
    <path
      d="M 8 210 C 8 130, 56 100, 56 10"
      fill="none"
      stroke="url(#rzGrad)"
      strokeWidth={2}
      strokeLinecap="round"
      opacity={0.9}
    />
    <circle r={5} fill="#2D6CF6" stroke="#FFFFFF" strokeWidth={2}>
      <animateMotion
        dur="3.2s"
        repeatCount="indefinite"
        path="M 8 210 C 8 130, 56 100, 56 10"
      />
    </circle>
  </svg>
</div>

{/* Vision */}
<div className="vision-card flex flex-col gap-3 mt-4 lg:mt-0">
<div className='mision-vision-img'>
  <Image src={visionImg} alt='vision-img' />
  </div>
  <p className="text-xl font-bold text-[#27A8A3] text-center lg:text-left">NEXT - OUR VISION</p>
  <h2 className="text-2xl font-bold text-center lg:text-left">Vision For Tomorrow</h2>
  <p className="text-gray-700 para-content  text-center lg:text-left">
    Our vision is to ensure the timely delivery of products that reflect
    superior manufacturing standards in performance and appearance. We
    strive to expand into diversified markets for sustainable growth while
    strengthening our reputation in commercial kitchen equipment Chennai.
    Through continuous learning, innovation, and customer-focused service,
    we aim to remain dependable kitchen equipment suppliers in Chennai
    committed to excellence.
  </p>
  <div className='grid grid-cols-2 gap-6'>
  <ContactBtn/>
  <CallUsBtn/>
  </div>
 </div>

    </div>

   </div>
   </section>
   </>
  )
}

export default MissionandVissions