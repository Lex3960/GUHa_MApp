import DS from 'ember-data';

export default DS.Model.extend({
    titulo: DS.attr('string'),
    descripcion: DS.attr('string'),
    fechaCierre: DS.attr('string'),

    unidadHab: DS.belongsTo('unidad-hab'),
    administrador: DS.belongsTo('admin'),

    preguntas: DS.hasMany('pregunta')
});
