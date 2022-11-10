<template>
  <v-dialog :value="true" persistent max-width="290">
    <v-card>
      <v-card-title class="text-h5"> Delete Task ? </v-card-title>
      <v-card-text> Are you sure you want to delete this task ? </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" text @click="$emit('close')"> NO </v-btn>
        <v-btn @click="$store.dispatch('deleteTask', task.id)" text>
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["task"],
};
</script>

<style scoped></style>
