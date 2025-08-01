class ApiService {
  static async request({ url, method = "GET", body = null, headers = {} }) {
    try {
      const defaultHeaders = {
        "Content-Type": "application/json",
        ...headers,
      };

      const options = {
        method,
        headers: defaultHeaders,
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      return;
    }
  }
}

export default ApiService;
