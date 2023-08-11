<template>
  <section>
<!--    Page title -->
    <page-title title="Checkout these amazing concerts in Graz."/>

<!--    Filtration -->
    <div class="filtration-container">
      <label>
        Artist <br>
        <select @change="filter" v-model="artist">
          <option value="" selected>All Artists</option>
          <option  v-for="(artist, index) in artists" :key="index" :value="artist">{{ artist }}</option>
        </select>
      </label>

      <label>
        Location <br>
        <select @change="filter" v-model="location">
          <option value="" selected>All Locations</option>
          <option  v-for="(location, index) in locations" :key="index" :value="location">{{ location }}</option>
        </select>
      </label>

      <label>
        Date <br>
        <input @change="filter" type="date" v-model="date" placeholder="Date">
      </label>
      <button @click="clearFilter()" v-if="artist !== '' || location !== '' ">clear</button>
    </div>


<!--    Discover concerts -->
    <div class="concerts-container">
      <card-component v-for="(concert, index) in concerts" :key="index" :concert="concert" v-show="concert.show"/>
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
      artist: '',
      locations: [],
      location: '',
      date: null,
      concerts: []
    }
  },
  async mounted () {
    await this.axios.get('/concerts').then((response) => {
      this.concerts = response.data.concerts

      this.concerts = this.concerts.map((concert) => {
        if (!this.artists.includes(concert.artist)) {
          this.artists.push(concert.artist)
        }
        if (!this.locations.includes(concert.location.name)) {
          this.locations.push(concert.location.name)
        }

        concert.show = true
        return concert
      })
    })
  },
  methods: {
    filter () {
      this.concerts.map((concert, index) => {
        this.concerts[index].show = true

        if (this.artist && concert.artist !== this.artist) {
          this.concerts[index].show = false
        }

        if (this.location && concert.location.name !== this.location) {
          this.concerts[index].show = false
        }

        if (this.date && new Date(concert.shows[0].start).toLocaleDateString() !== new Date(this.location).toLocaleDateString()) {
          this.concerts[index].show = false
        }
      })
    },
    clearFilter () {
      this.artist = ''
      this.location = ''
      this.date = ''
      this.filter()
    }
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

.filtration-container {
  align-items: flex-end !important;
}

.concerts-container {
  align-items: stretch !important;
}
</style>