<template>
    <RedboxUiLayoutAdmin id="is-open-sidebar">
        <template #header="{ isOpenSidebar, toggleSidebar }">
            <CommonHeader :isOpenSidebar="isOpenSidebar" :toggleSidebar="toggleSidebar" />
        </template>
        <template #main>
            <main class="main">
                <NuxtPage />
            </main>
        </template>
        <template #footer>
            <CommonFooter />
        </template>
        <template #sidebar="{ isOpenSidebar, closeSidebar }">
            <CommonSidebar :isOpenSidebar="isOpenSidebar" :closeSidebar="closeSidebar" />
        </template>
    </RedboxUiLayoutAdmin>
</template>
<style lang="scss">
.main {
    padding: 1.5rem;
    overflow: auto;
}
</style>