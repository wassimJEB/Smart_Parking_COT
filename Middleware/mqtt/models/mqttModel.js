const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mqttSchema = new Schema({
  datetime: String,
  topic: String,
  payload: String,
  licensePlate:String,

});

mqttSchema.statics.createmqtt = async (infos) => {
  const mqtt = new mongoose.model("MqttData", mqttSchema)(infos);
  return await mqtt.save();
};

mqttSchema.statics.findByPlate = async (licenseplate)=> {
  return mongoose.model('MqttData',mqttSchema).find({
    licenseplate:licenseplate,
  })
}
mqttSchema.statics.findByDate = async (datetime)=> {
  return mongoose.model('MqttData',mqttSchema).find({
    datetime:datetime,
  })
}

module.exports = mongoose.model("MqttData", mqttSchema);
