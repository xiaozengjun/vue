let reg2 = /^(?![^a-zA-Z]+$)(?!\D+$)/
let reg=/^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/
export default {
    tableRowClassName({ // 表格头部class
        row,
        rowIndex
    }) {
        if (rowIndex === 0) {
            return 'warning-row';
        } else if (rowIndex === 1) {
            return 'success-row';
        }
        return '';
    },
    getFormData(object) { // 转FromData 对象
        const formData = new FormData()
        Object.keys(object).forEach(key => {
            const value = object[key]
            if (Array.isArray(value)) {
                value.forEach((subValue, i) =>
                    formData.append(key + `[${i}]`, subValue)
                )
            } else {
                formData.append(key, object[key])
            }
        })
        return formData
    },
    verification(item) { // 金额验证
        item = item.replace(/[^\d.]/g, '')
        // 输入两位数的时候判断第一位是0就只取第二位如01变1
        if (item.length == 1 && item == 0) {
            item = '1'
        }
        if (item.length == 2 && item.substr(0, 1) == 0 && item.substr(1, 1) != '.') {
            item = item.substr(1, 1)
        }
        let index = item.indexOf('.')
        if (index == -1) {
            // 如果小数点不存在允许输入6位
            if (item.length > 6) {
                item = item.substr(0, 6)
            }
        } else { // 如果小数点存在允许输入9位,且小数点后输入两位禁止
            if (item.length > 9 || item.length > index + 3) {
                item = item.substr(0, item.length - 1)
            }
        }
        // 判断当前输入为小数点
        if (item.substr(item.length - 1, item.length) == '.') {
            // 判断之前就存在小数点,就删除最后一位,保持只有一个小数点
            if (item.substr(0, item.length - 1).indexOf('.') != -1) {
                item = item.substr(0, item.length - 1)
            }
            // 如果第一位是小数点就替换成0.
            if (item.length == 1) {
                item = '1'
            }
        }
        return item
    },
    // 验证密码
    validatePass(rule, value, callback) {
        if (value === '') {
        callback(new Error('请输入密码'));
        }else if(value.length<6) {
            callback(new Error('密码最少需6位数'))
        }else if(value.length>20) {
            callback(new Error('密码最多只能20位数'))
        } else if(!reg2.test(value)) {
            callback(new Error('密码必须包含数字，字母'))
        } else {
        // if (this.ruleForm.checkPass !== '') {
        //     this.$refs.ruleForm.validateField('checkPass');
        // }
        callback();
        }
    },
    // 验证用户名
    nameS (phone, value, callback) {
        if (value === '') {
            callback(new Error('请输入登录账户'));
        }else if(value.length<6) {
            callback(new Error('登录账户最少需6位数'))
        }else if(value.length>20) {
            callback(new Error('登录账户最多20位数'))
        }else {
            callback()
        }
    },
    //验证方法
    validatorPhone (phone, value, callback) {
        if (value === '') {
            callback(new Error('手机号不能为空'))
        } else if (!reg.test(value)) {
            callback(new Error('手机号格式错误'))
        } else {
            callback()
        }
    },
  }
