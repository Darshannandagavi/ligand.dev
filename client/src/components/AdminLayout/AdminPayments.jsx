// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AdminPayments = () => {
//   const [collegeOptions, setCollegeOptions] = useState([]);
//   const [batchOptions, setBatchOptions] = useState([]);
//   const [programOptions, setProgramOptions] = useState([]);
//   const [technologyOptions, setTechnologyOptions] = useState([]);

//   const [collegeName, setCollegeName] = useState('');
//   const [batch, setBatch] = useState('');
//   const [programName, setProgramName] = useState('');
//   const [technology, setTechnology] = useState('');
//   const [fees, setFees] = useState({});
//   const [setAllFee, setSetAllFee] = useState('');

//   const [students, setStudents] = useState([]);
//   const [selected, setSelected] = useState(new Set());
//   const [groupName, setGroupName] = useState('');

//   const token = localStorage.getItem('token');

//   // Fetch college options
//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const res = await axios.get('https://ligand-dev-7.onrender.com/api/options/collegeName');
//         setCollegeOptions(res.data || []);
//       } catch {
//         setCollegeOptions([]);
//       }
//     };
//     fetch();
//   }, []);

//   // Fetch batch options based on college
//   useEffect(() => {
//     if (!collegeName) { setBatchOptions([]); setBatch(''); return; }
//     (async () => {
//       try {
//         const res = await axios.get('https://ligand-dev-7.onrender.com/api/attendance/options/batches', { 
//           params: { collegeName }, 
//           headers: { Authorization: token ? `Bearer ${token}` : '' } 
//         });
//         setBatchOptions(res.data || []);
//       } catch { setBatchOptions([]); }
//     })();
//   }, [collegeName, token]);

//   // Fetch program options based on college & batch
//   useEffect(() => {
//     if (!collegeName || !batch) { setProgramOptions([]); setProgramName(''); return; }
//     (async () => {
//       try {
//         const res = await axios.get('https://ligand-dev-7.onrender.com/api/attendance/options/programs', { 
//           params: { collegeName, batch }, 
//           headers: { Authorization: token ? `Bearer ${token}` : '' } 
//         });
//         setProgramOptions(res.data || []);
//       } catch { setProgramOptions([]); }
//     })();
//   }, [collegeName, batch, token]);

//   // Fetch technology options based on college, batch & program
//   useEffect(() => {
//     if (!collegeName || !batch || !programName) { setTechnologyOptions([]); setTechnology(''); return; }
//     (async () => {
//       try {
//         const res = await axios.get('https://ligand-dev-7.onrender.com/api/attendance/options/technologies', { 
//           params: { collegeName, batch, programName }, 
//           headers: { Authorization: token ? `Bearer ${token}` : '' } 
//         });
//         setTechnologyOptions(res.data || []);
//       } catch { setTechnologyOptions([]); }
//     })();
//   }, [collegeName, batch, programName, token]);

//   // Load students
//   const loadStudents = async () => {
//     if (!collegeName || !batch || !programName || !technology) return alert('Select all filters');
//     try {
//       const res = await axios.get('https://ligand-dev-7.onrender.com/api/attendance/students', { 
//         params: { collegeName, batch, programName, technology }, 
//         headers: { Authorization: token ? `Bearer ${token}` : '' } 
//       });
//       setStudents(res.data || []);
//       setSelected(new Set());
//       setFees({});
//     } catch (err) { 
//       console.error(err); 
//       alert('Failed to load students'); 
//     }
//   };

//   // Load fee summary
//   const [summary, setSummary] = useState(null);
//   const [summaryLoading, setSummaryLoading] = useState(false);

//   const loadSummary = async () => {
//     try {
//       setSummaryLoading(true);
//       const res = await axios.get('https://ligand-dev-7.onrender.com/api/fee-groups/installments/summary', { 
//         params: { collegeName, batch, programName, technology }, 
//         headers: { Authorization: token ? `Bearer ${token}` : '' } 
//       });
//       setSummary(res.data || null);
//     } catch { setSummary(null); }
//     finally { setSummaryLoading(false); }
//   };

//   // Toggle student selection
//   const toggle = (id) => {
//     setSelected(prev => {
//       const ns = new Set(prev);
//       ns.has(id) ? ns.delete(id) : ns.add(id);
//       return ns;
//     });
//   };

