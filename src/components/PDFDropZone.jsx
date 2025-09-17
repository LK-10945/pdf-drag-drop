import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { supabase } from "../supabase";
import { v4 as uuidv4 } from "uuid";

export default function PDFDropZone() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const onDrop = async (acceptedFiles) => {
    setMessage("");
    setUploading(true);

    for (const file of acceptedFiles) {
      if (file.size > 10 * 1024 * 1024) {
        setMessage("❌ File too large. Max 10MB per file.");
        setUploading(false);
        return;
      }

      const fileExt = file.name.split(".").pop();
      const filePath = `${uuidv4()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("pdfs") // ⚠️ bucket name must match your Supabase bucket
        .upload(filePath, file);

      if (error) {
        setMessage(`❌ Upload failed: ${error.message}`);
      } else {
        setMessage(`✅ Uploaded ${file.name}`);
      }
    }

    setUploading(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: true,
  });

  return (
    <div className="mt-6">
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed rounded-xl text-center cursor-pointer transition ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-400 bg-gray-100"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-600">📂 Drop PDFs here…</p>
        ) : (
          <p className="text-gray-700">Drag & drop PDFs here, or click to select files</p>
        )}
      </div>

      {uploading && (
        <div className="mt-3 text-blue-600 font-semibold">Uploading… ⏳</div>
      )}

      {message && (
        <div className="mt-3 text-sm font-medium">{message}</div>
      )}
    </div>
  );
}



