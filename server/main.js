import { Meteor } from 'meteor/meteor';
// API
import '../imports/api/jogos/jogos.js';
import '../imports/api/bancas/bancas.js';
import '../imports/api/apostas/apostas.js';

import { Jogos } from '../imports/api/jogos/jogos.js';

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
  },
  addOperador: function (op,login) {
    op.tipo = 'operador';
    var userId = Accounts.createUser(login);
    Meteor.users.update({_id: userId},{
      $set: op
    })
    return true;
  },
   removeOperador: function (id) {
    Meteor.users.remove({_id: id});
    return true;
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
      json[i].bancaId = Meteor.user().bancaId;
    }
    json.splice(0,1);
    Jogos.remove({bancaId: Meteor.user().bancaId})
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

Meteor.publish('bancaId', function() {
  if(!this.userId) return null;
  return Meteor.users.find(this.userId, {fields: {
    bancaId: 1,
  }});
});

Meteor.publish('users', function() {
  var user = Meteor.users.findOne({_id: this.userId});
  return Meteor.users.find({bancaId: user.bancaId});
});

