import {kitchenStorageEquipmentArray} from '../data/products/KitchenStorageEquip'
import {kitchenPreparationEquipmentArray} from '../data/products/kitchenPreparation'
import {kitchenCookingEquipmentArray} from '../data/products/kitchenCookingEquipments'
import {steamCookingEquipmentArray} from '../data/products/steamCookingEquipments'
import {kitchenMachinesArray} from '../data/products/kitchenMachines'

const allPdctsArray=[
    ...kitchenStorageEquipmentArray,
    ...kitchenPreparationEquipmentArray,
    ...kitchenCookingEquipmentArray, 
    ...steamCookingEquipmentArray,
    ...kitchenMachinesArray   
    ]

export function findRelated(pdct){
    return allPdctsArray.filter((x,y)=>{
       return  x.type===pdct.type
    })
}