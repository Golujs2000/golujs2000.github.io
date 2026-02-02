# 🚀 CGP360 - React + Firebase "Master Prompt" Specification

**Use this prompt to generate the full CGP360 application using Firebase (Completely Free).**

---

## 🏗️ Project Overview
**Name:** CGP360 (Clinic Growth Partner)
**Type:** SaaS Platform for Medical Clinics
**Goal:** Empower doctors to manage their digital presence, appointments, and patient interactions through a centralized dashboard.
**Core Advantage:** **Serverless & Free** (No backend server costs).

## 🛠️ Technology Stack (Firebase Edition)
- **Frontend (Admin & Doctor Dashboard):** React.js (Vite), TailwindCSS, ShadcnUI.
- **Public Clinic Sites:** React.js (Single Page App) with React Helmet for SEO.
- **Backend (Serverless):** Firebase Cloud Functions (Optional) or Direct Firestore Access.
- **Database:** **Firebase Firestore** (NoSQL, Realtime, Free Tier).
- **Authentication:** **Firebase Auth** (Google, Email/Password, Phone - Free).
- **Image Storage:** **Firebase Storage** (Free Tier).
- **Hosting:** **Firebase Hosting** (Free SSL, CDN).

---

## 📂 Database Schema (Firestore Collections)

### 1. `users` (Collection)
*Documents are User IDs (UID)*
- `name`: String
- `email`: String
- `role`: "doctor" | "admin"
- `clinicSlug`: String (Reference to their clinic)
- `createdAt`: Timestamp

### 2. `clinics` (Collection)
*Documents are Clinic Slugs (e.g., 'dr-rajesh-indore')*
- `ownerId`: String (UID)
- `name`: String
- `specialty`: String
- `city`: String
- `address`: String
- `contactNumber`: String
- `whatsappNumber`: String
- `aboutText`: String
- `services`: ArrayOf({ name, price, description })
- `images`: ArrayOf(String) (URLs from Firebase Storage)
- `themeColor`: String
- `socialLinks`: Map
- `paymentDetails`: { upiId: String, qrCodeUrl: String }

### 3. `appointments` (Collection)
- `clinicSlug`: String
- `patientName`: String
- `patientPhone`: String
- `date`: Timestamp
- `status`: "pending" | "confirmed" | "completed"
- `serviceInterested`: String
- `createdAt`: Timestamp

---

## 🔌 Application Logic (Firebase SDK)

### Auth Flow
- `signInWithEmailAndPassword`: Doctor Login.
- `createUserWithEmailAndPassword`: Registration.
- `onAuthStateChanged`: Session Management.

### Data Access (Security Rules)
- **Public Read:** Anyone can read `clinics/{slug}` (For the website).
- **Owner Write:** Only the Doctor (auth.uid == resource.data.ownerId) can edit their clinic.
- **Appointment Create:** Public can create (Booking form).
- **Appointment Read/Update:** Only Doctor can view/manage their appointments.

---

## 💻 Frontend Features

### 1. Dashboard (Protected Route)
- **Realtime Appointments:** Use `onSnapshot` to show new bookings instantly without refreshing.
- **Profile Editor:** Simple forms to update Firestore `clinics` document.
- **Image Upload:** Drag & drop to Firebase Storage -> Get URL -> Save to Firestore.
- **Payment Settings:** Upload QR Code image & Enter UPI ID.

### 2. Public Clinic Website (Dynamic)
- **URL Structure:** `cgp360.web.app/clinic/:slug`
- **Fetching:** `getDoc(doc(db, "clinics", slug))`
- **SEO:** Use React Helmet to inject Doctor Name/Specialty into `<title>`.
- **Booking Form:** Direct write to `appointments` collection.
- **Payment Section:** Display Doctor's QR Code & UPI ID for manual payment.

---

## 📝 Implementation Steps for AI
1.  **Setup Project:** Create Vite + React project.
2.  **Config Firebase:** Create `firebase.js` with API keys.
3.  **Build Auth:** Login/Register pages using Firebase Auth.
4.  **Database Rules:** Set up Firestore Security Rules (Critical for security).
5.  **Build Dashboard:** Create logic to Read/Write to `clinics` collection.
6.  **Build Public Page:** Create dynamic route `/clinic/:slug` that fetches data.
7.  **Deploy:** Run `firebase deploy` to host for free.

