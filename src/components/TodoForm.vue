<template>
    <form class="create-form" @submit.prevent="handleSubmit">
      <input class="create-input" type="text" v-model="input" placeholder="Add a todo" />
      <button class="create-button" type="submit">{{ editIndex !== null ? 'Update' : 'Add' }}</button>
    </form>
  </template>
  
  <script setup>
  import { ref, watch, toRefs } from 'vue';
  
  const props = defineProps({
    input: String,
    editIndex: Number,
  });
  const emit = defineEmits(['create-todo']);
  
  const localInput = ref(props.input);
  
  watch(() => props.input, (newInput) => {
    localInput.value = newInput;
  });
  
  const handleSubmit = () => {
    emit('create-todo', localInput.value);
    localInput.value = '';
  };
  </script>
  
  <style>
.create-form {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 40px 0;
  padding: 20px;
}

.create-input {
  flex: 1;
  max-width: 600px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.create-button {
  background-color: #808080;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.create-button:hover {
  background-color: #696969;
}
  </style>
  