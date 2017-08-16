import cmyktoothColorSet from '../src/utilities/cmyktoothColorSet'
import cmyktoothViewRotationAboutCanvasCenter from '../src/utilities/cmyktoothViewRotationAboutCanvasCenter'
import cmyktoothOffsetAddress from '../src/utilities/cmyktoothOffsetAddress'
import cmyktoothOpacity from '../src/utilities/cmyktoothOpacity'
import cmyktoothTileSize from '../src/utilities/cmyktoothTileSize'
import cmyktoothConstants from '../src/cmyktoothConstants'

export default {
	name: 'cmyktooth',
	basePattern: {
		tileSettings: {
			tileSizeSetting: cmyktoothConstants.CMYKTOOTH_CANVAS_AND_INITIAL_TILE_SIZE,
		},
		viewSettings: {
			centerViewOnCenterOfTileAtZeroZeroAddress: true,
			rotateViewAboutCanvasCenter: 0,
			canvasSize: cmyktoothConstants.CMYKTOOTH_CANVAS_AND_INITIAL_TILE_SIZE,
		},
		gridSettings: {
			gridSize: cmyktoothConstants.CMYKTOOTH_GRID_SIZE,
			includeNegativeQuadrants: true,
		},
		colorSettings: {
			set: cmyktoothColorSet(-1),
			opacity: .5,
			assignment: {
				offsetAddress: cmyktoothOffsetAddress,
			},
		},
		iterationSettings: {
			startIterationFrame: 0,
			endIterationFrame: cmyktoothConstants.CMYKTOOTH_ITERATION_COUNT,
		},
	},
	iterationsPattern: {
		tileSettings: {
			tileSizeSetting: cmyktoothTileSize,
		},
		colorSettings: {
			set: cmyktoothColorSet,
			opacity: cmyktoothOpacity,
		},
		viewSettings: {
			rotateViewAboutCanvasCenter: cmyktoothViewRotationAboutCanvasCenter,
		},
	},
}
