<template>
    <h2 class="text-lg font-semibold uppercase mb-5">Order Items:</h2>
    <a-table :columns="columns" :data-source="[...data, { totalPrice, lastChild: true }]" :pagination="false">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'image'">
                <img v-if="!record.lastChild" :src="record?.colors?.images[0]" class="w-[100px] h-[100px]" />
            </template>
            <template v-if="column.key === 'unit-price'">
                <span v-if="!record.lastChild">USD {{ record?.discountAvailable ? record?.discountPrice : record?.price
                }}</span>
            </template>
            <template v-if="column.key === 'price'">
                <span v-if="!record.lastChild" class="text-right">USD {{ (record?.discountAvailable ?
                    record?.discountPrice
                    : record?.price) * record.quantity }}</span>
                <span v-if="record.lastChild" class="text-base font-bold">Total Price: USD {{ totalPrice }}</span>
            </template>
        </template>
    </a-table>
</template>

<script setup>
import { ref, toRefs, onMounted } from 'vue';

const props = defineProps({
    data: Array
})
const { data } = toRefs(props)
const totalPrice = ref(0);

onMounted(() => {
    data.value?.forEach(prod => {
        totalPrice.value += (prod?.dicountAvailable ? prod?.discountPrice : prod?.price) * prod?.quantity
    })
})


const columns = [
    {
        title: '#',
        key: 'image',
    },
    {
        title: 'Product',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Unit Price',
        key: 'unit-price',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity'
    },
    {
        title: 'Price',
        key: 'price',
    },

]
</script>