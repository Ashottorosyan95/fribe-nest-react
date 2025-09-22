# 🌐 Fribe – NestJS + React

A social application prototype with **NestJS backend** and **React frontend**.  
Provides authentication, user management, and map services integration.  

---

## 🚀 Tech Stack
- **Frontend:** React, TypeScript, TailwindCSS  
- **Backend:** NestJS, TypeScript  
- **Services:** Map services integration (tasleem-maps, fribe-map-services)  
- **Database:** PostgreSQL (via TypeORM / Prisma)  
- **Auth:** JWT  

---

## ✨ Features
- 🔐 Authentication (JWT based)  
- 👤 User profiles and basic social interactions  
- 🗺 Map services integration for geolocation features  
- 📡 REST API powered by NestJS  
- ⚡ Modular monorepo structure (frontend + backend + services)  

---

## 🛠 Installation & Setup

### 1. Clone the repository  
```bash
git clone https://github.com/Ashottorosyan95/fribe-nest-react.git
cd fribe-nest-react

cd fribe-map-services
npm install
npm run start:dev

cd fribe-front-end
npm install
npm start

cd tasleem-maps
npm install
npm run start
