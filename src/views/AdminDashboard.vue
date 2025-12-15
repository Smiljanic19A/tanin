<template>
  <div class="admin-dashboard" :class="{ 'dark-mode': isDarkMode }">
    <!-- Header -->
    <header class="admin-header">
      <div class="header-left">
        <router-link to="/" class="logo-link">
          <img :src="currentLogo" alt="Tanin Logo" class="header-logo">
        </router-link>
        <div class="header-divider"></div>
        <h1 class="header-title">Admin Panel</h1>
      </div>
      <div class="header-right">
        <span class="admin-email">{{ adminEmail }}</span>
        <button class="logout-btn" @click="handleLogout">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="admin-main">
      <!-- Stats Section -->
      <div class="stats-section">
        <div class="stats-header">
          <h2 class="stats-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M18 20V10"/>
              <path d="M12 20V4"/>
              <path d="M6 20v-6"/>
            </svg>
            <span>Daily Statistics</span>
          </h2>
          <button class="date-picker-btn" @click="showStatsDatePicker = true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
              <line x1="9" y1="2" x2="9" y2="6"/>
              <line x1="15" y1="2" x2="15" y2="6"/>
            </svg>
            <span>{{ formatStatsDate(statsDate) }}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="chevron">
              <polyline points="6,9 12,15 18,9"/>
            </svg>
          </button>
        </div>

        <div v-if="statsLoading" class="stats-loading">
          <div class="loading-spinner small"></div>
          <span>Loading stats...</span>
        </div>

        <div v-else-if="stats" class="stats-grid">
          <!-- Total Reservations -->
          <div class="stat-card">
            <div class="stat-icon total">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-value">{{ stats.total_reservations }}</span>
              <span class="stat-label">Total Reservations</span>
            </div>
          </div>

          <!-- Accepted -->
          <div class="stat-card">
            <div class="stat-icon accepted">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-value">{{ stats.total_accepted }}</span>
              <span class="stat-label">Accepted</span>
            </div>
          </div>

          <!-- Total Headcount -->
          <div class="stat-card highlight">
            <div class="stat-icon headcount">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-value">{{ stats.total_headcount }}</span>
              <span class="stat-label">Expected Guests</span>
            </div>
          </div>

          <!-- Bookings Breakdown -->
          <div class="stat-card breakdown">
            <div class="stat-icon bookings">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-value">{{ stats.bookings.count }}</span>
              <span class="stat-label">Table Bookings</span>
              <span class="stat-detail">{{ stats.bookings.accepted }} accepted · {{ stats.bookings.headcount }} guests</span>
            </div>
          </div>

          <!-- Private Events Breakdown -->
          <div class="stat-card breakdown">
            <div class="stat-icon private">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-value">{{ stats.private_reservations.count }}</span>
              <span class="stat-label">Private Events</span>
              <span class="stat-detail">{{ stats.private_reservations.accepted }} accepted · ~{{ stats.private_reservations.headcount_estimate }} guests</span>
            </div>
          </div>
        </div>

        <div v-else class="stats-empty">
          <span>No stats available for this date</span>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="tab-navigation">
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'bookings' }"
          @click="activeTab = 'bookings'"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
            <line x1="9" y1="2" x2="9" y2="6"/>
            <line x1="15" y1="2" x2="15" y2="6"/>
          </svg>
          <span>Table Bookings</span>
          <span v-if="pendingBookingsCount > 0" class="badge">{{ pendingBookingsCount }}</span>
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'private' }"
          @click="activeTab = 'private'"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
          <span>Private Events</span>
          <span v-if="pendingPrivateCount > 0" class="badge">{{ pendingPrivateCount }}</span>
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'create' }"
          @click="activeTab = 'create'"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="16"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          <span>Create Reservation</span>
        </button>
      </div>

      <!-- Filters -->
      <div v-if="activeTab !== 'create'" class="filters-bar">
        <div class="filter-group">
          <label>Status:</label>
          <select v-model="filters.status" @change="loadData" class="filter-select">
            <option value="">All</option>
            <option value="0">Pending</option>
            <option value="1">Accepted</option>
            <option value="2">Declined</option>
          </select>
        </div>
        <div class="filter-group">
          <label>From:</label>
          <input type="date" v-model="filters.date_from" @change="loadData" class="filter-input">
        </div>
        <div class="filter-group">
          <label>To:</label>
          <input type="date" v-model="filters.date_to" @change="loadData" class="filter-input">
        </div>
        <button class="refresh-btn" @click="loadData" :disabled="isLoading">
          <svg :class="{ spinning: isLoading }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
          <span>Refresh</span>
        </button>
      </div>

      <!-- Content Area -->
      <div class="content-area">
        <!-- Table Bookings Tab -->
        <transition name="fade-slide" mode="out-in">
          <div v-if="activeTab === 'bookings'" key="bookings" class="tab-content">
            <div v-if="isLoading" class="loading-state">
              <div class="loading-spinner"></div>
              <span>Loading bookings...</span>
            </div>
            <div v-else-if="bookings.length === 0" class="empty-state">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>No bookings found</span>
            </div>
            <div v-else class="reservations-grid">
              <div 
                v-for="booking in bookings" 
                :key="booking.id" 
                class="reservation-card"
                :class="getStatusClass(booking.status)"
              >
                <div class="card-header">
                  <span class="reservation-id">#{{ booking.id }}</span>
                  <span class="status-badge" :class="getStatusClass(booking.status)">
                    {{ getStatusLabel(booking.status) }}
                  </span>
                </div>
                <div class="card-body">
                  <div class="info-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <rect x="3" y="4" width="18" height="18" rx="2"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <span>{{ formatDate(booking.date) }}</span>
                  </div>
                  <div class="info-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span>{{ booking.time }}</span>
                  </div>
                  <div class="info-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                    </svg>
                    <span>{{ booking.guests }} {{ booking.guests === 1 ? 'Guest' : 'Guests' }}</span>
                  </div>
                  <div class="info-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <span>{{ booking.phone }}</span>
                  </div>
                  <div class="info-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                    </svg>
                    <span class="type-badge">{{ getReservationTypeLabel(booking.reservation_type) }}</span>
                  </div>
                </div>
                <div v-if="booking.status === 0" class="card-actions">
                  <button 
                    class="action-btn approve" 
                    @click="approveBooking(booking.id)"
                    :disabled="actionLoading === booking.id"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>Approve</span>
                  </button>
                  <button 
                    class="action-btn decline" 
                    @click="declineBooking(booking.id)"
                    :disabled="actionLoading === booking.id"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                    <span>Decline</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div v-if="bookingsMeta.last_page > 1" class="pagination">
              <button 
                class="page-btn" 
                :disabled="bookingsMeta.current_page === 1"
                @click="changePage('bookings', bookingsMeta.current_page - 1)"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              <span class="page-info">Page {{ bookingsMeta.current_page }} of {{ bookingsMeta.last_page }}</span>
              <button 
                class="page-btn" 
                :disabled="bookingsMeta.current_page === bookingsMeta.last_page"
                @click="changePage('bookings', bookingsMeta.current_page + 1)"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Private Events Tab -->
          <div v-else-if="activeTab === 'private'" key="private" class="tab-content">
            <div v-if="isLoading" class="loading-state">
              <div class="loading-spinner"></div>
              <span>Loading private reservations...</span>
            </div>
            <div v-else-if="privateReservations.length === 0" class="empty-state">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
              </svg>
              <span>No private reservations found</span>
            </div>
            <div v-else class="reservations-grid">
              <div 
                v-for="reservation in privateReservations" 
                :key="reservation.id" 
                class="reservation-card private-card"
                :class="getStatusClass(reservation.status)"
              >
                <div class="card-header">
                  <span class="reservation-id">#{{ reservation.id }}</span>
                  <span class="status-badge" :class="getStatusClass(reservation.status)">
                    {{ getStatusLabel(reservation.status) }}
                  </span>
                </div>
                <div class="card-body">
                  <div class="info-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <rect x="3" y="4" width="18" height="18" rx="2"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <span>{{ formatDate(reservation.date) }}</span>
                  </div>
                  <div class="info-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <span>{{ reservation.email }}</span>
                  </div>
                  <div class="info-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    <span class="type-badge">{{ getEventTypeLabel(reservation.event_type) }}</span>
                  </div>
                  <div class="info-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                    </svg>
                    <span>{{ getPeopleRangeLabel(reservation.people_range) }}</span>
                  </div>
                  <div class="info-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                    <span>{{ getBudgetLabel(reservation.budget) }}</span>
                  </div>
                  <div v-if="reservation.message" class="message-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    <span class="message-text">{{ reservation.message }}</span>
                  </div>
                </div>
                <div v-if="reservation.status === 0" class="card-actions">
                  <button 
                    class="action-btn approve" 
                    @click="approvePrivate(reservation.id)"
                    :disabled="actionLoading === reservation.id"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>Approve</span>
                  </button>
                  <button 
                    class="action-btn decline" 
                    @click="declinePrivate(reservation.id)"
                    :disabled="actionLoading === reservation.id"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                    <span>Decline</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div v-if="privateMeta.last_page > 1" class="pagination">
              <button 
                class="page-btn" 
                :disabled="privateMeta.current_page === 1"
                @click="changePage('private', privateMeta.current_page - 1)"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              <span class="page-info">Page {{ privateMeta.current_page }} of {{ privateMeta.last_page }}</span>
              <button 
                class="page-btn" 
                :disabled="privateMeta.current_page === privateMeta.last_page"
                @click="changePage('private', privateMeta.current_page + 1)"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Create Reservation Tab -->
          <div v-else key="create" class="tab-content create-content">
            <div class="create-tabs">
              <button 
                class="create-tab" 
                :class="{ active: createType === 'booking' }"
                @click="createType = 'booking'"
              >
                Table Booking
              </button>
              <button 
                class="create-tab" 
                :class="{ active: createType === 'private' }"
                @click="createType = 'private'"
              >
                Private Event
              </button>
            </div>

            <!-- Success/Error Messages -->
            <transition name="fade-slide">
              <div v-if="formMessage" class="form-message" :class="formMessage.type">
                <svg v-if="formMessage.type === 'success'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span>{{ formMessage.text }}</span>
              </div>
            </transition>

            <!-- Create Booking Form -->
            <div v-if="createType === 'booking'" class="create-form-container">
              <form class="create-form" @submit.prevent="createBookingSubmit">
                <div class="form-grid">
                  <div class="form-field">
                    <label class="field-label">Date</label>
                    <input type="date" v-model="createBookingForm.date" class="styled-input" required :min="todayDate">
                  </div>
                  <div class="form-field">
                    <label class="field-label">Time</label>
                    <select v-model="createBookingForm.time" class="styled-select" required>
                      <option value="">Select time</option>
                      <option v-for="time in timeSlots" :key="time" :value="time">{{ time }}</option>
                    </select>
                  </div>
                  <div class="form-field">
                    <label class="field-label">Guests (1-10)</label>
                    <input type="number" v-model.number="createBookingForm.guests" class="styled-input" min="1" max="10" required>
                  </div>
                  <div class="form-field">
                    <label class="field-label">Type</label>
                    <select v-model="createBookingForm.reservation_type" class="styled-select" required>
                      <option value="">Select type</option>
                      <option value="dining">Dining</option>
                      <option value="drinks">Drinks</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                  <div class="form-field full-width">
                    <label class="field-label">Phone</label>
                    <input type="tel" v-model="createBookingForm.phone" class="styled-input" placeholder="+381..." required>
                  </div>
                </div>
                <button type="submit" class="submit-btn" :disabled="createLoading">
                  <span v-if="createLoading" class="loading-spinner small"></span>
                  <span v-else>Create Booking</span>
                </button>
              </form>
            </div>

            <!-- Create Private Reservation Form -->
            <div v-else class="create-form-container">
              <form class="create-form" @submit.prevent="createPrivateSubmit">
                <div class="form-grid">
                  <div class="form-field">
                    <label class="field-label">Date</label>
                    <input type="date" v-model="createPrivateForm.date" class="styled-input" required :min="todayDate">
                  </div>
                  <div class="form-field">
                    <label class="field-label">Email</label>
                    <input type="email" v-model="createPrivateForm.email" class="styled-input" required>
                  </div>
                  <div class="form-field">
                    <label class="field-label">Event Type</label>
                    <select v-model="createPrivateForm.event_type" class="styled-select" required>
                      <option value="">Select event type</option>
                      <option value="birthday">Birthday</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="corporate">Corporate</option>
                      <option value="wedding">Wedding</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div class="form-field">
                    <label class="field-label">People Range</label>
                    <select v-model="createPrivateForm.people_range" class="styled-select" required>
                      <option value="">Select range</option>
                      <option value="under10">Under 10</option>
                      <option value="10to30">10-30</option>
                      <option value="30to50">30-50</option>
                      <option value="over50">50+</option>
                    </select>
                  </div>
                  <div class="form-field">
                    <label class="field-label">Budget</label>
                    <select v-model="createPrivateForm.budget" class="styled-select" required>
                      <option value="">Select budget</option>
                      <option value="under1000">Under €1,000</option>
                      <option value="1000to3000">€1,000 - €3,000</option>
                      <option value="3000to5000">€3,000 - €5,000</option>
                      <option value="5000to10000">€5,000 - €10,000</option>
                      <option value="over10000">Over €10,000</option>
                    </select>
                  </div>
                  <div class="form-field full-width">
                    <label class="field-label">Message (Optional)</label>
                    <textarea v-model="createPrivateForm.message" class="styled-textarea" rows="3" placeholder="Additional details..."></textarea>
                  </div>
                </div>
                <button type="submit" class="submit-btn" :disabled="createLoading">
                  <span v-if="createLoading" class="loading-spinner small"></span>
                  <span v-else>Create Private Reservation</span>
                </button>
              </form>
            </div>
          </div>
        </transition>
      </div>
    </main>

    <!-- Stats Date Picker Modal -->
    <transition name="modal-fade">
      <div v-if="showStatsDatePicker" class="modal-overlay" @click="showStatsDatePicker = false">
        <div class="modal-container stats-modal" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">Select Date</h3>
            <button class="modal-close" @click="showStatsDatePicker = false">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          
          <div class="calendar">
            <div class="calendar-nav">
              <button class="nav-btn" @click="prevStatsMonth">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="15,18 9,12 15,6"/>
                </svg>
              </button>
              <h4 class="calendar-month">{{ statsCalendarMonthYear }}</h4>
              <button class="nav-btn" @click="nextStatsMonth">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9,18 15,12 9,6"/>
                </svg>
              </button>
            </div>
            
            <div class="calendar-grid">
              <div class="calendar-weekday" v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day">{{ day }}</div>
              <button 
                v-for="dateObj in statsCalendarDates" 
                :key="dateObj.key"
                type="button"
                class="calendar-day"
                :class="{
                  'other-month': !dateObj.isCurrentMonth,
                  'selected': statsDate === formatDateForApi(dateObj.date),
                  'today': isToday(dateObj.date)
                }"
                @click="selectStatsDate(dateObj)"
                :disabled="!dateObj.isCurrentMonth"
              >
                {{ dateObj.day }}
              </button>
            </div>

            <!-- Quick Select Buttons -->
            <div class="quick-select">
              <button class="quick-btn" @click="setStatsToday">Today</button>
              <button class="quick-btn" @click="setStatsYesterday">Yesterday</button>
              <button class="quick-btn" @click="setStatsTomorrow">Tomorrow</button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Toast Notifications -->
    <transition name="toast">
      <div v-if="toast.show" class="toast" :class="toast.type">
        <span>{{ toast.message }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import api from '@/services/api'

export default {
  name: 'AdminDashboard',
  data() {
    return {
      activeTab: 'bookings',
      createType: 'booking',
      isLoading: false,
      actionLoading: null,
      createLoading: false,
      
      // Stats
      stats: null,
      statsDate: this.getTodayDate(),
      statsLoading: false,
      showStatsDatePicker: false,
      statsCalendarDate: new Date(),
      
      // Data
      bookings: [],
      privateReservations: [],
      bookingsMeta: { current_page: 1, last_page: 1, total: 0 },
      privateMeta: { current_page: 1, last_page: 1, total: 0 },
      
      // Filters
      filters: {
        status: '',
        date_from: '',
        date_to: '',
        page: 1,
        per_page: 12
      },

      // Create Forms
      createBookingForm: {
        date: '',
        time: '',
        guests: 2,
        reservation_type: '',
        phone: ''
      },
      createPrivateForm: {
        date: '',
        email: '',
        event_type: '',
        people_range: '',
        budget: '',
        message: ''
      },

      // UI State
      formMessage: null,
      toast: {
        show: false,
        message: '',
        type: 'success'
      },

      // Options
      timeSlots: ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00']
    }
  },
  computed: {
    ...mapGetters(['isDarkMode', 'adminEmail']),
    currentLogo() {
      return this.isDarkMode ? '/logo_dark.png' : '/logo_light.png'
    },
    todayDate() {
      return new Date().toISOString().split('T')[0]
    },
    pendingBookingsCount() {
      return this.bookings.filter(b => b.status === 0).length
    },
    pendingPrivateCount() {
      return this.privateReservations.filter(r => r.status === 0).length
    },
    statsCalendarMonthYear() {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December']
      return `${months[this.statsCalendarDate.getMonth()]} ${this.statsCalendarDate.getFullYear()}`
    },
    statsCalendarDates() {
      const year = this.statsCalendarDate.getFullYear()
      const month = this.statsCalendarDate.getMonth()
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      const firstDayOfWeek = firstDay.getDay()
      const daysInMonth = lastDay.getDate()
      
      const dates = []
      
      // Previous month days
      const prevMonth = new Date(year, month - 1, 0)
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const date = new Date(year, month - 1, prevMonth.getDate() - i)
        dates.push({
          day: date.getDate(),
          date: date,
          isCurrentMonth: false,
          key: `prev-${date.getDate()}`
        })
      }
      
      // Current month days
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day)
        dates.push({
          day: day,
          date: date,
          isCurrentMonth: true,
          key: `current-${day}`
        })
      }
      
      // Next month days
      const totalCells = 42
      const remainingCells = totalCells - dates.length
      for (let day = 1; day <= remainingCells; day++) {
        const date = new Date(year, month + 1, day)
        dates.push({
          day: day,
          date: date,
          isCurrentMonth: false,
          key: `next-${day}`
        })
      }
      
      return dates
    }
  },
  methods: {
    ...mapActions(['logoutAdmin']),

    getTodayDate() {
      const today = new Date()
      return this.formatDateForApi(today)
    },

    formatDateForApi(date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },

    formatStatsDate(dateString) {
      if (!dateString) return 'Select date'
      const date = new Date(dateString + 'T00:00:00')
      const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }
      return date.toLocaleDateString('en-GB', options)
    },

    isToday(date) {
      const today = new Date()
      return date.getDate() === today.getDate() && 
             date.getMonth() === today.getMonth() && 
             date.getFullYear() === today.getFullYear()
    },

    async loadStats() {
      this.statsLoading = true
      try {
        const response = await api.getDailyStats(this.statsDate)
        if (response.data.success) {
          this.stats = response.data.data
        } else {
          this.stats = null
        }
      } catch (error) {
        console.error('Error loading stats:', error)
        this.stats = null
      } finally {
        this.statsLoading = false
      }
    },

    prevStatsMonth() {
      this.statsCalendarDate = new Date(
        this.statsCalendarDate.getFullYear(),
        this.statsCalendarDate.getMonth() - 1,
        1
      )
    },

    nextStatsMonth() {
      this.statsCalendarDate = new Date(
        this.statsCalendarDate.getFullYear(),
        this.statsCalendarDate.getMonth() + 1,
        1
      )
    },

    selectStatsDate(dateObj) {
      if (!dateObj.isCurrentMonth) return
      this.statsDate = this.formatDateForApi(dateObj.date)
      this.showStatsDatePicker = false
      this.loadStats()
    },

    setStatsToday() {
      this.statsDate = this.getTodayDate()
      this.showStatsDatePicker = false
      this.loadStats()
    },

    setStatsYesterday() {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      this.statsDate = this.formatDateForApi(yesterday)
      this.showStatsDatePicker = false
      this.loadStats()
    },

    setStatsTomorrow() {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      this.statsDate = this.formatDateForApi(tomorrow)
      this.showStatsDatePicker = false
      this.loadStats()
    },

    async loadData() {
      this.isLoading = true
      try {
        const params = { ...this.filters }
        // Remove empty params
        Object.keys(params).forEach(key => {
          if (params[key] === '' || params[key] === null) {
            delete params[key]
          }
        })

        if (this.activeTab === 'bookings') {
          const response = await api.getBookings(params)
          if (response.data.success !== false) {
            this.bookings = response.data.data || []
            this.bookingsMeta = response.data.meta || { current_page: 1, last_page: 1, total: 0 }
          }
        } else if (this.activeTab === 'private') {
          const response = await api.getPrivateReservations(params)
          if (response.data.success !== false) {
            this.privateReservations = response.data.data || []
            this.privateMeta = response.data.meta || { current_page: 1, last_page: 1, total: 0 }
          }
        }
      } catch (error) {
        console.error('Error loading data:', error)
        this.showToast('Failed to load data', 'error')
      } finally {
        this.isLoading = false
      }
    },

    async approveBooking(id) {
      this.actionLoading = id
      try {
        const response = await api.approveBooking(id)
        if (response.data.success) {
          this.showToast('Booking approved successfully', 'success')
          await this.loadData()
        } else {
          this.showToast(response.data.message || 'Failed to approve', 'error')
        }
      } catch (error) {
        this.showToast('Error approving booking', 'error')
      } finally {
        this.actionLoading = null
      }
    },

    async declineBooking(id) {
      this.actionLoading = id
      try {
        const response = await api.declineBooking(id)
        if (response.data.success) {
          this.showToast('Booking declined', 'success')
          await this.loadData()
        } else {
          this.showToast(response.data.message || 'Failed to decline', 'error')
        }
      } catch (error) {
        this.showToast('Error declining booking', 'error')
      } finally {
        this.actionLoading = null
      }
    },

    async approvePrivate(id) {
      this.actionLoading = id
      try {
        const response = await api.approvePrivateReservation(id)
        if (response.data.success) {
          this.showToast('Private reservation approved', 'success')
          await this.loadData()
        } else {
          this.showToast(response.data.message || 'Failed to approve', 'error')
        }
      } catch (error) {
        this.showToast('Error approving reservation', 'error')
      } finally {
        this.actionLoading = null
      }
    },

    async declinePrivate(id) {
      this.actionLoading = id
      try {
        const response = await api.declinePrivateReservation(id)
        if (response.data.success) {
          this.showToast('Private reservation declined', 'success')
          await this.loadData()
        } else {
          this.showToast(response.data.message || 'Failed to decline', 'error')
        }
      } catch (error) {
        this.showToast('Error declining reservation', 'error')
      } finally {
        this.actionLoading = null
      }
    },

    async createBookingSubmit() {
      this.createLoading = true
      this.formMessage = null
      try {
        const response = await api.createBooking(this.createBookingForm)
        if (response.ok && response.data.success) {
          this.formMessage = { type: 'success', text: 'Booking created successfully!' }
          this.resetBookingForm()
          // Reload bookings list
          this.filters.page = 1
          await this.loadBookingsOnly()
        } else {
          const errors = response.data.errors
          const errorMsg = errors ? Object.values(errors).flat().join(', ') : response.data.message
          this.formMessage = { type: 'error', text: errorMsg || 'Failed to create booking' }
        }
      } catch (error) {
        this.formMessage = { type: 'error', text: 'Error creating booking' }
      } finally {
        this.createLoading = false
      }
    },

    async createPrivateSubmit() {
      this.createLoading = true
      this.formMessage = null
      try {
        const response = await api.createPrivateReservation(this.createPrivateForm)
        if (response.ok && response.data.success) {
          this.formMessage = { type: 'success', text: 'Private reservation created successfully!' }
          this.resetPrivateForm()
          // Reload private reservations list
          this.filters.page = 1
          await this.loadPrivateOnly()
        } else {
          const errors = response.data.errors
          const errorMsg = errors ? Object.values(errors).flat().join(', ') : response.data.message
          this.formMessage = { type: 'error', text: errorMsg || 'Failed to create reservation' }
        }
      } catch (error) {
        this.formMessage = { type: 'error', text: 'Error creating reservation' }
      } finally {
        this.createLoading = false
      }
    },

    async loadBookingsOnly() {
      try {
        const response = await api.getBookings({ per_page: 12 })
        if (response.data.success !== false) {
          this.bookings = response.data.data || []
          this.bookingsMeta = response.data.meta || { current_page: 1, last_page: 1, total: 0 }
        }
      } catch (error) {
        console.error('Error loading bookings:', error)
      }
    },

    async loadPrivateOnly() {
      try {
        const response = await api.getPrivateReservations({ per_page: 12 })
        if (response.data.success !== false) {
          this.privateReservations = response.data.data || []
          this.privateMeta = response.data.meta || { current_page: 1, last_page: 1, total: 0 }
        }
      } catch (error) {
        console.error('Error loading private reservations:', error)
      }
    },

    resetBookingForm() {
      this.createBookingForm = {
        date: '',
        time: '',
        guests: 2,
        reservation_type: '',
        phone: ''
      }
    },

    resetPrivateForm() {
      this.createPrivateForm = {
        date: '',
        email: '',
        event_type: '',
        people_range: '',
        budget: '',
        message: ''
      }
    },

    changePage(type, page) {
      this.filters.page = page
      this.loadData()
    },

    handleLogout() {
      this.logoutAdmin()
      this.$router.push('/admin')
    },

    showToast(message, type = 'success') {
      this.toast = { show: true, message, type }
      setTimeout(() => {
        this.toast.show = false
      }, 3000)
    },

    formatDate(dateString) {
      const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }
      return new Date(dateString).toLocaleDateString('en-GB', options)
    },

    getStatusClass(status) {
      switch (status) {
        case 0: return 'pending'
        case 1: return 'accepted'
        case 2: return 'declined'
        default: return ''
      }
    },

    getStatusLabel(status) {
      switch (status) {
        case 0: return 'Pending'
        case 1: return 'Accepted'
        case 2: return 'Declined'
        default: return 'Unknown'
      }
    },

    getReservationTypeLabel(type) {
      const labels = {
        dining: 'Dining',
        drinks: 'Drinks Only',
        both: 'Dining & Drinks'
      }
      return labels[type] || type
    },

    getEventTypeLabel(type) {
      const labels = {
        birthday: 'Birthday',
        anniversary: 'Anniversary',
        corporate: 'Corporate',
        wedding: 'Wedding',
        other: 'Other'
      }
      return labels[type] || type
    },

    getPeopleRangeLabel(range) {
      const labels = {
        under10: 'Under 10',
        '10to30': '10-30',
        '30to50': '30-50',
        over50: '50+'
      }
      return labels[range] || range
    },

    getBudgetLabel(budget) {
      const labels = {
        under1000: 'Under €1,000',
        '1000to3000': '€1,000 - €3,000',
        '3000to5000': '€3,000 - €5,000',
        '5000to10000': '€5,000 - €10,000',
        over10000: 'Over €10,000'
      }
      return labels[budget] || budget
    }
  },
  watch: {
    activeTab() {
      if (this.activeTab !== 'create') {
        this.filters.page = 1
        this.loadData()
      }
    }
  },
  mounted() {
    this.$store.dispatch('checkAdminAuth')
    if (!this.$store.getters.isAdminAuthenticated) {
      this.$router.push('/admin')
      return
    }
    // Initialize statsDate properly
    this.statsDate = this.getTodayDate()
    this.loadStats()
    this.loadData()
    // Also load private reservations initially
    this.loadPrivateOnly()
  }
}
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
}

