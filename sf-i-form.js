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
        this.inputs = "[]";
        this.fields = "[]";
        this.searchFields = "[]";
        this.selectedValues = "[]";
        // @query('.newC')
        // _SfNewC: any;
        // @query('.input-new')
        // _SfInputNew: any;
        // @query('#input-select')
        // _SfInputSelect: any;
        // dispatchMyEvent = (ev: string, args?: any) => {
        //   const event = new CustomEvent(ev, {detail: args, bubbles: true, composed: true});
        //   this.dispatchEvent(event);
        // }
        // renderList = (values: Array<any>) => {
        //   if(this.mode == "admin") {
        //     var innerHTML = '';
        //     innerHTML = '<table><tr><th>Id</th><th>Name</th><th>Action</th></tr>'
        //     for(var i = 0; i < values.length; i++) {
        //       innerHTML += '<tr>';
        //       innerHTML += '<td class="tcId">';
        //       innerHTML += values[i].id;
        //       innerHTML += '</td>';
        //       innerHTML += '<td class="tcName">';
        //       innerHTML += '<span id="text-'+values[i].id+'">' + values[i].name + '</span>';
        //       innerHTML += '<input class="hide" id="input-'+values[i].id+'" type="text" value="'+values[i].name+'" />';
        //       innerHTML += '</td>';
        //       innerHTML += '<td class="tcActions">';
        //       innerHTML += '<button id="edit-'+values[i].id+'">Edit</button>';
        //       innerHTML += '<button id="cancel-'+values[i].id+'" class="hide">Cancel</button>';
        //       innerHTML += '<button id="submit-'+values[i].id+'" class="hide">Submit</button>';
        //       innerHTML += '<button id="delete-'+values[i].id+'">Delete</button>';
        //       innerHTML += '<button id="canceld-'+values[i].id+'" class="hide">Cancel</button>';
        //       innerHTML += '<button id="confirm-'+values[i].id+'" class="hide">Confirm Delete</button>';
        //       innerHTML += '</td>';
        //       innerHTML += '</tr>';
        //     }
        //     this._SfTableC.innerHTML = innerHTML;
        //     for(var i = 0; i < values.length; i++) {
        //       this._SfTableC.querySelector('#edit-'+values[i].id+'').addEventListener('click', (event: any)=> {
        //         const id = event.target?.id.replace('edit-', '');
        //         this._SfTableC.querySelector('#edit-'+id+'').style.display = 'none';
        //         this._SfTableC.querySelector('#delete-'+id+'').style.display = 'none';
        //         this._SfTableC.querySelector('#text-'+id+'').style.display = 'none';
        //         this._SfTableC.querySelector('#cancel-'+id+'').style.display = 'inline';
        //         this._SfTableC.querySelector('#submit-'+id+'').style.display = 'inline';
        //         this._SfTableC.querySelector('#input-'+id+'').style.display = 'inline';
        //       })
        //       this._SfTableC.querySelector('#cancel-'+values[i].id+'').addEventListener('click', (event: any)=> {
        //         const id = event.target?.id.replace('cancel-', '');
        //         this._SfTableC.querySelector('#edit-'+id+'').style.display = 'inline';
        //         this._SfTableC.querySelector('#delete-'+id+'').style.display = 'inline';
        //         this._SfTableC.querySelector('#text-'+id+'').style.display = 'inline';
        //         this._SfTableC.querySelector('#cancel-'+id+'').style.display = 'none';
        //         this._SfTableC.querySelector('#submit-'+id+'').style.display = 'none';
        //         this._SfTableC.querySelector('#input-'+id+'').style.display = 'none';
        //       })
        //       this._SfTableC.querySelector('#input-'+values[i].id+'').addEventListener('keyup', (event: any)=> {
        //         const id = event.target?.id.replace('input-', '');
        //         const name = event.target.value;
        //         if(Util.validateName(name)) {
        //           this._SfTableC.querySelector('#submit-'+id+'').removeAttribute('disabled');
        //         } else {
        //           this._SfTableC.querySelector('#submit-'+id+'').setAttribute('disabled', true);
        //         }
        //       });
        //       this._SfTableC.querySelector('#confirm-'+values[i].id+'').addEventListener('click', async (event: any)=> {
        //         this.clearMessages();
        //         const id = event.target?.id.replace('confirm-', '');
        //         const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
        //         const xhr : any = (await this.prepareXhr({"id": id}, "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/delete", this._SfLoader, authorization)) as any;
        //         this._SfLoader.innerHTML = '';
        //         if(xhr.status == 200) {
        //           this.setSuccess('Operation Successful!');
        //           setTimeout(() => {
        //             this.clearMessages();
        //             this._SfNewC.querySelector('.input-new').value = "";
        //             this.populateList();
        //           }, 1000);
        //         } else {
        //           const jsonRespose = JSON.parse(xhr.responseText);
        //           this.setError(jsonRespose.error);
        //         }
        //       });
        //       this._SfTableC.querySelector('#delete-'+values[i].id+'').addEventListener('click', async (event: any)=> {
        //         const id = event.target?.id.replace('delete-', '');
        //         event.target.style.display = 'none';
        //         this._SfTableC.querySelector('#edit-'+id+'').style.display = 'none';
        //         this._SfTableC.querySelector('#confirm-'+id+'').style.display = 'inline';
        //         this._SfTableC.querySelector('#canceld-'+id+'').style.display = 'inline';
        //       });
        //       this._SfTableC.querySelector('#canceld-'+values[i].id+'').addEventListener('click', async (event: any)=> {
        //         const id = event.target?.id.replace('canceld-', '');
        //         event.target.style.display = 'none';
        //         this._SfTableC.querySelector('#edit-'+id+'').style.display = 'inline';
        //         this._SfTableC.querySelector('#delete-'+id+'').style.display = 'inline';
        //         this._SfTableC.querySelector('#confirm-'+id+'').style.display = 'none';
        //         this._SfTableC.querySelector('#canceld-'+id+'').style.display = 'none';
        //       });
        //       this._SfTableC.querySelector('#submit-'+values[i].id+'').addEventListener('click', async (event: any)=> {
        //         this.clearMessages();
        //         const id = event.target?.id.replace('submit-', '');
        //         const name = this._SfTableC.querySelector('#input-'+id+'').value;
        //         const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
        //         const xhr : any = (await this.prepareXhr({"name": name, "id": id}, "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/update", this._SfLoader, authorization)) as any;
        //         this._SfLoader.innerHTML = '';
        //         if(xhr.status == 200) {
        //           this.setSuccess('Operation Successful!');
        //           setTimeout(() => {
        //             this.clearMessages();
        //             this._SfNewC.querySelector('.input-new').value = "";
        //             this.populateList();
        //           }, 1000);
        //         } else {
        //           const jsonRespose = JSON.parse(xhr.responseText);
        //           this.setError(jsonRespose.error);
        //         }
        //       });
        //     }
        //     this._SfNewC.querySelector('.button-new').addEventListener('click', ()=> {
        //       this._SfNewC.querySelector('.button-new').style.display = 'none';
        //       this._SfNewC.querySelector('.button-submit').style.display = 'inline';
        //       this._SfNewC.querySelector('.button-cancel').style.display = 'inline';
        //       this._SfNewC.querySelector('.input-new').style.display = 'inline';
        //     })
        //     this._SfNewC.querySelector('.button-cancel').addEventListener('click', ()=> {
        //       this._SfNewC.querySelector('.button-new').style.display = 'inline';
        //       this._SfNewC.querySelector('.button-submit').style.display = 'none';
        //       this._SfNewC.querySelector('.button-cancel').style.display = 'none';
        //       this._SfNewC.querySelector('.input-new').style.display = 'none';
        //     })
        //     this._SfNewC.querySelector('.input-new').addEventListener('keyup', ()=> {
        //       const name = this._SfNewC.querySelector('.input-new').value;
        //       if(Util.validateName(name)) {
        //         this._SfNewC.querySelector('.button-submit').removeAttribute('disabled');
        //       } else {
        //         this._SfNewC.querySelector('.button-submit').setAttribute('disabled', true);
        //       }
        //     });
        //     this._SfNewC.querySelector('.button-submit').addEventListener('click', async ()=> {
        //     });
        //   } else {
        //     var innerHTML = '';
        //     for(var i = 0; i < values.length; i++) {
        //       if(this.selectedId != null && this.selectedId.length > 0) {
        //         if(values[i].id == this.selectedId) {
        //           innerHTML += '<option value="'+values[i].id+'" selected>'+values[i].name+'</option>'
        //           continue;
        //         }
        //       }
        //       innerHTML += '<option value="'+values[i].id+'">'+values[i].name+'</option>'
        //     }
        //     this._sfSelect.innerHTML = innerHTML;
        //     console.log('renderlist', innerHTML);
        //     this.dispatchMyEvent("renderComplete", {});
        //   }
        // }
        // onChangeSelect = (ev: any) => {
        //   this.dispatchMyEvent("valueChanged", {newValue: ev.target.value});
        // }
        // populateList = async () => {
        //   console.log('pop list');
        //   const xhr : any = (await this.prepareXhr({}, "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/list", this._SfLoader, null)) as any;
        //   this._SfLoader.innerHTML = '';
        //   if(xhr.status == 200) {
        //     const jsonRespose = JSON.parse(xhr.responseText);
        //     const values = jsonRespose.data.values;
        //     this.renderList(values)
        //   }
        // }
        // initState = async () => {
        //   console.log('mode', this.mode);
        //   if(this.mode == "read") {
        //     this._sfSelect.setAttribute("disabled", true);
        //   }
        // }
        this.getSelectedValues = () => {
            return JSON.parse(this.selectedValues);
        };
        this.getSearchFields = () => {
            return JSON.parse(this.searchFields);
        };
        this.getFields = () => {
            return JSON.parse(this.fields);
        };
        this.getDependencies = () => {
            return JSON.parse(this.dependencies);
        };
        this.getInputs = () => {
            return JSON.parse(this.inputs);
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
        this.submit = async () => {
            this.clearMessages();
            const body = {};
            let url = "";
            if (this.mode == "edit" || this.mode == "create") {
                const values = {};
                for (var i = 0; i < this.getFields().length; i++) {
                    const field = this.getFields()[i];
                    values[field] = this.getInputValue(this.getInputs()[i]);
                }
                body["values"] = values;
                body["searchindex"] = this.searchIndex;
                body["searchfields"] = this.getSearchFields();
                if (this.mode == "edit") {
                    body["id"] = this.selectedId;
                    url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/edit";
                }
                else {
                    url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/create";
                }
            }
            else if (this.mode == "delete") {
                body["id"] = this.selectedId;
                url = "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/delete";
            }
            console.log(body);
            // const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, null));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                this.setSuccess('Operation Successful!');
                setTimeout(() => {
                    this.clearMessages();
                }, 1000);
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
                else {
                    if (element.value.length === 0) {
                        evaluate = false;
                        break;
                    }
                }
                console.log(element.nodeName, evaluate);
            }
            if (evaluate) {
                (_a = this._sfButtonSubmit) === null || _a === void 0 ? void 0 : _a.removeAttribute('disabled');
            }
            else {
                (_b = this._sfButtonSubmit) === null || _b === void 0 ? void 0 : _b.setAttribute('disabled', true);
            }
        };
        this.processDependencies = () => {
            for (var i = 0; i < this.getDependencies().length; i++) {
                const parent = this.getDependencies()[i].parent;
                const child = this.getDependencies()[i].child;
                const parentElement = this._sfSlottedForm[0].querySelector('#' + parent);
                const childElement = this._sfSlottedForm[0].querySelector('#' + child);
                console.log('parent', parentElement);
                console.log('child', this._sfSlottedForm[0], child);
                parentElement === null || parentElement === void 0 ? void 0 : parentElement.addEventListener('valueChanged', (ev) => {
                    childElement.filterId = ev.detail.newValue;
                    childElement.populateList();
                });
            }
        };
        this.initListeners = () => {
            var _a, _b;
            (_a = this._sfButtonSubmit) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                this.submit();
            });
            (_b = this._sfButtonDelete) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
                this.submit();
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
    }
    firstUpdated(_changedProperties) {
        this.initListeners();
        this.processDependencies();
        this.clearMessages();
        if (this.mode == "edit" || this.mode == "view") {
            this.populateSelectedValues();
        }
        this.processDisabled();
    }
    connectedCallback() {
        super.connectedCallback();
    }
    render() {
        let submit = (this.mode == "edit" || this.mode == "create") ? html `<button id="sf-button-submit" disabled>Submit</button>` : html ``;
        let del = this.mode == "delete" ? html `<button id="sf-button-delete">Delete</button>` : html ``;
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
            ${submit}
            ${del}
          </div>
          <div class="rb"></div>
        </div>
      </div>
    `;
        // if(this.mode == "admin") {
        //   return html`
        //     <div class="SfIFormCAdmin">
        //       <div class="d-flex justify-center">
        //         <h1 part="title">${this.name}</h1>
        //       </div>
        //       <div class="d-flex justify-center">
        //         <div part="badge" class="badge">Admin</div>
        //       </div>
        //       <br />
        //       <div class="newC">
        //         <div class="d-flex justify-center">
        //           <div class="lb"></div>
        //           <button class="button-new">New</button>
        //           <input class="input-new hide" type="text" placeholder="Name ..."/>
        //           <button class="button-cancel hide">Cancel</button>
        //           <button class="button-submit hide" disabled>Submit</button>
        //           <div class="rb"></div>
        //         </div>
        //       </div>
        //       <br />
        //       <div class="d-flex justify-center">
        //         <div class="loader-element"></div>
        //       </div>
        //       <br />
        //       <div class="d-flex justify-center">
        //         <div class="lb"></div>
        //         <div class="tableC">
        //         </div>
        //         <div class="rb"></div>
        //       </div>
        //     </div>
        //   `;
        // } else {
        //   return html`
        //     <div class="SfIFormC">
        //       <label>${this.label}</label>
        //       <div>
        //         <select id="input-select" @change="${this.onChangeSelect}">
        //         </select>
        //         <div class="loader-element"></div>
        //       </div>
        //     </div>
        //   `;
        // }
    }
};
// @property()
// label!: string;
// @property()
// name!: string;
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

    .SfIFormC div{
      display: flex;
      align-items: center;
    }

    .SfIFormC > div > select{
      flex-grow: 1;
    }

    .loader-element {
      margin-left: 5px;
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

    .div-row-error {
      display: none;
      align-items:center;
    }

    .div-row-error-message {
      color: red;
      padding: 5px;
      background-color: white;
      border: dashed 1px red;
      width: 100%;
      text-align: center;
    }

    .div-row-success {
      display: none;
      align-items:center;
    }

    .div-row-success-message {
      color: green;
      padding: 5px;
      background-color: white;
      border: dashed 1px green;
      width: 100%;
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
        width: 25%
      }
      .rb {
        width: 25%
      }

    }

  `;
__decorate([
    property()
], SfIForm.prototype, "mode", void 0);
__decorate([
    property()
], SfIForm.prototype, "dependencies", void 0);
__decorate([
    property()
], SfIForm.prototype, "inputs", void 0);
__decorate([
    property()
], SfIForm.prototype, "fields", void 0);
__decorate([
    property()
], SfIForm.prototype, "searchFields", void 0);
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
    query('#sf-button-submit')
], SfIForm.prototype, "_sfButtonSubmit", void 0);
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
    queryAssignedElements({ slot: 'form' })
], SfIForm.prototype, "_SfFormC", void 0);
SfIForm = __decorate([
    customElement('sf-i-form')
], SfIForm);
export { SfIForm };
//# sourceMappingURL=sf-i-form.js.map