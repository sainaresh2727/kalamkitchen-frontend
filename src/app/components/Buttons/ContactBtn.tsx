import React from 'react'
import Link from 'next/link'

function ContactBtn() {
  return (
    <>
    <Link href={'/contact-us'} className='contact-us-btn'>CONTACT  US</Link>
    </>
  )
}

export default ContactBtn