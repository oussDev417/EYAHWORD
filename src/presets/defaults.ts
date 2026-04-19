import { FormattingPreset } from "./types";
import { cmToPoints } from "../utils/units";

export const academicPreset: FormattingPreset = {
  id: "academic",
  name: "Académique",
  description: "Times New Roman 12pt, interligne 1.5, marges 2.5cm — idéal pour les travaux universitaires.",
  isBuiltIn: true,
  body: {
    name: "Times New Roman",
    size: 12,
    color: "#000000",
    bold: false,
    italic: false,
  },
  paragraph: {
    alignment: "justified",
    lineSpacing: 1.5,
    spaceBefore: 0,
    spaceAfter: 8,
    firstLineIndent: cmToPoints(1.25),
  },
  headings: {
    h1: {
      fontName: "Times New Roman",
      fontSize: 16,
      bold: true,
      color: "#000000",
      spaceBefore: 24,
      spaceAfter: 12,
      alignment: "center",
    },
    h2: {
      fontName: "Times New Roman",
      fontSize: 14,
      bold: true,
      color: "#000000",
      spaceBefore: 18,
      spaceAfter: 8,
      alignment: "left",
    },
    h3: {
      fontName: "Times New Roman",
      fontSize: 12,
      bold: true,
      color: "#000000",
      spaceBefore: 12,
      spaceAfter: 6,
      alignment: "left",
    },
  },
  page: {
    topMargin: cmToPoints(2.5),
    bottomMargin: cmToPoints(2.5),
    leftMargin: cmToPoints(2.5),
    rightMargin: cmToPoints(2.5),
  },
};

export const modernPreset: FormattingPreset = {
  id: "modern",
  name: "Moderne",
  description: "Calibri 11pt, interligne 1.15, marges 2cm, titres colorés — style professionnel contemporain.",
  isBuiltIn: true,
  body: {
    name: "Calibri",
    size: 11,
    color: "#333333",
    bold: false,
    italic: false,
  },
  paragraph: {
    alignment: "left",
    lineSpacing: 1.15,
    spaceBefore: 0,
    spaceAfter: 10,
    firstLineIndent: 0,
  },
  headings: {
    h1: {
      fontName: "Calibri Light",
      fontSize: 20,
      bold: false,
      color: "#2B579A",
      spaceBefore: 24,
      spaceAfter: 12,
      alignment: "left",
    },
    h2: {
      fontName: "Calibri",
      fontSize: 16,
      bold: true,
      color: "#2B579A",
      spaceBefore: 18,
      spaceAfter: 8,
      alignment: "left",
    },
    h3: {
      fontName: "Calibri",
      fontSize: 13,
      bold: true,
      color: "#1B3A65",
      spaceBefore: 12,
      spaceAfter: 6,
      alignment: "left",
    },
  },
  page: {
    topMargin: cmToPoints(2),
    bottomMargin: cmToPoints(2),
    leftMargin: cmToPoints(2),
    rightMargin: cmToPoints(2),
  },
};

export const builtInPresets: FormattingPreset[] = [academicPreset, modernPreset];
