module.exports={
    urlBd:'mongodb://localhost/ProjectCot',
    permissionLevels : { // on fait des puissaces de deux et donc on peut utiliser les (ou bit à bit) et (et bit à bit )
        // ces fonctions elementaires sont tres peu couteurses
        Master: 8,
        Surfer: 1,
        Member: 107374182
    },
    jwtValidityTimeInSeconds : 1200,
    "port" : 8443,
    // pour l'environnement DevOps
    "normalizePort": function () {
        this.port = process.env.PORT || this.port

    },
    "appEndpoint" : "http://",
    "key_file" : "C:\\Users\\DELL\\example.lcom+5-key.pem",
    "cert_file" : "C:\\Users\\DELL\\example.lcom+5.pem",
    "dh_strongfile" : "C:\\Users\\DELL\\dhparam.pem",
    "refreshSecret": null , // càd ne pas avoir une valeur par defaut , elle se genere dynamiquement, car c'est secret
    "init_refreshSecret": function () {
        this.refreshSectret = this.refreshSectret.concat("$"+new Date(Date.now()).toISOString())
    }, // equivalent à normalize_refreshSecret // init çad sécurité il faut etre exécuté avant launch


}