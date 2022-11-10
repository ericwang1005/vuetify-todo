<template>
  <v-snackbar v-model="$store.state.snackbar.show">
    {{ $store.state.snackbar.text }}

    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="$store.commit('hideSnackbar')">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<style lang="scss">
//讓mobile添加新task的時後下方可以及時出現在下方欄位
div.v-snack:not(.v-snack--absolute) {
  height: 100%;
}
</style>
