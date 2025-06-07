/**
 * @file Base class for Gitlab repositories
 * @module GitlabRepositoryBase
 * @author Robin Pettersson
 */

/**
 * Class representing a Gitlab repository base.
 */
export class GitlabRepositoryBase {
/**
 * Initializes the Gitlab repository base.
 * @param {string} baseUrl - The base URL for the Gitlab API.
 */
  constructor(baseUrl = process.env.GITLAB_URL) {
    this.baseUrl = baseUrl
  }

  /**
   * Fetches data from Gitlab.
   * 
   * @param {object} settings - The settings for the fetch request.
   * @returns response
   */
  async fetch(settings) { 
    const { endpoint, body, method, token, contentType } = settings

    // Check if body needs to be stringified or use URLSearchParams
    let requestBody = null
    if (body) {
      requestBody = contentType === 'application/json' ? JSON.stringify(body) : new URLSearchParams(body)
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: method ? method : 'GET',
        headers: { 
          'Content-Type': contentType ? contentType : 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: requestBody
      })

      if (!response.ok) {
        throw new Error(`Error! Status: ${response.status} - ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`Error fetching Gitlab data: ${error.message}`) 
      throw error
    }
  }
}
