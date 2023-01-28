import { login , gettoken , logout} from '@/api/user.js'
import { getToken, setToken, removeToken } from '@/utils/auth'
const getDefaultState = () => {
    return {
        token: getToken(),
        isTrue: false,
        info: {
            name: 'liu',
            age: 22
        }
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    ADDINFO: (state , info)=> {
        state.info = info
    },
    SETTOKEN: (state, token) => {
        state.token = token
    },
    LOGIN: (state, isTrue) => {
        state.isTrue = isTrue
    },
}

const actions = {
    getInfo({commit}) {
        return new Promise((resolve, reject) => {
            console.log(222)
            commit('ADDINFO' , {
                name:123,
                age:456
            })
            resolve(state.info)
        })
    },
      // 登录
    login({ commit }, loginForm_s) {
        return new Promise((resolve, reject) => {
            login(loginForm_s).then(response => {
                commit('LOGIN', response.success)
                setToken(state.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 退出登录
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        }).catch(error => {
            reject(error)
        })
        })
    },
    gettoken({commit}) { // 获取token
        return new Promise((resolve, reject) => {
            gettoken().then(response => {
                const { data } = response
                commit('SETTOKEN', data._csrf_token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
     // 移除令牌 token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}