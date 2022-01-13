<script lang="ts">
import { defineComponent, inject, Ref } from "vue";
import { LogoWechat } from "@vicons/ionicons5";
import { Alipay } from "@vicons/fa";
import { NUpload, NUploadDragger, NIcon, NText, NCard, NDivider, NButton, useMessage, UploadFileInfo } from "naive-ui";
import router from "../router";

interface FinishPara {
    file: UploadFileInfo,
    event: Event
};

interface BeforeUploadPara {
    file: UploadFileInfo,
    fileList: Array<UploadFileInfo>,
};

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
            try {
                router.push("/analysis");
            } catch (error) {
                console.log("Jump failed: " + String(error));
            }
        };
        const additionalHeader = {
            "Cache-Control": "max-age=0",
            "Upgrade-Insecure-Requests": "1"
        };
        const handleFinish = function (opt: FinishPara) {
            message.success("上传成功");
            return opt.file;
        };
        const beforeUpload = async function (opt: BeforeUploadPara) {
            const ext = opt.file.name.split('.')[1]
            opt.file.name = `user_${currentUser.value}.${ext}`
            return true;
        }
        const getUserUploadTarget = function (target: string) {
            if (currentUser.value == "") {
                return "upload.php";
            } else {
                return `/data/${currentUser.value}/${target}/upload.php`;
            }
        }
        const acceptStr = ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel";
        return {
            gotoAnalysisPage,
            acceptStr,
            additionalHeader,
            handleFinish,
            beforeUpload,
            getUserUploadTarget,
        };
    },
});
</script>

<template>
    <!-- <form action="upload.php" method="post" enctype="multipart/form-data">
        <label for="file">文件名：</label>
        <input type="file" name="file" id="file" />
        <br />
        <input type="submit" name="submit" value="提交" />
    </form>-->
    <n-card title="账单分析">
        <div class="upload-container-outer">
            <div class="upload-container-inner">
                <n-upload
                    :action="getUserUploadTarget('alipay')"
                    :default-upload="true"
                    :accept="acceptStr"
                    :multiple="false"
                    :headers="additionalHeader"
                    @finish="handleFinish"
                    @before-upload="beforeUpload"
                >
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
                <n-upload
                    :action="getUserUploadTarget('wechat')"
                    :default-upload="true"
                    :accept="acceptStr"
                    :multiple="false"
                    :headers="additionalHeader"
                    @finish="handleFinish"
                    @before-upload="beforeUpload"
                >
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
        <div style="margin-top: 10px; font-size:12px;">登陆后可以直接查看上次的分析结果</div>
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