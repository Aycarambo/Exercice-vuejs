<script>
export default {
  props: { user: {} },
  data() {
    return { hideCompleted: false, todos: [] };
  },
  computed: {
    filteredTodos() {
      return this.hideCompleted
        ? this.todos.filter((t) => !t.completed)
        : this.todos;
    },
  },
  created() {
    fetch(`https://jsonplaceholder.typicode.com/todos?userId=${this.user?.id}`)
      .then((response) => response.json())
      .then((json) => {
        this.todos = json;
      });
  },
};
</script>

<template>
  <div>
    <ul>
      <li class="todo flex" v-for="todo in filteredTodos" :key="todo.id">
        <input type="checkbox" v-model="todo.completed" />
        <span :class="{ done: todo.completed }">{{ todo.title }}</span>
      </li>
    </ul>
    <button @click="hideCompleted = !hideCompleted">
      {{ hideCompleted ? "Show all" : "Hide completed" }}
    </button>
  </div>
</template>

<style>
.todo {
  font-size: large;
}

.done {
  text-decoration-line: line-through;
}

input[type="checkbox"] {
  transform: scale(1.25);
  margin-right: 10px;
}
</style>
