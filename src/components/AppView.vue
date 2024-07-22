<template>
    <div>
      <h1>Vue PWA</h1>
      <CreateForm
        :editIndex="editIndex"
        :input="input"
        :todos="todos"
        @setTodos="setTodos"
        @setEditIndex="setEditIndex"
        @setInput="setInput"
      />
      <TodoList
        :todos="todos"
        @setTodos="setTodos"
        @setEditIndex="setEditIndex"
        @setInput="setInput"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import CreateForm from './CreateForm.vue';
  import TodoList from './TodoList.vue';
  import { getTodos } from '../services/indexedDB';
  
  const todos = ref([]);
  const input = ref('');
  const editIndex = ref(null);
  
  const setTodos = (newTodos) => {
    todos.value = newTodos;
  };
  
  const setInput = (newInput) => {
    input.value = newInput;
  };
  
  const setEditIndex = (newEditIndex) => {
    editIndex.value = newEditIndex;
  };
  
  onMounted(async () => {
    const loadedTodos = await getTodos();
    todos.value = loadedTodos;
  });
  </script>
  