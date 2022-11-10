<template>
  <v-dialog :value="true" persistent max-width="290">
    <v-card>
      <v-card-title class="text-h5"> Edit Task Title </v-card-title>
      <v-card-text>
        Edit the task title of a task :
        <v-text-field v-model="taskTitle" @keyup.enter="saveTask" />
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" text @click="$emit('close')"> Cancel </v-btn>
        <v-btn
          @click="saveTask()"
          text
          :disabled="!taskTitle || task.title === taskTitle"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["task"],
  data() {
    return {
      taskTitle: null,
    };
  },
  mounted() {
    this.taskTitle = this.task.title;
  },
  computed: {
    taskTitleInvalid() {
      return !this.taskTitle || this.task.title === this.taskTitle;
    },
  },
  methods: {
    saveTask() {
      if (!this.taskTitleInvalid) {
        let payload = {
          id: this.task.id,
          title: this.taskTitle,
        };
        this.$store.dispatch("updateTaskTitle", payload);
        this.$emit("close");
        // 讓程序在加載時能夠跑到最上面
        this.$vuetify.goTo(0);
      }
    },
  },
};
</script>

<style scoped></style>
