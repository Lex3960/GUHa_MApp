import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
    session: service(),

    actions: {
    cerrarSesion: function() {
    	window.Materialize.toast('¡Hasta la próxima!', 2000);
        this.get('session').close();
        this.transitionToRoute('login');
      }
    }
});
