"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by WesternRanger on 16/2/4.
 */

var DOM = function DOM(name) {
    _classCallCheck(this, DOM);

    this.wrap = name;
    this.age = 11;
};

var Exts = function (_DOM) {
    _inherits(Exts, _DOM);

    function Exts(name) {
        _classCallCheck(this, Exts);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Exts).call(this, name));
    }

    _createClass(Exts, [{
        key: "getEvery",
        value: function getEvery() {
            this.wrap.on("click", ".head-box1", function () {
                console.log("extend");
            });
        }
    }]);

    return Exts;
}(DOM);

var wayou = new Exts($(".head-top"));
wayou.getEvery();