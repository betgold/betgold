import { Meteor } from 'meteor/meteor';
// API
import '../imports/api/jogos/jogos.js';
import '../imports/api/operadores/operadores.js';
import '../imports/api/bancas/bancas.js';
Meteor.startup(() => {
  
});

Meteor.methods({
  isAdmin: function () {
  	var admin =  Meteor.users.findOne({_id: Meteor.userId()});
  	if (admin.admin) {
  		return true;
  	}else {
  		return false;
  	}
    
  }
});