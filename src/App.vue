<template>
  <div id="app">
    <div class="row">
      <schema-viewer class="col-3" :schema="schema"/>
      <schema-viewer class="col-3" :schema="form"/>
      <o-form class="col-3" :form="form" :value="model"/>
    </div>
  </div>
</template>

<script>
import OForm from './components/open-api-form/OForm.vue'
import schema from './components/open-api-form/swagger.json'
import SchemaViewer from './components/SchemaViewer/SchemaViewer.vue'
import {deref} from './utils/deref'
import formBuilder from './utils/form-builder'
export default {
  name: 'App',
  components: {
    OForm,
    SchemaViewer
  },
  created(){
    const openapi = deref(schema);
    this.openapi = {...openapi}; 
  },
  computed:{
    schema(){      
      return this.openapi.paths['/api/OpenApi'].post
      },
    form(){
      const form = formBuilder(this.schema);
      return form;
    }
  },
  data(){
    return{
      model:{},
      openapi: {},
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.row{
  display: flex;
  flex-direction: row;
  width: 100%;
}
.col-3{
  width: 33.33333333%;
  flex-basis: 33.33333333%;
}
</style>
