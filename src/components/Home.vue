<template>
  <div id="home">
    <HeaderTemplate
      @log-user-in="logUserIn"
      @log-user-out="logUserOut"
    />
    <BodyTemplate
      :current-view="currentView"
    />
    <v-footer
      class="pa-3"
      color="grey darken-3"
      app>
      <v-spacer />
      <span
        class="red--text">
        &copy; {{ (new Date()).getFullYear() }}
      </span>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    HeaderTemplate,
    BodyTemplate
  },
  props: {
    currentView: {
      type: Object,
      default: null
    }
  },
  methods: {
    logUserIn (evt) {
      this.$emit('log-user-in', evt)
    },
    logUserOut (evt) {
      this.$emit('log-user-out', evt)
    }
  }
}

import HeaderTemplate from './layout/HeaderTemplate'
import BodyTemplate from './layout/BodyTemplate'
</script>


