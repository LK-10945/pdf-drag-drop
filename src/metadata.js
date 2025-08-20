import React from "react";

const DOC_TYPES = [
  "Transcript",
  "Resume",
  "Recommendation",
  "Personal Statement",
  "Other"
];

export default function MetaForm({ docType, setDocType, notes, setNotes, disabled }) {
  return (
    <div className="meta-form" style={{ marginTop: "1rem" }}>
      <label htmlFor="doc-type">
        Document Type<span style={{ color: "red" }}> *</span>
      </label>
      <select
        id="doc-type"
        value={docType}
        onChange={(e) => setDocType(e.target.value)}
        disabled={disabled}
        aria-required="true"
        aria-label="Document Type"
      >
        <option value="">-- Select Type --</option>
        {DOC_TYPES.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <label htmlFor="notes" style={{ marginTop: "0.5rem", display: "block" }}>
        Notes (optional, max 200 chars)
      </label>
      <textarea
        id="notes"
        maxLength={200}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        disabled={disabled}
        placeholder="Add any extra details here..."
        style={{ width: "100%", height: "4rem", resize: "vertical" }}
        aria-label="Notes"
      />
    </div>
  );
}
