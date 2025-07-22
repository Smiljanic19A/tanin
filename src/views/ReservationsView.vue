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
            <h2 class="tab-title">
              <transition name="slide-text" mode="out-in">
                <span :key="currentLanguage + 'reservations.bookTable2'">{{ $t('reservations.bookTable') }}</span>
              </transition>
            </h2>
            <p class="tab-description">
              <transition name="slide-text" mode="out-in">
                <span :key="currentLanguage + 'reservations.selectDate'">{{ $t('reservations.selectDate') }}</span>
              </transition>
            </p>
            
            <!-- Desktop Layout: Calendar + Form Side by Side -->
            <div class="booking-content">
              <!-- Calendar -->
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
              
              <!-- Booking Form -->
              <div v-if="selectedDate" class="booking-form">
                <h4 class="form-title">{{ $t('reservations.selectedDate') }} {{ formatSelectedDate }}</h4>
                <form @submit.prevent="submitBooking">
                  <div class="form-group">
                    <label for="guests">{{ $t('reservations.numberOfGuests') }}</label>
                    <select id="guests" v-model="bookingForm.guests" required>
                      <option value="">{{ $t('reservations.selectGuests') }}</option>
                      <option v-for="n in 10" :key="n" :value="n">{{ n }} guest{{ n > 1 ? 's' : '' }}</option>
                    </select>
                  </div>
                  
                  <div class="form-group">
                    <label for="time">{{ $t('reservations.preferredTime') }}</label>
                    <select id="time" v-model="bookingForm.time" required>
                      <option value="">{{ $t('reservations.selectTime') }}</option>
                      <option v-for="(label, time) in $t('reservations.timeSlots')" :key="time" :value="time">{{ label }}</option>
                    </select>
                  </div>
                  
                  <div class="form-group">
                    <label for="name">{{ $t('reservations.name') }}</label>
                    <input type="text" id="name" v-model="bookingForm.name" required>
                  </div>
                  
                  <div class="form-group">
                    <label for="phone">{{ $t('reservations.phone') }}</label>
                    <input type="tel" id="phone" v-model="bookingForm.phone" required>
                  </div>
                  
                  <div class="form-group">
                    <label for="email">{{ $t('reservations.email') }}</label>
                    <input type="email" id="email" v-model="bookingForm.email" required>
                  </div>
                  
                  <button type="submit" class="submit-button">{{ $t('reservations.bookTableButton') }}</button>
                </form>
              </div>
            </div>
          </div>
          
          <!-- Private Reservations Tab -->
          <div v-if="activeTab === 'private'" class="private-tab">
            <h2 class="tab-title">
              <transition name="slide-text" mode="out-in">
                <span :key="currentLanguage + 'reservations.privateTitle'">{{ $t('reservations.privateTitle') }}</span>
              </transition>
            </h2>
            <p class="tab-description">
              <transition name="slide-text" mode="out-in">
                <span :key="currentLanguage + 'reservations.privateDescription'">{{ $t('reservations.privateDescription') }}</span>
              </transition>
            </p>
            
            <form @submit.prevent="submitPrivateReservation" class="private-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="private-name">Name *</label>
                  <input type="text" id="private-name" v-model="privateForm.name" required>
                </div>
                
                <div class="form-group">
                  <label for="private-email">Email *</label>
                  <input type="email" id="private-email" v-model="privateForm.email" required>
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="private-phone">Phone *</label>
                  <input type="tel" id="private-phone" v-model="privateForm.phone" required>
                </div>
                
                <div class="form-group">
                  <label for="event-date">Preferred Date</label>
                  <input type="date" id="event-date" v-model="privateForm.date">
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="event-type">Event Type</label>
                  <select id="event-type" v-model="privateForm.eventType">
                    <option value="">Select event type</option>
                    <option value="birthday">Birthday Party</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="wedding">Wedding Reception</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div class="form-group">
                  <label for="guest-count">Expected Guests</label>
                  <input type="number" id="guest-count" v-model="privateForm.guestCount" min="1" max="100">
                </div>
              </div>
              
              <div class="form-group">
                <label for="special-requests">Special Requests / Message *</label>
                <textarea 
                  id="special-requests" 
                  v-model="privateForm.message" 
                  rows="5" 
                  placeholder="Tell us about your event, special dietary requirements, decoration preferences, or any other details..."
                  required
                ></textarea>
              </div>
              
              <button type="submit" class="submit-button">Send Inquiry</button>
            </form>
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
      currentDate: new Date(),
      selectedDate: null,
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
      ],
      bookingForm: {
        guests: '',
        time: '',
        name: '',
        phone: '',
        email: ''
      },
      privateForm: {
        name: '',
        email: '',
        phone: '',
        date: '',
        eventType: '',
        guestCount: '',
        budget: '',
        message: ''
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
    formatSelectedDate() {
      if (!this.selectedDate) return '';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return this.selectedDate.toLocaleDateString('en-US', options);
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
      // Reset form when selecting new date
      this.bookingForm = {
        guests: '',
        time: '',
        name: '',
        phone: '',
        email: ''
      };
    },
    submitBooking() {
      alert(`Booking request submitted for ${this.formatSelectedDate} at ${this.bookingForm.time} for ${this.bookingForm.guests} guests. Contact: ${this.bookingForm.name} (${this.bookingForm.phone})`);
      // Here you would typically send the data to your backend
      console.log('Booking submitted:', {
        date: this.selectedDate,
        ...this.bookingForm
      });
    },
    submitPrivateReservation() {
      alert(`Private reservation inquiry submitted from ${this.privateForm.name}. We'll contact you soon!`);
      // Here you would typically send the data to your backend
      console.log('Private reservation submitted:', this.privateForm);
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
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--bg-color);
  overflow: hidden;
  max-width: 1200px;
  margin: 0 auto;
}

