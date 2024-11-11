let access_token = "";
let token_expiration = 0;

const getAccessToken = async () => {
  if (Date.now() >= token_expiration) {
    console.log("Getting access token");
    const options = {
      method: "POST",
      url: process.env.MANAGEMENT_API_TOKEN_URL,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.MANAGEMENT_API_CLIENT_ID,
        client_secret: process.env.MANAGEMENT_API_CLIENT_SECRET,
        audience: process.env.MANAGEMENT_API_URL,
        grant_type: "client_credentials",
      }),
    };

    const response = await fetch(options.url, options);
    const data = await response.json();
    access_token = data.access_token;
    token_expiration = Date.now() + data.expires_in * 1000;
  }
  return access_token;
};

module.exports = {
    getAccessToken : getAccessToken
}