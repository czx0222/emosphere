<template>
  <div class="calendar">
    <div class="header">
      <button @click="previousMonth">&lt;</button>
      <h2>{{ currentMonth }}</h2>
      <button @click="nextMonth">&gt;</button>
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="day in days" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, index) in calendar" :key="index">
          <td v-for="day in week" :key="day.date" @click="selectDate(day)">
            {{ day.day ? day.day : '' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      currentMonth: "",
      calendar: [],
    };
  },
  mounted() {
    this.updateCalendar();
  },
  methods: {
    updateCalendar() {
      // 获取当前月份的第一天
      const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      const lastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

      this.currentMonth = firstDay.toLocaleString('default', { month: 'long' });

      // 构建日历数组
      const calendar = [];
      let week = [];
      for (let i = 1; i < firstDay.getDay(); i++) {
        week.push(null);
      }
      for (let i = 1; i <= lastDay.getDate(); i++) {
        week.push({ day: i, date: new Date(firstDay.getFullYear(), firstDay.getMonth(), i) });
        if (week.length === 7) {
          calendar.push(week);
          week = [];
        }
      }
      if (week.length > 0) {
        calendar.push(week);
      }

      this.calendar = calendar;
    },
    previousMonth() {
      const currentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      currentMonth.setMonth(currentMonth.getMonth() - 1);
      this.updateCalendar(currentMonth);
    },
    nextMonth() {
      const currentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      currentMonth.setMonth(currentMonth.getMonth() + 1);
      this.updateCalendar(currentMonth);
    },
    selectDate(day) {
      // 处理日期选择逻辑，你可以根据需要进行扩展
      console.log("Selected Date:", day.date);
    },
  },
};
</script>

<style scoped>
.calendar {
  max-width: 400px;
  margin: auto;
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

td {
  cursor: pointer;
}

td:hover {
  background-color: #f5f5f5;
}
</style>
