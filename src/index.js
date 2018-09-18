
import 'babel-polyfill';
import './style/index.css';
// import './style/less.less';
import angular from 'angular';
import mathController from './math.controller';
import mathService from './math.service';

console.log(mathController, mathService);

angular.module('app', [])
    .controller('mathController', mathController)
    .service('mathService', mathService);

const aa = 3;
const nn = 5;

const obj = {
    [aa]: {
        [nn]: 55
    },
    [nn]: nn
};

console.log(obj);