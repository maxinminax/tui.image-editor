/**
 * @author maxinminax <ng.nhuphu@gmail.com>
 * @fileoverview CensorCircle extending fabric.Rect
 */
import fabric from 'fabric/dist/fabric.require';

/**
 * CensorCircle object
 * @class CensorCircle
 * @extends {fabric.Rect}
 * @ignore
 */
const CensorCircle = fabric.util.createClass(fabric.Ellipse, /** @lends Rect.prototype */ {
    /**
     * type
     * @param {String} type
     * @default
     */
    type: 'censorCircle',

    /**
     * constructor
     * @override
     */
    initialize(options) {
        options = options || {};

        this.callSuper('initialize', options);
    },

    _render(ctx) {
        this.callSuper('_render', ctx);

        const censoredImage = this.get('censoredImage');

        if (!censoredImage) {
            return;
        }

        // Calc original scale
        const originalFlipX = this.flipX ? -1 : 1;
        const originalFlipY = this.flipY ? -1 : 1;
        const originalScaleX = originalFlipX / this.scaleX;
        const originalScaleY = originalFlipY / this.scaleY;

        // Set original scale
        ctx.scale(originalScaleX, originalScaleY);

        this._fillCensoredImage(ctx, censoredImage);

        // Reset scale
        ctx.scale(1 / originalScaleX, 1 / originalScaleY);
    },

    _fillCensoredImage(ctx, censoredImage) {
        const [x, y] = this.calcTransformMatrix().slice(-2);
        const {width, height} = this;
        const halfWidth = width / 2;
        const halfHeight = height / 2;

        ctx.save();
        ctx.beginPath();

        ctx.save();
        ctx.transform(1, 0, 0, this.ry / this.rx, 0, 0);
        ctx.arc(0, 0, this.rx, 0, Math.PI * 2, false);
        ctx.restore();

        ctx.clip();
        ctx.closePath();

        ctx.drawImage(censoredImage._filteredEl,
            x - halfWidth, y - halfHeight,
            width, height,
            -halfWidth, -halfHeight,
            width, height);

        ctx.restore();
    }
});

module.exports = CensorCircle;
