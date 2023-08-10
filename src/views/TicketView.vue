<template>
  <section>
    <!--    Page title -->
    <page-title title="Checkout these amazing concerts in Graz."/>
    <h1>Cav</h1>
    <card-component/>
  </section>
</template>

<script>
import PageTitle from "@/components/PageTitle.vue";
import CardComponent from "@/components/CardComponent.vue";

export default {
  components: {CardComponent, PageTitle},
  data () {
    return {
      artists: [],
      artist: null,
      locations: [],
      location: null,
      date: null,
      concerts: []
    }
  },
  async mounted () {
    await this.axios.get('/concerts').then((response) => {
      this.concerts = response.data.concerts
    })
  }
}
</script>

<style scoped>
section > div {
  margin-bottom: 100px;
}

.filtration-container, .concerts-container {
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 50px;
}

.concerts-container {
  align-items: stretch !important;
}
</style>