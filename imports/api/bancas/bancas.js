export const Bancas = new Mongo.Collection('bancas');
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
	addBanca: function (banca,login) {
		var userId = Accounts.createUser(login);
		if (userId) {
			banca.adminId = userId;
			Bancas.insert(banca);
			return true;
		}else {
			return false;
		}
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