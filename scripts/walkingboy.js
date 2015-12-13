/**
 * Created by Yao on 12/12/2015.
 */
// Walkingboy Class Begin
function Walkingboy(imgsrc) {
    this._x = 0;
    this._y = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.oldX = 0;
    this.oldY = 0;
    this.maxVelocity = 50;
    this._sc = 152;
    this.mouseCT = 0;
    this.img_src = imgsrc;
    this.bottom_offset = imgsrc.bottom_offset;
    this.left_offset = imgsrc.left_offset;

    this.$outerDiv = $('<div></div>')
        .css({
            'position': 'fixed',
            'bottom': this.bottom_offset,
            'left': this.left_offset,
            'width': '100%'
        });
    this.$walkboy = $('<img>')
        .attr({id: '_walkboy'})
        .attr({src: imgsrc.stand});

    this.$outerDiv.append(this.$walkboy);

}

Walkingboy.prototype.initialize = function() {
    $('body').append(this.$outerDiv);
};

Walkingboy.prototype.getPos = function (el) {
    var _x = 0;
    var _y = 0;

    while (el && !isNaN(el.offsetLeft) && !isNan(el.offsetTop)) {
        _x += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        _y += (el.offsetTop - el.scrollTop + el.clientTop);
        el = el.offsetParent();
    }

    console.log({left: _x, top: _y});
};

Walkingboy.prototype.scopeTest = function() {
    console.log("scopeTest executed");
    var _s = this;

    //inner
    function _fna(_ctx) {
        var _s = _ctx;
        console.log(_s._sc);
    }
    //outer
    setInterval(function() {
            _fna(_s)
        }
        , 500);
};

Walkingboy.prototype.run = function() {
    // utility functions
    // capture this
    var _t = this;

    function getAbsDist(obj1, obj2) {
        var _dx = abs(obj2.x - obj1.x);
        var _dy = abs(obj2.y - obj1.y);
        return Math.sqrt(Math.pow(_dx, 2) + Math.pow(_dy, 2));
    }

    $(document).mousemove(function(e) {
        _t.mouseX = e.pageX;
        _t.mouseY = e.pageY;
    });

    var mit = 0;

    // inner function
    function _a (_ctx) {
        var _t = _ctx;

        if (Math.abs(_t._x - _t.mouseX) <= 20) {
            _t.$walkboy.attr({
                src: _t.img_src.stand
            });

            _t.mouseCT += 1000;
            console.log(_t.mouseCT);
            if (_t.mouseCT >= 3000) {
                var _src = _t.$walkboy.attr("src");
                if (_src == _t.img_src.sit) {
                    // do nothing
                } else {
                    _t.$walkboy.attr({
                        src: _t.img_src.sit
                    });
                }
            }

            if (_t.mouseCT > 5000) {
                _t.mouseCT = 5000;
            }

        } else {
            _t.mouseCT = 0;
            console.log(_t.mouseCT);
            if (Math.abs(_t._x - _t.mouseX)/(_t.maxVelocity/1000.0) >= _t.maxVelocity) {
                if ((_t.mouseX - _t._x) < 0.0) {
                    _t._x += (-1.0) * _t.maxVelocity * 0.5;

                    var _src = _t.$walkboy.attr("src");
                    if (_src == _t.img_src.walk_flipped) {
                        // do nothing
                    } else {
                        _t.$walkboy.attr({
                            src: _t.img_src.walk_flipped
                        });
                    }

                } else {
                    _t._x += (1.0) * _t.maxVelocity * 0.5;

                    var _src = _t.$walkboy.attr("src");
                    if (_src == _t.img_src.walk) {
                        //do nothing
                    } else {
                        _t.$walkboy.attr({
                            src: _t.img_src.walk
                        });
                    }
                }
            }

            _t.$outerDiv.animate({
                left: _t._x + 'px'
            }, 1000, "linear");
        }

        console.log(_t.$outerDiv.css("left"))
    }

    // execute inner function as callback curry
    setInterval(function() {
        _a(_t);
    }, 1000);
};