
const refKey = '$ref';

const isObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]';
};

const deref = (object) => {
    if (!isObject(object)) {
        return { ...object }
    }

    //Предпологаем что рефы только внутри объекта и никаких ссылок на внешние доки
    const getRef = (refPath) => {
        const path = refPath.split('/');
        let temp = object;
        for (let key of path.slice(1)) {
            temp = temp[key];
        }
        return { ...temp };
    }

    const walk = (object) => {
        if (!isObject(object)) {
            return { ...object }
        }

        const subKeys = Object.keys(object);
        const temp = {};
        for (let key of subKeys) {
            if (isObject(object[key])) {
                temp[key] = walk(object[key]);
            }
            else if (key === refKey) {
                const ref = getRef(object[key]);
                const refObj = walk(ref);
                return refObj;
            }
            else {
                temp[key] = object[key];
            }
        }

        return { ...temp }
    }
    return walk(object, []);
}

export { deref }