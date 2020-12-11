import AFRAME from 'aframe';

import init from './init';
import name from './name';
import remove from './remove';
import schema from './schema';
import update from './update';

AFRAME.registerComponent(name, {
	init,
	remove,
	schema,
	update,
});
