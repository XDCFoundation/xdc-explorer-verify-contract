module.exports = {
  DB: process.env.DB || "mongodb://xinfinexplorer:ageramorAtEa@localhost:27017/xinfin-explorer-apothem",
  PORT: process.env.PORT || '3050',
  IS_CONSOLE_LOG: process.env.IS_CONSOLE_LOG || 'true',
  RDS_FILE: process.env.RDS_FILE || "xinfin-rds-combined-ca-bundle.pem",
  PROVIDER_URL: process.env.PROVIDER_URL || "wss://LeewayHertzXDCWS.BlocksScan.io"
}
