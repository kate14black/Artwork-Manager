<template>
  <div
    id="header-template"
    class="sticky header"
  >
    <div class="content">
      <router-link
        to="/"
        class="logo"
      >
        INSERT YOUR LOGO HERE
      </router-link>
      <div class="links">
        <router-link
          v-if="!user.isLoggedIn"
          to="/sign-up"
          class="link1"
        >
          Sign Up
        </router-link> <span
          v-if="!user.isLoggedIn"
          class="divider"
        />
        <input
          v-if="!user.isLoggedIn"
          type="button"
          class="link1"
          value="Login"
          @click="logUserIn"
        > <span
          v-if="!user.isLoggedIn"
          class="divider"
        />
        <router-link
          v-if="user.isLoggedIn"
          to="/profile/edit"
          class="link2"
        >
          Edit Profile
        </router-link> <span
          v-if="user.isLoggedIn"
          class="divider"
        />
        <input
          v-if="user.isLoggedIn"
          type="button"
          class="link2"
          value="Logout"
          @click="logUserOut"
        > <span
          v-if="user.isLoggedIn"
          class="divider"
        />
        <a
          href="https://github.com/DOkwufulueze/eth-vue"
          target="_blank"
          class="link3"
        >Github</a> <span class="divider" />
        <a
          href="http://danielokwufulueze.com"
          target="_blank"
          class="link4"
        >www</a>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'HeaderTemplate',
  data: function () {
    return {
      user: this.$store.state.user
    }
  },
  methods: {
    logUserIn (evt = null) {
      if (evt) evt.target.disabled = true
      this.$emit('log-user-in', evt)
    },
    logUserOut (evt = null) {
      if (evt) evt.target.disabled = true
      this.$emit('log-user-out', evt)
    }
  }
}
</script>
