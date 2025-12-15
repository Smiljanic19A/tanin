<template>
  <div class="reservations-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="page-title">
          <transition name="slide-text" mode="out-in">
            <span :key="currentLanguage + 'reservations.title'">{{ $t('reservations.title') }}</span>
          </transition>
        </h1>
        <div class="title-accent"></div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="reservations-content">
      <!-- Tab Switcher -->
      <div class="tab-switcher">
        <button 
          class="tab-pill" 
          :class="{ active: activeTab === 'booking' }"
          @click="activeTab = 'booking'"
        >
          <span class="tab-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
              <line x1="9" y1="2" x2="9" y2="6"/>
              <line x1="15" y1="2" x2="15" y2="6"/>
            </svg>
          </span>
          <transition name="slide-text" mode="out-in">
            <span :key="currentLanguage + 'reservations.bookTable'">{{ $t('reservations.bookTable') }}</span>
          </transition>
        </button>
        <button 
          class="tab-pill" 
          :class="{ active: activeTab === 'private' }"
          @click="activeTab = 'private'"
        >
          <span class="tab-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </span>
          <transition name="slide-text" mode="out-in">
            <span :key="currentLanguage + 'reservations.privateReservations'">{{ $t('reservations.privateReservations') }}</span>
          </transition>
        </button>
      </div>

      <!-- Book a Table Form -->
      <transition name="fade-slide" mode="out-in">
        <div v-if="activeTab === 'booking'" key="booking" class="form-container">
          <div class="form-card">
            <h2 class="form-title">
              <transition name="slide-text" mode="out-in">
                <span :key="currentLanguage + 'reservations.bookingForm.mainTitle'">{{ $t('reservations.bookingForm.mainTitle') }}</span>
              </transition>
            </h2>
            
            <form class="reservation-form" @submit.prevent="submitBooking">
              <!-- Date & Time Row -->
              <div class="form-row">
                <div class="form-field">
                  <label class="field-label">
                    <span class="label-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <rect x="3" y="4" width="18" height="18" rx="2"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                        <line x1="9" y1="2" x2="9" y2="6"/>
                        <line x1="15" y1="2" x2="15" y2="6"/>
                      </svg>
                    </span>
                    <transition name="slide-text" mode="out-in">
                      <span :key="currentLanguage + 'reservations.bookingForm.date'">{{ $t('reservations.bookingForm.date') }}</span>
                    </transition>
                  </label>
                  <div class="date-selector" @click="showDatePicker = true">
                    <span class="selected-value">{{ formatDisplayDate }}</span>
                    <span class="field-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9,18 15,12 9,6"/>
                      </svg>
                    </span>
                  </div>
                </div>

                <div class="form-field">
                  <label class="field-label">
                    <span class="label-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                    </span>
                    <transition name="slide-text" mode="out-in">
                      <span :key="currentLanguage + 'reservations.bookingForm.time'">{{ $t('reservations.bookingForm.time') }}</span>
                    </transition>
                  </label>
                  <div class="select-wrapper">
                    <select v-model="bookingForm.time" class="styled-select">
                      <option value="">{{ $t('reservations.bookingForm.selectTime') }}</option>
                      <option v-for="timeSlot in timeSlots" :key="timeSlot.value" :value="timeSlot.value">
                        {{ timeSlot.label }}
                      </option>
                    </select>
                    <span class="select-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6,9 12,15 18,9"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Guests Row -->
              <div class="form-field guests-field">
                <label class="field-label">
                  <span class="label-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </span>
                  <transition name="slide-text" mode="out-in">
                    <span :key="currentLanguage + 'reservations.bookingForm.howManyPeople'">{{ $t('reservations.bookingForm.howManyPeople') }}</span>
                  </transition>
                </label>
                <div class="guest-stepper">
                  <button type="button" class="stepper-btn" @click="decrementGuests" :disabled="guestCount <= 1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </button>
                  <div class="guest-display">
                    <span class="guest-number">{{ guestCount }}</span>
                    <span class="guest-label">{{ guestCount === 1 ? 'Guest' : 'Guests' }}</span>
                  </div>
                  <button type="button" class="stepper-btn" @click="incrementGuests" :disabled="guestCount >= 10">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Phone Field -->
              <div class="form-field">
                <label class="field-label">
                  <span class="label-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </span>
                  <transition name="slide-text" mode="out-in">
                    <span :key="currentLanguage + 'reservations.bookingForm.phone'">{{ $t('reservations.bookingForm.phone') }}</span>
                  </transition>
                </label>
                <input 
                  v-model="bookingForm.phone" 
                  type="tel" 
                  class="styled-input"
                  :placeholder="$t('reservations.bookingForm.phone')"
                />
              </div>

              <!-- Submit -->
              <button type="submit" class="submit-button">
                <span class="button-text">
                  <transition name="slide-text" mode="out-in">
                    <span :key="currentLanguage + 'reservations.bookingForm.submitButton'">{{ $t('reservations.bookingForm.submitButton') }}</span>
                  </transition>
                </span>
                <span class="button-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </span>
              </button>
            </form>
          </div>
        </div>

        <!-- Private Reservations Form -->
        <div v-else key="private" class="form-container">
          <div class="form-card form-card-wide">
            <h2 class="form-title">
              <transition name="slide-text" mode="out-in">
                <span :key="currentLanguage + 'reservations.privateForm.mainTitle'">{{ $t('reservations.privateForm.mainTitle') }}</span>
              </transition>
            </h2>
            
            <form class="reservation-form" @submit.prevent="submitPrivateInquiry">
              <!-- Row 1: Date & Email -->
              <div class="form-row">
                <div class="form-field">
                  <label class="field-label">
                    <span class="label-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <rect x="3" y="4" width="18" height="18" rx="2"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                    </span>
                    <transition name="slide-text" mode="out-in">
                      <span :key="currentLanguage + 'reservations.bookingForm.date'">{{ $t('reservations.bookingForm.date') }}</span>
                    </transition>
                  </label>
                  <div class="date-selector" @click="showDatePicker = true">
                    <span class="selected-value">{{ formatPrivateDisplayDate }}</span>
                    <span class="field-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9,18 15,12 9,6"/>
                      </svg>
                    </span>
                  </div>
                </div>

                <div class="form-field">
                  <label class="field-label">
                    <span class="label-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </span>
                    <transition name="slide-text" mode="out-in">
                      <span :key="currentLanguage + 'reservations.privateForm.email'">{{ $t('reservations.privateForm.email') }}</span>
                    </transition>
                  </label>
                  <input 
                    v-model="privateForm.email" 
                    type="email" 
                    class="styled-input"
                    :placeholder="$t('reservations.privateForm.email')"
                  />
                </div>
              </div>

              <!-- Row 2: Event Type, People, Budget -->
              <div class="form-row form-row-triple">
                <div class="form-field">
                  <label class="field-label">
                    <span class="label-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    </span>
                    <transition name="slide-text" mode="out-in">
                      <span :key="currentLanguage + 'reservations.privateForm.eventType'">{{ $t('reservations.privateForm.eventType') }}</span>
                    </transition>
                  </label>
                  <div class="select-wrapper">
                    <select v-model="privateForm.eventType" class="styled-select">
                      <option value="">{{ $t('reservations.privateForm.selectEventType') }}</option>
                      <option v-for="eventType in eventTypes" :key="eventType.value" :value="eventType.value">
                        {{ eventType.label }}
                      </option>
                    </select>
                    <span class="select-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6,9 12,15 18,9"/>
                      </svg>
                    </span>
                  </div>
                </div>

                <div class="form-field">
                  <label class="field-label">
                    <span class="label-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    </span>
                    <transition name="slide-text" mode="out-in">
                      <span :key="currentLanguage + 'reservations.privateForm.peopleRange'">{{ $t('reservations.privateForm.peopleRange') }}</span>
                    </transition>
                  </label>
                  <div class="select-wrapper">
                    <select v-model="privateForm.peopleRange" class="styled-select">
                      <option value="">{{ $t('reservations.privateForm.selectPeopleRange') }}</option>
                      <option v-for="peopleRange in peopleRanges" :key="peopleRange.value" :value="peopleRange.value">
                        {{ peopleRange.label }}
                      </option>
                    </select>
                    <span class="select-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6,9 12,15 18,9"/>
                      </svg>
                    </span>
                  </div>
                </div>

                <div class="form-field">
                  <label class="field-label">
                    <span class="label-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <line x1="12" y1="1" x2="12" y2="23"/>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                      </svg>
                    </span>
                    <transition name="slide-text" mode="out-in">
                      <span :key="currentLanguage + 'reservations.privateForm.budget'">{{ $t('reservations.privateForm.budget') }}</span>
                    </transition>
                  </label>
                  <div class="select-wrapper">
                    <select v-model="privateForm.budget" class="styled-select">
                      <option value="">{{ $t('reservations.privateForm.selectBudget') }}</option>
                      <option v-for="budgetRange in budgetRanges" :key="budgetRange.value" :value="budgetRange.value">
                        {{ budgetRange.label }}
                      </option>
                    </select>
                    <span class="select-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6,9 12,15 18,9"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Message -->
              <div class="form-field message-field">
                <label class="field-label">
                  <span class="label-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </span>
                  <transition name="slide-text" mode="out-in">
                    <span :key="currentLanguage + 'reservations.privateForm.message'">{{ $t('reservations.privateForm.message') }}</span>
                  </transition>
                </label>
                <textarea 
                  v-model="privateForm.message" 
                  class="styled-textarea"
                  :placeholder="$t('reservations.privateForm.messagePlaceholder')"
                  rows="4"
                ></textarea>
              </div>

              <!-- Submit -->
              <button type="submit" class="submit-button">
                <span class="button-text">
                  <transition name="slide-text" mode="out-in">
                    <span :key="currentLanguage + 'reservations.privateForm.submitButton'">{{ $t('reservations.privateForm.submitButton') }}</span>
                  </transition>
                </span>
                <span class="button-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </span>
              </button>
            </form>
          </div>
        </div>
      </transition>
    </section>

    <!-- Date Picker Modal -->
    <transition name="modal-fade">
      <div v-if="showDatePicker" class="modal-overlay" @click="closeDatePicker">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">
              <transition name="slide-text" mode="out-in">
                <span :key="currentLanguage + 'reservations.datePicker.selectDate'">{{ $t('reservations.datePicker.selectDate') }}</span>
              </transition>
            </h3>
            <button class="modal-close" @click="closeDatePicker">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          
          <div class="calendar">
            <div class="calendar-nav">
              <button class="nav-btn" @click="previousMonth">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="15,18 9,12 15,6"/>
                </svg>
              </button>
              <h4 class="calendar-month">{{ currentMonthYear }}</h4>
              <button class="nav-btn" @click="nextMonth">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9,18 15,12 9,6"/>
                </svg>
              </button>
            </div>
            
            <div class="calendar-grid">
              <div class="calendar-weekday" v-for="(day, index) in translatedDayHeaders" :key="index">{{ day }}</div>
              <button 
                v-for="date in calendarDates" 
                :key="date.key"
                type="button"
                class="calendar-day"
                :class="{
                  'other-month': !date.isCurrentMonth,
                  'unavailable': date.isBooked,
                  'available': date.isCurrentMonth && !date.isBooked && !date.isPast,
                  'past': date.isPast,
                  'selected': (activeTab === 'booking' && selectedDate && selectedDate.getTime() === date.date.getTime()) || 
                              (activeTab === 'private' && privateForm.date && privateForm.date.getTime() === date.date.getTime())
                }"
                @click="selectDate(date)"
                :disabled="!date.isCurrentMonth || date.isBooked || date.isPast"
              >
                {{ date.day }}
              </button>
            </div>

            <div class="calendar-legend">
              <div class="legend-item">
                <span class="legend-dot available"></span>
                <span>Available</span>
              </div>
              <div class="legend-item">
                <span class="legend-dot unavailable"></span>
                <span>Unavailable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
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
      selectedDate: new Date(2025, 1, 20),
      guestCount: 2,
      bookedDates: [
        new Date(2024, 11, 15),
        new Date(2024, 11, 22),
        new Date(2024, 11, 24),
        new Date(2024, 11, 25),
        new Date(2024, 11, 31),
        new Date(2025, 0, 1),
        new Date(2025, 0, 14),
        new Date(2025, 0, 20),
        new Date(2025, 1, 14),
        new Date(2025, 1, 28),
      ],
      bookingForm: {
        time: '',
        phone: ''
      },
      privateForm: {
        date: new Date(2025, 1, 20),
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
    currentMonthYear() {
      const monthNames = this.$t('reservations.months');
      const month = monthNames[Object.keys(monthNames)[this.currentDate.getMonth()]];
      return `${month} ${this.currentDate.getFullYear()}`;
    },
    formatDisplayDate() {
      if (!this.selectedDate) return this.$t('reservations.selectDate');
      const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
      return this.selectedDate.toLocaleDateString('en-GB', options);
    },
    formatPrivateDisplayDate() {
      if (!this.privateForm.date) return this.$t('reservations.selectDate');
      const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
      return this.privateForm.date.toLocaleDateString('en-GB', options);
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
      
      const totalCells = 42;
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
      } else {
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
    },
    submitBooking() {
      // Handle booking submission
      console.log('Booking submitted:', {
        date: this.selectedDate,
        time: this.bookingForm.time,
        guests: this.guestCount,
        phone: this.bookingForm.phone
      });
    },
    submitPrivateInquiry() {
      // Handle private inquiry submission
      console.log('Private inquiry submitted:', this.privateForm);
    }
  }
}
</script>

