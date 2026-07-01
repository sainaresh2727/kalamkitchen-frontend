import {kitchenStorageEquipmentArray} from '../data/products/KitchenStorageEquip'
import {kitchenPreparationEquipmentArray} from '../data/products/kitchenPreparation'
import {kitchenCookingEquipmentArray} from '../data/products/kitchenCookingEquipments'
import {steamCookingEquipmentArray} from '../data/products/steamCookingEquipments'
import {kitchenMachinesArray} from '../data/products/kitchenMachines'
import {refrigenatorDatas} from '../data/products/Refrigenator'
import {canteenEquipments} from '../data/products/canteenEquipments'
import {kitchenTrolleys} from '../data/products/kitchenTrolleys'
import {washEquipments} from '../data/products/washEquipmemts'
import {exhaustArray} from '../data/products/kitchenExhaust'
import {bakeryEquipments} from '../data/products/bakeryEquipments'
import {customizeFabrication} from '../data/products/customizedFabrication'
import {diningTableArray} from '../data/products/diningTable'

const allPdctsArray=[
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

export function findRelated(pdct){
    return allPdctsArray.filter((x,y)=>{
       return  x.type===pdct.type
    })
}