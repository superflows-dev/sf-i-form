/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, query, queryAssignedElements, property } from 'lit/decorators.js';
// import {customElement, query, property} from 'lit/decorators.js';
import Util from './util';
// import {LitElement, html, css} from 'lit';
// import {customElement} from 'lit/decorators.js';
/*

Modes: View, Add, Edit, Delete, Admin
DB: partitionKey, rangeKey, values

*/
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
let SfIForm = class SfIForm extends LitElement {
    constructor() {
        super();
        this.dependencies = "[]";
        this.inputIds = "[]";
        this.fields = "[]";
        this.selectedValues = "[]";
        this.selectedSearchStrings = {};
        this.getSelectedValues = () => {
            return JSON.parse(this.selectedValues);
        };
        this.getFields = () => {
            return JSON.parse(this.fields);
        };
        this.getDependencies = () => {
            return JSON.parse(this.dependencies);
        };
        this.getInputs = () => {
            return JSON.parse(this.inputIds);
        };
        this.onChangeSelect = (ev) => {
            console.log(ev.target.value);
            //this.dispatchMyEvent("valueChanged", {newValue: ev.target.value});
        };
        this.getSelectedSearchId = () => {
            return this.selectedSearchId;
        };
        this.getInputValue = (id) => {
            console.log('id', this._SfFormC, this._SfFormC[0].querySelector('#' + id).tagName);
            var value = null;
            if (this._SfFormC[0].querySelector('#' + id).tagName.toLowerCase() == "sf-i-select") {
                value = {
                    type: "sf-i-select",
                    value: this._SfFormC[0].querySelector('#' + id).selectedValue(),
                    text: this._SfFormC[0].querySelector('#' + id).selectedText()
                };
            }
            else if (this._SfFormC[0].querySelector('#' + id).tagName.toLowerCase() == "sf-i-sub-select") {
                value = {
                    type: "sf-i-sub-select",
                    value: this._SfFormC[0].querySelector('#' + id).selectedValue(),
                    text: this._SfFormC[0].querySelector('#' + id).selectedText()
                };
            }
            else {
                value = (this._SfFormC[0].querySelector('#' + id)).value;
                value = {
                    type: "input",
                    value: (this._SfFormC[0].querySelector('#' + id)).value
                };
            }
            return value;
        };
        this.prepareXhr = async (data, url, loaderElement, authorization) => {
            if (loaderElement != null) {
                loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
            }
            return await Util.callApi(url, data, authorization);
        };
        this.clearMessages = () => {
            this._SfRowError.style.display = 'none';
            this._SfRowErrorMessage.innerHTML = '';
            this._SfRowSuccess.style.display = 'none';
            this._SfRowSuccessMessage.innerHTML = '';
        };
        this.setError = (msg) => {
            this._SfRowError.style.display = 'flex';
            this._SfRowErrorMessage.innerHTML = msg;
            this._SfRowSuccess.style.display = 'none';
            this._SfRowSuccessMessage.innerHTML = '';
        };
        this.setSuccess = (msg) => {
            this._SfRowError.style.display = 'none';
            this._SfRowErrorMessage.innerHTML = '';
            this._SfRowSuccess.style.display = 'flex';
            this._SfRowSuccessMessage.innerHTML = msg;
        };
        this.renderSearch = (values) => {
            let html = '';
            if (values.length > 0) {
                html += '<h3>Search Results (' + values.length + ')</h3>';
                html += '<table>';
                console.log('search', values);
                for (var i = 0; i < values.length; i++) {
                    console.log(JSON.parse(values[i].fields.data));
                    let data = JSON.parse(values[i].fields.data);
                    html += '<tr>';
                    html += '<td class="link">';
                    html += '<div id="search-' + i + '"><strong>' + values[i].fields.name[0] + '</strong></div>';
                    html += '</td>';
                    html += '<td>&nbsp;→&nbsp;</td>';
                    for (var j = 0; j < data.length; j++) {
                        html += '<td>&nbsp;';
                        html += '<span>' + data[j] + '</span>';
                        html += '&nbsp;</td>';
                    }
                    html += '</tr>';
                }
                html += '</table>';
                this._SfSearchListContainer.innerHTML = html;
                for (var i = 0; i < values.length; i++) {
                    console.log(this._SfSearchListContainer.querySelector('#search-' + i));
                    this._SfSearchListContainer.querySelector('#search-' + i).addEventListener('click', (ev) => {
                        console.log('id', ev.currentTarget.id);
                        this.selectedId = values[parseInt((ev.currentTarget.id + "").split('-')[1])].id;
                        this.mode = "detail";
                        this.loadMode();
                    });
                }
            }
            else {
                html += '<h3>No Records Found</h3>';
                this._SfSearchListContainer.innerHTML = html;
            }
        };
        this.renderSelect = (values) => {
            var html = '';
            for (var i = 0; i < values.length; i++) {
                const fields = values[i].fields;
                const id = values[i].id;
                html += '<option id="' + id + '" ' + (this.selectedSearchId == id ? 'selected' : '') + '>' + fields[this.selectProjection] + '</option>';
            }
            this._sfInputSelect.innerHTML = html;
        };
        this.renderLogs = (values) => {
            console.log('values', values);
            let html = '';
            if (values.length > 0) {
                html += '<h3>Logs Results (' + values.length + ')</h3>';
                for (var i = 0; i < values.length; i++) {
                    console.log('timestamp', (new Date(values[i].timestamp)));
                    html += '<table>';
                    html += '<tr>';
                    html += '<td>';
                    html += '<div><button id="button-collapse-' + i + '" class="material-icons gone button-icon-small">expand_less</button><button id="button-expand-' + i + '" class="material-icons button-icon-small">expand_more</button></div>';
                    html += '</td>';
                    html += '<td class="link">';
                    html += '<div id="search-' + i + '"><strong>' + (new Date(values[i].timestamp) + "").split(' (')[0] + '</strong></div>';
                    html += '</td>';
                    html += '<td>';
                    html += '<div>&nbsp;' + JSON.parse(values[i].message).userId + '</div>';
                    html += '</td>';
                    html += '<td>';
                    html += '<div>&nbsp;' + JSON.parse(values[i].message).op + '</div>';
                    html += '</td>';
                    html += '<td>';
                    html += '<div>&nbsp;' + JSON.parse(values[i].message).httpCode + '</div>';
                    html += '</td>';
                    html += '</tr>';
                    html += '</table>';
                    html += '<table>';
                    html += '<tr>';
                    html += '<td>';
                    html += '<div id="row-expand-' + i + '" class="gone"><small>';
                    html += '<strong>Request</strong> - ' + JSON.stringify(JSON.parse(values[i].message).req.body) + '<br />';
                    html += '<strong>Response</strong> - ' + JSON.stringify(JSON.parse(values[i].message).resp.body) + '';
                    html += '</small></div>';
                    html += '</td>';
                    html += '</tr>';
                    html += '</table>';
                }
                this._SfLogsListContainer.innerHTML = html;
                for (var i = 0; i < values.length; i++) {
                    this._SfLogsListContainer.querySelector('#button-expand-' + i).addEventListener('click', (ev) => {
                        const id = ev.currentTarget.id;
                        this._SfLogsListContainer.querySelector('#row-expand-' + id.split('-')[2]).style.display = 'block';
                        this._SfLogsListContainer.querySelector('#button-collapse-' + id.split('-')[2]).style.display = 'block';
                        this._SfLogsListContainer.querySelector('#button-expand-' + id.split('-')[2]).style.display = 'none';
                    });
                    this._SfLogsListContainer.querySelector('#button-collapse-' + i).addEventListener('click', (ev) => {
                        const id = ev.currentTarget.id;
                        this._SfLogsListContainer.querySelector('#row-expand-' + id.split('-')[2]).style.display = 'none';
                        this._SfLogsListContainer.querySelector('#button-collapse-' + id.split('-')[2]).style.display = 'none';
                        this._SfLogsListContainer.querySelector('#button-expand-' + id.split('-')[2]).style.display = 'block';
                    });
                }
            }
            else {
                html += '<h3>No Records Found</h3>';
                this._SfLogsListContainer.innerHTML = html;
            }
        };
        this.renderDetail = (value) => {
            var sValues = '';
            sValues += '[';
            for (var i = 0; i < this.getFields().length; i++) {
                sValues += '"';
                sValues += value[this.getFields()[i]];
                sValues += '",';
            }
            sValues = sValues.replace(/(^,)|(,$)/g, "");
            sValues += ']';
            console.log('selected values', sValues);
            this.selectedValues = sValues;
        };
        this.fetchSearch = async () => {
            this.clearMessages();
            const body = { "searchstring": this._sfInputSearch.value + "*" };
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/list";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                this.renderSearch(jsonRespose.values);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchSearchSelect = async () => {
            const body = { "searchstring": this.searchString + "*" };
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/list";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                this.renderSelect(jsonRespose.values);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchDetail = async () => {
            const body = { "id": this.selectedId };
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/detail";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                this.renderDetail(jsonRespose.data.value);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchLogs = async () => {
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/logs";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({}, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                this.renderLogs(jsonRespose.data);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.submitDelete = async () => {
            this.clearMessages();
            const body = {};
            let url = "";
            body["id"] = this.selectedId;
            url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/delete";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                this.setSuccess('Operation Successful!');
                setTimeout(() => {
                    this.clearMessages();
                    this._SfButtonBack.dispatchEvent(new Event('click'));
                }, 2000);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.submitNew = async () => {
            this.clearMessages();
            const body = {};
            let url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/create";
            const values = {};
            for (var i = 0; i < this.getFields().length; i++) {
                const field = this.getFields()[i];
                values[field] = this.getInputValue(this.getInputs()[i]);
            }
            body["values"] = values;
            console.log(body);
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                this.setSuccess('Operation Successful!');
                this.clearInputs();
                setTimeout(() => {
                    this.clearMessages();
                }, 3000);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                setTimeout(() => {
                    this.clearMessages();
                }, 3000);
            }
        };
        this.submitEdit = async () => {
            this.clearMessages();
            const body = {};
            let url = "";
            const values = {};
            for (var i = 0; i < this.getFields().length; i++) {
                const field = this.getFields()[i];
                values[field] = this.getInputValue(this.getInputs()[i]);
            }
            body["values"] = values;
            body["id"] = this.selectedId;
            url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/update";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                this.setSuccess('Operation Successful!');
                setTimeout(() => {
                    this.clearMessages();
                }, 3000);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.evalSubmit = () => {
            var _a, _b;
            var evaluate = true;
            for (var i = 0; i < this.getInputs().length; i++) {
                const id = this.getInputs()[i];
                const element = this._sfSlottedForm[0].querySelector('#' + id);
                if (element.nodeName.toLowerCase() == "sf-i-select") {
                    const elementSfISelect = element;
                    if (elementSfISelect.selectedValue() == null) {
                        evaluate = false;
                        break;
                    }
                    else {
                        if (elementSfISelect.selectedValue() == "") {
                            evaluate = false;
                            break;
                        }
                    }
                }
                else if (element.nodeName.toLowerCase() == "sf-i-sub-select") {
                    const elementSfISubSelect = element;
                    if (elementSfISubSelect.selectedValue() == null) {
                        evaluate = false;
                        break;
                    }
                    else {
                        if (elementSfISubSelect.selectedValue() == "") {
                            evaluate = false;
                            break;
                        }
                    }
                }
                else if (element.nodeName.toLowerCase() == "sf-i-form") {
                }
                else {
                    if (element.value.length === 0) {
                        evaluate = false;
                        break;
                    }
                }
            }
            if (evaluate) {
                (_a = this._sfButtonSubmit) === null || _a === void 0 ? void 0 : _a.removeAttribute('disabled');
            }
            else {
                (_b = this._sfButtonSubmit) === null || _b === void 0 ? void 0 : _b.setAttribute('disabled', true);
            }
        };
        this.disableConfirm = (value) => {
            if (!value) {
                this._sfButtonTrail.style.display = 'none';
                this._SfButtonEditCancel.style.display = 'none';
                this._SfButtonDeleteConfirm.style.display = 'block';
                this._SfButtonDeleteCancel.style.display = 'block';
                this._SfButtonEdit.style.display = 'none';
                this._SfButtonDelete.style.display = 'none';
                this._sfButtonSubmit.style.display = 'none';
            }
            else {
                this.disableEdit(true);
            }
        };
        this.disableEdit = (value) => {
            if (value) {
                this._sfButtonTrail.style.display = 'block';
                this._SfButtonEditCancel.style.display = 'none';
                this._SfButtonDeleteConfirm.style.display = 'none';
                this._SfButtonDeleteCancel.style.display = 'none';
                this._SfButtonEdit.style.display = 'block';
                this._SfButtonDelete.style.display = 'block';
                this._sfButtonSubmit.style.display = 'none';
            }
            else {
                this._sfButtonTrail.style.display = 'none';
                this._SfButtonEditCancel.style.display = 'block';
                this._SfButtonDeleteConfirm.style.display = 'none';
                this._SfButtonDeleteCancel.style.display = 'none';
                this._SfButtonEdit.style.display = 'none';
                this._SfButtonDelete.style.display = 'none';
                this._sfButtonSubmit.style.display = 'block';
            }
        };
        this.formatSearchString = () => {
            var searchStr = "";
            for (var i = 0; i < Object.keys(this.selectedSearchStrings).length; i++) {
                searchStr += (this.selectedSearchStrings[Object.keys(this.selectedSearchStrings)[i]]);
                if (i < (Object.keys(this.selectedSearchStrings).length - 1)) {
                    searchStr += '|';
                }
            }
            this.searchString = searchStr;
            console.log('setting search string', this.searchString);
        };
        this.updateSelectedSearchString = (parents, childElement) => {
            for (var k = 0; k < parents.length; k++) {
                const parentElement = this._sfSlottedForm[0].querySelector('#' + parents[k]);
                if (parentElement.nodeName.toLowerCase() == "sf-i-select") {
                    childElement.selectedSearchStrings[parentElement.id] = parentElement.selectedText();
                }
                else if (parentElement.nodeName.toLowerCase() == "sf-i-sub-select") {
                    childElement.selectedSearchStrings[parentElement.id] = parentElement.selectedText();
                }
            }
            childElement.formatSearchString();
            childElement.loadMode();
        };
        this.processDependencies = () => {
            for (var i = 0; i < this.getDependencies().length; i++) {
                const type = this.getDependencies()[i].type;
                if (type == "searchable") {
                    const parents = this.getDependencies()[i].parents;
                    const child = this.getDependencies()[i].child;
                    const childElement = this._sfSlottedForm[0].querySelector('#' + child);
                    for (var j = 0; j < parents.length; j++) {
                        const parent = parents[j];
                        const parentElement = this._sfSlottedForm[0].querySelector('#' + parent);
                        parentElement === null || parentElement === void 0 ? void 0 : parentElement.addEventListener('valueChanged', () => {
                            this.updateSelectedSearchString(parents, childElement);
                        });
                        parentElement === null || parentElement === void 0 ? void 0 : parentElement.addEventListener('renderComplete', () => {
                            this.updateSelectedSearchString(parents, childElement);
                        });
                    }
                }
                else {
                    const parent = this.getDependencies()[i].parent;
                    const child = this.getDependencies()[i].child;
                    const parentElement = this._sfSlottedForm[0].querySelector('#' + parent);
                    const childElement = this._sfSlottedForm[0].querySelector('#' + child);
                    parentElement === null || parentElement === void 0 ? void 0 : parentElement.addEventListener('valueChanged', (ev) => {
                        childElement.filterId = ev.detail.newValue;
                        childElement.populateList();
                    });
                    childElement.filterId = parentElement.selectedValue();
                    childElement.populateList();
                }
            }
        };
        this.initDisableInputs = (value) => {
            for (var i = 0; i < this.getInputs().length; i++) {
                const element = this._sfSlottedForm[0].querySelector('#' + this.getInputs()[i]);
                if (element.nodeName.toLowerCase() == "sf-i-select") {
                    element.mode = value ? "read" : "";
                    element.initState();
                }
                else if (element.nodeName.toLowerCase() == "sf-i-sub-select") {
                    element.mode = value ? "read" : "";
                    element.initState();
                }
                else {
                    if (value) {
                        element.setAttribute('disabled', 'disabled');
                    }
                    else {
                        element.removeAttribute('disabled');
                    }
                }
            }
        };
        this.clearInputs = () => {
            for (var i = 0; i < this.getInputs().length; i++) {
                const element = this._sfSlottedForm[0].querySelector('#' + this.getInputs()[i]);
                if (element.nodeName.toLowerCase() == "sf-i-select") {
                }
                else if (element.nodeName.toLowerCase() == "sf-i-sub-select") {
                }
                else {
                    element.value = "";
                }
            }
        };
        this.processFormLayouting = () => {
            for (var i = 0; i < this.getInputs().length; i++) {
                const element = this._sfSlottedForm[0].querySelector('#' + this.getInputs()[i]);
                if (element.nodeName.toLowerCase() == "sf-i-select") {
                }
                else if (element.nodeName.toLowerCase() == "sf-i-sub-select") {
                }
                else {
                    element.style.width = '98%';
                }
            }
            this._sfButtonSubmit.style.width = '100%';
        };
        this.initListenersView = () => {
            var _a, _b;
            console.log('init listeners view');
            (_a = this._sfInputSearch) === null || _a === void 0 ? void 0 : _a.addEventListener('keyup', () => {
                console.log('keyup called');
                this.searchString = this._sfInputSearch.value;
                if (this._sfInputSearch.value.length > 2) {
                    this.fetchSearch();
                }
            });
            (_b = this._SfButtonNew) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
                this.mode = "new";
                this.loadMode();
            });
            this._sfButtonTrail.addEventListener('click', () => {
                console.log('trail clicked');
                this.mode = "trail";
                this.loadMode();
            });
        };
        // initListeners = () => {
        //   this._sfButtonSubmit?.addEventListener('click', () => {
        //     this.submit();
        //   });
        //   this._sfButtonDelete?.addEventListener('click', () => {
        //     this.submit();
        //   });
        //   for(var i = 0; i < this.getInputs().length; i++) {
        //     const element = this._sfSlottedForm[0].querySelector('#' + this.getInputs()[i]);
        //     if(element.nodeName.toLowerCase() == "sf-i-select") {
        //       element.addEventListener('valueChanged', () => {
        //         this.evalSubmit();
        //       });
        //     } else if (element.nodeName.toLowerCase() == "sf-i-sub-select") {
        //       element.addEventListener('valueChanged', () => {
        //         this.evalSubmit();
        //       });
        //     } else {
        //       element.addEventListener('keyup', () => {
        //         this.evalSubmit();
        //       });
        //     }
        //   }
        // }
        this.initListenersTrail = () => {
            this._SfButtonBack.addEventListener('click', () => {
                this.mode = "view";
                this.loadMode();
            });
        };
        this.initListenersNew = () => {
            this._SfButtonBack.addEventListener('click', () => {
                this.mode = "view";
                this.loadMode();
            });
            this._sfButtonSubmit.addEventListener('click', () => {
                this.submitNew();
            });
            for (var i = 0; i < this.getInputs().length; i++) {
                const element = this._sfSlottedForm[0].querySelector('#' + this.getInputs()[i]);
                if (element.nodeName.toLowerCase() == "sf-i-select") {
                    element.addEventListener('valueChanged', () => {
                        this.evalSubmit();
                    });
                }
                else if (element.nodeName.toLowerCase() == "sf-i-sub-select") {
                    element.addEventListener('valueChanged', () => {
                        this.evalSubmit();
                    });
                }
                else {
                    element.addEventListener('keyup', () => {
                        this.evalSubmit();
                    });
                }
            }
        };
        this.initListenersDetail = () => {
            var _a;
            this._SfButtonBack.addEventListener('click', () => {
                this.mode = "view";
                this.loadMode();
            });
            this._SfButtonEdit.addEventListener('click', () => {
                this.disableEdit(false);
                this.initDisableInputs(false);
            });
            this._SfButtonEditCancel.addEventListener('click', () => {
                this.disableEdit(true);
                this.initDisableInputs(true);
            });
            this._SfButtonDelete.addEventListener('click', () => {
                this.disableConfirm(false);
            });
            this._SfButtonDeleteCancel.addEventListener('click', () => {
                this.disableConfirm(true);
            });
            (_a = this._sfButtonSubmit) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                console.log('submit clicked');
                this.submitEdit();
            });
            this._SfButtonDeleteConfirm.addEventListener('click', () => {
                this.submitDelete();
            });
            for (var i = 0; i < this.getInputs().length; i++) {
                const element = this._sfSlottedForm[0].querySelector('#' + this.getInputs()[i]);
                if (element.nodeName.toLowerCase() == "sf-i-select") {
                    element.addEventListener('valueChanged', () => {
                        this.evalSubmit();
                    });
                }
                else if (element.nodeName.toLowerCase() == "sf-i-sub-select") {
                    element.addEventListener('valueChanged', () => {
                        this.evalSubmit();
                    });
                }
                else {
                    element.addEventListener('keyup', () => {
                        this.evalSubmit();
                    });
                }
            }
        };
        this.populateSelectedValues = () => {
            console.log('populating selected', this.getSelectedValues());
            for (var i = 0; i < this.getInputs().length; i++) {
                const element = this._sfSlottedForm[0].querySelector('#' + this.getInputs()[i]);
                if (element.nodeName.toLowerCase() == "sf-i-select") {
                    element.selectedId = this.getSelectedValues()[i];
                }
                else if (element.nodeName.toLowerCase() == "sf-i-sub-select") {
                    element.selectedId = this.getSelectedValues()[i];
                }
                else {
                    element.value = this.getSelectedValues()[i];
                }
            }
        };
        this.processDisabled = () => {
            for (var i = 0; i < this.getInputs().length; i++) {
                const element = this._sfSlottedForm[0].querySelector('#' + this.getInputs()[i]);
                if (this.mode == "view" || this.mode == "delete") {
                    element.setAttribute('disabled', true);
                }
            }
        };
        this.loadMode = async () => {
            if (this.mode == "select") {
                setTimeout(() => {
                    // this.initListenersTrail();
                    this.fetchSearchSelect();
                }, 500);
            }
            else if (this.mode == "trail") {
                setTimeout(() => {
                    this.initListenersTrail();
                    this.fetchLogs();
                }, 500);
            }
            else if (this.mode == "new") {
                setTimeout(() => {
                    this.initDisableInputs(false);
                    this.initListenersNew();
                    this.processDependencies();
                    this.processFormLayouting();
                }, 500);
            }
            else if (this.mode == "view") {
                setTimeout(() => {
                    this.initListenersView();
                    this._sfInputSearch.value = this.searchString == null ? "" : this.searchString;
                    var event = new Event('keyup');
                    this._sfInputSearch.dispatchEvent(event);
                }, 500);
            }
            else if (this.mode == "detail") {
                setTimeout(async () => {
                    this.disableEdit(true);
                    this.initDisableInputs(true);
                    this.processDependencies();
                    await this.fetchDetail();
                    this.populateSelectedValues();
                    this.initListenersDetail();
                    this.processFormLayouting();
                }, 500);
            }
            // } else {
            //   this.initListeners();
            //   this.processDependencies();
            //   if(this.mode == "edit" || this.mode == "delete") {
            //     this.populateSelectedValues();
            //   }
            //   this.processDisabled();
            //   this.clearMessages();
            // }
        };
    }
    firstUpdated(_changedProperties) {
        this.loadMode();
    }
    connectedCallback() {
        super.connectedCallback();
    }
    render() {
        //let submit = (this.mode == "edit" || this.mode == "create") ? html`<button id="sf-button-submit" disabled>Submit</button>` : html``;
        //let del = this.mode == "delete" ? html`<button id="sf-button-delete">Delete</button>` : html``;
        if (this.mode == "select") {
            return html `
        
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <div class="SfIFormC">
          <label>${this.label}</label>
          <div>
            <select id="input-select" @change="${this.onChangeSelect}">
            </select>
            <div class="loader-element"></div>
          </div>
        </div>
      
      `;
        }
        else if (this.mode == "trail") {
            return html `
        
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <div class="SfIFormC">
          <div class="d-flex justify-center">
              <h1 part="title">${this.name}</h1>
          </div>
          <div class="d-flex justify-center">
            <div part="badge" class="badge">Log Trail</div>
          </div>
          <br />
          <div class="d-flex justify-between">
            <div class="lb"></div>
            <div id="button-back" class="link">← Back</div>
            <div class="rb"></div>
          </div>
          <br />
          <div class="d-flex justify-center">
            <div class="loader-element"></div>
          </div>
          <div class="d-flex">
            <div class="lb"></div>
            <div id="logs-list-container"></div>
            <div class="rb"></div>
          </div>
          
        </div>
      
      `;
        }
        else if (this.mode == "new") {
            return html `
        
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <div class="SfIFormC">
          <div class="d-flex justify-center">
              <h1 part="title">${this.name}</h1>
          </div>
          <div class="d-flex justify-center">
            <div part="badge" class="badge">Create New</div>
          </div>
          <br />
          <div class="d-flex justify-between">
            <div class="lb"></div>
            <div id="button-back" class="link">← Back</div>
            <div class="rb"></div>
          </div>
          <br /><br />
          <div class="d-flex justify-center">
            <div class="loader-element"></div>
          </div>
          <div class="d-flex justify-center">
            <div class="lb"></div>
            <div class="flex-grow">
              <slot name="form"></slot>
            </div>
            <div class="rb"></div>
          </div>
          <div class="d-flex justify-between">
            <div class="lb"></div>
            <div>
              <div class="div-row-error div-row-submit gone">
                <div part="errormsg" class="div-row-error-message"></div>
              </div>
              <div class="div-row-success div-row-submit gone">
                <div part="successmsg" class="div-row-success-message"></div>
              </div>
            </div>
            <div class="rb"></div>
          </div>
          <br />
          <br />
          <div class="d-flex justify-center">
            <div class="lb"></div>
            <div class="flex-grow">
              <button id="button-submit" disabled>Submit</button>
            </div>
            <div class="rb"></div>
          </div>
          
        </div>
      
      `;
        }
        else if (this.mode == "view") {
            return html `
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <div class="SfIFormC">
          <div class="d-flex justify-center">
              <h1 part="title">${this.name}</h1>
          </div>
          <div class="d-flex justify-center">
            <div part="badge" class="badge">Search</div>
          </div>
          <br />
          <div class="d-flex">
            <div class="lb"></div>
            <div class="d-flex align-center justify-between flex-grow">
              <div class="d-flex flex-col">
                <label>Search</label>
                <input id="input-search" type="text" placeholder="3 or more characters"/>
                <div class="loader-element"></div>
              </div>
              <div>
                <button id="button-trail" class="material-icons button-icon">receipt_long</button>
                <button id="button-new" class="material-icons button-icon">add</button>
              </div>
            </div>
            <div class="rb"></div>
          </div>
          <div class="d-flex justify-center">
            <div class="lb"></div>
            <div class="d-flex flex-col">
              
              <div class="d-flex justify-center gone">
                
              </div>
              <div class="div-row-error div-row-submit gone">
                <div part="errormsg" class="div-row-error-message"></div>
              </div>
              <div class="div-row-success div-row-submit">
                <div part="successmsg" class="div-row-success-message"></div>
              </div>
            </div>
            <div class="rb"></div>
          </div>
          <div class="d-flex">
            <div class="lb"></div>
            <div id="search-list-container"></div>
            <div class="rb"></div>
          </div>
        </div>
      `;
        }
        else if (this.mode == "detail") {
            return html `
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <div class="SfIFormC">
          <div class="d-flex justify-center">
              <h1 part="title">${this.name}</h1>
          </div>
          <div class="d-flex justify-center">
            <div part="badge" class="badge">View Detail</div>
          </div>
          <br />
          <div class="d-flex">
            <div class="lb"></div>
            <div class="d-flex flex-grow justify-between">
              <div id="button-back" class="link">← Back</div>
              <div class="d-flex">
                <button id="button-trail" class="button-icon"><span class="material-icons">receipt_long</span></button>
                <button id="button-edit" class="button-icon"><span class="material-icons">edit</span></button>
                <button id="button-edit-cancel" class="button-icon"><span class="material-icons">edit_off</span></button>
                <button id="button-delete" class="button-icon"><span class="material-icons">delete</span></button>
                <button id="button-delete-cancel" class="button-icon"><span class="material-icons">close</span></button>
                <button id="button-delete-confirm" class="button-icon"><span class="material-icons">delete</span><span class="material-icons">done</span></button>
              </div>
            </div>
            <div class="rb"></div>
          </div>
          <br />
          <div class="d-flex justify-center">
            <div class="loader-element"></div>
          </div>
          <div class="d-flex justify-center">
            <div class="lb"></div>
            <div class="flex-grow">
              <slot name="form"></slot>
            </div>
            <div class="rb"></div>
          </div>
          <div class="d-flex justify-between">
            <div class="lb"></div>
            <div>
              <div class="div-row-error div-row-submit gone">
                <div part="errormsg" class="div-row-error-message"></div>
              </div>
              <div class="div-row-success div-row-submit gone">
                <div part="successmsg" class="div-row-success-message"></div>
              </div>
            </div>
            <div class="rb"></div>
          </div>
          <br />
          <br />
          <div class="d-flex justify-center">
            <div class="lb"></div>
            <div class="flex-grow">
              <button id="button-submit" disabled>Submit</button>
            </div>
            <div class="rb"></div>
          </div>
          
          
        </div>
      `;
        }
        else {
            return html `
        <div class="SfIFormC">
          <div class="d-flex justify-center">
            <div class="lb"></div>
            <div class="d-flex flex-col">
              <slot name="form"></slot>
              <div class="div-row-error div-row-submit">
                <div part="errormsg" class="div-row-error-message"></div>
              </div>
              <div class="div-row-success div-row-submit">
                <div part="successmsg" class="div-row-success-message"></div>
              </div>
              <div class="d-flex justify-center">
                <div class="loader-element"></div>
              </div>
             
            </div>
            <div class="rb"></div>
          </div>
        </div>
      `;
        }
    }
};
// @property()
// selectedValue = () => {
//   return this._SfInputSelect.value;
// }
SfIForm.styles = css `
    
    .SfIFormC {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: space-between;
    }

    .SfIFormCAdmin {
      padding: 10px 20px;
    }

    .SfIFormC label{
      padding-bottom: 5px;
    }

    .SfIFormC > div{
      display: flex;
      align-items: center;
    }

    .SfIFormC > div > select{
      flex-grow: 1;
    }

    .flex-grow {
      flex-grow: 1;
    }

    .link {
      text-decoration: underline;
      cursor: pointer;
    }

    .gone {
      display: none
    }

    .loader-element {
      margin-left: 5px;
    }

    .align-start {
      align-items: flex-start;
    }

    .align-end {
      align-items: flex-end;
    }

    .align-center {
      align-items: center;
    }

    #search-list-container {
      overflow-x: auto;
    }

    #logs-list-container {
      overflow-x: auto;
    }

    #input-search {
      margin-bottom: 5px;
    }
    
    .button-icon {
      padding-top: 3px;
      margin-left: 5px;
    }

    .button-icon-small {
      padding: 0px;
      margin: 0px;
      font-size: 85%;
    }

    .SfIFormC td {
      vertical-align: top;
    }

    .lds-dual-ring {
      display: inline-block;
      width: 15px;
      height: 15px;
    }
    .lds-dual-ring:after {
      content: " ";
      display: block;
      width: 10px;
      height: 10px;
      margin: 0px;
      border-radius: 50%;
      border: 2px solid #fff;
      border-color: #888 #ddd #888 #ddd;
      animation: lds-dual-ring 0.8s linear infinite;
    }

    .lds-dual-ring-lg {
      display: inline-block;
      width: 30px;
      height: 30px;
    }
    .lds-dual-ring-lg:after {
      content: " ";
      display: block;
      width: 30px;
      height: 30px;
      margin: 0px;
      border-radius: 50%;
      border: 3px solid #fff;
      border-color: #888 #ddd #888 #ddd;
      animation: lds-dual-ring 0.8s linear infinite;
    }

    td {
      white-space: nowrap;
    }

    .div-row-error {
      display: flex;
      justify-content: center;
      position: fixed;
      position: fixed;
      top: 0px;
      right: 0px;
      margin-top: 20px;
      margin-right: 20px;
      display: none;
      align-items:center;
      background-color: white;
      border: dashed 1px red;
      padding: 20px;
    }

    .div-row-error-message {
      color: red;
      padding: 5px;
      background-color: white;
      text-align: center;
    }

    .div-row-success {
      display: flex;
      justify-content: center;
      position: fixed;
      top: 0px;
      right: 0px;
      margin-top: 20px;
      margin-right: 20px;
      display: none;
      align-items:center;
      background-color: white;
      border: dashed 1px green;
      padding: 20px;
    }

    .div-row-success-message {
      color: green;
      padding: 5px;
      background-color: white;
      text-align: center;
    }

    .d-flex {
      display: flex;
    }

    .flex-col {
      flex-direction: column;
    }

    .justify-center {
      justify-content: center;
    }

    .justify-between {
      justify-content: space-between;
    }

    .justify-end {
      justify-content: flex-end;
    }

    @keyframes lds-dual-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }  

    .hide {
      display: none;
    }

    .badge {
      border: dashed 1px;
      padding-top: 1px;
      padding-bottom: 1px;
      padding-left: 10px;
      padding-right: 10px;
      border-radius: 20px;
      margin-top: -20px;
    }

    .badge-filled {
      border: solid 1px gray;
      background-color: white;
      padding-top: 1px;
      padding-bottom: 1px;
      padding-left: 10px;
      padding-right: 10px;
      border-radius: 20px;
      margin-top: -20px;
    }

    .lb {
      width: 5%
    }
    .rb {
      width: 5%
    }

    .tcId {
      min-width: 300px;
    }

    .tcName {
      min-width: 200px;
    }

    .tcActions {
      min-width: 150px;
      text-align: right;
    }

    .SfIFormCAdmin th {
      border-bottom: solid 1px black
    }

    .SfIFormCAdmin td {
      border-bottom: solid 1px gray
    }

    .tableC {
      overflow-x: auto;
    }

    

    @media (orientation: landscape) {

      .lb {
        width: 30%
      }
      .rb {
        width: 30%
      }

    }

  `;
