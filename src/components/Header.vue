<script lang="ts">
import { defineComponent } from "vue";
import { Icon } from "@vicons/utils";
import { Home } from "@vicons/ionicons5";
import LogInSharp from "@vicons/material/LogInSharp";
import Signature20Regular from "@vicons/fluent/Signature20Regular";

export default defineComponent({
    components: {
        Icon,
        Home,
        LogInSharp,
        Signature20Regular,
    }
})
</script>


<template>
    <div class="header-container">
        <div class="raw-header">
            <div class="header-item">
                <!-- <div class="height-placeholder"></div> -->
                <router-link to="/">
                    <Icon size="20">
                        <Home />
                    </Icon>
                    <div class="header-text">Home</div>
                </router-link>
            </div>
            <div class="header-item">
                <!-- <div class="height-placeholder"></div> -->
                <router-link to="/login">
                    <Icon size="20">
                        <LogInSharp />
                    </Icon>
                    <div class="header-text">Sign In</div>
                </router-link>
            </div>
            <div class="header-item">
                <!-- <div class="height-placeholder"></div> -->
                <router-link to="/signup">
                    <Icon size="20">
                        <Signature20Regular />
                    </Icon>
                    <div class="header-text">Sign Up</div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style>
.header-container {
    position: sticky;
    margin: auto;
    z-index: 10;
}

.raw-header {
    width: 12%;
    height: 6vh;
    margin: auto;
    margin-right: 2%;
    display: flex;
    justify-content: space-evenly;
}

.horizontal-shadow-line {
    height: 8%;
    background-image: linear-gradient(180deg, rgb(212, 212, 212), white);
}

.left-shadow-line {
    width: 8%;
    background-image: linear-gradient(90deg, rgb(212, 212, 212), white);
}

.right-shadow-line {
    width: 8%;
    background-image: linear-gradient(270deg, rgb(212, 212, 212), white);
}

.header-item {
    margin: auto;
    margin-bottom: 0;
}

.height-placeholder {
    height: 20%;
}

.icon-secion {
    margin-left: 0;
    margin-right: auto;
}

.icon-place {
    margin-left: 5%;
}

.header-text {
    font-size: 14px;
}
</style>