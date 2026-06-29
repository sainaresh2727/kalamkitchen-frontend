import React from 'react'
import Navbar from './components/comman/Navbar'
import HeroSection from './components/HeroSection'
import Certification from './components/Certification'
import OurStrength from './components/OurStrength'
import MissionandVissions from './components/MissionandVissions'
import WhatWeAre from './components/comman/WhatWeAre'
import WhyChooseUs from './components/WhyChooseUs'
import Testimonals from './components/Testimonals'
import Countries from './components/Countries'

function page() {
  return (
   <>
   
   {/* <Navbar/> */}
   <HeroSection/>
   <Certification/>
   <OurStrength/>
   <MissionandVissions/>
   <WhatWeAre/>
   <WhyChooseUs/>
   <Countries/>
   {/* <Testimonals/> */}
   </>
  )
}

export default page