<style scoped>
.reservations-page {
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
}

/* Hero Section */
.hero-section {
  padding: 6rem 2rem 3rem;
  text-align: center;
  position: relative;
}

.hero-content {
  max-width: 600px;
  margin: 0 auto;
}

.page-title {
  font-family: 'Cormorant Garamond', 'Georgia', serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 300;
  letter-spacing: 0.4em;
  margin: 0;
  text-transform: uppercase;
}

.title-accent {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #ca371c, transparent);
  margin: 1.5rem auto 0;
}

/* Main Content */
.reservations-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
}

/* Tab Switcher */
.tab-switcher {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.tab-pill {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: transparent;
  border: 1px solid var(--text-color);
  color: var(--text-color);
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 50px;
  opacity: 0.6;
}

.tab-pill:hover {
  opacity: 1;
  border-color: #ca371c;
  color: #ca371c;
}

.tab-pill.active {
  opacity: 1;
  background: #ca371c;
  border-color: #ca371c;
  color: white;
}

.tab-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-icon svg {
  width: 100%;
  height: 100%;
}

/* Form Container */
.form-container {
  display: flex;
  justify-content: center;
}

.form-card {
  width: 100%;
  max-width: 500px;
  background: var(--bg-color);
  border: 1px solid rgba(202, 55, 28, 0.15);
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.05);
}

