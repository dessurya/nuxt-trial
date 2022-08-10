<template>
    <div>
        <nuxt-child />
        <div class="card">
            <nuxt-child />
            <div class="card-header">List Dokumen LFB011</div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th>Tools</th>
                                <th>Vessel_code</th>
                                <th>No_ba</th>
                                <th>No_voyage</th>
                                <th>Arrival_date</th>
                                <th>Arrival_at</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in docList" v-bind:key="item.Id_global">
                                <td>
                                    <div class="btn-group">
                                        <nuxt-link :to="{name: 'lfb011-open-Id_global', params: {Id_global: item.Id_global}}">
                                            <span class="btn btn-outline-warning">Open</span>
                                        </nuxt-link>
                                    </div>
                                </td>
                                <td>{{ item.Vessel_code }}</td>
                                <td>{{ item.No_ba }}</td>
                                <td>{{ item.No_voyage }}</td>
                                <td>{{ item.Arrival_date }}</td>
                                <td>{{ item.Arrival_at }}</td>
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
                docList: []
            }
        },
        async mounted() {
            const res = await this.$axios.get('/lfb011/list').catch(error => {
                console.log(error)
            })
            this.docList = res.data.result.data
        }
    }
</script>