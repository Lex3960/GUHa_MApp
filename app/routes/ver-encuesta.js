import Route from '@ember/routing/route';

export default Route.extend({
	// El modelo de esta vista es la encuesta existente
	model(params) {
        return this.store.findRecord('survey', params.id)
    },
});
