<template>
    <Layout>
        view dashboard
        <button @click="useStore.userLogout()">Logout</button>
    </Layout>
</template>

<script setup>
import { Layout } from '../components/Layout';
import { useAuthStore } from '../store';

const useStore = useAuthStore();
</script>