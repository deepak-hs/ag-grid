import { HeaderRowCtrl } from "../../row/headerRowCtrl";
import { AbstractHeaderCellCtrl, IAbstractHeaderCellComp } from "../abstractCell/abstractHeaderCellCtrl";
import { Column } from '../../../entities/column';
import { IFloatingFilter } from '../../../filter/floating/floatingFilter';
import { AgPromise } from '../../../utils';
import { UserCompDetails } from "../../../components/framework/userComponentFactory";
export interface IHeaderFilterCellComp extends IAbstractHeaderCellComp {
    addOrRemoveCssClass(cssClassName: string, on: boolean): void;
    addOrRemoveBodyCssClass(cssClassName: string, on: boolean): void;
    setButtonWrapperDisplayed(displayed: boolean): void;
    setCompDetails(compDetails?: UserCompDetails | null): void;
    getFloatingFilterComp(): AgPromise<IFloatingFilter> | null;
    setWidth(width: string): void;
    setMenuIcon(icon: HTMLElement): void;
}
export declare class HeaderFilterCellCtrl extends AbstractHeaderCellCtrl {
    private readonly filterManager;
    private readonly columnHoverService;
    private readonly menuFactory;
    private comp;
    private column;
    private eButtonShowMainFilter;
    private eFloatingFilterBody;
    private suppressFilterButton;
    private active;
    private iconCreated;
    private userCompDetails?;
    private destroySyncListener;
    private destroyFilterChangedListener;
    constructor(column: Column, parentRowCtrl: HeaderRowCtrl);
    setComp(comp: IHeaderFilterCellComp, eGui: HTMLElement, eButtonShowMainFilter: HTMLElement, eFloatingFilterBody: HTMLElement): void;
    private setupActive;
    private setupUi;
    private setupFocus;
    private setupAria;
    private onTabKeyDown;
    private findNextColumnWithFloatingFilter;
    protected handleKeyDown(e: KeyboardEvent): void;
    private onFocusIn;
    private setupHover;
    private setupLeft;
    private setupFilterButton;
    private setupUserComp;
    private setCompDetails;
    private showParentFilter;
    private setupSyncWithFilter;
    private setupWidth;
    private setupFilterChangedListener;
    private updateFilterButton;
    private onColDefChanged;
    private updateCompDetails;
    private updateFloatingFilterParams;
}
