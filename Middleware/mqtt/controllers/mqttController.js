
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
exports.listPlate=()=>{

}