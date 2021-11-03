import oForm from './OObjectInput.vue'
import oArray from './OArrayInput.vue'
import oSimple from './OSimpleInput.vue'
import oSelect from './OSelect.vue'

const componentResolver = {
    'form': oForm,
    'form-array': oArray,
    'simple': oSimple,
    'select': oSelect
}

export default componentResolver;