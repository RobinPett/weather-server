/**
 * @file Class for measurement service
 * @module MeasurementService
 * @author Robin Pettersson
 */

/**
 * Class representing a measurement service.
 */
export class MeasurementService {
    _repository
    _mqttService
    _measurementBuffer = {}

    static topics = {
        TEMPERATURE: "rp222nc/temperature",
        HUMIDITY: "rp222nc/humidity",
    }

    constructor(repository, mqttService) {
        this._repository = repository
        this._mqttService = mqttService
    }

    subscribeToAll(callback) {
        this._mqttService.subscribe(MeasurementService.topics.TEMPERATURE, (message) => {
            callback("temperature", message)
        })
        this._mqttService.subscribe(MeasurementService.topics.HUMIDITY, (message) => {
            callback("humidity", message)
        })
    }

    getMeasurements({filters = {}, page = 1, limit = 10} = {}) {
        const skip = (page - 1) * limit

        // Aggregate amount of measurements
        return this._repository.get(filters, {}, {limit, skip})
    }

    getAggregatedMeasurements({filters = {}, page = 1, limit = 10, groupBy} = {}) {
        const skip = (page - 1) * limit

        // Aggregate hourly measurements
        return this._repository.getAggregatedMeasurements(filters, { skip, limit, groupBy });
    }

    async saveMeasurement(sensorType, data, sensorId = 'default') {
        if (!this._measurementBuffer[sensorId]) {
            this._measurementBuffer[sensorId] = {}
        }
        this._measurementBuffer[sensorId][sensorType] = data
        // If both temperature and humidity are available, save the measurement
        if (this._measurementBuffer[sensorId].temperature && this._measurementBuffer[sensorId].humidity) {
            const doc = {
                temperature: this._measurementBuffer[sensorId].temperature,
                humidity: this._measurementBuffer[sensorId].humidity,
                sensorId: sensorId,
                createdAt: new Date()
            }
            const result = await this._repository.create(doc)
            // Clear the buffer for this sensorId after saving
            delete this._measurementBuffer[sensorId]
            return result
        }
    }
}
