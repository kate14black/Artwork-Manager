<template>
  <div id="navigation">
    <v-toolbar class="navigation-toolbar" color="transparent">
      <div class="navigation-title">
        <v-toolbar-side-icon
          :class="theme.fg"
          @click.stop="drawer = !drawer"
        />
        <v-toolbar-title>
          <router-link
            title="Home"
            :class="theme.fg"
            to="/"
          >
            Artwork Manager
          </router-link>
        </v-toolbar-title>
      </div>

    </v-toolbar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile avatar>
          <v-list-tile-avatar :tile="tile">
            <v-gravatar :email="user.email" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-sub-title class="email-info">{{ user.email }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-divider/>

      <v-list>
        <menu-link
          key="0"
          title="Home"
          link="/"
          icon="home"
          :theme="theme"
        />
        <menu-link
          v-if="!user.isLoggedIn"
          key="1"
          title="Sign Up"
          @click="logUserIn"
          link="/sign-up"
          icon="settings"
          :theme="theme"
        />
        <menu-link
          key="3"
          title="Save File"
          link="/push"
          icon="exit_to_app"
          :theme="theme"
        />
        <menu-link
          v-if="!user.isLoggedIn"
          key="2" title="Edit Profile"
          link="/profile/edit"
          icon="settings"
          :theme="theme"
        />
        <menu-link
          v-if="user.isLoggedIn"
           key="3"
           title="Log out"
           link="/logout"
           @click="logUserOut"
           icon="exit_to_app"
           :theme="theme"
        />
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import MenuLink from "../../components/layout/MenuLink.vue";

export default {
  name: 'HeaderTemplate',
  components: {
    "menu-link": MenuLink
  },
  data: function () {
    return {
      theme: {
        bg: "red",
        fg: "red--text"
      },
      drawer:    null,
      tile:      false,
      menu:      false,
      user:      this.$store.state.user,
      userName:  "",
      userEmail: ""
    }
  },
  methods: {
    logUserIn (evt = null) {
      if (evt) evt.target.disabled = true;
      this.$emit('log-user-in', evt)
    },
    logUserOut (evt = null) {
      if (evt) evt.target.disabled = true;
      this.$emit('log-user-out', evt)
    }
  }
}
</script>
