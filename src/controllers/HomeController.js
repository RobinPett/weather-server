/**
 * @file Defines the HomeController class.
 * @module HomeController
 * @author Robin Pettersson
 */

/**
 * Encapsualates a controller.
 */
export class HomeController {
  /**
   * Renders a view and sends is as a HTTP response.
   * index GET.
   *
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   * @param {Function} next - Next middleware function.
   */
  index (req, res, next) {
    res.json({
      message: 'Welcome to the API'
    })
  }
}
