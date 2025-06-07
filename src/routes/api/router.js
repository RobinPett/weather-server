/**
 * @file Main api router.
 * @module router
 * @author Robin Pettersson
 */

import express from 'express'

export const router = new express.Router()

// router.use('/auth', authRouter)
router.use('/', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  })
})