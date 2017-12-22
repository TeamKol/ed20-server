'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * contains channel schema
 */
var owner = new Schema({
    ownerId: { type: String, required: true, validate: emptyStringValidator },
    ownerName: { type: String, required: true, validate: emptyStringValidator }
});
var editor = new Schema({
    editorId: { type: String, required: true, validate: emptyStringValidator },
    editorName: { type: String, required: true, validate: emptyStringValidator },
    status: { type: Boolean, required: true, default: false }
});
var channel = new Schema({
    channelName: { type: String, required: true, unique: true, validate: emptyStringValidator },
    channelOwner: { type: owner, required: true },
    /* editors: {type:[editor]}, */
    channelDescription: { type: String, default: 'that publishes awesome things' },
    //channelType: {type:String, required: true, enum:['public','paid'], default: 'public'}
});

function emptyStringValidator(val) {
    val = val.trim();
    if (val && val.length >= 4) {
        return true;
    } else {
        return false;
    }
}
module.exports = mongoose.model('channel', channel);
//module.exports = mongoose.model('editor', editor);