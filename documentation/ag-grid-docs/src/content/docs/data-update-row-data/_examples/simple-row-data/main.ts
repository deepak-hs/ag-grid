import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColDef, GridApi, GridOptions, createGrid } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface ICar {
    make: string;
    model: string;
    price: number;
}

const columnDefs: ColDef<ICar>[] = [{ field: 'make' }, { field: 'model' }, { field: 'price' }];

// specify the data
const rowDataA: ICar[] = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'Aston Martin', model: 'DBX', price: 190000 },
];

const rowDataB: ICar[] = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
    { make: 'BMW', model: 'M50', price: 60000 },
    { make: 'Aston Martin', model: 'DBX', price: 190000 },
];

let gridApi: GridApi<ICar>;

// let the grid know which columns and what data to use
const gridOptions: GridOptions<ICar> = {
    columnDefs: columnDefs,
    rowData: rowDataA,
    rowSelection: 'single',
};

function onRowDataA() {
    gridApi!.setGridOption('rowData', rowDataA);
}

function onRowDataB() {
    gridApi!.setGridOption('rowData', rowDataB);
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
    var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
    gridApi = createGrid(gridDiv, gridOptions);
});
