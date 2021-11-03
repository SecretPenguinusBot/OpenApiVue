<template>
  <div class="simple-input">
      <div>
          <component :is='inpitComponent.is' :type='inpitComponent.props.type' :value='data' @input="onValueChanged"/>
      </div>
  </div>
</template>

<script>

const buildComponent = (schema) => {
    const component = {};
    component.is = 'input'
    component.props = {}
    switch(schema.inputType)
    {
        case 'text':
            {
                switch(schema)
                {
                    case "password":
                        component.props.type = 'password'
                        break;
                    case 'date-time':
                        component.props.type = 'date-time'
                        break;
                    case 'email':
                        component.props.type = 'email'
                }
            }
            break;
        case 'number': 
            {
                component.props.type = 'number'
            }
            break;
        case 'checkbox':
            {
                component.props.type = 'checkbox'
            }
            break;
        case 'select':
            {
                console.log("default")
            }
            break;
        default:
            {
                console.log("default")
            }
    }
    return component;
}

export default {
    
    data(){
        console.log(this.value);
        return {
            data: this.value,
            inpitComponent: buildComponent(this.schema),
        }
    },    
    props:['schema', 'value'],
    methods:{
        onValueChanged(e){
            this.data = e.target.value;
            console.log(this.data);
            this.$emit('input', this.data)
        }
    }

}
</script>

<style>

</style>