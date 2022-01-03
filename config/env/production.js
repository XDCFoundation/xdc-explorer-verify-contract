module.exports = {
  DB: process.env.DB || 'mongodb://xinfinexplorermainnet:fresheye27@aws-xinfin-explorer-documentdb-prod.cluster-ckjj5obhzs40.us-east-2.docdb.amazonaws.com:27017/XDCScan',
  PORT: process.env.PORT || '3007',
  IS_CONSOLE_LOG: process.env.IS_CONSOLE_LOG || 'true',
  RDS_FILE: process.env.RDS_FILE || "rds-combined-ca-bundle-xinfin-prod.pem",
  PROVIDER_URL: process.env.PROVIDER_URL || "wss://LeewayHertzXDCWS.BlocksScan.io"
}
