module.exports = {
  user          : "ADMIN",
  password      : "Hacathon71!@",
  connectString		:	'(description= (address=(protocol=tcps)(port=1522)(host=adb.us-ashburn-1.oraclecloud.com))(connect_data=(service_name=prv1nyxtuesddjb_hack71db_medium.atp.oraclecloud.com))(security=(ssl_server_cert_dn="CN=adwc.uscom-east-1.oraclecloud.com,OU=Oracle BMCS US,O=Oracle Corporation,L=Redwood City,ST=California,C=US"))  )',
  //privilege		:	2,
  externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};