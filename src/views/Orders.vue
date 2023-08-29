<template>
    <Layout>
        <PageTitle title="All orders" />
        <!-- {{ allOrders }} -->
        <a-table :columns="columns" :data-source="allOrders?.result" :loading="loading">
            <template #bodyCell="{ column, record, index }">
                <template v-if="column.key === 'serial'">
                    <p>{{ index + 1 }}</p>
                </template>
                <template v-if="column.key === 'createdAt'">
                    <p>Date: {{ moment(record?.createdAt).format('DD/MM/YY') }}</p>
                    <p>Time: {{ moment(record.createdAt).format('LT') }}</p>
                </template>
                <template v-if="column.key === 'email'">
                    <p>{{ record?.user?.email }}</p>
                </template>
                <template v-if="column.key === 'phone'">
                    <p>{{ record?.shippingAddress?.phone }}</p>
                </template>
                <template v-if="column.key === 'price'">
                    <p>{{ totalPriceEachOrder(record?.items) }}</p>
                </template>
                <template v-if="column.key === 'status'">
                    <a-tag :color="getStatusColor(record.status)" class="text-sm">{{ record?.status }}</a-tag>
                </template>
                <template v-if="column.key === 'action'">
                    <router-link :to="'/order-details/' + record?._id">
                        <span class="text-blue-500 font-semibold underline">Details</span>
                    </router-link>
                </template>
            </template>
        </a-table>
    </Layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Layout } from '../components/Layout';
import { api, orderEndpoint } from '../api';
import { PageTitle } from '../components/shared';
import { ORDER_STATUS } from '../constant'
import moment from 'moment'
import { getStatusColor } from '../helpers';
const allOrders = ref({});
const loading = ref(false);

const fetchOrders = async () => {
    loading.value = true
    try {
        allOrders.value = await api.get(orderEndpoint.getOrders);
    } catch (error) {
        console.log(error)
    }
    loading.value = false;
}

onMounted(() => {
    fetchOrders();
})

const columns = [
    {
        title: '#',
        key: 'serial'
    },
    {
        title: 'Created At',
        key: 'createdAt'
    },
    {
        title: '#Order ID',
        dataIndex: 'orderId',
        key: 'orderId'
    },
    {
        title: 'Email',
        key: 'email'
    },
    {
        title: 'Phone',
        key: 'phone'
    },
    {
        title: 'Price',
        key: 'price'
    },
    {
        title: 'Status',
        key: 'status'
    },
    {
        title: 'Action',
        key: 'action'
    },
];

const totalPriceEachOrder = (items = []) => {

    let price = 0;
    items.forEach(item => {
        price += (item?.discountAvailable ? item?.discountPrice : item?.price) * item?.quantity
    })
    return price;
}



</script>