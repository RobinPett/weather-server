/**
 * @file Base class for MeasurementRepository
 * @module MeasurementRepository
 * @author Robin Pettersson
 */

import mongoose from 'mongoose'
import { MongooseRepositoryBase } from './MongooseRepositoryBase.js'

/**
 * Class representing a Measurement repository.
 */
export class MeasurementRepository extends MongooseRepositoryBase {

  /**
   * The mongoose model
   * 
   * @type {mongoose.Model}
   */
  #model

  /**
   * Initializes the measurement repository.
   * @param {mongoose.Model} model  The mongoose model
   */
  constructor(model) {
    super(model)
    this.#model = model
  }
}
