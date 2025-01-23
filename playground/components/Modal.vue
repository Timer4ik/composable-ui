<template>
  <Modal :name="nameModal" :initial-is-active="false">
    <template #default="{ open, close, isActive, toggle, data, name }">
      <div class="modal" v-if="isActive">
        <div>Что с ним сделать?</div>
        <div>#{{ data?.id }} {{ data?.name }}</div>
        <div>
          <button class="" @click="close">Ничего</button>
          <button @click="close(null), removeUser(data?.id)">Удалить</button>
        </div>
      </div>
    </template>
  </Modal>
  <div class="user" v-for="user in users" :key="user.id">
    <div class="">#{{ user.id }}</div>
    <div class="">{{ user.name }}</div>
    <button class="" @click="useModal({ name: nameModal }).open(user)">
      Действие
    </button>
  </div>
</template>

<script setup>
import Modal from "../../src/runtime/components/Modal.vue";
const nameModal = "user";

const users = ref([
  { id: 1, name: "Adel" },
  { id: 2, name: "Insaf" },
  { id: 3, name: "Adel 2" },
  { id: 4, name: "Adel 4" },
]);

const removeUser = (userId) =>
  (users.value = users.value.filter((user) => user?.id !== userId));
</script>

<style lang="css" scoped>
.modal {
  background-color: rgba(0, 0 0, 0.25);
  /* color: white;   */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.user {
  display: flex;
  column-gap: 10px;
}
</style>