.form-card-wide {
  max-width: 800px;
}

.dark-mode .form-card {
  box-shadow: 0 4px 40px rgba(255, 255, 255, 0.02);
}

.form-title {
  font-family: 'Cormorant Garamond', 'Georgia', serif;
  font-size: 1.8rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  margin: 0 0 2.5rem;
  text-align: center;
  color: var(--text-color);
}

/* Form Styles */
.reservation-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-row-triple {
  grid-template-columns: repeat(3, 1fr);
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.field-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: var(--text-color);
  opacity: 0.8;
}

.label-icon {
  width: 16px;
  height: 16px;
  opacity: 0.6;
}

.label-icon svg {
  width: 100%;
  height: 100%;
}

/* Date Selector */
.date-selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background: transparent;
  border: 1px solid rgba(202, 55, 28, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.date-selector:hover {
  border-color: #ca371c;
}

.selected-value {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  color: var(--text-color);
}

.field-arrow {
  width: 16px;
  height: 16px;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.field-arrow svg {
  width: 100%;
  height: 100%;
}

.date-selector:hover .field-arrow {
  opacity: 1;
  color: #ca371c;
  transform: translateX(2px);
}

/* Select Wrapper */
.select-wrapper {
  position: relative;
}

.styled-select {
  width: 100%;
  padding: 1rem 2.5rem 1rem 1.25rem;
  background: transparent;
  border: 1px solid rgba(202, 55, 28, 0.2);
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  color: var(--text-color);
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  transition: all 0.3s ease;
}

.styled-select:hover,
.styled-select:focus {
  border-color: #ca371c;
  outline: none;
}

.styled-select option {
  background: var(--bg-color);
  color: var(--text-color);
}

.select-arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  opacity: 0.5;
  pointer-events: none;
}

.select-arrow svg {
  width: 100%;
  height: 100%;
}

/* Input */
.styled-input {
  width: 100%;
  padding: 1rem 1.25rem;
  background: transparent;
  border: 1px solid rgba(202, 55, 28, 0.2);
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  color: var(--text-color);
  transition: all 0.3s ease;
}

.styled-input:hover,
.styled-input:focus {
  border-color: #ca371c;
  outline: none;
}

.styled-input::placeholder {
  color: var(--text-color);
  opacity: 0.4;
}

/* Textarea */
.styled-textarea {
  width: 100%;
  padding: 1rem 1.25rem;
  background: transparent;
  border: 1px solid rgba(202, 55, 28, 0.2);
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  color: var(--text-color);
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;
}

.styled-textarea:hover,
.styled-textarea:focus {
  border-color: #ca371c;
  outline: none;
}

.styled-textarea::placeholder {
  color: var(--text-color);
  opacity: 0.4;
}

/* Guest Stepper */
.guests-field {
  align-items: stretch;
}

.guest-stepper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 0.75rem;
  background: transparent;
  border: 1px solid rgba(202, 55, 28, 0.2);
  border-radius: 8px;
}

