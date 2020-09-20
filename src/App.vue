<template>
  <v-app>
    <SideBar />
    <TopBar />
    <router-view></router-view>
  </v-app>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import SideBar from '@/components/SideBar.vue'

export default {
  name: 'App',
  components: {
    TopBar,
    SideBar
  },

  data: () => ({
    //
  })
}
</script>
