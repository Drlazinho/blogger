<script setup>
import { usePostStore } from '~/store/post-store';

const LaravelVuePagination = await import('laravel-vue-pagination').then(m => m.default || m);
const { TailwindPagination } = LaravelVuePagination; // Extracting the component


definePageMeta({
  layout: "admin",
});
const userData = getUserData();

const loading=ref(false);
const config = useRuntimeConfig();
const query = ref("");
const page = ref(1);

const { data, error, status, refresh } = await useFetch(
  config.public?.API_BASE_URL + "/posts",
  {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${userData?.token}`,
    },
    watch: [query, page],
    query: {
      query: query,
      page: page,
    },
  }
);

function _debounce(cb, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => cb(args), delay);
  };
}

const searchPost = _debounce(function (searchVal) {
  query.value = searchVal[0];
}, 200);

const paginateData = async (newPageVal) => {
  page.value = newPageVal;
  await refresh();
};

function deletePost(id) {
  promptUser("Do you want to delete this ?").then(async function () {
    try {
      loading.value = true;
      const res = await $fetch(
        config.public?.API_BASE_URL + "/posts/" + id,
        {
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${userData?.token}`
          },

          method: "DELETE",
        }
      );
      loading.value = false;
      await refresh();
      successMsg(res?.message);
    } catch (error) {
      loading.value = false;
      showError(error?.message);
    }
  });
}


const router=useRouter()
const postStore=usePostStore()
const {postInput,edit}=storeToRefs(postStore)

function editPost(post){
  postInput.value=post
  edit.value=true
  router.push('/admin/create-post')
}
</script>

<template>
    <div class="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">📋 Post List</h1>
    
      <!-- Tabela de Posts -->
      <PostListTable
        v-if="data?.data"
        @searchPost="searchPost"
        :status="status"
        @editPost="editPost"
        :posts="data?.data?.data"
        @deletePost="deletePost"
        @getPosts="refresh"
        />
  
      <!-- Mensagem de nenhum dado -->
      <div
        v-else
        class="flex flex-col items-center justify-center h-48 text-gray-600 border rounded-md bg-gray-50 shadow-inner"
      >
        <svg
          class="w-10 h-10 mb-2 text-gray-400"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.75 17L15 12l-5.25-5"
          />
        </svg>
        <span class="font-semibold">No data found</span>
        <span class="text-sm text-gray-500">Check your internet connection</span>
      </div>
  
      <!-- Paginação -->
      <TailwindPagination
        v-if="data.data"
        class="mt-6 flex justify-center"
        :data="data?.data"
        @pagination-change-page="paginateData"
      />
    </div>
  </template>