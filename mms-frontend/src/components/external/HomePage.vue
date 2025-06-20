<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter();

function onClick(to) {
  router.push({ name: to })
}
</script>

<template>
  <div class="d-flex flex-column position-relative w-100 h-100 p-0">
    <div class="d-flex align-items-center px-5 pt-4">
      <img class="me-auto" src="assets/logo.png" alt="">
      <button class="btn btn-danger" @click="onClick('signin-page')">Sign In</button>
    </div>
    <div class="d-flex flex-column gap-5 flex-grow-1 align-items-center justify-content-center pb-5">
      <p class="display-1 m-0 text-center w-50">Store and watch your movies in a secure way!</p>
      <div class="d-flex gap-2 sign-up">
        <input type="email" class="form-control bg-transparent" id="email-address" placeholder="Email address">
        <button class="btn btn-danger" @click="onClick('signup-page')">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .sign-up {
    height: 56px;

    input {
      width: 400px;
    }

    button {
      width: 100px;
    }
  }
</style>