.stepper-btn {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--text-color);
  border-radius: 50%;
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.stepper-btn:hover:not(:disabled) {
  background: #ca371c;
  border-color: #ca371c;
  color: white;
  transform: scale(1.05);
}

.stepper-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.stepper-btn svg {
  width: 20px;
  height: 20px;
}

.guest-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
}

.guest-number {
  font-family: 'Cormorant Garamond', 'Georgia', serif;
  font-size: 2.5rem;
  font-weight: 300;
  line-height: 1;
  color: #ca371c;
}

.guest-label {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.6;
  margin-top: 0.25rem;
}

/* Submit Button */
.submit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 1.25rem 2rem;
  margin-top: 1rem;
  background: #ca371c;
  border: none;
  border-radius: 8px;
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.submit-button:hover {
  background: #a82e17;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(202, 55, 28, 0.3);
}

.button-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.button-icon svg {
  width: 100%;
  height: 100%;
}

.submit-button:hover .button-icon {
  transform: translateX(4px);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 1rem;
}

.modal-container {
  background: var(--bg-color);
  border-radius: 16px;
  width: 100%;
  max-width: 420px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid rgba(202, 55, 28, 0.1);
}

.modal-title {
  font-family: 'Cormorant Garamond', 'Georgia', serif;
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  margin: 0;
}

