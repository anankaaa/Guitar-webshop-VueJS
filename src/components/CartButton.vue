<script setup>
import { ref, watch } from 'vue'
import { useCartStore } from '../store/cart'
import { useToast } from 'vue-toastification'


const props = defineProps({
    guitar: {
        type: Object,
        required: true
    }
})


const toast = useToast()
const { addItemToCart, getItemById, changeItemCount, removeFromCart } = useCartStore()
const basketItem = getItemById(props.guitar.id)
const count = ref(basketItem?.count || 0)
const buttonText = ref(!basketItem ? 'Add to cart' : 'Update cart')

watch(count, () => {
    const minCount = 0
    const maxCount = props.guitar.stock
    if (count.value < minCount) {
        count.value = minCount
    } else if (count.value > maxCount) {
        count.value = maxCount
    }
})

function handleDecreaseCountClick() {
    count.value--
}

function handleIncreaseCountClick() {
    count.value++
}

function handleCartButtonClick(guitar) {
    /* add: 
    - not added to cart
    - count > 0 
    modify: 
    - if in the cart
    - count not 0
    - count not equal with the amount of cart
    - if in stock
    delete:
    - if in the cart 
    - count ====0 */
    const basketItem = getItemById(guitar.id)
    if (!basketItem && count.value > 0) {
        addItemToCart(guitar, count.value)
        buttonText.value = 'Update cart'
        toast.success('Item has been added to the cart')
    } else if (basketItem?.count != count.value && basketItem?.stock >= count.value && count.value > 0) {
        changeItemCount(guitar.id, count)
        toast.success('Item count has been changed')
    } else if (basketItem && count.value === 0) {
        removeFromCart(guitar.id)
        buttonText.value = 'Add to cart'
        toast.error('Item has been deleted from cart')
    }


}
</script>


<template>
    <div class="cart">
        <button @click="handleDecreaseCountClick">-</button>
        <input type="text" v-model="count">
        <button @click="handleIncreaseCountClick">+</button>
        <button @click="handleCartButtonClick(guitar)" class="add-to-cart">{{
            buttonText }}</button>
    </div>
</template>


<style  scoped>
button {
    padding: .25rem 1rem;
    background: var(--dark);
    border: 1px solid var(--dark);
    color: var(--light);
}

button:active {
    background: var(--light);
    color: var(--dark);
}

button:hover {
    cursor: pointer;
}

input {
    border: 1px solid var(--dark);
    padding: .25rem;
    border-radius: 0;
    width: 5ch;
    text-align: center;
}

.add-to-cart {
    margin: 0 0 0 1rem;
}
</style>