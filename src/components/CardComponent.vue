<template>
  <div class="card" @click="store()">
    <small v-for="(show, index) in concert.shows" :key="index">{{ new Date(show.start).toLocaleDateString() }}<br></small>
    <h3>{{ concert.artist }}</h3>
    <p>{{ concert.location.name }}</p>
    <small v-for="(show, index) in concert.shows" :key="index">{{ getDate(show.start) }} - {{ getDate(show.end) }} <br></small>
  </div>
</template>

<script>
export default {
  props: ['concert'],
  mounted() {
    console.log(this.concert)
  },
  methods: {
    getDate (date) {
      date =  new Date(date)
      return date.getHours() + ':' + date.getUTCMinutes()
    },
    store () {
      localStorage.setItem('card', JSON.stringify(this.concert))
      this.$router.push('/booking')
    }
  }
}
</script>

<style scoped>
.card {
  padding: 7px;
  border-radius: 7px;
  background-color: white;
  border: 1px solid #b9b9b9;
  cursor: pointer;
  max-width: 300px;
  width: 100%;
  justify-content: center;
  text-align: center;
  transition: 0.1s all;
}

.card:hover {
  background-color: #ececec;
}
</style>
