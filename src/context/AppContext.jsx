import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';
import { DISTRICTS, DEMO_PROFILES, SPATIAL_ENTITIES, PM_MUDRA_SCHEME_DATA } from '../data/mockDatasets';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 1. Language State
  const [lang, setLang] = useState('hi'); // Default Hindi for rural accessibility
  const t = translations[lang] || translations.en;

  // 2. Hybrid Network State (Online / Offline)
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleOnlineMode = () => {
    setIsOnline(prev => !prev);
    logActivity('Network Status Changed', `Manually toggled connection to ${!isOnline ? 'Online' : 'Offline Mode'}`);
  };

  // 3. User Auth & Session Trail
  const [user, setUser] = useState(() => {
    const cached = localStorage.getItem('udyamsarthi_user');
    return cached ? JSON.parse(cached) : DEMO_PROFILES[0]; // Default demo profile Ramesh
  });

  const [activityLogs, setActivityLogs] = useState(() => {
    const cachedLogs = localStorage.getItem('udyamsarthi_activity');
    return cachedLogs ? JSON.parse(cachedLogs) : [
      {
        id: 1,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString(),
        action: 'Session Initiated',
        details: 'User logged in as Ramesh Kumar (Farmer, Karnal)'
      }
    ];
  });

  const logActivity = (action, details) => {
    const newEntry = {
      id: Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString(),
      action,
      details
    };
    setActivityLogs(prev => {
      const updated = [newEntry, ...prev.slice(0, 49)];
      localStorage.setItem('udyamsarthi_activity', JSON.stringify(updated));
      return updated;
    });
  };

  const loginUser = (profileObj) => {
    setUser(profileObj);
    localStorage.setItem('udyamsarthi_user', JSON.stringify(profileObj));
    if (profileObj.category) {
      setCategory(profileObj.category);
    }
    if (profileObj.districtId) {
      const foundDist = DISTRICTS.find(d => d.id === profileObj.districtId);
      if (foundDist) setDistrict(foundDist);
    }
    if (profileObj.details) {
      setProfileData(profileObj.details);
    }
    logActivity('User Login Success', `Logged in as ${profileObj.name} (${profileObj.category})`);
  };

  const logoutUser = () => {
    logActivity('User Logout', `User ${user?.name || 'Guest'} logged out`);
    setUser(null);
    localStorage.removeItem('udyamsarthi_user');
  };

  // 4. Business Category & Profile Inputs
  const [category, setCategory] = useState(user?.category || 'farmer');
  
  const [profileData, setProfileData] = useState(() => {
    return user?.details || DEMO_PROFILES[0].details;
  });

  const updateCategory = (newCat) => {
    setCategory(newCat);
    logActivity('Category Selection', `Business type changed to: ${newCat.toUpperCase()}`);
    // Auto populate default demo parameters if category matches a demo profile
    const demoForCat = DEMO_PROFILES.find(p => p.category === newCat);
    if (demoForCat) {
      setProfileData(demoForCat.details);
    }
  };

  const updateProfileData = (newDetails) => {
    setProfileData(prev => {
      const updated = { ...prev, ...newDetails };
      logActivity('Profile Analysis Updated', `Updated performance & loan requirements for ${category}`);
      return updated;
    });
  };

  // Helper: Haversine distance calculation in kilometers
  const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  };

  // Helper: Find nearest district from coordinates
  const findNearestDistrict = (userLat, userLng) => {
    let minDistance = Infinity;
    let nearest = DISTRICTS[0];
    for (const d of DISTRICTS) {
      const dist = calculateHaversineDistance(userLat, userLng, d.lat, d.lng);
      if (dist < minDistance) {
        minDistance = dist;
        nearest = d;
      }
    }
    return { nearestDistrict: nearest, distanceToDistrict: minDistance };
  };

  // 5. Geolocation & District Picker
  const [district, setDistrict] = useState(DISTRICTS[1]); // Default Karnal
  const [gpsLocation, setGpsLocation] = useState(null);
  const [gpsActive, setGpsActive] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState(null);
  const [gpsAccuracy, setGpsAccuracy] = useState(null); // Accuracy in meters
  const [gpsIsManual, setGpsIsManual] = useState(false);

  const requestGpsLocation = () => {
    if (!('geolocation' in navigator)) {
      const errText = 'Geolocation API is not supported by your browser.';
      setGpsError(errText);
      setGpsActive(false);
      logActivity('GPS Error', errText);
      return;
    }

    setGpsLoading(true);
    setGpsError(null);

    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0 // Force fresh location sampling on recalibration
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const accuracy = Math.round(pos.coords.accuracy || 10);
        
        setGpsLocation({ lat, lng });
        setGpsAccuracy(accuracy);
        setGpsActive(true);
        setGpsIsManual(false);
        setGpsLoading(false);
        setGpsError(null);

        const { nearestDistrict, distanceToDistrict } = findNearestDistrict(lat, lng);
        setDistrict(nearestDistrict);

        logActivity(
          'GPS Geolocation Activated', 
          `Live Sensor Lock: (${lat.toFixed(4)}, ${lng.toFixed(4)}) ±${accuracy}m | Matched hub: ${nearestDistrict.name} (${distanceToDistrict}km)`
        );
      },
      (err) => {
        console.warn("GPS request failed:", err);
        let errorMsg = 'GPS location failed.';
        if (err.code === err.PERMISSION_DENIED) {
          errorMsg = 'Location permission was denied. Please allow location access or select a district/preset manually.';
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          errorMsg = 'Position unavailable from device sensors. Using district fallback.';
        } else if (err.code === err.TIMEOUT) {
          errorMsg = 'GPS request timed out. Retrying with district center.';
        }
        setGpsActive(false);
        setGpsLoading(false);
        setGpsError(errorMsg);
        logActivity('GPS Warning', errorMsg);
      },
      geoOptions
    );
  };

  // Manual location calibration / fine-tuning override
  const calibrateLocation = (customLat, customLng, label = 'Custom Calibrated') => {
    const lat = Number(customLat);
    const lng = Number(customLng);
    if (isNaN(lat) || isNaN(lng)) return;

    setGpsLocation({ lat, lng });
    setGpsAccuracy(5); // High precision user-pinned location
    setGpsActive(true);
    setGpsIsManual(true);
    setGpsError(null);
    setGpsLoading(false);

    const { nearestDistrict, distanceToDistrict } = findNearestDistrict(lat, lng);
    setDistrict(nearestDistrict);

    logActivity(
      'Location Manually Calibrated', 
      `Coordinates calibrated to (${lat.toFixed(4)}, ${lng.toFixed(4)}) - ${label}`
    );
  };

  const setDistrictById = (distId) => {
    const found = DISTRICTS.find(d => d.id === distId);
    if (found) {
      setDistrict(found);
      setGpsActive(false);
      setGpsIsManual(false);
      setGpsError(null);
      logActivity('District Changed', `Switched location to ${found.name}, ${found.state}`);
    }
  };

  // 6. 5-7km Spatial Entities Filter with Dynamic Haversine Distance
  const baseSpatialEntities = SPATIAL_ENTITIES[district.id] || SPATIAL_ENTITIES.karnal;
  
  const currentSpatialEntities = React.useMemo(() => {
    if (gpsActive && gpsLocation) {
      return baseSpatialEntities.map(ent => {
        const entLat = district.lat + (ent.latOffset || 0);
        const entLng = district.lng + (ent.lngOffset || 0);
        const realDist = calculateHaversineDistance(gpsLocation.lat, gpsLocation.lng, entLat, entLng);
        return {
          ...ent,
          distanceKm: realDist
        };
      });
    }
    return baseSpatialEntities;
  }, [district, gpsActive, gpsLocation, baseSpatialEntities]);

  // 7. PM MUDRA Loan Recommendation Engine
  const calculateMudraEligibility = () => {
    const reqAmount = Number(profileData.loanRequiredAmount || 0);
    const rev = Number(profileData.monthlyRevenue || 0);
    const exp = Number(profileData.monthlyExpenses || 0);
    const netMonthlyIncome = Math.max(rev - exp, 0);

    let recommendedTier = PM_MUDRA_SCHEME_DATA.tiers[0]; // Shishu default
    if (reqAmount > 500000 || (netMonthlyIncome > 45000 && reqAmount > 200000)) {
      recommendedTier = PM_MUDRA_SCHEME_DATA.tiers[2]; // Tarun
    } else if (reqAmount > 50000 || netMonthlyIncome > 15000) {
      recommendedTier = PM_MUDRA_SCHEME_DATA.tiers[1]; // Kishor
    }

    const maxEligible = Math.min(reqAmount, recommendedTier.maxAmount);
    
    // EMI Calculation formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const annualRate = 0.095; // 9.5% average
    const r = annualRate / 12;
    const n = 60; // 5 years
    const emi = Math.round((maxEligible * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)) || 0;

    return {
      tier: recommendedTier,
      maxEligibleAmount: maxEligible,
      monthlyEmi: emi,
      netMonthlyIncome,
      debtServiceRatio: netMonthlyIncome > 0 ? Math.round((emi / netMonthlyIncome) * 100) : 0,
      collateralRequired: false
    };
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        t,
        isOnline,
        toggleOnlineMode,
        user,
        loginUser,
        logoutUser,
        activityLogs,
        logActivity,
        category,
        updateCategory,
        profileData,
        updateProfileData,
        district,
        setDistrictById,
        gpsLocation,
        gpsActive,
        gpsLoading,
        gpsError,
        gpsAccuracy,
        gpsIsManual,
        requestGpsLocation,
        calibrateLocation,
        currentSpatialEntities,
        calculateMudraEligibility
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
