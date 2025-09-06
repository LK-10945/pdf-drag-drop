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
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setError("");
    setSuccess(false);
    if (rejectedFiles.length > 0 || !acceptedFiles[0]?.type.includes("pdf")) {
      setFile(null);
      setError("❌ Upload a valid PDF under 10MB.");
      return;
    }
    setFile(acceptedFiles[0]);
  }, []);

  const validate = () => {
    if (!docType) return "Select a document type.";
    if (notes.length > 200) return "Notes too long.";
    return "";
  };

  const mockUpload = () => {
    const err = validate();
    if (err) return setError(err);

    setUploading(true);
    setProgress(0);
    const id = setInterval(() => {
      setProgress(p => {
        const next = Math.min(p + 10, 100);
        if (next === 100) {
          clearInterval(id);
          setSuccess(true);
          setUploading(false);
        }
        return next;
      });
    }, 100);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: 10 * 1024 * 1024,
  });

  return (
    <motion.div
      {...getRootProps()}
      className="border-2 border-dashed rounded-lg p-10 text-center"
      initial={{ backgroundColor: "#f9f9f9" }}
      animate={isDragActive ? { backgroundColor: "#e0f2fe" } : { backgroundColor: "#f9f9f9" }}
    >
      <input {...getInputProps()} />
      <p>{isDragActive ? "Drop your PDF here..." : "Drag & drop or click to upload a PDF"}</p>

      {file && !uploading && !success && (
        <div className="mt-4 space-y-3">
          <select value={docType} onChange={(e) => setDocType(e.target.value)}>
            <option value="">-- Select Type --</option>
            {DOC_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <textarea
            className="w-full border rounded p-2"
            maxLength={200}
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={mockUpload}>Submit</button>
        </div>
      )}

      {uploading && <p className="mt-2">Uploading... {progress}%</p>}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">✅ {file.name} uploaded as "{docType}"</p>}
    </motion.div>
  );
}
