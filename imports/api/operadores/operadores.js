import { Bancas } from '../bancas/bancas.js';
export const Operadores = new Mongo.Collection('operadores');

Meteor.methods({
	addOperador: function (op,login) {
		Accounts.createUser(login);
		 var bancaId = Bancas.findOne({userId: Meteor.userId()}, {_id: 1});
		 op.bancaId = bancaId._id;
		if (bancaId ) {
			Operadores.insert(op);
			return true;
		}else {
			return false;
		}
	}
});