import Ember from 'ember';
import {inject as service} from "@ember/service";
import { isBlank } from '@ember/utils';

export default Ember.Route.extend({
	session: service(),
    currentUser: service(),

		  // Si la sesión no está iniciada, Transición a la pantalla de inicio
    beforeModel(){
    	this.get('currentUser.account').then((account)=>{
       		// console.log(account)
       		// debugger
       		if(isBlank(account)){
         	// debugger
         		if(this.get('session.isAuthenticated')){
            	 	this.get('session').close();
         		}
         		this.transitionTo('login')
       		}
     	})
   	},

		// El modelo de esta vista es la lista de encuestas del usuario
   	model() {
     	return this.get('currentUser.account').then((account)=>{
       		return this.get('store').findRecord('settler', account.get('id')).then((theSettler)=>{
         		return theSettler.get('encuestas').then((surveyList)=>{
           			return surveyList
         		})
       		})
     	})
   	}


});
