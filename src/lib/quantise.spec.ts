import { it, expect } from "@jest/globals";
import { results } from "@/app/search/_components/example-results.json";

import { quantise } from "./quantise";

it("throws on failure", () => {
  expect(() => quantise([] as { height: number }[], 0)).toThrow(/greater/);
});

it("handles n = 1", () => {
  expect(quantise([{ height: 1 }, { height: 2 }, { height: 3 }], 1)).toEqual([
    [{ height: 1 }, { height: 2 }, { height: 3 }],
  ]);
});

it("handles n = 2", () => {
  expect(quantise([{ height: 1 }, { height: 2 }, { height: 3 }], 2)).toEqual([
    [{ height: 1 }, { height: 3 }],
    [{ height: 2 }],
  ]);
});

it("handles n = 3", () => {
  expect(quantise([{ height: 1 }, { height: 2 }, { height: 3 }], 3)).toEqual([
    [{ height: 1 }],
    [{ height: 2 }],
    [{ height: 3 }],
  ]);
});

it("handles n = 4", () => {
  expect(quantise([{ height: 1 }, { height: 2 }, { height: 3 }], 4)).toEqual([
    [{ height: 1 }],
    [{ height: 2 }],
    [{ height: 3 }],
    [],
  ]);
});

it("handles add lots", () => {
  expect(
    quantise(
      [
        { height: 1 },
        { height: 2 },
        { height: 5 },
        { height: 4 },
        { height: 2 },
        { height: 3 },
      ],
      3,
    ),
  ).toEqual([
    [{ height: 1 }, { height: 4 }],
    [{ height: 2 }, { height: 2 }, { height: 3 }],
    [{ height: 5 }],
  ]);
});

it("handles json example", () => {
  expect(quantise(results, 4)).toEqual([
    [
      expect.objectContaining({ id: "tGYrlchfObE" }),
      expect.objectContaining({ id: "tV-RX0beDp8" }),
    ],
    expect.arrayContaining([expect.objectContaining({ id: "MkstoewsiPY" })]),
    expect.arrayContaining([expect.objectContaining({ id: "alBjc0Tan04" })]),
    expect.arrayContaining([expect.objectContaining({ id: "oXV3bzR7jxI" })]),
  ]);
});
