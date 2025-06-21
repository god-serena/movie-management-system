<script setup>
    import { onMounted, ref } from 'vue';
    import { useStore } from 'vuex'
    import UploadModal from 'components/internal/UploadModal.vue';
    import MoviesList from 'components/internal/MoviesList.vue';

    const store = useStore()
    const isFetching = ref(true)
    const showUploadModal = ref(false)
    const hasNewUpload = ref(false)
    const movieToEdit = ref(null)

    function showHideModal(e) {
        if (e?.new_upload) hasNewUpload.value = !hasNewUpload.value;
        showUploadModal.value = !showUploadModal.value
    }

    function openUploadModal(e) {
        movieToEdit.value = e.movieToEdit
        showUploadModal.value = true
    }

    async function signOut() {
        await store.dispatch('authStore/signOutUser')
    }

    onMounted(() => {
        setTimeout(() => {
            isFetching.value = false
        }, 5000)
    })
</script>

<template>
    <div class="bg-dark container-fluid p-0 vh-100">
        <div
            class="top-bar fixed-top z-index-1 d-flex align-items-center px-5 pt-4"
            style="background: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent);"
        >
            <img
                class="me-auto"
                src="assets/logo.png"
                alt=""
            >
            <button
                class="btn btn-danger rounded-pill d-flex justify-content-around"
                @click="signOut"
            >
                <p> Sign Out </p>
                <i class="bi bi-box-arrow-right" />
            </button>
        </div>
        <MoviesList
            :has-new-upload="hasNewUpload"
            @open-upload-modal="openUploadModal"
        />
        <UploadModal
            v-if="showUploadModal"
            :movie-to-edit="movieToEdit"
            @close="showHideModal"
        />
        <div
            class="upload-bttn fixed-bottom d-flex justify-content-end"
            style="bottom: 50px; right: 50px;"
        >
            <button
                class="btn btn-danger rounded-pill d-flex"
                @click="showHideModal"
            >
                <p> Add movie </p>
                <i class="bi bi-plus-circle" />
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    button {
        gap: 8px;
        padding: 12px;
    }
</style>
