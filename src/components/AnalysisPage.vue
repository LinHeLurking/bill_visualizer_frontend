<script lang="ts">
import { defineComponent, ref, Ref, inject } from "vue";
import { useRoute } from "vue-router";
import { NDataTable, NSelect, SelectOption } from "naive-ui";
import LineChart from "./LineChart.vue";
import BarChart from "./BarChart.vue";

interface MonthlyCost {
    key: number,
    month: string,
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
    setup() {
        const sharedToken = inject("sharedToken") as Ref<string>;
        const currentUser = inject("currentUser") as Ref<string>;

        const monthNames = ((): string[] => {
            var names: string[] = new Array();
            const xhr = new XMLHttpRequest();
            xhr.open("GET", `/api/monthOutcome?uuid=${currentUser.value}&token=${sharedToken.value}`, false); // false for synchronous request
            xhr.send(null);
            console.log(xhr.responseText);
            const json = JSON.parse(xhr.responseText);
            for (let i = 0; i < json.length; ++i) {
                names.push(String(json.month));
            }
            return names;
        })();

        const costCategories = (function () {
            const cost = new Array<CostCategory>();
            const xhr = new XMLHttpRequest();
            xhr.open("GET", `/api/sort?uuid=${currentUser.value}&token=${sharedToken.value}`, false); // false for synchronous request
            xhr.send(null);
            console.log(xhr.responseText);
            const json = JSON.parse(xhr.responseText);
            for (let i = 0; i < json.length; ++i) {
                cost.push({
                    category: String(json.category),
                    amount: Number(json.amount),
                    repeat: Number(json.repeat)
                });
            }
            cost.sort((a, b) => b.amount - a.amount);
            return cost;
        })();

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

        const monthlyCost = function (): MonthlyCost[] {
            var cost: MonthlyCost[] = new Array();
            const xhr = new XMLHttpRequest();
            xhr.open("GET", `/api/monthOutcome?uuid=${currentUser.value}&token=${sharedToken.value}`, false); // false for synchronous request
            xhr.send(null);
            console.log(xhr.responseText);
            const json = JSON.parse(xhr.responseText);
            var keyId = 0;
            for (let i = 0; i < json.len; ++i) {
                cost.push({
                    key: keyId++,
                    month: String(json.month),
                    money: Number(json.money)
                });
            }
            return cost;
        };

        const billTitle = currentUser.value + "的账单分析";

        const costAmountSelectedMonth = ref(monthNames[0]);
        const costRepeatSelectedMonth = ref(monthNames[0]);
        return {
            costAmountSelectedMonth,
            costRepeatSelectedMonth,
            monthSelectorOptions,
            monthlyCost,
            costCategories,
            billTitle,
        };
    },
    data() {
        const route = useRoute()
        var queryId = "";
        var showDefault = true;
        const queryName = this.currentUser;

        if (route.params.queryId) {
            queryId = route.params.queryId as string;
            showDefault = false;
        }

        const dataTableInstRef = ref(null);

        const columns = [
            {
                title: "Month",
                key: "month",
                sorter: {
                    compare: (a: MonthlyCost, b: MonthlyCost) => a.month < b.month ? -1 : (a > b ? 1 : 0),
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


        return {
            queryId,
            showDefault,
            queryName,
            costTableColumns: columns,
            dataTableInstRef,
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
                <div>每月支出</div>
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
                    <div>支出趋势</div>
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
                    <div>总量最多的消费</div>
                    <!-- <div class="month-selector">
                        <div class="month-selector">
                            <n-select
                                v-model:value="costAmountSelectedMonth"
                                :options="monthSelectorOptions"
                            />
                        </div>
                    </div>-->
                    <div class="monthly-cost-amount-chart">
                        <bar-chart
                            :xy-value-pairs="costCategories"
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
                    <div>次数最多的消费</div>
                    <!-- <div class="month-selector">
                        <n-select
                            v-model:value="costRepeatSelectedMonth"
                            :options="monthSelectorOptions"
                        />
                    </div>-->
                    <div class="monthly-cost-repeat-chart">
                        <bar-chart
                            :xy-value-pairs="costCategories"
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