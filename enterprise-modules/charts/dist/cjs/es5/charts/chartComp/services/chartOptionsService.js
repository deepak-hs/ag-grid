"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@ag-grid-community/core");
var ag_charts_community_1 = require("ag-charts-community");
var seriesTypeMapper_1 = require("../utils/seriesTypeMapper");
var ChartOptionsService = /** @class */ (function (_super) {
    __extends(ChartOptionsService, _super);
    function ChartOptionsService(chartController) {
        var _this = _super.call(this) || this;
        _this.chartController = chartController;
        return _this;
    }
    ChartOptionsService.prototype.getChartOption = function (expression) {
        return core_1._.get(this.getChart(), expression, undefined);
    };
    ChartOptionsService.prototype.setChartOption = function (expression, value) {
        var _this = this;
        var chartSeriesTypes = this.chartController.getChartSeriesTypes();
        if (this.chartController.isComboChart()) {
            chartSeriesTypes.push('cartesian');
        }
        // we need to update chart options on each series type for combo charts
        chartSeriesTypes.forEach(function (optionsType) {
            // update options
            var options = core_1._.get(_this.getChartOptions(), "" + optionsType, undefined);
            core_1._.set(options, expression, value);
        });
        // update chart
        this.updateChart();
        this.raiseChartOptionsChangedEvent();
    };
    ChartOptionsService.prototype.getAxisProperty = function (expression) {
        return core_1._.get(this.getChart().axes[0], expression, undefined);
    };
    ChartOptionsService.prototype.setAxisProperty = function (expression, value) {
        var _this = this;
        // update axis options
        var chart = this.getChart();
        chart.axes.forEach(function (axis) {
            _this.updateAxisOptions(axis, expression, value);
        });
        // update chart
        this.updateChart();
        this.raiseChartOptionsChangedEvent();
    };
    ChartOptionsService.prototype.getLabelRotation = function (axisType) {
        var axis = this.getAxis(axisType);
        return core_1._.get(axis, 'label.rotation', undefined);
    };
    ChartOptionsService.prototype.setLabelRotation = function (axisType, value) {
        var chartAxis = this.getAxis(axisType);
        if (chartAxis) {
            this.updateAxisOptions(chartAxis, 'label.rotation', value);
            this.updateChart();
            this.raiseChartOptionsChangedEvent();
        }
    };
    ChartOptionsService.prototype.getSeriesOption = function (expression, seriesType) {
        var series = this.getChart().series.find(function (s) { return ChartOptionsService.isMatchingSeries(seriesType, s); });
        return core_1._.get(series, expression, undefined);
    };
    ChartOptionsService.prototype.setSeriesOption = function (expression, value, seriesType) {
        // update series options
        var options = this.getChartOptions();
        if (!options[seriesType]) {
            options[seriesType] = {};
        }
        core_1._.set(options[seriesType].series, expression, value);
        // update chart
        this.updateChart();
        this.raiseChartOptionsChangedEvent();
    };
    ChartOptionsService.prototype.getPairedMode = function () {
        var optionsType = seriesTypeMapper_1.getSeriesType(this.getChartType());
        return core_1._.get(this.getChartOptions(), optionsType + ".paired", undefined);
    };
    ChartOptionsService.prototype.setPairedMode = function (paired) {
        var optionsType = seriesTypeMapper_1.getSeriesType(this.getChartType());
        var options = core_1._.get(this.getChartOptions(), "" + optionsType, undefined);
        core_1._.set(options, 'paired', paired);
    };
    ChartOptionsService.prototype.getAxis = function (axisType) {
        var chart = this.getChart();
        if (!chart.axes || chart.axes.length < 1) {
            return undefined;
        }
        if (axisType === 'xAxis') {
            return (chart.axes && chart.axes[0].direction === 'x') ? chart.axes[0] : chart.axes[1];
        }
        return (chart.axes && chart.axes[1].direction === 'y') ? chart.axes[1] : chart.axes[0];
    };
    ChartOptionsService.prototype.updateAxisOptions = function (chartAxis, expression, value) {
        var optionsType = seriesTypeMapper_1.getSeriesType(this.getChartType());
        var axisOptions = this.getChartOptions()[optionsType].axes;
        if (chartAxis instanceof ag_charts_community_1.NumberAxis) {
            core_1._.set(axisOptions.number, expression, value);
        }
        else if (chartAxis instanceof ag_charts_community_1.CategoryAxis) {
            core_1._.set(axisOptions.category, expression, value);
        }
        else if (chartAxis instanceof ag_charts_community_1.TimeAxis) {
            core_1._.set(axisOptions.time, expression, value);
        }
        else if (chartAxis instanceof ag_charts_community_1.GroupedCategoryAxis) {
            core_1._.set(axisOptions.groupedCategory, expression, value);
        }
    };
    ChartOptionsService.prototype.getChartType = function () {
        return this.chartController.getChartType();
    };
    ChartOptionsService.prototype.getChart = function () {
        return this.chartController.getChartProxy().getChart();
    };
    ChartOptionsService.prototype.getChartOptions = function () {
        return this.chartController.getChartProxy().getChartOptions();
    };
    ChartOptionsService.prototype.updateChart = function () {
        var chartUpdateParams = this.chartController.getChartUpdateParams();
        this.chartController.getChartProxy().update(chartUpdateParams);
    };
    ChartOptionsService.prototype.raiseChartOptionsChangedEvent = function () {
        var chartModel = this.chartController.getChartModel();
        var event = Object.freeze({
            type: core_1.Events.EVENT_CHART_OPTIONS_CHANGED,
            chartId: chartModel.chartId,
            chartType: chartModel.chartType,
            chartThemeName: chartModel.chartThemeName,
            chartOptions: chartModel.chartOptions
        });
        this.eventService.dispatchEvent(event);
    };
    ChartOptionsService.isMatchingSeries = function (seriesType, series) {
        return seriesType === 'area' && series instanceof ag_charts_community_1.AreaSeries ? true :
            seriesType === 'bar' && series instanceof ag_charts_community_1.BarSeries ? true :
                seriesType === 'column' && series instanceof ag_charts_community_1.BarSeries ? true :
                    seriesType === 'histogram' && series instanceof ag_charts_community_1.HistogramSeries ? true :
                        seriesType === 'line' && series instanceof ag_charts_community_1.LineSeries ? true :
                            seriesType === 'pie' && series instanceof ag_charts_community_1.PieSeries ? true :
                                seriesType === 'scatter' && series instanceof ag_charts_community_1.ScatterSeries;
    };
    ChartOptionsService.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    __decorate([
        core_1.Autowired('gridApi')
    ], ChartOptionsService.prototype, "gridApi", void 0);
    __decorate([
        core_1.Autowired('columnApi')
    ], ChartOptionsService.prototype, "columnApi", void 0);
    return ChartOptionsService;
}(core_1.BeanStub));
exports.ChartOptionsService = ChartOptionsService;
