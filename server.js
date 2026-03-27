// ===== DATA =====
const incidents = [
  { id:'INC-0042', type:'FLOOD', severity:'critical', state:'Assam', location:'Dibrugarh, Assam', lat:475, lng:205, affected:12000, reports:34, time:'2m ago', desc:'Major flooding in Brahmaputra floodplains. 12,000+ displaced. 3 embankments breached. Roads cut off.', needs:['RESCUE','FOOD','SHELTER'], verified:true },
  { id:'INC-0041', type:'CYCLONE', severity:'critical', state:'Odisha', location:'Puri, Odisha', lat:425, lng:325, affected:25000, reports:21, time:'15m ago', desc:'Category 3 cyclone approaching. 25km/h winds. Storm surge expected. Coastal evacuation in progress.', needs:['EVAC','SHELTER','MEDICAL'], verified:true },
  { id:'INC-0040', type:'FLOOD', severity:'high', state:'Bihar', location:'Patna, Bihar', lat:390, lng:190, affected:8400, reports:15, time:'28m ago', desc:'Flash floods from heavy rains. 8400 people in low-lying areas at risk. NDRF team deployed.', needs:['RESCUE','MEDICAL'], verified:true },
  { id:'INC-0039', type:'LANDSLIDE', severity:'high', state:'Himachal Pradesh', location:'Shimla District, HP', lat:258, lng:125, affected:340, reports:8, time:'1h ago', desc:'Multiple landslides blocking NH-5. 340 stranded. Two fatalities reported. Debris clearing ongoing.', needs:['RESCUE','MEDICAL','WATER'], verified:true },
  { id:'INC-0038', type:'EARTHQUAKE', severity:'medium', state:'Uttarakhand', location:'Chamoli, Uttarakhand', lat:295, lng:140, affected:1200, reports:12, time:'1h 22m ago', desc:'M4.2 earthquake. No major structural collapses. Tremors felt in 5 districts. Monitoring active.', needs:['MEDICAL'], verified:false },
  { id:'INC-0037', type:'FLOOD', severity:'high', state:'Gujarat', location:'Vadodara, Gujarat', lat:165, lng:305, affected:5600, reports:19, time:'2h ago', desc:'Urban flooding due to drainage overflow. 5600 homes waterlogged. Rescue boats deployed in 3 zones.', needs:['RESCUE','WATER','EVAC'], verified:true },
  { id:'INC-0036', type:'FIRE', severity:'medium', state:'Rajasthan', location:'Jaisalmer, Rajasthan', lat:180, lng:215, affected:150, reports:6, time:'3h ago', desc:'Forest fire spreading in Thar Desert region. Fire departments on site. 150 people evacuated.', needs:['SHELTER','WATER'], verified:true },
  { id:'INC-0035', type:'STORM', severity:'medium', state:'West Bengal', location:'Kolkata, West Bengal', lat:450, lng:220, affected:3200, reports:9, time:'3h 30m ago', desc:'Severe thunderstorm. Hailstorm damage reported in 3 districts. Power outages in 12 areas.', needs:['FOOD','SHELTER'], verified:false },
  { id:'INC-0034', type:'FLOOD', severity:'critical', state:'Assam', location:'Majuli, Assam', lat:490, lng:195, affected:18000, reports:28, time:'4h ago', desc:'River island Majuli submerged 60%. 18000 residents trapped. Boat evacuations underway.', needs:['RESCUE','FOOD','MEDICAL'], verified:true },
  { id:'INC-0033', type:'CYCLONE', severity:'high', state:'Odisha', location:'Bhubaneswar, Odisha', lat:435, lng:305, affected:45000, reports:41, time:'5h ago', desc:'Cyclone Biparjoy outer bands causing heavy rain and wind. 45000 in evacuation shelters.', needs:['SHELTER','FOOD','WATER'], verified:true },
];

const responders = [
  { id:'NDRF-04', name:'NDRF Team 04', unit:'National Disaster Response Force', type:'🚁', status:'deployed', eta:'En route INC-0042', location:'Guwahati' },
  { id:'SDRF-AS', name:'SDRF Assam', unit:'State Disaster Response Force', type:'🚤', status:'available', eta:'Ready — Guwahati Base', location:'Guwahati' },
  { id:'NDRF-12', name:'NDRF Team 12', unit:'National Disaster Response Force', type:'⛑', status:'available', eta:'Ready — Bhubaneswar Base', location:'Bhubaneswar' },
  { id:'AMB-OD', name:'Medical Mobile Unit', unit:'ODISHA Health Dept · 4 ambulances', type:'🚑', status:'standby', eta:'5 min notice', location:'Puri' },
  { id:'ARMY-ER', name:'Army Eastern Command', unit:'56 Corps · Engineering', type:'🪖', status:'deployed', eta:'En route INC-0034', location:'Tezpur' },
  { id:'COAST-GRD', name:'Coast Guard Unit 7', unit:'India Coast Guard · Cyclone Op', type:'⚓', status:'deployed', eta:'Operating INC-0041', location:'Paradip' },
];

