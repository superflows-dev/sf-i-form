/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */

import {LitElement, html, css, PropertyValueMap} from 'lit';
import {customElement, query, queryAssignedElements, property} from 'lit/decorators.js';
import {SfISelect} from 'sf-i-select';
import {SfISubSelect} from 'sf-i-sub-select';
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
@customElement('sf-i-form')
export class SfIForm extends LitElement {
  
  @property()
  mode!: string;

  @property()
  flow: string = "";

  @property()
  searchPhrase!: string;

  @property()
  selectProjection!: string;

  @property()
  dependencies: string = "[]";

  @property()
  inputIds: string = "[]";

  @property()
  fields: string = "[]";

  @property()
  selectedViewToDetailValues: string = "[]";

  @property()
  unitFiltersNew: string = "[]";

  @property()
  unitFiltersDetail: string = "[]";

  @queryAssignedElements({slot: 'form'})
  _sfSlottedForm: any;

  @property()
  apiId!: string;

  @property()
  searchIndex!: string;

  @property()
  selectedId!: string;

  @property()
  selectedSearchId!: string;

  @property()
  label!: string;

  @property()
  name!: string;

  @property()
  shortlistedSearchPhrases: any = {};

  @property()
  removedValues: string[] = [];

  selectedValues = () => {

    const values = [];

    const len = this._sfInputSelect.options.length;
    for (var i = 0; i < len; i++) {
      const opt = this._sfInputSelect.options[i];
      if (opt.selected) {
        values.push(opt.value);
      }
    }

    console.log('returning values', values);

    return values;
  }

  selectedTexts = () => {

    const values = [];

    const len = this._sfInputSelect.options.length;
    for (var i = 0; i < len; i++) {
      const opt = this._sfInputSelect.options[i];
      if (opt.selected) {
        values.push(this._sfInputSelect.options[i].text)
      }
    }

    return values;

  }

  // @property()
  // selectedListSearchItemsValues: any[] = [];

  // @property()
  // selectedListSearchItemsTexts: any[] = [];

  // @property()
  // selectedValue = () => {
  //   return this._SfInputSelect.value;
  // }

  static override styles = css`
    
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

    ul {
      list-style-type:none;
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
      width: 90%;
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

      #search-list-container {
        overflow-x: auto;
        width: 40%;
      }
    }

  `;

  @query('#button-submit')
  _sfButtonSubmit: any;

  @query('#button-trail')
  _sfButtonTrail: any;

  @query('#input-search')
  _sfInputSearch: any;

  @query('#input-select')
  _sfInputSelect: any;

  @query('#input-list')
  _sfInputList: any;

  @query('#sf-button-delete')
  _sfButtonDelete: any;

  @query('.div-row-error')
  _SfRowError: any;

  @query('.div-row-error-message')
  _SfRowErrorMessage: any;

  @query('.div-row-success')
  _SfRowSuccess: any;

  @query('.div-row-success-message')
  _SfRowSuccessMessage: any;

  @query('.loader-element')
  _SfLoader: any;

  @query('#search-list-container')
  _SfSearchListContainer: any;

  @query('#logs-list-container')
  _SfLogsListContainer: any;

  @query('#button-back')
  _SfButtonBack: any;

  @query('#button-edit')
  _SfButtonEdit: any;

  @query('#button-delete')
  _SfButtonDelete: any;

  @query('#button-new')
  _SfButtonNew: any;

  @query('#button-delete-confirm')
  _SfButtonDeleteConfirm: any;

  @query('#button-edit-cancel')
  _SfButtonEditCancel: any;

  @query('#button-delete-cancel')
  _SfButtonDeleteCancel: any;

  @queryAssignedElements({slot: 'form'})
  _SfFormC: any;

  getUnitFiltersNew = () => {
    return JSON.parse(this.unitFiltersNew);
  }

  getUnitFiltersDetail = () => {
    return JSON.parse(this.unitFiltersDetail);
  }

  getSelectedViewToDetailValues = () => {
    return JSON.parse(this.selectedViewToDetailValues);
  }

  getFields = () => {
    return JSON.parse(this.fields);
  }

  getDependencies = () => {
    return JSON.parse(this.dependencies);
  }

  getInputs = () => {
    return JSON.parse(this.inputIds);
  }

  dispatchMyEvent = (ev: string, args?: any) => {

    console.log('dispatching event', ev);
    const event = new CustomEvent(ev, {detail: args, bubbles: true, composed: true});
    this.dispatchEvent(event);

  }

  onChangeSelect = (ev: any) => {

    // this.selectedListSearchItemsValues = [];
    // this.selectedListSearchItemsTexts = [];

    // const len = ev.target.options.length;
    // for (var i = 0; i < len; i++) {
    //   const opt = ev.target.options[i];
    //   if (opt.selected) {
    //     this.selectedListSearchItemsValues.push(opt.value);
    //     this.selectedListSearchItemsTexts.push(ev.target.options[i].text)
    //   } else {
    //     var index = this.selectedListSearchItemsValues.indexOf(opt.value);
    //     if (index !== -1) {
    //       this.selectedListSearchItemsValues.splice(index, 1);
    //       this.selectedListSearchItemsTexts.splice(index, 1);
    //     }
    //   }
    // }

    this.dispatchMyEvent("valueChanged", {newValue: ev.target.value, newText: ev.target.options[ev.target.selectedIndex].text});

    // console.log('change', this.selectedListSearchItemsTexts, this.selectedListSearchItemsValues);

  }

