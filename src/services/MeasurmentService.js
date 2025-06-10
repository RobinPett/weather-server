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

    static topics = {
        TEMPERATURE: "test/temperature",
        HUMIDITY: "test/humidity",
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
}
