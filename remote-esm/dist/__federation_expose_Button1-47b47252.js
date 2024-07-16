import { importShared } from './__federation_fn_import-05767840.js';
import { _ as _inherits, a as _createSuper, b as _createClass, c as _classCallCheck } from './_rollupPluginBabelHelpers-844fd12b.js';

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
        style: style,
        onClick: this.button1Handler
      }, " Rollup Remote React Button1 ");
    }
  }, {
    key: "button1Handler",
    value: function button1Handler() {
      console.log(import.meta);
      alert('button1 event');
    }
  }]);
  return BindEvent;
}(React.Component);

export { BindEvent as default };