const coordItems = {
  pending: [
    { id:'TASK-091', title:'Airlift Request — Majuli', type:'RESCUE', severity:'critical', loc:'Assam', assigned:'—', progress:0, needs:['HELICOPTER','NDRF'] },
    { id:'TASK-090', title:'Medical Camp Setup', type:'MEDICAL', severity:'high', loc:'Puri, Odisha', assigned:'—', progress:0, needs:['AMBULANCE','DOCS'] },
    { id:'TASK-089', title:'Food & Water Distribution', type:'RELIEF', severity:'high', loc:'Patna, Bihar', assigned:'SDRF-BR', progress:15, needs:['TRUCKS','RATIONS'] },
    { id:'TASK-088', title:'Debris Clearing NH-5', type:'INFRASTRUCTURE', severity:'medium', loc:'Shimla, HP', assigned:'PWD', progress:20, needs:['JCB','CREW'] },
    { id:'TASK-087', title:'Power Restoration', type:'UTILITY', severity:'medium', loc:'Kolkata, WB', assigned:'—', progress:0, needs:['ENGINEERS'] },
    { id:'TASK-086', title:'Boat Evacuation Wave 2', type:'EVACUATION', severity:'critical', loc:'Dibrugarh, AS', assigned:'SDRF-AS', progress:30, needs:['BOATS'] },
    { id:'TASK-085', title:'Cyclone Shelter Capacity', type:'SHELTER', severity:'high', loc:'Bhubaneswar, OD', assigned:'—', progress:10, needs:['VOLUNTEERS'] },
    { id:'TASK-084', title:'Livestock Rescue', type:'RESCUE', severity:'low', loc:'Vadodara, GJ', assigned:'—', progress:0, needs:['BOATS'] },
  ],
  inprogress: [
    { id:'TASK-083', title:'NDRF Rescue INC-0042', type:'RESCUE', severity:'critical', loc:'Assam', assigned:'NDRF-04', progress:45, needs:['BOATS','MEDIC'] },
    { id:'TASK-082', title:'Cyclone Ops INC-0041', type:'CYCLONE', severity:'critical', loc:'Puri, Odisha', assigned:'COAST-GRD', progress:60, needs:['NAVY'] },
    { id:'TASK-081', title:'Majuli Evacuation', type:'EVACUATION', severity:'critical', loc:'Majuli, Assam', assigned:'ARMY-ER', progress:35, needs:['HELICOPTERS'] },
    { id:'TASK-080', title:'Bihar Flood Rescue', type:'RESCUE', severity:'high', loc:'Patna', assigned:'NDRF-12', progress:70, needs:['MEDIC'] },
    { id:'TASK-079', title:'Shimla Landslide Clear', type:'INFRA', severity:'medium', loc:'HP', assigned:'PWD-HP', progress:55, needs:['JCB'] },
  ],
  resolved: [
    { id:'TASK-078', title:'Goa Coastal Rescue', type:'RESCUE', severity:'medium', loc:'Goa', assigned:'COAST-GRD', progress:100, needs:[] },
    { id:'TASK-077', title:'Uttarakhand EQ Assess', type:'ASSESSMENT', severity:'medium', loc:'Chamoli', assigned:'NDRF-06', progress:100, needs:[] },
    { id:'TASK-076', title:'Delhi Storm Clearance', type:'UTILITY', severity:'low', loc:'Delhi', assigned:'DDMA', progress:100, needs:[] },
    { id:'TASK-075', title:'Rajasthan Heatwave', type:'MEDICAL', severity:'high', loc:'Jaisalmer', assigned:'RSDRF', progress:100, needs:[] },
  ]
};

const alertsData = [
  { title:'🔴 CRITICAL: Brahmaputra Embankment Breach', text:'3rd embankment breached at Dibrugarh. Immediate evacuation of Zone 4 required. ETA: 2hrs before inundation.', time:'2 min ago', type:'danger', unread:true },
  { title:'🌀 CYCLONE UPDATE: Category 3 Intensification', text:'Cyclone Biparjoy intensified. Wind speed 145 km/h. Landfall expected at Puri coast in 18 hours.', time:'15 min ago', type:'danger', unread:true },
  { title:'✅ NDRF TEAM DEPLOYED: INC-0042', text:'NDRF Team 04 (12 personnel + 3 rescue boats) dispatched from Guwahati to Dibrugarh. ETA: 45 minutes.', time:'32 min ago', type:'success', unread:true },
  { title:'⚠ ROAD BLOCK: NH-5 Completely Cut', text:'Shimla–Chandigarh highway blocked at 3 points. Alternate route via Narkanda advised.', time:'1h ago', type:'warning', unread:true },
  { title:'📊 REPORT SURGE: 847 submissions in last 2hrs', text:'Duplicate detection consolidated 152 reports. AI triage prioritizing 12 unique critical incidents.', time:'1h 15m ago', type:'info', unread:false },
  { title:'🏥 MEDICAL CAMP ESTABLISHED: Majuli', text:'Mobile medical unit operational at Majuli relief camp. Capacity: 200 patients. 3 doctors, 8 paramedics.', time:'2h ago', type:'success', unread:false },
  { title:'🛰 SATELLITE IMAGERY: Odisha Coast', text:'ISRO Cartosat imagery confirms cyclone track. Coastal zone 0-10km from shore: EVACUATE IMMEDIATELY.', time:'2h 30m ago', type:'warning', unread:false },
  { title:'💧 WATER SUPPLY DISRUPTION: 4 Districts', text:'Bihar flood affected water treatment plants in Patna, Muzaffarpur, Bhagalpur, Darbhanga. Bottled water deployment initiated.', time:'3h ago', type:'warning', unread:false },
  { title:'✅ ALL CLEAR: Kolkata Cyclone Zone', text:'Western parts of Kolkata no longer in active cyclone warning zone. Shelter-in-place advisory lifted.', time:'5h ago', type:'success', unread:false },
];

