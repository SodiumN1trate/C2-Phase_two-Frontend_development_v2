<template>
  <header>
    <div class="header-content">
      <router-link to="/"><h2>EuroSkills Concerts</h2></router-link>
      <div>
        <small>Already booked? </small>
        <button @click="$router.push('/retrieve')">Get Tickets</button>
      </div>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<script>
</script>

<style scoped>
</style>