/* Header */
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid rgba(202, 55, 28, 0.15);
  background: var(--bg-color);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.logo-link {
  display: flex;
  align-items: center;
}

.header-logo {
  height: 40px;
  width: auto;
}

.header-divider {
  width: 1px;
  height: 30px;
  background: rgba(202, 55, 28, 0.2);
}

.header-title {
  font-family: 'Cormorant Garamond', 'Georgia', serif;
  font-size: 1.3rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.admin-email {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  opacity: 0.7;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid rgba(202, 55, 28, 0.3);
  border-radius: 6px;
  color: var(--text-color);
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  border-color: #ca371c;
  color: #ca371c;
}

.logout-btn svg {
  width: 18px;
  height: 18px;
}

/* Main Content */
.admin-main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

/* Stats Section */
.stats-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(202, 55, 28, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(202, 55, 28, 0.1);
}

.stats-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.stats-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Cormorant Garamond', 'Georgia', serif;
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  margin: 0;
}

.stats-title svg {
  width: 24px;
  height: 24px;
  color: #ca371c;
}

.date-picker-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  background: var(--bg-color);
  border: 1px solid rgba(202, 55, 28, 0.2);
  border-radius: 8px;
  color: var(--text-color);
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.date-picker-btn:hover {
  border-color: #ca371c;
  background: rgba(202, 55, 28, 0.05);
}

