import { getHeadingLevel, isHeading } from "../src/engine/headingFormatter";

describe("headingFormatter", () => {
  describe("getHeadingLevel", () => {
    it("returns h1 for Heading1", () => {
      expect(getHeadingLevel("Heading1")).toBe("h1");
    });

    it("returns h2 for Heading2", () => {
      expect(getHeadingLevel("Heading2")).toBe("h2");
    });

    it("returns h3 for Heading3", () => {
      expect(getHeadingLevel("Heading3")).toBe("h3");
    });

    it("returns null for Normal", () => {
      expect(getHeadingLevel("Normal")).toBeNull();
    });

    it("returns null for arbitrary styles", () => {
      expect(getHeadingLevel("ListBullet")).toBeNull();
    });
  });

  describe("isHeading", () => {
    it("returns true for Heading1-3", () => {
      expect(isHeading("Heading1")).toBe(true);
      expect(isHeading("Heading2")).toBe(true);
      expect(isHeading("Heading3")).toBe(true);
    });

    it("returns false for Normal", () => {
      expect(isHeading("Normal")).toBe(false);
    });
  });
});
