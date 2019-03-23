/**
 * @param path
 * @returns {string}
 */
export function getBackendEndpoint(path) {
    const url = new URL(path.replace(/\/+/g, '/'), process.env.REACT_APP_BACKEND_API);
    return url.toString();
}