  clearSelection = () => {
    if(this.mode == "select" || this.mode == "list") {
      this._sfInputSelect.value = 'noselect';
    }
    // if(this.mode == "list") {
    //   this._sfInputList.value = 'noselect';
    // }
  }

  // getSelectedSearchId = () => {
  //   return this.selectedSearchId;
  // }

  // getSelectedSearchValue = () => {
  //   return (this._sfInputSelect as HTMLSelectElement).value;
  // }
  
  getSelectedSearchText = () => {
    if(this._sfInputSelect.selectedIndex >= 0) {
      return this._sfInputSelect.options[this._sfInputSelect.selectedIndex].text;
    } else {
      return null;
    }
  }

  getInputValue = (id: string) => {
    console.log('id', this._SfFormC, (this._SfFormC[0].querySelector('#' + id) as HTMLElement).tagName);

    var value = null;

    if((this._SfFormC[0].querySelector('#' + id) as HTMLElement).tagName.toLowerCase() == "sf-i-select") {
      value = {
        type: "sf-i-select",
        value: (this._SfFormC[0].querySelector('#' + id) as SfISelect).selectedValues(),
        text: (this._SfFormC[0].querySelector('#' + id) as SfISelect).selectedTexts()  
      }
    } else if ((this._SfFormC[0].querySelector('#' + id) as HTMLElement).tagName.toLowerCase() == "sf-i-sub-select") {
      value = {
        type: "sf-i-sub-select",
        value: (this._SfFormC[0].querySelector('#' + id) as SfISubSelect).selectedValues(),
        text: (this._SfFormC[0].querySelector('#' + id) as SfISubSelect).selectedTexts()  
      }
    } else if ((this._SfFormC[0].querySelector('#' + id) as HTMLElement).tagName.toLowerCase() == "sf-i-form") {
      value = {
        type: "sf-i-form",
        value: (this._SfFormC[0].querySelector('#' + id) as SfIForm).selectedValues(),
        text: (this._SfFormC[0].querySelector('#' + id) as SfIForm).selectedTexts()  
      }
    } else {
      value = (this._SfFormC[0].querySelector('#' + id)).value;
      value = {
        type: "input",
        value: (this._SfFormC[0].querySelector('#' + id)).value
      }
    }

    return value;
  }

  prepareXhr = async (data: any, url: string, loaderElement: any, authorization: any) => {

    
    if(loaderElement != null) {
      loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
    }
    return await Util.callApi(url, data, authorization);

  }

  clearMessages = () => {
    this._SfRowError.style.display = 'none';
    this._SfRowErrorMessage.innerHTML = '';
    this._SfRowSuccess.style.display = 'none';
    this._SfRowSuccessMessage.innerHTML = '';
  }

  setError = (msg: string) => {
    this._SfRowError.style.display = 'flex';
    this._SfRowErrorMessage.innerHTML = msg;
    this._SfRowSuccess.style.display = 'none';
    this._SfRowSuccessMessage.innerHTML = '';
  }

  setSuccess = (msg: string) => {
    this._SfRowError.style.display = 'none';
    this._SfRowErrorMessage.innerHTML = '';
    this._SfRowSuccess.style.display = 'flex';
    this._SfRowSuccessMessage.innerHTML = msg;
  }

  setListSelection = (value: string, text: string) => {
    
    // if(!this.selectedListSearchItemsValues.includes(value)) {
    //   this.selectedListSearchItemsValues.push(value);
    //   this.selectedListSearchItemsTexts.push(text);
    // } else {
    //   var index = this.selectedListSearchItemsValues.indexOf(value);
    //   if (index !== -1) {
    //     this.selectedListSearchItemsValues.splice(index, 1);
    //     this.selectedListSearchItemsTexts.splice(index, 1);
    //   }
    // }

    this.dispatchMyEvent("valueChanged", {newValue: value, newText: text});
    // console.log(this.selectedListSearchItemsTexts, this.selectedListSearchItemsValues);

  }

  renderSearch = (values: any) => {


    let html = '';

    if(values.length > 0) {

      html += '<h3>Search Results ('+values.length+')</h3>'
      
      html += '<table>';
      console.log('search', values);
      for(var i = 0; i < values.length; i++) {

        console.log(JSON.parse(values[i].fields.data));
        let data = JSON.parse(values[i].fields.data);

        html += '<tr>';
        html += '<td class="link">';
        html += '<div id="search-'+i+'"><strong>' + values[i].fields.name[0] + '</strong></div>';
        html += '</td>';
        html += '<td>&nbsp;→&nbsp;</td>'
        for(var j = 0; j < data.length; j++) {

          console.log('data', data[j]);

          html += '<td>&nbsp;';
          html += '<span>';
          if(Array.isArray(data[j])) {

            for(var k = 0; k < data[j].length; k++) {
              html += data[j][k];
              if(k < (data[j].length - 1)) {
                html += " &nbsp; ";
              }
            }

          } else {
            html += data[j]
          }
          html += '</span>';
          html += '&nbsp;</td>';
        }
        html += '</tr>';

      }
      html += '</table>';
      this._SfSearchListContainer.innerHTML = html;

      for(var i = 0; i < values.length; i++) {

        console.log(this._SfSearchListContainer.querySelector('#search-' + i))
        this._SfSearchListContainer.querySelector('#search-' + i).addEventListener('click', (ev: any) => {
          console.log('id', ev.currentTarget.id)
          this.selectedId = values[parseInt((ev.currentTarget.id + "").split('-')[1])].id
          this.mode = "detail";
          this.loadMode();
        });

      }

    } else {

      html += '<h3>No Records Found</h3>'
      this._SfSearchListContainer.innerHTML = html;

    }

  }

