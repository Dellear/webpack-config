
/**@ngInject */
export default class MathController {
    constructor($scope, mathService) {
        this.$scope = $scope;
        this.mathService = mathService;
        this.init();
    }

    init() {
        this.mathService.getData().then(res => {
            this.$scope.a = res.data.a;
            this.$scope.b = res.data.b;
            this.$scope.c = this.mathService.plus(this.$scope.a, this.$scope.b);
        });
    }
}