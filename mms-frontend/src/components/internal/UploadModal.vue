<script setup>
    import { ref, onMounted, reactive } from 'vue'
    import { Modal } from 'bootstrap'
    import { useStore } from 'vuex'
    import { isEqual } from 'lodash'


    const store = useStore()
    const props = defineProps({
        show: Boolean,
        movieToEdit: {
            type: Object,
            default: () => ({
                id: null, title: '', description: '',
                thumbnail: null, video_file: null
            })
        }
    })
    const emits = defineEmits(['close'])
    const modalEl = ref(null)
    const isUploading = ref(false)
    const movie = reactive({
        title: props?.movieToEdit?.title,
        description: props?.movieToEdit?.description,
        video_file: props?.movieToEdit?.video_file,
        thumbnail: props?.movieToEdit?.thumbnail
    })
    const videoPlayer = ref(null)
    
    let modal = null

    function handleFileSelect({ e, key }) {
        const filesObj = e.target.files;

        if (filesObj.length) {
            movie[key] = filesObj[0]
            movie[key].url = URL.createObjectURL(movie[key])

            if (key === 'video_file') videoPlayer.value.load()
        }
    }
    
    function emitClose(payload={}) {
        modal.hide()
        emits('close', payload)
    }

    async function submitMovie() {
        const action = props.movieToEdit?.id ? 'moviesStore/updateMovie' : 'moviesStore/uploadMovie'
        let payload = {}
        if (props.movieToEdit?.id) {
            Object.entries(movie).forEach(([key, value])=> {
                if (!isEqual(value, props.movieToEdit[key])) {
                    payload[key] = value
                }
            })
            payload['id'] = props.movieToEdit?.id
        } else {
            payload = props.movie
        }

        try {
            isUploading.value = true
            await store.dispatch(action, payload)
            emitClose({ new_upload: true })
        } catch (e) {
            console.error(e)
            isUploading.value = false
        }
    }

    onMounted(() => {
        modal = new Modal(modalEl.value)
        modal.show()
    })

</script>

<template>
    <div
        ref="modalEl"
        class="modal fade"
        data-bs-backdrop="static"
    >
        <div
            class="modal-dialog modal-dialog-centered"
        >
            <div class="modal-content bg-dark">
                <div
                    class="modal-header text-white"
                    style="padding: 24px"
                >
                    <p class="display-6">
                        {{ movieToEdit?.id ? 'Update movie' : 'Add movie' }}
                    </p>
                </div>
                <div
                    class="modal-body  text-white"
                    style="padding: 24px"
                >
                    <form 
                        id="movie"
                        class="d-flex flex-column"
                        style="gap: 20px !important;"
                        @submit.prevent="submitMovie"
                    >
                        <div>
                            <p class="h5">
                                Title
                            </p>
                            <input
                                v-model.trim="movie['title']"
                                required
                                class="form-control"
                                type="text"
                            >
                        </div>
                        <div>
                            <p class="h5">
                                Description
                            </p>
                            <textarea 
                                v-model.trim="movie['description']"
                                required 
                                class="form-control" 
                                style="height: 200px !important; vertical-align: top;"
                            />
                        </div>
                        <div>
                            <p class="h5">
                                Thumbnail
                            </p>
                            <template v-if="movie['thumbnail']">
                                <img
                                    :src=" movie['thumbnail']?.url ?? movie['thumbnail']"
                                    class="mb-4 img-thumbnail"
                                >
                            </template>
                            <input
                                id="vide-upload"
                                type="file"
                                class="d-none"
                                accept=".png,.jpg"
                                @change="handleFileSelect({ e: $event, key: 'thumbnail'})"
                            >
                            <label
                                for="vide-upload"
                                class="btn bg-danger-subtle w-100"
                            >
                                <i class="bi bi-upload me-2" />
                                Upload
                            </label>
                        </div>
                        <div>
                            <p class="h5">
                                Movie
                            </p>
                            <template v-if="movie['video_file']">
                                <video
                                    ref="videoPlayer"
                                    controls
                                    class="mb-3 img-thumbnail"
                                >
                                    <source :src="movie['video_file']?.url ?? movie['video_file']">
                                </video>
                            </template>
                            <input
                                id="video-upload"
                                type="file"
                                class="d-none"
                                accept=".mp4"
                                @change="handleFileSelect({ e: $event, key: 'video_file'})"
                            >
                            <label
                                for="video-upload"
                                class="btn bg-danger-subtle w-100"
                            >
                                <i class="bi bi-upload me-2" />
                                Upload
                            </label>
                        </div>
                    </form>
                </div>
                <div
                    class="modal-footer"
                    style="padding: 24px"
                >
                    <button
                        class="btn btn-secondary"
                        @click="emitClose"
                    >
                        Close
                    </button>
                    <button
                        class="btn btn-danger"
                        form="movie"
                        type="submit"
                        :disabled="isUploading"
                    >
                        <p v-if="!isUploading">
                            Submit
                        </p>
                        <div
                            v-else
                            class="spinner-border spinner-border-sm" 
                            role="status"
                        />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    input, textarea {
        width: 100% !important;
        color: black !important;
    }
    button {
        padding: 12px;
        width: 116px;
    }

    label {
        padding: 12px;
    }
</style>