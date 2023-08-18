<template>
    <EShopButton btn-text="Add Color" iconClass="fa-solid fa-plus" :onclick="handleModal" />
    <a-modal v-model:open="open" title="Basic Modal" @ok="() => handleSubmit(refetch)"
        :ok-button-props="{disabled: disabled || loading, loading: loading}">
        <div class="mb-5">
            <div class="mb-2 font-bold"><label>Name</label></div>
            <input type="text" class="w-full border-2 border-gray-300 rounded-lg p-2 px-4" placeholder=""
                v-model="colorData.name" name="name" />
        </div>
        <div class="mb-5">
            
        </div>
    </a-modal>
</template>

<script setup>
import { ref, computed, toRefs } from 'vue'
import { EShopButton } from '../../shared';
import { api, brand } from '../../../api';
import { notify } from '../../../helpers';
const props = defineProps({
    refetch: Function
})
const {refetch} = toRefs(props)
const open = ref(false);

const colorData = ref({ name: '', logo: '' })
const loading = ref(false)
const disabled = computed(() => !colorData.value.name);
const handleSubmit = async () => {
    loading.value = true;
    try {
        const res = await api.post(brand.createBrand, { ...colorData.value })
        if (res.success) {
            notify(res);
            refetch.value();
            open.value = false;
        }

    } catch (error) {
    }
    loading.value = false
}


const handleModal = () => {
    open.value = true;
}




</script>