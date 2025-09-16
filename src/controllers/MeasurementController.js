/**
 * @file Defines the MeasurementController class.
 * @module MeasurementController
 * @author Robin Pettersson
 */

/**
 * Encapsualates a controller.
 */
export class MeasurementController {
  _measurementService

  constructor(measurementService) {
    this._measurementService = measurementService
  }

  async init() {
    await this._measurementService.subscribeToAll(this.handleSensorData.bind(this))
  }

  /**
   * Handles incoming sensor data.
   * @param {string} sensorType - The type of the sensor (e.g., "temperature", "humidity").
   * @param {string} data - The incoming data from the sensor.
   */
  handleSensorData(sensorType, data) {
    console.log(`Received ${sensorType} data:`, data)
    this._measurementService.saveMeasurement(sensorType, data)
  }

  async getMeasurements(req, res) {
    const { page = 1, limit, from, to } = req.query
    const filters = {}

    if (from || to) {
      filters.createdAt = {}
      if (from) filters.createdAt.$gte = new Date(from)
      if (to) filters.createdAt.$lte = new Date(to)
    }

    try {
      const measurements = await this._measurementService.getMeasurements({ filters, page: parseInt(page, 10), limit: parseInt(limit, 10) })
      return res.json(measurements)
    } catch (error) {
      console.error('Error fetching measurements:', error)
      res.status(500).json({ error: error.message })
      return
    }
  }
}