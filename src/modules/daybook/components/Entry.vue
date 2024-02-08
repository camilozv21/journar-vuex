<template>

<div 
  class="mb-3 pointer p-2 entry-container"
  @click="$router.push({ name: 'entry', params: { id: 1 } })"
>
  <!-- Titulo -->
  <div class="entry-tittle d-flex">
    <span class="text-success fs-5 fw-bold">15</span>
    <span class="mx-1 fs-5">Julio</span>
    <span class="mx-2 fw-light">2021, jueves</span>
  </div>

  <div class="entry-description">
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod officia numquam ipsa sapiente hic minima accusamus autem est, nihil sed ea reiciendis iste quam consectetur odio placeat dolor debitis quasi?
  </div>

</div>

</template>

<script>
export default {
  name: 'Entry',
}
</script>

<style lang="scss" scoped>
  .entry-container {
    border-bottom: 1px solid #2c3e50;
    transition: 0.2s all ease-in;

    &:hover {
      background-color: lighten($color: grey, $amount: 45);
    transition: 0.2s all ease-in;
  }
  .entry-description {
    font-size: 12px;
  }
  }

</style>