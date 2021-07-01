import { LightningElement, api } from 'lwc';
import getPublicUrl from '@salesforce/apex/licensePlateScannerController.getPublicUrl';
import getImageResult from '@salesforce/apex/licensePlateScannerController.getImageResult';
import { FlowAttributeChangeEvent, FlowNavigationNextEvent } from 'lightning/flowSupport';

export default class LicensePlateScanner extends LightningElement {
    @api recordId;
    @api regCountry;
    @api regPlate;    
    @api defaultCountry = '';
    @api autoNextOnResult;
    isLoading = false;
    @api defaultResult;
    @api einsteinCertEmail;

    regCountries = ['A',
    'AL',
    'AND',
    'AX',
    'B',
    'BG',
    'BIH',
    'BY',
    'BZH',
    'CAT',
    'CH',
    'CSC',
    'CY',
    'CZ',
    'D',
    'DK',
    'E',
    'EST',
    'F',
    'FIN',
    'FL',
    'FO',
    'FRL',
    'GB',
    'GBA',
    'GBG',
    'GBJ',
    'GBM',
    'GBZ',
    'GE',
    'GR',
    'H',
    'HR',
    'I',
    'IRL',
    'IS',
    'L',
    'LT',
    'LV',
    'M',
    'MC',
    'MD',
    'MNE',
    'N',
    'NL',
    'NMK',
    'P',
    'PL',
    'RO',
    'RSM',
    'RUS',
    'S',
    'SK',
    'SLO',
    'SMOM',
    'SRB',
    'UA',
    'V',
    'VL'];

    get acceptedFormats() {
        return ['.png', '.jpg', '.jpeg'];
    }

    handleUploadFinished(event) {
        this.isLoading = true;
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        getPublicUrl({ contentVersionID: uploadedFiles[0].contentVersionId })
        .then(result => {
            this.publicUrl = result; // Delete?
            getImageResult({ publicURL: result, einsteinCertEmail: this.einsteinCertEmail })
            .then(result => {
                const sortedResultJSON = JSON.parse(result).probabilities.sort((a,b) => {
                    const first = a.boundingBox.minX;
                    const second = b.boundingBox.minX;
                    if(first > second) return 1;
                    if(first < second) return -1;
                    return 0;
                });

                let tempRegPlate = '';

                sortedResultJSON.forEach((probability, index) => {
                        if(index == 0){
                            if(this.regCountries.indexOf(probability.label) != -1){
                                this.regCountry = probability.label;
                            }else{
                                this.regCountry = this.defaultCountry;
                            }
                        }else{
                            if((tempRegPlate + probability.label).length < 14 && probability.probability > 0.6){
                                console.log('Adding: ' + probability.label);
                                console.log(probability);
                                tempRegPlate += probability.label
                            }
                        }
                });
                this.regPlate = tempRegPlate;
                //console.log(this.regCountry + ' : ' + this.regPlate);
                this.isLoading = false;
                this.dispatchEvent(new FlowAttributeChangeEvent('regCountry', this.regCountry));
                this.dispatchEvent(new FlowAttributeChangeEvent('regPlate', this.regPlate));
                if(this.autoNextOnResult){
                    this.dispatchEvent(new FlowNavigationNextEvent());
                }
            })
            .catch(error => {
                this.regCountry = this.defaultCountry;
                this.regPlate = this.defaultResult;
                this.isLoading = false;
                this.dispatchEvent(new FlowAttributeChangeEvent('regCountry', this.regCountry));
                this.dispatchEvent(new FlowAttributeChangeEvent('regPlate', this.regPlate));
                if(this.autoNextOnResult){
                    this.dispatchEvent(new FlowNavigationNextEvent());
                }
                console.error(error);
            });
        })
        .catch(error => {
            console.error(error);
        });

    }
}