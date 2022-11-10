<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app :mobile-breakpoint="768">
      <v-img
        class="pa-4 pt-7"
        height="170"
        src="mountains.jpg"
        gradient="to top right, rgba(19,84,122,.9), rgba(128,208,199,.9)"
      >
        <v-avatar size="70" class="mb-2">
          <img src="../public/bike.png" alt="Xuan" />
        </v-avatar>

        <div class="white--text text-subtitle-1 font-weight-bold">
          Xuan Wang
        </div>
        <div class="white--text text-subtitle-2">xuan_wang</div>
      </v-img>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      dark
      color="primary"
      src="../public/mountains.jpg"
      prominent
      :height="$route.path === '/' ? '220' : '170'"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-container class="header-container pa-0">
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

          <v-spacer></v-spacer>

          <search />
        </v-row>
        <v-row>
          <v-app-bar-title class="text-h4 ml-4">
            {{ $store.state.appTitle }}
          </v-app-bar-title>
        </v-row>
        <v-row>
          <liveDate />
        </v-row>
        <v-row v-if="$route.path === '/'">
          <field-add-task />
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <snackbar />
      <router-view></router-view>
      <!--  -->
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: "Todo", icon: "mdi-view-dashboard", to: "/" },
      { title: "About", icon: "mdi-help-box", to: "/about" },
    ],
  }),
  mounted() {
    this.$store.dispatch("getTasks");
  },
  components: {
    "field-add-task": require("@/components/Todo/FieldAddTask.vue").default,
    snackbar: require("@/components/Global/Snackbar.vue").default,
    search: require("@/components/Tools/Search.vue").default,
    liveDate: require("@/components/Tools/LiveDate.vue").default,
  },
};
</script>
<style lang="scss" scoped>
.header-container {
  max-width: none;
}
</style>
