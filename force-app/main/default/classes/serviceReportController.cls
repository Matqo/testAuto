public without sharing class serviceReportController {
    @AuraEnabled
    public static void updateWO(String recordId, String signatureBase64){
        WorkOrder wo = [SELECT Report_Generation_Flag__c, Service_Report_Signature__c FROM WorkOrder WHERE Id =: recordId LIMIT 1];
        if(wo.Report_Generation_Flag__c == true){
            wo.Report_Generation_Flag__c = false;
        }else{
            wo.Report_Generation_Flag__c = true;
        }
        if(signatureBase64 != ''){
            wo.Service_Report_Signature__c = signatureBase64;
        }
        update wo;
    }
}
