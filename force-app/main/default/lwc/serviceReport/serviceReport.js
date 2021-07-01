import { LightningElement, api, wire, track } from 'lwc';
//import generateReport from '@salesforce/apex/serviceReportGenerator.generate';
import triggerSRGeneration from '@salesforce/apex/serviceReportController.updateWO';
import { getRecord, getRecordNotifyChange } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
//import Service_Report_Field from '@salesforce/schema/WorkOrder.Service_Report_ID__c';

export default class ServiceReport extends LightningElement {
    @api recordId;
    @track reportData;
    loading;
    @api height;
    @api isCommunity;
    signaturePad = false;

    @wire(getRecord, { recordId: '$recordId', fields: ['WorkOrder.Service_Report_ID__c']})
    workOrder(response) {
            this.reportData = response;
    }

    get reportContentDocumentId(){
        if(this.reportData){
            if(this.reportData.data){
                return this.reportData.data.fields.Service_Report_ID__c.value;
            }
        }
        return '';
    }

    handleReportGeneration(event){
        this.signaturePad = false;
        this.loading = true;
        const image = event.detail ? event.detail: '';
        console.log(image);
        triggerSRGeneration({recordId: this.recordId, signatureBase64: image})
            .then(result => {
                // eslint-disable-next-line @lwc/lwc/no-async-operation
                  setTimeout(() => {
                    refreshApex(this.reportData);
                    this.loading = false;
                }, 3000);

            })
            .catch(error => {
                console.error(error);
            });
    }

    toggleModal() {
        this.signaturePad = !this.signaturePad;
    }

    get frameStyle() {
        return `width: 100%; height: ${this.height}px;`;
    }

    get reportUrl() {
        if(this.isCommunity){
            const url = window.location.href.split("/");
            return '/'+url[3]+ '/sfc/servlet.shepherd/document/download/' + this.reportContentDocumentId;
        }
        return '/sfc/servlet.shepherd/document/download/' + this.reportContentDocumentId;
        
    }

}