<template>
    <Line :options="chartOptions" :data="chartData" />
</template>
  
<script setup>
import { toRefs } from 'vue';
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, PointElement, LinearScale, LineElement } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement);

const props = defineProps({
    title: String,
    data: Object,
    type: {
        type: String,
        default: 'day'
    }
})
const { title, data, type} = toRefs(props);


const chartData = {
    labels: data.value?.labels,
    datasets: [{
        data: data?.value?.data, 
        label: 'High',
        backgroundColor: '#f87979',
        borderColor:  '#f87979',
        tension: 0.3
    }
],
}
const chartOptions = {
    plugins: {
      filler: {
        propagate: false,
      },
      title: {
        display: true,
        text: (ctx) => title.value
      },
      label: {
        display: false
      }
    },
    interaction: {
      intersect: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
    
}

</script>