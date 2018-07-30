import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _invoke from 'lodash/invoke';
import _isNil from 'lodash/isNil';

import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { customPropTypes, eventStack, getElementType, getUnhandledProps, isBrowser, META } from '../../lib';

/**
 * Responsive can control visibility of content.
 */

var Responsive = function (_Component) {
  _inherits(Responsive, _Component);

  function Responsive() {
    var _ref;

    _classCallCheck(this, Responsive);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Responsive.__proto__ || Object.getPrototypeOf(Responsive)).call.apply(_ref, [this].concat(args)));

    _this.fitsMaxWidth = function () {
      var maxWidth = _this.props.maxWidth;
      var width = _this.state.width;


      return _isNil(maxWidth) ? true : width <= maxWidth;
    };

    _this.fitsMinWidth = function () {
      var minWidth = _this.props.minWidth;
      var width = _this.state.width;


      return _isNil(minWidth) ? true : width >= minWidth;
    };

    _this.isVisible = function () {
      return _this.fitsMinWidth() && _this.fitsMaxWidth();
    };

    _this.handleResize = function (e) {
      if (_this.ticking) return;

      _this.ticking = true;
      requestAnimationFrame(function () {
        return _this.handleUpdate(e);
      });
    };

    _this.handleUpdate = function (e) {
      _this.ticking = false;
      var width = window.innerWidth;

      _this.setState({ width: width });
      _invoke(_this.props, 'onUpdate', e, _extends({}, _this.props, { width: width }));
    };

    _this.state = { width: isBrowser() ? window.innerWidth : 0 };
    return _this;
  }

  _createClass(Responsive, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var fireOnMount = this.props.fireOnMount;


      eventStack.sub('resize', this.handleResize, { target: 'window' });
      if (fireOnMount) this.handleUpdate();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      eventStack.unsub('resize', this.handleResize, { target: 'window' });
    }

    // ----------------------------------------
    // Helpers
    // ----------------------------------------

    // ----------------------------------------
    // Event handlers
    // ----------------------------------------

  }, {
    key: 'render',


    // ----------------------------------------
    // Render
    // ----------------------------------------

    value: function render() {
      var children = this.props.children;


      var ElementType = getElementType(Responsive, this.props);
      var rest = getUnhandledProps(Responsive, this.props);

      if (this.isVisible()) return React.createElement(
        ElementType,
        rest,
        children
      );
      return null;
    }
  }]);

  return Responsive;
}(Component);

Responsive._meta = {
  name: 'Responsive',
  type: META.TYPES.ADDON
};
Responsive.onlyMobile = { minWidth: 320, maxWidth: 767 };
Responsive.onlyTablet = { minWidth: 768, maxWidth: 991 };
Responsive.onlyComputer = { minWidth: 992 };
Responsive.onlyLargeScreen = { minWidth: 1200, maxWidth: 1919 };
Responsive.onlyWidescreen = { minWidth: 1920 };
Responsive.handledProps = ['as', 'children', 'fireOnMount', 'maxWidth', 'minWidth', 'onUpdate'];
export default Responsive;
Responsive.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Fires callbacks immediately after mount. */
  fireOnMount: PropTypes.bool,

  /** The maximum width at which content will be displayed. */
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** The minimum width at which content will be displayed. */
  minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Called on update.
   *
   * @param {SyntheticEvent} event - The React SyntheticEvent object
   * @param {object} data - All props and the event value.
   */
  onUpdate: PropTypes.func
} : {};