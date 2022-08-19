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
                                <label>Nama</label>
                                <input @change="refreshList(true)" type="text" class="form-control" v-model="listConfig.nama">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label>Username</label>
                                <input @change="refreshList(true)" type="text" class="form-control" v-model="listConfig.username">
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
                                    <option value="username">Username</option>
                                    <option value="nama">Nama</option>
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
                                <th>Username</th>
                                <th>Nama</th>
                            </tr>
                        </thead>
                        <tbody v-if="userList.length >= 1">
                            <tr v-for="item in userList" :key="item.id">
                                <td>
                                    <div class="btn-group">
                                        <nuxt-link :to="`/user/${item.username}/`">
                                            <span class="btn btn-outline-warning btn-sm">Open</span>
                                        </nuxt-link>
                                        <span @click="deleteHendle(`${item.username}`)" class="btn btn-outline-danger btn-sm">Delete</span>
                                    </div>
                                </td>
                                <td>{{ item.username }}</td>
                                <td>{{ item.nama }}</td>
                            </tr>
                        </tbody>
                        <tbody v-else><tr><td class="text-center" colspan="4">-- Not Found Data --</td></tr></tbody>
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
                    username:'',
                    nama:'',
                    paginate:10,
                    page:1,
                    pageLast:1,
                    orderBy:{key:'username', value:'ASC'}
                }
            }
        },
        async asyncData({$axios}) {
            let userList = []
            const res = await $axios.get('/user/paginate').catch(error => {
                console.log(error)
            })
            userList = res.data.data
            const listConfig = {
                username:'',
                nama:'',
                paginate:10,
                page:1,
                pageLast: res.data.last_page,
                orderBy:{key:'username', value:'ASC'}
            }
            return {
                userList, listConfig
            }
        },
        methods: {
            async deleteHendle(username) {
                try {
                    this.$toast.show('Delete in Process...')
                    const res = await this.$axios.delete(`/user/delete/${username}`).catch(error => {
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
                let configure = []
                if (this.listConfig.username != '') { configure.push('username='+this.listConfig.username) }
                if (this.listConfig.nama != '') { configure.push('nama='+this.listConfig.nama) }
                if (firstPage) { this.listConfig.page = 1 }
                configure.push('page='+this.listConfig.page)
                configure.push('paginate='+this.listConfig.paginate)
                configure.push('orderByKey='+this.listConfig.orderBy.key)
                configure.push('orderByValue='+this.listConfig.orderBy.value)
                configure = "?"+configure.join("&")
                const reGet = await this.$axios.get(`/user/paginate${configure}`).catch(error => {
                    console.log(error)
                })
                this.listConfig.page = reGet.data.current_page
                this.listConfig.pageLast = reGet.data.last_page
                this.userList = reGet.data.data
            }
        }
    }
</script>