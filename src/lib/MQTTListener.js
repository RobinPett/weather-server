/**
 * MQTT Listener Module
 */

import mqtt from "mqtt"

export class MQTTListener {
    #brokerURL
    #clientId
    #client

    constructor() {
        this.#brokerURL = process.env.MQTT_BROKER
        this.#clientId = process.env.MQTT_CLIENT_ID
        this.#client = this.#createClient()
        this.#connect()
    }

    #createClient() {
        return mqtt.connect(this.#brokerURL, {
            clientId: this.#clientId,
            username: process.env.MQTT_USER,
            password: process.env.MQTT_PASS,
        })
    }

    #connect() {
        return new Promise((resolve, reject) => {
            this.#client.on("connect", () => {
                console.log("Connected to MQTT broker")
                resolve()
            })

            this.#client.on("error", (err) => {
                console.error("Connection error:", err)
                reject(err)
            })
        })
    }

    disconnect() {
        return new Promise((resolve, reject) => {
            this.#client.end(false, () => {
                console.log("Disconnected from MQTT broker")
                resolve()
            })

            this.#client.on("error", (err) => {
                console.error("Disconnection error:", err)
                reject(err)
            })
        })
    }

    subscribe(topic, callback) {
        this.#client.subscribe(topic, (err) => {
            if (err) {
                console.error(`Failed to subscribe to topic ${topic}:`, err)
            } else {
                console.log(`Subscribed to topic ${topic}`)
                this.#client.on("message", (receivedTopic, message) => {
                    if (receivedTopic === topic) {
                        callback(message.toString())
                    }
                })
            }
        })
    }
}