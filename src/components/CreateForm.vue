<template>
  <form class="create-form" @submit.prevent="createTodo">
    <input
      class="create-input"
      placeholder="Add a todo"
      v-model="inputValue"
    />
    <button class="create-button" type="submit">
      {{ editIndex !== null ? 'Update' : 'Add' }}
    </button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';
import { addTodo, updateTodo } from '../services/indexedDB';

const props = defineProps({
  editIndex: Number,
  input: String,
  todos: Array,
});
const emit = defineEmits(['setTodos', 'setEditIndex', 'setInput']);

const inputValue = ref(props.input);

watch(() => props.input, (newInput) => {
  inputValue.value = newInput;
});

const createTodo = async () => {
  if (inputValue.value.trim() !== '') {
    if (props.editIndex !== null) {
      const updatedTodos = [...props.todos];
      const todoToUpdate = updatedTodos[props.editIndex];
      todoToUpdate.text = inputValue.value;
      await updateTodo(todoToUpdate.id, todoToUpdate);
      updatedTodos[props.editIndex] = todoToUpdate;
      emit('setTodos', updatedTodos);
      emit('setEditIndex', null);
    } else {
      const newTodo = { text: inputValue.value };
      const id = await addTodo(newTodo);
      emit('setTodos', [...props.todos, { ...newTodo, id }]);
    }
    emit('setInput', '');
    inputValue.value = '';
  }
};
</script>
