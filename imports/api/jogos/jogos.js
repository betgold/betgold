export const Jogos = new Mongo.Collection('jogos');

if(Meteor.isServer){
	Meteor.publish('jogos', function() {
		var user = Meteor.users.findOne({_id: this.userId});
		return Jogos.find({bancaId: user.bancaId});
	});
}

Jogos.allow({
	insert: function (userId, doc) {
		return true;
	},
	update: function (userId, doc, fields, modifier) {
		return true;
	},
	remove: function (userId, doc) {
		return true;
	},
});