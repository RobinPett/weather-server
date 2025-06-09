/**
 * @file Main api router.
 * @module router
 * @author Robin Pettersson
 */

import express from 'express'

export const router = new express.Router()

router.use('/', async (req, res) => {
    const sensorController = req.container.get('SensorController')
    sensorController.init(req, res)
})