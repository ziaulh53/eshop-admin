<template>
    <Layout>
        <PageTitle title="Order details" />
        <div class="grid grid-cols-2 gap-5 mb-5">
            <div>
                <h2 class="text-lg font-semibold mb-5">#ORDER ID:
                    <span v-if="!loading" class="bg-white px-4 py-1 border border-gray-300 text-gray-500">{{
                        orderData?.result?.orderId
                    }}</span>
                </h2>
                <div class="mb-3">
                    <AddressDetails v-if="!loading" :data="orderData?.result?.shippingAddress" title="Shipping Details" />
                </div>

                <a-card v-if="!orderData?.logistics" class="border border-gray-300">
                    <h2 class="text-lg font-semibold uppercase mb-5">Logistic Details:</h2>
                    <div>
                        <p class="text-base">Name: <span class="font-bold">REDX</span></p>
                        <div class="text-base">Tracking: <a href="https://www.facebook.com" target="_blank" class="text-blue-600">Click Here</a></div>
                    </div>
                </a-card>
            </div>
            <div>
                <Status :data="orderData?.result" :refetch="fetchOrderDetails" />
                <AddressDetails v-if="!loading"
                    :data="{ ...orderData?.result?.billingAddress, ...orderData?.result?.payment }" title="Billing Details"
                    type="billing" />
            </div>
        </div>
        <div class="mb-5">
            <OrderItems v-if="Array.isArray(orderData?.result?.items) && !loading" :data="orderData?.result?.items" />
        </div>
    </Layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { api, orderEndpoint } from '../api';
import { Layout } from '../components/Layout';
import { AddressDetails, OrderItems, Status } from '../components/OrderDetails'
import { PageTitle } from '../components/shared';

const route = useRoute()
const orderData = ref({})
const fetchOrderDetails = async () => {
    try {
        orderData.value = await api.get(orderEndpoint.getOrders + route.params.id)
    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    fetchOrderDetails();
})

</script>