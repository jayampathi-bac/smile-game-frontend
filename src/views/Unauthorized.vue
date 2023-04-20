<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 text-center">
        <span class="display-1">
          401
        </span>
        <div class="mb-3 lead">
          Unauthorized! Access to this resource is denied.
        </div>
        <router-link to="/" class="btn btn-link">
          Back to Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Unauthorized"
};
</script>

<style scoped>

</style>