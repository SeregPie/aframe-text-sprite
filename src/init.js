import TextSprite from './TextSprite';

import name from './name';

export default function() {
	let {
		data,
		el,
	} = this;
	let {
		alignment,
		backgroundColor,
		color,
		fontFamily,
		fontSize,
		fontStyle,
		fontVariant,
		fontWeight,
		lineGap,
		padding,
		strokeColor,
		strokeWidth,
		text,
	} = data;
	let object = new TextSprite({
		alignment,
		backgroundColor,
		color,
		fontFamily,
		fontSize,
		fontStyle,
		fontVariant,
		fontWeight,
		lineGap,
		padding,
		strokeColor,
		strokeWidth,
		text,
	});
	{
		let s = object.raycast;
		object.raycast = ((raycaster, ...args) => {
			raycaster.camera ??= el.sceneEl.camera;
			return s.call(object, raycaster, ...args);
		});
	}
	el.setObject3D(name, object);
}