// ===== STATE =====
let selectedIncident = null;
let mapScale = 1;
let showSafeZones = false;
let showHeatmap = false;
let reportCount = 47;
let selectedSeverity = 'CRITICAL';
let selectedDisasterType = 'FLOOD';
let selectedNeeds = [];
let recentSubmissions = [];

// ===== CLOCK =====
function updateClock() {
  const now = new Date();
  document.getElementById('clockDisplay').textContent =
    now.toLocaleTimeString('en-IN', {hour12: false});
}
setInterval(updateClock, 1000);
updateClock();

// ===== TAB SWITCHING =====
function switchTab(tab) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + tab).classList.add('active');
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
}

// ===== RENDER INCIDENTS =====
function renderIncidents() {
  const container = document.getElementById('incidentList');
  container.innerHTML = '';
  incidents.forEach(inc => {
    const card = document.createElement('div');
    card.className = `incident-card ${inc.severity}`;
    card.id = 'inc-card-' + inc.id;
    card.onclick = () => selectIncident(inc);
    card.innerHTML = `
      <div class="inc-top">
        <span class="inc-type">${inc.type}</span>
        <span class="inc-sev sev-${inc.severity}">${inc.severity.toUpperCase()}</span>
      </div>
      <div class="inc-location">📍 ${inc.location}</div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span class="inc-time">${inc.time}</span>
        <span class="inc-reports">${inc.reports} reports</span>
        <span class="${inc.verified ? 'verified-badge' : 'unverified-badge'}">${inc.verified ? '✓ VERIFIED' : '⚠ UNVERIFIED'}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

// ===== RENDER MAP MARKERS =====
function renderMarkers() {
  const g = document.getElementById('incidentMarkers');
  g.innerHTML = '';
  const colorMap = { critical: '#ff3b2e', high: '#ff8c00', medium: '#ffb700', low: '#00d97e' };
  incidents.forEach(inc => {
    const color = colorMap[inc.severity];
    const r = inc.severity === 'critical' ? 10 : inc.severity === 'high' ? 8 : 6;
    const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    pulse.setAttribute('cx', inc.lat);
    pulse.setAttribute('cy', inc.lng);
    pulse.setAttribute('r', r * 2.5);
    pulse.setAttribute('fill', color);
    pulse.setAttribute('opacity', '0.25');
    pulse.setAttribute('class', 'pulse-ring');
    g.appendChild(pulse);

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', inc.lat);
    circle.setAttribute('cy', inc.lng);
    circle.setAttribute('r', r);
    circle.setAttribute('fill', color);
    circle.setAttribute('stroke', 'white');
    circle.setAttribute('stroke-width', '1.5');
    circle.setAttribute('class', 'incident-marker');
    circle.style.filter = `drop-shadow(0 0 4px ${color})`;
    circle.addEventListener('click', () => selectIncident(inc));
    circle.addEventListener('mouseenter', (e) => showTooltip(e, inc));
    circle.addEventListener('mouseleave', hideTooltip);
    g.appendChild(circle);

    // Label
    if (inc.severity === 'critical') {
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', inc.lat);
      text.setAttribute('y', inc.lng - 14);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('font-size', '8');
      text.setAttribute('fill', color);
      text.setAttribute('font-family', 'monospace');
      text.textContent = inc.id;
      g.appendChild(text);
    }
  });
}

// ===== TOOLTIP =====
function showTooltip(e, inc) {
  const tt = document.getElementById('mapTooltip');
  tt.innerHTML = `
    <div style="font-family:var(--font-display);font-size:13px;font-weight:700;letter-spacing:1px;margin-bottom:4px;">${inc.type}</div>
    <div style="font-size:11px;color:var(--text2);margin-bottom:4px;">📍 ${inc.location}</div>
    <div style="display:flex;gap:8px;font-family:var(--font-mono);font-size:9px;">
      <span style="color:var(--accent)">${inc.severity.toUpperCase()}</span>
      <span style="color:var(--text3)">👥 ${inc.affected.toLocaleString()}</span>
      <span style="color:var(--cyan)">${inc.reports} rpts</span>
    </div>
  `;
  tt.style.display = 'block';
  tt.style.left = (e.clientX + 12) + 'px';
  tt.style.top = (e.clientY - 10) + 'px';
}

function hideTooltip() {
  document.getElementById('mapTooltip').style.display = 'none';
}

// ===== SELECT INCIDENT =====
function selectIncident(inc) {
  selectedIncident = inc;
  document.querySelectorAll('.incident-card').forEach(c => c.classList.remove('active'));
  const card = document.getElementById('inc-card-' + inc.id);
  if (card) card.classList.add('active');

  const colorMap = { critical: 'var(--critical)', high: 'var(--high)', medium: 'var(--medium)', low: 'var(--low)' };
  const color = colorMap[inc.severity];

  document.getElementById('incDetailId').textContent = inc.id;
  document.getElementById('incDetailContent').innerHTML = `
    <div class="inc-detail-head">
      <div>
        <div class="inc-detail-type" style="color:${color}">${inc.type}</div>
        <div style="font-size:11px;color:var(--text2);margin-top:2px;">📍 ${inc.location}</div>
      </div>
      <span class="inc-sev sev-${inc.severity}">${inc.severity.toUpperCase()}</span>
    </div>
    <div class="detail-grid">
      <div class="detail-item">
        <div class="detail-item-label">Affected</div>
        <div class="detail-item-val" style="color:var(--amber)">${inc.affected.toLocaleString()}</div>
      </div>
      <div class="detail-item">
        <div class="detail-item-label">Reports</div>
        <div class="detail-item-val" style="color:var(--cyan)">${inc.reports}</div>
      </div>
      <div class="detail-item">
        <div class="detail-item-label">Reported</div>
        <div class="detail-item-val" style="font-size:12px;">${inc.time}</div>
      </div>
      <div class="detail-item">
        <div class="detail-item-label">Status</div>
        <div class="detail-item-val">${inc.verified ? '<span style="color:var(--green)">VERIFIED</span>' : '<span style="color:var(--amber)">PENDING</span>'}</div>
      </div>
    </div>
    <div style="font-size:11px;color:var(--text2);line-height:1.6;margin-bottom:10px;">${inc.desc}</div>
    <div style="margin-bottom:6px;">
      <div class="form-label">IMMEDIATE NEEDS</div>
      <div style="display:flex;gap:4px;flex-wrap:wrap;">
        ${inc.needs.map(n => `<span style="background:rgba(255,59,46,0.1);border:1px solid var(--accent);color:var(--accent);font-family:var(--font-mono);font-size:8px;padding:2px 6px;border-radius:2px;">${n}</span>`).join('')}
      </div>
    </div>
    <div class="action-btns">
      <button class="action-btn primary" onclick="deployResponder('${inc.id}')">DEPLOY TEAM</button>
      <button class="action-btn" onclick="showRoute('${inc.id}')">ROUTE MAP</button>
      <button class="action-btn danger" onclick="escalateIncident('${inc.id}')">ESCALATE</button>
    </div>
  `;
}

// ===== RESPONDERS =====
function renderResponders() {
  const container = document.getElementById('responderList');
  container.innerHTML = '';
  responders.forEach(r => {
    const card = document.createElement('div');
    card.className = 'responder-card';
    const statusClass = { available: 'rs-available', deployed: 'rs-deployed', standby: 'rs-standby' }[r.status];
    card.innerHTML = `
      <div class="resp-avatar" style="background:var(--surface)">${r.type}</div>
      <div class="resp-info">
        <div class="resp-name">${r.name}</div>
        <div class="resp-unit">${r.unit}</div>
        <span class="resp-status ${statusClass}">${r.status.toUpperCase()}</span>
        <div class="resp-eta">${r.eta}</div>
      </div>
      <button class="deploy-btn" onclick="quickDeploy('${r.id}')">DEPLOY</button>
    `;
    container.appendChild(card);
  });
}

// ===== COORDINATION =====
function renderCoordination() {
  renderCoordColumn('coordPending', coordItems.pending);
  renderCoordColumn('coordInProgress', coordItems.inprogress);
  renderCoordColumn('coordResolved', coordItems.resolved);
}

function renderCoordColumn(containerId, items) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  items.forEach(item => {
    const el = document.createElement('div');
    el.className = 'coord-item';
    const sevColor = { critical:'var(--critical)', high:'var(--high)', medium:'var(--medium)', low:'var(--low)' }[item.severity] || 'var(--text2)';
    el.innerHTML = `
      <div class="coord-item-title" style="color:${sevColor}">${item.title}</div>
      <div class="coord-meta">
        <span class="coord-tag">${item.type}</span>
        <span class="coord-tag">📍 ${item.loc}</span>
        <span class="coord-tag">👤 ${item.assigned}</span>
      </div>
      ${item.needs.map(n=>`<span style="font-size:9px;font-family:var(--font-mono);color:var(--text3);margin-right:4px;">#${n}</span>`).join('')}
      <div class="coord-progress">
        <div class="coord-progress-fill" style="width:${item.progress}%;background:${item.progress===100?'var(--green)':'var(--cyan)'}"></div>
      </div>
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:4px;text-align:right">${item.progress}%</div>
    `;
    container.appendChild(el);
  });
}

// ===== ANALYTICS =====
function renderDashboard() {
  // Trend chart
  const chart = document.getElementById('incidentTrendChart');
  chart.innerHTML = '';
  const data = [3,5,4,7,9,6,8,12,10,15,18,14,11,16,20,24,19,22,28,25,20,17,19,15];
  const maxVal = Math.max(...data);
  data.forEach((v, i) => {
    const bar = document.createElement('div');
    bar.className = 'bar-col' + (i >= 20 ? ' accent' : i >= 16 ? ' amber' : '');
    bar.style.height = (v / maxVal * 100) + '%';
    bar.title = v + ' incidents';
    chart.appendChild(bar);
  });

  // Type breakdown
  const types = document.getElementById('typeBreakdown');
  types.innerHTML = '';
  const typeData = [
    { name:'Flood', count:18, color:'var(--blue)' },
    { name:'Cyclone', count:8, color:'var(--cyan)' },
    { name:'Earthquake', count:6, color:'var(--amber)' },
    { name:'Landslide', count:9, color:'var(--high)' },
    { name:'Fire', count:4, color:'var(--accent)' },
    { name:'Storm', count:5, color:'var(--text2)' },
  ];
  const maxCount = 18;
  typeData.forEach(t => {
    const row = document.createElement('div');
    row.className = 'type-row';
    row.innerHTML = `
      <span class="type-name">${t.name}</span>
      <div class="type-bar-wrap"><div class="type-bar" style="width:${(t.count/maxCount)*100}%;background:${t.color}"></div></div>
      <span class="type-count">${t.count}</span>
    `;
    types.appendChild(row);
  });

  // Timeline
  const timeline = document.getElementById('responseTimeline');
  timeline.innerHTML = '';
  const events = [
    { time:'2m', event:'INC-0042 created — FLOOD CRITICAL', color:'var(--accent)' },
    { time:'5m', event:'NDRF Team 04 dispatched', color:'var(--cyan)' },
    { time:'18m', event:'INC-0041 escalated to Critical', color:'var(--accent)' },
    { time:'32m', event:'Medical camp activated Majuli', color:'var(--green)' },
    { time:'1h', event:'Bihar flood ops initiated', color:'var(--high)' },
    { time:'2h', event:'Coastal evacuation INC-0033', color:'var(--amber)' },
  ];
  events.forEach(ev => {
    const item = document.createElement('div');
    item.className = 'tl-item';
    item.innerHTML = `
      <div class="tl-dot" style="background:${ev.color};border-color:${ev.color}"></div>
      <div class="tl-time">${ev.time} ago</div>
      <div class="tl-event">${ev.event}</div>
    `;
    timeline.appendChild(item);
  });

  // Heatmap
  const heatmap = document.getElementById('stateHeatmap');
  heatmap.innerHTML = '';
  const intensities = [9,2,6,4,8,3,7,5,9,2,4,6,8,1,3,7,9,5,6,2,4,8,3,7,5,2,9,6,4,8,1,3,5,7,2,4,6,3,8,9,1,5,7,2,4];
  intensities.forEach((v) => {
    const cell = document.createElement('div');
    cell.className = 'hm-cell';
    const alpha = 0.15 + (v / 9) * 0.75;
    cell.style.background = v > 6 ? `rgba(255,59,46,${alpha})` : v > 3 ? `rgba(255,140,0,${alpha})` : `rgba(0,217,126,${alpha})`;
    heatmap.appendChild(cell);
  });

  // Key Metrics
  const metrics = document.getElementById('keyMetrics');
  metrics.innerHTML = '';
  const metricData = [
    { name:'Avg Alert Latency', val:'8 min', trend:'trend-up', trendVal:'↓ 76% vs historical' },
    { name:'Report-to-Dispatch', val:'12 min', trend:'trend-up', trendVal:'↓ 65% improved' },
    { name:'Duplicate Detection', val:'18%', trend:'trend-up', trendVal:'↑ 94% accuracy' },
    { name:'Responder Utilization', val:'73%', trend:'trend-dn', trendVal:'↑ high load' },
    { name:'Citizens Notified', val:'2.4L', trend:'trend-up', trendVal:'via all channels' },
  ];
  metricData.forEach(m => {
    const row = document.createElement('div');
    row.className = 'metric-row';
    row.innerHTML = `
      <span class="metric-name">${m.name}</span>
      <span class="metric-val" style="color:var(--cyan)">${m.val}</span>
      <span class="metric-trend ${m.trend}">${m.trendVal}</span>
    `;
    metrics.appendChild(row);
  });

  // Source distribution
  const src = document.getElementById('sourceDistribution');
  src.innerHTML = '';
  const srcData = [
    { name:'📱 Citizen App', val:52, color:'var(--blue)' },
    { name:'📡 Govt Sensors', val:21, color:'var(--cyan)' },
    { name:'📻 Field Officers', val:14, color:'var(--green)' },
    { name:'🐦 Social Media', val:8, color:'var(--amber)' },
    { name:'📞 Helpline 112', val:5, color:'var(--high)' },
  ];
  srcData.forEach(s => {
    const row = document.createElement('div');
    row.className = 'gauge-row';
    row.innerHTML = `
      <span class="gauge-label" style="width:120px">${s.name}</span>
      <div class="gauge-track"><div class="gauge-fill" style="width:${s.val}%;background:${s.color}"></div></div>
      <span class="gauge-val">${s.val}%</span>
    `;
    src.appendChild(row);
  });
}

// ===== ALERTS =====
function renderAlerts() {
  const panel = document.getElementById('alertsPanel');
  panel.innerHTML = '';
  alertsData.forEach(a => {
    const item = document.createElement('div');
    item.className = 'notif-item' + (a.unread ? ' unread' : '');
    const icon = a.type === 'danger' ? '🔴' : a.type === 'success' ? '✅' : a.type === 'warning' ? '⚠️' : 'ℹ️';
    item.innerHTML = `
      <span class="notif-icon">${icon}</span>
      <div class="notif-content">
        <div class="notif-title">${a.title}</div>
        <div class="notif-text">${a.text}</div>
        <div class="notif-time">${a.time}</div>
      </div>
    `;
    panel.appendChild(item);
  });
}

// ===== RECENT REPORTS =====
function renderRecentReports() {
  const container = document.getElementById('recentReports');
  container.innerHTML = '';
  const items = [...incidents.slice(0, 4)];
  items.forEach(inc => {
    const el = document.createElement('div');
    el.style.cssText = 'background:var(--surface);border:1px solid var(--border);padding:10px 12px;margin-bottom:6px;border-radius:2px;';
    const colorMap = { critical:'var(--critical)', high:'var(--high)', medium:'var(--medium)', low:'var(--low)' };
    el.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
        <span style="font-family:var(--font-display);font-size:13px;font-weight:700;letter-spacing:1px;color:${colorMap[inc.severity]}">${inc.type}</span>
        <span class="${inc.verified ? 'verified-badge' : 'unverified-badge'}">${inc.verified ? '✓ VERIFIED' : '⏳ QUEUE'}</span>
      </div>
      <div style="font-size:11px;color:var(--text2);">📍 ${inc.location}</div>
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:3px;">${inc.id} · ${inc.time}</div>
    `;
    container.appendChild(el);
  });
}

