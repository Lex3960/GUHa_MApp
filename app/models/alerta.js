import DS from 'ember-data';

export default DS.Model.extend({
    titulo: DS.attr('string'),
    tipo: DS.attr('string'),
    descripcion: DS.attr('string'),
    fecha: DS.attr('string'),

    unidadHab: DS.belongsTo('unidad-hab'),
    colono: DS.belongsTo('colono')
});