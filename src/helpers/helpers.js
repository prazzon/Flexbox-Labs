export function camelToDash(str) {
   return str.replace(/([A-Z])/g, (val) => `-${val.toLowerCase()}`);
}
