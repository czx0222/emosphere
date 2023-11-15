<template>
  <div>
    <input
      type="text"
      v-model="selectedDate"
      @click="showCalendar = !showCalendar"
      placeholder="点击选择日期"
    />
    <div v-if="showCalendar" class="calendar">
      <div class="header">
        <button @click="prevMonth">&lt;</button>
        <span>{{ currentMonth }}</span>
        <button @click="nextMonth">&gt;</button>
      </div>
      <table>
        <thead>
          <tr>
            <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, index) in calendar" :key="index">
            <td v-for="day in week" :key="day.value" @click="selectDate(day)">
              {{ day.display }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      showCalendar: false,
      selectedDate: "",
      currentDate: new Date(),
    };
  },
  computed: {
    currentMonth() {
      const options = { month: "long", year: "numeric" };
      return this.currentDate.toLocaleDateString("en-US", options);
    },
    calendar() {
      const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
      const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
      const startDate = new Date(firstDayOfMonth);
      startDate.setDate(startDate.getDate() - startDate.getDay());
      const endDate = new Date(lastDayOfMonth);
      endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

      const calendar = [];
      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const week = [];
        for (let i = 0; i < 7; i++) {
          const dateValue = new Date(currentDate);
          const display = dateValue.getDate();
          const isCurrentMonth = dateValue.getMonth() === this.currentDate.getMonth();
          week.push({ value: dateValue.toISOString(), display, isCurrentMonth });
          currentDate.setDate(currentDate.getDate() + 1);
        }
        calendar.push(week);
      }

      return calendar;
    },
  },
  methods: {
    prevMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    },
    nextMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    },
    selectDate(day) {
      if (day.isCurrentMonth) {
        this.selectedDate = day.value;
        this.showCalendar = false;
      }
    },
  },
};
</script>

<style scoped>
.calendar {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 1000;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

td {
  padding: 5px;
  border: 1px solid #ccc;
  text-align: center;
  cursor: pointer;
}

td:hover {
  background-color: #f0f0f0;
}

td.isCurrentMonth {
  background-color: #e0e0e0;
}
</style>
