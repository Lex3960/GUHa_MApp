import DS from 'ember-data';
import Usuario from './usuario';

export default Usuario.extend({
    unidadHab: DS.belongsTo('unidad-hab'),

    pagos: DS.hasMany('pago'),
    solicitudes: DS.hasMany('solicitud'),
    alertas: DS.hasMany('alerta')
});
