/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const withTM = require('next-transpile-modules')([
  "@awesome-cordova-plugins/geolocation",
]); // pass the modules you would like to see transpiled

module.exports = withTM(nextConfig)
