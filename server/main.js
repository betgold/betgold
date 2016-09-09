import { Meteor } from 'meteor/meteor';
// API
import '../imports/api/jogos/jogos.js';
import '../imports/api/operadores/operadores.js';
import '../imports/api/bancas/bancas.js';
// import '../imports/api/files/files.js';

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
     // fs.writeFileSync(basepath+"teste.xlsx", buffer);
     // fs.writeFileSync(basepath+Meteor.userId()+".js", doc, function(err) {
     //      if(err) {
     //        return console.log(err);
     //      }
     //      console.log("The file was saved!");
     //    });   
    var excel = new Excel('xlsx');
    var jogos = excel.readFile(basepath+"table.xlsx");
    var page = jogos.SheetNames;
    var sheet = jogos.Sheets[page[0]];
    var options = { header : ['n', 'Jogo', 'hora' ,'bCasa','emp', 'bFora', 'ma25', 'me25' ] }
    var json = excel.utils.sheet_to_json( sheet, options );
    for (var i = 0; i < json.length; i++) {
      var times = json[i].Jogo.split(" x ");
      json[i].casa = times[0];
      json[i].fora = times[1];
      delete json[i].Jogo;
    }
    json.splice(0,1);
    return json;
  }
})

Files = new Mongo.Collection('files');

Meteor.methods({
  'saveFile': function(buffer){
        // Files.insert({data:buffer})
        var fs = require('fs');
        var path = Npm.require('path');
        var basepath = path.resolve('.').split('.meteor')[0];       
      }   
    });