(function() {

	Vue.config.ignoredElements = [/^a-/];

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
	let genColor = function() {
		return chance.pickone(colorValues);
	};

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
	let genFontFamily = function() {
		return chance.pickone(fontFamilyValues);
	};

	let genText = function() {
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
	};

	let genFontSize = function() {
		return chance.floating({min: 1/8, max: 1/2});
	};

	let genItemPosition = function() {
		return ((new THREE.Vector3(
			chance.floating({min: -1, max: +1}),
			chance.floating({min: -1, max: +1}),
			chance.floating({min: -1, max: +1}),
		))
			.normalize()
			.multiplyScalar(chance.floating({min: 8, max: 16}))
			.toArray()
		);
	};

	let genItems = function() {
		return Array.from({length: 128}, () => {
			return {
				color: genColor(),
				fontFamily: genFontFamily(),
				fontSize: genFontSize(),
				position: genItemPosition(),
				text: genText(),
			};
		});
	};

	new Vue({
		el: '#App',
		vuetify: new Vuetify(),
		data() {
			return {
				items: genItems(),
				sceneColor: '#140f2d',
			};
		},
		methods: {
			randomize() {
				this.items.forEach(item => {
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
			myScene: {
				props: [
					'items',
					'sceneColor',
				],
				render(h) {
					let {
						items,
						sceneColor,
					} = this;
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
											initialPosition: (([x, y, z]) => AFRAME.utils.coordinates.stringify({x, y, z}))([0, 0, 32]),
											maxDistance: 128,
											minDistance: 2,
											panSpeed: 1,
											rotateSpeed: 1/6,
											zoomSpeed: 1/2,
										}),
										'look-controls': AFRAME.utils.styleParser.stringify({
											enabled: false,
										}),
									},
									key: JSON.stringify(0),
								},
							),
							...items.map((item, i) => {
								return h(
									'a-entity',
									{
										attrs: {
											'position': (([x, y, z]) => AFRAME.utils.coordinates.stringify({x, y, z}))(item.position),
											'text-sprite': AFRAME.utils.styleParser.stringify({
												color: item.color,
												fontFamily: item.fontFamily,
												fontSize: item.fontSize,
												text: item.text,
											}),
										},
										key: JSON.stringify([1, i]),
									},
								);
							}),
						],
					);
				},
			},
		},
	});

})();
