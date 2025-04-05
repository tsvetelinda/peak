import { SkiPass } from "./skiPass";

export interface User {
    "_id": string;
    "firstName": string;
    "lastName": string;
    "email": string;
    "birthDate": Date;
    "phone": string;
    "sport": string;
    "skillLevel": string;
    "skiPasses": SkiPass[];
}

export interface ProfileDetails {
    "firstName": string;
    "lastName": string;
    "email": string;
    "birthDate": string;
    "phone": string;
    "sport": string;
    "skillLevel": string;
}