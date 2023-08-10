<link rel="stylesheet" href="../assets/main.css">
<template>
  <section>
    <!--    Page title -->
    <page-title title="Retrieve your tickets."/>

    <form @submit.prevent="submit">
      <label>
        Name
        <br>
        <input placeholder="enter your full name" v-model="form.name" :style="{'border': form.name != null && form.name.length > 0 ? '1px solid #b9b9b9' : '1px solid red'}">
      </label>
      <br>
      <label>
        Code
        <br>
        <input placeholder="enter your ticket code" v-model="form.code" :style="{'border': form.code != null && form.code.length > 0 ? '1px solid #b9b9b9' : '1px solid red'}">
      </label>
      <br>
      <button>Get Ticket</button>
    </form>

  </section>
</template>

<script>
import PageTitle from "@/components/PageTitle.vue";

export default {
  components: {PageTitle},
  data () {
    return {
      form: {
        code: null,
        name: null
      }
    }
  },
  methods: {
    async submit() {
      await this.axios.post('/tickets', this.form).then((response) => {
          localStorage.setItem('tickets', response.data.tickets)
          this.$router.push('/tickets')
        }).catch(() => {
        alert('Could not find tickets with these details')
      })
    }
    // await this.axios.get('/concerts').then((response) => {
    //   this.concerts = response.data.concerts
    // })
  }
}
</script>

<style scoped>

form {
  margin-bottom: 100px;
  margin-right: auto;
  margin-left: auto;
  padding: 7px;
  border-radius: 5px;
  background-color: white;
  border: 1px solid #b9b9b9;
  cursor: pointer;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

</style>