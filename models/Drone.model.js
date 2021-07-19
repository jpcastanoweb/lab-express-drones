// Iteration #1

/* 
    IMPORTACIONES
*/

const mongoose = require("mongoose")
const Schema = mongoose.Schema

/* 
    SCHEMA
*/

const droneSchema = new Schema({
  name: String,
  propellers: Number,
  maxSpeed: Number,
})

/* 
    MODEL
*/

const Drone = mongoose.model("Drone", droneSchema)

/* 
    EXPORTS
*/
module.exports = Drone
