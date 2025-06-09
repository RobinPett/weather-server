/**
 * @file Main api router.
 * @module router
 * @author Robin Pettersson
 */

import express from 'express'

export const router = new express.Router()

router.use('/', async (req, res) => {
    console.log('Initializing sensor controller...')
    const sensorController = req.container.resolve('SensorController')
    await sensorController.init(req, res)
})