import Route from '@ember/routing/route';

export default Route.extend({
  // El modelo de esta vista es una nueva solicitud
    model() {
        return this.store.createRecord('request');
    }
});
