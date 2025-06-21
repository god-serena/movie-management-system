<script setup>
    import { onMounted, ref, watch } from 'vue';
    import { useStore } from 'vuex';
    import VideoPlayer from 'components/internal/VideoPlayer.vue';

    const store = useStore()
    const isFetching = ref(false)
    const movies = ref([])
    const showVideoPlayer = ref(false)
    const selectedMovie = ref(null)

    const props = defineProps({
        hasNewUpload: Boolean
    })

    const emits = defineEmits(['open-upload-modal'])

    async function deleteMovie(id) {
        try {
            await store.dispatch('moviesStore/deleteMovie', { id })
            const index = movies.value.findIndex(m => m.id === id);
            movies.value.splice(index, 1)
        } catch (e) {
            console.error(e)
        }
    }

    async function fetchMovies() {
        isFetching.value = true
        try {
            movies.value = []
            const response = await store.dispatch('moviesStore/getMovies')
            movies.value = response
        } catch (e) {
            console.error(e)
        } finally {
            isFetching.value = false
        }
    }

    function openUploadModal(movie) {
        selectedMovie.value = movie;
        emits('open-upload-modal', { 
            movieToEdit: selectedMovie.value
        })
    }

    onMounted(() => {
        fetchMovies()
    })

    watch(() => props.hasNewUpload, () => {
        fetchMovies()
    })  
</script>

<template>
    <div class="container-fluid p-0 vh-100 position-absolute overflow-auto">
        <div
            class="movies container-fluid position-relative"
            style="top: 80px; padding: 50px;"
        >
            <p class="display-5 mb-3">
                Collections
            </p>
            <div class="row row-cols-lg-6 row-cols-md-6 row-cols-sm-3 g-4">
                <template v-if="isFetching">
                    <div
                        v-for="i in 6"
                        :key="i"
                        class="col"
                    >
                        <div class="card border border-2">
                            <div class="placeholder-wave">
                                <span
                                    style="width: 200px; height: 250px;"
                                    class="placeholder"
                                />
                            </div>
                            <div class="card-body bg-black text-white">
                                <p class="card-text placeholder-wave">
                                    <span class="placeholder w-100" />
                                </p>
                            </div>
                        </div>
                    </div>
                </template>
                <template
                    v-for="movie in movies"
                    v-else
                    :key="movie.id"
                >
                    <div class="col">
                        <div class="card border border-2 h-100 position-relative">
                            <img
                                :src="movie.thumbnail"
                                class="card-img-top object-fit-cover"
                                style="height: 250px; width: 100%;"
                                alt=""
                            >
                            <div
                                class="position-absolute top-0 end-0 m-2 d-flex flex-column gap-1 hover-buttons"
                            >
                                <button
                                    class="btn btn-sm btn-light"
                                    @click="selectedMovie = movie; showVideoPlayer=true"
                                >
                                    <i class="bi bi-eye" />
                                </button>
                                <button
                                    class="btn btn-sm btn-light"
                                    @click="openUploadModal(movie)"
                                >
                                    <i class="bi bi-pencil-square" />
                                </button>
                                <button
                                    class="btn btn-sm btn-danger"
                                    @click="deleteMovie(movie.id)"
                                >
                                    <i class="bi bi-trash" />
                                </button>
                            </div>

                            <div class="card-body bg-black text-white">
                                <p class="card-title mb-0">
                                    {{ movie.title }}
                                </p>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
    <VideoPlayer
        v-if="showVideoPlayer"
        :video="selectedMovie"
        @close="showVideoPlayer=false"
    />
</template>

<style lang="scss" scoped>
    .card {
        .hover-buttons {
            opacity: 0;
            z-index: 10;
            transition: opacity 0.3s ease-in-out;
        }

        &:hover {
            .hover-buttons {
                opacity: 1;
            }
        }
    }
</style>
