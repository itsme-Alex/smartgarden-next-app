const API_URL = process.env.API_URL;
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["openweathermap.org", "localhost"],
  },
};

module.exports = nextConfig;
