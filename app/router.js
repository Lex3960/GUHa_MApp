import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('signup');
  this.route('dashboard');
  this.route('status-usuario', {path: "/colono/:id"});
  this.route('alertas', function() {});
  this.route('solicitudes', function() {});
  this.route('encuestas', function() {});
  this.route('nueva-alerta');
  this.route('nueva-solicitud');
  this.route('responder-encuesta', {path: "/encuesta/:survey_id"});
  this.route('ver-alerta', {path: "/alerta/:id"});
  this.route('ver-solicitud', {path: "/solicitud/:id"});
  this.route('ver-encuesta', {path: "/encuesta/:id"});
});

export default Router;
