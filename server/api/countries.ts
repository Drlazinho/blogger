export default defineEventHandler(async (e) => {
    try {
        const config = useRuntimeConfig()
        const countryData = await $fetch(config.public.API_URL + '/countries', {
            query: {
                country_key_secret: config.country_key_secret
            }
        })
        return { countryData }
    } catch (error) {
        throw createError({
            status: 500,
            message: "server error",
        });
    }
})