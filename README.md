# SecureLens — Privacy-First Image Anonymizer

SecureLens is a web application that automatically detects and anonymizes faces and vehicles in images. It uses a YOLOv8n object detection model to identify sensitive regions and applies a Gaussian blur to protect privacy — all processed in-memory with zero disk writes.

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Frontend    | React 19 (Vite), Tailwind CSS 4     |
| Backend     | Python 3, FastAPI, Uvicorn          |
| CV Pipeline | OpenCV (`cv2`), Ultralytics YOLOv8n |

## Prerequisites

Make sure the following are installed before proceeding:

- **Python 3.10+** — [Download](https://www.python.org/downloads/)
- **Node.js 18+** and **npm** — [Download](https://nodejs.org/)
- **Git** — [Download](https://git-scm.com/)

---

## Quick Start (Step-by-Step)

> All commands below assume you are starting from a fresh clone. Two terminal windows are required — one for the backend, one for the frontend.

### Step 1 — Clone the Repository

```bash
git clone https://github.com/ritesh-raushan/SecureLens.git
cd SecureLens
```

### Step 2 — Start the Backend (Terminal 1)

From the project root (`SecureLens/`):

```bash
cd backend
python -m venv venv
```

Activate the virtual environment:

- **Windows (CMD):**
  ```cmd
  venv\Scripts\activate
  ```
- **Windows (PowerShell):**
  ```powershell
  .\venv\Scripts\Activate.ps1
  ```
- **macOS / Linux:**
  ```bash
  source venv/bin/activate
  ```

Install dependencies and start the server:

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

Wait until you see `Uvicorn running on http://127.0.0.1:8000`. On the first run, YOLOv8n model weights (~6 MB) are downloaded automatically.

Verify the server is running:

```bash
curl http://localhost:8000/health
```

Expected output: `{"status":"ok"}`

> **Note (Windows PowerShell):** Use `curl.exe` instead of `curl` for all cURL commands. PowerShell aliases `curl` to a different command.

### Step 3 — Start the Frontend (Terminal 2)

Open a **second terminal** and from the project root (`SecureLens/`):

```bash
cd frontend
npm install
npm run dev
```

Wait until you see `Local: http://localhost:5173/`.

### Step 4 — Test the Application

**Option A — Web UI (recommended):**

1. Open **http://localhost:5173** in your browser.
2. A sample test image is included in the repository. Drag and drop `samples/test-image.jpg` into the upload zone (or click to browse and select it).
3. Click **"Process Image"**.
4. The anonymized image appears side-by-side with the original.
5. Click **"Download"** to save the result.

**Option B — Command line only (no browser needed):**

Run from the project root (`SecureLens/`):

- **Windows (PowerShell):**
  ```powershell
  curl.exe -X POST http://localhost:8000/anonymize -F "file=@samples/test-image.jpg" --output anonymized.jpg
  ```
- **macOS / Linux:**
  ```bash
  curl -X POST http://localhost:8000/anonymize \
    -F "file=@samples/test-image.jpg" \
    --output anonymized.jpg
  ```

This saves the anonymized result as `anonymized.jpg` in the project root. Open it with any image viewer to verify that people and vehicles are blurred.

### Sample Test Image

The included test image (`samples/test-image.jpg`) contains both pedestrians and a vehicle, which are the target classes for anonymization:

![Sample test image](samples/test-image.jpg)

---

## Architecture

```
Browser (React)                     Server (FastAPI)
┌──────────────┐   POST /anonymize   ┌──────────────────────────┐
│ Upload Image ├────── FormData ─────►│ Decode bytes → cv2 mat   │
│              │                      │ YOLOv8n inference        │
│ Display      │◄── JPEG stream ─────┤ Gaussian blur on ROIs    │
│ Result       │                      │ Encode → JPEG bytes      │
└──────────────┘                      └──────────────────────────┘
```

All image processing happens in-memory. The uploaded file is decoded directly into a NumPy array, processed, and streamed back as JPEG bytes — nothing is ever saved to disk.

## API Endpoints

| Method | Endpoint     | Description                                      |
|--------|--------------|--------------------------------------------------|
| GET    | `/health`    | Health check — returns `{"status": "ok"}`        |
| POST   | `/anonymize` | Accepts an image file, returns anonymized JPEG   |

## Detected Object Classes

SecureLens targets the following COCO classes for anonymization:

| Class ID | Label      |
|----------|------------|
| 0        | Person     |
| 2        | Car        |
| 3        | Motorcycle |
| 5        | Bus        |
| 7        | Truck      |

## Project Structure

```
SecureLens/
├── README.md
├── .gitignore
├── samples/
│   └── test-image.jpg       # Sample image for testing
├── backend/
│   ├── main.py              # FastAPI app with /health and /anonymize endpoints
│   ├── requirements.txt     # Pinned Python dependencies
│   └── venv/                # Virtual environment (git-ignored)
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── public/
    └── src/
        ├── main.jsx         # React entry point
        ├── index.css        # Tailwind CSS imports
        ├── App.jsx          # Root component — state management and layout
        └── components/
            ├── Header.jsx       # App header with logo and new-file button
            ├── Dropzone.jsx     # Drag-and-drop upload / image preview panels
            ├── ControlsBar.jsx  # Toggle switches, process and download buttons
            ├── ToggleSwitch.jsx # Reusable toggle switch component
            └── Footer.jsx       # App footer
```
