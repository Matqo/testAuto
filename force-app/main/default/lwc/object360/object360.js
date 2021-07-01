import { LightningElement, api} from "lwc";

export default class Object360 extends LightningElement {
  @api flexipageRegionWidth;
  @api showProgress;
  @api showEmoji;
  @api emojiColor;
  @api emojiType;
  @api qualifiedFieldName = "";
  
  @api recordId;
  @api object = "";
  

  @api backgroundImage = "";
  @api backgroundColor;

  @api userAvatar = "";
  @api name = "";
  @api nameLabel = "";


  @api metric1 = "";
  @api metric1Icon = "";
  @api metric1Measure;
  @api metric1IconSize = "";

  @api metric2 = "";
  @api metric2Icon = "";
  @api metric2Measure;
  @api metric2IconSize = "";

  @api metric3 = "";
  @api metric3Icon = "";
  @api metric3Measure;
  @api metric3IconSize = "";

  @api metric4 = "";
  @api metric4Icon = "";
  @api metric4Measure;
  @api metric4IconSize = "";

  @api metric5 = "";
  @api metric5Icon = "";
  @api metric5Measure;
  @api metric5IconSize = "";

  @api metric6 = "";
  @api metric6Icon = "";
  @api metric6Measure;
  @api metric6IconSize = "";
  


  @api customColor;
  renderedCallback() {

      this.template
          .querySelector(".fill")
          .style.setProperty("--my-color",this.customColor);
          
  }


  get columnClass() {
    let classes = ['slds-col','slds-m-vertical_medium','slds-align_absolute-center'];

    switch (this.numColumns) {
      case 1:
        classes.push('slds-size_1-of-1'); 
        break;
      case 2:
        classes.push('slds-size_1-of-2');
        break;
      case 4:
        classes.push('slds-size_1-of-2');
        break;
      default:
        classes.push('slds-size_1-of-2 slds-medium-size_1-of-3 slds-large-size_1-of-3');
        break;
    }

    return classes.join(' ');
  }

  get numColumns() {
    let numColums = 0;
    if (this.metric1 !== undefined && this.metric1 !== "") {
      numColums++;
    }
    if (this.metric2 !== undefined && this.metric2 !== "") {
      numColums++;
    }
    if (this.metric3 !== undefined && this.metric3 !== "") {
      numColums++;
    }
    if (this.metric4 !== undefined && this.metric4 !== "") {
      numColums++;
    }
    if (this.metric5 !== undefined && this.metric5 !== "") {
      numColums++;
    }
    if (this.metric6 !== undefined && this.metric6 !== "") {
      numColums++;
    }
    return numColums;
  }
}
