import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf";

GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default pdfjs;
