<template>
  <ul id="example-1">
    <li v-for="vendor in vendors_list" :key="vendor._id">
      <Vendor :listing="vendor"/>
    </li>
  </ul>
</template>

<script>
import Vendor from "./Vendor.vue";
const getVendors = async () => {
  const response = await fetch("/api/vendors");
  const json = await response.json();
  return json;
};

export default {
  name: "VendorsList",
  components: {
    Vendor
  },
  props: {
    msg: String,
  },
  data: () => ({
    vendors_list: [],
  }),
  mounted() {
    getVendors().then((json) => this.vendors_list = json);
  },
};
</script>

<style scoped></style>
