
const MqttData=require('../models/mqttModel');

exports.createMqtt=async(topic,message,dateTime)=> {
    //-------Creation --------
  let data={
    topic:topic,
    payload:message,
    datetime:dateTime
  }
  try{
    const saved = await MqttData.createmqtt(data)
    console.log('created ');

  }catch (err){
    console.log(err)
  }


}
exports.listPlate=async (req,res)=>{
  await MqttData.find()
      .then(things => res.status(200).json(MqttData))
      .catch(error => res.status(400).json({ error }));
  console.log(MqttData);
}