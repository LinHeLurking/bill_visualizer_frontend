<script lang="ts">
import { defineComponent } from "vue";
import $ from "jquery";
import Chart from "chart.js/auto";

export default defineComponent({
    props: {
        xyValuePairs: Object,
        xKeyName: String,
        yKeyName: String,
        chartId: String,
        title: String,
    },
    mounted() {
        var ctx = $(`#${this.chartId}`).get(0) as HTMLCanvasElement;
        // console.log($(`#${this.chartId}`));
        // console.log($(`#${this.chartId}`).get(0));
        const xValues = new Array();
        const yValues = new Array();
        if (this.xyValuePairs && this.xKeyName && this.yKeyName) {
            for (let i = 0; i < this.xyValuePairs.length; ++i) {
                xValues.push(this.xyValuePairs[i][this.xKeyName]);
                yValues.push(this.xyValuePairs[i][this.yKeyName]);
            }
        }
        const data = {
            labels: xValues,
            datasets: [{
                label: this.yKeyName,
                data: yValues,
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
            }],
        };
        const myChart = new Chart(ctx, {
            type: "line",
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                        position: "right",
                    },
                    title: {
                        display: true,
                        text: this.title,
                    },

                },
                interaction: {
                    intersect: false,
                },
            },
        });
    }
})
</script>

<template>
    <div class="line-chart-container">
        <canvas :id="chartId"></canvas>
    </div>
</template>