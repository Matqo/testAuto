import { LightningElement, track, api } from 'lwc';
import searchRecords from '@salesforce/apex/recordSearchController.findRecords';
import createWOLIRecord from '@salesforce/apex/recordSearchController.createWOLI';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

export default class RecordSearch extends LightningElement {
    @api recordId;
    inputValue = "";
    @track result;
    //, { label: 'Product Image', fieldName: 'Image' }

    actions = [{ label: 'Add to Work Order', name: 'add' }];

    columns = [{ label: 'Product Name', fieldName: 'ProductName' }, { label: 'Serial Number', fieldName: 'SerialNumber' }, 
    { label: 'Quantity On Hand', fieldName: 'QuantityOnHand' }, 
    { type: 'action', typeAttributes: { rowActions: this.actions }},];

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'add':
                this.createWOLI(row);
                break;
            default:
        }
    }

    createWOLI(row) {
        const { Id, Product2Id } = row;
        console.log(Product2Id);
        createWOLIRecord({ productId: Product2Id, productItemId: Id, recordId: this.recordId })
        .then(result => {
            const event = new ShowToastEvent({
                title: 'Success!',
                message: 'Work Order Line Item successfully created',
                variant: 'success',
                mode: 'dismissable'
            });
            this.dispatchEvent(event);
            this.handleSearch(this.inputValue);

        })
        .catch(error => {
            console.error(error);
        });
    }
    
    connectedCallback(){
        console.log('Firing Search');
        this.handleSearch(this.inputValue);
    }

    changeHandler(event){
        window.clearTimeout(this.timeoutId);
        const value = event.target.value;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.timeoutId = setTimeout(() => {this.handleSearch(value).bind(this)}, 1000);
    }

    handleSearch(value){
        searchRecords({ inputToSearch: '%'+value+'%' })
        .then(result => {
            if(result){
                console.log(result);
                result.forEach(element => {
                    if(element.Product2){
                        element.ProductName = element.Product2.Name;
                        //element.Image = element.Product2.Image__c;
                    }
                });
                this.result = result;
            }
        })
        .catch(error => {
            console.error(error);
        });
    }
}