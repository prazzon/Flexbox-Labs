export function camelToDash(str: string) {
   return str.replace(/([A-Z])/g, (val) => `-${val.toLowerCase()}`);
}

export function getKeys<T extends object>(obj: T): (keyof T)[] {
   return Object.keys(obj) as (keyof T)[];
}