<template>
        <div>
            <div class="listProduto">
            <h3>Lista de Produtos</h3>
            <button @click="showCreateForm = true">Criar Novo Produto</button>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>descricao</th>
                        <th>marca</th>
                        <th>valor</th>
                        <th>qtd</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="produto in produtos" :key="produto.id">
                        <td>{{ produto.name }}</td>
                        <td>{{ produto.descricao }}</td>
                        <td>{{ produto.marca }}</td>
                        <td>{{ produto.valor }}</td>
                        <td>{{ produto.qtd }}</td>
                        <td>
                            <button @click="editProduto(produto)">Editar</button>
                            <button @click="deleteProduto(produto.id)">Deletar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="showCreateForm" class="newProduto">
            <h3>Criar Produto</h3>
            <input v-model="newProduto.name" placeholder="Nome do produto" />
            <input v-model="newProduto.descricao" placeholder="descricao" />
            <input v-model="newProduto.marca" placeholder="Marca" />
            <input v-model="newProduto.valor" placeholder="Valor do Produto" />
            <input v-model="newProduto.qtd" placeholder="Quantidade" />
            <button @click="createProduto">Salvar</button>
            <button @click="showCreateForm = false">Cancelar</button>
        </div>
        <div v-if="showEditForm" class="editProduto">
            <h3>Editar produto</h3>
            <input v-model="editProdutoForm.name" placeholder="Nome do produto" />
            <input v-model="editProdutoForm.descricao" placeholder="Descricao do produto" />
            <input v-model="editProdutoForm.marca" placeholder="Marca do produto" />
            <input v-model="editProdutoForm.valor" placeholder="Valor do produto" />
            <input v-model="editProdutoForm.qtd" placeholder="Quantidade do produto" />
            <button @click="updateProduto">Atualizar</button>
            <button @click="showEditForm = false">Cancelar</button>
        </div>
    </div>
</template>
<script>
    import api from '../services/api';
    
    export default {
        // variáveis que serão usadas no script
        data() {
            return {
                produtos: [],
                showCreateForm: false,
                showEditForm: false,
                newProduto: {
                    id: '',
                    name: '',
                },
                editProdutoForm: {
                    id: '',
                    name: '',
                },
            };
        },
        //funções que serão chamadas a página
        methods: {
            async fetchProdutos() { //busca usuários
                try {
                    const response = await api.get('/produto');
                    this.produtos = response.data;
                } catch (error) {
                    console.error('Erro ao buscar usuários:', error);
                }
            },
            async createProduto() {
                try {
                    await api.post('/produto', this.newProduto);
                    this.newProduto = { id: '', name: '' };
                    this.showCreateForm = false;
                    this.fetchProdutos();
                } catch (error) {
                    console.error('Erro ao criar usuário:', error);
                }
            },
            editProduto(produto) {
                this.editProdutoForm = { ...produto };
                this.showEditForm = true;
            },
            async updateProduto() {
                try {
                    await api.put(`/produto/${this.editProdutoForm.id}`, this.editProdutoForm);
                    this.editProdutoForm = { id: '', name: '' };
                    this.showEditForm = false;
                    this.fetchProdutos();
                } catch (error) {
                    console.error('Erro ao atualizar usuário:', error);
                }
            },
            async deleteProduto(id) {
                try {
                    await api.delete(`/produto/${id}`);
                    this.fetchProdutos();
                } catch (error) {
                    console.error('Erro ao deletar usuário:', error);
                }
            },
        },
        created() {
            this.fetchProdutos();
        },
    };
</script>