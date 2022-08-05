export const state = () => ({
    authLogin: {trial:true,msg:'asdasd'}
})

export const mutations = {
    store(state, data) { state.authLogin = data },
    destroy(state) { state.authLogin = null }
}

export const getters = {
    get: (state) => {
        return state.authLogin
    }
}