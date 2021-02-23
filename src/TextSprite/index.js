import {
	Sprite,
	SpriteMaterial,
} from 'three';
import TextTexture from '../TextTexture';

let Class = class extends Sprite {
	constructor(
		{
			fontSize = 1,
			...options
		} = {},
		material = new SpriteMaterial({
			depthWrite: false,
		}),
	) {
		super(material);
		let texture = new TextTexture({
			fontSize,
			...options,
		});
		material.map = texture;
		let lastOptimization = 0;
		Object.assign(this, {
			onBeforeRender(renderer, scene, camera) {
				if (texture.checkFontFace()) {
					let {scale} = this;
					let {
						height,
						width,
					} = texture;
					if (width && height) {
						scale.setX(width).setY(height);
						{
							let now = Date.now();
							if (texture.needsRedraw || (now - lastOptimization) > 1000) {
								texture.setOptimalPixelRatio(this, renderer, camera);
								lastOptimization = now;
							}
						}
						texture.redraw();
					} else {
						scale.setScalar(1);
					}
				} else {
					texture.loadFontFace();
				}
			},

			dispose() {
				texture.dispose();
				material.dispose();
			},
		});
	}
};

[
	'alignment',
	'backgroundColor',
	'color',
	'fontFamily',
	'fontSize',
	'fontStyle',
	'fontVariant',
	'fontWeight',
	'lineGap',
	'padding',
	'strokeColor',
	'strokeWidth',
	'text',
].forEach(key => {
	Object.defineProperty(Class.prototype, key, {
		get() {
			return this.material.map[key];
		},
		set(value) {
			this.material.map[key] = value;
		},
	});
});

Class.prototype.isTextSprite = true;

export default Class;
