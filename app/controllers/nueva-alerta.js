import Ember from 'ember';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';
import DS from 'ember-data';

export default Ember.Controller.extend({
  currentUser: service(),
	store: service(),

  currentUnit: computed('store', 'currentUser', function(){
		return DS.PromiseObject.create({
			promise: this.get('currentUser.account').then((account)=>{
				return this.get('store').findRecord('unit', account.get('unidadHab.id')).then(function(theUnit){
					return theUnit;
				})
			})
		});
	}),

  actions: {
      saveAlerta(alerta){
          alerta.set('unidadHab', this.get('currentUnit'));
          this.get('currentUser.account').then((account)=>{
            this.get('store').findRecord('settler', account.get('id')).then((colono)=>{
              alerta.set('colono', colono)
              alerta.save().then(()=>{
                this.get('currentUnit').then((currentUnit)=>{
                  currentUnit.get('alertas').then((alertList)=>{
                    alertList.pushObject(alerta)
                    alertList.save().then(()=>{
                      currentUnit.save().then(()=>{
                          colono.get('alertas').then((alertasList)=>{
                            alertasList.pushObject(alerta)
                            alertasList.save().then(()=>{
                              colono.save().then(()=>{
                                this.transitionToRoute('alertas');
                              })
                            })
                        })
                      })
                    })
                  })
                  })
                })
            })
          })
      }
  }
});
