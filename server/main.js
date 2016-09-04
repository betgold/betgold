import { Meteor } from 'meteor/meteor';
// API
import '../imports/api/jogos/jogos.js';
import '../imports/api/operadores/operadores.js';
import '../imports/api/bancas/bancas.js';
Meteor.startup(() => {
 UploadServer.init({
  tmpDir: process.env.PWD + '/.uploads/tmp',
  uploadDir: process.env.PWD + '/.uploads/',
    checkCreateDirectories: true //create the directories for you
  });
});

Meteor.methods({
  isAdmin: function () {
  	var admin =  Meteor.users.findOne({_id: Meteor.userId()});
  	if (admin.admin) {
  		return true;
  	}else {
  		return false;
  	}

  },
  getUser: function () {
    return Meteor.users.findOne({_id: Meteor.userId()});
  }
});


Meteor.methods({
  convert: function (doc) {

    var fs = Npm.require('fs');
    var path = Npm.require('path');
    var basepath = path.resolve('.').split('.meteor')[0];
    var excel = new Excel('xlsx');
    var jogos = excel.readFile(doc);
    var page = jogos.SheetNames;
    var sheet = jogos.Sheets[page[0]];
    var options = {};
    var json = excel.utils.sheet_to_json( sheet, options );
    for (var i = 0; i < json.length; i++) {
        var times = json[i].Jogo.split(" x ");
        json[i].casa = times[0];
        json[i].fora = times[1];
        delete json[i].Jogo;
    }
    return json;
  }
})