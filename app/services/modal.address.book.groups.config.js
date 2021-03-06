"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function modalAddressBookGroupsConfig() {
    return ['$uibModal', (function ($uibModal) {
            var ctrl = ['$scope',
                '$q',
                '$stateParams',
                'daoGroupsService',
                'data',
                'toaster',
                function ($scope, $q, $stateParams, daoGroupsService, data, toaster) {
                    var key = 'myController';
                    var zpriv = {};
                    var myscope = $scope[key] = (function ($scope) {
                        return {
                            loadInProgress: false,
                            data: angular.copy(data) || {},
                            isInEdition: angular.isObject(data),
                            isInCreation: !angular.isObject(data)
                        };
                    })($scope);
                    (function () {
                        myscope.loadInProgress = true;
                        $q.resolve(null)
                            .then(function () { return daoGroupsService.getExtended(zpriv.getContext()); })
                            .then(function (response) {
                            myscope.groupsList = response.data;
                            if (myscope.isInCreation) {
                                myscope.data.id = myscope.groupsList.length + 1;
                            }
                        })
                            .finally(function () { myscope.loadInProgress = false; });
                    })();
                    myscope.actionConfigGroup = function () {
                        var promise = null;
                        myscope.loadInProgress = true;
                        if (myscope.isInCreation) {
                            promise = daoGroupsService.create(zpriv.getContext(), myscope.data);
                        }
                        else {
                            promise = daoGroupsService.config(zpriv.getContext(), myscope.data);
                        }
                        return promise.then(function (response) {
                            if (response.success == true) {
                                if (myscope.isInCreation) {
                                    toaster.success("Success", "Group successfully created");
                                }
                                else {
                                    toaster.success("Success", "Group successfully updated");
                                }
                                return $scope.$close(myscope.data);
                            }
                            else {
                                toaster.error("Error", "It was not possible to configure the contact group. Please try again");
                            }
                        }).finally(function () { myscope.loadInProgress = false; });
                    };
                    zpriv.getContext = function () {
                        return {
                            candidate: $stateParams.candidate,
                            addressBookId: $stateParams.addressBookId
                        };
                    };
                }];
            return function (data) {
                return $uibModal.open({
                    controller: ctrl,
                    backdrop: 'static',
                    template: require('./modal.address.book.groups.config.tpl.html'),
                    resolve: {
                        data: [function () { return data; }]
                    }
                }).result;
            };
        })];
}
exports.default = modalAddressBookGroupsConfig;
;
