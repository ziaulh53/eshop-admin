<template>
    <Layout>
        <PageTitle title="Product" />
        <div class="my-5">
            <CreateProduct :refetch="fetchSingleCategory"/>
        </div>
        <div class="grid grid-cols-4 gap-5">
            <SingleProduct />
            <SingleProduct />
            <SingleProduct />
            <SingleProduct />
            <SingleProduct />
        </div>
    </Layout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Layout } from '../components/Layout';
import { api, category } from '../api';
import { useRoute } from 'vue-router'
import { PageTitle } from '../components/shared';
import { SingleProduct, CreateProduct } from '../components/Products'
const router = useRoute();
const categoryDetails = ref();
const fetchSingleCategory = async () => {
    try {
        categoryDetails.value = await api.get(category.getCategory + '/' + router.params.id)
    } catch (error) {
        console.log(error)
    }
}
onMounted(() => {
    fetchSingleCategory()
})

</script>