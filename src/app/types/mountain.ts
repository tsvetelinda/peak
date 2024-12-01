import { Slope } from "./slope";

export interface Mountain {
    "_id": string;
    "mountainName": string;
    "imageUrl": string;
    "description": string;
    "slopes": Slope[],
    "__v": number;
}