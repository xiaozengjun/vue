<!-- 首页 -->
<template>
    <div class='app'>
        <el-button @click="click_s">触发vuex的异步actions</el-button>
        <el-button @click="click_s2">触发vue的同步mutations</el-button>
        <span>{{info.age}}</span>
        <span>{{info.name}}</span>
        <el-button @click="login">
            通过vuex请求数据
        </el-button>
        <el-button @click="login2">
            直接请求数据
        </el-button>
        <el-button @click="logout">
            退出登录
        </el-button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
    components: {},
    props: {},
    data () {
        return {
            
        };
    },
    created() {
        this.$store.dispatch("user/gettoken")
        .then(() => { // 200
            this.isLogin = true;
        })
        .catch((err) => { // 除200外, 设置了需绑定就返回false
            if (err) {
                alert("请刷新网页重试");
            } else {
                this.pinless = true;
            }
        });
    },
    methods: {
        click_s() {
            console.log(this.info,'0000')
            this.$store.dispatch('user/getInfo').then((datas)=> {
                console.log(datas)
            })
        },
        click_s2() {
            console.log(this.info,'123456789')
            this.$store.commit('user/ADDINFO',{
                name: 'zeng',
                age: '24'
            })
        },
        login() {
            let loginForm_s = this.$common.getFormData({
                _username: 123,
                _password: 456,
                _csrf_token: 'koo9GJnOxuvN8MH5AXmS5m1nDKRIvwLRZaJFlWS8n3w',
            });
            this.$store.dispatch("user/login", loginForm_s)
            .then((e) => {
                alert(123)
                console.log(e)
            })
        },
        async login2() {
            let loginForm_s = this.$common.getFormData({
                _username: 123,
                _password: 456,
                _csrf_token: 'koo9GJnOxuvN8MH5AXmS5m1nDKRIvwLRZaJFlWS8n3w',
            });
            let response = await login(loginForm_s);
            console.log(response,'123')
        },
        async logout() {
            await this.$store.dispatch('user/logout')
            this.$router.push(`/login`)
            removeToken()
        }
    },
    computed: {
        ...mapGetters([
            'info',
        ])
    },
}
</script>

<style lang='less' scoped>
    
</style>