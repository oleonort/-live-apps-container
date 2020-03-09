module.exports = (config, env) => {
	config.externals = {
		axios: 'axios',
		'react-router-dom': 'ReactRouterDOM',
		react: 'React',
		'react-dom': 'ReactDOM'
	};

	return config;
};