// ===== FORM INTERACTIONS =====
document.getElementById('disasterTypeGroup').addEventListener('click', e => {
  const chip = e.target.closest('.radio-chip');
  if (!chip) return;
  document.querySelectorAll('#disasterTypeGroup .radio-chip').forEach(c => c.classList.remove('selected'));
  chip.classList.add('selected');
  selectedDisasterType = chip.dataset.val;
});

document.getElementById('needsGroup')?.addEventListener('click', e => {
  const chip = e.target.closest('.radio-chip');
  if (!chip) return;
  chip.classList.toggle('selected');
  const val = chip.dataset.val;
  if (selectedNeeds.includes(val)) selectedNeeds = selectedNeeds.filter(n => n !== val);
  else selectedNeeds.push(val);
});

document.querySelectorAll('.sev-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    this.closest('.severity-picker').querySelectorAll('.sev-btn').forEach(b => b.classList.remove('selected'));
    this.classList.add('selected');
    selectedSeverity = this.dataset.sev;
  });
});

// ===== AUTO LOCATE =====
function autoLocate() {
  const btn = document.querySelector('.locate-btn');
  const orig = btn.innerHTML;
  btn.innerHTML = '📡 LOCATING...';
  setTimeout(() => {
    const locations = [
      { text:'28.6139°N, 77.2090°E — New Delhi, NCT', addr:'Connaught Place, New Delhi, NCT' },
      { text:'26.1445°N, 91.7362°E — Guwahati, Assam', addr:'Dispur, Guwahati, Assam' },
      { text:'20.2961°N, 85.8245°E — Bhubaneswar, Odisha', addr:'Master Canteen, Bhubaneswar' },
    ];
    const loc = locations[Math.floor(Math.random() * locations.length)];
    const coordsEl = document.getElementById('coordsDisplay');
    coordsEl.textContent = '📍 ' + loc.text;
    coordsEl.style.display = 'block';
    document.getElementById('reportLocation').value = loc.addr;
    btn.innerHTML = '✓ LOCATION DETECTED';
    setTimeout(() => { btn.innerHTML = orig; }, 3000);
    showToastNotification('Location Detected', loc.addr, 'success');
  }, 1500);
}

