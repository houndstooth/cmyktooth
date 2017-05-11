const SQRT = Math.sqrt(2)

const ORIENTATION_TO_ORIENTATION_WITHOUT_DIRECTIONALITY_MAPPING = {
	'RIGHT': 'HORIZONTAL',
	'BOTTOM_RIGHT': 'PRINCIPAL_DIAGONAL',
	'BOTTOM': 'VERTICAL',
	'BOTTOM_LEFT': 'MINOR_DIAGONAL',
	'LEFT': 'HORIZONTAL',
	'TOP_LEFT': 'PRINCIPAL_DIAGONAL',
	'TOP': 'VERTICAL',
	'TOP_RIGHT': 'MINOR_DIAGONAL'
}

const ORIENTATION_OF_STRIPES_TO_GRID_DIAGONALITY_MAPPING = {
	'RIGHT': true,
	'BOTTOM_RIGHT': false,
	'BOTTOM': true,
	'BOTTOM_LEFT': false,
	'LEFT': true,
	'TOP_LEFT': false,
	'TOP': true,
	'TOP_RIGHT': false
}

export {
	SQRT,
	ORIENTATION_TO_ORIENTATION_WITHOUT_DIRECTIONALITY_MAPPING,
	ORIENTATION_OF_STRIPES_TO_GRID_DIAGONALITY_MAPPING
}