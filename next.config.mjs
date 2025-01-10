// next.config.mjs

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	distDir: 'out',
  
	images: {
	  domains: ['api.telegram.org'],
	},
  
	webpack(config) {
	  config.module.rules.push({
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	  });
	  return config;
	},
  };
  
  export default nextConfig;
  