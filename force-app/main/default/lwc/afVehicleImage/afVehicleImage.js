import { LightningElement, track, api, wire } from 'lwc';
import { getRecord, } from 'lightning/uiRecordApi';

const FIELDS = [
    'Asset.Image_url__c',
    'Asset.Name'
  ];

export default class AfVehicleImage extends LightningElement {

    @api recordId;
    @api isCommunity;
    @track title;
    @track selectedImg;

    @wire(getRecord, { recordId: '$recordId' , fields: FIELDS})
    assetRecord(result){
        console.log('recordId:',this.recordId);
        console.log('TRIGGER WIRE:',result);
        if(result.data){
            console.log(result.data);
            this.title = result.data.fields.Name.value;
            if(this.isCommunity){
                const url = window.location.href.split("/");
                this.selectedImg = url[0]+'//'+url[1]+'/'+url[2]+'/'+url[3]+result.data.fields.Image_url__c.value;
            }else{
                this.selectedImg = result.data.fields.Image_url__c.value;
            }
        }
    }
}