<template>
  <div>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" color="primary">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="handleCick(index)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <dialog-due-date
      v-if="dialogs.dueDate"
      :task="task"
      @close="dialogs.dueDate = false"
    />

    <dialog-edit
      v-if="dialogs.edit"
      :task="task"
      @close="dialogs.edit = false"
    />

    <dialog-delete
      v-if="dialogs.delete"
      :task="task"
      @close="dialogs.delete = false"
    />
  </div>
</template>

<script>
export default {
  props: ["task"],
  data() {
    return {
      dialogs: {
        dueDate: false,
        edit: false,
        delete: false,
      },
      items: [
        {
          title: "Edit",
          icon: "mdi-pencil",
          click() {
            this.dialogs.edit = true;
          },
        },
        {
          title: "Due to date",
          icon: "mdi-calendar",
          click() {
            this.dialogs.dueDate = true;
          },
        },
        {
          title: "Delete",
          icon: "mdi-delete",
          click() {
            // 因為當前這個this沒有指向data當中,可以從handleClick當中做調整
            this.dialogs.delete = true;
          },
        },
        {
          title: "Sort",
          icon: "mdi-drag-horizontal-variant",
          click() {
            // 如果輸入匡內有內容就不要啟動sorting功能
            if (!this.$store.state.search) {
              this.$store.commit("toggleSorting");
            } else {
              this.$store.commit("showSnackbar", "Unable to Sort");
            }
          },
        },
      ],
    };
  },
  methods: {
    handleCick(index) {
      // 鎖定每一個迭代的物件
      // 因為這裡的this有成功指向data數據當中因此可以透過call方法來讓物件當中的方法可以沿用並指向data
      this.items[index].click.call(this);
    },
  },
  components: {
    "dialog-delete": require("@/components/Todo/Dialogs/DialogDelete.vue")
      .default,
    "dialog-edit": require("@/components/Todo/Dialogs/DialogEdit.vue").default,
    "dialog-due-date": require("@/components/Todo/Dialogs/DialogDueDate.vue")
      .default,
  },
};
</script>

<style scoped></style>
