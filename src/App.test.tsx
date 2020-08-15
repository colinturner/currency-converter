import React from "react";
import App, { sanitizeInput } from "./App";

describe("App", () => {
  describe("sanitizeInput", () => {
    const input = "123456.67";
    const expected_result = "123,456.67";

    expect(sanitizeInput(input)).toBe(expected_result);

    const input_2 = "1234";
    const expected_result_2 = "1,234";
    expect(sanitizeInput(input_2)).toBe(expected_result_2);
  });
});
