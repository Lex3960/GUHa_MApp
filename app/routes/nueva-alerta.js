import Route from '@ember/routing/route';

export default Route.extend({
  // El modelo de esta vista es una nueva alerta
  model(){
     return this.get('store').createRecord('alert')
  }
});
