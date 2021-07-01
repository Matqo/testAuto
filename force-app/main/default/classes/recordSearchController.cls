public with sharing class recordSearchController {
    @AuraEnabled
    public static List<ProductItem> findRecords(String inputToSearch){
        try {
            System.debug(inputToSearch);
            //Product2.Image__c, 
            return [SELECT Id, Product2Id, Product2.Name, SerialNumber, QuantityOnHand FROM ProductItem WHERE Product2.Name LIKE: inputToSearch];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void createWOLI(String productId, String productItemId, String recordId){
        WorkOrderLineItem woli = new WorkOrderLineItem();
        PriceBookEntry pbe = [SELECT Id, Product2.Name FROM PricebookEntry WHERE Product2Id =: productId];
        woli.PricebookEntryId = pbe.Id;
        woli.Subject = pbe.Product2.Name + ' install';
        woli.Quantity = 1;
        woli.WorkOrderId = recordId;
        insert woli;


        ProductConsumed pc = new ProductConsumed();
        pc.ProductItemId = productItemId;
        pc.QuantityConsumed = 1;
        pc.WorkOrderId = recordId;
        pc.WorkOrderLineItemId = woli.Id;
        insert pc;
    }


}
