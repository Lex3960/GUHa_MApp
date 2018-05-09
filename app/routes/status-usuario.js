import Route from '@ember/routing/route';

export default Route.extend({
	// El modelo de esta vista es el usuario
	model(params) {
        return this.store.findRecord('settler', params.id)
    },
});
