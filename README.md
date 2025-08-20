# PDF Drag & Drop with Metadata Upload

This project is a simple React-based drag-and-drop UI for uploading PDF files. After selecting a valid PDF, users are prompted to provide additional metadata which is validated before a mock upload process takes place.

## Features

- 📄 Drag-and-drop or click-to-upload interface for PDF files.
- ✅ File type and size validation (PDF only).
- 📝 Metadata form with:
  - **Document Type** (required): Choose from Transcript, Resume, Recommendation, Personal Statement, or Other.
  - **Notes** (optional): Max 200 characters.
- 📈 Mock upload with animated progress bar (1.2–1.6s duration).
- 🧠 Success message includes uploaded filename and document type.
- ♿ Fully accessible UI with proper keyboard navigation and ARIA labels.
- 💻 Tested in the latest Chrome & Safari browsers.

## Getting Started

### Local Development

1. Clone the repository and navigate into the project:
   ```bash
   git clone https://github.com/your-username/pdf-drag-drop.git
   cd pdf-drag-drop
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Vercel Deployment

1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com), import the GitHub repo.
3. Make sure the project root contains `package.json`.
4. Set the build command to `npm run build` and output directory to `build`.
5. Click deploy.

## Folder Structure

```
/public
/src
  ├── App.js
  ├── index.js
  ├── PDFDropZone.js
  ├── MetadataForm.js
  ├── styles.css
```

## Notes

- Ensure you only upload valid PDFs.
- The upload progress is simulated for UI purposes (no actual backend connected).
- You can hook the metadata to a backend via API or serverless function.

---

Built with React.
