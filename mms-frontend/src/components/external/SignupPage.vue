<script setup>
    import { ref } from 'vue'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const store = useStore()

    let email = ref(store?.state?.authStore?.emailInput)
    let firstName = ref('')
    let lastName = ref('')
    let password = ref('')
    let isSubmitting = ref(false)
    let hasError = ref(false)

    async function onSubmit() {
        try { 
            isSubmitting.value = true
            await store.dispatch('authStore/signUpUser', {
                first_name: firstName.value,
                last_name: lastName.value,
                email: email.value,
                password: password.value,
            })
            router.replace({
                name: 'dashboard'
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
        <div
            class="sign-in-form container d-flex flex-column align-items-center border border-0
        bg-dark bg-opacity-75 w-auto gap-5"
        >
            <router-link to="/">
                <img
                    src="assets/logo.png"
                    alt=""
                >
            </router-link>
            <form 
                class="d-flex flex-column gap-2 h-100"
                @submit.prevent="onSubmit"
            >
                <input
                    v-model.trim="firstName"
                    required
                    class="form-control bg-transparent"
                    type="text"
                    placeholder="First name"
                >
                <input
                    v-model.trim="lastName"
                    required
                    class="form-control bg-transparent"
                    type="text"
                    placeholder="Last Name"
                >
                <input
                    v-model.trim="email"
                    required
                    class="form-control bg-transparent"
                    type="email"
                    placeholder="Email address"
                >
                <input
                    v-model="password"
                    required
                    class="form-control bg-transparent"
                    type="password"
                    placeholder="Password"
                >
                <p class="form-text text-danger">
                    <i class="bi bi-x-circle" />
                    Something went wrong. Please try again.
                </p>
                <button class="btn mt-4 btn-danger">
                    <p
                        v-if="!isSubmitting"
                    >
                        Sign Up
                    </p>
                    <div
                        v-else
                        class="spinner-border text-light" 
                        role="status"
                    />
                </button>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .sign-in-form {
        padding: 40px;

        button {
            height: 56px;
        }
    }
</style>