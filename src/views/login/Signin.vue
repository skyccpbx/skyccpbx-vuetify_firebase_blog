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
                <form @submit.prevent="userSignIn">
                  <v-flex>
                    <v-text-field
                      name="email"
                      label="Email"
                      id="email"
                      type="email"
                      v-model="email"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      type="password"
                      v-model="password"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex class="text-xs-center" mt-5>
                    <v-btn color="primary" type="submit">Sign In</v-btn>
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
  data: () => ({
    email: '',
    password: '',
    alert: false
  }),
  computed: {
    error() {
      return this.$store.state.error
    },
    loading() {
      return this.$store.state.loading
    }
  },
  methods: {
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
