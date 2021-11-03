
const buildObject = (schema) => {
    const obj = {};
    console.log(schema);
    const keys = Object.keys(schema.fields);
    for(let key in keys){
        obj[key] = undefined;
    }
    return obj;
}

export default buildObject;