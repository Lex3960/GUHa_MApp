import DS from 'ember-data';

export default DS.Model.extend({
    nombre: DS.attr('string'),
    latitud: DS.attr('string'),
    longitud: DS.attr('string'),

    colonos: DS.hasMany('colono'), 
    administradores: DS.hasMany('administrador'),

    servicios: DS.hasMany('servicio'),
    gastos: DS.hasMany('gasto'),

    alertas: DS.hasMany('alerta'),
    solicitudes: DS.hasMany('solicitud'), 
    
    encuestas: DS.hasMany('encuesta'),
});
