<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>用户注册</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn :href="source" icon large target="_blank" v-on="on">
                      <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                  </template>
                  <span>Source</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  @submit.prevent="userSignUp"
                >
                  <v-text-field
                    prepend-icon="mdi-email"
                    v-model="email"
                    :rules="emailRules"
                    label="邮 箱"
                    required
                  ></v-text-field>

                  <v-text-field
                    prepend-icon="mdi-lock"
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="密 码"
                    hint="At least 8 characters"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>

                  <v-text-field
                    prepend-icon="mdi-lock"
                    v-model="passwordConfirm"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[comparePasswords]"
                    :type="show2 ? 'text' : 'passwordConfirm'"
                    name="input-10-1"
                    label="确认密码
"
                    hint="At least 8 characters"
                    counter
                    @click:append="show2 = !show2"
                  ></v-text-field>

                  <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || '请同意用户协议！']"
                    label="我已阅读并同意网站的使用条件及隐私声明。"
                    required
                  ></v-checkbox>
                  <v-card-actions class="d-flex justify-center">
                    <v-btn
                      large
                      :loading="loading"
                      :disabled="loading"
                      color="success"
                      class="mr-4"
                      @click="validate"
                      type="submit"
                      >确定</v-btn
                    >
                    <v-btn large color="error" class="mr-4" @click="reset"
                      >重置</v-btn
                    >
                  </v-card-actions>
                  <v-flex class="my-2">
                    <v-alert
                      icon="mdi-alert"
                      prominent
                      text
                      type="error"
                      dismissible
                      v-model="alert"
                      >{{ error }}</v-alert
                    >
                  </v-flex>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: 'Signup',
  props: {
    source: String
  },
  data: () => ({
    valid: true,
    alert: false,
    name: '',
    nameRules: [
      v => !!v || '用户名不能为空！',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || '邮箱不能为空！',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    checkbox: false,
    show1: false,
    show2: false,
    password: '',
    passwordConfirm: '',
    rules: {
      required: value => !!value || '请输入密码！.',
      min: v => v.length >= 8 || '最少设置8位密码',
      emailMatch: () => "The email and password you entered don't match"
    }
  }),
  computed: {
    comparePasswords() {
      return this.password === this.passwordConfirm ? true : '2次密码输入不一致'
    },
    error() {
      return this.$store.state.error
    },
    loading() {
      return this.$store.state.loading
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    userSignUp() {
      if (this.comparePasswords !== true) {
        return
      }
      this.$store.dispatch('userSignUp', {
        email: this.email,
        password: this.password
      })
    }
  },
  watch: {
    error(value) {
      if (value) {
        this.alert = true
      }
    },
    alert(value) {
      if (!value) {
        this.$store.commit('setError', null)
      }
    }
  }
}
</script>

<style></style>
