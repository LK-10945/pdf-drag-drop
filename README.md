# 📄 PDF Drag & Drop App

A React + Vite application that lets authenticated users upload multiple PDF files (up to 10MB each) into Supabase storage, with Row Level Security (RLS) enabled.

## 🚀 Features
- React + Vite frontend with TailwindCSS  
- Supabase Auth (email + password sign-in and sign-up)  
- Supabase Storage bucket for PDFs  
- Row Level Security (RLS) policies for secure uploads  
- Drag & Drop Upload (via `react-dropzone`)  
- File validation (only PDF, max 10MB)  
- Upload status messages (loading, success, error)  
- Logout button to end session securely  

## 🗂 Project Structure
src/
App.jsx # Root component (auth + layout)
main.jsx # React entry point
supabase.js # Supabase client setup
index.css # Tailwind base styles
components/
Auth.jsx # Login / Signup form
LogoutButton.jsx # Logout action
PDFDropZone.jsx # Drag & drop PDF uploader

## ⚙️ Run Locally
1. Clone the repo and install dependencies:
```bash
git clone https://github.com/YOUR-USERNAME/pdf-drag-drop-advsec.git
cd pdf-drag-drop-advsec
npm install
Start the development server:

Copy code
npm run dev
Open http://localhost:++++++ in your browser.

🔑 Environment Variables
You need to set the following environment variables (either in a .env file for local dev or in Vercel project settings for deployment):

Copy code
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
📦 Deployment
Hosted on Vercel

Build command: npm run build

Output directory: dist

Environment variables configured in Vercel project settings:

VITE_SUPABASE_URL

VITE_SUPABASE_ANON_KEY

✅ Next Steps

Add rate limiting for uploads

Improve UI polish (progress bar, file list, previews)

Add error boundary and logging for Supabase requests


