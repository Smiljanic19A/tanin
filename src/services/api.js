const BASE_URL = 'https://tanin-backend-main-c7nzu9.laravel.cloud';

/**
 * API Service for Tanin Reservations
 */
const api = {
  // ==================== STATS ====================
  
  /**
   * Get daily statistics for a specific date
   * @param {string} date - Date in YYYY-MM-DD format
   */
  async getDailyStats(date) {
    return this.request(`/api/stats/daily?date=${date}`);
  },

  /**
   * Make HTTP request to API
   */
  async request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      return {
        ok: response.ok,
        status: response.status,
        data
      };
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // ==================== AUTH ====================
  
  /**
   * Login with admin credentials
   */
  async login(email, password) {
    return this.request('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  // ==================== BOOKINGS ====================
  
  /**
   * Get list of bookings with optional filters
   */
  async getBookings(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/api/bookings?${queryString}` : '/api/bookings';
    return this.request(endpoint);
  },

  /**
   * Create a new booking
   */
  async createBooking(bookingData) {
    return this.request('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    });
  },

  /**
   * Get a specific booking by ID
   */
  async getBooking(id) {
    return this.request(`/api/bookings/${id}`);
  },

  /**
   * Approve a booking
   */
  async approveBooking(id) {
    return this.request(`/api/bookings/${id}/approve`, {
      method: 'PATCH'
    });
  },

  /**
   * Decline a booking
   */
  async declineBooking(id) {
    return this.request(`/api/bookings/${id}/decline`, {
      method: 'PATCH'
    });
  },

  // ==================== PRIVATE RESERVATIONS ====================
  
  /**
   * Get list of private reservations with optional filters
   */
  async getPrivateReservations(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/api/private-reservations?${queryString}` : '/api/private-reservations';
    return this.request(endpoint);
  },

  /**
   * Create a new private reservation
   */
  async createPrivateReservation(reservationData) {
    return this.request('/api/private-reservations', {
      method: 'POST',
      body: JSON.stringify(reservationData)
    });
  },

  /**
   * Get a specific private reservation by ID
   */
  async getPrivateReservation(id) {
    return this.request(`/api/private-reservations/${id}`);
  },

  /**
   * Approve a private reservation
   */
  async approvePrivateReservation(id) {
    return this.request(`/api/private-reservations/${id}/approve`, {
      method: 'PATCH'
    });
  },

  /**
   * Decline a private reservation
   */
  async declinePrivateReservation(id) {
    return this.request(`/api/private-reservations/${id}/decline`, {
      method: 'PATCH'
    });
  }
};

export default api;

