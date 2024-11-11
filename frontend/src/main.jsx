import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-pbblqzx4izdm48nt.us.auth0.com"
    clientId="wLRHfH4bO4TnzY369C54PmV2tcqvE0kC"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://localhost:8080",
    }}
  >
    <App />
  </Auth0Provider>
);
