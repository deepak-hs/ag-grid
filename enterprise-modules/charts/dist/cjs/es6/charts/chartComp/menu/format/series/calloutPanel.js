"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ag-grid-community/core");
const formatPanel_1 = require("../formatPanel");
class CalloutPanel extends core_1.Component {
    constructor(chartOptionsService, getSelectedSeries) {
        super();
        this.chartOptionsService = chartOptionsService;
        this.getSelectedSeries = getSelectedSeries;
    }
    init() {
        const groupParams = {
            cssIdentifier: 'charts-format-sub-level',
            direction: 'vertical'
        };
        this.setTemplate(CalloutPanel.TEMPLATE, { calloutGroup: groupParams });
        this.initCalloutOptions();
    }
    initCalloutOptions() {
        this.calloutGroup
            .setTitle(this.chartTranslationService.translate("callout"))
            .setEnabled(true)
            .hideOpenCloseIcons(true)
            .hideEnabledCheckbox(true);
        const initInput = (expression, input, labelKey, defaultMaxValue) => {
            const currentValue = this.chartOptionsService.getSeriesOption(expression, this.getSelectedSeries());
            input.setLabel(this.chartTranslationService.translate(labelKey))
                .setMaxValue(formatPanel_1.getMaxValue(currentValue, defaultMaxValue))
                .setValue(`${currentValue}`)
                .setTextFieldWidth(45)
                .onValueChange(newValue => this.chartOptionsService.setSeriesOption(expression, newValue, this.getSelectedSeries()));
        };
        initInput('calloutLine.length', this.calloutLengthSlider, 'length', 40);
        initInput('calloutLine.strokeWidth', this.calloutStrokeWidthSlider, 'strokeWidth', 10);
        initInput('calloutLabel.offset', this.labelOffsetSlider, 'offset', 30);
    }
}
CalloutPanel.TEMPLATE = `<div>
            <ag-group-component ref="calloutGroup">
                <ag-slider ref="calloutLengthSlider"></ag-slider>
                <ag-slider ref="calloutStrokeWidthSlider"></ag-slider>
                <ag-slider ref="labelOffsetSlider"></ag-slider>
            </ag-group-component>
        </div>`;
__decorate([
    core_1.RefSelector('calloutGroup')
], CalloutPanel.prototype, "calloutGroup", void 0);
__decorate([
    core_1.RefSelector('calloutLengthSlider')
], CalloutPanel.prototype, "calloutLengthSlider", void 0);
__decorate([
    core_1.RefSelector('calloutStrokeWidthSlider')
], CalloutPanel.prototype, "calloutStrokeWidthSlider", void 0);
__decorate([
    core_1.RefSelector('labelOffsetSlider')
], CalloutPanel.prototype, "labelOffsetSlider", void 0);
__decorate([
    core_1.Autowired('chartTranslationService')
], CalloutPanel.prototype, "chartTranslationService", void 0);
__decorate([
    core_1.PostConstruct
], CalloutPanel.prototype, "init", null);
exports.CalloutPanel = CalloutPanel;
