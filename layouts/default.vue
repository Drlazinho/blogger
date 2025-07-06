<template>
    <div>
        <div>
            <ul>
                <li>
                    <NuxtLink to="/">Home</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/about">Articles</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/blog/about">About</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/blog/contact">Contact</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/auth/register">Register</NuxtLink>
                </li>
            </ul>
        </div>
        <br />
        <br />
        <br />

        <div>
            <NuxtPage></NuxtPage>
        </div>

        <div>
            <h1>this is the footer</h1>
        </div>
    </div>
</template>