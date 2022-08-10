<template>
    <div>
        <nuxt-child />
        <div class="card">
            <div class="card-header">List Users</div>
            <div class="card-body p-0">
                <div class="p-2">
                    <div class="btn-group">
                        <span @click="refreshList()" class="btn btn-outline-info btn-sm">Refresh List</span>
                        <nuxt-link :to="`/user/add`">
                            <span class="btn btn-outline-info btn-sm">Add User</span>
                        </nuxt-link>
                    </div>
                </div>
                <div class="p-2">
                    <div class="row row-cols-4">
                        <div class="col">
                            <div class="form-group">
                                <label>Name</label>
                                <input @change="refreshList(true)" type="text" class="form-control" v-model="listConfig.name">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label>Email</label>
                                <input @change="refreshList(true)" type="email" class="form-control" v-model="listConfig.email">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-2">
                    <div class="row row-cols-4">
                        <div class="col">
                            <div class="form-group">
                                <label>Order By</label>
                                <select @change="refreshList(true)" class="form-control" v-model="listConfig.orderBy.key">
                                    <option value="name">Name</option>
                                    <option value="email">Email</option>
                                </select>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label>Order By Value</label>
                                <select @change="refreshList(true)" class="form-control" v-model="listConfig.orderBy.value">
                                    <option value="ASC">ASC</option>
                                    <option value="DESC">DESC</option>
                                </select>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label>Show Data</label>
                                <select @change="refreshList(true)" class="form-control" v-model="listConfig.paginate">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label>Page <b>( Last : {{listConfig.pageLast}})</b></label>
                                <input @change="refreshList(false)" type="number" class="form-control" v-model="listConfig.page" min="1" :max="`${listConfig.pageLast}`">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th>Tools</th>
                                <th>name</th>
                                <th>email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in userList" :key="item.id">
                                <td>
                                    <div class="btn-group">
                                        <nuxt-link :to="`/user/${item.id}/`">
                                            <span class="btn btn-outline-warning btn-sm">Open</span>
                                        </nuxt-link>
                                        <span @click="deleteHendle(`${item.id}`)" class="btn btn-outline-danger btn-sm">Delete</span>
                                    </div>
                                </td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.email }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                listConfig:{ 
                    email:'',
                    name:'',
                    paginate:10,
                    page:1,
                    pageLast:1,
                    orderBy:{key:'name', value:'ASC'}
                }
            }
        },
        async asyncData({$axios}) {
            let userList = []
            const res = await $axios.get('/user/list').catch(error => {
                console.log(error)
            })
            userList = res.data.result.data.data
            listConfig = {
                email:'',
                name:'',
                paginate:'10',
                page:'1',
                pageLast: res.data.result.data.last_page,
                orderBy:{key:'name', value:'ASC'}
            }
            return {
                userList
            }
        },
        methods: {
            async deleteHendle(id) {
                try {
                    this.$toast.show('Delete in Process...')
                    const res = await this.$axios.delete(`/user/delete/${id}`).catch(error => {
                        this.$toast.show('Delete fail')
                    })
                    if(!res.data.res){
                        this.$toast.show('Delete fail...!')
                        res.data.err.forEach((msg) => { this.$toast.show(msg) });
                    }else{
                        this.$toast.show('Delete success...!')
                        this.refreshList(true)
                    }
                } catch (error) {
                    this.$toast.show('Delete fail...!')
                }
            },
            async refreshList(firstPage) {
                if (firstPage) { this.listConfig.page = 1 }
                const encodeListConfig = window.btoa(JSON.stringify(this.listConfig))
                const reGet = await this.$axios.get(`/user/list/${encodeListConfig}`).catch(error => {
                    console.log(error)
                })
                this.listConfig.page = reGet.data.result.data.current_page
                this.listConfig.pageLast = reGet.data.result.data.last_page
                this.userList = reGet.data.result.data.data
            }
        }
    }
</script>