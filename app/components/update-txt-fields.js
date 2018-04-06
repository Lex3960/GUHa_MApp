import Component from '@ember/component';

export default Component.extend({
    didInsertElement () {
        window.Materialize.updateTextFields();
    }
});
