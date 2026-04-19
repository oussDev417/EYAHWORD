import { cmToPoints, pointsToCm } from "../src/utils/units";

describe("cmToPoints", () => {
  it("converts 2.5cm correctly", () => {
    const result = cmToPoints(2.5);
    expect(result).toBeCloseTo(70.87, 1);
  });

  it("converts 1cm correctly", () => {
    const result = cmToPoints(1);
    expect(result).toBeCloseTo(28.35, 1);
  });

  it("converts 0cm to 0", () => {
    expect(cmToPoints(0)).toBe(0);
  });
});

describe("pointsToCm", () => {
  it("converts 72 points correctly", () => {
    const result = pointsToCm(72);
    expect(result).toBeCloseTo(2.54, 1);
  });

  it("roundtrip conversion is consistent", () => {
    const original = 2.5;
    const points = cmToPoints(original);
    const back = pointsToCm(points);
    expect(back).toBeCloseTo(original, 1);
  });
});
