(function($angular) {
    $angular.module('dashboard').component('ctTable', {
        bindings: {
            data: '<',
            enableSelect: '<',
            onRowSelection: '&'
        },
        templateUrl: 'components/ctTable.html',
        controller: function(
            dataService
        ) {
            var $ctrl = this;
            $ctrl.gridOptions = {};
            $ctrl.title;

            var previousSelected;

            $ctrl.$onChanges = function(changes) {
                $ctrl.data = changes.data.currentValue || [];
                // $ctrl.showFilter = changes.showFilter.currentValue || [];

                $ctrl.gridOptions.data = $ctrl.data.tableData;
                $ctrl.title = $ctrl.data.title;
            };

            $ctrl.gridOptions.multiSelect = false;
            $ctrl.gridOptions.modifierKeysToMultiSelect = false;
            $ctrl.gridOptions.enableFiltering = true;
            $ctrl.gridOptions.enableSelectionBatchEvent = false;
            $ctrl.gridOptions.noUnselect = true;
            $ctrl.gridOptions.onRegisterApi = function(gridApi) {
                $ctrl.gridApi = gridApi;
                gridApi.selection.on.rowSelectionChanged(null, onSelection);
            };

            function onSelection(row) {
                if (!$ctrl.enableSelect ||
                    previousSelected && previousSelected.id === row.entity.id) {
                    return;
                }

                previousSelected = $angular.copy(row.entity);
                $ctrl.onRowSelection({entity: row.entity});
            }
        }
    });
})(window.angular);
