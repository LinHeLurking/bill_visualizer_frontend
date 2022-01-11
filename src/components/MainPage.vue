<script lang="ts">
import { defineComponent, inject, Ref } from "vue";
import { LogoWechat } from "@vicons/ionicons5";
import { Alipay } from "@vicons/fa";
import { NUpload, NUploadDragger, NIcon, NText, NCard, NDivider, NButton, useMessage } from "naive-ui";
import router from "../router";

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
        NButton,
    },
    setup() {
        const sharedToken = inject("sharedToken") as Ref<string>;
        const currentUser = inject("currentUser") as Ref<string>;
        const message = useMessage();
        const gotoAnalysisPage = function () {
            const token = sharedToken.value;
            if (token == "") {
                message.warning("请注册后使用分析功能");
            }
            router.push({ name: "/analysis", params: { queryId: token } });
        };
        const getUserDataPath = function () {
            if (currentUser.value == "") {
                return "";
            } else {
                var str = "/data/" + currentUser.value;
                if (!str.endsWith("/")) {
                    str += "/";
                }
                return str;
            }
        };
        const getUserFileName = function () {
            if (currentUser.value == "") {
                return "user_default";
            } else {
                const str = "user_" + currentUser.value;
                return str;
            }
        };
        return {
            gotoAnalysisPage,
            getUserDataPath,
            getUserFileName,
        };
    },
});
</script>

<template>
    <n-card title="账单分析">
        <div class="upload-container-outer">
            <div class="upload-container-inner">
                <n-upload :action="getUserDataPath()" :name="getUserFileName()">
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
                <n-upload :action="getUserDataPath()" :name="getUserFileName()">
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
        <n-button type="primary" @click="gotoAnalysisPage">分析账单</n-button>
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