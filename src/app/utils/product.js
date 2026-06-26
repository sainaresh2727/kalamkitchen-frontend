import {kitchenStorageEquipmentArray} from '../data/products/KitchenStorageEquip'
import {kitchenPreparationEquipmentArray} from '../data/products/kitchenPreparation'
import {kitchenCookingEquipmentArray} from '../data/products/kitchenCookingEquipments'

const allPdctsArray=[
    ...kitchenStorageEquipmentArray,
    ...kitchenPreparationEquipmentArray,
    ...kitchenCookingEquipmentArray,    
    ]

export function findRelated(pdct){
    return allPdctsArray.filter((x,y)=>{
       return  x.type===pdct.type
    })
}