__decorate([
    property()
], SfIForm.prototype, "mode", void 0);
__decorate([
    property()
], SfIForm.prototype, "searchString", void 0);
__decorate([
    property()
], SfIForm.prototype, "selectProjection", void 0);
__decorate([
    property()
], SfIForm.prototype, "dependencies", void 0);
__decorate([
    property()
], SfIForm.prototype, "inputIds", void 0);
__decorate([
    property()
], SfIForm.prototype, "fields", void 0);
__decorate([
    property()
], SfIForm.prototype, "selectedValues", void 0);
__decorate([
    queryAssignedElements({ slot: 'form' })
], SfIForm.prototype, "_sfSlottedForm", void 0);
__decorate([
    property()
], SfIForm.prototype, "apiId", void 0);
__decorate([
    property()
], SfIForm.prototype, "searchIndex", void 0);
__decorate([
    property()
], SfIForm.prototype, "selectedId", void 0);
__decorate([
    property()
], SfIForm.prototype, "selectedSearchId", void 0);
__decorate([
    property()
], SfIForm.prototype, "label", void 0);
__decorate([
    property()
], SfIForm.prototype, "name", void 0);
__decorate([
    property()
], SfIForm.prototype, "selectedSearchStrings", void 0);
__decorate([
    query('#button-submit')
], SfIForm.prototype, "_sfButtonSubmit", void 0);
__decorate([
    query('#button-trail')
], SfIForm.prototype, "_sfButtonTrail", void 0);
__decorate([
    query('#input-search')
], SfIForm.prototype, "_sfInputSearch", void 0);
__decorate([
    query('#input-select')
], SfIForm.prototype, "_sfInputSelect", void 0);
__decorate([
    query('#sf-button-delete')
], SfIForm.prototype, "_sfButtonDelete", void 0);
__decorate([
    query('.div-row-error')
], SfIForm.prototype, "_SfRowError", void 0);
__decorate([
    query('.div-row-error-message')
], SfIForm.prototype, "_SfRowErrorMessage", void 0);
__decorate([
    query('.div-row-success')
], SfIForm.prototype, "_SfRowSuccess", void 0);
__decorate([
    query('.div-row-success-message')
], SfIForm.prototype, "_SfRowSuccessMessage", void 0);
__decorate([
    query('.loader-element')
], SfIForm.prototype, "_SfLoader", void 0);
__decorate([
    query('#search-list-container')
], SfIForm.prototype, "_SfSearchListContainer", void 0);
__decorate([
    query('#logs-list-container')
], SfIForm.prototype, "_SfLogsListContainer", void 0);
__decorate([
    query('#button-back')
], SfIForm.prototype, "_SfButtonBack", void 0);
__decorate([
    query('#button-edit')
], SfIForm.prototype, "_SfButtonEdit", void 0);
__decorate([
    query('#button-delete')
], SfIForm.prototype, "_SfButtonDelete", void 0);
__decorate([
    query('#button-new')
], SfIForm.prototype, "_SfButtonNew", void 0);
__decorate([
    query('#button-delete-confirm')
], SfIForm.prototype, "_SfButtonDeleteConfirm", void 0);
__decorate([
    query('#button-edit-cancel')
], SfIForm.prototype, "_SfButtonEditCancel", void 0);
__decorate([
    query('#button-delete-cancel')
], SfIForm.prototype, "_SfButtonDeleteCancel", void 0);
__decorate([
    queryAssignedElements({ slot: 'form' })
], SfIForm.prototype, "_SfFormC", void 0);
SfIForm = __decorate([
    customElement('sf-i-form')
], SfIForm);
export { SfIForm };
//# sourceMappingURL=sf-i-form.js.map