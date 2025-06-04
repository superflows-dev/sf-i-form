/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */
import { LitElement, PropertyValueMap } from 'lit';
/**
 * SfIForm element.
 * @fires renderComplete - When the list is populated
 * @fires valueChanged - When the value is changed
 * @property apiId - backend api id
 * @property label - input label
 * @property name - name of the input
 * @property mode - mode of operation
 * @property selectedId - id to preselect
 * @property selectedValue - callback function
 */
export declare class SfIForm extends LitElement {
    searchPhraseOriginal: string;
    blockSize: number;
    VALIDATION_TEXT_BASIC: string;
    VALIDATION_TEXT_DATE: string;
    mode: string;
    maxSelect: string;
    flow: string;
    enableEditButton: string;
    showAllResults: string;
    showEdit: boolean;
    showCalendar: boolean;
    searchPhrase: string;
    selectProjection: string;
    selectAnotherProjection: string;
    ignoreProjections: string;
    getIgnoreProjections: () => any;
    dependencies: string;
    inputIds: string;
    fields: string;
    validations: string;
    selectedViewToDetailValues: string;
    useInApi: string;
    unitFiltersNew: string;
    unitFiltersDetail: string;
    _sfSlottedForm: any;
    apiId: string;
    apiIdCalendarDetail: string;
    searchIndex: string;
    selectedId: string;
    selectedObj: any;
    selectedSearchId: any;
    preselectedValues: string;
    getPreselectedValues: () => any;
    label: string;
    latestDaysBlock: number;
    name: string;
    shortlistedSearchPhrases: any;
    removedValues: string[];
    selectedTextPhrase: string;
    projectField: string;
    prevCursor: Array<any>;
    nextCursor: Array<any>;
    noLatestMessage: string;
    titleMessage: string;
    multiselectArr: Array<string>;
    selectedValues: () => any[];
    selectedTexts: () => any[];
    selectedEntireValues: () => any;
    static styles: import("lit").CSSResult;
    _sfButtonSubmit: any;
    _sfButtonAll: any;
    _sfButtonTrail: any;
    _sfButtonCalendarCancel: any;
    _sfButtonCalendar: any;
    _sfInputSearch: any;
    _sfInputSelect: any;
    _sfInputSearchSelect: any;
    _sfInputList: any;
    _sfButtonDelete: any;
    _SfRowError: any;
    _SfRowErrorMessage: any;
    _SfRowSuccess: any;
    _SfRowSuccessMessage: any;
    _SfRowNotif: any;
    _SfRowNotifMessage: any;
    _SfLoader: any;
    _SfFormContainer: any;
    _SfCalendarContainer: any;
    _SfSearchListContainer: any;
    _SfSearchSelectContainer: any;
    _SfLogsListContainer: any;
    _SfLatestListContainer: any;
    _SfButtonBack: any;
    _SfButtonEdit: any;
    _SfButtonDelete: any;
    _SfButtonNew: any;
    _SfButtonDeleteConfirm: any;
    _SfSearchMultiselectSelect: any;
    _SfSearchMultiselectInput: any;
    _SfSearchMultiselectDelete: any;
    _SfSearchMultiselectSelected: any;
    _SfButtonEditCancel: any;
    _SfButtonDeleteCancel: any;
    _SfIEvents: any;
    _SfButtonCopypasteOpen: any;
    _SfButtonCopypasteCopy: any;
    _SfButtonCopypastePaste: any;
    _SfInputStartDate: any;
    _SfInputEndDate: any;
    _SfButtonFetchLog: any;
    _SfFormC: any;
    _SfCalendarC: any;
    getInputFromField: (field: string) => any;
    getFieldFromInput: (input: string) => any;
    getUseInApi: () => any;
    getUnitFiltersNew: () => any;
    getUnitFiltersDetail: () => any;
    getSelectedViewToDetailValues: () => any;
    getFields: () => any;
    getValidations: () => any;
    getDependencies: () => any;
    getInputs: () => any;
    dispatchMyEvent: (ev: string, args?: any) => void;
    onChangeSelect: (ev: any) => void;
    clearSelection: () => void;
    getSelectedSearchText: () => any;
    getInputValue: (id: string) => any;
    prepareXhr: (data: any, url: string, loaderElement: any, authorization: any) => Promise<unknown>;
    clearMessages: () => void;
    setError: (msg: string) => void;
    setSuccess: (msg: string) => void;
    setNotif: (msg: string) => void;
    setListSelection: (value: string, text: string) => void;
    nextListRead: (cursor: any) => void;
    clickTableNextList: (cursor: any) => void;
    clickTableNext: (cursor: any) => void;
    clickTablePrev: () => void;
    renderSearch: (values: any, found: any, cursor: any) => void;
    renderListRows: (values: any, multiSelect: boolean, cursor?: string, fromFetchDetails?: boolean) => (string | boolean)[];
    renderList: (values: any, found: any, cursor: any, multiSelect?: boolean, hideEdit?: boolean, fromFetchDetails?: boolean) => void;
    renderLogs: (values: any) => void;
    renderLatestListRows: (values: any) => string;
    renderLatest: (values: any) => void;
    renderClipboard: (value: any) => void;
    renderDetail: (value: any) => void;
    renderSearchMultiselectRead: (values: Array<any>, cursor?: string, preselect?: boolean) => void;
    renderSearchMultiselect: (values: Array<any>, cursor?: string, preselect?: boolean) => void;
    fetchSearch: (cursor?: any) => Promise<void>;
    fetchSearchMultiselect: (cursor?: any, preselect?: boolean) => Promise<void>;
    fetchSearchSelect: (cursor?: any, hideEdit?: boolean) => Promise<void>;
    fetchSearchList: (cursor?: any) => Promise<void>;
    fetchDetail: () => Promise<any>;
    fetchLogs: () => Promise<void>;
    fetchLatest: () => Promise<void>;
    submitDelete: () => Promise<void>;
    submitNew: () => Promise<void>;
    submitEdit: () => Promise<void>;
    populateValues: () => any;
    getValidationOfElement: (id: string) => any;
    evalSubmit: () => void;
    disableConfirm: (value: boolean) => void;
    disableCalendar: (value: boolean) => void;
    disableEdit: (value: boolean) => void;
    hideDelete: () => void;
    hideBack: () => void;
    formatShortlistedSearchPhrase: () => void;
    updateShortlistedSearchTimeout: any;
    updateShortlistedSearchPhrase: (parents: any, childElement: any) => void;
    processDependencies: () => void;
    initShowInputs: () => void;
    initDisableInputs: (value: boolean) => Promise<void>;
    clearInputs: () => void;
    removeItemByValue: (value: string) => void;
    processFormLayouting: () => void;
    fWait: (ms: number) => Promise<unknown>;
    checkButtonState: boolean;
    checkButtonStates: () => void;
    loopThroughSearchResults: () => Promise<void>;
    initListenersView: () => void;
    initListenersTrail: () => Promise<void>;
    clearUnitFilters: () => void;
    processFiltersByEvent: () => void;
    completeSelect: () => void;
    removeFromMultiselect: (index: number) => void;
    initListenersMultiselect: () => void;
    disableEditMultiselect: (disable: boolean) => void;
    initListenersNew: () => void;
    initListenersSearch: () => void;
    initListenersDetail: () => void;
    populateSelectedViewToDetailValues: () => void;
    populateSelectedFields: (fieldsToBePopulated: string[]) => void;
    checkIfAlreadySelected: (value: string) => boolean;
    populatePreselected: () => void;
    processDisabled: () => void;
    processUnitFiltersNew: () => void;
    processUnitFiltersDetail: () => void;
    initListenerClipboardControls: () => void;
    renderNewAfterContentPopulated: () => void;
    renderDetailAfterContentPopulated: () => void;
    loadMode: () => Promise<void>;
    constructor();
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    firtUpdatedLoadMode: () => void;
    connectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sf-i-form': SfIForm;
    }
}
//# sourceMappingURL=sf-i-form.d.ts.map