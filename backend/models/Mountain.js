const mongoose = require('mongoose');

const mountainSchema = new mongoose.Schema({
    mountainName: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    nameEnglish: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    slopes: [{
        slopeName: {
            type: String
        },
        isOpen: {
            type: Boolean
        },
        skillLevel: {
            type: String
        },
        length: {
            type: Number
        }
    }],
    restaurants: [{
        restaurantName: {
            type: String
        },
        cuisineType: {
            type: String
        }, 
        nearestSlope: {
            type: String
        }, 
        googleMapsLink: {
            type: String
        }
    }],
    accomodation: [{
        accommodationName: {
            type: String
        },
        accomodationType: {
            type: String
        },
        nearestSlope: {
            type: String
        },
        googleMapsLink: {
            type: String
        }
    }],
    parkings: [{
        parkingName: {
            type: String
        },
        nearestSlope: {
            type: String
        },
        isFree: {
            type: Boolean
        },
        googleMapsLink: {
            type: String
        }
    }]
});

module.exports = mongoose.model('Mountain', mountainSchema);