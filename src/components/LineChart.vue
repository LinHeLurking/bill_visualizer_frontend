<script lang="ts">
import { defineComponent } from "vue";
import ChartBase from "./ChartBase.vue";

export default defineComponent({
    props: {
        title: String,
        xyValuePairs: Object,
        xKeyName: String,
        yKeyName: String,
        chartId: String,
        color: String,
    },
    components: {
        ChartBase
    }
})
</script>

<template>
    <div class="bar-chart-container">
        <ChartBase
            type="line"
            :xy-value-pairs="xyValuePairs"
            :xKeyName="xKeyName"
            :yKeyName="yKeyName"
            :chartId="chartId"
            :color="color"
        />
    </div>
</template>