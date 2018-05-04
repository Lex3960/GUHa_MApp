import Ember from 'ember';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';
import DS from 'ember-data';
import moment from 'moment';


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
        changeFecha(){
            let fechaUnix=moment().format(event.target.dataset.pick)
            let fechaUtc =moment().utc(fechaUnix).format()
            this.set('model.fecha', fechaUtc)
        },

        saveSolicitud(solicitud){
            solicitud.set('unidadHab', this.get('currentUnit'));
            this.get('currentUser.account').then((account)=>{
            this.get('store').findRecord('settler', account.get('id')).then((colono)=>{
              solicitud.set('colono', colono)
              solicitud.save().then(()=>{
                this.get('currentUnit').then((currentUnit)=>{
                  currentUnit.get('solicitudes').then((requestList)=>{
                    requestList.pushObject(solicitud)
                    requestList.save().then(()=>{
                      currentUnit.save().then(()=>{
                          colono.get('solicitudes').then((solicitudesList)=>{
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