  renderSelect = (values: any) => {

    var html = '';

    html += '<option value="noselect" '+ ((this.selectedSearchId == null || this.selectedSearchId.length === 0) ? 'selected' : '') +' hidden disabled>Select</option>'

    for(var i = 0; i < values.length; i++) {

      const fields = values[i].fields;
      const id =  values[i].id;

      if(this.removedValues.includes(id)) continue;

      html += '<option value="'+id+'" '+ (this.selectedSearchId == id ? 'selected' : '') +'>'+fields[this.selectProjection]+'</option>';

    }

    this._sfInputSelect.innerHTML = html;

  }

  renderList = (values: any) => {

    var html = '';

    //html += '<li value="noselect" '+ ((this.selectedSearchId == null || this.selectedSearchId.length === 0) ? 'selected' : '') +' hidden disabled>Select</li>'

    for(var i = 0; i < values.length; i++) {

      const fields = values[i].fields;
      const id =  values[i].id;
      const data = JSON.parse(fields.data);

      if(this.removedValues.includes(id)) continue;

      html += '<li value="'+id+'" '+ (this.selectedSearchId == id ? 'selected' : '') +' class="d-flex align-center">';
      html += '<input id="checkbox-'+i+'" type="checkbox" />&nbsp;'
      html += '<div><strong>'+fields[this.selectProjection]+'</strong>&nbsp;&nbsp;&nbsp;→&nbsp;&nbsp;&nbsp;</div>';
      for(var j = 0; j < data.length; j++) {
        html += '<div>' + data[j] + ' &nbsp;&nbsp;</div>';
      }
      html += '</li>';

    }

    this._sfInputList.innerHTML = html;

    for(var i = 0; i < values.length; i++) {
      (this._sfInputList as HTMLElement).querySelector('#checkbox-' + i)?.addEventListener('click', (ev: any) => {
        const i = ev.target.id.split("-")[1];
        this.setListSelection(values[i].id, values[i].fields[this.selectProjection]);
      });
    }

  }

  renderLogs = (values: any) => {

    console.log('values', values);

    let html = '';

    if(values.length > 0) {

      html += '<h3>Logs Results ('+values.length+')</h3>'
      
      for(var i = 0; i < values.length; i++) {

        console.log('timestamp', (new Date(values[i].timestamp)));

        html += '<table>';
        html += '<tr>';
        html += '<td>';
        html += '<div><button id="button-collapse-'+i+'" class="material-icons gone button-icon-small">expand_less</button><button id="button-expand-'+i+'" class="material-icons button-icon-small">expand_more</button></div>';
        html += '</td>';
        html += '<td class="link">';
        html += '<div id="search-'+i+'"><strong>' + (new Date(values[i].timestamp) + "").split(' (')[0] + '</strong></div>';
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
        html += '<div id="row-expand-'+i+'" class="gone"><small>';
        html += '<strong>Request</strong> - ' + JSON.stringify(JSON.parse(values[i].message).req.body) + '<br />';
        html += '<strong>Response</strong> - ' + JSON.stringify(JSON.parse(values[i].message).resp.body) + '';
        html += '</small></div>';
        html += '</td>';
        html += '</tr>';
        html += '</table>';

      }
      this._SfLogsListContainer.innerHTML = html;

      for(var i = 0; i < values.length; i++) {

        this._SfLogsListContainer.querySelector('#button-expand-'+i).addEventListener('click', (ev: any) => {
          const id = (ev.currentTarget as HTMLElement).id;
          this._SfLogsListContainer.querySelector('#row-expand-'+id.split('-')[2]).style.display = 'block';
          this._SfLogsListContainer.querySelector('#button-collapse-'+id.split('-')[2]).style.display = 'block';
          this._SfLogsListContainer.querySelector('#button-expand-'+id.split('-')[2]).style.display = 'none';
        });

        this._SfLogsListContainer.querySelector('#button-collapse-'+i).addEventListener('click', (ev: any) => {
          const id = (ev.currentTarget as HTMLElement).id;
          this._SfLogsListContainer.querySelector('#row-expand-'+id.split('-')[2]).style.display = 'none';
          this._SfLogsListContainer.querySelector('#button-collapse-'+id.split('-')[2]).style.display = 'none';
          this._SfLogsListContainer.querySelector('#button-expand-'+id.split('-')[2]).style.display = 'block';
        });

      }

    } else {

      html += '<h3>No Records Found</h3>'
      this._SfLogsListContainer.innerHTML = html;

    }

  }

  renderDetail = (value: any) => {

    var sValues = '';

    sValues += '[';
    for(var i = 0; i < this.getFields().length; i++) {

      console.log('fields', value[this.getFields()[i]], Array.isArray(JSON.parse(value[this.getFields()[i]])));

      if(Array.isArray(JSON.parse(value[this.getFields()[i]]))) {

        sValues += '[';

        for(var j = 0; j < JSON.parse(value[this.getFields()[i]]).length; j++) {

          sValues += '"';
          sValues += JSON.parse(value[this.getFields()[i]])[j];
          sValues += '",';

        }

        sValues = sValues.replace(/(^,)|(,$)/g, "")
        sValues += '],';

      } else {

        //sValues += '"';
        sValues += value[this.getFields()[i]];
        //sValues += '",';
        sValues += ',';

      }

    }
    sValues = sValues.replace(/(^,)|(,$)/g, "")
    sValues += ']';

    console.log('selected values', sValues);

    this.selectedViewToDetailValues = sValues;
    

  }

