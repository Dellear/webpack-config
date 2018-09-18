
import 'babel-polyfill';
import './style/index.css';
// import './style/less.less';
import angular from 'angular';
import MathController from './math.controller';
import MathService from './math.service';

angular.module('app', [])
    .controller('mathController', MathController)
    .service('mathService', MathService);