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
    dependencies: string;
    inputs: string;
    fields: string;
    searchFields: string;
    selectedValues: string;
    _sfSlottedForm: any;
    apiId: string;
    searchIndex: string;
    selectedId: string;
    static styles: import("lit").CSSResult;
    _sfButtonSubmit: any;
    _sfButtonDelete: any;
    _SfRowError: any;
    _SfRowErrorMessage: any;
    _SfRowSuccess: any;
    _SfRowSuccessMessage: any;
    _SfLoader: any;
    _SfFormC: any;
    getSelectedValues: () => any;
    getSearchFields: () => any;
    getFields: () => any;
    getDependencies: () => any;
    getInputs: () => any;
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
    submit: () => Promise<void>;
    evalSubmit: () => void;
    processDependencies: () => void;
    initListeners: () => void;
    populateSelectedValues: () => void;
    processDisabled: () => void;
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