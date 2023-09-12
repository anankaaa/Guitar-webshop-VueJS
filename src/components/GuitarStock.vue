
<script setup>
defineProps({
    stock: {
        type: Number,
        required: true
    }
})
</script>
<template>
    <div class="guitar__stock">
        <span class="text-red" v-if="stock === 0">Out of stock</span>
        <span class="text-orange" v-else-if="stock < 3">Last chance, only {{ stock
        }} left</span>
        <span class="text-green" v-else>In stock</span>
    </div>
</template>


<style  scoped>
.guitar__stock {
    font-weight: bold;
    margin: 0 0 1rem 0;
}
</style>