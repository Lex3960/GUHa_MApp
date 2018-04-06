import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        saveSolicitud(solicitud){
            solicitud.save().then(()=>{
                // window.swal(
                //     'Solicitud enviada',
                //     'Aprobación en espera',
                //     'success'
                // ).then(()=>{
                    this.transitionToRoute('solicitudes');
                })
            // })
        }
    }
});
