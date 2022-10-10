import { IRecipe } from '../interface/recipe.interface';

export const MOCK_RECIPE: IRecipe = {
	cookedBefore: true,
	creationDate: new Date(),
	difficultyLevel: 'Intermedio',
	id: '409b9596-c4a9-4532-aa00-a998ff067b3c',
	ingredients: ['adasdas', 'asdasdas'],
	preparation: 'sdasdsadasdasdasdasdas',
	reviews: 2,
	title: 'receta nueva'
};
export const MOCK_RECIPE_LIST: IRecipe[] = [
	{
		cookedBefore: true,
		creationDate: new Date(),
		difficultyLevel: 'Intermedio',
		id: '409b9596-c4a9-4532-aa00-a998ff067b3c',
		ingredients: ['adasdas', 'asdasdas'],
		preparation: 'sdasdsadasdasdasdasdas',
		reviews: 2,
		title: 'receta nueva'
	},
	{
		cookedBefore: true,
		creationDate: new Date(),
		difficultyLevel: 'Intermedio',
		id: '409b9596-c4a9-4532-aa00-a998ff067b3c',
		ingredients: ['adasdas', 'asdasdas'],
		preparation: 'sdasdsadasdasdasdasdas',
		reviews: 2,
		title: 'receta nueva'
	},
	{
		cookedBefore: true,
		creationDate: new Date(),
		difficultyLevel: 'Intermedio',
		id: '409b9596-c4a9-4532-aa00-a998ff067b3c',
		ingredients: ['adasdas', 'asdasdas'],
		preparation: 'sdasdsadasdasdasdasdas',
		reviews: 2,
		title: 'receta nueva'
	}
];
