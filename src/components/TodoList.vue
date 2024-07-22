<template>
  <div class="list-container">
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        <div class="list-text">{{ todo.text }}</div>
        <div class="list-action">
          <button class="edit-button" @click="editTodo(index)">Edit</button>
          <button class="delete-button" @click="deleteTodo(index)">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { deleteTodos } from '../services/indexedDB';

const props = defineProps({
  todos: Array,
});
const emit = defineEmits(['setTodos', 'setEditIndex', 'setInput']);

const deleteTodo = async (index) => {
  const todoToDelete = props.todos[index];
  await deleteTodos(todoToDelete.id);
  const updatedTodos = [...props.todos];
  updatedTodos.splice(index, 1);
  emit('setTodos', updatedTodos);
};

const editTodo = (index) => {
  const todoToEdit = props.todos[index];
  emit('setInput', todoToEdit.text);
  emit('setEditIndex', index);
};
</script>
