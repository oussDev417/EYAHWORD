import { validatePreset, isValidPreset } from "../src/presets/validation";
import { academicPreset } from "../src/presets/defaults";
import { FormattingPreset } from "../src/presets/types";

describe("validatePreset", () => {
  it("returns no errors for a valid preset", () => {
    const errors = validatePreset(academicPreset);
    expect(errors).toHaveLength(0);
  });

  it("returns error for empty name", () => {
    const preset = { ...academicPreset, name: "" };
    const errors = validatePreset(preset);
    expect(errors.some((e) => e.field === "name")).toBe(true);
  });

  it("returns error for name too long", () => {
    const preset = { ...academicPreset, name: "a".repeat(51) };
    const errors = validatePreset(preset);
    expect(errors.some((e) => e.field === "name")).toBe(true);
  });

  it("returns error for invalid font size", () => {
    const preset = {
      ...academicPreset,
      body: { ...academicPreset.body, size: 100 },
    };
    const errors = validatePreset(preset);
    expect(errors.some((e) => e.field === "body.size")).toBe(true);
  });

  it("returns error for invalid line spacing", () => {
    const preset = {
      ...academicPreset,
      paragraph: { ...academicPreset.paragraph, lineSpacing: 10 },
    };
    const errors = validatePreset(preset);
    expect(errors.some((e) => e.field === "paragraph.lineSpacing")).toBe(true);
  });
});

describe("isValidPreset", () => {
  it("returns true for a valid preset", () => {
    expect(isValidPreset(academicPreset)).toBe(true);
  });

  it("returns false for preset missing id", () => {
    const { id, ...rest } = academicPreset;
    expect(isValidPreset(rest as any)).toBe(false);
  });
});
