import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

const DOC_TYPES = ["Transcript", "Resume", "Recommendation", "Personal Statement", "Other"]

export function FileDropZone() {
  const [file, setFile] = useState(null)
  const [docType, setDocType] = useState("")
  const [notes, setNotes] = useState("")
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0 || !acceptedFiles[0]?.type.includes("pdf")) {
      toast.error("Please upload a valid PDF under 10MB")
      return
    }
    setFile(acceptedFiles[0])
  }, [])

  const validateMeta = () => {
    if (!docType) return "Choose a document type."
    if (notes.length > 200) return "Notes must be 200 characters or fewer."
    return ""
  }

  const mockUpload = () => {
    const err = validateMeta()
    if (err) return toast.error(err)
    setUploading(true)
    setProgress(0)
    const id = setInterval(() => {
      setProgress(p => {
        const next = Math.min(100, p + 10)
        if (next === 100) {
          clearInterval(id)
          setUploading(false)
          toast.success(`${file.name} uploaded as "${docType}"`)
        }
        return next
      })
    }, 120)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, multiple: false,
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: 10 * 1024 * 1024
  })

  return (
    <motion.div
      {...getRootProps()}
      initial={{ borderColor: '#ccc', backgroundColor: '#fff' }}
      animate={isDragActive
        ? { borderColor: '#06b6d4', backgroundColor: '#e0f7fa' }
        : { borderColor: '#ccc', backgroundColor: '#fff' }}
      transition={{ duration: 0.3 }}
      className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer shadow-sm"
    >
      <input {...getInputProps()} />
      <p>{isDragActive ? "Drop your PDF here..." : "Drag & drop or click to upload PDF"}</p>

      {file && !uploading && (
        <div className="mt-6 text-left space-y-4">
          <div>
            <label>Document Type:</label>
            <select className="w-full border p-2 rounded" value={docType} onChange={e => setDocType(e.target.value)}>
              <option value="">-- Select --</option>
              {DOC_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div>
            <label>Notes:</label>
            <textarea className="w-full border p-2 rounded" maxLength={200} value={notes} onChange={e => setNotes(e.target.value)} />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={mockUpload}>Submit</button>
        </div>
      )}

      {uploading && (
        <div className="mt-4">
          <p>Uploading... {progress}%</p>
          <progress max="100" value={progress} className="w-full" />
        </div>
      )}
    </motion.div>
  )
}
