sfdx force:apex:execute -f data/scripts/createNamedCredentials.txt

sfdx force:mdapi:deploy -w 5 -d mdapi/autoDashboard
sfdx shane:analytics:dataset:upload -n demo_data_df_testdrives --async -f data/analytics/demo_data_df_testdrives.csv -a DF19_Demo -m data/analytics/demo_data_df_testdrives.json
sfdx shane:analytics:dataset:upload -n demo_data_df_preped --async -f data/analytics/DemoDataDFPreped.csv -a DF19_Demo -m data/analytics/DemoDataDFPreped.json
sfdx shane:analytics:dataset:upload -n demo_data_df_service --async -f data/analytics/demo_data_df_service.csv -a DF19_Demo -m data/analytics/demo_data_df_service.json
sfdx shane:analytics:dataset:upload -n demo_data_df_trails --async -f data/analytics/demo_data_df_trails.csv -a DF19_Demo -m data/analytics/demo_data_df_trails.json

#V2 Dashboards created by Aries
sfdx shane:analytics:dataset:upload -n Automative_Demo_Pack_1_Company_Overview --async -f data/Automative_Demo_Pack_1_Company_Overview.csv -a Auto_Demo_Pack_v2_Analytics -m data/Automative_Demo_Pack_1_Company_Overview.json
sfdx shane:analytics:dataset:upload -n Automative_Demo_Pack_2_CSAT --async -f data/Automative_Demo_Pack_2_CSAT.csv -a Auto_Demo_Pack_v2_Analytics -m data/Automative_Demo_Pack_2_CSAT.json
sfdx shane:analytics:dataset:upload -n Automative_Demo_Pack_3_Spare_Parts --async -f data/Automative_Demo_Pack_3_Spare_Parts.csv -a Auto_Demo_Pack_v2_Analytics -m data/Automative_Demo_Pack_3_Spare_Parts.json

sfdx force:source:push
sfdx force:user:permset:assign -n autoforce_demo_pack
sfdx force:apex:execute -f data/scripts/setDemosetting.txt
sfdx force:data:tree:import -p data/sfdx-out/John-Plan.json 
sfdx force:apex:execute -f data/scripts/setRoleCall.txt
sfdx force:apex:execute -f data/scripts/setContactOwner.txt
