<script>
  import ProdutoList from './components/ListaProdutos.vue'
  export default {
    name: 'App',
    components: {
      ProdutoList,
    },
  };
</script>

<template>
  <div id="app">
    <h2>Cadastro de Produtos</h2>
    <ProdutoList />
  </div>
</template>