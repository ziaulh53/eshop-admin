<script setup>
import Navbar from './NavBar.vue';
import CustomFooter from './CustomFooter.vue';
import { Spin } from 'ant-design-vue';

defineProps({
    loading: Boolean
})
</script>

<template>
    <div class="flex my-5">
        <div class="h-[60px] w-[250px] bg-white mr-5">
            <p class="text-2xl text-center">LOGO</p>
        </div>
        <Navbar />
    </div>
    <div class="flex">
        <div class="min-h-screen bg-theme-color w-[250px] mr-5">
            <div>
                <div class="p-2 mx-3 my-3 text-white text-lg">
                    <router-link to="/dashboard" class="ml-2 font-bold">
                        <i class="fa-solid fa-chart-simple mr-2"></i><span>Dashboard</span>
                    </router-link>
                </div>
                <div class="p-2 mx-3 my-3 text-white text-lg">
                    <router-link to="/customers" class="ml-2">
                        <i class="fa-solid fa-users mr-2"></i><span>Customers</span>
                    </router-link>
                </div>
                <div class="p-2 mx-3 ny-3 text-white text-lg">
                    <router-link to="/orders" class="ml-2">
                        <i class="fa-solid fa-bag-shopping mr-2"></i><span>Order</span>
                    </router-link>
                </div>
                <div class="p-2 mx-3 my-3 text-white text-lg">
                    <router-link to="/category" class="ml-2">
                        <i class="fa-solid fa-bars mr-2"></i><span>Category</span>
                    </router-link>
                </div>
            </div>
        </div>

        <main class=" h-full w-full">
            <div class="p-5 rounded-md min-h-[80vh] bg-white">
                <Spin :spinning="loading">
                    <slot></slot>
                </Spin>
            </div>
        </main>



</div></template>