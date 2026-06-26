
"use client"
import React from 'react'
import Image from 'next/image'
import {kitchenStorageEquipmentArray} from '../../data/products/KitchenStorageEquip'
import {kitchenPreparationEquipmentArray} from '../../data/products/kitchenPreparation'
import {kitchenCookingEquipmentArray} from '../../data/products/kitchenCookingEquipments'

import { useParams } from 'next/navigation';
import MainpdctPage from '../../components/MainpdctPage';




 function page() {
  const params= useParams();
  const slug=params?.slug

  const allProducts=[
    ...kitchenStorageEquipmentArray,
    ...kitchenPreparationEquipmentArray,
    ...kitchenCookingEquipmentArray,
    ]

  // Finding Product
  const findProduct=allProducts.find((x,y)=>{
    return x.slug===slug
  })

 

  if(!findProduct){
    return <p>Loading.....</p>
  }

  return(
    <>
    
    <MainpdctPage product={findProduct}/>

    </>
  )
}

export default page