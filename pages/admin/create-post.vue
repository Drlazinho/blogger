<script setup>
import { usePostStore } from '~/store/post-store';

definePageMeta({
  layout: "admin",
});


const postStore = usePostStore()
const { postInput, loading, edit } = storeToRefs(postStore)

</script>
<template>
 <div class="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
  <h1 class="text-3xl font-bold text-gray-800">📝 Create a Post</h1>

  <div class="space-y-4">
    <input 
      v-model="postInput.title" 
      type="text" 
      placeholder="Enter a catchy title..."
      class="w-full border border-gray-300 rounded-lg px-4 py-2 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />

    <textarea 
      v-model="postInput.post_content" 
      rows="6" 
      placeholder="Write your content here..."
      class="w-full border border-gray-300 rounded-lg px-4 py-2 text-base shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
    ></textarea>
  </div>

  <!-- Editor opcional -->
  <!--
  <ClientOnly fallback-tag="span" fallback="Loading editor...">
    <rich-editor
      :value="postInput.post_content" 
      @input="event => postInput.post_content = event" 
    />
  </ClientOnly>
  -->

  <div class="flex justify-between items-center pt-4">
    <NuxtLink 
      to="/admin/list-of-posts"
      class="inline-block text-indigo-600 hover:bg-indigo-100 border border-indigo-600 rounded-md px-4 py-2 text-sm font-medium transition-all"
    >
      ← Back
    </NuxtLink>

    <button 
      :disabled="loading"
      @click="postStore.createPost"
      :class="[
        'px-6 py-2 rounded-md text-sm font-semibold transition-all',
        loading ? 'bg-gray-400 cursor-not-allowed' : (edit ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-indigo-700 hover:bg-indigo-800'),
        'text-white'
      ]"
    >
      {{ loading ? "Processing..." : edit ? "Update" : "Create" }}
    </button>
  </div>
</div>

</template>