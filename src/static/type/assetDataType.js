export type NoneAnimationAssetType = {
	IS_CONTAIN_ANIMATION: boolean,
	DATA: {
		NAME: string,
		PATH: string,
	},
};

export type AnimationAssetType = {
	IS_CONTAIN_ANIMATION: boolean,
	DATA: {
		[any]: {
			NAME: string,
			SPEED: number,
			PATH: string,
		},
	},
};