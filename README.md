# AI Phishing Detection Platform

Live Demo:
https://ai-phishing-detector-snowy.vercel.app

## Overview

AI-powered phishing email detection platform built using:

- FastAPI
- React
- OpenAI API
- Vercel
- Render

The platform analyzes suspicious emails using AI and returns:

- phishing score
- threat level
- suspicious indicators
- recommended actions

---

## Features

- AI phishing detection
- Real-time threat analysis
- Modern SOC dashboard UI
- FastAPI backend API
- React frontend
- Cloud deployment
- OpenAI integration

---

## Tech Stack

### Frontend
- React
- Vite
- CSS

### Backend
- FastAPI
- Python
- OpenAI SDK

### Deployment
- Vercel
- Render

---

## Screenshots

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Threat Analysis

![Threat Analysis](screenshots/phishing-result.png)

---

## API Endpoint

POST `/analyze-email`

Example Request:

```json
{
  "email_text": "Urgent! Your bank account has been suspended."
}
```

---

## Local Setup

### Backend

```bash
python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt

uvicorn backend.main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Live Deployment

Frontend:
https://ai-phishing-detector-snowy.vercel.app

Backend:
https://ai-phishing-detector-lpit.onrender.com

---

## Author

Pratik