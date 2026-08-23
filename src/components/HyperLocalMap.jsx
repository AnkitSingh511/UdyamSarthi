import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GpsCalibrationModal } from './GpsCalibrationModal';
import { 
  Compass, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Star, 
  Navigation, 
  ShoppingCart, 
  Store, 
  Truck,
  Layers,
  Search,
  Building2,
  Loader2,
  AlertCircle,
  RefreshCw,
  Crosshair
} from 'lucide-react';

export const HyperLocalMap = () => {
  const { 
    district, 
    currentSpatialEntities, 
    gpsActive, 
    gpsLocation, 
    gpsLoading, 
    gpsError, 
    gpsAccuracy,
    gpsIsManual,
    requestGpsLocation, 
    t 
  } = useApp();

  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCalibrationOpen, setIsCalibrationOpen] = useState(false);

  const filteredEntities = currentSpatialEntities.filter(entity => {
    const matchesCat = filterCategory === 'all' || entity.category === filterCategory;
    const matchesSearch = searchQuery === '' || 
      entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.businessType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.rateInfo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getCategoryBadge = (cat) => {
    switch (cat) {
      case 'suppliers':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center space-x-1">
          <Store className="w-3 h-3" />
          <span>Supplier</span>
        </span>;
      case 'buyers':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center space-x-1">
          <ShoppingCart className="w-3 h-3" />
          <span>Wholesale Buyer</span>
        </span>;
      case 'services':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center space-x-1">
          <Truck className="w-3 h-3" />
          <span>Service / Cold Chain</span>
        </span>;
      default:
        return null;
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">{t.radiusTitle}</h3>
              <p className="text-xs text-slate-400">{t.radiusSubtitle}</p>
            </div>
          </div>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search suppliers, buyers, rates..."
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* GPS Status & Trigger Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
        <div className="flex items-center space-x-2 overflow-x-auto">
          {gpsLoading ? (
            <div className="flex items-center space-x-2 text-amber-400 font-semibold animate-pulse">
              <Loader2 className="w-4 h-4 animate-spin shrink-0" />
              <span>{t.gpsAcquiring || "Detecting Live GPS Location..."}</span>
            </div>
          ) : gpsActive && gpsLocation ? (
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold flex-wrap">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>{gpsIsManual ? (t.gpsCalibrated || "Calibrated Pin") : (t.gpsLocationFound || "Live GPS Active")}</span>
              <span className="font-mono text-[11px] text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                ({gpsLocation.lat.toFixed(4)}, {gpsLocation.lng.toFixed(4)})
              </span>
              {gpsAccuracy && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                  ±{gpsAccuracy}m
                </span>
              )}
              <span className="text-[11px] text-amber-300 font-mono">
                → {district.name} {t.nearestDistrict || "Hub"}
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-slate-400">
              <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
              <span>District Hub: <strong className="text-slate-200">{district.name}, {district.state}</strong></span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => setIsCalibrationOpen(true)}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 transition-colors"
            title="Fine-tune latitude & longitude or select a sub-district village preset"
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>{t.fineTuneLocation || "Fine-Tune Pin"}</span>
          </button>

          <button
            onClick={requestGpsLocation}
            disabled={gpsLoading}
            className={`flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              gpsLoading 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : gpsActive 
                ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30'
            }`}
          >
            {gpsLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : gpsActive ? (
              <RefreshCw className="w-3.5 h-3.5" />
            ) : (
              <Navigation className="w-3.5 h-3.5" />
            )}
            <span>
              {gpsLoading 
                ? (t.gpsAcquiring || "Locating...") 
                : gpsActive 
                ? (t.gpsRecalibrate || "Recalibrate GPS") 
                : (t.gpsDetect || "Detect My Location")}
            </span>
          </button>
        </div>
      </div>

      {/* GPS Error Alert */}
      {gpsError && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{gpsError}</span>
          </div>
          <button 
            onClick={requestGpsLocation}
            className="px-2.5 py-1 rounded bg-red-500/20 hover:bg-red-500/30 font-semibold text-[11px] transition-colors shrink-0"
          >
            Retry GPS
          </button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            filterCategory === 'all' 
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' 
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          {t.allNetwork} ({currentSpatialEntities.length})
        </button>

        <button
          onClick={() => setFilterCategory('suppliers')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            filterCategory === 'suppliers' 
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' 
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          {t.suppliers}
        </button>

        <button
          onClick={() => setFilterCategory('buyers')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            filterCategory === 'buyers' 
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          {t.buyers}
        </button>

        <button
          onClick={() => setFilterCategory('services')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            filterCategory === 'services' 
              ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20' 
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          {t.services}
        </button>
      </div>

      {/* Main Grid: Interactive Radar/Map Visualizer + Entity Cards List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: 5-7km Spatial Radar & Map Simulation */}
        <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden min-h-[320px]">
          
          {/* Radar Circles */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            <div className="w-72 h-72 rounded-full border border-dashed border-slate-700 animate-spin-slow"></div>
            <div className="absolute w-52 h-52 rounded-full border border-emerald-500/30 bg-emerald-500/5"></div>
            <div className="absolute w-32 h-32 rounded-full border border-amber-500/30"></div>
            <div className="absolute w-12 h-12 rounded-full bg-slate-900 border border-slate-700"></div>
          </div>

          {/* Center Marker: User Location */}
          <div className="relative z-20 flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center animate-bounce shadow-lg ${
              gpsActive ? 'bg-emerald-500/20 border-emerald-400 shadow-emerald-500/50' : 'bg-amber-500/20 border-amber-400 shadow-amber-500/50'
            }`}>
              <MapPin className={`w-4 h-4 ${gpsActive ? 'text-emerald-400 fill-emerald-400' : 'text-amber-400 fill-amber-400'}`} />
            </div>
            <span className="text-[11px] font-bold text-white bg-slate-900/90 px-2.5 py-0.5 rounded-md border border-slate-700 mt-1 shadow-md">
              {gpsActive && gpsLocation 
                ? `Live GPS (${gpsLocation.lat.toFixed(3)}, ${gpsLocation.lng.toFixed(3)})` 
                : `District Hub (${district.name})`}
            </span>
          </div>

          {/* Placed Nodes inside radar */}
          {filteredEntities.map((ent, idx) => {
            const angle = (idx * (360 / filteredEntities.length)) * (Math.PI / 180);
            const radiusPx = (ent.distanceKm / 7) * 110; // Scaled to fit 7km in box
            const x = Math.cos(angle) * radiusPx;
            const y = Math.sin(angle) * radiusPx;

            const isSelected = selectedEntity?.id === ent.id;

            return (
              <button
                key={ent.id}
                onClick={() => setSelectedEntity(ent)}
                style={{ transform: `translate(${x}px, ${y}px)` }}
                className={`absolute z-30 group transition-all duration-300 ${
                  isSelected ? 'scale-125 z-40' : 'hover:scale-110'
                }`}
                title={`${ent.name} (${ent.distanceKm} km)`}
              >
                <div className={`p-1.5 rounded-full border shadow-md flex items-center justify-center ${
                  ent.category === 'buyers' 
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                    : ent.category === 'suppliers'
                    ? 'bg-amber-950 border-amber-500 text-amber-400'
                    : 'bg-sky-950 border-sky-500 text-sky-400'
                }`}>
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-1 pointer-events-none z-50 whitespace-nowrap bg-slate-900 text-[10px] font-bold text-white px-2 py-1 rounded border border-slate-700 shadow-xl">
                  {ent.name} ({ent.distanceKm} km)
                </div>
              </button>
            );
          })}

          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-slate-400 px-2 py-1 bg-slate-900/80 rounded-lg border border-slate-800">
            <span>Radius: 7.0 Km Max</span>
            <span className="text-emerald-400">{filteredEntities.length} Partners Found</span>
          </div>
        </div>

        {/* Right: List of 5-7km Entities with Direct Rates & Actions */}
        <div className="lg:col-span-7 space-y-3 max-h-[380px] overflow-y-auto pr-1">
          {filteredEntities.length === 0 ? (
            <div className="p-8 text-center bg-slate-950/40 rounded-xl border border-slate-800 text-slate-400 text-xs">
              No local suppliers or buyers found matching this filter in {district.name}.
            </div>
          ) : (
            filteredEntities.map((entity) => {
              const isSelected = selectedEntity?.id === entity.id;

              return (
                <div
                  key={entity.id}
                  onClick={() => setSelectedEntity(entity)}
                  className={`p-4 rounded-xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-slate-800/90 border-amber-500/80 shadow-lg ring-1 ring-amber-500/20'
                      : 'bg-slate-950/60 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-xs font-bold text-slate-100 hover:text-amber-300">
                          {entity.name}
                        </h4>
                        {entity.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" title="Verified Local Partner" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {entity.businessType}
                      </p>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-bold font-mono">
                        {entity.distanceKm} {t.distanceKm}
                      </span>
                      {getCategoryBadge(entity.category)}
                    </div>
                  </div>

                  {/* Rates / Info Banner */}
                  <div className="mt-2.5 p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs flex items-center justify-between">
                    <span className="text-slate-300 font-mono font-medium text-[11px]">
                      {entity.rateInfo}
                    </span>
                    <div className="flex items-center space-x-1 text-[10px] text-amber-400 font-bold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{entity.rating}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-2 line-clamp-2">
                    {entity.description}
                  </p>

                  {/* Contact Action Bar */}
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">{entity.phone}</span>
                    <a
                      href={`tel:${entity.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{t.contactNow}</span>
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* GPS Location Precision Calibration Modal */}
      <GpsCalibrationModal 
        isOpen={isCalibrationOpen} 
        onClose={() => setIsCalibrationOpen(false)} 
      />

    </div>
  );
};
