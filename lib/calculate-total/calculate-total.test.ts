import { describe, expect, it } from "vitest";
import { calculateTotal } from "./calculate-total";

describe("calculateTotal", () => {
  it("should handle empty input", () => {
    const result = calculateTotal("");
    expect(result.total).toBe(0);
    expect(result.count).toBe(0);
  });

  it("should handle single valid number", () => {
    const result = calculateTotal("100");
    expect(result.total).toBe(100);
    expect(result.count).toBe(1);
  });

  it("should handle multiple valid numbers with commas", () => {
    const result = calculateTotal("100,200,300");
    expect(result.total).toBe(600);
    expect(result.count).toBe(3);
  });

  it("should handle multiple valid numbers with new lines", () => {
    const result = calculateTotal("100\n200\n300");
    expect(result.total).toBe(600);
    expect(result.count).toBe(3);
  });

  it("should handle mixed delimiters (commas and new lines)", () => {
    const result = calculateTotal("100,200\n300\n400,500");
    expect(result.total).toBe(1500);
    expect(result.count).toBe(5);
  });

  it("should ignore empty entries", () => {
    const result = calculateTotal("100,,200,\n\n300");
    expect(result.total).toBe(600);
    expect(result.count).toBe(3);
  });

  it("should handle trailing commas/newlines", () => {
    const result = calculateTotal("100,200,\n");
    expect(result.total).toBe(300);
    expect(result.count).toBe(2);
  });

  it("should filter out non-numeric values", () => {
    const result = calculateTotal("100, invalid, 200, NaN, 300, text");
    expect(result.total).toBe(600);
    expect(result.count).toBe(3);
  });

  it("should handle decimal numbers", () => {
    const result = calculateTotal("100.5, 200.25, 300.75");
    expect(result.total).toBe(601.5);
    expect(result.count).toBe(3);
  });

  it("should handle negative numbers", () => {
    const result = calculateTotal("100, -50, 200, -25");
    expect(result.total).toBe(375);
    expect(result.count).toBe(4);
  });

  it("should handle large numbers", () => {
    const result = calculateTotal("1000000000000000000\n2000000000000000000");
    expect(result.total).toBe(3000000000000000000);
    expect(result.count).toBe(2);
  });

  it("should handle whitespace around numbers", () => {
    const result = calculateTotal("  100  ,  200  ,  300  ");
    expect(result.total).toBe(600);
    expect(result.count).toBe(3);
  });

  it("should handle complex mixed input", () => {
    const result = calculateTotal(`
      100,
      invalid entry,
      200,
      ,,
      300.5,
      -150,
      0,
      not a number,
      400,
      true
    `);
    expect(result.total).toBe(1150.5);
    expect(result.count).toBe(6);
  });
});
