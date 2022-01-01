const mongoose = require("mongoose");

const mqttSchema = new mongoose.Schema({
  datetime: String,
  topic: String,
  payload: String,
});

mqttSchema.statics.createmqtt = async (infos) => {
  const mqtt = new mongoose.model("MqttData", mqttSchema)(infos);
  return await mqtt.save();
};

module.exports = mongoose.model("MqttData", mqttSchema);
