(function() {

	let backgroundColor = '#140f2d';

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
		'Abril Fatface',
		'Annie Use Your Telescope',
		'Anton',
		'Bahiana',
		'Baloo Bhaijaan',
		'Barrio',
		'Finger Paint',
		'Fredericka the Great',
		'Gloria Hallelujah',
		'Indie Flower',
		'Life Savers',
		'Londrina Sketch',
		'Love Ya Like A Sister',
		'Merienda',
		'Nothing You Could Do',
		'Pacifico',
		'Quicksand',
		'Righteous',
		'Sacramento',
		'Shadows Into Light',
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

	let minFontSize = 1;
	let maxFontSize = 8;
	let genFontSize = function() {
		return chance.floating({min: minFontSize, max: maxFontSize});
	};

	let minDistance = 64;
	let maxDistance = 256;
	let genItemPosition = function() {
		return ((new THREE.Vector3(
			chance.floating({min: -1, max: +1}),
			chance.floating({min: -1, max: +1}),
			chance.floating({min: -1, max: +1}),
		))
			.normalize()
			.multiplyScalar(chance.floating({min: minDistance, max: maxDistance}))
			.toArray()
		);
	};

	let itemsCount = 128;
	let genItems = function() {
		return Array.from({length: itemsCount}, () => {
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
		el: '#app',
		vuetify: new Vuetify(),
		data() {
			return {
				drawer: true,
				items: genItems(),
			};
		},
		methods: {
			randomizeFontFamily() {
				this.items.forEach(item => {
					item.fontFamily = genFontFamily();
				});
			},
			randomizeFontSize() {
				this.items.forEach(item => {
					item.fontSize = genFontSize();
				});
			},
			randomizeText() {
				this.items.forEach(item => {
					item.text = genText();
				});
			},
		},
		components: {
			myScene: {
				props: ['items'],
				render(h) {
					let {items} = this;
					return h(
						'a-scene',
						{
							attrs: {
								'background': AFRAME.utils.styleParser.stringify({
									color: backgroundColor,
								}),
								'embedded': '',
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
											initialPosition: (([x, y, z]) => AFRAME.utils.coordinates.stringify({x, y, z}))([0, 0, maxDistance * 2]),
											maxDistance: maxDistance * 4,
											minDistance: minDistance / 4,
											panSpeed: 1,
											rotateSpeed: 1/6,
											zoomSpeed: 1,
										}),
										'look-controls': AFRAME.utils.styleParser.stringify({
											enabled: false,
										}),
									},
									key: 'pkztceqjwmzw',
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
										key: JSON.stringify(['pjuqezmebnjt', i]),
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