//   // Set fee for a student
//   const setFee = (id, val) => {
//     setFees(prev => ({ ...prev, [id]: val }));
//   };

//   // Save group
//   const saveGroup = async () => {
//     if (selected.size === 0) return alert('Select students');
//     const payload = [];
//     for (const id of selected) {
//       const fee = Number(fees[id]);
//       if (!fee || isNaN(fee)) return alert('Enter valid fee for all selected students');
//       payload.push({ studentId: id, fee });
//     }
//     try {
//       await axios.post('https://ligand-dev-7.onrender.com/api/fee-groups', { 
//         name: groupName, collegeName, batch, programName, technology, students: payload 
//       }, { headers: { Authorization: token ? `Bearer ${token}` : '' } });
//       alert('Group saved');
//       setSelected(new Set());
//       setFees({});
//       setGroupName('');
//     } catch (err) {
//       console.log(err);
//       alert(err.response?.data?.error || 'Failed to save group');
//     }
//   };

//   return (
//     <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
//       <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '24px', marginBottom: '24px' }}>
//         <h2 style={{ margin: '0 0 20px 0', color: '#1a365d', fontSize: '28px', fontWeight: '600', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px' }}>Create Fee Groups</h2>

//         {/* Filters */}
//         <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '24px', border: '1px solid #e2e8f0' }}>
//           <h3 style={{ margin: '0 0 16px 0', color: '#2d3748', fontSize: '18px', fontWeight: '600' }}>Filter Students</h3>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'end' }}>
//             {/* College */}
//             <div>
//               <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#4a5568' }}>College</label>
//               <select value={collegeName} onChange={e => setCollegeName(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e0', borderRadius: '6px', fontSize: '14px', backgroundColor: 'white' }}>
//                 <option value=''>Select College</option>
//                 {collegeOptions.map(c => <option key={c._id || c.value} value={c.value || c}>{c.value || c}</option>)}
//               </select>
//             </div>
//             {/* Batch */}
//             <div>
//               <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#4a5568' }}>Batch</label>
//               <select value={batch} onChange={e => setBatch(e.target.value)} disabled={!batchOptions.length} style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e0', borderRadius: '6px', fontSize: '14px', backgroundColor: batchOptions.length ? 'white' : '#f7fafc' }}>
//                 <option value=''>Select Batch</option>
//                 {batchOptions.map(b => <option key={b} value={b}>{b}</option>)}
//               </select>
//             </div>
//             {/* Program */}
//             <div>
//               <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#4a5568' }}>Program</label>
//               <select value={programName} onChange={e => setProgramName(e.target.value)} disabled={!programOptions.length} style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e0', borderRadius: '6px', fontSize: '14px', backgroundColor: programOptions.length ? 'white' : '#f7fafc' }}>
//                 <option value=''>Select Program</option>
//                 {programOptions.map(p => <option key={p} value={p}>{p}</option>)}
//               </select>
//             </div>
//             {/* Technology */}
//             <div>
//               <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#4a5568' }}>Technology</label>
//               <select value={technology} onChange={e => setTechnology(e.target.value)} disabled={!technologyOptions.length} style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e0', borderRadius: '6px', fontSize: '14px', backgroundColor: technologyOptions.length ? 'white' : '#f7fafc' }}>
//                 <option value=''>Select Technology</option>
//                 {technologyOptions.map(t => <option key={t} value={t}>{t}</option>)}
//               </select>
//             </div>
//             {/* Buttons */}
//             <div style={{ display: 'flex', gap: '12px' }}>
//               <button onClick={loadStudents} style={{ padding: '10px 20px', backgroundColor: '#3182ce', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', flex: 1 }}>Load Students</button>
//               {/* <button onClick={loadSummary} disabled={summaryLoading} style={{ padding: '10px 20px', backgroundColor: summaryLoading ? '#a0aec0' : '#38a169', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: summaryLoading ? 'not-allowed' : 'pointer', flex: 1 }}>
//                 {summaryLoading ? 'Loading...' : 'Load Summary'}
//               </button> */}
//             </div>
//           </div>
//         </div>

