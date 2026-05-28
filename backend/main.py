from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import os
import json

# Load environment variables
load_dotenv()

# OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request model
class EmailRequest(BaseModel):
    email_text: str


# Home route
@app.get("/")
def home():
    return {
        "message": "AI Phishing Detection API Running"
    }


# AI Phishing Analysis Route
@app.post("/analyze-email")
def analyze_email(request: EmailRequest):

    prompt = f"""
    Analyze the following email for phishing indicators.

    You are a cybersecurity SOC analyst.

    Scoring Rules:
    - Safe emails = 0-20
    - Suspicious emails = 21-60
    - Clear phishing emails = 61-100

    If the email contains:
    - urgency
    - password requests
    - credential verification
    - suspicious links
    - banking threats

    then the phishing score should be HIGH.

    Return ONLY valid JSON with this structure:

    {{
      "phishing_score": number,
      "threat_level": "LOW/MEDIUM/HIGH",
      "suspicious_indicators": [],
      "explanation": "",
      "recommended_action": ""
    }}

    Email:
    {request.email_text}
    """

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "system",
                "content": """
                You are an expert cybersecurity SOC analyst.

                Always return valid JSON only.
                """
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    analysis = response.choices[0].message.content

    parsed_analysis = json.loads(analysis)

    return parsed_analysis