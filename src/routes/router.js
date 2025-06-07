/**
 * @file Main router.
 * @module router
 * @author Robin Pettersson
 */

import express from 'express'
import createHttpError from 'http-errors'
import { router as v1Router } from './api/router.js'

export const router = new express.Router()

router.use('/api', v1Router)

// Catch 404
router.use('*', (req, res, next) => {
  const error = createHttpError(404)
  next(error)
})