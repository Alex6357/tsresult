import { createDefaultEsmPreset } from "ts-jest";
import type { Config } from "jest";

const presetConfig = createDefaultEsmPreset();

export default {
  ...presetConfig,
  testEnvironment: "node",
} satisfies Config;
