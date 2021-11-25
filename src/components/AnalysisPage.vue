<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { NDataTable } from "naive-ui";
import LineChart from "./LineChart.vue";

interface MonthlyCost {
    key: number,
    month: number,
    money: number,
};

export default defineComponent({
    components: {
        NDataTable,
        LineChart,
    },
    setup() {
        const route = useRoute()
        var queryId = "";
        var billTitle = "展示默认效果";
        if (route.params.queryId) {
            queryId = route.params.queryId as string;
        }
        const getMonthlyCost = (): MonthlyCost[] => {
            var cost: MonthlyCost[] = new Array();
            if (queryId != "") {
                // TODO: add API call here
            } else {
                var keyId = 0;
                for (let mo = 1; mo <= 12; mo++) {
                    cost.push({
                        key: keyId++,
                        month: mo,
                        money: Math.round(Math.random() * 2000)
                    });
                }
            }
            return cost;
        }
        const dataTableInstRef = ref(null);
        return {
            queryId: queryId,
            billTitle: billTitle,
            dataTableInstRef: dataTableInstRef,
            columns: [
                {
                    title: "Month",
                    key: "month",
                    sorter: {
                        compare: (a: MonthlyCost, b: MonthlyCost) => a.month - b.month,
                        multiple: 2,
                    }
                },
                {
                    title: "Money",
                    key: "money",
                    sorter: {
                        compare: (a: MonthlyCost, b: MonthlyCost) => a.money - b.money,
                        multiple: 1,
                    }
                },
            ],
            monthlyCost: getMonthlyCost(),
        };
    },
})
</script>


<template>
    <div class="analysis-page">
        <h2>账单分析页面内容</h2>
        <h3>账单：{{ billTitle }}</h3>
        <div class="monthly-cost-container">
            <div class="monthly-cost-table-container">
                <div class="monthly-cost-table-wrapper">
                    <n-data-table
                        :columns="columns"
                        :data="monthlyCost"
                        :single-line="false"
                        :max-height="300"
                        ref="dataTableInstRef"
                    />
                </div>
            </div>
            <div class="monthly-cost-line-chart-container">
                <div class="monthly-cost-line-chart-wrapper">
                    <line-chart
                        :xyValuePairs="monthlyCost"
                        xKeyName="month"
                        yKeyName="money"
                        title="Monthly Money Cost"
                        :chartId="'chart' + String(Math.floor(Math.random() * 1000))"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.monthly-cost-container{
    margin: auto;
    display: flex;
    margin-top: 40px;
}


.analysis-page {
    height: 20vh;
}

.monthly-cost-table-container {
    display: flex;
    width: 40%;
}

.monthly-cost-line-chart-container{
    display: flex;
    width: 60%;
}

.monthly-cost-table-wrapper {
    margin: auto;
    width: 60%;
    margin-right: 20px;
}

.monthly-cost-line-chart-wrapper {
    margin: auto;
    width: 80%;
    margin-left: 20px;
}
</style>