// ===== MEDIA UPLOAD =====
function handleMediaUpload() {
  document.getElementById('mediaInput').click();
}

function previewMedia(event) {
  const file = event.target.files[0];
  if (!file) return;
  const preview = document.getElementById('mediaPreview');
  preview.style.cssText = 'margin-top:6px;padding:8px;background:var(--surface2);border:1px solid var(--border);border-radius:2px;';
  preview.innerHTML = `<span style="font-size:10px;color:var(--green);">✓ ATTACHED: ${file.name} (${(file.size/1024).toFixed(1)} KB)</span>`;
}

// ===== SUBMIT REPORT =====
function submitReport() {
  const loc = document.getElementById('reportLocation').value;
  const desc = document.getElementById('reportDescription').value;
  if (!loc) {
    showToastNotification('Missing Location', 'Please provide location details', 'warning');
    document.getElementById('reportLocation').focus();
    return;
  }

  const btn = document.querySelector('.submit-btn');
  btn.textContent = '⏳ SUBMITTING...';
  btn.disabled = true;

  setTimeout(() => {
    const newId = 'INC-' + (1000 + Math.floor(Math.random() * 9000));
    reportCount++;
    document.getElementById('activeCount').textContent = reportCount;
    document.getElementById('mapLiveCount').textContent = reportCount;
    document.getElementById('mapBadge').textContent = reportCount;

    showToastNotification('✅ Report Submitted', `${newId} — ${selectedDisasterType} at ${loc || 'Unknown'} · Verification in progress`, 'success');

    // Add to recent
    const newInc = {
      id: newId,
      type: selectedDisasterType,
      severity: selectedSeverity.toLowerCase(),
      location: loc,
      time: 'Just now',
      verified: false,
      reports: 1
    };
    incidents.unshift(newInc);
    renderIncidents();

    btn.textContent = '⚡ SUBMIT EMERGENCY REPORT';
    btn.disabled = false;
    document.getElementById('reportLocation').value = '';
    document.getElementById('reportDescription').value = '';
    document.getElementById('coordsDisplay').style.display = 'none';
  }, 2000);
}

