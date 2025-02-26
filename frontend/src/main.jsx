import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "../context/userContext.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    }}
  >
    <UserProvider>
      <App />
    </UserProvider>
  </Auth0Provider>
);
