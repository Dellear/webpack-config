
import 'babel-polyfill';
import angular from 'angular';
import mathController from './math.controller';
import mathService from './math.service';

angular.module('app', [])
    .controller('mathController', mathController)
    .service('mathService', mathService); 