<template>
    <EShopInput type="text" label="Color Name" v-model="colorState.colorName" />
    <EShopInput type="text" label="Color Code" v-model="colorState.colorCode" />
    <EShopInput type="number" label="Quantity" v-model="colorState.quantity" />
    <div class="mb-2">
        <div class="mb-2 font-bold">Product images</div>
        <div v-for="url of colorState.images" :key="url" class="inline-block mr-2">
            <img :src="url" class="h-[150px] w-[100px]" />
        </div>
        <div v-if="!colorState.images.length" class="h-[200px] w-[150px] border-dashed border-2 bg-slate-100"></div>
        <div class="mt-5">
            <input type="file" multiple :onchange="handleFile" />
        </div>
    </div>
    <EShopButton btn-text="Update" :disabled="disabledColor" classes="w-full" :onclick="handleEditColor" />
</template>

<script setup>
import { ref, toRefs, computed } from 'vue';
import { EShopButton, EShopInput } from '../shared';
import { api } from '../../api';

const props = defineProps({
    colorstate: Object,
    handleUpdateColor: Function,
    idx: Number
});
const { colorstate, handleUpdateColor, idx } = toRefs(props);
const colorState = ref({
    colorName: colorstate.value.colorName,
    colorCode: colorstate.value.colorCode,
    images: colorstate.value.images,
    quantity: colorstate.value.quantity
})


// color
const disabledColor = computed(() => !colorState.value.colorName || !colorState.value.colorName || !colorState.value.quantity || !colorState.value.images.length)
const handleEditColor = () => {
    const { colorName, colorCode, images, quantity } = colorState.value;
    colorState.value = { colorName, colorCode, images, quantity: Number(quantity) };
    handleUpdateColor.value(colorState.value, idx.value)
}

const handleFile = async (e) => {
    let images = colorState.value.images;
    try {
        const files = e.target.files;
        console.log(files, e.target.files)
        for (var i = 0; i < files.length; i++) {
            const res = await api.fileUpload(files[i]);
            images.push(res.result.url);
        }
        colorState.value.images = images;
    } catch (error) {
        console.log(error)
    }
}

// submit 
// const handleSubmit = async () => {
//     console.log(productData.value)
// }

</script>