# 🚀 Freelancia – Empowering Freelancers

![GitHub stars](https://img.shields.io/github/stars/amriteshanand0129/Freelancia)
![GitHub forks](https://img.shields.io/github/forks/amriteshanand0129/Freelancia)
![License](https://img.shields.io/github/license/amriteshanand0129/Freelancia)

## 🌟 About the Project  
Freelancia is a feature-rich freelancing platform designed to **connect businesses with skilled freelancers** efficiently. This platform ensures **seamless job postings, secure payments, and smooth communication**.

🔗 **Live Demo**: [Freelancia](https://freelancia.onrender.com)  

### ✨ Key Features  
- 📝 Post & Find Freelance Jobs – Clients can post jobs, and freelancers can bid on projects.
- ⭐ Freelancer Ratings & Reviews – Build credibility through feedback and ratings.
- 👤 Profile Management – Update personal details, portfolio, and skills seamlessly.
- 🔑 Google Sign-In – Quick and secure authentication using Google.

---

## 🛠️ Tech Stack  
- **Frontend**: React.js, Tailwind CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Authentication**: Auth0  
- **Deployment**: Render  

---

## 📦 Installation & Setup  
To get started, clone the repo and install dependencies:  
```bash
git clone https://github.com/your-repo/Freelancia.git
cd Freelancia
```
Setup the Environment variables:
Create .env file in _backend_ folder
```bash
DB_URL = your_database_url
PORT = backend_server_port (e.g 8080)
ORIGIN = frontend_server_url (e.g http://localhost:3000)
AUDIENCE = backend_server_url (e.g https://localhost:8080)
SIGNING_KEY_URL = https://your_auth0_domain.auth0.com/.well-known/jwks.json"
```

Create .env file in _frontend_ folder
```bash
VITE_API_URL = your_backend_server (e.g http://localhost:8080)
VITE_AUTH0_AUDIENCE = your_backend_server (e.g https://localhost:8080)
VITE_AUTH0_DOMAIN = your_auth0_domain.auth0.com
VITE_AUTH0_CLIENT_ID = your_auth0_clientID
```

Install dependencies and start servers
```bash
cd frontend
npm install
npm run dev

cd ../backend
npm install
npm start
```

⚠️ Make sure to add .env to .gitignore to prevent exposing sensitive data.

Your servers are up and running.