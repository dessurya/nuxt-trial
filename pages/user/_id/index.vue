<template>
    <div>
        <div class="card">
            <form @submit.prevent="submitHendle()">
                <div class="card-header">Update User Form <b>{{ user.email }}</b></div>
                <div class="card-body">
                    <div class="row row-cols-2">
                        <div class="col">
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" class="form-control" v-model="user.name" required>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" class="form-control" v-model="user.email" required>
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
                user:{ email:'', name:'', id:'' }
            }
        },
        async asyncData({$axios, params}) {
            let user = {}
            const res = await $axios.get(`/user/open/${params.id}`).catch(error => {
                console.log(error)
            })
            user = res.data.result.data
            return {
                user
            }
        },
        methods: {
            async submitHendle() {
                try {
                    this.$toast.show('Submit in Process...')
                    const res = await this.$axios.put(`/user/update/${this.user.id}`, {data: this.user}).catch(error => {
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