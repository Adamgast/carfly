import svgSprite from "gulp-svg-sprite";
export const sprite = () => {
	return app.gulp.src(`${app.path.src.svgicons}`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SVG",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: '../img/icons/icons.svg',
					//example: true
				}
			},
			shape: {
				id: {
					separator: '',
					generator: 'svg-'
				},
				transform: [
					{
						svgo: {
							plugins: [
								{
									name: 'preset-default',
									params: {
										overrides: {
											removeViewBox: false,
										},
										overrides: {
											removeXMLNS: true,
										},
										overrides: {
											convertPathData: false,
										},
									}
								},
								{
									name: 'removeAttrs',
									params: {
										 attrs: '(fill|stroke)'
									}
							  },
							]
						}
					}
				]
			},
			svg: {
				rootAttributes: {
					style: 'display: none;',
					'aria-hidden': true
				},
				xmlDeclaration: false
			}
		}))
		.pipe(app.gulp.dest(`${app.path.srcFolder}`));
}