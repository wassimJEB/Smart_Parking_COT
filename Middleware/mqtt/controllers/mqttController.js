
const MqttData=require('../models/mqttModel');

exports.createMqtt=async(topic,message,dateTime)=> {
    //-------Creation --------
  let l =message.toString().split(' ');
  let data={
    topic:topic,
    payload:l[0],
    datetime:dateTime,
    licensePlate:l[1],
    Suspect:l[2]
  }
  try{
    const saved = await MqttData.createmqtt(data)
    console.log('created ');

  }catch (err){
    console.log(err)
  }


}
exports.listPlate=async (req,res)=>{
  console.log('list')
  await MqttData.find({})
      .then(MqttData => res.status(200).json(MqttData))
      .catch(error => res.status(400).json({ error }));

}