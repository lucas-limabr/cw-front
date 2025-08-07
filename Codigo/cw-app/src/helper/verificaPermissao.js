export function hasRole(role) {
    const roles = JSON.parse(localStorage.getItem("roles") || "[]");
    return roles.includes(role);
}
