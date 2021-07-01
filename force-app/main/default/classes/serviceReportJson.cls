public class serviceReportJson{
    public inputClass[] inputs;
    public class inputClass {
        public String entityId; //Record ID
        public signatureClass[] signatures;
        public String templateId;
    }

    public class signatureClass {
        public String data;    //string_data
        public String contentType;
        public String name;
        public String signatureType;
        public String place;
        public String signedBy;
        public String signedDate;         
    }

    public static serviceReportJson parse(String json){
        return (serviceReportJson) System.JSON.deserialize(json, serviceReportJson.class);
    }

}