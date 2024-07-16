import { importShared } from './__federation_fn_import-43927d4c.js';
import { c as _inherits, d as _createSuper, e as _createClass, f as _classCallCheck } from './_rollupPluginBabelHelpers-303d2ab1.js';

const React = await importShared('react');

var style = {
  background: '#a3e077',
  color: '#FFFFFF',
  padding: 12
};
var BindEvent = /*#__PURE__*/function (_React$Component) {
  _inherits(BindEvent, _React$Component);
  var _super = _createSuper(BindEvent);
  function BindEvent() {
    var _this;
    _classCallCheck(this, BindEvent);
    _this = _super.call(this);
    _this.state = {};
    return _this;
  }
  _createClass(BindEvent, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("button", {
        "class": "remote-btn",
        style: style,
        onClick: this.buttonHandler
      }, "Rollup Remote React Button");
    }
  }, {
    key: "buttonHandler",
    value: function buttonHandler() {
      console.log(import.meta);
      alert('button event');
    }
  }]);
  return BindEvent;
}(React.Component);

export { BindEvent as default };
