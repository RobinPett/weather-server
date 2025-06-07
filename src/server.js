/**
 * @file Main server file.
 * @module server
 * @author Robin Pettersson
 */

import express from 'express'
import { router } from './routes/router.js'
import { container } from './config/bootstrap.js'

const app = express()

try {
  // Set up baseURL
  const baseURL = process.env.BASE_URL || '/'

  app.set('trust proxy', 1)

  // Set IoC container
  app.set('container', container)

  // Middleware to be executed before routes
  app.use((req, res, next) => {

    // Add container to request
    req.container = container

    // Base URL to views
    res.locals.baseURL = baseURL

    next()
  })

  app.use('/', router)

  // Error handling
  app.use((error, req, res, next) => {
    console.error(error)
    
    // 404
    if (error.status === 404) {
      res
        .status(404)
        .json({ message: 'Page not found' })
    }

    // All other errors are - 500 - Internal server error
    if (process.env.NODE_ENV === 'production') {
      res
        .status(500)
        .json({ message: 'Internal server error' })
    }
  })

  const server = app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${server.address().port}`)
    console.log('Press Ctrl-C to terminate...')
  })
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}

export default app