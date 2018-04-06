import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {isBlank} from '@ember/utils';

export default Controller.extend({
    session: service(),
    firebase: service('firebaseApp'),

    actions: {
        iniciarSesion(){
            let email = this.get('email');
            if (isBlank( this.get('email') ) ){
                window.Materialize.toast('Introduce tu correo electrónico', 3000);
				return;
			}
            let password = this.get('password');
            if (isBlank( this.get('password') ) ){
                window.Materialize.toast('Introduce tu contraseña', 3000);
				return;
			}

            this.get('session').open('firebase', {
                provider: 'password',
                email: email,
                password: password
            }).then(()=> {
                this.get('session').fetch().then(()=>{
                    window.Materialize.toast('Bienvenido', 3000);
                    this.transitionToRoute('dashboard');
                }).catch(()=>{
                    window.Materialize.toast('Bienvenido', 3000);
                    this.transitionToRoute('dashboard');
                });  
            }).catch((error)=> {
                //console.log(error);
            });
        }
    }
  
});
