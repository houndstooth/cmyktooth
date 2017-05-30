import currentIteration from '../shared/state/currentIteration'
import { BLACK, CYAN, MAGENTA, YELLOW } from '../shared/render/colors'

const CMYKTOOTH_COLORS = [ BLACK, CYAN, MAGENTA, YELLOW ]
const CMYKTOOTH_SIZE = 1000
const GRID_SIZE = 31
const OFFSET_GRID = GRID_SIZE % 2 === 0 ? (GRID_SIZE / 2) % 2 : ((GRID_SIZE + 1) / 2) % 2

export default {
	state: {
		shared: {
			tileSize: CMYKTOOTH_SIZE,
			canvasSize: CMYKTOOTH_SIZE,
			gridSize: GRID_SIZE,
			opacity: .5,
			supertileOffset: [ OFFSET_GRID === 1 ? 0 : 1, OFFSET_GRID ],
			negativeGridToo: true
		},
		iteration: {
			iterating: true,
			startIteration: 0,
			endIteration: 16
		}
	},
	iterations: {
		shared: {
			tileSize: p => p / Math.sqrt(2),
			colorA: () => CMYKTOOTH_COLORS[ currentIteration.i % 4 ],
			gridRotationAboutCenter: p => p + (Math.PI / 4),
			opacity: () => 1 / (currentIteration.i + 2),
			offsetOrigin: () => {
				const offset = CMYKTOOTH_SIZE / 2 - CMYKTOOTH_SIZE / Math.pow(2, 1 + (currentIteration.i + 1) / 2)
				return [ offset, offset ]
			}
		}
	},
	animations: {}
}