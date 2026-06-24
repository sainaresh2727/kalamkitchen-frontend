import {kitchenStorageEquipmentArray} from '../data/products/KitchenStorageEquip'

export function findRelated(pdct:any){
    return kitchenStorageEquipmentArray.filter((x,y)=>{
       return  x.type===pdct.type
    })
}