import { RecipeDifficultylevelEnum } from '../enums/recipe-enums';

export const getColorDifficultyLevel = (level: string): string => {
	return RecipeDifficultylevelEnum.BEGINNER === level
		? '#00e676'
		: RecipeDifficultylevelEnum.MIDDLE == level
		? '#0039cb'
		: RecipeDifficultylevelEnum.PROFESSIONAL === level
		? '#ff616f'
		: '';
};
