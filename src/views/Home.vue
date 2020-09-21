<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid dark>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-btn router-link to="/signin" bottom color="pink" dark fab fixed right>
      <v-icon>mdi-lock</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({})
}
</script>
