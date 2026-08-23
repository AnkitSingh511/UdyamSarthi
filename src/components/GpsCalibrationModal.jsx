import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUB_DISTRICT_PRESETS } from '../data/mockDatasets';
import { 
  Crosshair, 
  MapPin, 
  Check, 
  X, 
  Navigation, 
  AlertTriangle, 
  Sparkles, 
  Building2,
  Sliders
} from 'lucide-react';

export const GpsCalibrationModal = ({ isOpen, onClose }) => {
  const { 
    district, 
    gpsLocation, 
    gpsAccuracy, 
    gpsIsManual, 
    requestGpsLocation, 
    calibrateLocation, 
    t 
  } = useApp();

  const [inputLat, setInputLat] = useState(() => gpsLocation?.lat || district.lat);
  const [inputLng, setInputLng] = useState(() => gpsLocation?.lng || district.lng);
  const [selectedPresetName, setSelectedPresetName] = useState('');

  if (!isOpen) return null;

  const presets = SUB_DISTRICT_PRESETS[district.id] || SUB_DISTRICT_PRESETS.karnal;

  const handleSelectPreset = (preset) => {
    setInputLat(preset.lat);
    setInputLng(preset.lng);
    setSelectedPresetName(preset.name);
  };

  const handleApply = (e) => {
    e.preventDefault();
    const label = selectedPresetName || `${district.name} Custom Pin`;
    calibrateLocation(inputLat, inputLng, label);
    onClose();
  };

  const handleReDetectSensor = () => {
    requestGpsLocation();
    if (gpsLocation) {
      setInputLat(gpsLocation.lat);
      setInputLng(gpsLocation.lng);
    }
  };

  const getAccuracyBadge = () => {
    if (!gpsAccuracy) return null;
    if (gpsAccuracy <= 50) {
      return (
        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          ±{gpsAccuracy}m ({t.highPrecision || "High Precision GPS"})
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
        ±{gpsAccuracy > 1000 ? `${(gpsAccuracy/1000).toFixed(1)}km` : `${gpsAccuracy}m`} ({t.coarseEstimate || "Coarse IP/Wi-Fi Lock"})
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Crosshair className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{t.calibrateModalTitle || "Calibrate Location Coordinates"}</h3>
              <p className="text-xs text-slate-400">Fine-tune your exact village, farm, or shop coordinates</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Sensor Info & Accuracy */}
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-semibold">{t.sensorAccuracy || "Current Sensor Accuracy"}:</span>
            {getAccuracyBadge()}
          </div>
          
          {gpsAccuracy > 300 && !gpsIsManual && (
            <div className="flex items-start space-x-2 text-[11px] text-amber-400/90 pt-1">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
              <span>Browser Wi-Fi/IP location detected an offset. Select a sub-district preset below or adjust inputs for exact pinpointing.</span>
            </div>
          )}
        </div>

        {/* Form Inputs for Custom Lat & Lng */}
        <form onSubmit={handleApply} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Latitude (°N)
              </label>
              <input
                type="number"
                step="any"
                value={inputLat}
                onChange={(e) => {
                  setInputLat(e.target.value);
                  setSelectedPresetName('');
                }}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Longitude (°E)
              </label>
              <input
                type="number"
                step="any"
                value={inputLng}
                onChange={(e) => {
                  setInputLng(e.target.value);
                  setSelectedPresetName('');
                }}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                required
              />
            </div>
          </div>

          {/* Sub-District Presets */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">
                {t.selectSubDistrictPreset || "Sub-District / Block Presets"} ({district.name})
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
              {presets.map((preset, idx) => {
                const isSelected = selectedPresetName === preset.name || 
                  (Number(inputLat).toFixed(3) === preset.lat.toFixed(3) && Number(inputLng).toFixed(3) === preset.lng.toFixed(3));

                return (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => handleSelectPreset(preset)}
                    className={`p-2.5 rounded-xl text-left text-xs transition-all border ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/80 text-amber-300 shadow-md ring-1 ring-amber-500/20'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{preset.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 mt-1">
                      {preset.lat.toFixed(4)}, {preset.lng.toFixed(4)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between border-t border-slate-800 pt-4 gap-2">
            <button
              type="button"
              onClick={handleReDetectSensor}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-400" />
              <span>Re-Detect Sensor</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all"
              >
                <Crosshair className="w-3.5 h-3.5" />
                <span>{t.applyCalibration || "Apply Calibration"}</span>
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
