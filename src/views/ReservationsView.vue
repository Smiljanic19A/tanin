<template>
  <div class="reservations-view">
    <!-- Mobile background (hidden on desktop) -->
    <div class="mobile-background" v-if="isMobile">
      <img src="/plate.png" alt="Background" class="background-image">
      <div class="background-overlay"></div>
    </div>
    
    <div class="reservations-layout">
      <!-- Reservations Content -->
      <div class="reservations-container">
        <h1 class="reservations-title">
          <transition name="slide-text" mode="out-in">
            <span :key="currentLanguage + 'reservations.title'">{{ $t('reservations.title') }}</span>
          </transition>
        </h1>
        
        <!-- Tab Navigation -->
        <div class="tab-navigation">
          <button 
            class="tab-button" 
            :class="{ active: activeTab === 'booking' }"
            @click="activeTab = 'booking'"
          >
            <transition name="slide-text" mode="out-in">
              <span :key="currentLanguage + 'reservations.bookTable'">{{ $t('reservations.bookTable') }}</span>
            </transition>
          </button>
          <button 
            class="tab-button" 
            :class="{ active: activeTab === 'private' }"
            @click="activeTab = 'private'"
          >
            <transition name="slide-text" mode="out-in">
              <span :key="currentLanguage + 'reservations.privateReservations'">{{ $t('reservations.privateReservations') }}</span>
            </transition>
          </button>
        </div>
        
        <!-- Tab Content -->
        <div class="tab-content">
          <!-- Book a Table Tab -->
          <div v-if="activeTab === 'booking'" class="booking-tab">
            <h2 class="main-title">BOOK A TABLE</h2>
            
            <div class="booking-form">
              <!-- Date Selection -->
              <div class="form-group">
                <label>Date</label>
                <div class="date-input-container" @click="showDatePicker = true">
                  <span class="date-display">{{ formatDisplayDate }}</span>
                </div>
              </div>
              
              <!-- Time Selection -->
              <div class="form-group">
                <label>Time</label>
                <select v-model="bookingForm.time" class="time-select">
                  <option value="">Select time</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="18:30">6:30 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="19:30">7:30 PM</option>
                  <option value="20:00">8:00 PM</option>
                  <option value="20:30">8:30 PM</option>
                  <option value="21:00">9:00 PM</option>
                  <option value="21:30">9:30 PM</option>
                  <option value="22:00">10:00 PM</option>
                </select>
              </div>
              
                             <!-- Guest Counter -->
               <div class="form-group">
                 <label>How many people ?</label>
                 <div class="guest-counter">
                   <button type="button" class="counter-btn" @click="decrementGuests">-</button>
                   <span class="guest-count">{{ guestCount }}</span>
                   <button type="button" class="counter-btn" @click="incrementGuests">+</button>
                 </div>
               </div>
            </div>
          </div>
          
          <!-- Private Reservations Tab -->
          <div v-if="activeTab === 'private'" class="private-tab">
            <h2 class="main-title">PRIVATE RESERVATIONS</h2>
            <p class="coming-soon">Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Date Picker Popup -->
    <div v-if="showDatePicker" class="date-picker-overlay" @click="closeDatePicker">
      <div class="date-picker-popup" @click.stop>
        <div class="date-picker-header">
          <h3>Select Date</h3>
          <button class="close-btn" @click="closeDatePicker">×</button>
        </div>
        
        <div class="calendar-container">
          <div class="calendar-header">
            <button class="nav-button" @click="previousMonth">&lt;</button>
            <h3 class="month-year">{{ currentMonthYear }}</h3>
            <button class="nav-button" @click="nextMonth">&gt;</button>
          </div>
          
          <div class="calendar-grid">
            <div class="day-header" v-for="day in dayHeaders" :key="day">{{ day }}</div>
            <div 
              v-for="date in calendarDates" 
              :key="date.key"
              class="calendar-date"
              :class="{
                'other-month': !date.isCurrentMonth,
                'booked': date.isBooked,
                'available': date.isCurrentMonth && !date.isBooked && !date.isPast,
                'past': date.isPast,
                'selected': selectedDate && selectedDate.getTime() === date.date.getTime()
              }"
              @click="selectDate(date)"
            >
              {{ date.day }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import translationMixin from '@/mixins/translationMixin'

export default {
  name: 'ReservationsView',
  mixins: [translationMixin],
  data() {
    return {
      activeTab: 'booking',
      showDatePicker: false,
      currentDate: new Date(),
      selectedDate: new Date(2025, 1, 20), // Default to Feb 20, 2025
      guestCount: 3,
      bookedDates: [
        // Hard-coded booked dates for demo
        new Date(2024, 11, 15), // December 15, 2024
        new Date(2024, 11, 22), // December 22, 2024
        new Date(2024, 11, 24), // December 24, 2024
        new Date(2024, 11, 25), // December 25, 2024
        new Date(2024, 11, 31), // December 31, 2024
        new Date(2025, 0, 1),   // January 1, 2025
        new Date(2025, 0, 14),  // January 14, 2025
        new Date(2025, 0, 20),  // January 20, 2025
        new Date(2025, 1, 14),  // February 14, 2025
        new Date(2025, 1, 28),  // February 28, 2025
      ],
      bookingForm: {
        time: '20:30',
        name: '',
        phone: '',
        email: ''
      },
      dayHeaders: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }
  },
  computed: {
    ...mapGetters(['isDarkMode']),
    isMobile() {
      return window.innerWidth <= 768;
    },
    currentMonthYear() {
      const monthNames = this.$t('reservations.months');
      const month = monthNames[Object.keys(monthNames)[this.currentDate.getMonth()]];
      return `${month} ${this.currentDate.getFullYear()}`;
    },
    formatDisplayDate() {
      if (!this.selectedDate) return 'Select date';
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return this.selectedDate.toLocaleDateString('en-GB', options);
    },
    calendarDates() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const firstDayOfWeek = firstDay.getDay();
      const daysInMonth = lastDay.getDate();
      
      const dates = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Previous month's trailing days
      const prevMonth = new Date(year, month - 1, 0);
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const date = new Date(year, month - 1, prevMonth.getDate() - i);
        dates.push({
          day: date.getDate(),
          date: date,
          isCurrentMonth: false,
          isBooked: false,
          isPast: date < today,
          key: `prev-${date.getDate()}`
        });
      }
      
      // Current month's days
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const isBooked = this.bookedDates.some(bookedDate => 
          bookedDate.getTime() === date.getTime()
        );
        
        dates.push({
          day: day,
          date: date,
          isCurrentMonth: true,
          isBooked: isBooked,
          isPast: date < today,
          key: `current-${day}`
        });
      }
      
      // Next month's leading days
      const totalCells = 42; // 6 rows × 7 days
      const remainingCells = totalCells - dates.length;
      for (let day = 1; day <= remainingCells; day++) {
        const date = new Date(year, month + 1, day);
        dates.push({
          day: day,
          date: date,
          isCurrentMonth: false,
          isBooked: false,
          isPast: date < today,
          key: `next-${day}`
        });
      }
      
      return dates;
    }
  },
  methods: {
    previousMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    },
    nextMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    },
    selectDate(dateObj) {
      if (!dateObj.isCurrentMonth || dateObj.isBooked || dateObj.isPast) return;
      this.selectedDate = dateObj.date;
      this.showDatePicker = false;
    },
    closeDatePicker() {
      this.showDatePicker = false;
    },
    incrementGuests() {
      if (this.guestCount < 10) {
        this.guestCount++;
      }
    },
    decrementGuests() {
      if (this.guestCount > 1) {
        this.guestCount--;
      }
    }
  }
}
</script>

