require("dotenv").config()

module.exports = {
  DB: process.env.DB || "",
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || "",
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY || "",
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || "",
  IS_CONSOLE_LOG: process.env.IS_CONSOLE_LOG || "true",
  AMQP_HOST_URL: process.env.AMQP_HOST_URL || "",
  AMQP_TWITTER_EXCHANGE: process.env.AMQP_TWITTER_EXCHANGE || '',
  AMQP_TWITTER_QUEUE: process.env.AMQP_TWITTER_QUEUE || '',
  AMQP_TWITTER_OPERATION: process.env.AMQP_TWITTER_OPERATION || '',
  TWITTER_API_URL:process.env.TWITTER_API_URL || '',
  TWITTER_TOKEN: process.env.TWITTER_TOKEN || '',
  TWITTER_KEYWORDS: process.env.TWITTER_KEYWORDS || "",
  TWEET_COUNT: process.env.TWEET_COUNT || ""
};
