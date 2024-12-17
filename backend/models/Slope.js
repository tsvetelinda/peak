const mongoose = require(mongoose);

const slopeSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('Slope', slopeSchema);