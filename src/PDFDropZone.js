import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const DOC_TYPES = ["Transcript", "Resume", "Recommendation", "Personal Statement", "Other"];

export default function PDFDropZone() {
  const [file, setFile] = useState(null);
  const [docType, setDocType] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setError("");
    setSuccess(false);
    if (rejectedFiles.length > 0 || !acceptedFiles[0]?.type.includes("pdf")) {
      setFile(null);
      setError("❌ Please upload a valid PDF file under 10MB.");
      return;
    }
    setFile(acceptedFiles[0]);
  }, []);

  const validateMeta = () => {
    if (!docType) return "Please choose a document type.";
    if (notes.length > 200) return "Notes must be 200 characters or fewer.";
    return "";
  };

  const mockUpload = () => {
    const metaErr = validateMeta();
    if (metaErr) {
      setError(metaErr);
      return;
    }
    setError("");
    setUploading(true);
    setProgress(0);
    const id = setInterval(() => {
      setProgress(p => {
        const next = Math.min(100, p + 8);
        if (next === 100) {
          clearInterval(id);
          setUploading(false);
          setSuccess(true);
        }
        return next;
      });
    }, 120);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: 10 * 1024 * 1024,
  });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyles} aria-label="Upload PDF">
        <input {...getInputProps()} aria-label="File input" />
        {isDragActive ? <p>Drop your PDF here...</p> : <p>Drag and drop a PDF file here, or click to select one</p>}
      </div>

      {file && !uploading && !success && (
        <div style={{ marginTop: '1rem' }}>
          <label>
            Document Type (required):<br />
            <select value={docType} onChange={(e) => setDocType(e.target.value)} disabled={uploading} required>
              <option value="">-- Select --</option>
              {DOC_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Notes (optional, max 200 chars):<br />
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={200}
              disabled={uploading}
            />
          </label>
          <br />
          <button onClick={mockUpload} disabled={uploading}>Submit</button>
        </div>
      )}

      {uploading && (
        <div style={{ marginTop: '1rem' }}>
          Uploading... {progress}%
          <progress value={progress} max="100" />
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>✅ {file.name} uploaded as "{docType}"</p>}
    </div>
  );
}

const dropzoneStyles = {
  border: '2px dashed #888',
  padding: '40px',
  textAlign: 'center',
  borderRadius: '8px',
  cursor: 'pointer',
  marginTop: '2em',
  backgroundColor: '#f9f9f9'
};

