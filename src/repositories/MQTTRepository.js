/**
 * @file Base class for MQTTRepository
 * @module MQTTRepository
 * @author Robin Pettersson
 */

import { MQTTListener } from '../lib/MQTTListener.js'

/**
 * Class representing a MQTT repository.
 */
export class MQTTRepository {
  #mqttListener

  /**
   * Initializes the MQTT repository.
   */
  constructor(MQTTListener = new MQTTListener()) {
    this.#mqttListener = MQTTListener
  }

  subscribe(topic, callback) {
    this.#mqttListener.subscribe(topic, callback)
  }
}
