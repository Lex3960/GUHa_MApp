import Ember from 'ember';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';
import DS from 'ember-data';
import moment from 'moment';

export default Ember.Controller.extend({
  currentUser: service(),
	store: service(),

  // Obteniendo la unidad de acuerdo al usuario
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
    // Guardando la alerta
      saveAlerta(alerta){
        // Guardando la unidad en la alerta
          alerta.set('unidadHab', this.get('currentUnit'));
          this.get('currentUser.account').then((account)=>{
            this.get('store').findRecord('settler', account.get('id')).then((colono)=>{
              // Guardando el colono en la alerta y estableciendo la fecha de publicación
              alerta.set('colono', colono)
              alerta.set('fecha', moment().format())
              alerta.save().then(()=>{
                this.get('currentUnit').then((currentUnit)=>{
                  currentUnit.get('alertas').then((alertList)=>{
                    // Guardando la alerta en la lista de alertas de la unidad
                    alertList.pushObject(alerta)
                    alertList.save().then(()=>{
                      currentUnit.save().then(()=>{
                          colono.get('alertas').then((alertasList)=>{
                            // Guardando la alerta en la lista de alertas del colono
                            alertasList.pushObject(alerta)
                            alertasList.save().then(()=>{
                              colono.save().then(()=>{
                                // Transición a la pantalla de alertas
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
