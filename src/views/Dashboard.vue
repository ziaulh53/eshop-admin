<template>
    <Layout>
        <PageTitle title="Dashboard" />
        <div class="grid grid-cols-2 gap-5">
            <div>
                <BarChart v-if="data?.result?.labels" title="Last 7 days selling result" type="day" :data="data?.result"/>
            </div>
            <div>
                <!-- <BarChart title="Last 6 months selling result" type="6months" /> -->
            </div>
            <div>
                <PieChart title="Category based" type="6months" />
            </div>
        </div>
    </Layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { BarChart, PieChart } from '../components/Dashboard';
import { Layout } from '../components/Layout';
import { PageTitle } from '../components/shared';
import { api, dashboardEndpoint } from '../api';

const data = ref({});

const fetchDashboardData = async () => {
    try {
        data.value = await api.get(dashboardEndpoint.getDashboardData)
    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    fetchDashboardData();
})
</script>