import { tr } from "date-fns/locale";
import Vue from "vue";
import Vuex, { Store } from "vuex";
import Localbase from "localbase";

let db = new Localbase("db");

db.config.debug = false;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    snackbar: {
      show: false,
      text: "",
    },
    sorting: false,
    tasks: [
      // {
      //   id: 1,
      //   title: "Wake Up",
      //   done: false,
      //   dueDate: "2020-10-16",
      // },
      // {
      //   id: 2,
      //   title: "Brush teeth",
      //   done: false,
      //   dueDate: "2020-10-17",
      // },
      // {
      //   id: 3,
      //   title: "Go to Work",
      //   done: false,
      //   dueDate: null,
      // },
    ],
  },

  mutations: {
    setSearch(state, value) {
      state.search = value;
    },
    addTask(state, newTask) {
      state.tasks.push(newTask);
    },
    doneTask(state, id) {
      // 篩選所有data id,如果有相符合就選取並將done反成true,他回傳的是一個數組因此取數組第一個開始
      let task = state.tasks.filter((task) => task.id === id)[0];
      task.done = !task.done;
    },
    deleteTask(state, id) {
      // 篩選所有id, 如果跟選取的id不同就返回成新的data 形同刪除
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    updateTaskTitle(state, payload) {
      let task = state.tasks.filter((task) => task.id === payload.id)[0];
      task.title = payload.title;
    },
    updateTaskDueDate(state, payload) {
      let task = state.tasks.filter((task) => task.id === payload.id)[0];
      task.dueDate = payload.dueDate;
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    showSnackbar(state, text) {
      let timeout = 0;
      // 如果有snackbar出現就在300 ms 後結束
      if (state.snackbar.show) {
        state.snackbar.show = false;
        timeout = 300;
      }
      // 設定Timer, 顯示畫面及文字
      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = text;
      }, timeout);
    },
    hideSnackbar(state) {
      state.snackbar.show = false;
    },
    toggleSorting(state) {
      state.sorting = !state.sorting;
    },
  },
  actions: {
    getTasks({ commit }) {
      db.collection("tasks")
        .get()
        .then((tasks) => {
          commit("setTasks", tasks);
        });
    },
    addTask({ commit }, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null,
      };
      db.collection("tasks") // 命名叫tasks，形同表名
        .add(newTask)
        .then(() => {
          commit("addTask", newTask);
          commit("showSnackbar", "Task Added");
        });
    },
    doneTask({ state, commit }, id) {
      let task = state.tasks.filter((task) => task.id === id)[0];
      db.collection("tasks")
        .doc({ id: id })
        .update({
          done: !task.done,
        })
        .then(() => {
          commit("doneTask", id);
        });
    },
    deleteTask({ commit }, id) {
      db.collection("tasks")
        .doc({ id: id })
        .delete()
        .then(() => {
          commit("deleteTask", id);
          commit("showSnackbar", "Task Deleted");
        });
    },
    updateTaskTitle({ state, commit }, payload) {
      db.collection("tasks")
        .doc({ id: payload.id })
        .update({
          title: payload.title,
        })
        .then(() => {
          commit("updateTaskTitle", payload);
          commit("showSnackbar", "Task Updated");
        });
    },
    updateTaskDueDate({ state, commit }, payload) {
      db.collection("tasks")
        .doc({ id: payload.id })
        .update({
          dueDate: payload.dueDate,
        })
        .then(() => {
          commit("updateTaskDueDate", payload);
          commit("showSnackbar", "Due Date Updated");
        });
    },
    setTasks({ commit }, tasks) {
      db.collection("tasks").set(tasks);
      commit("setTasks", tasks);
    },
  },
  getters: {
    tasksFiltered(state) {
      if (!state.search) {
        return state.tasks;
      }
      return state.tasks.filter((task) =>
        task.title.toLowerCase().includes(state.search.toLowerCase())
      );
    },
  },
  modules: {},
});
