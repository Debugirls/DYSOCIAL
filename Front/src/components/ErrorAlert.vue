<template>
    <div v-if="showAlert">
        <div class="alert error-box alert-dismissible fade show" role="alert">
            <div class="error-text">
                <slot name="text"></slot>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeAlert">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
    name: 'ErrorAlert',
    data(){
        return {
            showAlert: true
        }
    },
    methods: {
        closeAlert(){
            this.showAlert = false
        }
    }
    });
</script>

<style scoped>
.error-text{
    font-weight: 500;
    color: var(--color-alert300);
}

.error-box{
    background-color: var(--color-alert100);
    border-color: var(--color-alert200);;
}
</style>
