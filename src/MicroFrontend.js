import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const MicroFrontend = ({ name, host, history }) => {
	const scriptId = `micro-frontend-script-${name}`;

	useEffect(() => {
		const renderMicroFrontend = () => {
			if (!window[`render${name}`]) return;
			window[`render${name}`](`${name}-container`, history);
		};

		if (document.getElementById(scriptId)) {
			renderMicroFrontend();
			return;
		}

		fetch(`${host}/asset-manifest.json`)
			.then(res => res.json())
			.then(({ files }) => {
				const script = document.createElement('script');
				script.id = scriptId;
				script.crossOrigin = 'anonymous';
				script.src = `${host}${files['main.js']}`;
				script.onload = renderMicroFrontend;
				document.body.appendChild(script);
			}
		);

		return () => window[`unmount${name}`](`${name}-container`);
	}, [host, name, history]);

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