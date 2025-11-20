/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  // for GitHub Pages under https://juned456.github.io/signup
  basePath: "/signup",
  assetPrefix: "/signup/",

  // GitHub Pages = static export
  output: "export",
  images: {
    unoptimized: true,
  },
};
