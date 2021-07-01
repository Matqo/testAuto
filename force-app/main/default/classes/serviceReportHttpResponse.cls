public class serviceReportHttpResponse {
    public OutputValues outputValues;
    public Boolean isSuccess;
    public Object errors;
    public String actionName;

    public class OutputValues {
        public String entityId;
        public String contentVersionId;
        public String serviceReportId;
    }
    
    public static List<serviceReportHttpResponse> parse(String json) {
        return (List<serviceReportHttpResponse>) System.JSON.deserialize(json, List<serviceReportHttpResponse>.class);
    }
}