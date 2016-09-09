export const Bancas = new Mongo.Collection('bancas');
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
	addBanca: function (banca,login) {
		var userId = Accounts.createUser(login);
		if (userId) {
			banca.adminId = userId;
			var bancaId = Bancas.insert(banca);
			Meteor.users.update({_id: userId},{
				$set: {bancaId: bancaId}
			})
			return true;
		}else {
			return false;
		}
	},
	removeBanca (id){
		Meteor.users.remove({_id: id});
		return true;
	},
	addOperador: function (op,login) {
		var userId = Accounts.createUser(login);
		op.userId = userId;
		Bancas.update({userId: Meteor.userId()}, {
			$push: {operadores: op}
		});
		return true;
	}
});