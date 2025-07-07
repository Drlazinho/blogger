<script setup>
definePageMeta({
    layout: "default",
});

const articles=ref([1,2,3,4,5,6,7,8,9,10])
const config=useRuntimeConfig()
const {data: serverData} = await useFetch('/api/posts')
const {data} = await useFetch(config.API_URL+'/posts')

async function fetchCountries() {
    const { data: countryData, error} = await useFetch('/api/countries')
}

</script>
<template>
    <div class="bg-slate-400">
        <button @click="fetchCountries">GET COUNTRIES</button>
        <h1>key: {{  serverData }}</h1>
    </div>
    <div>
        <h1>List of Articles</h1>
    </div>
    <div v-for="article in data?.data" :key="article.id">
        <h2>Article - <a href="http://">{{  article.title }}</a></h2>
        <div v-html="article?.post_content"></div>
    </div>
</template>