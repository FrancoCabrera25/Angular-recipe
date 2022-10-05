export interface IRecipe {
	id: string;
	title: string;
	preparation: string;
	ingredients: Array<string>;
	reviews: number;
	cookedBefore: boolean;
	difficultyLevel: string;
	creationDate: Date;
}
