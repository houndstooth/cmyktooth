import currentIteration from '../../state/currentIteration'
import currentAnimation from '../../state/currentAnimation'
import state from '../../state/state'
import { BLACK, CYAN, MAGENTA, TRANSPARENT, YELLOW, EIGHTH_OF_CIRCLE_ROTATION } from '../../application/constants'

const CMYKTOOTH_COLORS = [ BLACK, CYAN, MAGENTA, YELLOW ]
const CMYKTOOTH_SIZE = 1000
const GRID_SIZE = 31
const ADDRESS_OFFSET_Y = GRID_SIZE % 2 === 0 ? (GRID_SIZE / 2) % 2 : ((GRID_SIZE + 1) / 2) % 2
const ADDRESS_OFFSET_X = ADDRESS_OFFSET_Y === 1 ? 0 : 1

export default {
	state: {
		tileConfig: {
			tileSize: CMYKTOOTH_SIZE
		},
		viewConfig: {
			canvasSize: CMYKTOOTH_SIZE,
			centerViewOnCenterOfTileAtZeroZeroAddress: true
		},
		gridConfig: {
			gridSize: GRID_SIZE,
			includeNegativeQuadrants: true,
		},
		colorConfig: {
			set: [ CMYKTOOTH_COLORS[ (currentIteration.i + 3) % 4 ], TRANSPARENT ],
			opacity: .5,
			assignment: {
				offsetAddress: () => [ ADDRESS_OFFSET_X, ADDRESS_OFFSET_Y ]
			}
		},
		iteration: {
			startIteration: 0,
			endIteration: 16
		}
	},
	iterations: {
		tileConfig: {
			tileSize: () => {
				const thing = currentIteration.i * Math.sqrt(2)
				console.log(currentIteration.i, thing)
				return state.tileConfig.tileSize / thing
			}
		},
		colorConfig: {
			set: () => [ CMYKTOOTH_COLORS[ currentIteration.i % 4 ], TRANSPARENT ],
			opacity: () => 1 / (currentIteration.i + 2)
		},
		gridConfig: {
			gridRotationAboutGridCenter: () => currentIteration.i * EIGHTH_OF_CIRCLE_ROTATION
		}
	}
}
