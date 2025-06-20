<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

let email = ref('')
let password = ref('')
let isSubmitting = ref(false)
let hasError = ref(false)

async function onSubmit() {
    try { 
        isSubmitting.value = true
        console.log(isSubmitting.value)
        await store.dispatch('authStore/signInUser', {
            email,
            password
        })
    } catch {
        hasError.value = true
    } finally {
        isSubmitting.value = false
    }
}

</script>

<template>
    <div class="container-fluid d-flex align-items-center position-relative w-100 h-100 p-0">
        <div class="sign-in-form container d-flex flex-column align-items-center border
        bg-dark bg-opacity-75 w-auto gap-5">
            <router-link to="/">
                <img src="assets/logo.png" alt="">
            </router-link>
            <form 
                class="d-flex flex-column gap-2 h-100"
                @submit.prevent="onSubmit"
            >
                <input
                    v-model.trim="email"
                    required
                    class="form-control bg-transparent"
                    type="email"
                    placeholder="Email address"
                >
                <input
                    v-mode="password"
                    required
                    class="form-control bg-transparent"
                    type="password"
                    placeholder="Password"
                >
                <button class="btn mt-5 btn-danger">
                    <p
                        v-if="isSubmitting"
                        class="m-0"
                    >
                        Sign In
                    </p>
                    <div
                        v-else
                        class="spinner-border text-light" 
                        role="status">
                    </div>
                </button>
            </form>
        </div>
    </div>
</template>

<style scoped>
    .sign-in-form {
        padding: 40px;

        button {
            height: 56px;
        }
    }
</style>