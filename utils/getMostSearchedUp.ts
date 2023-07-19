// Find key with biggest value in object
export default function getMostSearchedUp(obj: object): string {
    let keys: string[] = Object.keys(obj)
    let largest: number = Math.max.apply(null, keys.map(x => obj[x]))
    let result: string[] = keys.reduce((result, key) => { if (obj[key] === largest){ result.push(key); } return result; }, []);
    return result[0]
}