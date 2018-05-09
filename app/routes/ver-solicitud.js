import Route from '@ember/routing/route';

export default Route.extend({
	// El modelo de esta vista es la solicitud existente
	model(params) {
        return this.store.findRecord('request', params.id)
    },
});
