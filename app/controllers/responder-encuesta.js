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

		// Creando un arreglo donde se guardan las posibles respuestas a cada pregunta, de acuerdo con la encuesta base
    respuestas: computed('model', function(){
    	let num = this.get('model.encuestaBase.preguntas.length')
    	let newArr = new Array(num)
    	return newArr
    }),

    actions: {
			// Cambiando respuesta a la pregunta
    	changeRespuesta(fullRespuesta){
    		let cRespuestas =  this.get('respuestas')
    		cRespuestas[fullRespuesta.indexPregunta] = fullRespuesta
    	},

    	responderEncuesta(encuesta){
				// Obteniendo las encuestas guardadas localmente
    		let answers = this.get('respuestas');
				// Por cada pregunta, guardando respuesta
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
								// Guardando preguntas
    						questionList.pushObject(record)
    						questionList.save().then(()=>{
    							encuesta.save();
    						})
    					})
    				})
    			})
    		})
				// Guardando la fecha de respuesta
    		encuesta.set('respondida', true)
    		encuesta.set('fechaRespuesta', moment())
    		encuesta.save().then(()=>{
					// Transición a la pantalla de encuestas
    			this.transitionToRoute('encuestas');
    		})
    	}
    }
});
