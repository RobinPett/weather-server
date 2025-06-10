/**
 * @file Class for mqtt service
 * @module MQTTService
 * @author Robin Pettersson
 */

/**
 * Class representing a mqtt service.
 */
export class MQTTService {
    _repository

    static topics = {
        TEMPERATURE: "test/temperature",
        HUMIDITY: "test/humidity",
    }

    constructor(repository) {
        this._repository = repository
    }

    subscribe(topic, callback) {
        this._repository.subscribe(topic, callback)
    }
}
