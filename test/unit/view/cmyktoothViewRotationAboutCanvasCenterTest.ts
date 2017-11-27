import { constants, Radian, state, to } from '../../../../../src'
import { cmyktoothViewRotationAboutCanvasCenter } from '../../../pattern'

const { EIGHTH_OF_CIRCLE_ROTATION, QUARTER_CIRCLE_ROTATION, NO_ROTATION } = constants
const subject: () => Radian = cmyktoothViewRotationAboutCanvasCenter.default

describe('cmyktooth view rotation about canvas center', () => {
	it('rotates the view an eight of the way round each layer', () => {
		state.currentLayer = to.Layer(0)
		expect(subject()).toBe(NO_ROTATION)
		state.currentLayer = to.Layer(1)
		expect(subject()).toBe(EIGHTH_OF_CIRCLE_ROTATION)
		state.currentLayer = to.Layer(2)
		expect(subject()).toBe(QUARTER_CIRCLE_ROTATION)
	})
})
