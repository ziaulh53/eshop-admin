<template>
    <Layout>
        <PageTitle title="All orders" />
        <div class="mb-5">
            <OrderFilters :filter-submit="fetchOrders"/>
        </div>
        <OrderTable :all-orders="allOrders?.result" :loading="loading"  />
    </Layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Layout } from '../components/Layout';
import { api, orderEndpoint } from '../api';
import { PageTitle } from '../components/shared';
import { OrderFilters, OrderTable } from '../components/Orders'
const allOrders = ref({});
const loading = ref(false);

const fetchOrders = async (filters) => {
    loading.value = true
    console.log(filters)
    try {
        allOrders.value = await api.get(orderEndpoint.getOrders,  filters);
    } catch (error) {
        console.log(error)
    }
    loading.value = false;
}

onMounted(() => {
    fetchOrders();
})


</script>