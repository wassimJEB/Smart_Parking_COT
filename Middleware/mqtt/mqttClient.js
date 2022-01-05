const mqtt = require('mqtt')
const mqttController = require('./controllers/mqttController');


const client = mqtt.connect('mqtt://mqtt.wassimjeb.me', {
    username: 'mqttCot',
    password: 'abcd1234$',
    port: 1883
})

client.on('connect', function () {
    console.log('connected :)')
    client.subscribe('test_topic', (err) => {
        if (err) {
            console.log('couldnt subscribe :/');
        }
    })
})

client.on('message', (topic, message) => {
    const Dt = new Date().toISOString();
    mqttController.createMqtt(topic,message,Dt);



    console.log('got message from topic: ' + topic);
    console.log('the message is: ' + message);
    console.log('the date is: ' + Dt);
})