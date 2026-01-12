import { useState } from "react";
import { Document, Page } from "react-pdf";

function PreviewResume({ selectedFile, onApply }) {
  const [numPages, setNumPages] = useState(null);

  const fileURL = selectedFile ? URL.createObjectURL(selectedFile) : null;

  return (
    <div className="p-4">
      {fileURL && (
        <div className="border p-3">
          <Document
            file={fileURL}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            <Page pageNumber={1} />
          </Document>
          <p className="text-center">Page 1 of {numPages}</p>

          <button
            className="bg-blue-600 text-white p-2 rounded mt-4"
            onClick={onApply}
          >
            Apply for Job
          </button>
        </div>
      )}
    </div>
  );
}

export default PreviewResume;
