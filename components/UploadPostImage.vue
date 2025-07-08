<script setup>
const emit = defineEmits(['getPosts'])

const image = ref(null)
const loading = ref(false)

function selectImage(event) {
  const selectedImage = event.target.files[0]
  const output = document.querySelector("#outputImage")
  output.src = URL.createObjectURL(selectedImage)
  output.onload = function() {
    URL.revokeObjectURL(selectedImage)
  }
  image.value = selectedImage
}

async function uploadPostImage() {
  try {
    loading.value = true
    const formData = new FormData()
    formData.append('image', image.value)
    
    const res = await $fetch(`/posts/${postId.value}/upload-image`, {
      method: 'POST',
      body: formData
    })
    
    successMsg(res?.message)
    emit('getPosts')
    resetForm()
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
</script>