  fetchSearch = async () => {

    this.clearMessages();

    const body: any = {"searchstring": this._sfInputSearch.value + "*"};
    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/list";

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {
      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      this.renderSearch(jsonRespose.values);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
    }

  }

  fetchSearchSelect = async () => {

    const body: any = {"searchstring": this.searchPhrase + "*"};
    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/list";

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {
      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      this.renderSelect(jsonRespose.values);
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
    }

  }

  fetchSearchList = async () => {

    const body: any = {"searchstring": this.searchPhrase + "*"};
    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/list";

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {
      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      this.renderList(jsonRespose.values);
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
    }

  }

  fetchDetail = async () => {

    const body: any = {"id": this.selectedId};
    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/detail";

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {
      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('detail', jsonRespose);
      this.renderDetail(jsonRespose.data.value);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
    }

  }

  fetchLogs = async () => {

    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/logs";
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {
      const jsonRespose = JSON.parse(xhr.responseText);
      console.log(jsonRespose);
      this.renderLogs(jsonRespose.data);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
    }

  }

  submitDelete = async () => {

    this.clearMessages();

    const body: any = {};
    let url = "";

    body["id"] = this.selectedId;
    url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/delete";

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {
      this.setSuccess('Operation Successful!');
      setTimeout(() => {
        this.clearMessages();
        this._SfButtonBack.dispatchEvent(new Event('click'));
      }, 2000);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
    }

  }