.reservations-title {
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 1rem;
  letter-spacing: 0.3em;
  text-align: center;
  width: 100%;
}

.tab-navigation {
  display: flex;
  justify-content: center;
  gap: 0;
  margin-bottom: 1rem;
  width: 100%;
  border-bottom: 2px solid var(--text-color);
}

.tab-button {
  background: none;
  border: none;
  color: var(--text-color);
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent;
  opacity: 0.7;
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
  justify-content: center;
}

.tab-title {
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.tab-description {
  margin-bottom: 1rem;
  opacity: 0.8;
  font-size: 1rem;
}

/* Booking Tab Layout */
.booking-content {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  height: calc(100vh - 200px);
  overflow: hidden;
}

/* Calendar Styles */
.calendar-container {
  flex: 1;
  max-width: 450px;
  min-width: 350px;
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
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0;
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
  padding: 0.5rem 0.25rem;
  text-align: center;
  font-weight: 600;
  font-size: 0.8rem;
  opacity: 0.7;
}

.calendar-date {
  background-color: var(--bg-color);
  padding: 0.5rem 0.25rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
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

/* Form Styles */
.booking-form {
  flex: 1;
  max-width: 350px;
  min-width: 300px;
  padding: 1.5rem;
  border: 2px solid var(--text-color);
  border-radius: 8px;
  background-color: var(--bg-color);
  height: fit-content;
  max-height: calc(100vh - 250px);
  overflow-y: auto;
}

.form-title {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: var(--text-color);
  font-weight: 400;
}

.private-form {
  width: 100%;
  max-width: 600px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-color);
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.6rem;
  border: 2px solid var(--text-color);
  background-color: var(--bg-color);
  color: var(--text-color);
  border-radius: 4px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #ca371c;
}

.submit-button {
  background: none;
  border: 2px solid var(--text-color);
  color: var(--text-color);
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  width: 100%;
  margin-top: 0.5rem;
}

.submit-button:hover {
  background-color: var(--text-color);
  color: var(--bg-color);
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
    flex-direction: column;
    height: 100vh;
    position: relative;
    z-index: 2;
  }
  
  .reservations-container {
    width: 100%;
    height: 100vh;
    padding: 0;
    background-color: transparent;
    text-align: center;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    margin: 0;
    max-width: none;
  }
  
  .reservations-title {
    font-size: 2.2rem;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    letter-spacing: 0.3em;
    margin: 1rem 0 0.8rem 0;
    padding: 0;
  }
  
  .tab-navigation {
    margin: 0 0 0.5rem 0;
    border-bottom-color: rgba(255, 255, 255, 0.5);
    padding: 0 1rem;
  }
  
  .tab-button {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.8);
    color: white;
    backdrop-filter: blur(4px);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
  
  .tab-button.active {
    background: rgba(255, 255, 255, 0.2);
    border-color: white;
  }
  
  .tab-content {
    height: calc(100vh - 140px);
    overflow-y: auto;
    padding: 0 1rem;
    flex: 1;
  }
  
  .tab-title {
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
  }
  
  .tab-description {
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  
  .booking-content {
    flex-direction: column;
    gap: 1.5rem;
    height: auto;
    overflow: visible;
  }
  
  .calendar-container {
    min-width: auto;
    max-width: 100%;
  }
  
  .calendar-header {
    margin-bottom: 1rem;
  }
  
  .month-year {
    font-size: 1.8rem;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  }
  
  .nav-button {
    border-color: rgba(255, 255, 255, 0.8);
    color: white;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(4px);
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }
  
  .nav-button:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
  
  .calendar-grid {
    font-size: 1.4rem;
    gap: 2px;
  }
  
  .day-header {
    background: rgba(255, 255, 255, 0.9);
    color: #000;
    padding: 1.2rem 0.3rem;
    font-size: 1.1rem;
    font-weight: bold;
  }
  
  .calendar-date {
    min-height: 60px;
    padding: 1.2rem 0.3rem;
    font-size: 1.4rem;
    background: rgba(255, 255, 255, 0.9);
    color: #000;
  }
  
  .calendar-date.other-month {
    background: rgba(255, 255, 255, 0.5);
    opacity: 0.5;
  }
  
  .calendar-date.past {
    background: rgba(255, 255, 255, 0.6);
    opacity: 0.6;
  }
  
  .calendar-date.booked {
    background-color: #ff6b6b;
    color: white;
  }
  
  .calendar-date.available:hover,
  .calendar-date.selected {
    background-color: #ca371c;
    color: white;
  }
  
  .booking-form {
    min-width: auto;
    max-width: 100%;
    margin: 0;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    max-height: none;
    overflow-y: visible;
    border-radius: 10px;
  }
  
  .form-title {
    color: #000;
    text-shadow: none;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    font-weight: 500;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group label {
    color: #000;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    background: rgba(255, 255, 255, 0.9);
    color: #000;
    border-color: rgba(0, 0, 0, 0.3);
    font-size: 1rem;
    padding: 0.8rem;
    min-height: 45px;
  }
  
  .submit-button {
    background: rgba(202, 55, 28, 0.9);
    border: 2px solid #ca371c;
    color: white;
    backdrop-filter: blur(4px);
    text-shadow: none;
    padding: 1rem;
    font-size: 1.1rem;
    min-height: 50px;
  }
  
  .submit-button:hover {
    background: #ca371c;
    color: white;
    border-color: #ca371c;
  }
  
  /* Private Form Mobile Styles */
  .private-form {
    max-width: 100%;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 0.8rem;
    margin-bottom: 0.8rem;
  }
  
  .private-form .form-group input,
  .private-form .form-group select,
  .private-form .form-group textarea {
    background: rgba(255, 255, 255, 0.95);
    color: #000;
    border-color: rgba(0, 0, 0, 0.3);
  }
  
  .private-form .form-group label {
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
    font-size: 0.9rem;
  }
  
  .private-form .submit-button {
    background: rgba(202, 55, 28, 0.9);
    border: 2px solid #ca371c;
    color: white;
  }
}

@media (max-width: 480px) {
  .reservations-title {
    font-size: 1.8rem;
    margin: 0.8rem 0 0.5rem 0;
    letter-spacing: 0.2em;
  }
  
  .tab-button {
    padding: 0.7rem 1rem;
    font-size: 0.9rem;
  }
  
  .tab-content {
    height: calc(100vh - 120px);
    padding: 0 0.8rem;
  }
  
  .tab-title {
    font-size: 1.2rem;
  }
  
  .tab-description {
    font-size: 0.9rem;
  }
  
  .booking-content {
    gap: 1.2rem;
  }
  
  .calendar-date {
    min-height: 55px;
    font-size: 1.2rem;
    padding: 1rem 0.2rem;
  }
  
  .day-header {
    padding: 1rem 0.2rem;
    font-size: 1rem;
  }
  
  .nav-button {
    width: 45px;
    height: 45px;
    font-size: 1.3rem;
  }
  
  .month-year {
    font-size: 1.6rem;
  }
  
  .booking-form {
    padding: 1.2rem;
  }
  
  .form-title {
    font-size: 1rem;
    margin-bottom: 0.8rem;
  }
  
  .form-group {
    margin-bottom: 0.8rem;
  }
  
  .form-group label {
    font-size: 0.9rem;
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 0.7rem;
    font-size: 0.9rem;
    min-height: 40px;
  }
  
  .submit-button {
    padding: 0.9rem;
    font-size: 1rem;
    min-height: 45px;
  }
}
</style> 