<template>
    <div class="header-container">
        <div class="raw-header">
            <div class="icon-secion">
                <div class="height-placeholder"></div>
                <div class="icon-place">
                    <div>[标志图]</div>
                </div>
            </div>
            <div class="log-section">
                <div class="log-in-item">
                    <div class="height-placeholder"></div>
                    <div>Sign In</div>
                </div>
                <div class="log-in-item">
                    <div class="height-placeholder"></div>
                    <div>Sign Up</div>
                </div>
            </div>
        </div>
        <div class="header-grad-bottom"></div>
    </div>
</template>

<style>
.header-container {
    position: sticky;
    top: 0;
    height: 10vh;
    z-index: 10;
}

.raw-header {
    width: 100%;
    margin-top: 0;
    top: 0px;
    background-color: white;
    display: flex;
    height: 90%;
}

.header-grad-bottom {
    height: 10%;
    background-image: linear-gradient(180deg, rgb(212, 212, 212), white);
}

.log-section {
    margin-right: 0;
    margin-left: auto;
    justify-content: flex-end;
    display: flex;
}

.log-in-item {
    margin-right: 5%;
    width: 80 px;
}

.height-placeholder {
    height: 30%;
}

.icon-secion {
    margin-left: 0;
    margin-right: auto;
}

.icon-place {
    margin-left: 5%;
}
</style>