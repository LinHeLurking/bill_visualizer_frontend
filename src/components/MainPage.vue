<script lang="ts">
import { defineComponent } from "vue";
import { LogoWechat } from "@vicons/ionicons5";
import { Alipay } from "@vicons/fa";
import { NUpload, NUploadDragger, NIcon, NText, NCard, NDivider, NButton } from "naive-ui";

export default defineComponent({
    components: {
        Alipay,
        LogoWechat,
        NUpload,
        NUploadDragger,
        NIcon,
        NText,
        NCard,
        NDivider,
    },
    setup() {
        const analyze = function () { };
        return {
            analyze: analyze,
        };
    },
});
</script>

<template>
    <n-card title="账单分析">
        <div class="upload-container-outer">
            <div class="upload-container-inner">
                <n-upload action="http://127.0.0.1:8000">
                    <n-upload-dragger>
                        <div style="margin-bottom: 12px;">
                            <n-icon size="48" :depth="3">
                                <alipay />
                            </n-icon>
                        </div>
                        <n-text style="font-size: 16px;">点击或拖拽上传支付宝账单</n-text>
                    </n-upload-dragger>
                </n-upload>
            </div>
        </div>
        <n-divider />
        <div class="upload-container-outer">
            <div class="upload-container-inner">
                <n-upload action="">
                    <n-upload-dragger>
                        <div style="margin-bottom: 12px;">
                            <n-icon size="48" :depth="3">
                                <logo-wechat />
                            </n-icon>
                        </div>
                        <n-text style="font-size: 16px;">点击或拖拽上传微信账单</n-text>
                    </n-upload-dragger>
                </n-upload>
            </div>
        </div>
        <div style="height: 20px;"></div>
        <n-button @click="analyze">分析账单</n-button>
    </n-card>
</template>

<style>
.main-page {
    height: 20vh;
}

.upload-container-outer {
    width: 100%;
}

.upload-container-inner {
    margin: 0 auto;
}

.n-card {
    max-width: 400px;
    margin: 0 auto;
    margin-top: 100px;
}
</style>