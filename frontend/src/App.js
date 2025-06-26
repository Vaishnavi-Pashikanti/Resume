import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Assuming you have some basic styles

const BACKEND_URL = "https://resume-production-201f.up.railway.app";

function App() {
  const [resume, setResume] = useState({
    name: "",
    summary: "",
    experience: [],
    education: [],
    skills: []
  });

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post(`${BACKEND_URL}/upload-resume`, formData);
    setResume(res.data);
  };

  const handleEnhance = async (section) => {
    const res = await axios.post(`${BACKEND_URL}/ai-enhance`, {
      section,
      content: resume[section]
    });
    setResume({ ...resume, [section]: res.data.enhanced });
  };

  const handleSave = async () => {
    await axios.post(`${BACKEND_URL}/save-resume`, resume);
    alert("Saved!");
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(resume, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="App">
      <div>
        <h1>Resume Editor</h1>
        <input type="file" accept=".pdf,.docx" onChange={handleUpload} />
        <div>
          <label>Name:</label>
          <input value={resume.name} onChange={e => setResume({ ...resume, name: e.target.value })} />
        </div>
        <div>
          <label>Summary:</label>
          <textarea value={resume.summary} onChange={e => setResume({ ...resume, summary: e.target.value })} />
          <button onClick={() => handleEnhance("summary")}>Enhance with AI</button>
        </div>
        {/* Repeat for experience, education, skills with add/remove */}
        <button onClick={handleSave}>Save Resume</button>
        <button onClick={handleDownload}>Download Resume</button>
      </div>
    </div>
  );
}

export default App;