import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
dotenv.config();

const client = jwksClient({
  jwksUri: process.env.SIGNING_KEY_URL,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      console.log("Signing Key Fetching Failed: ", err);
      callback(err, null);
    } else {
      const signingKey = key.getPublicKey();
      callback(null, signingKey);
    }
  });
}

const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Unauthenticated Access")
    return res.status(401).send({ error: "Unauthenticated Access" });
  }

  try {
    const token = authHeader.split(" ")[1];
    jwt.verify(
      token,
      getKey,
      {
        audience: "https://localhost:8080",
        issuer: "https://dev-pbblqzx4izdm48nt.us.auth0.com/",
        algorithms: ["RS256"],
      },
      (err, decoded) => {
        if (err) {
          console.log("Token Verification Failed: ", err);
          return res.status(401).send({ error: "Token verification failed" });
        } else {
          req.user = decoded;
          return next();
        }
      }
    );
  } catch (err) {
    console.log("JWT Token Validation Failed", err);
    res.status(400).send({ error: "Token verification failed" });
  }
};

const isClient = (req, res, next) => {
  if (req.user.userType === "CLIENT") {
    next();
  } else {
    res.status(403).send({ error: "You are not authorized to access this endpoint" });
  }
};

const isFreelancer = (req, res, next) => {
  if (req.user.userType === "FREELANCER") {
    next();
  } else {
    res.status(403).send({ error: "You are not authorized to access this endpoint" });
  }
};
const auth_middleware = {
  validateToken: validateToken,
  isClient: isClient,
  isFreelancer: isFreelancer,
};

export default auth_middleware;
