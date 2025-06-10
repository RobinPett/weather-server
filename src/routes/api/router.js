/**
 * @file Main api router.
 * @module router
 * @author Robin Pettersson
 */

import express from 'express'
import { router as measurementRouter } from './measurementRouter.js'

export const router = new express.Router()

router.use('/measurements', measurementRouter)

router.use('/', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  })
})