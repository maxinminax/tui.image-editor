/**
 * @author maxinminax <ng.nhuphu@gmail.com>
 * @fileoverview CensorDrawingMode class
 */
import DrawingMode from '../interface/drawingMode';
import consts from '../consts';

const {drawingModes} = consts;
const components = consts.componentNames;

/**
 * CensorDrawingMode class
 * @class
 * @ignore
 */
class CensorDrawingMode extends DrawingMode {
    constructor() {
        super(drawingModes.CENSOR);
    }

    /**
    * start this drawing mode
    * @param {Graphics} graphics - Graphics instance
    * @override
    */
    start(graphics) {
        const censor = graphics.getComponent(components.CENSOR);
        censor.start();
    }

    /**
     * stop this drawing mode
     * @param {Graphics} graphics - Graphics instance
     * @override
     */
    end(graphics) {
        const censor = graphics.getComponent(components.CENSOR);
        censor.end();
    }
}

module.exports = CensorDrawingMode;
