<template>
    <div class="header-container">
        <div class="left-shadow-line"></div>
        <div>
            <div class="raw-header">
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
            <div class="horizontal-shadow-line"></div>
        </div>
        <div class="right-shadow-line"></div>
    </div>
</template>

<style>
.header-container {
    position: fixed;
    display: flex;
    top: 0;
    right: 10vw;
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