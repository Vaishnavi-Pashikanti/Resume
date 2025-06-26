from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

resume_store = {}

class EnhanceRequest(BaseModel):
    section: str
    content: str

@app.post("/ai-enhance")
def ai_enhance(req: EnhanceRequest):
    # Mock enhancement
    return {"enhanced": f"Enhanced: {req.content}"}

@app.post("/save-resume")
def save_resume(resume: dict):
    # Save to disk or memory (here, memory)
    resume_store['resume'] = resume
    with open("resume.json", "w") as f:
        json.dump(resume, f)
    return {"status": "saved"}

@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    # Mock parsing: return dummy content
    return {
        "name": "John Doe",
        "summary": "Experienced developer...",
        "experience": [],
        "education": [],
        "skills": []
    }