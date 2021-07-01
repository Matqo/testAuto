public class EinsteinController {
    public String getAccessToken(String einsteinCertEmail) {
        ContentVersion base64Content = [SELECT Title, VersionData FROM ContentVersion where Title='einstein_platform' OR  Title='predictive_services' ORDER BY Title LIMIT 1];
        String keyContents = base64Content.VersionData.tostring();
        keyContents = keyContents.replace('-----BEGIN RSA PRIVATE KEY-----', '');
        keyContents = keyContents.replace('-----END RSA PRIVATE KEY-----', '');
        keyContents = keyContents.replace('\n', '');

        JWT jwt = new JWT('RS256');
        jwt.pkcs8 = keyContents; 
        jwt.iss = 'developer.force.com';
        jwt.sub = einsteinCertEmail; // Create custom setting for this... -> Add top Setup Instructions!!!
        jwt.aud = 'https://api.einstein.ai/v2/oauth2/token';
        jwt.exp = '3600';
        String access_token = JWTBearerFlow.getAccessToken('https://api.einstein.ai/v2/oauth2/token', jwt);
        return access_token;    
    }
}