import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { supabase } from "../supabase";
import { v4 as uuidv4 } from "uuid";

export default function PDFDropZone() {
  const [uploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [messages, setMessages] = useState([]);

  const onDrop = useCallback(async (acceptedFiles) => {
    setMessages([]);
    setUploading(true);
    setUploadCount(0);
    setTotalCount(acceptedFiles.length);

    // Require login
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;
    if (!userId) {
      setMessages(["❌ You must be logged in to upload."]);
      setUploading(false);
      return;
    }

    for (const file of acceptedFiles) {
      if (file.type !== "application/pdf") {
        setMessages((prev) => [...prev, `❌ ${file.name} is not a PDF.`]);
        continue;
      }

      if (file.size > 10 * 1024 * 1024) {
        setMessages((prev) => [...prev, `❌ ${file.name} exceeds the 10MB limit.`]);
        continue;
      }

      const fileId = uuidv4();
      const filePath = `${userId}/${fileId}/${file.name}`;

      // Upload to Storage
      const { error: uploadError } = await supabase.storage
        .from("pdfs")
        .upload(filePath, file, { upsert: false });

      if (uploadError) {
        setMessages((prev) => [
          ...prev,
          `❌ Failed to upload ${file.name}: ${uploadError.message}`,
        ]);
        continue;
      }

      // Insert metadata
      const { error: insertError } = await supabase
        .from("pdf_metadata")
        .insert([
          {
            id: fileId,
            filename: file.name,
            size_mb: (file.size / 1024 / 1024).toFixed(2),
            user_id: userId,
          },
        ]);

      if (insertError) {
        setMessages((prev) => [
          ...prev,
          `❌ Failed to save metadata for ${file.name}`,
        ]);
        continue;
      }

      setMessages((prev) => [...prev, `✅ Uploaded ${file.name} successfully.`]);
      setUploadCount((prev) => prev + 1);
    }

    setUploading(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: { "application/pdf": [] },
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className="border-4 border-dashed rounded-xl p-10 bg-white shadow text-center hover:bg-gray-50 transition-all cursor-pointer"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-lg font-medium">Drop the PDFs here…</p>
        ) : (
          <p className="text-lg font-medium">
            Drag & drop PDFs here (max 10MB each)
          </p>
        )}
      </div>

      {uploading && (
        <div className="w-full mt-4">
          <p className="text-sm text-gray-500 mb-2">Uploading files…</p>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all"
              style={{ width: `${(uploadCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      )}

      {messages.length > 0 && (
        <div className="mt-6 space-y-1">
          {messages.map((msg, idx) => (
            <p
              key={idx}
              className={
                msg.startsWith("✅")
                  ? "text-green-600"
                  : msg.startsWith("❌")
                  ? "text-red-600"
                  : "text-gray-600"
              }
            >
              {msg}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

