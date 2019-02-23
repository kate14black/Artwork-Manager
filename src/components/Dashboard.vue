<template v-if="isLoggedIn">
  <div id="dashboard">
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
      <span class="red--text">&copy; {{ (new Date()).getFullYear() }}</span>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
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
  data: function () {
    return {
      user: this.$store.state.user
    }
  },
  created: function () {
    if (this.user.email === '' || !this.user.isLoggedIn) this.$router.push('/')
  },
  methods: {
    ...mapActions([
      ACTION_TYPES.LOGIN
    ]),
    logUserIn (evt) {
      this.$emit('log-user-in', evt)
    },
    logUserOut (evt) {
      this.$emit('log-user-out', evt)
    }
  }
}

import { mapActions } from 'vuex'
import HeaderTemplate from './layout/HeaderTemplate'
import BodyTemplate from './layout/BodyTemplate'
import { ACTION_TYPES } from '../util/constants'
</script>
