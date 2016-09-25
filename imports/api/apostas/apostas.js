export const Apostas = new Mongo.Collection('apostas');

Meteor.methods({
	getApostasInfo: () => {
		var data = new Date();

		var info = {};

		info.apostasHoje = Apostas.find({bancaId: Meteor.user().bancaId}).count();

		return info;
	}
});