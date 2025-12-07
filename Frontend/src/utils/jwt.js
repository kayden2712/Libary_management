export function decodeJwt(token) {
    if (!token) return null;
    try {
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload));
    } catch (err) {
        console.error("JWT decode error:", err);
        return null;
    }
}
