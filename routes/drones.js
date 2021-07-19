const express = require("express")
const router = express.Router()

// require the Drone model here
const Drone = require("./../models/Drone.model")

router.get("/drones", (req, res, next) => {
  // Iteration #2: List the drones

  Drone.find()
    .then((dronesFound) => {
      res.render("drones/list", {
        drones: dronesFound,
      })
    })
    .catch((e) => console.log(e))
})

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form.hbs")
})

router.post("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  const { name, propellers, maxSpeed } = req.body

  Drone.create({ name, propellers, maxSpeed })
    .then((droneCreated) => {
      console.log("Created dron: ", droneCreated)
      res.redirect("/drones")
    })
    .catch((e) => {
      console.log("There was an error", e)
      res.redirect("/drones/create")
    })
})

router.get("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  // const { id } = req.params
  Drone.findById(req.params.id)
    .then((droneFound) => {
      console.log(droneFound)
      res.render("drones/update-form", {
        drone: droneFound,
      })
    })
    .catch((e) => console.log(e))
})

router.post("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params
  const { name, propellers, maxSpeed } = req.body
  Drone.findByIdAndUpdate(id, { name, propellers, maxSpeed })
    .then(() => {
      res.redirect("/drones")
    })
    .catch((e) => {
      console.log("Error happened: ", e)
      res.redirect(`/drones/${id}/edit`)
    })
})

router.post("/drones/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  const { id } = req.params

  Drone.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/drones")
    })
    .catch((e) => console.log(e))
})

module.exports = router
