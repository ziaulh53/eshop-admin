<template>
    <div class="my-5">
        <CreateColor :refetch="getAllColors" />
    </div>
    <a-spin :spinning="loading">
        <a-table :dataSource="dataSource" :columns="columns">
            <template #action="{ record }">
                <a-popconfirm>
                    <span class="mr-2">
                        <i class="fa-solid fa-trash-can text-red-500"></i>
                    </span>
                </a-popconfirm>
                <i class="fa-solid fa-pen-to-square"></i>
            </template>
        </a-table>
    </a-spin>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { api, brand } from '../../../api';
import CreateColor from './CreateColor.vue';
import ColorsItem from './ColorsItem.vue';

const allColors = ref('');
const loading = ref(false);

const columns = [
    {
        title: 'Color Name',
        dataIndex: 'colorName',
        key: 'colorName'
    },
    {
        title: 'Color Code',
        dataIndex: 'colorCode',
        key: 'colorCode'
    },
    {
        title: 'Action',
        key: 'action',
        slots: { customRender: 'action' },
    }

]

const dataSource = [
    { colorName: "Red", colorCode: "dfdfdf" }
]


const getAllColors = async () => {
    loading.value = true;
    allColors.value = await api.get(brand.getBrands);
    loading.value = false
}

onMounted(() => {
    getAllColors();
})

</script>