export const Bancas = new Mongo.Collection('bancas');
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
	addBanca: function (banca,login) {
		var userId = Accounts.createUser(login);
		if (userId) {
			banca.userId = userId;
			Bancas.insert(banca);
			return true;
		}else {
			return false;
		}
	}
});