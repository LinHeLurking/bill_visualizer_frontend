<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    computed: {
        queryId() {
            return this.$route.params.queryId;
        }
    }
})
</script>


<template>
    <div class="analysis-page">
        <h2>账单分析页面内容</h2>
        <h3>账单：{{ queryId }}</h3>
    </div>
</template>

<style>
.analysis-page {
    height: 20vh;
}
</style>