<script setup>
definePageMeta({
    layout: "auth",
});

const registerInput = ref({
    name: '',
    email: '',
    password: '',
})

const loading = ref(false)
const config = useRuntimeConfig()

async function createUser() {
    try {
        loading.value = true
        await $fetch(config.public?.API_BASE_URL + '/register', {
            headers: {
                Accept: "application/json",
                "content-type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(registerInput.value)
        })
        successMsg(res?.message)
    } catch (error) {
        if (error?.response?.status === 422) {
            const errors = error.response?._data

            for (const message of errors) {
                showError(message)
            }
        }
    } finally {
        loading.value = false
    }

}

</script>
<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center px-4">
        <div class="w-full max-w-sm bg-white rounded-xl shadow-lg p-8 space-y-6">
            <div class="text-center">
                <h1 class="text-3xl font-bold text-indigo-700">Register</h1>
                <p class="text-sm text-gray-500">Register your account</p>
            </div>

            <div class="space-y-4">
                <input v-model="registerInput.name" type="text" placeholder="Name"
                    class="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                <input v-model="registerInput.email" type="text" placeholder="E-mail"
                    class="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                <input type="password" v-model="registerInput.password" placeholder="Password"
                    class="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400" />

                <NuxtLink to="/auth/login" class="text-sm text-indigo-600 hover:underline block text-right">
                    Login
                </NuxtLink>

                <button @click="createUser" :disabled="loading"
                    class="w-full py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold text-sm disabled:opacity-50">
                    {{ loading ? "Processing..." : "Create an Account" }}
                </button>
            </div>
        </div>
    </div>
</template>