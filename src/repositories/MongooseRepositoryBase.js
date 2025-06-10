/**
 * @file Base class for MongooseRepositoriy
 * @module MongooseRepositoryBase
 * @author Robin Pettersson
 */

import mongoose from 'mongoose'

// Errors
import { DuplicationError } from '../lib/errors/DuplicationError.js'
import { ValidationError } from '../lib/errors/ValidationError.js'
import { NotFoundError } from '../lib/errors/NotFoundError.js'
import { RepositoryError } from '../lib/errors/RepositoryError.js'

/**
 * Class representing a Mongoose repository base.
 */
export class MongooseRepositoryBase {
  
  /**
   * The mongoose model
   * 
   * @type {mongoose.Model}
   */
  #model

  /**
   * Initializes the mongoose repository.
   * @param {mongoose.Model} model  The mongoose model
   */
  constructor(model) {
    this.#model = model
  }

  /**
   * Get documents.
   *
   * @param {object} filter 
   * @param {object|string|string[]} projection 
   * @param {object} options 
   * @returns {Promise<mongoose.Model[]>}
   */
  async get (filter, projection = null, options = null) {
    try {
      console.log(`Getting ${this.#model.modelName}`)
      const documents = await this.#model
        .find(filter, projection, options)
        .exec()

      if (!documents) throw new NotFoundError('Documents not found')
      return documents
    } catch (error) {
      if (error instanceof NotFoundError) throw error
      throw new RepositoryError('Failed to get documents: ' + error )
    }
  }

  /**
   * Get a single document by id.
   *
   * @param {object} filter 
   * @param {object|string|string[]} projection 
   * @param {object} options 
   * @returns {Promise<mongoose.Model[]>}
   */
  async getById(id, projection = {}, options = {}) {
    try {
      const document = await this.#model
        .findById(id, projection, options)
        .exec()

        if (!document) {
          throw new NotFoundError('Document not found')
        }

        return document
    } catch (error) {
      console.error(error)
      
      if (error instanceof NotFoundError) throw error
      throw new RepositoryError('Failed to get resource')
    }
  }

  /**
   * Creates a new document in the database.
   *
   * @param {object} data 
   * @returns {Promise<mongoose.Model>}
   */
  async create(data) {
    try {
      console.log(`Creating ${this.#model.modelName} in repo: ${data}`)
      return await this.#model.create(data)
    } catch (error) {
      if (error.code === 11000) {
        throw new DuplicationError('Duplicate key error' + JSON.stringify(error.keyValue))
      }

      if (error.name === 'ValidationError') {
        throw new ValidationError('Validation error: ' + error.message)
      }

      throw new RepositoryError('Failed to create document: ' + error)
    }
  }

  /**
   * Delete a document by id.
   *
   * @param {string} id 
   * @returns {string} The id of the deleted document
   */
  async delete (id) {
    try {
      const resourceToDelete = await this.getById({ id }) // Check if document exists before deleting
      console.log(`Deleting ${resourceToDelete}`)
      await this.#model.deleteOne({ _id: id }).exec()
      return id
    } catch (error) {
      if (error instanceof NotFoundError) throw error
      throw new RepositoryError('Failed to delete document: ' + error)
    }
  }

  /**
   * Update a document by id.
   * 
   * @param {string} id 
   * @param {object} data 
   * @returns 
   */
  async update (id, data) {
    try {
      await this.#model.updateOne({ id }, data).exec()
      return this.getById({ id })
    } catch (error) {
      if (error instanceof NotFoundError) throw error
      throw new RepositoryError('Failed to update document: ' + error)
    }
  }
}
