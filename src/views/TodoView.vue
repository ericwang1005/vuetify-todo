<template>
  <div class="home">
    <list-task v-if="$store.state.tasks.length" />

    <no-tasks v-else />

    <button-done-sorting v-if="$store.state.sorting" />
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    "list-task": require("@/components/Todo/ListTasks.vue").default,
    "no-tasks": require("@/components/Todo/NoTasks.vue").default,
    "button-done-sorting": require("@/components/Todo/ButtonDoneSorting.vue")
      .default,
  },
};
</script>
