/**
 * @author maxinminax <ng.nhuphu@gmail.com>
 * @fileoverview CensorTriangle extending fabric.Rect
 */
import fabric from 'fabric';

/**
 * CensorTriangle object
 * @class CensorTriangle
 * @extends {fabric.Rect}
 * @ignore
 */
const CensorTriangle = fabric.util.createClass(fabric.Triangle, /** @lends Rect.prototype */ {
    /**
     * type
     * @param {String} type
     * @default
     */
    type: 'censorTriangle',

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

        ctx.moveTo(-halfWidth, halfHeight);
        ctx.lineTo(0, -halfHeight);
        ctx.lineTo(halfWidth, halfHeight);
        ctx.moveTo(-halfWidth, halfHeight);

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

module.exports = CensorTriangle;
