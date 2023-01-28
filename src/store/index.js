import vue from 'vue'
import vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
vue.use(vuex)

export default new vuex.Store({
    modules: {
        user
    },
    getters
})