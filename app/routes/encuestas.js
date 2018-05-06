import Ember from 'ember';
import {inject as service} from "@ember/service";
import { isBlank } from '@ember/utils';

export default Ember.Route.extend({
	session: service(),
    currentUser: service(),

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
