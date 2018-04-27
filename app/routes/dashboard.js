import Ember from 'ember';
import {inject as service} from "@ember/service";
import { isBlank } from '@ember/utils';

export default Ember.Route.extend({
    session: service(),
    currentUser: service(),

    beforeModel(){
     this.get('currentUser.account').then((account)=>{
       if(isBlank(account)){
         if(this.get('session.isAuthenticated')){
             this.get('session').close();
         }
         this.transitionTo('login')
       }
     })
     },

     model() {
       return this.get('currentUser.account').then((account)=>{
         //console.log(theUnit)
         return account

       })
     }

});
