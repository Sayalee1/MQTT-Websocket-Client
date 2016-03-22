# MQTT-Websocket-Client
# Instructions to create MQTT Broker on Linux (Ubuntu):
1. If you are using AWS, open ports 1883 for mqtt and 8001/9000/9001 for websockets
2. sudo apt-add-repository ppa:mosquitto-dev/mosquitto-ppa 
3. sudo apt-get update 
4. sudo apt-get install mosquitto 
5. sudo service mosquitto status
6. Edit /etc/mosquitto/mosquitto.conf and add following:
    listener 1883
    listener 8001
    protocol websocket
7. mosquitto -c /etc/mosquitto/mosquitto.conf

