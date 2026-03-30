import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CloudLightning, Wind, MapPin, CloudRain, Sun, Zap, Cloud, RefreshCw } from 'lucide-react';

const STATION_DEFS = [
  { id: 'VIDP', name: 'Delhi',          lat: 28.6562, lon: 77.1000 },
  { id: 'VABB', name: 'Mumbai',         lat: 19.0896, lon: 72.8656 },
  { id: 'VOMM', name: 'Chennai',        lat: 12.9941, lon: 80.1709 },
  { id: 'VOBL', name: 'Bengaluru',      lat: 13.1986, lon: 77.7066 },
  { id: 'VECC', name: 'Kolkata',        lat: 22.6547, lon: 88.4467 },
  { id: 'VIKL', name: 'Calicut (Base)', lat: 11.1368, lon: 75.9530 },
  { id: 'VAAH', name: 'Ahmedabad',      lat: 23.0225, lon: 72.5714 },
  { id: 'VOHY', name: 'Hyderabad',      lat: 17.2403, lon: 78.4294 },
];

// Map Open-Meteo WMO weather codes → condition
function codeToCondition(code: number): 'clear' | 'rain' | 'thunderstorm' | 'haze' {
  if (code === 0 || code === 1) return 'clear';
  if (code === 2 || code === 3) return 'haze';
  if (code >= 45 && code <= 48) return 'haze';
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'rain';
  if (code >= 95) return 'thunderstorm';
  return 'haze';
}

function conditionLabel(c: string) {
  return c === 'thunderstorm' ? 'STORM' : c === 'rain' ? 'RAIN' : c === 'clear' ? 'CLEAR' : 'HAZE';
}

function conditionColors(c: string) {
  if (c === 'thunderstorm') return { dot: '#ef4444', ring: '#ef4444', badge: 'bg-red-100 border-red-400 text-red-800', text: 'text-red-600' };
  if (c === 'rain')         return { dot: '#3b82f6', ring: '#3b82f6', badge: 'bg-blue-100 border-blue-400 text-blue-800', text: 'text-blue-600' };
  if (c === 'clear')        return { dot: '#22c55e', ring: '#22c55e', badge: 'bg-green-100 border-green-400 text-green-800', text: 'text-green-600' };
  return                           { dot: '#eab308', ring: '#eab308', badge: 'bg-yellow-100 border-yellow-400 text-yellow-800', text: 'text-yellow-600' };
}

interface LiveStation {
  id: string; name: string; lat: number; lon: number;
  temp: string; wind: string; condition: 'clear' | 'rain' | 'thunderstorm' | 'haze';
  loading: boolean;
}


function conditionIcon(c: string) {
  if (c === 'thunderstorm') return <Zap className="w-5 h-5 text-red-500" />;
  if (c === 'rain')         return <CloudRain className="w-5 h-5 text-blue-500" />;
  if (c === 'clear')        return <Sun className="w-5 h-5 text-green-500" />;
  return <Cloud className="w-5 h-5 text-yellow-500" />;
}

