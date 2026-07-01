
"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import {kitchenStorageEquipmentArray} from '../../data/products/KitchenStorageEquip'
import {kitchenPreparationEquipmentArray} from '../../data/products/kitchenPreparation'
import {kitchenCookingEquipmentArray} from '../../data/products/kitchenCookingEquipments'
import {steamCookingEquipmentArray} from '../../data/products/steamCookingEquipments'
import {kitchenMachinesArray} from '../../data/products/kitchenMachines'
import {refrigenatorDatas} from '../../data/products/Refrigenator'
import {canteenEquipments} from '../../data/products/canteenEquipments'
import {kitchenTrolleys} from '../../data/products/kitchenTrolleys'
import {washEquipments} from '../../data/products/washEquipmemts'
import {exhaustArray} from '../../data/products/kitchenExhaust'
import {bakeryEquipments} from '../../data/products/bakeryEquipments'
import {customizeFabrication} from '../../data/products/customizedFabrication'
import {diningTableArray} from '../../data/products/diningTable'

import { useParams } from 'next/navigation';
import MainpdctPage from '../../components/MainpdctPage';




 function page() {
  const params= useParams();
  const slug=params?.slug



  const allProducts=[
    ...kitchenStorageEquipmentArray,
    ...kitchenPreparationEquipmentArray,
    ...kitchenCookingEquipmentArray,
    ...steamCookingEquipmentArray,
    ...kitchenMachinesArray,
    ...refrigenatorDatas,
    ...canteenEquipments,
    ...kitchenTrolleys,
    ...washEquipments,
    ...exhaustArray,
    ...bakeryEquipments,
    ...customizeFabrication,
    ...diningTableArray
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