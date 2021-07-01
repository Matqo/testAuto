public with sharing class objectInfoController {
    @AuraEnabled(cacheable=true)
    public static sObject getUserInfo(String objApiName, String fields, String currentRecordId){
      
        String query = 'SELECT ';
        query += fields;
        query += ' FROM ' + objApiName + ' WHERE IsDeleted = false';
        system.debug(currentRecordId);
       
        if(currentRecordId != '' && currentRecordId != null){
            query += ' AND Id =: currentRecordId';
        }
        

        query +=' WITH SECURITY_ENFORCED LIMIT 1';
        system.debug(query);
        

        try {
            return Database.query(query);
        } catch(exception e) {
            system.debug(e.getMessage());
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        
    }
}
