<template>
    <Doughnut :options="chartOptions" :data="chartData" />
</template>
  
<script setup>
import { toRefs } from 'vue';
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend,} from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps({
    title: String,
    data: Array,
    type: {
        type: String,
        default: 'day'
    }
})
const { title, data, type} = toRefs(props);


const chartData = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [{
        data: [40, 20, 12, 30, 60, 25], 
        label: 'High',
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#f87979'],
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
    }
}

</script>