import Controller from '@ember/controller';

export default Controller.extend({
    //session: Ember.inject.service(),

    cerrarSesion: function() {
        //this.get('session').close();
        this.transitionToRoute('login');
      }
});
