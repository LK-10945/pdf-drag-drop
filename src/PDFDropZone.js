import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function PDFDropZone() {
  const [message, setMessage] = useState('');

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setMessage('❌ File rejected. Please upload a PDF under 10MB.');
      return;
    }

    const file = acceptedFiles[0];
    if (file && file.type === 'application/pdf') {
      if (file.size <= 10 * 1024 * 1024) {
        setMessage(`✅ Successfully uploaded: ${file.name}`);
      } else {
        setMessage('❌ File too large. Max allowed size is 10MB.');
      }
    } else {
      setMessage('❌ Invalid file type. Please upload a PDF.');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: 10 * 1024 * 1024,
  });

  return (
    <div {...getRootProps()} style={dropzoneStyles}>
      <input {...getInputProps()} />
      {
        isDragActive
          ? <p>Drop the PDF file here...</p>
          : <p>Drag & drop your Submission as a PDF file here, or click to select one</p>
      }
      {message && <p style={{ marginTop: '1em' }}>{message}</p>}
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