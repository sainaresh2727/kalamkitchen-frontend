import React from 'react'

function Testimonals() {
  const clientTestimonals=[
    {
      id:1,
      name:"Padma Priya",
      shortName:"PP",
      des:"I recently purchased a customized oven stand for my new Unox Oven from Kalam Kitchen Equipments. It arrived quickly, was perfectly manufactured, and met my needs flawlessly with precise dimensions and customized shelving arrangements."
    },
    {
      id:2,
      name:"Lincoln Jeyaraj",
      shortName:"LJ",
      des:"Kalam Kitchen is the top manufacturer of kitchen equipment. We recently purchased high-quality, reasonably priced modular kitchen equipment, including boilers and steamers, for our hostel mess. The products and customer service are excellent."
    },
    {
      id:3,
      name:"Gughan",
      shortName:"GH",
      des:"We have been working with Kalam Kitchen Equipment for the past year and are extremely satisfied with both the product quality and overall service experience. The equipment has consistently delivered excellent performance, durability, and reliability."
    },
    
  ]
  return (
    <>
    <section className='py-10 lg:py-20'>
    <div className="container flex flex-col items-center gap-6">
    
    <div className='trusted-badge mx-auto'>
    <div className="dot"></div>
    <p>CLIENT TESTIMONALS</p>
    </div>

    <div>
    <h2 className='font-bold text-3xl lg:text-5xl leading-normal text-center '>Trusted By Kitchens That Runs On <br/> <span className='special-text'>Tight Margins</span> For Error</h2>
    </div>

    <div className="testimonials-slider mt-5">
   <div className="testimonials-track">

    {[...clientTestimonals, ...clientTestimonals,...clientTestimonals].map((item, index) => (
      <div key={index} className="testimonials-card flex flex-col gap-3">
          <div className="quote-top">❝</div>
        <p className="text-gray-700 para-content mt-12 mb-3">
          {item.des}
        </p>

        <div className="flex items-center gap-3">
          <div className="client-avatar">
            {item.shortName}
          </div>

          <div>
            <h5 className='text-sm' style={{whiteSpace:"wrap"}}>{item.name}</h5>
          </div>
        </div>
        <div className="quote-bottom">❞</div>
      </div>
    ))}

  </div>
</div>

    </div>
    </section>
    </>
  )
}

export default Testimonals