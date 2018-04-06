import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
    session: service(),

    actions: {
    cerrarSesion: function() {
        this.get('session').close();
        this.transitionToRoute('login');
      }
    }
});
