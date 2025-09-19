import network
import dht
from machine import Pin
from umqtt.robust import MQTTClient
import time
import ssl

#---------------- WIFI ----------------
WIFI_SSID = "Wifi"
WIFI_PASSWORD = "Password"

#---------------- Public MQTT Broker ----------------

MQTT_BROKER = "broker.hivemq.com"
MQTT_PORT = 1883
MQTT_CLIENT_ID = "rp222nc_pico_w_sensor"
MQTT_TOPIC_TEMP = "rp222nc/temperature"
MQTT_TOPIC_HUMID = "rp222nc/humidity"

#---------------- SENSOR DATA ----------------

sensor = dht.DHT22(Pin(4))

#---------------- WIFI CONNECTION ----------------
def connect_wifi():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(WIFI_SSID, WIFI_PASSWORD)
    while not wlan.isconnected():
        print("Connecting to WiFi...")
        time.sleep(1)
    print("Connected to WiFi:", wlan.ifconfig())
    
    
#---------------- MQTT CONNECTION ----------------
def connect_mqtt():
    client = MQTTClient(
        client_id=MQTT_CLIENT_ID,
        server=MQTT_BROKER,
        port=MQTT_PORT,
        keepalive=60
        )
    client.connect()
    print(f"Connected to MQTT Broker at {MQTT_BROKER}")
    return client


#---------------- Send sensor data ----------------
def send_sensor_data(client):
    try:
        sensor.measure()
        temperature = sensor.temperature()
        humidity = sensor.humidity()
        
        print(f"Temperture: {temperature}°C, Humidity: {humidity}%")
        
        client.publish(MQTT_TOPIC_TEMP, str(temperature).encode())
        client.publish(MQTT_TOPIC_HUMID, str(humidity).encode())
    
    except Exception as e:
        print("Sensor Error:", e)
        raise

    
#---------------- MAIN PROGRAM ----------------
connect_wifi()
client = connect_mqtt()

while True:
    try:
        send_sensor_data(client)
    except Exception as e:
        print("MQTT error, reconnecting:", e)
        try:
            client = connect_mqtt()
        except Exception as e2:
            print("Reconnect failed:", e2)
    time.sleep(30)

 