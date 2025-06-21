<script setup>
    import { useRouter } from 'vue-router'
    import { ref } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore()
    const router = useRouter()
    let email = ref('')

    function onSubmit(to) {
        store.commit('authStore/setEmailInput', email)
        router.push({ name: to })
    }
</script>

<template>
    <div class="d-flex flex-column position-relative w-100 h-100 p-0">
        <div class="d-flex align-items-center px-5 pt-4">
            <img
                class="me-auto"
                src="assets/logo.png"
                alt=""
            >
            <button
                class="btn btn-danger"
                @click="onSubmit('signin-page')"
            >
                Sign In
            </button>
        </div>
        <div class="d-flex flex-column gap-5 flex-grow-1 align-items-center justify-content-center pb-5">
            <p class="display-2 text-center w-50 fw-bold">
                Store and watch your movies in a secure way!
            </p>
            <form 
                class="d-flex gap-2 sign-up"
                @submit.prevent="onSubmit('signup-page')"
            >
                <input 
                    v-model.trim="email" 
                    required
                    type="email"
                    class="form-control bg-transparent"
                    placeholder="Email address"
                >
                <button class="btn btn-danger">
                    Proceed
                </button>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
