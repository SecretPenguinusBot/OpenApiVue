
const getInputType = (type) => {
    switch(type){
        case 'integer':
        case 'double':
        case 'float':
            return 'number';
        default:
            return 'text';
    }    
}

const buildParameter = (schema) => {
    const field = {};
    switch(schema.type){
        case 'object':
            {
                console.log(schema);
                field.type = 'form';
                field.fields = {};          
                const bodyParameters = Object.keys(schema.properties);
                for(let bKey of bodyParameters){
                    console.log(bKey)
                    const p = buildParameter(schema.properties[bKey]);
                    console.log(p);
                    field.fields[bKey] = p;
                }
            }
            break;
        case 'array':
            {
                field.type = 'form-array'
                field.items = buildParameter(schema.items);
            }
            break;
        default:
            {
                if(!schema.enum){
                    field.type = 'simple'
                    field.inputType = getInputType(schema.type);
                    field.format = schema.format;
                    console.log("SIMPLE");
                }
                else{
                    field.type = 'select'
                    field.options = [...schema.enum]
                }
            }
    }
    return field;
}

const buildForm = (openApiMethodDescription) => {
    
    const form = {};

    if(openApiMethodDescription.parameters){
        const parameters = openApiMethodDescription.parameters;

        for(let parameter of parameters){
            console.log(parameter);
            form[parameter.name] = buildParameter(parameter.schema);

        }
    }

    if(openApiMethodDescription.requestBody && openApiMethodDescription.requestBody.content){
        const content = openApiMethodDescription.requestBody.content;
        const keys = Object.keys(content);
        if(keys.length > 0){
            const first = content[keys[0]].schema;
            form.body = buildParameter(first)
        }
    }

    return form;
    
}

export default buildForm;