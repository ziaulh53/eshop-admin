<template>
    <a-card bordered class="bg-slate-100">
        <div class="font-semibold text-lg mb-2">Banners</div>
        <div class="grid grid-cols-4 gap-5 mb-5">
            <!-- {{ bannerState }} -->
            <div v-for="url of bannerState" class="border-2 p-3 bg-white rounded-lg" :key="url">
                <img :src="url ||'/assets/logo.png'" class="w-full h-[200px] object-cover" />
            </div>
            <div class="border-2 p-3 bg-white rounded-lg">
                <label for="banner-upload" class="w-full flex justify-center items-center h-[200px] border-2 border-dashed">
                    <span class="font-semibold p-2 bg-slate-200 border-2"> + Upload</span>
                </label>
                <input id="banner-upload" class="hidden" type="file" :onchange="handleFile"/>
            </div>
        </div>
        <div class="text-right">
            <EShopButton btn-text="Update" :onclick="handleUpdate" :disabled="disabled" />
        </div>
    </a-card>
</template>

<script setup>
import { ref, toRefs, computed } from 'vue';
import { EShopButton } from '../shared';
import { api, landing } from '../../api';
import { notify } from '../../helpers';

const props = defineProps({
    refetch: Function,
    banners: Array
})

const { banners, refetch } = toRefs(props)

const bannerState = ref(banners.value);

const disabled = computed(() => !bannerState.value?.length);

const handleFile = async (e) => {
    try {
        const images = bannerState.value || [];
        const res = await api.fileUpload(e.target.files[0]);
        images.push(res.result.url)
        bannerState.value = images;
        console.log(bannerState.value)
    } catch (error) {
        console.log(error)
    }
}
const handleUpdate = async () => {
    try {
        const res = await api.post(landing.updateBanner, { banners: bannerState.value });
        notify(res, refetch.value)
    } catch (error) {
        console.log(error)
    }
}

</script>