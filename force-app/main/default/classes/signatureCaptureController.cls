public with sharing class signatureCaptureController {
    
    @AuraEnabled
    public static void saveSign(String strSignElement,Id recId){

        // Create Salesforce File
        //Insert ContentVersion
        ContentVersion cVersion = new ContentVersion();
        cVersion.ContentLocation = 'S'; //S-Document is in Salesforce. E-Document is outside of Salesforce. L-Document is on a Social Netork.
        cVersion.PathOnClient = 'Signature-'+System.now() +'.png';//File name with extention
        cVersion.Origin = 'H';//C-Content Origin. H-Chatter Origin.
        //cVersion.OwnerId = attach.OwnerId;//Owner of the file
        cVersion.Title = 'Signature-'+System.now() +'.png';//Name of the file
        cVersion.VersionData = EncodingUtil.base64Decode(strSignElement);//File content
        Insert cVersion;
        
        //After saved the Content Verison, get the ContentDocumentId
        Id conDocument = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =:cVersion.Id].ContentDocumentId;
        
        //Insert ContentDocumentLink
        ContentDocumentLink cDocLink = new ContentDocumentLink();
        cDocLink.ContentDocumentId = conDocument;//Add ContentDocumentId
        cDocLink.LinkedEntityId = recId;//Add attachment parentId
        cDocLink.ShareType = 'I';//V - Viewer permission. C - Collaborator permission. I - Inferred permission.
        cDocLink.Visibility = 'AllUsers';//AllUsers, InternalUsers, SharedUsers
        Insert cDocLink;
        /*
        DigitalSignature digSig = new DigitalSignature();
        digSig.DocumentBody = EncodingUtil.base64Decode(strSignElement);
        digSig.ParentId = recId;
        digSig.DocumentName = 'Default'; // Default?
        digSig.DocumentContentType = 'image/png';
        digSig.SignedDate = System.now();
        digSig.SignedBy = 'Customer'; 
        upsert digSig;
        */
// Relate to SA instead? Standard ServiceReport looks up to SA rather than WO, digisig record missing?


       // digSig.Document = cVersion;

        // Create attachement
        /*
        Attachment objAttachment = new Attachment();
        objAttachment.Name = 'Demo-Signature.png';
        objAttachment.ParentId = recId;
        objAttachment.ContentType = 'image/png';
        objAttachment.Body = EncodingUtil.base64Decode(strSignElement);        
        insert objAttachment;
        return objAttachment;      
        */ 
    }
}