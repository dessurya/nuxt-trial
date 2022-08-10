<template>
    <div>
        <div class="card">
            <div class="card-header">
                Open LFB011
            </div>
            <div class="card-body">
                {{ JSON.stringify(doc) }}
            </div>
            <div class="card-footer">
                <div class="btn-group">
                    <nuxt-link to="/lfb011">
                        <span class="btn btn-outline-danger btn-sm">Close</span>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                doc: []
            }
        },
        async mounted() {
            const res = await this.$axios.get(`/lfb011/open/${this.$route.params.Id_global}`).catch(error => {
                console.log(error)
            })
            this.doc = res.data.result.data
        }
    }
</script>