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
            <h2 class="main-title">
              <transition name="slide-text" mode="out-in">
                <span :key="currentLanguage + 'reservations.bookingForm.mainTitle'">{{ $t('reservations.bookingForm.mainTitle') }}</span>
              </transition>
            </h2>
            
            <div class="booking-form">
              <!-- Date Selection -->
              <div class="form-group">
                <label>
                  <transition name="slide-text" mode="out-in">
                    <span :key="currentLanguage + 'reservations.bookingForm.date'">{{ $t('reservations.bookingForm.date') }}</span>
                  </transition>
                </label>
                <div class="date-input-container" @click="showDatePicker = true">
                  <span class="date-display">{{ formatDisplayDate }}</span>
                </div>
              </div>
              
              <!-- Time Selection -->
              <div class="form-group">
                <label>
                  <transition name="slide-text" mode="out-in">
                    <span :key="currentLanguage + 'reservations.bookingForm.time'">{{ $t('reservations.bookingForm.time') }}</span>
                  </transition>
                </label>
                <select v-model="bookingForm.time" class="time-select">
                  <option value="">{{ $t('reservations.bookingForm.selectTime') }}</option>
                  <option v-for="timeSlot in timeSlots" :key="timeSlot.value" :value="timeSlot.value">
                    {{ timeSlot.label }}
                  </option>
                </select>
              </div>
              
                             <!-- Guest Counter -->
               <div class="form-group">
                 <label>
                   <transition name="slide-text" mode="out-in">
                     <span :key="currentLanguage + 'reservations.bookingForm.howManyPeople'">{{ $t('reservations.bookingForm.howManyPeople') }}</span>
                   </transition>
                 </label>
                 <div class="guest-counter">
                   <button type="button" class="counter-btn" @click="decrementGuests">-</button>
                   <span class="guest-count">{{ guestCount }}</span>
                   <button type="button" class="counter-btn" @click="incrementGuests">+</button>
                 </div>
               </div>
               
               <!-- Submit Button -->
               <div class="form-group submit-group">
                 <button type="submit" class="submit-btn">
                   <transition name="slide-text" mode="out-in">
                     <span :key="currentLanguage + 'reservations.bookingForm.submitButton'">{{ $t('reservations.bookingForm.submitButton') }}</span>
                   </transition>
                 </button>
               </div>
            </div>
          </div>
          
          <!-- Private Reservations Tab -->
          <div v-if="activeTab === 'private'" class="private-tab">
            <h2 class="main-title">
              <transition name="slide-text" mode="out-in">
                <span :key="currentLanguage + 'reservations.privateForm.mainTitle'">{{ $t('reservations.privateForm.mainTitle') }}</span>
              </transition>
            </h2>
            
            <div class="booking-form private-form">
              <!-- Row 1: Date and Contact Email -->
              <div class="form-row">
                <!-- Date Selection -->
                <div class="form-group form-group-half">
                  <label>
                    <transition name="slide-text" mode="out-in">
                      <span :key="currentLanguage + 'reservations.bookingForm.date'">{{ $t('reservations.bookingForm.date') }}</span>
                    </transition>
                  </label>
                  <div class="date-input-container" @click="showDatePicker = true">
                    <span class="date-display">{{ formatPrivateDisplayDate }}</span>
                  </div>
                </div>
                
                <!-- Contact Email -->
                <div class="form-group form-group-half">
                  <label>
                    <transition name="slide-text" mode="out-in">
                      <span :key="currentLanguage + 'reservations.privateForm.email'">{{ $t('reservations.privateForm.email') }}</span>
                    </transition>
                  </label>
                  <input 
                    v-model="privateForm.email" 
                    type="email" 
                    class="text-input"
                    :placeholder="$t('reservations.privateForm.email')"
                  />
                </div>
              </div>
              
              <!-- Row 2: Event Type, Number of People, and Budget -->
              <div class="form-row">
                <!-- Event Type -->
                <div class="form-group form-group-third">
                  <label>
                    <transition name="slide-text" mode="out-in">
                      <span :key="currentLanguage + 'reservations.privateForm.eventType'">{{ $t('reservations.privateForm.eventType') }}</span>
                    </transition>
                  </label>
                  <select v-model="privateForm.eventType" class="time-select">
                    <option value="">{{ $t('reservations.privateForm.selectEventType') }}</option>
                    <option v-for="eventType in eventTypes" :key="eventType.value" :value="eventType.value">
                      {{ eventType.label }}
                    </option>
                  </select>
                </div>
                
                <!-- Number of People -->
                <div class="form-group form-group-third">
                  <label>
                    <transition name="slide-text" mode="out-in">
                      <span :key="currentLanguage + 'reservations.privateForm.peopleRange'">{{ $t('reservations.privateForm.peopleRange') }}</span>
                    </transition>
                  </label>
                  <select v-model="privateForm.peopleRange" class="time-select">
                    <option value="">{{ $t('reservations.privateForm.selectPeopleRange') }}</option>
                    <option v-for="peopleRange in peopleRanges" :key="peopleRange.value" :value="peopleRange.value">
                      {{ peopleRange.label }}
                    </option>
                  </select>
                </div>
                
                <!-- Budget -->
                <div class="form-group form-group-third">
                  <label>
                    <transition name="slide-text" mode="out-in">
                      <span :key="currentLanguage + 'reservations.privateForm.budget'">{{ $t('reservations.privateForm.budget') }}</span>
                    </transition>
                  </label>
                  <select v-model="privateForm.budget" class="time-select">
                    <option value="">{{ $t('reservations.privateForm.selectBudget') }}</option>
                    <option v-for="budgetRange in budgetRanges" :key="budgetRange.value" :value="budgetRange.value">
                      {{ budgetRange.label }}
                    </option>
                  </select>
                </div>
              </div>
              
              <!-- Message -->
              <div class="form-group message-group">
                <label>
                  <transition name="slide-text" mode="out-in">
                    <span :key="currentLanguage + 'reservations.privateForm.message'">{{ $t('reservations.privateForm.message') }}</span>
                  </transition>
                </label>
                <textarea 
                  v-model="privateForm.message" 
                  class="message-input"
                  :placeholder="$t('reservations.privateForm.messagePlaceholder')"
                  rows="4"
                ></textarea>
              </div>
              
              <!-- Submit Button -->
              <div class="form-group submit-group">
                <button type="submit" class="submit-btn">
                  <transition name="slide-text" mode="out-in">
                    <span :key="currentLanguage + 'reservations.privateForm.submitButton'">{{ $t('reservations.privateForm.submitButton') }}</span>
                  </transition>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Date Picker Popup -->
    <div v-if="showDatePicker" class="date-picker-overlay" @click="closeDatePicker">
      <div class="date-picker-popup" @click.stop>
        <div class="date-picker-header">
          <h3>
            <transition name="slide-text" mode="out-in">
              <span :key="currentLanguage + 'reservations.datePicker.selectDate'">{{ $t('reservations.datePicker.selectDate') }}</span>
            </transition>
          </h3>
          <button class="close-btn" @click="closeDatePicker">×</button>
        </div>
        
        <div class="calendar-container">
          <div class="calendar-header">
            <button class="nav-button" @click="previousMonth">&lt;</button>
            <h3 class="month-year">{{ currentMonthYear }}</h3>
            <button class="nav-button" @click="nextMonth">&gt;</button>
          </div>
          
          <div class="calendar-grid">
            <div class="day-header" v-for="(day, index) in translatedDayHeaders" :key="index">{{ day }}</div>
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
      privateForm: {
        date: new Date(2025, 1, 20), // Default to Feb 20, 2025
        email: '',
        eventType: '',
        message: '',
        budget: '',
        peopleRange: ''
      }
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
      if (!this.selectedDate) return this.$t('reservations.selectDate');
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return this.selectedDate.toLocaleDateString('en-GB', options);
    },
    translatedDayHeaders() {
      return this.$t('reservations.datePicker.dayHeaders');
    },
    timeSlots() {
      const slots = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'];
      return slots.map(slot => ({
        value: slot,
        label: this.$t(`reservations.timeSlots.${slot}`)
      }));
    },
    eventTypes() {
      const types = ['birthday', 'anniversary', 'corporate', 'wedding', 'other'];
      return types.map(type => ({
        value: type,
        label: this.$t(`reservations.privateForm.eventTypes.${type}`)
      }));
    },
    budgetRanges() {
      const ranges = ['under1000', '1000to3000', '3000to5000', '5000to10000', 'over10000'];
      return ranges.map(range => ({
        value: range,
        label: this.$t(`reservations.privateForm.budgetRanges.${range}`)
      }));
    },
    peopleRanges() {
      const ranges = ['under10', '10to30', '30to50', 'over50'];
      return ranges.map(range => ({
        value: range,
        label: this.$t(`reservations.privateForm.peopleRanges.${range}`)
      }));
    },
    formatPrivateDisplayDate() {
      if (!this.privateForm.date) return this.$t('reservations.selectDate');
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return this.privateForm.date.toLocaleDateString('en-GB', options);
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
      if (this.activeTab === 'booking') {
        this.selectedDate = dateObj.date;
      } else if (this.activeTab === 'private') {
        this.privateForm.date = dateObj.date;
      }
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
.private-tab {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
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
  min-height: 500px;
  overflow-y: auto;
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

.text-input {
  padding: 0;
  border: none;
  background-color: transparent;
  color: var(--text-color);
  font-size: 1.2rem;
  cursor: text;
  transition: all 0.3s ease;
  flex: 2;
  text-align: right;
  line-height: 1.5;
  outline: none;
}

.text-input::placeholder {
  color: var(--text-color);
  opacity: 0.5;
}

.message-group {
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

.message-group label {
  text-align: left;
  flex: none;
  width: 100%;
}

.message-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid var(--text-color);
  background-color: transparent;
  color: var(--text-color);
  font-size: 1rem;
  line-height: 1.5;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: inherit;
  border-radius: 8px;
  min-height: 120px;
}

.message-input::placeholder {
  color: var(--text-color);
  opacity: 0.5;
}

.message-input:focus {
  outline: none;
  border-color: #ca371c;
}

.submit-group {
  justify-content: center;
  padding: 3rem 0 1rem 0;
}

.submit-btn {
  background-color: #ca371c;
  color: white;
  border: none;
  padding: 1rem 3rem;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 4px;
  text-transform: uppercase;
}

.submit-btn:hover {
  background-color: #b52f16;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(202, 55, 28, 0.3);
}

.submit-btn:active {
  transform: translateY(0);
}

/* Desktop-only private form row layout */
.private-form {
  max-width: 800px;
  width: 100%;
}

.form-row {
  display: flex;
  gap: 3rem;
  width: 100%;
  margin-bottom: 2rem;
}

.form-group-half {
  flex: 1;
}

.form-group-third {
  flex: 1;
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
    display: none;
  }
  
  .reservations-view {
    height: 100vh;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bg-color);
  }
  
  .reservations-layout {
    position: relative;
    z-index: 2;
    height: 100vh;
  }
  
  .reservations-container {
    background-color: var(--bg-color);
    padding: 0;
    height: 100vh;
    margin-top: 0;
    max-width: 100%;
    justify-content: flex-start;
  }
  
  .reservations-title {
    color: var(--text-color);
    text-shadow: none;
    font-size: 2rem;
    margin-bottom: 1rem;
    margin-top: 2rem;
    padding: 0 1rem;
  }
  
  .tab-navigation {
    border: none;
    border-bottom: none;
    margin-bottom: 1rem;
    padding: 0 1rem;
    gap: 0.8rem;
    display: flex;
    flex-direction: column;
  }
  
  .tab-button {
    background: transparent;
    border: 2px solid var(--text-color);
    color: var(--text-color);
    backdrop-filter: none;
    text-shadow: none;
    padding: 1rem 1.5rem;
    font-size: 1rem;
    border-radius: 25px;
    transition: all 0.3s ease;
    font-weight: 400;
    letter-spacing: 0.05em;
    opacity: 0.7;
    width: 100%;
    text-align: center;
    white-space: nowrap;
    overflow: visible;
  }
  
  .tab-button.active {
    background: var(--text-color);
    border-color: var(--text-color);
    color: var(--bg-color);
    text-shadow: none;
    font-weight: 500;
    transform: scale(1.02);
    opacity: 1;
  }
  
  .tab-button:hover {
    opacity: 1;
    transform: translateY(-1px);
  }
  
  .tab-button.active:hover {
    transform: scale(1.02) translateY(-1px);
  }
  
  .tab-content {
    flex: 1;
    height: calc(100vh - 200px);
    overflow-y: auto;
  }
  
  .main-title {
    color: var(--text-color);
    text-shadow: none;
    font-size: 1.8rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
  
  .booking-form {
    background: var(--bg-color);
    backdrop-filter: none;
    padding: 2rem 1.5rem;
    margin: 0;
    border-radius: 0;
    width: 100%;
    max-width: 100%;
    min-height: calc(100vh - 250px);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 2.5rem;
  }
  
  .form-group {
    padding: 2rem 0;
  }
  
  .form-group label {
    color: var(--text-color);
    font-size: 1.1rem;
    font-weight: 500;
  }
  
  .form-group::after {
    background-color: var(--text-color);
    opacity: 0.3;
  }
  
  .form-group:hover::after {
    background-color: #ca371c;
    opacity: 0.8;
  }
  
  .date-input-container,
  .time-select {
    color: var(--text-color);
    font-size: 1.1rem;
  }
  
  .counter-btn {
    background: #8B7355;
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    font-size: 1.4rem;
  }
  
  .guest-count {
    color: var(--text-color);
    font-size: 1.4rem;
  }
  
  .text-input {
    color: var(--text-color);
    font-size: 1.1rem;
  }
  
  .text-input::placeholder {
    color: var(--text-color);
    opacity: 0.5;
  }
  
  .message-input {
    background-color: var(--bg-color);
    color: var(--text-color);
    border-color: var(--text-color);
  }
  
  .message-input::placeholder {
    color: var(--text-color);
    opacity: 0.5;
  }
  
  .message-input:focus {
    border-color: #ca371c;
  }
  
  .submit-btn {
    background-color: #ca371c;
    color: white;
    padding: 1.2rem 3rem;
    font-size: 1rem;
  }
  
  .submit-btn:hover {
    background-color: #b52f16;
    transform: translateY(-1px);
  }
  
  /* Mobile override for private form - single column layout */
  .private-form {
    max-width: 100%;
  }
  
  .form-row {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  
  .form-group-half,
  .form-group-third {
    flex: none;
  }
  
  .coming-soon {
    color: var(--text-color);
    text-shadow: none;
    margin-top: 2rem;
    font-size: 1.3rem;
  }
  
  .date-picker-popup {
    width: 95%;
    margin: 1rem auto;
    padding: 1rem;
    max-width: none;
    max-height: 85vh;
    overflow-y: auto;
  }
  
  .calendar-grid {
    gap: 1px;
    background-color: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .day-header {
    background-color: var(--bg-color);
    padding: 0.8rem 0.2rem;
    text-align: center;
    font-weight: 600;
    font-size: 0.85rem;
    color: var(--text-color);
    opacity: 0.8;
  }
  
  .calendar-date {
    background-color: var(--bg-color);
    padding: 1.2rem 0.2rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    color: var(--text-color);
  }
  
  .day-header {
    background-color: var(--bg-color);
    padding: 1rem 0.2rem;
    text-align: center;
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--text-color);
    opacity: 0.8;
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