//         {/* Summary Section */}
//         {/* {summary && (
//           <div style={{ background: '#edf2f7', padding: '20px', borderRadius: '8px', marginBottom: '24px', border: '1px solid #cbd5e0' }}>
//             <h3 style={{ margin: '0 0 16px 0', color: '#2d3748', fontSize: '18px', fontWeight: '600' }}>Fee Summary</h3>
//             <div style={{ marginBottom: '12px', fontWeight: '500' }}>Total Students: {summary.totalStudents}</div>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
//               {summary.totalAssigned.map((a, idx) => (
//                 <div key={idx} style={{ background: 'white', padding: '16px', borderRadius: '6px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
//                   <div style={{ fontWeight: '600', color: '#3182ce', marginBottom: '8px' }}>Installment {idx + 1}</div>
//                   <div style={{ fontSize: '14px', marginBottom: '4px' }}><span style={{ color: '#4a5568' }}>Assigned:</span> {summary.totalAssigned[idx]}</div>
//                   <div style={{ fontSize: '14px', marginBottom: '4px' }}><span style={{ color: '#4a5568' }}>Paid:</span> {summary.totalPaid[idx]}</div>
//                   <div style={{ fontSize: '14px', color: '#e53e3e', fontWeight: '600' }}>To Be Paid: {summary.toBePaid[idx]}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )} */}

//         {/* Students List & Fee Input */}
//         <div style={{ marginBottom: '24px' }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
//             <h3 style={{ margin: 0, color: '#2d3748', fontSize: '18px', fontWeight: '600' }}>Students ({students.length} found)</h3>
//             <div style={{ color: '#718096', fontSize: '14px' }}>{selected.size} selected</div>
//           </div>
//           <div style={{ maxHeight: '300px', overflow: 'auto', border: '1px solid #e2e8f0', borderRadius: '6px', background: 'white' }}>
//             {students.map(s => (
//               <div key={s._id} style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #f1f5f9', backgroundColor: selected.has(s._id) ? '#ebf8ff' : 'white' }}>
//                 <input type='checkbox' checked={selected.has(s._id)} onChange={() => toggle(s._id)} style={{ marginRight: '12px', width: '18px', height: '18px' }} />
//                 <div style={{ flex: 1 }}>
//                   <div style={{ fontWeight: '500', color: '#2d3748' }}>{s.name}</div>
//                   <div style={{ fontSize: '14px', color: '#718096' }}>{s.usn}</div>
//                 </div>
//               </div>
//             ))}
//             {students.length === 0 && (
//               <div style={{ padding: '40px 20px', textAlign: 'center', color: '#a0aec0' }}>
//                 No students loaded. Please select filters and click "Load Students".
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Fee Assignment Section */}
//         <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//             <h3 style={{ margin: 0, color: '#2d3748', fontSize: '18px', fontWeight: '600' }}>Assign Fees</h3>
//             <input placeholder='Group name' value={groupName} onChange={e => setGroupName(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: '6px', fontSize: '14px', minWidth: '200px' }} />
//           </div>

//           <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'center' }}>
//             <input type='number' placeholder='Set fee to all selected' value={setAllFee} onChange={e => setSetAllFee(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: '6px', width: '220px' }} />
//             <button onClick={() => {
//               if (!setAllFee || isNaN(Number(setAllFee))) return alert('Enter valid fee');
//               const map = {};
//               for (const id of selected) map[id] = Number(setAllFee);
//               setFees(prev => ({ ...prev, ...map }));
//             }} style={{ padding: '8px 12px', background: '#2b6cb0', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Set to all</button>
//           </div>

//           {selected.size > 0 ? (
//             <div>
//               <div style={{ display: 'grid', gridTemplateColumns: '240px 120px', gap: '12px', marginBottom: '12px', padding: '0 16px' }}>
//                 <div style={{ fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>Student Name</div>
//                 <div style={{ fontWeight: '600', color: '#4a5568', fontSize: '14px', textAlign: 'center' }}>Fee</div>
//               </div>
//               <div style={{ maxHeight: '300px', overflow: 'auto' }}>
//                 {[...selected].map(id => {
//                   const s = students.find(x => x._id === id);
//                   return (
//                     <div key={id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 16px', borderBottom: '1px solid #e2e8f0' }}>
//                       <div style={{ flex: 1 }}>
//                         <div style={{ fontWeight: '500' }}>{s?.name || 'Unknown Student'}</div>
//                         <div style={{ fontSize: '12px', color: '#718096' }}>{s?.usn || ''}</div>
//                       </div>
//                       <input type="number" placeholder="Enter Fee" value={fees[id] || ''} onChange={e => setFee(id, e.target.value)} style={{ width: '120px', padding: '8px', border: '1px solid #cbd5e0', borderRadius: '4px', textAlign: 'center' }} />
//                     </div>
//                   );
//                 })}
//               </div>
//               <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
//                 <button onClick={saveGroup} style={{ padding: '12px 24px', backgroundColor: '#38a169', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', minWidth: '200px' }}>
//                   Save Group & Assign Fees
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div style={{ padding: '40px 20px', textAlign: 'center', color: '#a0aec0' }}>Select students above to assign fees</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPayments;



