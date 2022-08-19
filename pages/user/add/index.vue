<template>
    <div>
        <div class="card">
            <form @submit.prevent="submitHendle()">
                <div class="card-header">Add User Form</div>
                <div class="card-body">
                    <div class="row row-cols-3">
                        <div class="col">
                            <div class="form-group">
                                <label>Nama</label>
                                <input type="text" class="form-control" v-model="input.nama" required>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label>Username</label>
                                <input type="text" class="form-control" v-model="input.username" required>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" class="form-control" v-model="input.password" required>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="btn-group">
                        <button type="submit" class="btn btn-outline-success btn-sm">Submit</button>
                        <button type="reset" class="btn btn-outline-danger btn-sm">Reset</button>
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
        data(){
            return{
                input:{ username:'', password:'', nama:'' }
            }
        },
        methods: {
            async submitHendle() {
                try {
                    this.$toast.show('Submit in Process...')
                    const res = await this.$axios.post('/user/create', {data: this.input}).catch(error => {
                        this.$toast.show('Submit fail')
                    })
                    if(!res.data.res){
                        this.$toast.show('Submit fail...!')
                        res.data.err.forEach((msg) => { this.$toast.show(msg) });
                    }else{
                        this.input = { username:'', password:'', nama:'' }
                        this.$toast.show('Submit success...!')
                    }
                } catch (error) {
                    this.$toast.show('Submit fail...!')
                }
            }
        }
    }
</script>