// ===== MAP CONTROLS =====
function zoomMap(factor) {
  mapScale *= factor;
  mapScale = Math.max(0.6, Math.min(2.5, mapScale));
  const svg = document.getElementById('india-map');
  svg.style.transform = `scale(${mapScale})`;
  svg.style.transformOrigin = 'center center';
}

function resetMapView() {
  mapScale = 1;
  document.getElementById('india-map').style.transform = 'scale(1)';
}

function toggleSafeZones() {
  showSafeZones = !showSafeZones;
  document.getElementById('safeZones').style.display = showSafeZones ? '' : 'none';
  showToastNotification(showSafeZones ? 'Safe Zones ON' : 'Safe Zones OFF', showSafeZones ? '14 safe zones visible on map' : 'Safe zones hidden', 'info');
}

function toggleHeatmap() {
  showHeatmap = !showHeatmap;
  document.getElementById('heatmapLayer').style.display = showHeatmap ? '' : 'none';
  showToastNotification(showHeatmap ? 'Heatmap ON' : 'Heatmap OFF', showHeatmap ? 'Incident density overlay active' : 'Heatmap hidden', 'info');
}

// ===== ACTIONS =====
function deployResponder(incId) {
  const avail = responders.find(r => r.status === 'available');
  if (avail) {
    avail.status = 'deployed';
    avail.eta = 'En route ' + incId;
    renderResponders();
    showToastNotification('Team Deployed', `${avail.name} dispatched to ${incId}`, 'success');
  } else {
    showToastNotification('No Teams Available', 'All responders currently deployed. Contact HQ for reinforcements.', 'warning');
  }
}

