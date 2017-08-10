
import 'babel-polyfill';
import style from './style/index.css';
// import './style/less.less';
import angular from 'angular';
import mathController from './math.controller';
import mathService from './math.service';

console.log(style)

angular.module('app', [])
    .controller('mathController', mathController)
    .service('mathService', mathService); 