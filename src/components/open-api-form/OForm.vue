<template>
  <div class="form-wrapper">
      
      <div class="form-prop-wrapper">
          <div v-for="(field, index) of form" :key="index">
              <component :is='componentResolver[field.type]' :schema='field' :value='model[index]' @input="(newValue) => onInput(newValue, index)"/>
          </div>
      </div>
      {{model}}
  </div>
</template>

<script>

import componentResolver from './componentResolver'

export default {
    props:['form', 'value'],
    data(){
        const keys = Object.keys(this.form);
        const model = {}
        keys.forEach(i=>{
            model[i] = {...this.value[i]}
        })
        console.log(model);
        return{
            componentResolver,
            model: { "body": { "gender":2, "role": { "description": "Super admin", "name": "Admin", "id": "1" }, "email": "example@example.com", "password": "secret", "birth": "1990-01-01T00:00:01", "name": "Vasya", "id": "1" } }
        }
    },
    methods:{
        onInput(newValue,propName){
            this.model[propName] = {...newValue};
        }
    }

}
</script>

<style scoped>
.form-wrapper{
    box-shadow: 0 0 1px black;
}

</style>