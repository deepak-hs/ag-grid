var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Autowired, Bean, PostConstruct } from "@ag-grid-community/core";
import { BaseCreator } from "./baseCreator";
import { Downloader } from "./downloader";
import { CsvSerializingSession } from "./sessions/csvSerializingSession";
var CsvCreator = /** @class */ (function (_super) {
    __extends(CsvCreator, _super);
    function CsvCreator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CsvCreator.prototype.postConstruct = function () {
        this.setBeans({
            gridSerializer: this.gridSerializer,
            gridOptionsWrapper: this.gridOptionsWrapper
        });
    };
    CsvCreator.prototype.getMergedParams = function (params) {
        var baseParams = this.gridOptionsWrapper.getDefaultExportParams('csv');
        return Object.assign({}, baseParams, params);
    };
    CsvCreator.prototype.export = function (userParams) {
        if (this.isExportSuppressed()) {
            console.warn("AG Grid: Export cancelled. Export is not allowed as per your configuration.");
            return '';
        }
        var mergedParams = this.getMergedParams(userParams);
        var data = this.getData(mergedParams);
        var packagedFile = new Blob(["\ufeff", data], { type: 'text/plain' });
        Downloader.download(this.getFileName(mergedParams.fileName), packagedFile);
        return data;
    };
    CsvCreator.prototype.exportDataAsCsv = function (params) {
        return this.export(params);
    };
    CsvCreator.prototype.getDataAsCsv = function (params, skipDefaultParams) {
        if (skipDefaultParams === void 0) { skipDefaultParams = false; }
        var mergedParams = skipDefaultParams
            ? Object.assign({}, params)
            : this.getMergedParams(params);
        return this.getData(mergedParams);
    };
    CsvCreator.prototype.getDefaultFileName = function () {
        return 'export.csv';
    };
    CsvCreator.prototype.getDefaultFileExtension = function () {
        return 'csv';
    };
    CsvCreator.prototype.createSerializingSession = function (params) {
        var _a = this, columnModel = _a.columnModel, valueService = _a.valueService, gridOptionsWrapper = _a.gridOptionsWrapper;
        var _b = params, processCellCallback = _b.processCellCallback, processHeaderCallback = _b.processHeaderCallback, processGroupHeaderCallback = _b.processGroupHeaderCallback, processRowGroupCallback = _b.processRowGroupCallback, suppressQuotes = _b.suppressQuotes, columnSeparator = _b.columnSeparator;
        return new CsvSerializingSession({
            columnModel: columnModel,
            valueService: valueService,
            gridOptionsWrapper: gridOptionsWrapper,
            processCellCallback: processCellCallback || undefined,
            processHeaderCallback: processHeaderCallback || undefined,
            processGroupHeaderCallback: processGroupHeaderCallback || undefined,
            processRowGroupCallback: processRowGroupCallback || undefined,
            suppressQuotes: suppressQuotes || false,
            columnSeparator: columnSeparator || ','
        });
    };
    CsvCreator.prototype.isExportSuppressed = function () {
        return this.gridOptionsWrapper.isSuppressCsvExport();
    };
    __decorate([
        Autowired('columnModel')
    ], CsvCreator.prototype, "columnModel", void 0);
    __decorate([
        Autowired('valueService')
    ], CsvCreator.prototype, "valueService", void 0);
    __decorate([
        Autowired('gridSerializer')
    ], CsvCreator.prototype, "gridSerializer", void 0);
    __decorate([
        Autowired('gridOptionsWrapper')
    ], CsvCreator.prototype, "gridOptionsWrapper", void 0);
    __decorate([
        PostConstruct
    ], CsvCreator.prototype, "postConstruct", null);
    CsvCreator = __decorate([
        Bean('csvCreator')
    ], CsvCreator);
    return CsvCreator;
}(BaseCreator));
export { CsvCreator };
