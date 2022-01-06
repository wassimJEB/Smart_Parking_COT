# SMART PARKING COT 
## CLoud of things projects 
### Angular + Ionic + Capacitor + ExpressJs + mongoAtlas + mosquitto + azure + namesheap 
ReadMe Smart Parking

2 BRANCHE on github : main and Deployement

Complete Work on Deployement

# FrontEnd : Smart_Programming_Cot folder
run with: ionic serve

## pages : les interfaces : login,signup,settings,map,home,car-list,sensor-details;

## services : communique avec Middleware 
	authService = pour les services auth 
	register ,preSignIn , SignIn , postSignIn,refreshToken
	httpService :Post,GET
	

##guards : sécurité des URLS /
	canactivate()

# Middleware api.wassimjeb.me
run with : nodemon server.js
	ou :sudo pm2 start server.js
  
##  server lancement de serveur
## app : express et middleware d'express

##identity contient le login et signup et PKCE FLOW 
		model + controller + auth
##Mqtt : model + controller + auth : mqttSubscriber /car-list


npm install pm2 -g
sudo pm2 start server.js
sudo pm2 save
sudo pm2 startup
sudo pm2 save --force

## Backend  mqtt.wassimjeb.me
An MQTT broker is a server that receives all messages from the clients and then routes the messages to the appropriate destination clients. An MQTT client is any device (from a micro controller up to a fully-fledged server) that runs an MQTT library and connects to an MQTT broker over a network.
## Raspberry 
## Mqtt Publisher 
pour simuler les requete de Raspberry
### sudo mosquitto_pub -t "test_topic" -m "Message 153tun55785 Suspect" -u mqttCot -P abcd1234$ -h mqtt.wassimjeb.me
Installer Broker Sur Azure :
sudo apt-get update
sudo apt-get install mosquitto
sudo apt-get install mosquitto-clients
mosquitto_sub -t "test"
sudo systemctl restart mosquitto

## Azure VM
On ubuntu : ssh 
=> to connect to my VM
git pull to have last version of project 

Changing port accept only 443 & 80 
and redirection 80 to 443 to work directly on https://


## Security 

To get A+ in ssLab test you should generate certificat fron let'senscrypt on your VM:
https://www.sitepoint.com/how-to-use-ssltls-with-node-js/
git clone https://github.com/certbot/certbot
DOMAIN=wassimjeb.me
cd certbot
certbot certonly --manual -d *.$DOMAIN -d $DOMAIN --agree-tos --manual-public-ip-logging-ok --preferred-challenges dns-01 --server https://acme-v02.api.letsencrypt.org/directory --register-unsafely-without-email --rsa-key-size 4096
after generation privkey.pem ,fullchain.pem
we launch server on https 443 we add this certifications


