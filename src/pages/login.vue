<!-- 登录 -->
<template>
    <div class='login'>
        <el-button @click="click1">假装登录</el-button>
    </div>
</template>

<script>
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
        click1() {
            let loginForm_s = this.$common.getFormData({
                _username: 'agent_user',
                _password: '123456',
                _csrf_token: this.$store.getters.token,
            });
            this.$store.dispatch("user/login", loginForm_s)
            .then((e) => {
                this.$router.push('/')
            })
        }
    },
    watch: {},
    computed: {},
}
</script>

<style lang='less' scoped>
    
</style>