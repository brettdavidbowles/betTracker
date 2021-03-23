<template>
  <div class="w-screen lg:w-1/3">
    <div class="h-40 bg-blue-500 z-20 m-4 border-black border-4">
      <h2 class="text-xl text-center"><b>{{ title }}</b></h2>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: String
  }
}
</script>
