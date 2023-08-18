<template>
    <div class="hover:shadow-lg border-2 w-full p-5">
        <img :src="product?.colors[0].images[0] || '/assets/logo.png'" class="mb-5 w-full h-[250px] object-cover" />
        <div>
            <h6 class="text-lg mb-2">{{ product?.name }}</h6>
            <p class="font-semibold mb-2">Price: <span class="text-gray-500">USD {{ product?.discountAvailable ?
                product.discountPrice : product?.price }}</span> <span v-if="product?.discountAvailable"><s
                        class="text-gray-600">{{
                            product?.price }}</s></span></p>
            <div class="grid grid-cols-2 gap-5">
                <a-popconfirm @confirm="handleDelete" title="Are you sure?" ok-type="danger">
                    <EShopButton btn-text="DELETE" classes="bg-red-600 hover:bg-red-700"
                        icon-class="fa-solid fa-trash-can text-white" :onclick="() => { }" />
                </a-popconfirm>

                <EditProduct :refetch="refetch" :product-details="product"/>

            </div>
        </div>
    </div>
</template>


<script setup>
import { api, product as productEndpoint } from '../../api';
import { notify } from '../../helpers';
import { EShopButton } from '../shared';
import { toRefs } from 'vue';
import EditProduct from './EditProduct.vue';

const props = defineProps({
    product: Object,
    refetch: Function
})

const { refetch, product } = toRefs(props)

const handleDelete = async () => {
    console.log('dfdfd')
    try {
        const res = await api.delete(productEndpoint.deleteProduct, product.value._id);
        notify(res, refetch.value)
    } catch (error) {
        console.log(error)
    }
}

</script>