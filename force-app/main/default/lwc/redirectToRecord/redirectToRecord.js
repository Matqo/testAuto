import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class RedirectToRecord extends NavigationMixin(LightningElement) {
    @api recordId;
    connectedCallback(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Asset',
                actionName: 'view'
            },
        });
    }
}