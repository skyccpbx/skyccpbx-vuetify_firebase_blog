<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>用户登录</v-toolbar-title>
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
                <form ref="form" lazy-validation @submit.prevent="userSignIn">
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
                  >
                  </v-text-field>
                  <v-card-actions class="d-flex justify-center">
                    <v-btn
                      large
                      :loading="loading"
                      :disabled="loading"
                      color="success"
                      class="mr-4"
                      type="submit"
                      >确定</v-btn
                    >
                    <v-btn
                      large
                      color="error"
                      class="mr-4"
                      outer-link
                      to="/signup"
                      >注册</v-btn
                    >
                  </v-card-actions>
                  <v-flex>
                    <v-alert
                      icon="mdi-shield-lock-outline"
                      prominent
                      text
                      type="info"
                    >
                      {{ email }}
                    </v-alert>
                  </v-flex>
                  <v-flex>
                    <v-alert type="error" dismissible v-model="alert">
                      {{ error }}
                    </v-alert>
                  </v-flex>
                </form>
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
  name: 'Signin',
  props: {
    source: String
  },
  data: () => ({
    valid: true,
    password: '',
    alert: false,
    email: '',
    emailRules: [
      v => !!v || '邮箱不能为空！',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    show1: false,
    password: '',
    rules: {
      required: value => !!value || '请输入密码！',
      min: v => v.length >= 8 || '最少设置8位密码',
      emailMatch: () => "The email and password you entered don't match"
    }
  }),
  computed: {
    error() {
      return this.$store.state.error
    },
    loading() {
      return this.$store.state.loading
    },
    userOn() {
      this.$store.dispatch('userOn', {
        email: this.email,
        password: this.password
      })
    }
  },
  methods: {
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    userSignIn() {
      this.$store.dispatch('userSignIn', {
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
