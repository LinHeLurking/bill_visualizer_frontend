<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { NDataTable, NSelect, SelectOption } from "naive-ui";
import LineChart from "./LineChart.vue";
import BarChart from "./BarChart.vue";

interface MonthlyCost {
    key: number,
    month: number,
    money: number,
};

interface CostCategory {
    category: string,
    amount: number,
    repeat: number,
};

export default defineComponent({
    components: {
        NDataTable,
        NSelect,
        LineChart,
        BarChart,
    },
    data() {
        const route = useRoute()
        var queryId = "";
        var showDefault = true;
        var queryName = "???"



        if (route.params.queryId) {
            // TODO: check api valid
            queryId = route.params.queryId as string;
            showDefault = false;
        }

        const dataTableInstRef = ref(null);

        const columns = [
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
        ];

        const monthNames = ((): number[] => {
            var names: number[] = new Array();
            if (!showDefault) {
                // TODO: add API call here
            } else {
                for (let m = 1; m <= 12; ++m) {
                    names.push(m);
                }
            }
            return names;
        })();

        const costAmountSelectedMonth = ref(monthNames[0]);
        const costRepeatSelectedMonth = ref(monthNames[0]);

        const monthSelectorOptions = ((): SelectOption[] => {
            const options = new Array<SelectOption>();
            const names = monthNames;
            for (let i = 0; i < names.length; ++i) {
                const mo = names[i];
                options.push({
                    label: String(mo),
                    value: mo,
                });
            }
            return options;
        })();

        return {
            queryId: queryId,
            showDefault: showDefault,
            queryName: queryName,
            costTableColumns: columns,
            dataTableInstRef: dataTableInstRef,
            costAmountSelectedMonth: costAmountSelectedMonth,
            costRepeatSelectedMonth: costRepeatSelectedMonth,
            monthSelectorOptions: monthSelectorOptions,
        };
    },
    computed: {
        billTitle(): string {
            if (this.showDefault) {
                return "展示默认效果";
            } else {
                return this.queryName.valueOf() + "的账单分析";
            }
        },
        monthlyCost(): MonthlyCost[] {
            var cost: MonthlyCost[] = new Array();
            if (!this.showDefault) {
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
        },
        costAmountCategories(): CostCategory[] {
            const cost = new Array<CostCategory>();
            if (!this.showDefault) {
                // TODO: add API call here
            } else {
                for (let t = 1; t < 8; ++t) {
                    cost.push({
                        category: "category " + String(t),
                        amount: Math.round(Math.random() * 1000) + this.costAmountSelectedMonth,
                        repeat: Math.round(Math.random() * 6),
                    });
                }
            }
            cost.sort((a, b) => b.amount - a.amount);
            return cost;
        },
        costRepeatCategories(): CostCategory[] {
            const cost = new Array<CostCategory>();
            if (!this.showDefault) {
                // TODO: add API call here
            } else {
                for (let t = 1; t < 8; ++t) {
                    cost.push({
                        category: "category " + String(t),
                        amount: Math.round(Math.random() * 1000),
                        repeat: Math.round(Math.random() * 6) + this.costRepeatSelectedMonth / 3,
                    });
                }
                cost.sort((a, b) => b.repeat - a.repeat);
            }
            return cost;
        },
    }
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
                        :columns="costTableColumns"
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
                        title="Monthly Money Cost Trendline"
                        chartId="monthly-cost-line-01"
                        color="#90dbf4"
                    />
                </div>
            </div>
        </div>

        <div class="monthly-cost-container">
            <div class="monthly-cost-amount-chart-container">
                <div class="monthly-cost-amount-chart-wrapper">
                    <div class="month-selector">
                        <div class="month-selector">
                            <n-select
                                v-model:value="costAmountSelectedMonth"
                                :options="monthSelectorOptions"
                            />
                        </div>
                    </div>
                    <div class="monthly-cost-amount-chart">
                        <bar-chart
                            :xy-value-pairs="costAmountCategories"
                            xKeyName="category"
                            yKeyName="amount"
                            title="What costs most"
                            chartId="category-amount-01"
                            color="#90dbf4"
                        />
                    </div>
                </div>
            </div>
            <div class="monthly-cost-repeat-chart-container">
                <div class="monthly-cost-repeat-chart-wrapper">
                    <div class="month-selector">
                        <n-select
                            v-model:value="costRepeatSelectedMonth"
                            :options="monthSelectorOptions"
                        />
                    </div>
                    <div class="monthly-cost-repeat-chart">
                        <bar-chart
                            :xy-value-pairs="costRepeatCategories"
                            xKeyName="category"
                            yKeyName="repeat"
                            title="How frequent it costs"
                            chartId="category-repeat-01"
                            color="#90dbf4"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.monthly-cost-container {
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

.monthly-cost-line-chart-container {
    display: flex;
    width: 60%;
}

.monthly-cost-amount-chart-container {
    display: flex;
    width: 50%;
}

.monthly-cost-amount-chart-wrapper {
    margin: auto;
    width: 80%;
    margin-right: 20px;
}

.monthly-cost-repeat-chart-container {
    display: flex;
    width: 50%;
}

.monthly-cost-repeat-chart-wrapper {
    margin: auto;
    width: 80%;
    margin-left: 20px;
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