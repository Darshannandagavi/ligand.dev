// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function AdminPaymentsDashboard() {
//   const [collegeOptions, setCollegeOptions] = useState([]);
//   const [batchOptions, setBatchOptions] = useState([]);
//   const [programOptions, setProgramOptions] = useState([]);
//   const [technologyOptions, setTechnologyOptions] = useState([]);

//   const [filters, setFilters] = useState({ collegeName: '', batch: '', programName: '', technology: '' });
//   const [summary, setSummary] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const res = await axios.get('https://ligand-software-solutions-workshop-2.onrender.com/api/options/collegeName');
//         setCollegeOptions(res.data || []);
//       } catch (err) { setCollegeOptions([]); }
//     };
//     fetch();
//   }, []);

//   useEffect(() => {
//     if (!filters.collegeName) { setBatchOptions([]); setFilters(f => ({ ...f, batch: '' })); return; }
//     (async () => {
//       try {
//         const res = await axios.get('https://ligand-software-solutions-workshop-2.onrender.com/api/attendance/options/batches', { params: { collegeName: filters.collegeName }, headers: { Authorization: token ? `Bearer ${token}` : '' } });
//         setBatchOptions(res.data || []);
//       } catch (err) { setBatchOptions([]); }
//     })();
//   }, [filters.collegeName, token]);

//   useEffect(() => {
//     if (!filters.collegeName || !filters.batch) { setProgramOptions([]); setFilters(f => ({ ...f, programName: '' })); return; }
//     (async () => {
//       try {
//         const res = await axios.get('https://ligand-software-solutions-workshop-2.onrender.com/api/attendance/options/programs', { params: { collegeName: filters.collegeName, batch: filters.batch }, headers: { Authorization: token ? `Bearer ${token}` : '' } });
//         setProgramOptions(res.data || []);
//       } catch (err) { setProgramOptions([]); }
//     })();
//   }, [filters.collegeName, filters.batch, token]);

//   useEffect(() => {
//     if (!filters.collegeName || !filters.batch || !filters.programName) { setTechnologyOptions([]); setFilters(f => ({ ...f, technology: '' })); return; }
//     (async () => {
//       try {
//         const res = await axios.get('https://ligand-software-solutions-workshop-2.onrender.com/api/attendance/options/technologies', { params: { collegeName: filters.collegeName, batch: filters.batch, programName: filters.programName }, headers: { Authorization: token ? `Bearer ${token}` : '' } });
//         setTechnologyOptions(res.data || []);
//       } catch (err) { setTechnologyOptions([]); }
//     })();
//   }, [filters.collegeName, filters.batch, filters.programName, token]);

//   const load = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get('https://ligand-software-solutions-workshop-2.onrender.com/api/fee-groups/installments/summary', { params: filters, headers: { Authorization: token ? `Bearer ${token}` : '' } });
//       setSummary(res.data);
//     } catch (err) {
//       console.error(err);
//       alert('Error loading summary');
//     } finally { setLoading(false); }
//   };

//   useEffect(() => { load(); }, []);

//   return (
//     <div style={{ padding: 12 }}>
//       <h2>Payments Dashboard</h2>
//       <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
//         <select value={filters.collegeName} onChange={e => setFilters({ ...filters, collegeName: e.target.value })}>
//           <option value=''>Select College</option>
//           {collegeOptions.map(c => <option key={c._id || c.value} value={c.value || c}>{c.value || c}</option>)}
//         </select>
//         <select value={filters.batch} onChange={e => setFilters({ ...filters, batch: e.target.value })} disabled={!batchOptions.length}>
//           <option value=''>Select Batch</option>
//           {batchOptions.map(b => <option key={b} value={b}>{b}</option>)}
//         </select>
//         <select value={filters.programName} onChange={e => setFilters({ ...filters, programName: e.target.value })} disabled={!programOptions.length}>
//           <option value=''>Select Program</option>
//           {programOptions.map(p => <option key={p} value={p}>{p}</option>)}
//         </select>
//         <select value={filters.technology} onChange={e => setFilters({ ...filters, technology: e.target.value })} disabled={!technologyOptions.length}>
//           <option value=''>Select Technology</option>
//           {technologyOptions.map(t => <option key={t} value={t}>{t}</option>)}
//         </select>
//         <button onClick={load} disabled={loading}>{loading ? 'Loading...' : 'Refresh'}</button>
//       </div>

//       {loading ? <div>Loading summary...</div> : summary ? (
//         <div>
//           <div>Total Students: {summary.totalStudents}</div>
//           <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
//             {summary.totalAssigned.map((a, idx) => (
//               <div key={idx} style={{ border: '1px solid #ccc', padding: 12 }}>
//                 <div><strong>Installment {idx+1}</strong></div>
//                 <div>Assigned: {summary.totalAssigned[idx]}</div>
//                 <div>Paid: {summary.totalPaid[idx]}</div>
//                 <div>To Be Paid: {summary.toBePaid[idx]}</div>
//                 <div>Paid Count: {summary.paidCount[idx]}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : <div>No data</div>}
//     </div>
//   );
// }




