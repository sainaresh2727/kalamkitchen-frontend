import React from 'react'
import brandLogo from '../../../../public/Images/BrandLogo/brandlogo.png'
import Image from 'next/image'

function Navbar() {
  return (
   <>
   <section>
   <div className="container flex items-center justify-between">
   
   <div className="brand-logo-lg">
   <Image src={brandLogo} alt='brand-logo'/>
   </div>

   </div>
   </section>
   </>
  )
}

export default Navbar