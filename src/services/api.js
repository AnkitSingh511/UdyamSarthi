const TOKEN_KEY = 'udyamsarthi_jwt_token';

export const getAuthToken = () => localStorage.getItem(TOKEN_KEY);
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};

const getHeaders = (customHeaders = {}) => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...customHeaders
  };
};

export const api = {
  // Auth & Profiles
  async getProfiles() {
    try {
      const res = await fetch('/api/auth/profiles');
      if (!res.ok) throw new Error('Failed to fetch profiles');
      return await res.json();
    } catch (e) {
      console.warn('API connection offline, using fallback:', e.message);
      return null;
    }
  },

  async login(username, password) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    if (data.token) setAuthToken(data.token);
    return data;
  },

  async register(userData) {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    if (data.token) setAuthToken(data.token);
    return data;
  },

  async getCurrentUser() {
    try {
      const token = getAuthToken();
      if (!token) return null;
      const res = await fetch('/api/auth/me', {
        headers: getHeaders()
      });
      if (!res.ok) {
        setAuthToken(null);
        return null;
      }
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  async updateProfile(profileData) {
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(profileData)
      });
      if (!res.ok) throw new Error('Failed to update profile');
      return await res.json();
    } catch (e) {
      console.warn('Offline mode or server error:', e.message);
      return null;
    }
  },

  // Datasets
  async getDistricts() {
    try {
      const res = await fetch('/api/datasets/districts');
      if (!res.ok) throw new Error('Failed to fetch districts');
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  // Schemes & Evaluation
  async evaluateScheme(financialData) {
    try {
      const res = await fetch('/api/schemes/evaluate', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(financialData)
      });
      if (!res.ok) throw new Error('Failed to evaluate scheme');
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  // Activity Logs
  async getLogs() {
    try {
      const res = await fetch('/api/activity', {
        headers: getHeaders()
      });
      if (!res.ok) throw new Error('Failed to fetch logs');
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  async logActivity(action, details) {
    try {
      const res = await fetch('/api/activity', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ action, details })
      });
      if (!res.ok) throw new Error('Failed to record activity');
      return await res.json();
    } catch (e) {
      return null;
    }
  }
};
