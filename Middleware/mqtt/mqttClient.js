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
    console.log('got message from topic: ' + topic);
    console.log('the message is: ' + message.toString().split(' ')[0]);
    console.log('the date is: ' + Dt);
    console.log('licensePlate' + message.toString().split(' ')[1]);
    const Suspect=message.toString().split(' ')[1];

    if(Suspect=='Suspect'){
        console.log('ALERTE')
    }
    mqttController.createMqtt(topic,message,Dt);

})