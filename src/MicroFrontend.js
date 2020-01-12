import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const MicroFrontend = ({ name, host, history }) => {
	const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.substring(1);
	
	useEffect(() => {
		const mainScriptId = `micro-frontend-main-script-${name}`;

		const renderMicroFrontend = () => {
			if (!window[`render${capitalizeFirstLetter(name)}`]) return;
			window[`render${capitalizeFirstLetter(name)}`](`${name}-container`, history);
		};

		const createScript = (scriptName, isMainScript) => {
			const script = document.createElement('script');
			script.id = isMainScript ? mainScriptId : `micro-frontend-script-${scriptName}-${name}`;
			script.crossOrigin = 'anonymous';
			script.src = `${host}/${scriptName}`;
			script.onload = renderMicroFrontend;
			document.head.appendChild(script);
		};

		if (document.getElementById(mainScriptId)) {
			renderMicroFrontend();
			return;
		}

		fetch(`${host}/asset-manifest.json`)
			.then(res => res.json())
			.then(({ entrypoints, files }) => {
				entrypoints.filter(filePath => filePath.includes('static/js')).forEach(scriptName => {
					const isMainScript = `/${scriptName}` === files['main.js'];
					createScript(scriptName, isMainScript);
				});
			}
		);

		return () => window[`unmount${capitalizeFirstLetter(name)}`](`${name}-container`);
	}, [host, name]);

	return (
		<div id={`${name}-container`}/>
	)
};

MicroFrontend.propTypes = {
	name: PropTypes.string.isRequired,
	history: PropTypes.object.isRequired, // TODO: make this more precise
	host: PropTypes.string.isRequired
};

export default MicroFrontend;