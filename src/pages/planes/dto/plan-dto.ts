import { CategoryType } from "../types/category-type"
import { AdditionalServiceDto } from "./AdditionalService-dto"

export interface PlanDto{
    id:number
    description : string
    duration:string
    price:number
    name:string 
    cuantity:number
    imgPath:string
    category: CategoryType
    additionalServicesId : number[]
    additionalServices : AdditionalServiceDto[]
}