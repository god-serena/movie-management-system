<script setup>
    import { ref, onMounted, nextTick } from 'vue'
    import { Modal } from 'bootstrap'

    const props = defineProps({
        video: {
            type: Object,
            default: () => ({})
        }
    })
    const emits = defineEmits(['close'])
    const modalEl = ref(null)
    let modal = null

    onMounted(() => {
        modal = new Modal(modalEl.value)
        modal.show()
    })

    function closeModal() {
        modal.hide()
        emits('close')
    }
</script>

<template>
    <div
        ref="modalEl"
        class="modal fade"
        data-bs-backdrop="static"
    >
        <div
            class="modal-dialog modal-dialog-centered modal-xl"
        >
            <div class="modal-content bg-dark">
                <div
                    class="modal-header text-white"
                    style="padding: 24px"
                >
                    <p class="display-6">
                        {{ video?.title }}
                    </p>
                </div>
                <div
                    class="modal-body"
                    style="padding: 24px"
                >
                    <video
                        v-if="video?.id"
                        controls
                        class="img-thumbnail"
                    >
                        <source
                            :src="video?.video_file"
                            type="video/mp4"
                        >
                    </video>
                </div>
                <div
                    class="modal-footer"
                    style="padding: 24px"
                >
                    <button
                        class="btn btn-secondary"
                        @click="closeModal"
                    >
                        Close
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