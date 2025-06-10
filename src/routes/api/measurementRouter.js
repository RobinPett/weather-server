/**
 * @file Measurement router.
 * @module router
 * @author Robin Pettersson
 */

import express from 'express'

export const router = new express.Router()

router.use('/', async (req, res) => {
    console.log('Initializing measurement controller...')
    const measurementController = req.container.resolve('MeasurementController')
    const measurements = await measurementController.getMeasurements(req, res)
    res.json(measurements)
})