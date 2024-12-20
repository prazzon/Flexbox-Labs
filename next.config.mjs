/** @type {import('next').NextConfig} */
const nextConfig = {
   output: "export", // Outputs a Single-Page Application (SPA).
   distDir: "./dist", // Changes the build output directory to `./dist/`.
   webpack(config) {
      config.module.rules.push({
         test: /\.svg$/,
         use: ["@svgr/webpack"],
      });

      return config;
   },
};

export default nextConfig;
