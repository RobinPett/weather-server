/**
 * @file Main api router.
 * @module router
 * @author Robin Pettersson
 */

import express from 'express'
import { router as sensorRouter } from './sensorRouter.js'

export const router = new express.Router()

router.use('/sensors', sensorRouter)

router.use('/', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  })
})