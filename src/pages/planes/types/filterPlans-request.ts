import { AdditionalServiceDto } from "../dto/AdditionalService-dto";
import { PriceRangeDto } from "../dto/priceRange-dto";

export interface FilterPlansRequest{

    service : AdditionalServiceDto
    priceRange : PriceRangeDto
}