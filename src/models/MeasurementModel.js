/**
 * @file MeasurementModel
 * @module MeasurementModel
 * @author Robin Pettersson
 */

import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'

// Create the schema
const schema = new mongoose.Schema({
  temperature: { type: Number, required: true, min: -100, max: 100 },
  humidity: { type: Number, required: true, min: 0, max: 100 },
  sensorId: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now, expires: '30d' }
})

schema.add(BASE_SCHEMA)
schema.index({ createdAt: 1 })


export const MeasurementModel = mongoose.model('Measurement', schema)