function CityWeatherMap({ stations }: { stations: LiveStation[]; fetching: boolean }) {
  const [selectedId, setSelectedId] = useState('VIDP');
  const station = stations.find(s => s.id === selectedId) ?? stations[0];
  const c = conditionColors(station.condition);

  // OpenStreetMap embed URL centered on station coordinates
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${station.lon - 0.3}%2C${station.lat - 0.3}%2C${station.lon + 0.3}%2C${station.lat + 0.3}&layer=mapnik&marker=${station.lat}%2C${station.lon}`;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl border border-zinc-200 shadow-sm overflow-hidden bg-white">
      {/* Header */}
      <div className="px-5 py-3 border-b border-zinc-200 flex items-center justify-between bg-zinc-50 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-indigo-500" />
          <span className="text-sm font-bold text-zinc-900">City Weather Map</span>
          <span className={`ml-2 px-2 py-0.5 rounded border text-[10px] font-bold uppercase ${c.badge}`}>
            {station.loading ? 'Fetching…' : conditionLabel(station.condition)}
          </span>
        </div>
        {/* City selector */}
        <div className="flex items-center gap-1 flex-wrap">
          {stations.map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedId(s.id)}
              className={`px-2 py-1 rounded text-[10px] font-bold border transition ${
                s.id === selectedId
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:border-indigo-300 hover:text-indigo-600'
              }`}
            >
              {s.id}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Map iframe */}
        <div className="flex-1 relative min-h-[360px]">
          <iframe
            key={selectedId}
            src={mapSrc}
            title={`Map of ${station.name}`}
            className="w-full h-full min-h-[360px] border-0"
            loading="lazy"
          />
          {/* Weather overlay badge on map */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-zinc-200 rounded-lg px-3 py-2 shadow-md flex items-center gap-2">
            {conditionIcon(station.condition)}
            <div>
              <p className="text-xs font-bold text-zinc-900">{station.name} ({station.id})</p>
              <p className="text-[10px] text-zinc-500">{station.lat.toFixed(4)}°N  {station.lon.toFixed(4)}°E</p>
            </div>
          </div>
        </div>

        {/* Weather detail panel */}
        <div className="lg:w-60 border-t lg:border-t-0 lg:border-l border-zinc-200 bg-white flex flex-col">
          <div className="px-4 py-3 border-b border-zinc-200 bg-zinc-50">
            <p className="text-xs font-bold text-zinc-600 uppercase tracking-wider">Live Conditions</p>
          </div>
          <div className="flex-1 p-4 flex flex-col gap-4">
            {/* Main weather */}
            <div className={`rounded-lg border p-4 flex flex-col gap-3 ${c.badge}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono">{station.id}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${c.badge}`}>
                  {station.loading ? '···' : conditionLabel(station.condition)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {conditionIcon(station.condition)}
                <span className="text-2xl font-bold text-zinc-900">
                  {station.loading ? '––' : station.temp}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-700">
                <Wind className="w-4 h-4" />
                <span className="font-mono font-bold">{station.loading ? '···' : station.wind}</span>
              </div>
            </div>

            {/* All stations quick view */}
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">All Stations</p>
              <div className="space-y-1.5">
                {stations.map(s => {
                  const sc = conditionColors(s.condition);
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedId(s.id)}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded border text-left transition ${
                        s.id === selectedId ? 'border-indigo-300 bg-indigo-50' : 'border-transparent hover:bg-zinc-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0`} style={{ background: sc.dot }} />
                        <span className="text-[10px] font-bold font-mono text-zinc-700">{s.id}</span>
                        <span className="text-[9px] text-zinc-400 truncate max-w-[60px]">{s.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-600 flex-shrink-0">
                        {s.loading ? '···' : `${s.temp} · ${s.wind}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function DashboardMet() {
  const [stations, setStations] = useState<LiveStation[]>(
    STATION_DEFS.map(s => ({ ...s, temp: '--', wind: '--', condition: 'haze', loading: true }))
  );
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [fetching, setFetching] = useState(false);

  async function fetchWeather() {
    setFetching(true);
    try {
      const results = await Promise.all(
        STATION_DEFS.map(s =>
          fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${s.lat}&longitude=${s.lon}` +
            `&current=temperature_2m,wind_speed_10m,weather_code&wind_speed_unit=kn&timezone=Asia%2FKolkata`
          ).then(r => r.json())
        )
      );

      setStations(
        STATION_DEFS.map((s, i) => {
          const cur = results[i]?.current;
          if (!cur) return { ...s, temp: 'N/A', wind: 'N/A', condition: 'haze', loading: false };
          const condition = codeToCondition(cur.weather_code ?? 0);
          const temp = `${Math.round(cur.temperature_2m ?? 0)}°C`;
          const wind = `${Math.round(cur.wind_speed_10m ?? 0)}KT`;
          return { ...s, temp, wind, condition, loading: false };
        })
      );
      setLastUpdated(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));
    } catch {
      setStations(prev => prev.map(s => ({ ...s, loading: false })));
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => { fetchWeather(); }, []);

  // Derive VIKL data for the top card
  const vikl = stations.find(s => s.id === 'VIKL');
  const viklWindNum = vikl?.wind !== '--' && vikl?.wind !== 'N/A' ? vikl?.wind : '10KT';

  return (
    <div className="w-full h-full text-zinc-900 p-3 sm:p-6 overflow-y-auto hide-scrollbar flex flex-col gap-4 sm:gap-6 bg-white border-2 border-zinc-200 shadow-md rounded-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-heading font-bold text-xl sm:text-2xl flex items-center gap-2">
            <CloudLightning className="w-6 h-6 text-indigo-500" />
            Aviation Meteorology
          </h3>
          <p className="text-font-secondary font-sans text-sm">
            Live data via Open-Meteo
            {lastUpdated && <span className="ml-2 text-green-600 font-medium">· Updated {lastUpdated}</span>}
          </p>
        </div>
        <button
          onClick={fetchWeather}
          disabled={fetching}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 bg-zinc-50 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 transition disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${fetching ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* VIKL Live Card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-zinc-200 rounded-xl flex flex-col overflow-hidden p-5 shadow-sm">
          <h4 className="font-heading font-bold text-zinc-900 mb-4 border-b border-zinc-200 pb-2">VIKL (Local Airfield) — Live</h4>
          <div className="flex justify-between items-center bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
            <div className="flex gap-3 items-center">
              <Wind className="w-8 h-8 text-blue-500" />
              <div className="flex flex-col">
                <span className="font-bold text-zinc-900">
                  {vikl?.loading ? 'Fetching...' : `VIKL  ${vikl?.temp ?? '--'}  ${viklWindNum}`}
                </span>
                <span className="text-sm font-mono text-font-secondary">
                  {vikl?.loading ? '···' : `Wind: ${viklWindNum} · Temp: ${vikl?.temp ?? '--'} · ${conditionLabel(vikl?.condition ?? 'haze')}`}
                </span>
              </div>
            </div>
            <span className={`px-3 py-1 font-bold rounded border text-sm ${
              vikl?.condition === 'clear' ? 'bg-green-100 border-green-300 text-green-700' :
              vikl?.condition === 'rain' || vikl?.condition === 'thunderstorm' ? 'bg-red-100 border-red-300 text-red-700' :
              'bg-amber-100 border-amber-300 text-amber-700'
            }`}>
              {vikl?.condition === 'clear' ? 'VFR' : vikl?.condition === 'thunderstorm' ? 'NO-GO' : 'MVFR'}
            </span>
          </div>
          <h4 className="font-heading font-bold text-zinc-900 mb-2">Warnings</h4>
          <div className="p-3 bg-yellow-50 border border-yellow-300 rounded-lg flex items-center justify-between">
            <span className="font-bold text-sm text-yellow-800">Crosswind Alert</span>
            <span className="text-xs text-zinc-600">RWY 09 Active • 12KT X-Wind. Unsuitable for solo.</span>
          </div>
        </motion.div>

        {/* Cross Country Briefing */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white border border-zinc-200 rounded-xl flex flex-col overflow-hidden p-5 shadow-sm">
          <h4 className="font-heading font-bold text-zinc-900 mb-4 border-b border-zinc-200 pb-2">Cross Country Briefing</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-indigo-500 mt-0.5" />
              <div>
                <span className="font-bold text-sm block">VIKL → VOHS Route</span>
                <p className="text-xs text-font-secondary mt-1">Significant convective activity along western ghats. CB clouds building FL150. Radar shows strong echoes enroute.</p>
              </div>
            </div>
            <div className="bg-zinc-50 p-3 rounded border border-zinc-200 text-xs font-mono text-font-secondary">
              TAF VOHS 290500Z 2906/3012 24010KT 6000 FEW020 BKN100<br />
              TEMPO 2909/2912 3000 TSRA SCT015 FEW025CB OVC080
            </div>
            {/* Live Hyderabad snippet */}
            {(() => {
              const vohy = stations.find(s => s.id === 'VOHY');
              return vohy && !vohy.loading ? (
                <div className="flex items-center gap-2 p-2 bg-indigo-50 border border-indigo-200 rounded text-xs font-mono text-indigo-700">
                  <span className="font-bold">VOHY Live:</span>
                  <span>{vohy.temp} · {vohy.wind} · {conditionLabel(vohy.condition)}</span>
                </div>
              ) : null;
            })()}
          </div>
        </motion.div>
      </div>

      {/* City Weather Map */}
      <CityWeatherMap stations={stations} fetching={fetching} />
    </div>
  );
}
