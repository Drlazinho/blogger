<script setup>
definePageMeta({
    layout: "default",
});

const articles=ref([1,2,3,4,5,6,7,8,9,10])
</script>
<template>
    <div>
        <h1>List of Articles</h1>
    </div>
    <div v-for="(article, index) in articles" :key="index">
        <h1>Article - {{  article }}</h1>
    </div>
</template>