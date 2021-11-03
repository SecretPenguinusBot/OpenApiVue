<template>
  <div>
      <div v-for="(prop, index) of this.schema.fields" :key="index">
          <component :is="componentResolver[prop.type]" :value='value[index]' :schema='prop' @input="(n) => onPropertyChanged(n, index)"/>
      </div>
  </div>
</template>

<script>

import componentResolver from './componentResolver'
export default {
    name:"ObjectInput",
    props:['schema', 'value'],
    data(){
        console.log("OBJ");
        const data = {...this.value}
        return{
            data,
            componentResolver
        }
    },
    methods:{
        onPropertyChanged(n, pName){
            this.data[pName] = n;
            this.$emit('input', this.data);
        }
    }
}
</script>

<style>

</style>