<style scoped>
.reservations-view {
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.reservations-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  max-width: 100vw;
  width: 100%;
  height: 100vh;
}

.reservations-container {
  width: 100%;
  text-align: center;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--bg-color);
  max-width: 600px;
  margin: 0 auto;
  margin-top: 22px;
}

.reservations-title {
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 2rem;
  letter-spacing: 0.3em;
  text-align: center;
  width: 100%;
}

.tab-navigation {
  display: flex;
  gap: 0;
  margin-bottom: 2rem;
  width: 100%;
  border-bottom: 2px solid var(--text-color);
}

.tab-button {
  background: none;
  border: none;
  color: var(--text-color);
  padding: 1rem 0.5rem;
  font-size: 1.1rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent;
  opacity: 0.7;
  flex: 1;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tab-button.active {
  opacity: 1;
  border-bottom-color: #ca371c;
  font-weight: 500;
}

.tab-button:hover {
  opacity: 1;
}

.tab-content {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.main-title {
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  margin-bottom: 3rem;
  color: var(--text-color);
}

.booking-form {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
}

.form-group {
  display: flex;
  align-items: center;
  padding: 1.5rem 0;
  position: relative;
}

.form-group::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: var(--text-color);
  opacity: 0.3;
}

.form-group label {
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--text-color);
  text-align: left;
  opacity: 1;
  line-height: 1.5;
  flex: 1;
  display: flex;
  align-items: center;
}

