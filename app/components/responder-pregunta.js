import Component from '@ember/component';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';
import DS from 'ember-data';
import moment from 'moment';

export default Component.extend({
	actions: {
		// Acción que cambia la respuesta de una pregunta, de acuerdo con el numero de pregunta y el id de la respuesta
		changeRespuesta(respuestaId){
			let respuestaPregunta = {
				idRespuesta: respuestaId,
				indexPregunta: this.get('index'),
				contentPregunta: this.get('pregunta.contenido')
			}
			this.sendAction('changeRespuesta', respuestaPregunta)
		}
	}
});
