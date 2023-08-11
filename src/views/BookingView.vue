<template>
  <section>
    <!--    Page title -->
    <page-title title="Book seats for your show"/>


<!--      Concert -->
    <div class="concert">
      <card-component :concert="concert" />
    </div>


<!-- Select seats -->
    <div class="container-large" :style="{'flex-direction': formVisible === true ? 'row-reverse' : 'row'}">
      <div class="container-big">
        <template v-if="!formVisible">
          <div class="stage">
            <h2>Stage</h2>
          </div>
          <div class="seats">
            <div class="seat-rows" v-for="(row, index) in seats" :key="index">
              <small>{{row.name}}</small>
              <div class="seat-rows-seats">
                <div class="seat" :ref="row.id + '.' + seat" :data-row="row.id" :data-seat="seat" @click="select(row, seat)" :class="{'seat-available': !row.seats.unavailable.includes(seat), 'seat-unavailable': row.seats.unavailable.includes(seat)}" v-for="(seat, index) in row.seats.total" :key="index"></div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div style="display: flex; width: 100%; padding: 16px;">
            <div>
              <h1>Please enter your details</h1>

              <form style="text-align: left; display: flex; flex-direction: column;gap: 15px;">
                <label>
                  Name
                  <br>
                  <input type="text" />
                </label>

                <label>
                  Address
                  <br>
                  <input type="text" />
                </label>

                <label>
                  ZIP Code
                  <br>
                  <input type="text" />
                </label>

                <label>
                  City
                  <br>
                  <input type="text" />
                </label>

                <label>
                  Country
                  <br>
                  <select>
                    <option selected value="">Country</option>
                  </select>
                </label>
                <button>Book</button>

              </form>
            </div>
          </div>
        </template>
      </div>
      <div class="container-small">
        <h1>Selected seats</h1>
        <small v-if="selected.length === 0">No seats selected. Click on a seat to make a reservation</small>
        <div v-for="(row, index) in selected" :key="index">
          <small>Row {{row.row.name}}, Seat {{row.seat}}</small>
        </div>
        <br>
        <br>
        <button @click="formVisible = !formVisible">{{ formVisible === true ? 'Change seats' : 'Enter Booking Details' }}</button>
      </div>
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
      concert: null,
      seats: [],
      selected: [],
      reservation_token: null,
      formVisible: false
    }
  },
  created() {
    this.concert = JSON.parse(localStorage.getItem('card'))
    this.axios.get('/concerts/' + this.concert.id + '/shows/' + this.concert.shows[0].id + '/seating').then((response) => {
      this.seats = response.data.rows
    })
  },
  methods: {
    select (row, seat) {
      if(row.seats.unavailable.includes(seat)) {
        return 0
      }
      let beforeCount = this.selected.length
      this.selected.map((selectedSeat, index) => {
        if(this.selected[index].row.name === row.name && this.selected[index].seat === seat) {
          this.selected.splice(index, 1)
          this.$refs[row.id + '.' + seat][0].classList.remove('seat-selected')
        }
      })
      if(beforeCount === this.selected.length) {
        this.selected.push({row: row, seat: seat})
        this.$refs[row.id + '.' + seat][0].classList.add('seat-selected')
      }

      const reservations = this.selected.map((row) => {
        return {
          row: row.row.id,
          seat: row.seat
        }
      })
      this.axios.post('/concerts/' + this.concert.id + '/shows/' + this.concert.shows[0].id + '/reservation',
          {
            reservation_token: this.reservation_token,
            reservations: reservations
          }
      ).then((response) => {
        this.reservation_token = response.data.reservation_token
      })
    }
  }
}
</script>

<style scoped>
section > div {
  margin-bottom: 100px;
}

.concert {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container-large {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
}

.container-big, .container-small {
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

.container-big {
  max-width: 75%;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.stage {
  background-color: #d5d5d5;
  width: 450px;
  height: 100px;
  color: #505050;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}

.container-small {
  max-width: 20%;
}

.seats {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 20px;
}

.seat-rows {
  text-align: left;
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
}

.seat-rows > small {
  width: 100px;
  align-self: flex-start;
}

.seat-rows-seats {
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
}

.seat-available {
  border: 1px solid gray;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  cursor: pointer;
}

.seat-available:hover {
  background-color: #678aff;
}

.seat-selected {
  background-color: red;
}

.seat-unavailable {
  background-color: gray;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  user-select: none;
}
</style>