trigger addDefaultPriceBook on WorkOrder (before insert) {
    for(WorkOrder wo : Trigger.New) {
        if(wo.Pricebook2Id == null){
            wo.Pricebook2Id = [SELECT Id FROM Pricebook2 Limit 1].Id;
        }
    }   
}