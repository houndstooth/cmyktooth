import layer from '../components/layer'
import iterator from '../../shared/utilities/iterator'
import calculateSquareSize from '../utilities/calculateSquareSize'
import { END_ITERATION } from '../../shared/common/customize'
import { ORIENTATION_OF_STRIPES_TO_GRID_DIAGONALITY_MAPPING } from '../common/constants'

let orientation = 'TOP_RIGHT'
let howManySquaresFitInTheWindowWhenUnitIsOne = 1

const ORIENTATION_OF_STRIPES_CYCLE = {
	'RIGHT': 'BOTTOM_RIGHT',
	'BOTTOM_RIGHT': 'BOTTOM',
	'BOTTOM': 'BOTTOM_LEFT',
	'BOTTOM_LEFT': 'LEFT',
	'LEFT': 'TOP_LEFT',
	'TOP_LEFT': 'TOP',
	'TOP': 'TOP_RIGHT',
	'TOP_RIGHT': 'RIGHT'
}

export default () => {
	iterator(END_ITERATION).forEach(iteration => {
		const isGridDiagonal = ORIENTATION_OF_STRIPES_TO_GRID_DIAGONALITY_MAPPING[ orientation ]
		const squareSize = calculateSquareSize({ howManySquaresFitInTheWindowWhenUnitIsOne, isGridDiagonal })

		layer({ orientation, squareSize, iteration })

		//so, we have hereby decided that each diagonal layer is paired with its BIGGER non-diagonal layer
		//so in general think of diagonal as "a bit smaller than usual"
		if (isGridDiagonal) howManySquaresFitInTheWindowWhenUnitIsOne++
		orientation = ORIENTATION_OF_STRIPES_CYCLE[ orientation ]
	})
}