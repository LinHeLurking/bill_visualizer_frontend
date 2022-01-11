<script lang="ts">
import { defineComponent, ref, inject, Ref } from "vue";
import { NCard, NSpace, NInput, NDivider, NButton, useMessage } from "naive-ui";

export default defineComponent({
    components: {
        NCard,
        NSpace,
        NInput,
        NDivider,
        NButton,
    },
    setup() {
        const userNameRef = ref("");
        const passwordRef = ref("");
        const sharedToken = inject("sharedToken") as Ref<string>;
        const message = useMessage();
        const logIn = function () {
            const userName = userNameRef.value;
            const password = passwordRef.value;
            const xhr = new XMLHttpRequest();
            xhr.onloadend = function () {
                if (xhr.status == 404) {
                    message.error("接口访问异常")
                }
            };
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    console.log(xhr.response);
                    if (xhr.status == 200 && xhr.response.result == true) {
                        message.success("登录成功");
                        sharedToken.value = xhr.response.token;
                    }
                }
            };
            xhr.open("POST", "/api/login", true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({
                uuid: userName,
                token: password,
            }));
        }
        return {
            userName: userNameRef,
            password: passwordRef,
            logIn,
        };
    }
})
</script>

<template>
    <n-card title="登陆账号" vertical>
        <n-space horizontal>
            <div class="item">用户名</div>
            <n-input v-model:value="userName" type="text" />
        </n-space>
        <n-divider />
        <n-space horizontal>
            <div class="item">密码</div>
            <n-input
                v-model:value="password"
                type="password"
                show-password-on="mousedown"
                placeholder="Password"
            />
        </n-space>
        <div style="height: 20px;"></div>
        <n-button type="primary" v-on:click="logIn">登录</n-button>
    </n-card>
</template>

<style>
.item {
    width: 100px;
}

.n-card {
    max-width: 400px;
    margin: 0 auto;
    margin-top: 100px;
}
</style>