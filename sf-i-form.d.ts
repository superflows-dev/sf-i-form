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
    mode: string;
    searchString: string;
    selectProjection: string;
    dependencies: string;
    inputIds: string;
    fields: string;
    selectedValues: string;
    _sfSlottedForm: any;
    apiId: string;
    searchIndex: string;
    selectedId: string;
    selectedSearchId: string;
    label: string;
    name: string;
    selectedSearchStrings: any;
    static styles: import("lit").CSSResult;
    _sfButtonSubmit: any;
    _sfButtonTrail: any;
    _sfInputSearch: any;
    _sfInputSelect: any;
    _sfButtonDelete: any;
    _SfRowError: any;
    _SfRowErrorMessage: any;
    _SfRowSuccess: any;
    _SfRowSuccessMessage: any;
    _SfLoader: any;
    _SfSearchListContainer: any;
    _SfLogsListContainer: any;
    _SfButtonBack: any;
    _SfButtonEdit: any;
    _SfButtonDelete: any;
    _SfButtonNew: any;
    _SfButtonDeleteConfirm: any;
    _SfButtonEditCancel: any;
    _SfButtonDeleteCancel: any;
    _SfFormC: any;
    getSelectedValues: () => any;
    getFields: () => any;
    getDependencies: () => any;
    getInputs: () => any;
    onChangeSelect: (ev: any) => void;
    getSelectedSearchId: () => string;
    getInputValue: (id: string) => {
        type: string;
        value: any;
        text: any;
    } | {
        type: string;
        value: any;
        text?: undefined;
    };
    prepareXhr: (data: any, url: string, loaderElement: any, authorization: any) => Promise<unknown>;
    clearMessages: () => void;
    setError: (msg: string) => void;
    setSuccess: (msg: string) => void;
    renderSearch: (values: any) => void;
    renderSelect: (values: any) => void;
    renderLogs: (values: any) => void;
    renderDetail: (value: any) => void;
    fetchSearch: () => Promise<void>;
    fetchSearchSelect: () => Promise<void>;
    fetchDetail: () => Promise<void>;
    fetchLogs: () => Promise<void>;
    submitDelete: () => Promise<void>;
    submitNew: () => Promise<void>;
    submitEdit: () => Promise<void>;
    evalSubmit: () => void;
    disableConfirm: (value: boolean) => void;
    disableEdit: (value: boolean) => void;
    formatSearchString: () => void;
    updateSelectedSearchString: (parents: any, childElement: any) => void;
    processDependencies: () => void;
    initDisableInputs: (value: boolean) => void;
    clearInputs: () => void;
    processFormLayouting: () => void;
    initListenersView: () => void;
    initListenersTrail: () => void;
    initListenersNew: () => void;
    initListenersDetail: () => void;
    populateSelectedValues: () => void;
    processDisabled: () => void;
    loadMode: () => Promise<void>;
    constructor();
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sf-i-form': SfIForm;
    }
}
//# sourceMappingURL=sf-i-form.d.ts.map