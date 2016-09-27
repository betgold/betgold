export const Bancas = new Mongo.Collection('bancas');
import { Accounts } from 'meteor/accounts-base';

BancaSchema = new SimpleSchema({
	nome:{
		type: String,
		label: "Nome"
	},
	endereco:{
		type: String,
		label: "Endereço",
		optional: true,
	},
	cidade:{
		type: String,
		label: "Cidade",
		optional: true,
	},
	uf:{
		type: String,
		label: "Estado",
		optional: true,
	},
	regiao:{
		type: String,
		label: "Região",
		optional: true,
	},
	credMax:{
		type: Number,
		decimal: true,
		label: "Crédito Máximo"
	},
	whats:{
		type: String,
		label: "WhatsApp",
		optional: true,
	},
	telegram:{
		type: String,
		label: "Telegram",
		optional: true,
	},
	fixo:{
		type: String,
		label: "Telefone",
		optional: true,
	},
	email:{
		type: String,
		label: "Email",
		optional: true,
	},
	obs:{
		type: String,
		label: "Observação",
		optional: true,
	},
	adminId:{
		type: String,
		label: "Admin"
	},
	criadoEm:{
		type: Date,
		label: "Criado Em",
		autoValue: function () {
			return new Date()
		}
	},
	autor:{
		type: String,
		label: "Autor",
		autoValue: function () {
			return this.userId
		}
	}
});

// Bancas.attachSchema( BancaSchema );

if(Meteor.isServer){
	Meteor.publish('bancas', function() {
		var user = Meteor.users.findOne({_id: this.userId});
		return Bancas.find({_id: user.bancaId});
	});
	Meteor.publish('bancasAll', function() {
		var user = Meteor.users.findOne({_id: this.userId});
		if (user.admin) {
			return Bancas.find();
		}
	});
}

Meteor.methods({
	addBanca: function (banca,login) {
		var userId = Accounts.createUser(login);
		banca.jogos = [];
		banca.criandoEm = new Date();
		banca.autor = Meteor.userId();
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
	}
});