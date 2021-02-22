(function() {

	Vue.config.ignoredElements = [/^a-/];

	let d = 1;
	let itemsCount = 128;
	let sceneColor = '#140f2d';
	let colorValues = [
		'#e574bc',
		'#ea84c9',
		'#ef94d5',
		'#f9b4ed',
		'#eabaf6',
		'#dabfff',
		'#c4c7ff',
		'#adcfff',
		'#96d7ff',
		'#7fdeff',
	];
	let fontFamilyValues = [
		'Arizonia',
		'Berkshire Swash',
		'Cookie',
		'Great Vibes',
		'Just Another Hand',
		'Leckerli One',
		'Lobster Two',
		'Merienda One',
		'Oleo Script',
		'Pacifico',
	];

	function genColor() {
		return chance.pickone(colorValues);
	}

	function genFontFamily() {
		return chance.pickone(fontFamilyValues);
	}

	function genText() {
		return (Array
			.from({length: chance.weighted([1, 2, 3], [2, 3, 1])})
			.map(() => {
				return (Array
					.from({length: chance.weighted([1, 2, 3], [2, 3, 1])})
					.map(() => chance.word())
					.join(' ')
				);
			})
			.join('\n')
		);
	}

	function genFontSize() {
		return chance.floating({min: d / 128, max: d / 32});
	}

	function genItemPosition() {
		return ((new THREE.Vector3(
			chance.floating({min: -1, max: +1}),
			chance.floating({min: -1, max: +1}),
			chance.floating({min: -1, max: +1}),
		))
			.normalize()
			.multiplyScalar(chance.floating({min: d / 2, max: d}))
			.toArray()
		);
	}

	function genItems() {
		return Array.from({length: itemsCount}, () => {
			return {
				color: genColor(),
				fontFamily: genFontFamily(),
				fontSize: genFontSize(),
				position: genItemPosition(),
				text: genText(),
			};
		});
	}

	new Vue({
		el: '#App',
		vuetify: new Vuetify(),
		data() {
			return {
				items: genItems(),
			};
		},
		methods: {
			randomize() {
				let {items} = this;
				items.forEach(item => {
					Object.assign(item, {
						color: genColor(),
						fontFamily: genFontFamily(),
						fontSize: genFontSize(),
						position: genItemPosition(),
						text: genText(),
					});
				});
			},
		},
		components: {
			MyScene: {
				props: [
					'items',
				],
				render(h) {
					let {items} = this;
					return h(
						'a-scene',
						{
							attrs: {
								'background': AFRAME.utils.styleParser.stringify({
									color: sceneColor,
								}),
								'embedded': true,
								'vr-mode-ui': AFRAME.utils.styleParser.stringify({
									enabled: false,
								}),
							},
						},
						[
							h(
								'a-entity',
								{
									attrs: {
										'camera': AFRAME.utils.styleParser.stringify({
											fov: 60,
										}),
										'orbit-controls': AFRAME.utils.styleParser.stringify({
											dampingFactor: 1/16,
											enableKeys: false,
											initialPosition: (([x, y, z]) => AFRAME.utils.coordinates.stringify({x, y, z}))([0, 0, d * 2]),
											maxDistance: d * 8,
											minDistance: d / 8,
											panSpeed: 1,
											rotateSpeed: 1/6,
											zoomSpeed: 1/2,
										}),
										'look-controls': AFRAME.utils.styleParser.stringify({
											enabled: false,
										}),
									},
								},
							),
							h(
								'a-entity',
								items.map(({
									color,
									fontFamily,
									fontSize,
									position,
									text,
								}, i) => {
									return h(
										'a-entity',
										{
											attrs: {
												'position': (([x, y, z]) => AFRAME.utils.coordinates.stringify({x, y, z}))(position),
												'text-sprite': AFRAME.utils.styleParser.stringify({
													color,
													fontFamily,
													fontSize,
													text,
												}),
											},
											key: i,
										},
									);
								}),
							),
						],
					);
				},
			},
		},
	});

})();
