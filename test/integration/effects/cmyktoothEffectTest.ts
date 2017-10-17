import { Address, Coordinate } from '../../../../../src'
import { TRANSPARENT } from '../../../../../src/constants'
import executeSelectedHoundstoothEffects from '../../../../../src/execute/executeSelectedHoundstoothEffects'
import state from '../../../../../src/state'
import { iterator } from '../../../../../src/utilities/codeUtilities'
import activateTestMarkerCanvas from '../../../../../test/integration/helpers/activateTestMarkerCanvas'
import sectionCenterIsColor from '../../../../../test/integration/helpers/sectionCenterIsColor'
import { thisLayerOnly } from '../../../../../test/integration/helpers/thisFrameOnly'
import { Diagonal } from '../../../../../test/integration/helpers/types'
import cmyktoothEffect from '../../../effects/cmyktoothEffect'
import * as sectionExpections from '../helpers/sectionExpections'
import { Fill, SectionExpectation } from '../helpers/types'

describe('cmyktooth effect', () => {
	it('the absolute center is always blank', () => {
		state.selectedHoundstoothEffects = [ cmyktoothEffect ]
		const houndstoothOverrides = { basePattern: { layerSettings: thisLayerOnly(32) } }

		activateTestMarkerCanvas()

		executeSelectedHoundstoothEffects({ houndstoothOverrides })

		const color = TRANSPARENT
		const areaSize = 800 as any
		const areaOrigin = [ 0 as any, 0 as any ] as Coordinate
		const sectionAddress = [ 0, 0 ] as Address
		const sectionResolution = 1
		const id = 0
		expect(sectionCenterIsColor({ areaOrigin, areaSize, sectionAddress, sectionResolution, color, id }))
	})

	it('layer 0 is totally blank', () => {
		state.selectedHoundstoothEffects = [ cmyktoothEffect ]
		const houndstoothOverrides = { basePattern: { layerSettings: thisLayerOnly(0) } }
		activateTestMarkerCanvas()

		executeSelectedHoundstoothEffects({ houndstoothOverrides })

		const basicallyCheckWholeCanvasPoints = iterator(8).map(canvasX =>
			iterator(8).map(canvasY =>
				[ canvasX * 100 as any, canvasY * 100 as any ] as Coordinate)).reduce((a, b) => a.concat(b))

		const color = TRANSPARENT
		const areaSize = 100 as any
		const sectionAddress = [ 0, 0 ] as Address
		const sectionResolution = 1
		basicallyCheckWholeCanvasPoints.forEach((areaOrigin, id) => {
			sectionCenterIsColor({ areaOrigin, areaSize, sectionAddress, sectionResolution, color, id })
		})
	})

	it('layer 1 is black, grain going to the right', () => {
		state.selectedHoundstoothEffects = [ cmyktoothEffect ]
		const houndstoothOverrides = { basePattern: { layerSettings: thisLayerOnly(1) } }
		activateTestMarkerCanvas()

		executeSelectedHoundstoothEffects({ houndstoothOverrides })

		const SEMI_BLACK = { r: 0, g: 0, b: 0, a: 0.5 }
		const areaSize = 800 / 4 as any

		sectionExpections.expectSolidSection({
			areaOrigin: [ 0 * areaSize as any, 0 * areaSize as any ] as Coordinate,
			areaSize,
			color: TRANSPARENT,
			baseId: 0,
		})
		sectionExpections.expectSolidSection({
			areaOrigin: [ 1 * areaSize as any, 0 * areaSize as any ] as Coordinate,
			areaSize,
			color: TRANSPARENT,
			baseId: 2,
		})
		sectionExpections.expectPrincipalDiagonalDividedSection({
			areaOrigin: [ 2 * areaSize as any, 0 * areaSize as any ] as Coordinate,
			areaSize,
			colors: [ SEMI_BLACK, TRANSPARENT ],
			baseId: 4,
		})
		sectionExpections.expectSolidSection({
			areaOrigin: [ 3 * areaSize as any, 0 * areaSize as any ] as Coordinate,
			areaSize,
			color: SEMI_BLACK,
			baseId: 6,
		})

		sectionExpections.expectMinorDiagonalDividedSection({
			areaOrigin: [ 0 * areaSize as any, 1 * areaSize as any ] as Coordinate,
			areaSize,
			colors: [ SEMI_BLACK, TRANSPARENT ],
			baseId: 8,
		})
		sectionExpections.expectSolidSection({
			areaOrigin: [ 1 * areaSize as any, 1 * areaSize as any ] as Coordinate,
			areaSize,
			color: TRANSPARENT,
			baseId: 10,
		})
		sectionExpections.expectSolidSection({
			areaOrigin: [ 2 * areaSize as any, 1 * areaSize as any ] as Coordinate,
			areaSize,
			color: TRANSPARENT,
			baseId: 12,
		})
		sectionExpections.expectSolidSection({
			areaOrigin: [ 3 * areaSize as any, 1 * areaSize as any ] as Coordinate,
			areaSize,
			color: TRANSPARENT,
			baseId: 14,
		})

		sectionExpections.expectPrincipalDiagonalDividedSection({
			areaOrigin: [ 0 * areaSize as any, 2 * areaSize as any ] as Coordinate,
			areaSize,
			colors: [ TRANSPARENT, SEMI_BLACK ],
			baseId: 16,
		})
		sectionExpections.expectSolidSection({
			areaOrigin: [ 1 * areaSize as any, 2 * areaSize as any ] as Coordinate,
			areaSize,
			color: TRANSPARENT,
			baseId: 18,
		})
		sectionExpections.expectSolidSection({
			areaOrigin: [ 2 * areaSize as any, 2 * areaSize as any ] as Coordinate,
			areaSize,
			color: TRANSPARENT,
			baseId: 20,
		})
		sectionExpections.expectSolidSection({
			areaOrigin: [ 3 * areaSize as any, 2 * areaSize as any ] as Coordinate,
			areaSize,
			color: TRANSPARENT,
			baseId: 22,
		})

		sectionExpections.expectSolidSection({
			areaOrigin: [ 0 * areaSize as any, 3 * areaSize as any ] as Coordinate,
			areaSize,
			color: TRANSPARENT,
			baseId: 24,
		})
		sectionExpections.expectSolidSection({
			areaOrigin: [ 1 * areaSize as any, 3 * areaSize as any ] as Coordinate,
			areaSize,
			color: TRANSPARENT,
			baseId: 26,
		})
		sectionExpections.expectMinorDiagonalDividedSection({
			areaOrigin: [ 2 * areaSize as any, 3 * areaSize as any ] as Coordinate,
			areaSize,
			colors: [ TRANSPARENT, SEMI_BLACK ],
			baseId: 28,
		})
		sectionExpections.expectSolidSection({
			areaOrigin: [ 3 * areaSize as any, 3 * areaSize as any ] as Coordinate,
			areaSize,
			color: SEMI_BLACK,
			baseId: 30,
		})
	})

	it('layer 2 is cyan, grain going to the right bottom', () => {
		state.selectedHoundstoothEffects = [ cmyktoothEffect ]
		const houndstoothOverrides = { basePattern: { layerSettings: thisLayerOnly(2) } }
		activateTestMarkerCanvas()

		executeSelectedHoundstoothEffects({ houndstoothOverrides })

		const SEMI_CYAN = { r: 0, g: 255, b: 255, a: 0.3333 }
		const areaSize = 800 / 4 as any

		sectionExpections.expectSolidSection({
			areaOrigin: [ 0 * areaSize as any, 0 * areaSize as any ] as Coordinate,
			areaSize,
			color: SEMI_CYAN,
			baseId: 0,
		})
		sectionExpections.expectPrincipalDiagonalDividedSection({
			areaOrigin: [ 1 * areaSize as any, 0 * areaSize as any ] as Coordinate,
			areaSize,
			colors: [ TRANSPARENT, SEMI_CYAN ],
			baseId: 2,
		})
		sectionExpections.expectPrincipalDiagonalDividedSection({
			areaOrigin: [ 2 * areaSize as any, 0 * areaSize as any ] as Coordinate,
			areaSize,
			colors: [ SEMI_CYAN, TRANSPARENT ],
			baseId: 4,
		})
		sectionExpections.expectSolidSection({
			areaOrigin: [ 3 * areaSize as any, 0 * areaSize as any ] as Coordinate,
			areaSize,
			color: SEMI_CYAN,
			baseId: 6,
		})

		sectionExpections.expectPrincipalDiagonalDividedSection({
			areaOrigin: [ 0 * areaSize as any, 1 * areaSize as any ] as Coordinate,
			areaSize,
			colors: [ SEMI_CYAN, TRANSPARENT ],
			baseId: 8,
		})
		sectionExpections.expectSolidSection({
			areaOrigin: [ 1 * areaSize as any, 1 * areaSize as any ] as Coordinate,
			areaSize,
			color: TRANSPARENT,
			baseId: 10,
		})
		sectionExpections.expectSolidSection({
			areaOrigin: [ 2 * areaSize as any, 1 * areaSize as any ] as Coordinate,
			areaSize,
			color: TRANSPARENT,
			baseId: 12,
		})
		sectionExpections.expectPrincipalDiagonalDividedSection({
			areaOrigin: [ 3 * areaSize as any, 1 * areaSize as any ] as Coordinate,
			areaSize,
			colors: [ TRANSPARENT, SEMI_CYAN ],
			baseId: 14,
		})

		sectionExpections.expectPrincipalDiagonalDividedSection({
			areaOrigin: [ 0 * areaSize as any, 2 * areaSize as any ] as Coordinate,
			areaSize,
			colors: [ TRANSPARENT, SEMI_CYAN ],
			baseId: 16,
		})
		sectionExpections.expectSolidSection({
			areaOrigin: [ 1 * areaSize as any, 2 * areaSize as any ] as Coordinate,
			areaSize,
			color: TRANSPARENT,
			baseId: 18,
		})
		sectionExpections.expectSolidSection({
			areaOrigin: [ 2 * areaSize as any, 2 * areaSize as any ] as Coordinate,
			areaSize,
			color: TRANSPARENT,
			baseId: 20,
		})
		sectionExpections.expectPrincipalDiagonalDividedSection({
			areaOrigin: [ 3 * areaSize as any, 2 * areaSize as any ] as Coordinate,
			areaSize,
			colors: [ SEMI_CYAN, TRANSPARENT ],
			baseId: 22,
		})

		sectionExpections.expectSolidSection({
			areaOrigin: [ 0 * areaSize as any, 3 * areaSize as any ] as Coordinate,
			areaSize,
			color: SEMI_CYAN,
			baseId: 24,
		})
		sectionExpections.expectPrincipalDiagonalDividedSection({
			areaOrigin: [ 1 * areaSize as any, 3 * areaSize as any ] as Coordinate,
			areaSize,
			colors: [ SEMI_CYAN, TRANSPARENT ],
			baseId: 26,
		})
		sectionExpections.expectPrincipalDiagonalDividedSection({
			areaOrigin: [ 2 * areaSize as any, 3 * areaSize as any ] as Coordinate,
			areaSize,
			colors: [ TRANSPARENT, SEMI_CYAN ],
			baseId: 28,
		})
		sectionExpections.expectSolidSection({
			areaOrigin: [ 3 * areaSize as any, 3 * areaSize as any ] as Coordinate,
			areaSize,
			color: SEMI_CYAN,
			baseId: 30,
		})
	})

	it('layer 3 is magenta, grain going to the bottom', () => {
		state.selectedHoundstoothEffects = [ cmyktoothEffect ]
		const houndstoothOverrides = { basePattern: { layerSettings: thisLayerOnly(3) } }
		activateTestMarkerCanvas()

		executeSelectedHoundstoothEffects({ houndstoothOverrides })

		const SEMI_MAGENTA = { r: 255, g: 0, b: 255, a: 0.25 }
		const areaSize = 800 / 8 as any

		const expectedSectionRows: SectionExpectation[][] = [
			[
				[ Diagonal.Solid, Fill.Transparent ],
				[ Diagonal.Minor, Fill.Transparent ],
				[ Diagonal.Principal, Fill.Opaque ],
				[ Diagonal.Solid, Fill.Opaque ],
				[ Diagonal.Solid, Fill.Opaque ],
				[ Diagonal.Minor, Fill.Opaque ],
				[ Diagonal.Principal, Fill.Transparent ],
				[ Diagonal.Solid, Fill.Transparent ],
			],
			[
				[ Diagonal.Solid, Fill.Transparent ],
				[ Diagonal.Solid, Fill.Opaque ],
				[ Diagonal.Solid, Fill.Transparent ],
				[ Diagonal.SolidButTestPrincipalToAvoidSeam, Fill.Opaque ],
				[ Diagonal.Solid, Fill.Opaque ],
				[ Diagonal.Solid, Fill.Transparent ],
				[ Diagonal.Solid, Fill.Opaque ],
				[ Diagonal.Solid, Fill.Transparent ],
			],
			[
				[ Diagonal.Principal, Fill.Transparent ],
				[ Diagonal.Solid, Fill.Opaque ],
				[ Diagonal.Solid, Fill.Transparent ],
				[ Diagonal.Minor, Fill.Opaque ],
				[ Diagonal.Principal, Fill.Opaque ],
				[ Diagonal.Solid, Fill.Transparent ],
				[ Diagonal.Solid, Fill.Opaque ],
				[ Diagonal.Minor, Fill.Transparent ],
			],
			[
				[ Diagonal.Solid, Fill.Opaque ],
				[ Diagonal.SolidButTestPrincipalToAvoidSeam, Fill.Opaque ],
				[ Diagonal.Solid, Fill.Transparent ],
				[ Diagonal.Solid, Fill.Transparent ],
				[ Diagonal.Solid, Fill.Transparent ],
				[ Diagonal.Solid, Fill.Transparent ],
				[ Diagonal.Solid, Fill.Opaque ],
				[ Diagonal.Solid, Fill.Opaque ],
			],
			[
				[ Diagonal.Solid, Fill.Opaque ],
				[ Diagonal.Minor, Fill.Opaque ],
				[ Diagonal.Principal, Fill.Transparent ],
				[ Diagonal.Solid, Fill.Transparent ],
				[ Diagonal.Solid, Fill.Transparent ],
				[ Diagonal.Minor, Fill.Transparent ],
				[ Diagonal.Principal, Fill.Opaque ],
				[ Diagonal.Solid, Fill.Opaque ],
			],
			[
				[ Diagonal.Solid, Fill.Opaque ],
				[ Diagonal.Solid, Fill.Transparent ],
				[ Diagonal.Solid, Fill.Opaque ],
				[ Diagonal.Solid, Fill.Transparent ],
				[ Diagonal.Solid, Fill.Transparent ],
				[ Diagonal.Solid, Fill.Opaque ],
				[ Diagonal.Solid, Fill.Transparent ],
				[ Diagonal.SolidButTestPrincipalToAvoidSeam, Fill.Opaque ],
			],
			[
				[ Diagonal.Principal, Fill.Opaque ],
				[ Diagonal.Solid, Fill.Transparent ],
				[ Diagonal.Solid, Fill.Opaque ],
				[ Diagonal.Minor, Fill.Transparent ],
				[ Diagonal.Principal, Fill.Transparent ],
				[ Diagonal.Solid, Fill.Opaque ],
				[ Diagonal.Solid, Fill.Transparent ],
				[ Diagonal.Minor, Fill.Opaque ],
			],
			[
				[ Diagonal.Solid, Fill.Transparent ],
				[ Diagonal.Solid, Fill.Transparent ],
				[ Diagonal.Solid, Fill.Opaque ],
				[ Diagonal.Solid, Fill.Opaque ],
				[ Diagonal.Solid, Fill.Opaque ],
				[ Diagonal.SolidButTestPrincipalToAvoidSeam, Fill.Opaque ],
				[ Diagonal.Solid, Fill.Transparent ],
				[ Diagonal.Solid, Fill.Transparent ],
			],
		]

		expectedSectionRows.forEach((expectedSectionRow, row) => {
			expectedSectionRow.forEach((expectedSection, col) => {
				sectionExpections.expectSection({
					expectedSection,
					areaOrigin: [ col * areaSize as any, row * areaSize as any ] as Coordinate,
					areaSize,
					solidColor: SEMI_MAGENTA,
				})
			})
		})
	})

	it('layer 4 is yellow, grain going to the bottom left', () => {
		state.selectedHoundstoothEffects = [ cmyktoothEffect ]
		const houndstoothOverrides = { basePattern: { layerSettings: thisLayerOnly(4) } }
		activateTestMarkerCanvas()

		executeSelectedHoundstoothEffects({ houndstoothOverrides })

		const SEMI_YELLOW = { r: 255, g: 255, b: 0, a: 0.2 }
		const areaSize = 800 / 8  as any

		const expectedSectionRows: SectionExpectation[][] = [
			[
				[ Diagonal.Solid, Fill.Transparent ],
				[ Diagonal.Minor, Fill.Transparent ],
				[ Diagonal.Minor, Fill.Opaque ],
				[ Diagonal.Solid, Fill.Transparent ],
				[ Diagonal.Solid, Fill.Transparent ],
				[ Diagonal.Minor, Fill.Transparent ],
				[ Diagonal.Minor, Fill.Opaque ],
				[ Diagonal.Solid, Fill.Transparent ],
			],
			[
				[ Diagonal.Minor, Fill.Opaque ],
				[ Diagonal.Solid, Fill.Opaque ],
				[ Diagonal.Solid, Fill.Opaque ],
				[ Diagonal.Minor, Fill.Transparent ],
				[ Diagonal.Minor, Fill.Opaque ],
				[ Diagonal.Solid, Fill.Opaque ],
				[ Diagonal.Solid, Fill.Opaque ],
				[ Diagonal.Minor, Fill.Transparent ],
			],
			[
				[ Diagonal.Minor, Fill.Transparent ],
				[ Diagonal.Solid, Fill.Opaque ],
				[ Diagonal.Solid, Fill.Opaque ],
				[ Diagonal.Minor, Fill.Opaque ],
				[ Diagonal.Minor, Fill.Transparent ],
				[ Diagonal.Solid, Fill.Opaque ],
				[ Diagonal.Solid, Fill.Opaque ],
				[ Diagonal.Minor, Fill.Opaque ],
			],
			[
				[ Diagonal.Solid, Fill.Transparent ],
				[ Diagonal.Minor, Fill.Opaque ],
				[ Diagonal.Minor, Fill.Transparent ],
				[ Diagonal.Solid, Fill.Transparent ],
				[ Diagonal.Solid, Fill.Transparent ],
				[ Diagonal.Minor, Fill.Opaque ],
				[ Diagonal.Minor, Fill.Transparent ],
				[ Diagonal.Solid, Fill.Transparent ],
			],
		]

		expectedSectionRows.concat(expectedSectionRows).forEach((expectedSectionRow, row) => {
			expectedSectionRow.forEach((expectedSection, col) => {
				sectionExpections.expectSection({
					expectedSection,
					areaOrigin: [ col * areaSize as any, row * areaSize as any ] as Coordinate,
					areaSize,
					solidColor: SEMI_YELLOW,
				})
			})
		})
	})
})
