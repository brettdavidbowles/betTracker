<template>
  <div>
    <img :src="url">
  </div>
</template>

<script>
export default {
  name: 'Picture',
  props: {
    url: String,
    urlIndex: Number
  }
}
</script>
