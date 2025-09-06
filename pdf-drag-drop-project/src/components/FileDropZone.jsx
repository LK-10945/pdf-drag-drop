import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';

const DOC_TYPES = ["Transcript", "Resume", "Recommendation", "Personal Statement", "Other"];

export function FileDropZone() {
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
    <div className="max-w-xl mx-auto">
      <motion.div
        {...getRootProps()}
        initial={{ backgroundColor: '#f9f9f9', borderColor: '#888' }}
        animate={isDragActive
          ? { backgroundColor: '#e0f7fa', borderColor: '#00acc1' }
          : { backgroundColor: '#f9f9f9', borderColor: '#888' }}
        transition={{ duration: 0.3 }}
        className="border-2 border-dashed p-10 text-center rounded-xl cursor-pointer"
      >
        <input {...getInputProps()} />
        {isDragActive
          ? <p>Drop your PDF here...</p>
          : <p>Drag and drop a PDF file here, or click to select one</p>}
      </motion.div>

      {file && !uploading && !success && (
        <div className="mt-4 space-y-4">
          <div>
            <label className="block font-medium">Document Type (required):</label>
            <select value={docType} onChange={(e) => setDocType(e.target.value)} disabled={uploading} className="w-full border rounded p-2">
              <option value="">-- Select --</option>
              {DOC_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium">Notes (optional, max 200 chars):</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={200} disabled={uploading} className="w-full border rounded p-2" />
          </div>
          <button onClick={mockUpload} disabled={uploading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
        </div>
      )}

      {uploading && (
        <div className="mt-4">
          Uploading... {progress}%
          <progress value={progress} max="100" className="w-full" />
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-600 mt-4">✅ {file.name} uploaded as "{docType}"</p>}
    </div>
  );
}
