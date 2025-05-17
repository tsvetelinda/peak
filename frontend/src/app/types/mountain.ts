import { Accommodation } from "./accomodation";
import { Parking } from "./parking";
import { Restaurant } from "./restaurant";
import { Slope } from "./slope";

export interface Mountain {
    "_id": string;
    "mountainName": string;
    "nameEnglish": string;
    "imageUrl": string;
    "description": string;
    "slopes": Slope[];
    "restaurants": Restaurant[];
    "parkings": Parking[];
    "accomodation": Accommodation[];
    "restaurantsVisible": boolean;
    "slopesVisible": boolean;
    "hotelsVisible": boolean;
    "parkingVisible": boolean;
    "__v": number;
}