import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPaymentsDashboard() {
  const [collegeOptions, setCollegeOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [programOptions, setProgramOptions] = useState([]);
  const [technologyOptions, setTechnologyOptions] = useState([]);

  const [filters, setFilters] = useState({ collegeName: '', batch: '', programName: '', technology: '' });
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('https://ligand-software-solutions-workshop-2.onrender.com/api/options/collegeName');
        setCollegeOptions(res.data || []);
      } catch (err) { setCollegeOptions([]); }
    };
    fetch();
  }, []);

  useEffect(() => {
    if (!filters.collegeName) { setBatchOptions([]); setFilters(f => ({ ...f, batch: '' })); return; }
    (async () => {
      try {
        const res = await axios.get('https://ligand-software-solutions-workshop-2.onrender.com/api/attendance/options/batches', { params: { collegeName: filters.collegeName }, headers: { Authorization: token ? `Bearer ${token}` : '' } });
        setBatchOptions(res.data || []);
      } catch (err) { setBatchOptions([]); }
    })();
  }, [filters.collegeName, token]);

  useEffect(() => {
    if (!filters.collegeName || !filters.batch) { setProgramOptions([]); setFilters(f => ({ ...f, programName: '' })); return; }
    (async () => {
      try {
        const res = await axios.get('https://ligand-software-solutions-workshop-2.onrender.com/api/attendance/options/programs', { params: { collegeName: filters.collegeName, batch: filters.batch }, headers: { Authorization: token ? `Bearer ${token}` : '' } });
        setProgramOptions(res.data || []);
      } catch (err) { setProgramOptions([]); }
    })();
  }, [filters.collegeName, filters.batch, token]);

  useEffect(() => {
    if (!filters.collegeName || !filters.batch || !filters.programName) { setTechnologyOptions([]); setFilters(f => ({ ...f, technology: '' })); return; }
    (async () => {
      try {
        const res = await axios.get('https://ligand-software-solutions-workshop-2.onrender.com/api/attendance/options/technologies', { params: { collegeName: filters.collegeName, batch: filters.batch, programName: filters.programName }, headers: { Authorization: token ? `Bearer ${token}` : '' } });
        setTechnologyOptions(res.data || []);
      } catch (err) { setTechnologyOptions([]); }
    })();
  }, [filters.collegeName, filters.batch, filters.programName, token]);

  const load = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://ligand-software-solutions-workshop-2.onrender.com/api/fee-groups/installments/summary', { params: filters, headers: { Authorization: token ? `Bearer ${token}` : '' } });
      setSummary(res.data);
    } catch (err) {
      console.error(err);
      alert('Error loading summary');
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>💰 Payments Dashboard</h2>
        <p style={styles.subtitle}>Track and monitor payment installments across institutions</p>
      </div>
      
      {/* Filters Section */}
      <div style={styles.filtersCard}>
        <h3 style={styles.filtersTitle}>Filters</h3>
        <div style={styles.filtersGrid}>
          <div style={styles.filterGroup}>
            <label style={styles.label}>College</label>
            <select 
              value={filters.collegeName} 
              onChange={e => setFilters({ ...filters, collegeName: e.target.value })}
              style={styles.select}
            >
              <option value=''>Select College</option>
              {collegeOptions.map(c => <option key={c._id || c.value} value={c.value || c}>{c.value || c}</option>)}
            </select>
          </div>
          
          <div style={styles.filterGroup}>
            <label style={styles.label}>Batch</label>
            <select 
              value={filters.batch} 
              onChange={e => setFilters({ ...filters, batch: e.target.value })} 
              disabled={!batchOptions.length}
              style={styles.select}
            >
              <option value=''>Select Batch</option>
              {batchOptions.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          
          <div style={styles.filterGroup}>
            <label style={styles.label}>Program</label>
            <select 
              value={filters.programName} 
              onChange={e => setFilters({ ...filters, programName: e.target.value })} 
              disabled={!programOptions.length}
              style={styles.select}
            >
              <option value=''>Select Program</option>
              {programOptions.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          
          <div style={styles.filterGroup}>
            <label style={styles.label}>Technology</label>
            <select 
              value={filters.technology} 
              onChange={e => setFilters({ ...filters, technology: e.target.value })} 
              disabled={!technologyOptions.length}
              style={styles.select}
            >
              <option value=''>Select Technology</option>
              {technologyOptions.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          
          <div style={styles.buttonGroup}>
            <button 
              onClick={load} 
              disabled={loading}
              style={loading ? styles.buttonDisabled : styles.button}
            >
              {loading ? '⏳ Loading...' : '🔄 Refresh Data'}
            </button>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      {loading ? (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading payment summary...</p>
        </div>
      ) : summary ? (
        <div style={styles.summaryContainer}>
          {/* Overview Card */}
          <div style={styles.overviewCard}>
            <h3 style={styles.overviewTitle}>Overview</h3>
            <div style={styles.overviewGrid}>
              <div style={styles.overviewItem}>
                <div style={styles.overviewValue}>{summary.totalStudents}</div>
                <div style={styles.overviewLabel}>Total Students</div>
              </div>
              <div style={styles.overviewItem}>
                <div style={styles.overviewValue}>{summary.totalAssigned.length}</div>
                <div style={styles.overviewLabel}>Total Installments</div>
              </div>
            </div>
          </div>

          {/* Installments Grid */}
          <h3 style={styles.installmentsTitle}>Installment Details</h3>
          <div style={styles.installmentsGrid}>
            {summary.totalAssigned.map((a, idx) => (
              <div key={idx} style={styles.installmentCard}>
                <div style={styles.installmentHeader}>
                  <span style={styles.installmentNumber}>Installment {idx + 1}</span>
                  <div style={getProgressStyle(summary.totalPaid[idx], summary.totalAssigned[idx])}>
                    {Math.round((summary.totalPaid[idx] / summary.totalAssigned[idx]) * 100)}%
                  </div>
                </div>
                
                <div style={styles.installmentStats}>
                  <div style={styles.statItem}>
                    <span style={styles.statLabel}>Assigned:</span>
                    <span style={styles.statValue}>₹{summary.totalAssigned[idx]?.toLocaleString()}</span>
                  </div>
                  <div style={styles.statItem}>
                    <span style={styles.statLabel}>Paid:</span>
                    <span style={styles.statValuePaid}>₹{summary.totalPaid[idx]?.toLocaleString()}</span>
                  </div>
                  <div style={styles.statItem}>
                    <span style={styles.statLabel}>To Be Paid:</span>
                    <span style={styles.statValuePending}>₹{summary.toBePaid[idx]?.toLocaleString()}</span>
                  </div>
                  <div style={styles.statItem}>
                    <span style={styles.statLabel}>Paid Count:</span>
                    <span style={styles.statValue}>{summary.paidCount[idx]}</span>
                  </div>
                </div>
                
                <div style={styles.progressBar}>
                  <div 
                    style={{
                      ...styles.progressFill,
                      width: `${(summary.totalPaid[idx] / summary.totalAssigned[idx]) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={styles.noDataContainer}>
          <div style={styles.noDataIcon}>📊</div>
          <h3 style={styles.noDataTitle}>No Data Available</h3>
          <p style={styles.noDataText}>Please select filters and click refresh to load payment data.</p>
        </div>
      )}
    </div>
  );
}

// Helper function for progress styling
const getProgressStyle = (paid, assigned) => {
  const percentage = (paid / assigned) * 100;
  if (percentage >= 80) return styles.progressHigh;
  if (percentage >= 50) return styles.progressMedium;
  return styles.progressLow;
};

// Styles
const styles = {
  container: {
    padding: '24px',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  },
  header: {
    marginBottom: '32px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '16px',
    color: '#64748b',
    margin: '0',
  },
  filtersCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '32px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0',
  },
  filtersTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 20px 0',
  },
  filtersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    alignItems: 'end',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#475569',
  },
  select: {
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: 'white',
    transition: 'all 0.2s',
  },
  buttonGroup: {
    display: 'flex',
    alignItems: 'end',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    height: 'fit-content',
  },
  buttonDisabled: {
    padding: '10px 20px',
    backgroundColor: '#9ca3af',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'not-allowed',
    height: 'fit-content',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #e2e8f0',
    borderLeft: '4px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '16px',
    color: '#64748b',
    fontSize: '16px',
  },
  summaryContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  overviewCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0',
  },
  overviewTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 20px 0',
  },
  overviewGrid: {
    display: 'flex',
    gap: '24px',
  },
  overviewItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    minWidth: '120px',
  },
  overviewValue: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1e293b',
  },
  overviewLabel: {
    fontSize: '14px',
    color: '#64748b',
    marginTop: '8px',
  },
  installmentsTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 16px 0',
  },
  installmentsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  installmentCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  installmentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  installmentNumber: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1e293b',
  },
  progressHigh: {
    padding: '4px 8px',
    backgroundColor: '#dcfce7',
    color: '#166534',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
  },
  progressMedium: {
    padding: '4px 8px',
    backgroundColor: '#fef3c7',
    color: '#92400e',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
  },
  progressLow: {
    padding: '4px 8px',
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
  },
  installmentStats: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  statItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: '14px',
    color: '#64748b',
  },
  statValue: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1e293b',
  },
  statValuePaid: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#166534',
  },
  statValuePending: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#dc2626',
  },
  progressBar: {
    height: '6px',
    backgroundColor: '#e2e8f0',
    borderRadius: '3px',
    marginTop: '16px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: '3px',
    transition: 'width 0.3s ease',
  },
  noDataContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0',
  },
  noDataIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  noDataTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 8px 0',
  },
  noDataText: {
    fontSize: '14px',
    color: '#64748b',
    textAlign: 'center',
    margin: '0',
  },
};

// Add CSS animation for spinner
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);
