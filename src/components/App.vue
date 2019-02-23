<template>
  <v-app
    light
    id="app"
  >
    <v-content>
      <v-container
        fluid
        id="app-container"
      >
        <router-view
          :is-d-app-ready="isDAppReady"
          :current-view="currentView"
          :is-valid-user-but="isValidUserBut"
          @log-user-in="logUserIn"
          @log-user-out="logUserOut"
        />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  props: {
    isDAppReady: {
      type: Boolean,
      default: false
    },
    currentView: {
      type: Object,
      default: null
    },
    isValidUserBut: {
      type: String,
      default: '0'
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
</script>
