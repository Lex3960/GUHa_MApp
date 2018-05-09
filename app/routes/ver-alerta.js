import Route from '@ember/routing/route';

export default Route.extend({
	// El modelo de esta vista es la alerta existente
	model(params) {
        return this.store.findRecord('alert', params.id)
    },
});
