/**
 * Create drawer (navigation side)
 * @class
 */
class Drawer {
  /**
   * @param {HTMLElement} element
   * Place your side navigation with its menu drawer
   * (that goes off-canvas) element.
   * \
   * \
   * Please note that the drawer menu is inside this
   * element!
   */
  constructor({
    element
  }) {
    this._element = element;
  }
};

export default Drawer;
