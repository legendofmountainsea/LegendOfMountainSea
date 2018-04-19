export const TERRAIN_ID = 0;
export const FOREST_ID = 1;
export const HILL_ID = 2;

export default {
	TERRAIN: {
		IS_CONTAIN_ANIMATION: false,
		DATA: {
			NAME: 'terrain',
			PATH: './assets/hexagon.png',
		},
	},
	FOREST: {
		IS_CONTAIN_ANIMATION: false,
		DATA: {
			NAME: 'forest',
			PATH: './assets/terrains/forest.png',
		},
	},
	HILL: {
		IS_CONTAIN_ANIMATION: false,
		DATA: {
			NAME: 'hill',
			PATH: './assets/terrains/hills.png',
		},
	},
};