  submitNew = async () => {

    this.clearMessages();

    const body: any = {};
    let url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/create";

    const values: any = {};

    for(var i = 0; i < this.getFields().length; i++) {

      const field = this.getFields()[i] as string;
      values[field] = this.getInputValue(this.getInputs()[i])

    }

    body["values"] = values; 

    console.log(JSON.stringify(body));

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {
      this.setSuccess('Operation Successful!');
      this.clearInputs();
      setTimeout(() => {
        this.clearMessages();
      }, 2000);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages();
      }, 2000);
    }

  }

  submitEdit = async () => {

    this.clearMessages();

    const body: any = {};
    let url = "";

    const values: any = {};

    for(var i = 0; i < this.getFields().length; i++) {

      const field = this.getFields()[i] as string;
      values[field] = this.getInputValue(this.getInputs()[i])

    }

    body["values"] = values;
    body["id"] = this.selectedId;
    url = "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/update";

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if(xhr.status == 200) {
      this.setSuccess('Operation Successful!');
      setTimeout(() => {
        this._SfButtonBack.click();
      }, 2000);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
    }

  }

  evalSubmit = () => {

    var evaluate = true;

    console.log('inputs', this.getInputs());

    for(var i = 0; i < this.getInputs().length; i++) {

      const id = this.getInputs()[i];
      const element = (this._sfSlottedForm[0].querySelector('#' + id) as HTMLElement);

      if(element.nodeName.toLowerCase() == "sf-i-select") {
        const elementSfISelect = element as SfISelect;
        if(element.hasAttribute('mandatory') && (elementSfISelect.selectedValues().length === 0 || elementSfISelect.selectedIndex() === 0)) {
          console.log('evaluate false return', element, elementSfISelect.selectedValues().length, elementSfISelect.selectedIndex())
          evaluate = false;
          break;
        }
      } else if(element.nodeName.toLowerCase() == "sf-i-sub-select") {
        const elementSfISubSelect = element as SfISubSelect;
        if(element.hasAttribute('mandatory') && (elementSfISubSelect.selectedValues().length === 0 || elementSfISubSelect.selectedIndex() === 0)) {
          console.log('evaluate false return', element, elementSfISubSelect.selectedValues().length, elementSfISubSelect.selectedIndex())
          evaluate = false;
          break;
        } 
      } else if(element.nodeName.toLowerCase() == "sf-i-form") {
        const elementSfIForm = element as SfIForm;

        console.log('evalsubmit', elementSfIForm.mode, element.hasAttribute('mandatory'), elementSfIForm.selectedValues().length);

        if(element.hasAttribute('mandatory') && elementSfIForm.selectedValues().length === 0) {
          console.log('evaluate false return', element)
          evaluate = false;
          break;
        }
        
      } else {

        if(element.hasAttribute('mandatory') && (element as HTMLInputElement).value.length === 0) {
          console.log('evaluate false return', element)
          evaluate = false;
          break;
        }
      }

    }

    console.log('evaluate', evaluate);

    if(evaluate) {
      this._sfButtonSubmit?.removeAttribute('disabled');
    } else {
      this._sfButtonSubmit?.setAttribute('disabled', true);
    }

  }

  disableConfirm = (value: boolean) => {

    if(!value) {
      //(this._sfButtonTrail as HTMLButtonElement).style.display = 'none';
      (this._SfButtonEditCancel as HTMLButtonElement).style.display = 'none';
      (this._SfButtonDeleteConfirm as HTMLButtonElement).style.display = 'block';
      (this._SfButtonDeleteCancel as HTMLButtonElement).style.display = 'block';
      (this._SfButtonEdit as HTMLButtonElement).style.display = 'none';
      (this._SfButtonDelete as HTMLButtonElement).style.display = 'none';
      (this._sfButtonSubmit as HTMLButtonElement).style.display = 'none';
    } else {
      this.disableEdit(true);
    }

  }

  disableEdit = (value: boolean) => {

    if(value) {
      // (this._sfButtonTrail as HTMLButtonElement).style.display = 'block';
      (this._SfButtonEditCancel as HTMLButtonElement).style.display = 'none';
      (this._SfButtonDeleteConfirm as HTMLButtonElement).style.display = 'none';
      (this._SfButtonDeleteCancel as HTMLButtonElement).style.display = 'none';
      (this._SfButtonEdit as HTMLButtonElement).style.display = 'block';
      (this._SfButtonDelete as HTMLButtonElement).style.display = 'block';
      (this._sfButtonSubmit as HTMLButtonElement).style.display = 'none';
    } else {
      // (this._sfButtonTrail as HTMLButtonElement).style.display = 'none';
      (this._SfButtonEditCancel as HTMLButtonElement).style.display = 'block';
      (this._SfButtonDeleteConfirm as HTMLButtonElement).style.display = 'none';
      (this._SfButtonDeleteCancel as HTMLButtonElement).style.display = 'none';
      (this._SfButtonEdit as HTMLButtonElement).style.display = 'none';
      (this._SfButtonDelete as HTMLButtonElement).style.display = 'none';
      (this._sfButtonSubmit as HTMLButtonElement).style.display = 'block';
      
    }

  }

  formatShortlistedSearchPhrase = () => {

    var searchStr = "";

    for(var i = 0; i < Object.keys(this.shortlistedSearchPhrases).length; i++) {
      searchStr += (this.shortlistedSearchPhrases[Object.keys(this.shortlistedSearchPhrases)[i]])
      if(i < (Object.keys(this.shortlistedSearchPhrases).length - 1)) {
        searchStr += '|'
      }
    }

    this.searchPhrase = searchStr;

  }

  updateShortlistedSearchPhrase = (parents: any, childElement: any) => {

    for(var k = 0; k < parents.length; k++) {

      const parentElement = (this._sfSlottedForm[0].querySelector('#' + parents[k]) as HTMLElement);
      if(parentElement.nodeName.toLowerCase() == "sf-i-select") {

        var selText = '';
        for(var l = 0; l < (parentElement as SfISelect).selectedTexts().length; l++) {
          selText += (parentElement as SfISelect).selectedTexts()[l]
          if(l < ((parentElement as SfISelect).selectedTexts().length - 1)) {
            selText += '|'
          }
        }
        childElement.shortlistedSearchPhrases[parentElement.id] = selText

      } else if(parentElement.nodeName.toLowerCase() == "sf-i-sub-select") {

        var selText = '';
        for(var l = 0; l < (parentElement as SfISubSelect).selectedTexts().length; l++) {
          selText += (parentElement as SfISubSelect).selectedTexts()[l]
          if(l < ((parentElement as SfISubSelect).selectedTexts().length - 1)) {
            selText += '|'
          }
        }
        childElement.shortlistedSearchPhrases[parentElement.id] = selText

      }

    }
    childElement.formatShortlistedSearchPhrase();
    childElement.loadMode();

  }

  processDependencies = () => {

    for(var i = 0; i < this.getDependencies().length; i++) {
      
      const type = this.getDependencies()[i].type;

      if(type == "searchable") {

        const parents = this.getDependencies()[i].parents;
        const child = this.getDependencies()[i].child;
        const childElement = (this._sfSlottedForm[0].querySelector('#' + child) as SfIForm);

        for(var j = 0; j < parents.length; j++) {

          const parent = parents[j];
          const parentElement = (this._sfSlottedForm[0].querySelector('#' + parent) as HTMLElement);

          parentElement?.addEventListener('valueChanged', () => {
            this.updateShortlistedSearchPhrase(parents, childElement);
          });

          parentElement?.addEventListener('renderComplete', () => {
            this.updateShortlistedSearchPhrase(parents, childElement);
          });

        }

      } else {

        const parent = this.getDependencies()[i].parent;
        const child = this.getDependencies()[i].child;
  
        const parentElement = (this._sfSlottedForm[0].querySelector('#' + parent) as SfISelect);
        const childElement = (this._sfSlottedForm[0].querySelector('#' + child) as SfISubSelect);
  
        parentElement?.addEventListener('valueChanged', (ev: any) => {
          childElement.filterId = ev.detail.newValue;
          childElement.populateList();
        });
  
        childElement.filterId = parentElement.selectedValues()[0];
        childElement.populateList();

      }


    }

  }

  initDisableInputs = (value: boolean) => {

    for(var i = 0; i < this.getInputs().length; i++) {

      const element = this._sfSlottedForm[0].querySelector('#' + this.getInputs()[i]);

      if(element.nodeName.toLowerCase() == "sf-i-select") {
        (element as SfISelect).mode = value ? "read" : "";
        (element as SfISelect).initState();
      } else if (element.nodeName.toLowerCase() == "sf-i-sub-select") {
        (element as SfISubSelect).mode = value ? "read" : "";
        (element as SfISubSelect).initState();
      } else if (element.nodeName.toLowerCase() == "sf-i-form") {
        console.log('init disabling form', (element as SfIForm).mode);
        (element as SfIForm).flow = value ? "read" : "";
        (element as SfIForm).loadMode();
        //(element as SfIForm).initState();
      } else {
        if(value) {
          (element as HTMLInputElement).setAttribute('disabled', 'disabled');
        } else {
          (element as HTMLInputElement).removeAttribute('disabled');
        }
        
      }

    }

  }

  clearInputs = () => {

    for(var i = 0; i < this.getInputs().length; i++) {

      const element = this._sfSlottedForm[0].querySelector('#' + this.getInputs()[i]);

      if(element.nodeName.toLowerCase() == "sf-i-select") {

        (element as SfISelect).selectedId = "";
        (element as SfISelect).clearSelection();

        // if((element as SfISelect).selectedId == null || (element as SfISelect).selectedId == "") {
        //   (element as SfISelect).clearSelection();
        // }

      } else if (element.nodeName.toLowerCase() == "sf-i-sub-select") {

        (element as SfISubSelect).selectedId = "";
        (element as SfISubSelect).clearSelection();

        // if((element as SfISubSelect).selectedId == null || (element as SfISubSelect).selectedId == "") {
        //   (element as SfISubSelect).clearSelection();
        // }

      } else if (element.nodeName.toLowerCase() == "sf-i-form") {

        (element as SfIForm).selectedSearchId = "";
        (element as SfIForm).clearSelection();

        // if((element as SfIForm).selectedSearchId == null || (element as SfIForm).selectedSearchId == "") {
        //   (element as SfIForm).clearSelection();
        // }
        

      } else {

        (element as HTMLInputElement).value = "";

      }

    }

  }

  removeItemByValue = (value: string) => {

    if(!this.removedValues.includes(value)) this.removedValues.push(value);

  }

  processFormLayouting = () => {

    for(var i = 0; i < this.getInputs().length; i++) {

      const element = this._sfSlottedForm[0].querySelector('#' + this.getInputs()[i]);

      if(element.nodeName.toLowerCase() == "sf-i-select") {

      } else if (element.nodeName.toLowerCase() == "sf-i-sub-select") {

      } else {

        //(element as HTMLInputElement).style.width = '98%';

      }

    }

    this._sfButtonSubmit.style.width = '100%';

  }

  initListenersView = () => {

    console.log('init listeners view');

    this._sfInputSearch?.addEventListener('keyup', () => {

      console.log('keyup called');
      this.searchPhrase = this._sfInputSearch.value;
      if(this._sfInputSearch.value.length > 2) {
        this.fetchSearch();
      }
      
    });

    this._SfButtonNew?.addEventListener('click', () => {
      this.mode = "new";
      this.loadMode();
    });

    this._sfButtonTrail.addEventListener('click', () => {
      console.log('trail clicked');
      this.mode = "trail";
      this.loadMode();
    });


  }

  initListenersTrail = () => {

    this._SfButtonBack.addEventListener('click', () => {
      this.mode = "view";
      this.loadMode();
    });

  }

  clearUnitFilters = () => {

    for(var i = 0; i < this.getInputs().length; i++) {

      const element = this._sfSlottedForm[0].querySelector('#' + this.getInputs()[i]);

      if(element.nodeName.toLowerCase() == "sf-i-select") {

        (element as SfISelect).removedValues = [];

      } else if (element.nodeName.toLowerCase() == "sf-i-sub-select") {

        (element as SfISubSelect).removedValues = [];
        
      } else if (element.nodeName.toLowerCase() == "sf-i-form") {

        (element as SfIForm).removedValues = [];
        
      }

    }

  }

  initListenersNew = () => {

    this._SfButtonBack.addEventListener('click', () => {
      this.mode = "view";
      this.loadMode();
    });

    this._sfButtonSubmit.addEventListener('click', () => {
      this.submitNew();
    });


    for(var i = 0; i < this.getInputs().length; i++) {

      const element = this._sfSlottedForm[0].querySelector('#' + this.getInputs()[i]);

      if(element.nodeName.toLowerCase() == "sf-i-select") {

        element.addEventListener('valueChanged', () => {
          this.evalSubmit();
        });

      } else if (element.nodeName.toLowerCase() == "sf-i-sub-select") {

        element.addEventListener('valueChanged', () => {
          this.evalSubmit();
        });

      } else if (element.nodeName.toLowerCase() == "sf-i-form") {

        element.addEventListener('valueChanged', () => {
          this.evalSubmit();
        });

      } else {

        element.addEventListener('keyup', () => {
          this.evalSubmit();
        });

      }

    }

  }

  initListenersDetail = () => {
    this._SfButtonBack.addEventListener('click', () => {
      this.mode = "view";
      this.loadMode();
    });
    this._SfButtonEdit.addEventListener('click', () => {
      this.disableEdit(false);
      this.initDisableInputs(false)
    })
    this._SfButtonEditCancel.addEventListener('click', () => {
      this.disableEdit(true);
      this.initDisableInputs(true)
    })
    this._SfButtonDelete.addEventListener('click', () => {
      this.disableConfirm(false);
    })
    this._SfButtonDeleteCancel.addEventListener('click', () => {
      this.disableConfirm(true);
    })
    this._sfButtonSubmit?.addEventListener('click', () => {
      console.log('submit clicked');
      this.submitEdit();
    });
    this._SfButtonDeleteConfirm.addEventListener('click', () => {
      this.submitDelete();
    })
    for(var i = 0; i < this.getInputs().length; i++) {

      const element = this._sfSlottedForm[0].querySelector('#' + this.getInputs()[i]);

      if(element.nodeName.toLowerCase() == "sf-i-select") {

        element.addEventListener('valueChanged', () => {
          this.evalSubmit();
        });

      } else if (element.nodeName.toLowerCase() == "sf-i-sub-select") {

        element.addEventListener('valueChanged', () => {
          this.evalSubmit();
        });

      } else if (element.nodeName.toLowerCase() == "sf-i-form") {

        element.addEventListener('valueChanged', () => {
          this.evalSubmit();
        });

      } else {

        element.addEventListener('keyup', () => {
          this.evalSubmit();
        });

      }

    }
  }

  populateSelectedViewToDetailValues = () => {

    console.log('populating selected', this.getSelectedViewToDetailValues());

    for(var i = 0; i < this.getInputs().length; i++) {

      const element = this._sfSlottedForm[0].querySelector('#' + this.getInputs()[i]);

      console.log(element, element.nodeName.toLowerCase());

      if(element.nodeName.toLowerCase() == "sf-i-select") {

        (element as SfISelect).selectedId = this.getSelectedViewToDetailValues()[i];
        (element as SfISelect).loadMode();

      } else if (element.nodeName.toLowerCase() == "sf-i-sub-select") {

        (element as SfISubSelect).selectedId = this.getSelectedViewToDetailValues()[i];
        (element as SfISubSelect).loadMode();

      } else if (element.nodeName.toLowerCase() == "sf-i-form") {

        (element as SfIForm).selectedSearchId = this.getSelectedViewToDetailValues()[i];
        (element as SfISubSelect).loadMode();

      } else {

        (element as HTMLInputElement).value = this.getSelectedViewToDetailValues()[i];

      }

    }

  }

  processDisabled = () => {

    for(var i = 0; i < this.getInputs().length; i++) {

      const element = this._sfSlottedForm[0].querySelector('#' + this.getInputs()[i]);
      if(this.mode == "view" || this.mode == "delete") {
        element.setAttribute('disabled', true);
      }

    }

  }

  processUnitFiltersNew = () => {

    console.log('filters', this.getUnitFiltersNew().length, "select");

    for(var i = 0; i < this.getUnitFiltersNew().length; i++) {

      if(this.getUnitFiltersNew()[i].op == "select") {

        const inputElement = this._SfFormC[0].querySelector('#' + this.getUnitFiltersNew()[i].input);
        const value = this.getUnitFiltersNew()[i].value;

        console.log('filters', inputElement, value, "select");

        if((inputElement as HTMLElement).tagName.toLowerCase() == "sf-i-select") {

          console.log('filters-select', "sf-i-select", value);
          (inputElement as SfISelect).selectedId = value;
          (inputElement as SfISelect).loadMode();

        } else if((inputElement as HTMLElement).tagName.toLowerCase() == "sf-i-sub-select") {

          console.log('filters-select', "sf-i-sub-select", value);
          (inputElement as SfISubSelect).selectedId = value;
          (inputElement as SfISubSelect).loadMode();

        } else if((inputElement as HTMLElement).tagName.toLowerCase() == "sf-i-form") {

          console.log('filters-select', "sf-i-form", value);
          (inputElement as SfIForm).selectedSearchId = value;
          (inputElement as SfIForm).loadMode();

        }

      }

      if(this.getUnitFiltersNew()[i].op == "remove") {

        const inputElement = this._SfFormC[0].querySelector('#' + this.getUnitFiltersNew()[i].input);
        const value = this.getUnitFiltersNew()[i].value;

        console.log('filters', inputElement, value, "remove");

        if((inputElement as HTMLElement).tagName.toLowerCase() == "sf-i-select") {

          console.log('filters-remove', "sf-i-select", value);
          (inputElement as SfISelect).removeItemByValue(value);
          (inputElement as SfISelect).loadMode();

        } else if((inputElement as HTMLElement).tagName.toLowerCase() == "sf-i-sub-select") {

          console.log('filters-remove', "sf-i-sub-select", value);
          (inputElement as SfISubSelect).removeItemByValue(value);
          (inputElement as SfISubSelect).loadMode();

        } else if((inputElement as HTMLElement).tagName.toLowerCase() == "sf-i-form") {

          console.log('filters-remove', "sf-i-form", value);
          (inputElement as SfIForm).removeItemByValue(value);
          (inputElement as SfIForm).loadMode();

        }

      }

    }

  }

  processUnitFiltersDetail = () => {

    console.log('filters', this.getUnitFiltersDetail().length, "select");

    for(var i = 0; i < this.getUnitFiltersDetail().length; i++) {

      if(this.getUnitFiltersDetail()[i].op == "select") {

        const inputElement = this._SfFormC[0].querySelector('#' + this.getUnitFiltersDetail()[i].input);
        const value = this.getUnitFiltersDetail()[i].value;

        console.log('filters', inputElement, value, "select");

        if((inputElement as HTMLElement).tagName.toLowerCase() == "sf-i-select") {

          console.log('filters-select', "sf-i-select", value);
          (inputElement as SfISelect).selectedId = value;
          (inputElement as SfISelect).loadMode();

        } else if((inputElement as HTMLElement).tagName.toLowerCase() == "sf-i-sub-select") {

          console.log('filters-select', "sf-i-sub-select", value);
          (inputElement as SfISubSelect).selectedId = value;
          (inputElement as SfISubSelect).loadMode();

        } else if((inputElement as HTMLElement).tagName.toLowerCase() == "sf-i-form") {

          console.log('filters-select', "sf-i-form", value);
          (inputElement as SfIForm).selectedSearchId = value;
          (inputElement as SfIForm).loadMode();

        }

      }

      if(this.getUnitFiltersDetail()[i].op == "remove") {

        const inputElement = this._SfFormC[0].querySelector('#' + this.getUnitFiltersDetail()[i].input);
        const value = this.getUnitFiltersDetail()[i].value;

        console.log('filters', inputElement, value, "remove");

        if((inputElement as HTMLElement).tagName.toLowerCase() == "sf-i-select") {

          console.log('filters-remove', "sf-i-select", value);
          (inputElement as SfISelect).removeItemByValue(value);
          (inputElement as SfISelect).loadMode();

        } else if((inputElement as HTMLElement).tagName.toLowerCase() == "sf-i-sub-select") {

          console.log('filters-remove', "sf-i-sub-select", value);
          (inputElement as SfISubSelect).removeItemByValue(value);
          (inputElement as SfISubSelect).loadMode();

        } else if((inputElement as HTMLElement).tagName.toLowerCase() == "sf-i-form") {

          console.log('filters-remove', "sf-i-form", value);
          (inputElement as SfIForm).removeItemByValue(value);
          (inputElement as SfIForm).loadMode();

        }

      }

    }

  }

  loadMode = async () => {

    console.log('load mode', this.mode);

    // if(this.mode == "list") {

    //   setTimeout(() => {
    //     // this.initListenersTrail();
    //     this.fetchSearchList();
    //   }, 500)

    // } else 
    if(this.mode == "select" || this.mode == "read" || this.mode == "list") {

      setTimeout(() => {
        // this.initListenersTrail();
        this.fetchSearchSelect();
      }, 500)

    } else if(this.mode == "trail") {

      setTimeout(() => {
        this.initListenersTrail();
        this.fetchLogs();
      }, 500)

    } else if(this.mode == "new") {

      setTimeout(() => {
        this.initDisableInputs(false);
        this.initListenersNew();
        this.processDependencies();
        this.processFormLayouting();
        this.clearInputs();
        this.clearUnitFilters();
        this.processUnitFiltersNew();
      }, 500)

    } else if(this.mode == "view") {

      setTimeout(() => {
        this.initListenersView();
        this._sfInputSearch.value = this.searchPhrase == null ? "" : this.searchPhrase;
        var event = new Event('keyup');
        this._sfInputSearch.dispatchEvent(event);
      }, 500)
      

    } else if (this.mode == "detail") {
      
      setTimeout(async () => {  
        this.disableEdit(true);
        this.initDisableInputs(true);
        this.processDependencies();
        await this.fetchDetail();
        this.populateSelectedViewToDetailValues();
        this.initListenersDetail();
        this.processFormLayouting();
        this.clearUnitFilters();
        this.processUnitFiltersDetail();
      }, 500)

    }

  }

  constructor() {
    super();
  }

  protected override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {

    this.loadMode();

  }
  
  override connectedCallback() {
    super.connectedCallback()
  }
  
  override render() {

    console.log('form mode', this.mode);

    //let submit = (this.mode == "edit" || this.mode == "create") ? html`<button id="sf-button-submit" disabled>Submit</button>` : html``;
    //let del = this.mode == "delete" ? html`<button id="sf-button-delete">Delete</button>` : html``;
    /*
<!--<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <div class="SfIFormC">
          <label>${this.label}</label>
          <div>
            <ul id="input-list">
            </ul>
            <div class="loader-element"></div>
          </div>
        </div>-->
    */


    if(this.mode == "list") {

      if(this.flow == "read") {


        return html`
          
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
          <div class="SfIFormC">
            <label>${this.label}</label>
            <div>
              <select id="input-select" @change="${this.onChangeSelect}" multiple disabled>
              </select>
              <div class="loader-element"></div>
            </div>
          </div>

          `;

      } else {


        return html`
            
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
          <div class="SfIFormC">
            <label>${this.label}</label>
            <div>
              <select id="input-select" @change="${this.onChangeSelect}" multiple>
              </select>
              <div class="loader-element"></div>
            </div>
          </div>

        `;

      }


    } else if(this.mode == "read") {


      return html`
        
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <div class="SfIFormC">
          <label>${this.label}</label>
          <div>
            <select id="input-select" @change="${this.onChangeSelect}" disabled>
            </select>
            <div class="loader-element"></div>
          </div>
        </div>
      
      `;

    } else if(this.mode == "select") {

      if(this.flow == "read") {

        return html`
        
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <div class="SfIFormC">
          <label>${this.label}</label>
          <div>
            <select id="input-select" @change="${this.onChangeSelect}" disabled>
            </select>
            <div class="loader-element"></div>
          </div>
        </div>
      
      `;

      } else {
        return html`
        
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

      

    } else if(this.mode == "trail") {

      return html`
        
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <div class="SfIFormC">
          <div class="d-flex justify-center">
              <h1 part="title">${this.name}</h1>
          </div>
          <div class="d-flex justify-center">
            <div part="badge" class="badge">Log Trail</div>
          </div>
          <br />
          <div class="d-flex">
            <div class="lb"></div>
            <div class="d-flex flex-grow justify-between">
              <div id="button-back" class="link">← Back</div>
              <div class="d-flex">
              </div>
            </div>
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

    } else if(this.mode == "new") {

      return html`
        
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <div class="SfIFormC">
          <div class="d-flex justify-center">
              <h1 part="title">${this.name}</h1>
          </div>
          <div class="d-flex justify-center">
            <div part="badge" class="badge">Create New</div>
          </div>
          <br />
          <div class="d-flex">
            <div class="lb"></div>
            <div class="d-flex flex-grow justify-between">
              <div id="button-back" class="link">← Back</div>
              <div class="d-flex">
              </div>
            </div>
            <div class="rb"></div>
          </div>
          <br /><br />
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
            <div class="loader-element"></div>
          </div>
          <div class="d-flex justify-center">
            <div class="lb"></div>
            <div class="flex-grow">
              <button id="button-submit" disabled>Submit</button>
            </div>
            <div class="rb"></div>
          </div>
          
        </div>
      
      `;

    } else if(this.mode == "view") {

      return html`
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
            <div id="search-list-container" class="flex-grow"></div>
            <div class="rb"></div>
          </div>
        </div>
      `;

    } else if(this.mode == "detail") {

      return html`
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
            <div class="loader-element"></div>
          </div>
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

      return html`
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

}

declare global {
  interface HTMLElementTagNameMap {
    'sf-i-form': SfIForm;
  }
}
