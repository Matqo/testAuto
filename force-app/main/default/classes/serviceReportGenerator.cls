public without sharing class serviceReportGenerator {
    @future(callout=true)
        public static void generate(String recordId, String signedBy, String signatureBase64){
        serviceReportJson srj = new serviceReportJson();
        serviceReportJson.signatureClass signature = new serviceReportJson.signatureClass();
        signature.data = signatureBase64;
        //'data:image/png;base64,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';
        signature.contentType = 'image/png';
        signature.name = signedBy + '\'s Signature';
        signature.signatureType = 'Default';
        signature.signedBy = signedBy;
        signature.signedDate = string.valueOfGmt(Datetime.now());     
        serviceReportJson.inputClass input = new serviceReportJson.inputClass();
        input.entityId = recordId;
        input.signatures = new List<serviceReportJson.signatureClass>();
        if(signatureBase64 != '1'){
            input.signatures.add(signature);
        }
        input.templateId = [SELECT Id FROM ServiceReportLayout ORDER BY CreatedDate ASC NULLS FIRST][0].Id;
        srj.inputs = new List<serviceReportJson.inputClass>();
        srj.inputs.add(input);

        String jsonBody = json.serialize(srj);

        String sfdcURL = URL.getSalesforceBaseUrl().toExternalForm(); 
        String restAPIURL = sfdcURL + '/services/data/v41.0/actions/standard/createServiceReport';  
        
        HttpRequest httpRequest = new HttpRequest();  
        httpRequest.setMethod('GET');   
        httpRequest.setHeader('Authorization', 'OAuth ' + UserInfo.getSessionId());        
        httpRequest.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionID()); 
        httpRequest.setEndpoint(restAPIURL);  
            httpRequest.setBody(jsonBody);
            httpRequest.setHeader('Content-length',string.valueOf(jsonBody.length()));
                httpRequest.setHeader('Content-Type', 'application/json;charset=UTF-8');
        String ContentDocumentId = '';
        serviceReportHttpResponse deserializedResponse = new serviceReportHttpResponse();
        try {  
                Http http = new Http();   
                HttpResponse httpResponse = http.send(httpRequest);  
                if (httpResponse.getStatusCode() == 200 ) {  
                    deserializedResponse = (serviceReportHttpResponse)JSON.deserializeStrict(
                        httpResponse.getBody().substring(1,httpResponse.getBody().length()-1) , serviceReportHttpResponse.class);
                        if(deserializedResponse.outputValues.contentVersionId != null){
                            ContentDocumentId = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =: deserializedResponse.outputValues.contentVersionId].ContentDocumentId;
                        }
                } else {
                    System.debug(' httpResponse ' + httpResponse.getBody() );  
                    throw new CalloutException( httpResponse.getBody() );  
                }   
        } catch( System.Exception e) {  
                System.debug('ERROR: '+ e);  
                throw e;  
        }  

        //return ContentDocumentId;
        WorkOrder wo = new WorkOrder();
        wo.Id = recordId;
        wo.Service_Report_ID__c = ContentDocumentId;
        upsert wo;
    }
}
