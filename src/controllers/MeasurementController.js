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
    this._measurementService.saveMeasurement(sensorType, data)
    console.log(`Received ${sensorType} data:`, data)
  }

  async getMeasurements(req, res) {
    return await this._measurementService.getMeasurements()
  }
}