import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPayments = () => {
  const [collegeOptions, setCollegeOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [programOptions, setProgramOptions] = useState([]);
  const [technologyOptions, setTechnologyOptions] = useState([]);

  const [collegeName, setCollegeName] = useState('');
  const [batch, setBatch] = useState('');
  const [programName, setProgramName] = useState('');
  const [technology, setTechnology] = useState('');
  const [fees, setFees] = useState({});
  const [setAllFee, setSetAllFee] = useState('');

  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [groupName, setGroupName] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');

  const token = localStorage.getItem('token');

  // Fetch teachers data
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        console.log('Fetching teachers...');
        const response = await axios.get('https://ligand-dev-7.onrender.com/api/teacher', {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log('Teachers API response:', response);
        if (response.data) {
          setTeachers(response.data);
          console.log('Teachers set in state:', response.data);
        }
      } catch (error) {
        console.error('Error fetching teachers:', error.response?.data || error.message);
      }
    };
    fetchTeachers();
  }, [token]);

  // Fetch college options
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('https://ligand-dev-7.onrender.com/api/options/collegeName');
        setCollegeOptions(res.data || []);
      } catch {
        setCollegeOptions([]);
      }
    };
    fetch();
  }, []);

  // Fetch batch options based on college
  useEffect(() => {
    if (!collegeName) { setBatchOptions([]); setBatch(''); return; }
    (async () => {
      try {
        
        const res = await axios.get('https://ligand-dev-7.onrender.com/api/attendance/options/batches', { 
          params: { collegeName }, 
          headers: { Authorization: token ? `Bearer ${token}` : '' } 
        });
        setBatchOptions(res.data || []);
      } catch(err) {console.log(err); setBatchOptions([]); }
    })();
  }, [collegeName, token]);

  // Fetch program options based on college & batch
  useEffect(() => {
    if (!collegeName || !batch) { setProgramOptions([]); setProgramName(''); return; }
    (async () => {
      try {
        const res = await axios.get('https://ligand-dev-7.onrender.com/api/attendance/options/programs', { 
          params: { collegeName, batch }, 
          headers: { Authorization: token ? `Bearer ${token}` : '' } 
        });
        setProgramOptions(res.data || []);
      } catch { setProgramOptions([]); }
    })();
  }, [collegeName, batch, token]);

  // Fetch technology options based on college, batch & program
  useEffect(() => {
    if (!collegeName || !batch || !programName) { setTechnologyOptions([]); setTechnology(''); return; }
    (async () => {
      try {
        const res = await axios.get('https://ligand-dev-7.onrender.com/api/attendance/options/technologies', { 
          params: { collegeName, batch, programName }, 
          headers: { Authorization: token ? `Bearer ${token}` : '' } 
        });
        setTechnologyOptions(res.data || []);
      } catch { setTechnologyOptions([]); }
    })();
  }, [collegeName, batch, programName, token]);

  // Load students
  const loadStudents = async () => {
  if (!collegeName || !batch || !programName || !technology)
    return alert("Select all filters");

  try {
    // 1) Fetch ALL students based on filters
    const res = await axios.get(
      "https://ligand-dev-7.onrender.com/api/attendance/students",
      {
        params: { collegeName, batch, programName, technology },
        headers: { Authorization: token ? `Bearer ${token}` : "" }
      }
    );
    const allStudents = res.data || [];

    // 2) Fetch existing fee groups for same filters
    const groupsRes = await axios.get(
      "https://ligand-dev-7.onrender.com/api/fee-groups",
      {
        params: { collegeName, batch, programName, technology },
        headers: { Authorization: token ? `Bearer ${token}` : "" }
      }
    );

    const groups = groupsRes.data || [];

    // 3) Collect IDs of students already in groups
    const assignedIds = new Set();

    groups.forEach(group => {
      group.students.forEach(entry => {
        assignedIds.add(String(entry.student?._id || entry.student));
      });
    });

    console.log("Already assigned students:", assignedIds);

    // 4) Filter out assigned students
    const filteredStudents = allStudents.filter(
      s => !assignedIds.has(String(s._id))
    );

    setStudents(filteredStudents);
    setSelected(new Set());
    setFees({});

  } catch (err) {
    console.error(err);
    alert("Failed to load students");
  }
};


  // Load fee summary
  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);

  const loadSummary = async () => {
    try {
      setSummaryLoading(true);
      const res = await axios.get('https://ligand-dev-7.onrender.com/api/fee-groups/installments/summary', { 
        params: { collegeName, batch, programName, technology }, 
        headers: { Authorization: token ? `Bearer ${token}` : '' } 
      });
      setSummary(res.data || null);
    } catch { setSummary(null); }
    finally { setSummaryLoading(false); }
  };

  // Toggle student selection
  const toggle = (id) => {
    setSelected(prev => {
      const ns = new Set(prev);
      ns.has(id) ? ns.delete(id) : ns.add(id);
      return ns;
    });
  };

  // Set fee for a student
  const setFee = (id, val) => {
    setFees(prev => ({ ...prev, [id]: val }));
  };

  // Save group
  const saveGroup = async () => {
    if (selected.size === 0) return alert('Select students');
    if (!selectedTeacher) return alert('Please select a teacher');
    if (!selectedTeacher) return alert('Please select a teacher');
    if (!groupName) return alert('Please enter a group name');

    const payload = [];
    for (const id of selected) {
      const fee = Number(fees[id]);
      if (!fee || isNaN(fee)) return alert('Enter valid fee for all selected students');
      payload.push({ studentId: id, fee });
    }

    try {
      // First create the fee group
      await axios.post('https://ligand-dev-7.onrender.com/api/fee-groups', { 
        name: groupName, 
        collegeName, 
        batch, 
        programName, 
        technology, 
        students: payload,
        teacher: selectedTeacher
      }, { 
        headers: { Authorization: token ? `Bearer ${token}` : '' } 
      });

      // Then update the teacher field for all selected students
      const updatePromises = [...selected].map(studentId => 
        axios.put(`https://ligand-dev-7.onrender.com/api/users/${studentId}`, {
          teacher: selectedTeacher
        }, {
          headers: { Authorization: token ? `Bearer ${token}` : '' }
        })
      );

      await Promise.all(updatePromises);

      alert('Group saved and teacher assigned successfully');
      setSelected(new Set());
      setFees({});
      setGroupName('');
      setSelectedTeacher('');
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error || 'Failed to save group');
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '24px', marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 20px 0', color: '#1a365d', fontSize: '28px', fontWeight: '600', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px' }}>Create Fee Groups</h2>

        {/* Filters */}
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '24px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#2d3748', fontSize: '18px', fontWeight: '600' }}>Filter Students</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'end' }}>
            {/* College */}
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#4a5568' }}>College</label>
              <select value={collegeName} onChange={e => setCollegeName(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e0', borderRadius: '6px', fontSize: '14px', backgroundColor: 'white' }}>
                <option value=''>Select College</option>
                {collegeOptions.map(c => <option key={c._id || c.value} value={c.value || c}>{c.value || c}</option>)}
              </select>
            </div>
            {/* Batch */}
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#4a5568' }}>Batch</label>
              <select value={batch} onChange={e => setBatch(e.target.value)} disabled={!batchOptions.length} style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e0', borderRadius: '6px', fontSize: '14px', backgroundColor: batchOptions.length ? 'white' : '#f7fafc' }}>
                <option value=''>Select Batch</option>
                {batchOptions.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            {/* Program */}
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#4a5568' }}>Program</label>
              <select value={programName} onChange={e => setProgramName(e.target.value)} disabled={!programOptions.length} style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e0', borderRadius: '6px', fontSize: '14px', backgroundColor: programOptions.length ? 'white' : '#f7fafc' }}>
                <option value=''>Select Program</option>
                {programOptions.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            {/* Technology */}
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#4a5568' }}>Technology</label>
              <select value={technology} onChange={e => setTechnology(e.target.value)} disabled={!technologyOptions.length} style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e0', borderRadius: '6px', fontSize: '14px', backgroundColor: technologyOptions.length ? 'white' : '#f7fafc' }}>
                <option value=''>Select Technology</option>
                {technologyOptions.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            {/* Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={loadStudents} style={{ padding: '10px 20px', backgroundColor: '#3182ce', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', flex: 1 }}>Load Students</button>
              
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ margin: 0, color: '#2d3748', fontSize: '18px', fontWeight: '600' }}>Students ({students.length} found)</h3>
            <div style={{ color: '#718096', fontSize: '14px' }}>{selected.size} selected</div>
          </div>
          <div style={{ maxHeight: '300px', overflow: 'auto', border: '1px solid #e2e8f0', borderRadius: '6px', background: 'white' }}>
            {students.map(s => (
              <div key={s._id} style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #f1f5f9', backgroundColor: selected.has(s._id) ? '#ebf8ff' : 'white' }}>
                <input type='checkbox' checked={selected.has(s._id)} onChange={() => toggle(s._id)} style={{ marginRight: '12px', width: '18px', height: '18px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '500', color: '#2d3748' }}>{s.name}</div>
                  <div style={{ fontSize: '14px', color: '#718096' }}>{s.usn}</div>
                </div>
              </div>
            ))}
            {students.length === 0 && (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: '#a0aec0' }}>
                No students loaded. Please select filters and click "Load Students".
              </div>
            )}
          </div>
        </div>

        {/* Fee Assignment Section */}
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, color: '#2d3748', fontSize: '18px', fontWeight: '600' }}>Assign Fees</h3>
            <input placeholder='Group name' value={groupName} onChange={e => setGroupName(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: '6px', fontSize: '14px', minWidth: '200px' }} />
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'center' }}>
            <input type='number' placeholder='Set fee to all selected' value={setAllFee} onChange={e => setSetAllFee(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: '6px', width: '220px' }} />
            <button onClick={() => {
              if (!setAllFee || isNaN(Number(setAllFee))) return alert('Enter valid fee');
              const map = {};
              for (const id of selected) map[id] = Number(setAllFee);
              setFees(prev => ({ ...prev, ...map }));
            }} style={{ padding: '8px 12px', background: '#2b6cb0', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Set to all</button>
          </div>

          {selected.size > 0 ? (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '240px 120px', gap: '12px', marginBottom: '12px', padding: '0 16px' }}>
                <div style={{ fontWeight: '600', color: '#4a5568', fontSize: '14px' }}>Student Name</div>
                <div style={{ fontWeight: '600', color: '#4a5568', fontSize: '14px', textAlign: 'center' }}>Fee</div>
              </div>
              <div style={{ maxHeight: '300px', overflow: 'auto' }}>
                {[...selected].map(id => {
                  const s = students.find(x => x._id === id);
                  return (
                    <div key={id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 16px', borderBottom: '1px solid #e2e8f0' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '500' }}>{s?.name || 'Unknown Student'}</div>
                        <div style={{ fontSize: '12px', color: '#718096' }}>{s?.usn || ''}</div>
                      </div>
                      <input type="number" placeholder="Enter Fee" value={fees[id] || ''} onChange={e => setFee(id, e.target.value)} style={{ width: '120px', padding: '8px', border: '1px solid #cbd5e0', borderRadius: '4px', textAlign: 'center' }} />
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <select 
                  value={selectedTeacher} 
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                  style={{ 
                    padding: '8px 12px', 
                    border: '1px solid #cbd5e0', 
                    borderRadius: '6px', 
                    fontSize: '14px', 
                    minWidth: '200px' 
                  }}
                >
                  <option value="">Select Teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.firstname} {teacher.lastname}
                    </option>
                  ))}
                </select>
                <button onClick={saveGroup} style={{ padding: '12px 24px', backgroundColor: '#38a169', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', minWidth: '200px' }}>
                  Save Group & Assign Fees
                </button>
              </div>
            </div>
          ) : (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: '#a0aec0' }}>Select students above to assign fees</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPayments;
