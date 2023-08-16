<template>
    <EShopButton btn-text="Add Product" iconClass="fa-solid fa-plus" :onclick="handleOpen" />
    <a-modal v-model:open="open" title="New Product Form" width="80%" wrap-class-name="w-full" :mask-closable="false">
        <div class="grid grid-cols-4 gap-5">
            <EShopInput label="Name" name="name" :v-model="productData.name" />
            <EShopInput label="Price" name="price" :v-model="productData.price" />
            <EShopInput label="Discount Price" name="discountPrice" :v-model="productData.discountPrice" />
            <EShopInput label="Quantity" name="quantity" :v-model="productData.quantity" />
        </div>
        <div class="grid grid-cols-2">
            <div>
                <div class="mb-2 font-bold"><label>Color</label></div>
                <a-collapse v-model:activeKey="activeKey" :bordered="false">
                    <template #expandIcon="{ isActive }">
                        <caret-right-outlined :rotate="isActive ? 90 : 0" />
                    </template>
                    <a-collapse-panel v-for="color of productData.colors" :key="color.colorName" :header="color.colorName"
                        :style="customStyle">
                        <p>{{ color.colorName }}</p>
                    </a-collapse-panel>
                    <a-collapse-panel key="form" header="ADD" :style="customStyle">
                        <EShopInput type="text" label="Color Name" v-model="colorState.colorName" />
                        <EShopInput type="text" label="Color Code" v-model="colorState.colorCode" />
                        <EShopInput type="number" label="Quantity" v-model="colorState.quantity" />
                        <div class="mb-2">
                            <div class="mb-2 font-bold">Product images</div>
                            <div v-for="url of colorState.images" :key="url">
                                <img :src="url" class="h-[150px] w-[100px]" />
                            </div>
                            <div v-if="!colorState.images.length"
                                class="h-[200px] w-[150px] border-dashed border-2 bg-slate-100"></div>
                            <div class="mt-5">
                                <input type="file" multiple :onchange="handleFile" />
                            </div>
                        </div>
                        <EShopButton btn-text="Add" classes="w-full" :onclick="handleAddColor" :disabled="disabledColor" />
                    </a-collapse-panel>
                </a-collapse>
            </div>

        </div>
    </a-modal>
</template>

<script setup>
import { ref, toRefs, computed } from 'vue';
import { CaretRightOutlined } from '@ant-design/icons-vue';
import { EShopButton, EShopInput } from '../shared';
import { api } from '../../api';

const props = defineProps({
    refetch: Function,
    categoryId: String
});
const { refetch, categoryId } = toRefs(props)
const open = ref(false);
const productData = ref({
    name: '',
    price: '0',
    discountPrice: '0',
    discountAvailable: false,
    quantity: '0',
    colors: [],
    descriptions: '',
    brand: '',
    category: categoryId.value
});
const colorState = ref({
    colorName: '',
    colorCode: '',
    images: [],
    quantity: '0'
})
const activeKey = ref(['1']);
const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`;
const customStyle =
    'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden';

const handleOpen = () => {
    open.value = true;
}


// color
const disabledColor = computed(() => !colorState.value.colorName || !colorState.value.colorName || !colorState.value.quantity || !colorState.value.images.length)
const handleAddColor = () => {

    let colors = productData.value.colors;
    const { colorName, colorCode, images, quantity } = colorState.value;
    colors.push({ colorName, colorCode, images, quantity:Number(quantity) });
    productData.value.colors = colors;
    colorState.value = {
        ...colorState.value,
        colorName: '',
        colorCode: '',
        images: [],
        quantity: 0
    }
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
const handleSubmit = async ()=>{

}

</script>