<script setup>
import { ref } from 'vue'
import { usePostStore } from '~/store/post-store'
import Modal from '~/components/Modal.vue'; // Importe o componente modal

const props = defineProps(['posts', 'status'])
const emit = defineEmits(['searchPost', 'deletePost', 'editPost', 'getPosts'])
const router=useRouter()

// Mantemos o postStore
const postStore = usePostStore()
const { edit, postInput } = storeToRefs(postStore)

// Estado do modal (agora local)
const showModal = ref(false)
const currentPostId = ref(null)
const image = ref(null)
const loading = ref(false)

// Funções do modal
function openModal(postId) {
  console.log(postId)
  currentPostId.value = postId
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  resetForm()
}

function selectImage(event) {
  const selectedImage = event.target.files[0]
  const output = document.querySelector("#outputImage")
  output.src = URL.createObjectURL(selectedImage)
  output.onload = function () {
    URL.revokeObjectURL(selectedImage)
  }
  image.value = selectedImage
}
const config = useRuntimeConfig();

async function uploadPostImage() {
  const userData = getUserData()
  if (!userData?.token) throw new Error('Unauthorized')

  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Authorization', 'Bearer ' + userData.token)

  try {
    loading.value = true
    const formData = new FormData()
    formData.append('image', image.value)
    formData.append('postId', currentPostId.value)

    const res = await $fetch(config.public?.API_BASE_URL + `/posts/upload-image`, {
      method: 'POST',
      body: formData,
      headers
    })

    successMsg(res?.message)
    emit('getPosts')
    closeModal()
  } catch (error) {
    showError(error?.data?.message || 'Failed to upload image')
  } finally {
    loading.value = false
  }
}

function resetForm() {
  image.value = null
  const output = document.querySelector("#outputImage")
  if (output) output.src = ""
  const input = document.querySelector("#imageInput")
  if (input) input.value = ''
}

// Função existente para criar post
function moveToCreatePostPage() {
  edit.value = false
  postInput.value = {}
  router.push('/admin/create-post')
}

function openModalTest() {
  console.log('abre')
  showModal.value = true
}
</script>
<template>
  <div>
    <button @click="openModalTest">Abrir Meu Modal</button>

    <Modal :isVisible="showModal" title="Bem-vindo ao Meu Modal!" @close="showModal = false">
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
          <!-- Header -->
          <div class="border-b px-6 py-4">
            <h2 class="text-2xl font-semibold">Upload Image</h2>
          </div>

          <!-- Body -->
          <div class="p-6">
            <img style="height: 150px" alt="image" id="outputImage" class="mb-4" />
            <label class="block mb-2">Select image</label>
            <input @change="selectImage" type="file" id="imageInput" accept="image/*" class="block w-full" />
          </div>

          <!-- Footer -->
          <div class="border-t px-6 py-4 flex justify-end space-x-3">
            <button @click="showModal = false"
              class="text-gray-700 border border-indigo-700 py-2 px-4 rounded-md shadow-sm hover:bg-gray-50">
              Close
            </button>
            <button @click="uploadPostImage" :disabled="loading || !image"
              class="text-white bg-indigo-700 py-2 px-4 rounded-md shadow-sm hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed">
              {{ loading ? 'Uploading...' : 'Upload image' }}
            </button>
          </div>
        </div>
      </div>
    </Modal>

    <div class="flex justify-between mb-2">
      <input @keydown="searchPostByTitle" v-model="query" placeholder="Search..." type="text"
        class="mb-2 border rounded-md py-1 px-2 shadow-md" />
      <button @click="moveToCreatePostPage" class="rounded-md text-white px-2 py-2 bg-indigo-700 text-sm font-semibold">
        Create a Post
      </button>
    </div>

    <table class="bg-white rounded-md w-full shadow-md border border-gray-300">
      <thead>
        <tr class="bg-gray-100 text-left">
          <td class="border border-gray-300 py-2 px-4">Image</td>
          <td class="border border-gray-300 py-2 px-4">Post-Title</td>
          <td class="border border-gray-300 py-2 px-4">Upload</td>
          <td class="border border-gray-300 py-2 px-4">Edit</td>
          <td class="border border-gray-300 py-2 px-4">Delete</td>
        </tr>
      </thead>

      <tbody>
        <div v-if="status === 'pending'">
          Loading data....
        </div>


        <tr v-else class="text-left" v-for="post in posts" :key="post?.id">
          <td class="border border-gray-300 py-2 px-4">
            <img :src="post?.image" width="150" />
          </td>
          <td class="border border-gray-300 py-2 px-4">
            {{ post?.title }}
          </td>
          <td class="border border-gray-300 py-2 px-4">
            <button @click="openModal(post?.id)"
              class="rounded-md px-2 text-white py-2 bg-indigo-700 text-sm font-semibold">
              Upload
            </button>
          </td>
          <td class="border border-gray-300 py-2 px-4">

            <button @click="emit('editPost', post)"
              class="rounded-md  px-2 text-white py-2 bg-indigo-700 text-sm font-semibold">
              Update
            </button>

          </td>
          <td class="border border-gray-300 py-2 px-4">

            <button @click="emit('deletePost', post?.id)"
              class="rounded-md  px-2 text-white py-2 bg-red-700 text-sm font-semibold">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>