.date-input-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: transparent;
  flex: 2;
}

.form-group:hover::after {
  background-color: #ca371c;
  opacity: 0.8;
}

.date-display {
  font-size: 1.2rem;
  color: var(--text-color);
  line-height: 1.5;
}

.date-arrow {
  font-size: 1.2rem;
  color: var(--text-color);
  font-weight: bold;
}

.time-select {
  padding: 0;
  border: none;
  background-color: transparent;
  color: var(--text-color);
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 2;
  text-align: right;
  line-height: 1.5;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.time-select:focus {
  outline: none;
}

.form-group:has(.time-select:focus)::after {
  background-color: #ca371c;
  opacity: 0.8;
}

.guest-counter {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

.counter-btn {
  width: 30px;
  height: 30px;
  border: none;
  background: #8B7355;
  color: white;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.counter-btn:hover {
  background-color: #6B5742;
  color: white;
}

.guest-count {
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--text-color);
  flex: 1;
  text-align: center;
}

.coming-soon {
  font-size: 1.2rem;
  opacity: 0.7;
  color: var(--text-color);
}

/* Date Picker Popup */
.date-picker-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.date-picker-popup {
  background: var(--bg-color);
  border: 2px solid var(--text-color);
  border-radius: 8px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.date-picker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.date-picker-header h3 {
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--text-color);
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--text-color);
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #ca371c;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.nav-button {
  background: none;
  border: 2px solid var(--text-color);
  color: var(--text-color);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-button:hover {
  background-color: var(--text-color);
  color: var(--bg-color);
}

.month-year {
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0;
  color: var(--text-color);
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.day-header {
  background-color: var(--bg-color);
  padding: 0.8rem 0.5rem;
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
  opacity: 0.7;
  color: var(--text-color);
}

.calendar-date {
  background-color: var(--bg-color);
  padding: 0.8rem 0.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  color: var(--text-color);
}

.calendar-date.other-month {
  opacity: 0.3;
  cursor: not-allowed;
}

.calendar-date.past {
  opacity: 0.4;
  cursor: not-allowed;
  text-decoration: line-through;
}

.calendar-date.booked {
  background-color: #ff6b6b;
  color: white;
  cursor: not-allowed;
}

.calendar-date.available:hover {
  background-color: #ca371c;
  color: white;
}

.calendar-date.selected {
  background-color: #ca371c;
  color: white;
  font-weight: bold;
}

.mobile-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: none;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .mobile-background {
    display: block;
  }
  
  .reservations-view {
    height: 100vh;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  
  .reservations-layout {
    position: relative;
    z-index: 2;
  }
  
  .reservations-container {
    background-color: transparent;
    padding: 1rem;
  }
  
  .reservations-title {
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
  
  .tab-navigation {
    border-bottom-color: rgba(255, 255, 255, 0.5);
  }
  
  .tab-button {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.8);
    color: white;
    backdrop-filter: blur(4px);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    padding: 1rem 0.25rem;
    font-size: 1rem;
  }
  
  .tab-button.active {
    background: rgba(255, 255, 255, 0.2);
    border-color: white;
  }
  
  .main-title {
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }
  
  .booking-form {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 2rem;
  }
  
  .form-group label {
    color: #000;
  }
  
  .form-group::after {
    background-color: rgba(0, 0, 0, 0.4);
  }
  
  .date-input-container,
  .time-select {
    color: #000;
  }
  
  .counter-btn {
    background: #8B7355;
    color: white;
    border: none;
  }
  
  .guest-count {
    color: #000;
  }
  
  .coming-soon {
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  }
  
  .date-picker-popup {
    width: 95%;
    margin: 1rem;
  }
}

@media (max-width: 480px) {
  .reservations-title {
    font-size: 1.6rem;
    margin-bottom: 0.5rem;
  }
  
  .main-title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  .booking-form {
    padding: 1.5rem;
    gap: 1.2rem;
  }
  
  .counter-btn {
    width: 45px;
    height: 45px;
    font-size: 1.3rem;
  }
}
</style> 