function escalateIncident(incId) {
  const inc = incidents.find(i => i.id === incId);
  if (inc) {
    showToastNotification('⚠ ESCALATED', `${incId} escalated to national HQ and NDMA. Priority alert broadcasted.`, 'danger');
  }
}

function showRoute(incId) {
  showToastNotification('Route Map', `Optimal routes calculated for ${incId}. 3 access routes identified.`, 'info');
}

function quickDeploy(respId) {
  const r = responders.find(re => re.id === respId);
  if (r && r.status === 'available') {
    r.status = 'deployed';
    r.eta = 'Deploying...';
    renderResponders();
    showToastNotification('Deployed', `${r.name} dispatched`, 'success');
  }
}

function broadcastAlert() {
  showToastNotification('📢 BROADCAST SENT', 'Alert transmitted to all active channels: SMS, Radio, EAS, Web Push', 'success');
}

// ===== TOAST NOTIFICATIONS =====
function showToastNotification(title, body, type = 'default') {
  const overlay = document.getElementById('alertOverlay');
  const toast = document.createElement('div');
  toast.className = 'alert-toast' + (type === 'success' ? ' success' : type === 'warning' ? ' warning' : '');
  toast.innerHTML = `
    <div class="toast-title">${title}</div>
    <div class="toast-body">${body}</div>
  `;
  overlay.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toast-out 0.3s ease-in forwards';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

// ===== SIMULATE LIVE UPDATES =====
let tickCount = 0;
function simulateLive() {
  tickCount++;

  // Random stats drift
  if (tickCount % 8 === 0) {
    const critEl = document.getElementById('statCritical');
    critEl.textContent = 10 + Math.floor(Math.random() * 6);
  }

  if (tickCount % 12 === 0) {
    const aiTexts = [
      'Analyzing 47 active incidents across 12 states. High concentration detected in Brahmaputra basin and coastal Odisha. Recommend pre-positioning rescue teams.',
      'Predictive model suggests 70% probability of flood escalation in Dibrugarh in next 3 hours. Evacuation advisory recommended for Zone 5.',
      'Cross-checking 847 citizen reports. 18% duplicate rate detected. 12 unique critical incidents identified. 3 teams awaiting dispatch orders.',
      'Satellite imagery confirms cyclone approaching Odisha coast. Wind speed increasing. Storm surge risk HIGH for districts within 15km of coastline.',
      'Resource optimization: NDRF Team 06 repositioned from Chamoli to Patna for optimal coverage. Response time reduced by 22 minutes.',
    ];
    document.getElementById('aiAnalysis').textContent = aiTexts[Math.floor(Math.random() * aiTexts.length)];
  }

  // Occasional new incident notification
  if (tickCount % 30 === 0) {
    const types = ['FLASH FLOOD', 'STORM SURGE', 'MUDSLIDE', 'WILDFIRE'];
    const locations = ['Arunachal Pradesh', 'Meghalaya', 'Manipur', 'Himachal Pradesh'];
    const t = types[Math.floor(Math.random() * types.length)];
    const l = locations[Math.floor(Math.random() * locations.length)];
    showToastNotification(`⚠ NEW INCIDENT: ${t}`, `Report received from ${l} — verification in progress`, 'danger');
  }

  // Pulse the active incident count
  if (tickCount % 5 === 0) {
    const rng = -1 + Math.floor(Math.random() * 3);
    const curr = parseInt(document.getElementById('activeCount').textContent);
    const newVal = Math.max(40, curr + rng);
    document.getElementById('activeCount').textContent = newVal;
    document.getElementById('mapLiveCount').textContent = newVal;
    document.getElementById('mapBadge').textContent = newVal;
  }
}

setInterval(simulateLive, 1500);

// ===== INIT =====
function init() {
  renderIncidents();
  renderMarkers();
  renderResponders();
  renderCoordination();
  renderDashboard();
  renderAlerts();
  renderRecentReports();

  // State hover interactions
  document.querySelectorAll('.india-state').forEach(state => {
    state.addEventListener('mouseenter', function(e) {
      const name = this.dataset.state;
      const inc = incidents.filter(i => i.state && name && i.state.toLowerCase().includes(name.toLowerCase().split(' ')[0]));
      if (inc.length > 0) {
        const tt = document.getElementById('mapTooltip');
        tt.innerHTML = `
          <div style="font-family:var(--font-display);font-size:13px;font-weight:700;letter-spacing:1px;margin-bottom:4px;">${name}</div>
          <div style="font-size:11px;color:var(--amber);">${inc.length} active incident${inc.length>1?'s':''}</div>
          ${inc.slice(0,2).map(i=>`<div style="font-size:10px;color:var(--text2);margin-top:2px;">• ${i.type} — ${i.severity.toUpperCase()}</div>`).join('')}
        `;
        tt.style.display = 'block';
        tt.style.left = (e.clientX + 12) + 'px';
        tt.style.top = (e.clientY - 10) + 'px';
      }
    });
    state.addEventListener('mousemove', function(e) {
      const tt = document.getElementById('mapTooltip');
      if (tt.style.display !== 'none') {
        tt.style.left = (e.clientX + 12) + 'px';
        tt.style.top = (e.clientY - 10) + 'px';
      }
    });
    state.addEventListener('mouseleave', hideTooltip);
  });

  // Initial toast
  setTimeout(() => {
    showToastNotification('🟢 PLATFORM ONLINE', 'AAPAT Disaster Coordination System is active. 47 incidents being monitored.', 'success');
  }, 800);
  setTimeout(() => {
    showToastNotification('⚠ CYCLONE ALERT', 'Cyclone Biparjoy approaching Odisha coast. Category 3 — 145km/h winds. Landfall in 18hrs.', 'danger');
  }, 2500);
}

document.addEventListener('DOMContentLoaded', init);