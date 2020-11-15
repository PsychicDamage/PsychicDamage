import ts from "@rollup/plugin-typescript"
import { terser } from "rollup-plugin-terser"

export default [
  {
    input: "./source/client.ts",
    output: {
      file: "./offline/bundle.js",
      format: "esm",
      sourcemap: true,
    },
    plugins: [ts(), terser()],
  },
]
