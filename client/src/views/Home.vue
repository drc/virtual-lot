<template>
  <div class="home">
    <VendorsList msg="welcome to the virtual lot" />
  </div>
</template>

<script>
// @ is an alias to /src
import VendorsList from "@/components/VendorsList.vue";

export default {
  name: "Home",
  components: {
    VendorsList,
  },
};
</script>
