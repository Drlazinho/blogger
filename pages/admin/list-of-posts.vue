<script setup>
definePageMeta({
    layout: "admin",
});
</script>
<template>
    <div>
        <h1>List of posts</h1>
        <NuxtLink to="/admin/articles">articles</NuxtLink>
        <br>
        <NuxtLink to="/admin/create-post">Create Post</NuxtLink>
    </div>
</template>