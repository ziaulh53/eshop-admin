<template>
    <div @click="handleModal"><i class="fa-solid fa-pen-to-square"></i></div>
    <a-modal v-model:open="open" title="Basic Modal" :ok-button-props="{ disabled: disabled || loading }"
        @ok="() => handleSubmit(data?._id)" @cancel="handleClose">
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
import { ref, toRefs, computed } from 'vue';
import { api, brand } from '../../../api';
import { notify } from '../../../helpers';

const props = defineProps({
    data: Object,
    refetch: Function
})
const { data, refetch } = toRefs(props)
const open = ref(false)
const loading = ref(false)
const colorData = ref({ ...data.value })

const disabled = computed(() => !colorData.value.name)

const handleModal = () => {
    open.value = true;
}
const handleClose = () => {
    open.value = false
}

// api call
const handleSubmit = async (id) => {
    loading.value = true;
    try {
        const { name, logo } = colorData.value;
        const res = await api.put(brand.editBrand, id, { name, logo });
        notify(res);
        handleClose();
        refetch.value();
    } catch (error) {
        console.log(error)
    }
    loading.value = false
}

</script>