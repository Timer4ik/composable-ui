<template>
  <slot :posts="posts" />
</template>

<script setup>
const posts = useState("posts", () => []);

const fetchPost = await $fetch("https://jsonplaceholder.typicode.com/posts");
posts.value = fetchPost;
</script>
