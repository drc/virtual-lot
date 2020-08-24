<template>
  <div>
    {{ listing.name }}
  </div>
</template>

<script>
export default {
  name: "Vendor",
  props: {
    listing: { name: String },
  },
};
</script>

<style scoped></style>
