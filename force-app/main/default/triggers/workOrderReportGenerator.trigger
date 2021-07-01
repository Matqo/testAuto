trigger workOrderReportGenerator on WorkOrder (before update) {
    for( Id woId : Trigger.newMap.keySet() ){
        if( Trigger.oldMap.get( woId ).Report_Generation_Flag__c != Trigger.newMap.get( woId ).Report_Generation_Flag__c )
        {
            //Trigger.newMap.get( woId ).Service_Report_ID__c = 
            System.debug('TS' + Trigger.newMap.get( woId ).Service_Report_Signature__c);
            serviceReportGenerator.generate(woId, 'Customer', Trigger.newMap.get( woId ).Service_Report_Signature__c);
        }
    }
}