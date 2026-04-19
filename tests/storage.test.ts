import {
  loadCustomPresets,
  saveCustomPresets,
  addCustomPreset,
  updateCustomPreset,
  deleteCustomPreset,
  duplicateCustomPreset,
} from "../src/presets/storage";
import { academicPreset } from "../src/presets/defaults";
import { FormattingPreset } from "../src/presets/types";

// Mock localStorage
const store: Record<string, string> = {};
const localStorageMock = {
  getItem: jest.fn((key: string) => store[key] ?? null),
  setItem: jest.fn((key: string, value: string) => { store[key] = value; }),
  removeItem: jest.fn((key: string) => { delete store[key]; }),
  clear: jest.fn(() => { Object.keys(store).forEach((k) => delete store[k]); }),
  length: 0,
  key: jest.fn(),
};
Object.defineProperty(global, "localStorage", { value: localStorageMock });

beforeEach(() => {
  localStorageMock.clear();
  jest.clearAllMocks();
});

const testPreset: FormattingPreset = {
  ...academicPreset,
  id: "test_1",
  name: "Test Preset",
  isBuiltIn: false,
};

describe("storage", () => {
  it("loadCustomPresets returns empty array when nothing stored", () => {
    expect(loadCustomPresets()).toEqual([]);
  });

  it("addCustomPreset adds a preset and returns updated list", () => {
    const result = addCustomPreset({ ...testPreset });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("test_1");
  });

  it("updateCustomPreset updates an existing preset", () => {
    addCustomPreset({ ...testPreset });
    const updated = updateCustomPreset({ ...testPreset, name: "Updated" });
    expect(updated[0].name).toBe("Updated");
  });

  it("deleteCustomPreset removes a preset", () => {
    addCustomPreset({ ...testPreset });
    const result = deleteCustomPreset("test_1");
    expect(result).toHaveLength(0);
  });

  it("duplicateCustomPreset creates a copy", () => {
    addCustomPreset({ ...testPreset });
    const result = duplicateCustomPreset("test_1");
    expect(result).toHaveLength(2);
    expect(result[1].name).toContain("(copie)");
    expect(result[1].id).not.toBe("test_1");
  });

  it("updateCustomPreset throws for unknown id", () => {
    expect(() => updateCustomPreset({ ...testPreset, id: "unknown" })).toThrow();
  });
});
