import Ember from 'ember';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';
import DS from 'ember-data';
import moment from 'moment';

export default Ember.Controller.extend({
	currentUser: service(),
    store: service(),
    selectedRespuesta: null,
    selectedIndex: null,

    respuestas: computed('model', function(){
    	let num = this.get('model.encuestaBase.preguntas.length')
    	let newArr = new Array(num)
    	return newArr
    }),


    actions: {
    	changeRespuesta(fullRespuesta){
    		let cRespuestas =  this.get('respuestas')
    		cRespuestas[fullRespuesta.indexPregunta] = fullRespuesta
    	},

    	responderEncuesta(encuesta){
    		let answers = this.get('respuestas');
    		answers.forEach((answer)=>{
    			this.get('store').findRecord('answer', answer.idRespuesta).then((respuesta)=>{
    				this.get('store').createRecord('question', {
    					contenido: answer.contentPregunta
    				}).save().then((record)=>{
    					record.get('respuestas').then((answerList)=>{
    						answerList.pushObject(respuesta);
    						answerList.save();
    					})
    					record.save();
    					encuesta.get('preguntas').then((questionList)=>{
    						questionList.pushObject(record)
    						questionList.save().then(()=>{
    							encuesta.save();
    						})
    					})
    				})
    			})
    		})
    		encuesta.set('respondida', true)
    		encuesta.set('fechaRespuesta', moment())
    		encuesta.save().then(()=>{
    			this.transitionToRoute('encuestas');
    		})
    	}
    }
});
