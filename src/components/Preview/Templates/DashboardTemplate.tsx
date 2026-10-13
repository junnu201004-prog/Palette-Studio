import React, { useState } from 'react';
import {
  Activity,
  CheckCircle2,
  Cpu,
  Server,
  TrendingUp,
  Download,
} from 'lucide-react';
import { TemplateComponentProps } from './templateProps';

export const DashboardTemplate: React.FC<TemplateComponentProps> = ({
  customColors,
  deviceMode,
  themeUtils,
}) => {
  const { primary, accent, text } = customColors;
  const {
    primaryFg,
    surfaceBg,
    elevatedBg,
    hairlineBorder,
    subtleFill,
    mutedText,
    accentSoft,
    primarySoft,
  } = themeUtils;

  const isMobile = deviceMode === 'mobile';
  const [filterPeriod, setFilterPeriod] = useState('30D');

  const transactions = [
    { id: 'TX-8921', client: 'Stripe Settlement', amount: '+$14,250.00', status: 'Completed', latency: '24ms' },
    { id: 'TX-8920', client: 'AWS Cloud Compute', amount: '-$1,840.50', status: 'Settled', latency: '18ms' },
    { id: 'TX-8919', client: 'Supabase Database Sync', amount: '+$3,400.00', status: 'Completed', latency: '32ms' },
    { id: 'TX-8918', client: 'Auth0 Identity Token', amount: '-$420.00', status: 'Audited', latency: '12ms' },
  ];

  return (
    <div className="flex-1 flex flex-col font-sans">
      {/* Top Application Console Bar */}
      <header
        className="px-4 sm:px-6 py-3 border-b flex items-center justify-between gap-3 shrink-0"
        style={{ borderColor: hairlineBorder, backgroundColor: surfaceBg }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-[4px] flex items-center justify-center text-xs font-bold shrink-0 font-mono"
            style={{ backgroundColor: 'var(--preview-primary)', color: primaryFg }}
          >
            A/
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs tracking-tight">Apex Telemetry Engine</span>
              <span
                className="text-[9px] font-mono px-1.5 py-0.2 rounded"
                style={{ backgroundColor: accentSoft, color: 'var(--preview-accent)' }}
              >
                PROD-US-EAST
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] text-[10px] font-mono border"
            style={{ borderColor: hairlineBorder, backgroundColor: subtleFill }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--preview-accent)' }} />
            <span>Health: 100% Nominal</span>
          </div>

          <button
            type="button"
            className="px-2.5 py-1 rounded-[4px] text-xs font-medium flex items-center gap-1 shadow-sm"
            style={{ backgroundColor: 'var(--preview-primary)', color: primaryFg }}
          >
            <Download className="w-3 h-3" />
            <span className="hidden sm:inline">Export Metrics</span>
          </button>
        </div>
      </header>

      {/* Subheader Toolbar & Range Filter */}
      <div
        className="px-4 sm:px-6 py-2 border-b flex items-center justify-between gap-2 text-xs"
        style={{ borderColor: hairlineBorder }}
      >
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5" style={{ color: 'var(--preview-primary)' }} />
          <span className="font-medium text-[11px]">System Ledger · Real-Time Telemetry</span>
        </div>

        <div className="flex items-center gap-1 p-0.5 rounded border" style={{ borderColor: hairlineBorder, backgroundColor: subtleFill }}>
          {['24H', '7D', '30D', 'QTD'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilterPeriod(t)}
              className="px-2 py-0.5 rounded text-[10px] font-mono transition-colors"
              style={
                filterPeriod === t
                  ? { backgroundColor: 'var(--preview-primary)', color: primaryFg }
                  : { color: mutedText }
              }
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* 4 KPI Metrics Cards */}
      <section className="p-4 sm:p-6 border-b" style={{ borderColor: hairlineBorder }}>
        <div className="max-w-5xl mx-auto">
          <div className={`grid ${isMobile ? 'grid-cols-2 gap-2.5' : 'grid-cols-4 gap-3.5'}`}>
            {[
              { label: 'Settlement Volume', value: '$842,920', trend: '+18.4%', icon: TrendingUp },
              { label: 'Cluster Uptime', value: '99.985%', trend: 'Nominal', icon: Server },
              { label: 'API Ingestion', value: '14.2M reqs', trend: '42ms avg', icon: Cpu },
              { label: 'Audit Verification', value: '100% Passed', trend: 'Zero CVEs', icon: CheckCircle2 },
            ].map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-[6px] border flex flex-col justify-between"
                  style={{ backgroundColor: elevatedBg, borderColor: hairlineBorder }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono" style={{ color: mutedText }}>{kpi.label}</span>
                    <Icon className="w-3.5 h-3.5" style={{ color: idx % 2 === 0 ? 'var(--preview-primary)' : 'var(--preview-accent)' }} />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-bold font-mono tracking-tight leading-none mb-1">
                      {kpi.value}
                    </div>
                    <span
                      className="text-[10px] font-mono font-semibold"
                      style={{ color: idx === 0 ? 'var(--preview-accent)' : mutedText }}
                    >
                      {kpi.trend}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Analysis Chart & Cluster Ledger */}
      <section className="p-4 sm:p-6 border-b" style={{ borderColor: hairlineBorder }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Chart Window */}
          <div
            className="md:col-span-8 p-4 rounded-[6px] border space-y-3"
            style={{ backgroundColor: elevatedBg, borderColor: hairlineBorder }}
          >
            <div className="flex items-center justify-between border-b pb-2.5" style={{ borderColor: hairlineBorder }}>
              <div>
                <h4 className="text-xs font-bold">Throughput & Memory Consumption</h4>
                <p className="text-[10px]" style={{ color: mutedText }}>Ingested events per millisecond</p>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-mono">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--preview-primary)' }} />
                  Primary
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--preview-accent)' }} />
                  Accent
                </span>
              </div>
            </div>

            {/* Visual Simulated Bar Graphic */}
            <div
              className="flex items-end gap-1.5 h-28 pt-4 px-2 pb-1.5 rounded border"
              style={{ backgroundColor: subtleFill, borderColor: hairlineBorder }}
            >
              {[45, 75, 60, 95, 80, 55, 90, 100, 68, 88, 72, 92, 85, 96].map((h, i) => (
                <div key={i} className="flex-1 h-full flex items-end">
                  <div
                    className="w-full rounded-t-[2px] transition-all"
                    style={{
                      height: `${h}%`,
                      backgroundColor:
                        i % 4 === 0
                          ? 'var(--preview-accent)'
                          : i % 2 === 0
                          ? 'var(--preview-primary)'
                          : primarySoft,
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between text-[9px] font-mono" style={{ color: mutedText }}>
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>23:59</span>
            </div>
          </div>

          {/* Node Health Side Block */}
          <div
            className="md:col-span-4 p-4 rounded-[6px] border flex flex-col justify-between space-y-3"
            style={{ backgroundColor: elevatedBg, borderColor: hairlineBorder }}
          >
            <div className="border-b pb-2" style={{ borderColor: hairlineBorder }}>
              <h4 className="text-xs font-bold">Cluster Nodes</h4>
              <p className="text-[10px]" style={{ color: mutedText }}>Multi-region balance</p>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { name: 'Node Alpha · us-east', load: '32%', status: 'Healthy' },
                { name: 'Node Beta · eu-west', load: '68%', status: 'Active' },
                { name: 'Node Gamma · ap-northeast', load: '44%', status: 'Healthy' },
              ].map((node, i) => (
                <div
                  key={i}
                  className="p-2 rounded border flex items-center justify-between"
                  style={{ backgroundColor: subtleFill, borderColor: hairlineBorder }}
                >
                  <div>
                    <div className="font-semibold text-[11px]">{node.name}</div>
                    <div className="text-[10px] font-mono" style={{ color: mutedText }}>Load {node.load}</div>
                  </div>
                  <span
                    className="text-[9px] font-mono px-1.5 py-0.5 rounded font-bold"
                    style={{ backgroundColor: accentSoft, color: 'var(--preview-accent)' }}
                  >
                    {node.status}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="w-full py-1.5 rounded text-xs font-medium border text-center transition-colors hover:bg-black/5"
              style={{ borderColor: hairlineBorder, color: 'var(--preview-text)' }}
            >
              Node Diagnostics
            </button>
          </div>
        </div>
      </section>

      {/* Transaction Log Data Table */}
      <section className="p-4 sm:p-6 border-b" style={{ borderColor: hairlineBorder, backgroundColor: surfaceBg }}>
        <div className="max-w-5xl mx-auto space-y-2">
          <div className="flex items-center justify-between pb-1">
            <h4 className="text-xs font-bold uppercase tracking-wider font-mono">Recent Stream Events</h4>
            <span className="text-[10px] font-mono" style={{ color: mutedText }}>LIVE WEBSOCKET FEED</span>
          </div>

          <div className="rounded-[6px] border overflow-hidden" style={{ borderColor: hairlineBorder, backgroundColor: elevatedBg }}>
            <table className="w-full text-left text-xs">
              <thead className="border-b text-[10px] font-mono uppercase" style={{ borderColor: hairlineBorder, backgroundColor: subtleFill, color: mutedText }}>
                <tr>
                  <th className="p-2.5">Identifier</th>
                  <th className="p-2.5">Client Feed</th>
                  <th className="p-2.5">Volume</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y font-mono text-[11px]" style={{ borderColor: hairlineBorder }}>
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className="p-2.5 font-bold" style={{ color: 'var(--preview-primary)' }}>{tx.id}</td>
                    <td className="p-2.5">{tx.client}</td>
                    <td className="p-2.5 font-semibold">{tx.amount}</td>
                    <td className="p-2.5">
                      <span className="px-1.5 py-0.5 rounded text-[10px]" style={{ backgroundColor: accentSoft, color: 'var(--preview-accent)' }}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 py-4 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs" style={{ color: mutedText }}>
          <span>© {new Date().getFullYear()} Apex Telemetry Cluster. All channels secure.</span>
          <div className="flex items-center gap-3 font-mono text-[10px]">
            <span>PRI: {primary}</span>
            <span>ACC: {accent}</span>
            <span>TXT: {text}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
