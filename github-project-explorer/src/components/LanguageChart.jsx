import React from 'react';
import { useExplorer } from '../context/ExplorerContext';
import { getLanguageColor } from '../utils/languageColors';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { PieChart, BarChart2 } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const LanguageChart = () => {
  const { repos } = useExplorer();

  if (!repos || repos.length === 0) return null;

  // Aggregate language counts
  const langCounts = {};
  repos.forEach((repo) => {
    const lang = repo.language || 'Unknown / Other';
    langCounts[lang] = (langCounts[lang] || 0) + 1;
  });

  const sortedLangs = Object.keys(langCounts).sort((a, b) => langCounts[b] - langCounts[a]);
  const topLangs = sortedLangs.slice(0, 7); // Top 7

  const labels = topLangs;
  const dataValues = topLangs.map(l => langCounts[l]);
  const backgroundColors = topLangs.map(l => getLanguageColor(l));

  const barData = {
    labels,
    datasets: [
      {
        label: 'Repositories Count',
        data: dataValues,
        backgroundColor: backgroundColors,
        borderRadius: 6
      }
    ]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#f8fafc',
        bodyColor: '#cbd5e1'
      }
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8', font: { size: 11 } },
        grid: { display: false }
      },
      y: {
        ticks: { color: '#94a3b8', font: { size: 11 } },
        grid: { color: 'rgba(255,255,255,0.05)' }
      }
    }
  };

  const doughnutData = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: backgroundColors,
        borderWidth: 2,
        borderColor: '#090d16'
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#cbd5e1',
          font: { size: 11 },
          boxWidth: 12
        }
      }
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.6rem' }}>
        <PieChart size={20} style={{ color: '#8b5cf6' }} />
        <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#f8fafc', margin: 0 }}>
          Language Distribution & Analytics
        </h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {/* Bar Chart */}
        <div>
          <h4 style={{ fontSize: '0.82rem', fontWeight: '600', color: '#94a3b8', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <BarChart2 size={14} /> Repository Count by Language
          </h4>
          <div style={{ height: '220px' }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* Doughnut Chart */}
        <div>
          <h4 style={{ fontSize: '0.82rem', fontWeight: '600', color: '#94a3b8', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <PieChart size={14} /> Language Share Percentage
          </h4>
          <div style={{ height: '220px' }}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};
