<template>
  <section>
<!--    Page title -->
    <page-title title="Checkout these amazing concerts in Graz."/>

<!--    Filtration -->
    <div class="filtration-container">
      <label>
        Artist <br>
        <select v-model="artist">
          <option value="null" disabled selected>All Artists</option>
        </select>
      </label>

      <label>
        Location <br>
        <select v-model="artist">
          <option value="null" disabled selected>All Locations</option>
        </select>
      </label>

      <label>
        Date <br>
        <input type="date" v-model="date" placeholder="Date">
      </label>
    </div>


<!--    Discover concerts -->
    <div class="concerts-container">
      <card-component v-for="(concert, index) in concerts" :key="index" :concert="concert"/>
    </div>
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