.modal-close {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: rgba(202, 55, 28, 0.1);
  color: #ca371c;
}

.modal-close svg {
  width: 20px;
  height: 20px;
}

/* Calendar */
.calendar {
  padding: 1.5rem;
}

.calendar-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.nav-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--text-color);
  border-radius: 50%;
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background: var(--text-color);
  color: var(--bg-color);
}

.nav-btn svg {
  width: 18px;
  height: 18px;
}

.calendar-month {
  font-family: 'Cormorant Garamond', 'Georgia', serif;
  font-size: 1.25rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  margin: 0;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.calendar-weekday {
  padding: 0.75rem 0.25rem;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  opacity: 0.5;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.2s ease;
}

.calendar-day.other-month {
  opacity: 0.2;
  cursor: default;
}

.calendar-day.past {
  opacity: 0.3;
  cursor: default;
  text-decoration: line-through;
}

.calendar-day.unavailable {
  background: rgba(202, 55, 28, 0.15);
  color: #ca371c;
  cursor: not-allowed;
}

.calendar-day.available:hover {
  background: rgba(202, 55, 28, 0.1);
  color: #ca371c;
}

.calendar-day.selected {
  background: #ca371c;
  color: white;
  font-weight: 600;
}

.calendar-legend {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(202, 55, 28, 0.1);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  opacity: 0.7;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 4px;
}

.legend-dot.available {
  background: var(--text-color);
  opacity: 0.3;
}

.legend-dot.unavailable {
  background: rgba(202, 55, 28, 0.3);
}

/* Animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal-container,
.modal-fade-leave-to .modal-container {
  transform: scale(0.95) translateY(20px);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    padding: 5rem 1.5rem 2rem;
  }

  .reservations-content {
    padding: 0 1rem 3rem;
  }

  .tab-switcher {
    flex-direction: column;
    gap: 0.75rem;
  }

  .tab-pill {
    width: 100%;
    justify-content: center;
  }

  .form-card {
    padding: 2rem 1.5rem;
  }

  .form-row,
  .form-row-triple {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .form-title {
    font-size: 1.5rem;
    letter-spacing: 0.15em;
  }

  .guest-stepper {
    gap: 1rem;
  }

  .stepper-btn {
    width: 48px;
    height: 48px;
  }

  .guest-number {
    font-size: 2rem;
  }

  .modal-container {
    max-height: 85vh;
  }

  .calendar {
    padding: 1rem;
  }

  .calendar-day {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 4rem 1rem 1.5rem;
  }

  .page-title {
    letter-spacing: 0.2em;
  }

  .form-card {
    padding: 1.5rem 1rem;
    border-radius: 12px;
  }

  .form-title {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
  }

  .styled-select,
  .styled-input,
  .date-selector {
    padding: 0.875rem 1rem;
  }

  .submit-button {
    padding: 1rem 1.5rem;
    font-size: 0.9rem;
  }

  .calendar-legend {
    gap: 1rem;
  }
}
</style>
