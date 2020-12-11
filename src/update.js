import name from './name';

export default function(oldData) {
	let {
		data,
		el,
	} = this;
	let {
		alignment,
		backgroundColor,
		color,
		fog,
		fontFamily,
		fontSize,
		fontStyle,
		fontVariant,
		fontWeight,
		lineGap,
		opacity,
		padding,
		strokeColor,
		strokeWidth,
		text,
		transparent,
	} = data;
	let object = el.getObject3D(name);
	if (object) {
		if (Object.keys(oldData).length) {
			Object.assign(object, {
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
		}
		let {material} = object;
		Object.assign(material, {
			fog,
			opacity,
			transparent,
		});
	}
}
