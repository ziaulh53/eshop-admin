<template>
    <EShopButton btn-text="Add Product" iconClass="fa-solid fa-plus" :onclick="handleOpen" />
    <a-modal v-model:open="open" title="New Product Form" width="80%" wrap-class-name="w-full" :mask-closable="false"
        @ok="handleSubmit">
        <div class="grid grid-cols-4 gap-5">
            <EShopInput label="Name" name="name" v-model="productData.name" />
            <EShopInput label="Price" name="price" v-model="productData.price" />
            <div class="mb-5">
                <div class="font-bold mb-2">Discount Availability</div>
                <a-checkbox v-model:checked="productData.discountAvailable">Yes</a-checkbox>
            </div>
            <EShopInput label="Discount Price" name="discountPrice" v-model="productData.discountPrice"
                :disabled="!productData.discountAvailable" />
        </div>
        <div class="grid grid-cols-4 gap-5">
            <div class="col-span-2">
                <div class="mb-2 font-bold"><label>Color</label></div>
                <a-collapse v-model:activeKey="activeKey" :bordered="false">
                    <template #expandIcon="{ isActive }">
                        <caret-right-outlined :rotate="isActive ? 90 : 0" />
                    </template>
                    <a-collapse-panel v-for="(color, idx) of productData.colors" :key="color.colorName"
                        :header="color.colorName" :style="customStyle">
                        <EditColor :colorstate="color" :handleUpdateColor="handleColorEdit" :idx="idx" />
                    </a-collapse-panel>
                    <a-collapse-panel key="form" header="ADD" :style="customStyle">
                        <EShopInput type="text" label="Color Name" v-model="colorState.colorName" />
                        <EShopInput type="text" label="Color Code" v-model="colorState.colorCode" />
                        <EShopInput type="number" label="Quantity" v-model="colorState.quantity" />
                        <div class="mb-2">
                            <div class="mb-2 font-bold">Product images</div>
                            <div v-for="url of colorState.images" :key="url" class="inline-block mr-2">
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
            <div class="mb-5">
                <div class="mb-2 font-bold"><label>Brands</label></div>
                <div>
                    <a-select v-model:value="productData.brands" placeholder="Inserted are removed"
                        class="w-full rounded-lg" size="large">
                        <a-select-option v-for="brand of categoryData?.brands" :key="brand._id" :value="brand._id">{{
                            brand.name
                        }}</a-select-option>
                    </a-select>
                </div>
            </div>
            <EShopInput label="Quantity" name="quantity" v-model="productData.quantity" />
        </div>
        <div class="grid grid-cols-2">
            <div class="mb-6">
                <div class="mb-2 font-bold"><label>Description</label></div>
                <div>
                    <quill-editor ref="content" :options="editorOptions" />
                </div>
            </div>
        </div>
    </a-modal>
</template>

<script setup>
import { ref, toRefs, computed } from 'vue';
import { CaretRightOutlined } from '@ant-design/icons-vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { EShopButton, EShopInput } from '../shared';
import { api, product } from '../../api';
import EditColor from './EditColor.vue';
import { notify } from '../../helpers';

const props = defineProps({
    refetch: Function,
    categoryData: Object
});
const { refetch, categoryData } = toRefs(props);
const open = ref(false);
const content = ref(null);
const productData = ref({
    name: '',
    price: '0',
    discountPrice: '0',
    discountAvailable: false,
    quantity: '0',
    colors: [],
    description: '',
    brands: '',
    category: categoryData.value?._id
});
const colorState = ref({
    colorName: '',
    colorCode: '',
    images: [],
    quantity: '0'
})
const activeKey = ref(['1']);
const customStyle =
    'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden';

const editorOptions = {
    modules: {
        toolbar: [
            [{ header: '1' }, { header: '2' }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
            ['clean'],
        ],
    },
};


const handleOpen = () => {
    open.value = true;
}


// color
const disabledColor = computed(() => !colorState.value.colorName || !colorState.value.colorName || !colorState.value.quantity || !colorState.value.images.length)
const handleAddColor = () => {

    let colors = productData.value.colors;
    const { colorName, colorCode, images, quantity } = colorState.value;
    colors.push({ colorName, colorCode, images, quantity: Number(quantity) });
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
const handleSubmit = async () => {

    try {
        const res = await api.post(product.createProduct, { productData: productData.value });
        notify(res, refetch.value);
        open.value = false
    } catch (error) {
        console.log(error)
    }

}


// color edit
const handleColorEdit = (data, idx) => {
    productData.value.colors[idx] = { ...productData.value.colors[idx], ...data };
    notify({ success: true, msg: 'Updated' })
}

</script>