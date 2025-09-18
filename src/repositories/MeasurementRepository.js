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
  #model

  /**
   * Initializes the measurement repository.
   * @param {mongoose.Model} model  The mongoose model
   */
  constructor(model) {
    console.log('Calling Measurement repository with model:', model.modelName)
    super(model)
    this.#model = model
  }

    /**
     * Get aggregated measurements by groupBy (hour, day, etc).
     * @param {object} filter - MongoDB filter for date range, sensorId, etc.
     * @param {object} options - { skip, limit, groupBy }
     * @returns {Promise<object[]>}
     */
    async getAggregatedMeasurements(filter = {}, options = {}) {
      try {
        const { skip, limit, groupBy = 'hour' } = options;
        const matchStage = Object.keys(filter).length ? { $match: filter } : null;
        const pipeline = [];
        if (matchStage) pipeline.push(matchStage);

        // Build group _id dynamically
        let groupId = { sensorId: "$sensorId" };
        if (groupBy === 'hour') {
          groupId = {
            ...groupId,
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
            hour: { $hour: "$createdAt" }
          };
        } else if (groupBy === 'day') {
          groupId = {
            ...groupId,
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" }
          };
        } else if (groupBy === 'month') {
          groupId = {
            ...groupId,
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          };
        }

        pipeline.push({
          $group: {
            _id: groupId,
            sensorId: { $first: "$sensorId" },
            createdAt: { $first: "$createdAt" },
            updatedAt: { $first: "$updatedAt" },
            temperature: { $avg: "$temperature" },
            humidity: { $avg: "$humidity" },
            count: { $sum: 1 }
          }
        });

        // Build sort dynamically
        let sortStage = {};
        if (groupBy === 'hour') {
          sortStage = { "_id.year": 1, "_id.month": 1, "_id.day": 1, "_id.hour": 1 };
        } else if (groupBy === 'day') {
          sortStage = { "_id.year": 1, "_id.month": 1, "_id.day": 1 };
        } else if (groupBy === 'month') {
          sortStage = { "_id.year": 1, "_id.month": 1 };
        }
        pipeline.push({ $sort: sortStage });

        if (skip) pipeline.push({ $skip: skip });
        if (limit) pipeline.push({ $limit: limit });
        const results = await this.#model.aggregate(pipeline).exec();
        return results;
      } catch (error) {
        throw new RepositoryError('Failed to get aggregated measurements: ' + error);
      }
    }
}
