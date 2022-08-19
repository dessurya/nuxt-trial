<template>
    <div>
        <div class="card">
            <form @submit.prevent="submitHendle()">
                <div class="card-header">Update User Form <b>{{ user.username_old }}</b></div>
                <div class="card-body">
                    <div class="row row-cols-2">
                        <div class="col">
                            <div class="form-group">
                                <label>Nama</label>
                                <input type="text" class="form-control" v-model="user.nama" required>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label>Username</label>
                                <input type="text" class="form-control" v-model="user.username" required>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="btn-group">
                        <button type="submit" class="btn btn-outline-success btn-sm">Submit</button>
                        <nuxt-link :to="`/user`">
                            <span class="btn btn-outline-warning btn-sm">Back</span>
                        </nuxt-link>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user:{ username:'', nama:'', username_old:''}
            }
        },
        async asyncData({$axios, params}) {
            let user = {}
            const res = await $axios.get(`/user/find/${params.username}`).catch(error => {
                console.log(error)
            })
            user = res.data.data
            user.username_old = params.username
            return {
                user
            }
        },
        methods: {
            async submitHendle() {
                try {
                    this.$toast.show('Submit in Process...')
                    const res = await this.$axios.put(`/user/update/${this.user.username_old}`, {data: this.user}).catch(error => {
                        this.$toast.show('Submit fail')
                    })
                    if(!res.data.res){
                        this.$toast.show('Submit fail...! after await')
                        res.data.err.forEach((msg) => { this.$toast.show(msg) });
                    }else{
                        this.$toast.show('Submit success...!')
                    }
                } catch (error) {
                    this.$toast.show('Submit fail...! try err')
                }
            }
        }
    }
</script>