.date-picker-btn svg {
  width: 18px;
  height: 18px;
  opacity: 0.7;
}

.date-picker-btn .chevron {
  width: 14px;
  height: 14px;
  opacity: 0.5;
}

.stats-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2rem;
  color: var(--text-color);
  opacity: 0.6;
}

.stats-empty {
  text-align: center;
  padding: 2rem;
  color: var(--text-color);
  opacity: 0.5;
  font-family: 'Montserrat', sans-serif;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--bg-color);
  border-radius: 10px;
  border: 1px solid rgba(202, 55, 28, 0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  border-color: rgba(202, 55, 28, 0.25);
  transform: translateY(-2px);
}

.stat-card.highlight {
  background: linear-gradient(135deg, rgba(202, 55, 28, 0.1), rgba(202, 55, 28, 0.05));
  border-color: rgba(202, 55, 28, 0.2);
}

.stat-card.breakdown {
  grid-column: span 1;
}

.stat-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  flex-shrink: 0;
}

.stat-icon svg {
  width: 24px;
  height: 24px;
}

.stat-icon.total {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
}

.stat-icon.accepted {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.stat-icon.headcount {
  background: rgba(202, 55, 28, 0.1);
  color: #ca371c;
}

.stat-icon.bookings {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.stat-icon.private {
  background: rgba(168, 85, 247, 0.1);
  color: #a855f7;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-value {
  font-family: 'Cormorant Garamond', 'Georgia', serif;
  font-size: 2rem;
  font-weight: 500;
  line-height: 1;
  color: var(--text-color);
}

.stat-label {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.6;
}

.stat-detail {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  opacity: 0.5;
  margin-top: 0.25rem;
}

/* Tab Navigation */
.tab-navigation {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: transparent;
  border: 1px solid rgba(202, 55, 28, 0.2);
  border-radius: 8px;
  color: var(--text-color);
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.7;
}

.tab-btn:hover {
  opacity: 1;
  border-color: #ca371c;
}

.tab-btn.active {
  opacity: 1;
  background: #ca371c;
  border-color: #ca371c;
  color: white;
}

.tab-btn svg {
  width: 20px;
  height: 20px;
}

.badge {
  background: white;
  color: #ca371c;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 600;
}

.tab-btn.active .badge {
  background: rgba(255, 255, 255, 0.9);
}

/* Filters */
.filters-bar {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  align-items: flex-end;
  padding: 1rem 1.5rem;
  background: rgba(202, 55, 28, 0.03);
  border-radius: 8px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.filter-select,
.filter-input {
  padding: 0.6rem 1rem;
  background: var(--bg-color);
  border: 1px solid rgba(202, 55, 28, 0.2);
  border-radius: 6px;
  color: var(--text-color);
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  min-width: 140px;
}

.filter-select:focus,
.filter-input:focus {
  outline: none;
  border-color: #ca371c;
}

.refresh-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: transparent;
  border: 1px solid #ca371c;
  border-radius: 6px;
  color: #ca371c;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.refresh-btn:hover:not(:disabled) {
  background: #ca371c;
  color: white;
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.refresh-btn svg {
  width: 16px;
  height: 16px;
}

.refresh-btn svg.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Content Area */
.content-area {
  min-height: 400px;
}

.tab-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Loading & Empty States */
.loading-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  gap: 1rem;
  color: var(--text-color);
  opacity: 0.6;
}

.loading-state svg,
.empty-state svg {
  width: 48px;
  height: 48px;
  opacity: 0.4;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(202, 55, 28, 0.2);
  border-top-color: #ca371c;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loading-spinner.small {
  width: 20px;
  height: 20px;
  border-width: 2px;
}

/* Reservations Grid */
.reservations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

/* Reservation Card */
.reservation-card {
  background: var(--bg-color);
  border: 1px solid rgba(202, 55, 28, 0.15);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.reservation-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.dark-mode .reservation-card:hover {
  box-shadow: 0 8px 24px rgba(255, 255, 255, 0.05);
}

.reservation-card.pending {
  border-left: 4px solid #f59e0b;
}

.reservation-card.accepted {
  border-left: 4px solid #10b981;
}

.reservation-card.declined {
  border-left: 4px solid #ef4444;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(202, 55, 28, 0.1);
}

.reservation-id {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  opacity: 0.6;
}

.status-badge {
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-badge.pending {
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
}

.status-badge.accepted {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
}

.status-badge.declined {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

.card-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
}

.info-row svg {
  width: 18px;
  height: 18px;
  opacity: 0.5;
  flex-shrink: 0;
}

.type-badge {
  padding: 0.25rem 0.6rem;
  background: rgba(202, 55, 28, 0.1);
  color: #ca371c;
  border-radius: 4px;
  font-size: 0.8rem;
}

.message-row {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  padding-top: 0.5rem;
  border-top: 1px dashed rgba(202, 55, 28, 0.1);
  margin-top: 0.5rem;
}

.message-row svg {
  width: 18px;
  height: 18px;
  opacity: 0.5;
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.message-text {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  line-height: 1.5;
  opacity: 0.8;
  font-style: italic;
}

.card-actions {
  display: flex;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-top: 1px solid rgba(202, 55, 28, 0.1);
  background: rgba(202, 55, 28, 0.02);
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 6px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn svg {
  width: 16px;
  height: 16px;
}

.action-btn.approve {
  background: #10b981;
  color: white;
}

.action-btn.approve:hover:not(:disabled) {
  background: #059669;
}

.action-btn.decline {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.action-btn.decline:hover:not(:disabled) {
  background: #ef4444;
  color: white;
}

/* Pagination */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(202, 55, 28, 0.1);
}

.page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: 1px solid rgba(202, 55, 28, 0.2);
  border-radius: 8px;
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
  border-color: #ca371c;
  color: #ca371c;
}

.page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.page-btn svg {
  width: 18px;
  height: 18px;
}

.page-info {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  opacity: 0.7;
}

/* Create Tab */
.create-content {
  max-width: 700px;
}

.create-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.create-tab {
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 1px solid rgba(202, 55, 28, 0.2);
  border-radius: 6px;
  color: var(--text-color);
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.create-tab:hover {
  border-color: #ca371c;
}

.create-tab.active {
  background: #ca371c;
  border-color: #ca371c;
  color: white;
}

.form-message {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
}

.form-message svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.form-message.success {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #10b981;
}

.form-message.error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
}

.create-form-container {
  background: var(--bg-color);
  border: 1px solid rgba(202, 55, 28, 0.15);
  border-radius: 12px;
  padding: 2rem;
}

.create-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-field.full-width {
  grid-column: span 2;
}

.field-label {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.7;
}

.styled-input,
.styled-select,
.styled-textarea {
  padding: 0.875rem 1rem;
  background: transparent;
  border: 1px solid rgba(202, 55, 28, 0.2);
  border-radius: 6px;
  color: var(--text-color);
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.styled-input:focus,
.styled-select:focus,
.styled-textarea:focus {
  outline: none;
  border-color: #ca371c;
}

.styled-textarea {
  resize: vertical;
  min-height: 80px;
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background: #ca371c;
  border: none;
  border-radius: 8px;
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  background: #a82e17;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Stats Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-container {
  background: var(--bg-color);
  border-radius: 16px;
  width: 100%;
  max-width: 380px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(202, 55, 28, 0.1);
}

.modal-title {
  font-family: 'Cormorant Garamond', 'Georgia', serif;
  font-size: 1.3rem;
  font-weight: 400;
  letter-spacing: 0.05em;
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

/* Calendar in Modal */
.calendar {
  padding: 1.25rem;
}

.calendar-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.nav-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid rgba(202, 55, 28, 0.2);
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
  width: 16px;
  height: 16px;
}

.calendar-month {
  font-family: 'Cormorant Garamond', 'Georgia', serif;
  font-size: 1.1rem;
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
  padding: 0.5rem 0.25rem;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  opacity: 0.4;
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
  font-size: 0.85rem;
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.2s ease;
}

.calendar-day:hover:not(:disabled) {
  background: rgba(202, 55, 28, 0.1);
  color: #ca371c;
}

.calendar-day.other-month {
  opacity: 0.2;
  cursor: default;
}

.calendar-day.today {
  font-weight: 600;
  color: #ca371c;
}

.calendar-day.selected {
  background: #ca371c;
  color: white;
  font-weight: 600;
}

.quick-select {
  display: flex;
  gap: 0.5rem;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(202, 55, 28, 0.1);
}

.quick-btn {
  flex: 1;
  padding: 0.6rem 0.75rem;
  background: transparent;
  border: 1px solid rgba(202, 55, 28, 0.2);
  border-radius: 6px;
  color: var(--text-color);
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-btn:hover {
  background: #ca371c;
  border-color: #ca371c;
  color: white;
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

/* Toast */
.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.toast.success {
  background: #10b981;
  color: white;
}

.toast.error {
  background: #ef4444;
  color: white;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Responsive */
@media (max-width: 768px) {
  .stats-section {
    padding: 1rem;
  }

  .stats-header {
    flex-direction: column;
    align-items: stretch;
  }

  .stats-title {
    font-size: 1.2rem;
  }

  .date-picker-btn {
    justify-content: center;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat-card.breakdown {
    grid-column: span 2;
  }

  .stat-value {
    font-size: 1.6rem;
  }

  .admin-header {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }

  .header-left {
    width: 100%;
    justify-content: center;
  }

  .header-right {
    width: 100%;
    justify-content: center;
  }

  .admin-main {
    padding: 1rem;
  }

  .tab-navigation {
    flex-direction: column;
  }

  .tab-btn {
    justify-content: center;
  }

  .filters-bar {
    flex-direction: column;
    gap: 1rem;
  }

  .filter-group {
    width: 100%;
  }

  .filter-select,
  .filter-input {
    width: 100%;
  }

  .reservations-grid {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-field.full-width {
    grid-column: span 1;
  }

  .create-form-container {
    padding: 1.5rem;
  }

  .toast {
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
  }
}
</style>

