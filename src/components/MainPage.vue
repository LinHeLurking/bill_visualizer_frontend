<script>
import { defineComponent } from "vue";
import { ArchiveOutline as ArchiveIcon, LogoWechat } from "@vicons/ionicons5";
import { Alipay } from "@vicons/fa";
import { NUpload, NUploadDragger, NIcon, NText } from "naive-ui";

export default defineComponent({
    components: {
        Alipay,
        LogoWechat,
        NUpload,
        NUploadDragger,
        NIcon,
        NText,

    }
});
</script>

<template>
    <div class="main-page">
        <h2>主页内容</h2>
    </div>
    <div>
        <!-- <router-link to="/analysis">
            <div>分析账单</div>
        </router-link>-->
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
        <div class="upload-container-outer">
            <div class="upload-container-inner">
                <n-upload action>
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
        <div>登陆后分析账单</div>
    </div>
</template>

<style>
.main-page {
    height: 20vh;
}

.upload-container-outer {
    width: 100%;
}

.upload-container-inner {
    width: 30%;
    margin: 0 auto;
}
</style>