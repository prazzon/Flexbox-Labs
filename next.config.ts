import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   webpack(config) {
      config.module.rules.push({
         test: /\.svg$/,
         use: ["@svgr/webpack"],
      });
      return config;
   },
   turbopack: {
      rules: {
         "*.svg": {
            loaders: ["@svgr/webpack"],
            as: "*.js",
         },
      },
   },
   output: "export", // Outputs a Single-Page Application (SPA).
   distDir: "./dist", // Changes the build output directory to `./dist/`.
};

export default nextConfig;
