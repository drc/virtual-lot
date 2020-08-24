<template>
  <div>
    {{ listing.name }}
  </div>
</template>

<script>
export default {
  name: "Vendor",
  props: {
    listing: Object,
  },
};
</script>

<style scoped></style>
