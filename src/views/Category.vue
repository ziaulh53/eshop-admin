<template>
    <Layout>
        <PageTitle title="Category"/>
        <div class="my-5">
            <CreateCategory/>
        </div>
        <div class="grid grid-cols-4 gap-5">
            <CategoryItem />
            <CategoryItem />
            <CategoryItem />
            <CategoryItem />
        </div>
    </Layout>
</template>

<script setup>
import { Layout } from '../components/Layout';
import { PageTitle } from '../components/shared';
import { CategoryItem, CreateCategory } from '../components/Category'



</script>