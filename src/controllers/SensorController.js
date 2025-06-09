/**
 * @file Defines the SensorController class.
 * @module SensorController
 * @author Robin Pettersson
 */

/**
 * Encapsualates a controller.
 */
export class SensorController {
  _mqttService

  constructor(mqttService) {
      this._mqttService = mqttService
  }

  async init() {
    await this._mqttService.subscribeToAll(this.handleSensorData.bind(this))
  }

  /**
   * Subscribes to all sensor topics.
   * @param {Function} callback - The callback function to handle incoming messages.
   */
  async subscribeToAll(callback) {
      await this._mqttService.subscribeToAll(callback)
  }

  /**
   * Handles incoming sensor data.
   * @param {string} sensorType - The type of the sensor (e.g., "temperature", "humidity").
   * @param {string} data - The incoming data from the sensor.
   */
  handleSensorData(sensorType, data) {
      console.log(`Received ${sensorType} data:`, data)
  }
}
