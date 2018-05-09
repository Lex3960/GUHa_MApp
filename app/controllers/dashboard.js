import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
    session: service(),

    // Cierra la sesión del usuario, con un mensaje de salida
    actions: {
    cerrarSesion: function() {
    	window.Materialize.toast('¡Hasta la próxima!', 2000);
        this.get('session').close();
        this.transitionToRoute('login');
      }
    }
});
