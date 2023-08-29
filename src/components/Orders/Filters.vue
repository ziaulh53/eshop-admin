<template>
    <h4 class="text-lg font-semibold">Filters</h4>
    <div class="bg-slate-200 p-5 rounded-md">
        <div class="grid grid-cols-4 gap-x-5">
            <div>
                <div class="mb-2 font-bold">Date range</div>
                <a-range-picker size="large" @change="handleDatePicker" />
            </div>
            <EShopInput type="text" label="Order ID" v-model="filterState.orderId" />
            <EShopInput type="text" label="Status" v-model="filterState.status"/>
            <EShopInput type="text" label="Email" v-model="filterState.email"/>
            <EShopInput type="text" label="Phone" v-model="filterState.phone"/>
        </div>
        <div class="text-end">
            <EShopButton btn-text="Clear" classes="mr-5" :onclick="handleSubmit" />
            <EShopButton btn-text="Search" classes="" :onclick="handleSubmit"/>
        </div>
    </div>
</template>

<script setup>
import { ref, toRefs } from 'vue';
import { EShopButton, EShopInput } from '../shared';

const props = defineProps({
    filterSubmit: Function
})
const { filterSubmit } = toRefs(props)
const filterState = ref({
    startDate: '',
    endDate: '',
    orderId: '',
    status: '',
    email: '',
    phone: ''
})
const handleDatePicker = (value) => {
    if (value) {
        filterState.value.startDate = moment(new Date(value[0])).startOf('day').toDate();
        filterState.value.endDate =  moment(new Date(value[1])).startOf('day').toDate();
        console.log(value)
    } else {
        filterState.value.startDate = '';
        filterState.value.endDate = '';
    }
}

const handleSubmit = () => {
    filterSubmit.value(filterState.value)
}
</script>