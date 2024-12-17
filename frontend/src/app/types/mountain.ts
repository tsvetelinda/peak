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
    "restaurantsVisible": boolean;
    "slopesVisible": boolean;
    "hotelsVisible": boolean;
    "parkingVisible": boolean;
    "__v": number;
}