<template>
  <v-list-tile>
    <router-link
      v-ripple
      class="sidebar-button"
      :class="theme.fg"
      :to="link"
    >
      <v-list-tile-action>
        <v-icon
          :class="theme.fg"
        >
          {{ icon }}
        </v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>
          {{ title }}
        </v-list-tile-title>
      </v-list-tile-content>
    </router-link>
  </v-list-tile>
</template>

<script>
export default {
  name: "menu-link",
  props: {
    title: String,
    link: String,
    icon: String,
    theme: Object
  },
  data: () => ({})
};
</script>
