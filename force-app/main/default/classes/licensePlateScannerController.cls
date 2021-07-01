public with sharing class licensePlateScannerController {
    @AuraEnabled
    public static String getPublicUrl(String contentVersionID) {
        ContentDistribution cd = new ContentDistribution();
        cd.Name = 'Einstein OCR ' + contentVersionID;
        cd.ContentVersionId = contentVersionID;
        cd.PreferencesAllowViewInBrowser= true;
        cd.PreferencesLinkLatestVersion=true;
        cd.PreferencesNotifyOnVisit=false;
        cd.PreferencesPasswordRequired=false;
        cd.PreferencesAllowOriginalDownload= true;
        try{
            insert cd;
            return [SELECT ContentDownloadUrl FROM ContentDistribution WHERE Id =: cd.ID].ContentDownloadUrl;
        }catch(Exception e){
            System.debug(e);
        }
        return null;
    }

    @AuraEnabled
    public static string getImageResult(String publicURL, String einsteinCertEmail){
        try {
            string token = new EinsteinController().getAccessToken(einsteinCertEmail);
            return(EinsteinOCR.extractText(publicURL, token, 'OCRModel'));
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
