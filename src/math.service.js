export default class mathService {
    /**@ngInject */
    constructor($http) {
        this.$http = $http;
    }

    plus(num1, num2) {
        // console.log(num1, num2)
        return num1 + num2;
    }

    getData() {
        return this.$http.get('./data.json');
    }
}
