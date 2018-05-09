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
        // Estableciendo la fecha de la solicitud con respecto al dato establecido por el usuario
        changeFecha(){
            let fechaUnix=moment().format(event.target.dataset.pick)
            let fechaUtc =moment().utc(fechaUnix).format()
            this.set('model.fecha', fechaUtc)
        },
        // Guardando la solicitud
        saveSolicitud(solicitud){
            // Guardando la unidad en la solicitud
            solicitud.set('unidadHab', this.get('currentUnit'));
            this.get('currentUser.account').then((account)=>{
            this.get('store').findRecord('settler', account.get('id')).then((colono)=>{
              // Guardando el colono en la solicitud
              solicitud.set('colono', colono)
              solicitud.save().then(()=>{
                this.get('currentUnit').then((currentUnit)=>{
                  currentUnit.get('solicitudes').then((requestList)=>{
                    // Guardando la solicitud en la lista de solicitudes de la unidad
                    requestList.pushObject(solicitud)
                    requestList.save().then(()=>{
                      currentUnit.save().then(()=>{
                          colono.get('solicitudes').then((solicitudesList)=>{
                            // Guardando la solicitud en la lista del colono
                            solicitudesList.pushObject(solicitud)
                            solicitudesList.save().then(()=>{
                              colono.save().then(()=>{
                                this.transitionToRoute('solicitudes');
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
