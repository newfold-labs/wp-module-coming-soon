const path = require( 'path' );
const { merge } = require( 'webpack-merge' );
const wpScriptsConfig = require( '@wordpress/scripts/config/webpack.config' );

const apps = [ 'sitePreviewPortal', 'prePublishWarning' ];

module.exports = apps.map( ( app ) =>
	merge( wpScriptsConfig, {
		entry: {
			[ app ]: path.resolve( __dirname, `./src/${ app }/index.js` ),
		},
		output: {
			path: path.resolve( __dirname, `./build/${ app }` ),
			filename: 'bundle.js',
			library: [ 'newfold', 'ComingSoon', '[name]' ],
			libraryTarget: 'window',
		},
	} )
);
