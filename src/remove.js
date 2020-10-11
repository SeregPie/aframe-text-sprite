import name from './name';

export default function() {
	let {el} = this;
	let object = el.getObject3D(name);
	object.dispose();
	el.removeObject3D(name);
}
