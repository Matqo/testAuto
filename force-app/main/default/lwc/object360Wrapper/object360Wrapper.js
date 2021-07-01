import { LightningElement, api, track, wire } from "lwc";
import getUserInfo from "@salesforce/apex/objectInfoController.getUserInfo";

export default class Object360Wrapper extends LightningElement {
  @api imageFieldName; //Builder = Owner.SmallPhotoUrl
  @track imgFieldUrl;

  @api object = "";
  @api recordId;
  
  @api showProgress;
  @api showEmoji;
  @api qualifiedFieldName = "";
  @api customColor;

  @track metric1Value;
  @track metric2Value;
  @track metric3Value;
  @track metric4Value;
  @track metric5Value;
  @track metric6Value;
  @track avatarValue;
  @track nameValue;
  @track nameLabel2;

  @api backgroundImage = "";
  @api nameLabel = "";
  @api userAvatar = "";
  @api userType = "";
  @api name = "";

  @api metric1;
  @api metric1Icon = "";
  @api metric1FieldName;
  @api metric1IconSize = "";

  @api metric2;
  @api metric2Icon = "";
  @api metric2FieldName;
  @api metric2IconSize = "";

  @api metric3 = "";
  @api metric3Icon = "";
  @api metric3FieldName = "";
  @api metric3IconSize = "";

  @api metric4 = "";
  @api metric4Icon = "";
  @api metric4FieldName = "";
  @api metric4IconSize = "";

  @api metric5 = "";
  @api metric5Icon = "";
  @api metric5FieldName = "";
  @api metric5IconSize = "";

  @api metric6 = "";
  @api metric6Icon = "";
  @api metric6FieldName = "";
  @api metric6IconSize = "";

  //@api isLoading = true;
  @api userRecord = {};
  @api myerror;
  errormessage;


  get soqlFields() {
    let fieldString = "Id";


    if (this.nameLabel !== undefined && this.nameLabel !== "") {
      fieldString += " ," + this.nameLabel;
    }

    if (this.name !== undefined && this.name !== "") {
      fieldString += " ," + this.name;
    }

    if (this.userAvatar !== undefined && this.userAvatar !== "") {
      fieldString += " ," + this.userAvatar;
    }

    if (this.metric1FieldName !== undefined && this.metric1FieldName !== "") {
      fieldString += " ," + this.metric1FieldName;
    }

    if (this.metric2FieldName !== undefined && this.metric2FieldName !== "") {
      fieldString += " ," + this.metric2FieldName;
    }

    if (this.metric3FieldName !== undefined && this.metric3FieldName !== "") {
      fieldString += " ," + this.metric3FieldName;
    }

    if (this.metric4FieldName !== undefined && this.metric4FieldName !== "") {
      fieldString += " ," + this.metric4FieldName;
    }

    if (this.metric5FieldName !== undefined && this.metric5FieldName !== "") {
      fieldString += " ," + this.metric5FieldName;
    }

    if (this.metric6FieldName !== undefined && this.metric6FieldName !== "") {
      fieldString += " ," + this.metric6FieldName;
    }

    return fieldString;
  }

  @wire(getUserInfo, {
    objApiName: "$object",
    fields: "$soqlFields",
    currentRecordId: "$recordId"
  })
  wiredRecords(result) {
    this.errormessage = "";
    this.wiredRecordsResult = result;

    if (result.error) {
      console.error(result.error);
      this.errormessage = result.error.body.message;
      this.myerror = result.error;
    } else if (result.data) {
      if (this.nameLabel !== undefined) {
        this.nameLabel2 = result.data[this.nameLabel];
      }
      if (this.userAvatar !== undefined) {
        this.imgFieldUrl = this.ref(result.data, this.userAvatar);
      }


      if (this.name !== undefined) {
        this.nameValue = result.data[this.name];
      }

      if (this.metric1FieldName !== undefined) {
        this.metric1Value = result.data[this.metric1FieldName];
      }

      if (this.metric2FieldName !== undefined) {
        this.metric2Value = result.data[this.metric2FieldName];
      }

      if (this.metric3FieldName !== undefined && this.metric3FieldName !== "") {
        this.metric3Value = result.data[this.metric3FieldName];
      }
      if (this.metric4FieldName !== undefined && this.metric4FieldName !== "") {
        this.metric4Value = result.data[this.metric4FieldName];
      }
      if (this.metric5FieldName !== undefined && this.metric5FieldName !== "") {
        this.metric5Value = result.data[this.metric5FieldName];
      }
      if (this.metric6FieldName !== undefined && this.metric6FieldName !== "") {
        this.metric6Value = result.data[this.metric6FieldName];
      }
    
    }
  }
   //splits object from object name to name that we can reference
   ref(obj, str) {
    return str.split(".").reduce(function (o, x) {
      return o[x];
    }, obj);
  }
}