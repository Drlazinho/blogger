export default defineEventHandler((e) => {
    const config = useRuntimeConfig()
    const key=config.privateKey
    return {
        key
    }
})