/**
 * Created by Yao on 12/12/2015.
 */
function FlyingBoy(imgsrc) {
    this._x = imgsrc.x;
    this._y = imgsrc.y;
    this._mass = 1.0;

    this.$boyDiv = $('<div></div>')
        .css({
            'position': 'fixed',
            'bottom': '0px',
            'left': '0px',
            'width': '50px',
            'height': '50px',
            'background-color': 'black'
        });
}

FlyingBoy.prototype.initialize = function() {
    $('body').append(this.$boyDiv);
};

Flyingboy.prototype.run = function() {

};