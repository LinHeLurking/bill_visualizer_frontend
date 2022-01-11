<script lang="ts">
import { defineComponent, ref } from "vue";
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
        const passwordConfirmRef = ref("");
        const message = useMessage();
        // console.log(message);

        const signUp = function () {
            if (passwordRef.value != passwordConfirmRef.value) {
                message.error("两次输入密码不一致");
            } else {
                const password = passwordRef.value;
                const userName = userNameRef.value;
                const xhr = new XMLHttpRequest();
                xhr.onloadend = function () {
                    if (xhr.status == 404) {
                        message.error("接口访问异常")
                    }
                };
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        const json = JSON.parse(xhr.responseText);
                        console.log(json);
                        message.success("注册成功");
                    }
                };
                xhr.open("POST", "/register", true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({
                    uuid: userName,
                    token: password,
                }));
            }
        }

        return {
            userName: userNameRef,
            password: passwordRef,
            passwordConfirm: passwordConfirmRef,
            signUp,
        };
    },
})
</script>


<template>
    <n-card title="注册账号" vertical>
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
        <n-divider />
        <n-space horizontal>
            <div class="item">密码确认</div>
            <n-input
                v-model:value="passwordConfirm"
                type="password"
                show-password-on="mousedown"
                placeholder="Password"
            />
        </n-space>
        <div style="height: 20px;"></div>
        <n-button type="primary" v-on:click="signUp">注册</n-button>
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