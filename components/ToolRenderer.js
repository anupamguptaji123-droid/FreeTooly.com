"use client";

import { getToolBySlug } from "@/lib/tools-registry";
import GenericToolRenderer from "@/components/GenericToolRenderer";

// Direct component imports (eliminates dynamic import chunk trace 500 errors)
import WordCounter from "@/components/tools/WordCounter";
import CaseConverter from "@/components/tools/CaseConverter";
import JsonFormatter from "@/components/tools/JsonFormatter";
import TextReverser from "@/components/tools/TextReverser";
import RemoveExtraSpaces from "@/components/tools/RemoveExtraSpaces";
import RemoveDuplicateLines from "@/components/tools/RemoveDuplicateLines";
import RemovePunctuation from "@/components/tools/RemovePunctuation";
import UuidGenerator from "@/components/tools/UuidGenerator";
import PasswordGenerator from "@/components/tools/PasswordGenerator";
import Md5Hash from "@/components/tools/Md5Hash";
import Sha256Hash from "@/components/tools/Sha256Hash";
import Base64EncodeDecode from "@/components/tools/Base64EncodeDecode";
import UrlEncodeDecode from "@/components/tools/UrlEncodeDecode";
import TextBinaryHex from "@/components/tools/TextBinaryHex";
import LengthConverter from "@/components/tools/LengthConverter";
import WeightConverter from "@/components/tools/WeightConverter";
import RandomTeamGenerator from "@/components/tools/RandomTeamGenerator";
import AddLineNumbers from "@/components/tools/AddLineNumbers";
import SortTextLines from "@/components/tools/SortTextLines";
import CssBeautifier from "@/components/tools/CssBeautifier";

import WordToPdf from "@/components/tools/WordToPdf";
import PdfToWord from "@/components/tools/PdfToWord";
import MergePdf from "@/components/tools/MergePdf";
import ProtectPdf from "@/components/tools/ProtectPdf";
import CompressPdf from "@/components/tools/CompressPdf";
import EditPdfText from "@/components/tools/EditPdfText";
import ResizePdfImages from "@/components/tools/ResizePdfImages";
import ImageToPdf from "@/components/tools/ImageToPdf";
import ExcelToPdf from "@/components/tools/ExcelToPdf";
import PptToPdf from "@/components/tools/PptToPdf";

import MergeWord from "@/components/tools/MergeWord";
import CropJpg from "@/components/tools/CropJpg";

const componentMap = {
  "word-counter": WordCounter,
  "case-converter": CaseConverter,
  "json-formatter": JsonFormatter,
  "text-reverser": TextReverser,
  "remove-extra-spaces": RemoveExtraSpaces,
  "remove-duplicate-lines": RemoveDuplicateLines,
  "remove-punctuation": RemovePunctuation,
  "uuid-generator": UuidGenerator,
  "password-generator": PasswordGenerator,
  "md5-hash": Md5Hash,
  "sha256-hash": Sha256Hash,
  "base64-encode-decode": Base64EncodeDecode,
  "url-encode-decode": UrlEncodeDecode,
  "text-binary-hex": TextBinaryHex,
  "length-converter": LengthConverter,
  "weight-converter": WeightConverter,
  "random-team-generator": RandomTeamGenerator,
  "add-line-numbers": AddLineNumbers,
  "sort-text-lines": SortTextLines,
  "css-beautifier": CssBeautifier,

  "word-to-pdf": WordToPdf,
  "pdf-to-word": PdfToWord,
  "merge-pdf": MergePdf,
  "protect-pdf": ProtectPdf,
  "compress-pdf": CompressPdf,
  "edit-pdf-text": EditPdfText,
  "resize-pdf-images": ResizePdfImages,
  "image-to-pdf": ImageToPdf,
  "excel-to-pdf": ExcelToPdf,
  "ppt-to-pdf": PptToPdf,

  "merge-word": MergeWord,
  "crop-jpg": CropJpg,
};

export default function ToolRenderer({ slug }) {
  const Component = componentMap[slug];

  if (!Component) {
    const tool = getToolBySlug(slug);
    return <GenericToolRenderer tool={tool} />;
  }

  return <Component />;
}
