<template>
    <div class="mb-5">
        <div class="mb-2 font-bold"><label>{{ label }}</label></div>
        <input :type="type" class="w-full border-2 border-gray-300 rounded-lg p-2 px-4" :placeholder="placeholder"
            :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    </div>
</template>

<script setup>
defineProps({
    modelValue: String,
    label: String,
    placeholder: String,
    type: String
})
</script>