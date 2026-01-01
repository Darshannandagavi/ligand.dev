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
//   const [teachers, setTeachers] = useState([]);
//   const [selectedTeacher, setSelectedTeacher] = useState('');

//   const token = localStorage.getItem('token');

//   // Fetch teachers data
//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         console.log('Fetching teachers...');
//         const response = await axios.get('https://ligand-dev-7.onrender.com/api/teacher', {
//           headers: { 
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });
//         console.log('Teachers API response:', response);
//         if (response.data) {
//           setTeachers(response.data);
//           console.log('Teachers set in state:', response.data);
//         }
//       } catch (error) {
//         console.error('Error fetching teachers:', error.response?.data || error.message);
//       }
//     };
//     fetchTeachers();
//   }, [token]);

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
//       } catch(err) {console.log(err); setBatchOptions([]); }
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
//   if (!collegeName || !batch || !programName || !technology)
//     return alert("Select all filters");

//   try {
//     // 1) Fetch ALL students based on filters
//     const res = await axios.get(
//       "https://ligand-dev-7.onrender.com/api/attendance/students",
//       {
//         params: { collegeName, batch, programName, technology },
//         headers: { Authorization: token ? `Bearer ${token}` : "" }
//       }
//     );
//     const allStudents = res.data || [];

//     // 2) Fetch existing fee groups for same filters
//     const groupsRes = await axios.get(
//       "https://ligand-dev-7.onrender.com/api/fee-groups",
//       {
//         params: { collegeName, batch, programName, technology },
//         headers: { Authorization: token ? `Bearer ${token}` : "" }
//       }
//     );

//     const groups = groupsRes.data || [];

//     // 3) Collect IDs of students already in groups
//     const assignedIds = new Set();

//     groups.forEach(group => {
//       group.students.forEach(entry => {
//         assignedIds.add(String(entry.student?._id || entry.student));
//       });
//     });

//     console.log("Already assigned students:", assignedIds);

//     // 4) Filter out assigned students
//     const filteredStudents = allStudents.filter(
//       s => !assignedIds.has(String(s._id))
//     );

//     setStudents(filteredStudents);
//     setSelected(new Set());
//     setFees({});

//   } catch (err) {
//     console.error(err);
//     alert("Failed to load students");
//   }
// };


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
//     if (!selectedTeacher) return alert('Please select a teacher');
//     if (!selectedTeacher) return alert('Please select a teacher');
//     if (!groupName) return alert('Please enter a group name');

//     const payload = [];
//     for (const id of selected) {
//       const fee = Number(fees[id]);
//       if (!fee || isNaN(fee)) return alert('Enter valid fee for all selected students');
//       payload.push({ studentId: id, fee });
//     }

//     try {
//       // First create the fee group
//       await axios.post('https://ligand-dev-7.onrender.com/api/fee-groups', { 
//         name: groupName, 
//         collegeName, 
//         batch, 
//         programName, 
//         technology, 
//         students: payload,
//         teacher: selectedTeacher
//       }, { 
//         headers: { Authorization: token ? `Bearer ${token}` : '' } 
//       });

//       // Then update the teacher field for all selected students
//       const updatePromises = [...selected].map(studentId => 
//         axios.put(`https://ligand-dev-7.onrender.com/api/users/${studentId}`, {
//           teacher: selectedTeacher
//         }, {
//           headers: { Authorization: token ? `Bearer ${token}` : '' }
//         })
//       );

//       await Promise.all(updatePromises);

//       alert('Group saved and teacher assigned successfully');
//       setSelected(new Set());
//       setFees({});
//       setGroupName('');
//       setSelectedTeacher('');
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
              
//             </div>
//           </div>
//         </div>

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
//               <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <select 
//                   value={selectedTeacher} 
//                   onChange={(e) => setSelectedTeacher(e.target.value)}
//                   style={{ 
//                     padding: '8px 12px', 
//                     border: '1px solid #cbd5e0', 
//                     borderRadius: '6px', 
//                     fontSize: '14px', 
//                     minWidth: '200px' 
//                   }}
//                 >
//                   <option value="">Select Teacher</option>
//                   {teachers.map((teacher) => (
//                     <option key={teacher._id} value={teacher._id}>
//                       {teacher.firstname} {teacher.lastname}
//                     </option>
//                   ))}
//                 </select>
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
import Loader from '../StyleComponents/Loader';

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

  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  // Fetch teachers data
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('https://ligand-dev-7.onrender.com/api/teacher', {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.data) {
          setTeachers(response.data);
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
      } catch(err) { setBatchOptions([]); }
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
      return alert("Please select all filters");

    setLoading(true);
    try {
      // Fetch ALL students based on filters
      const res = await axios.get(
        "https://ligand-dev-7.onrender.com/api/attendance/students",
        {
          params: { collegeName, batch, programName, technology },
          headers: { Authorization: token ? `Bearer ${token}` : "" }
        }
      );
      const allStudents = res.data || [];

      // Fetch existing fee groups for same filters
      const groupsRes = await axios.get(
        "https://ligand-dev-7.onrender.com/api/fee-groups",
        {
          params: { collegeName, batch, programName, technology },
          headers: { Authorization: token ? `Bearer ${token}` : "" }
        }
      );

      const groups = groupsRes.data || [];
      const assignedIds = new Set();

      groups.forEach(group => {
        group.students.forEach(entry => {
          assignedIds.add(String(entry.student?._id || entry.student));
        });
      });

      // Filter out assigned students
      const filteredStudents = allStudents.filter(
        s => !assignedIds.has(String(s._id))
      );

      setStudents(filteredStudents);
      setSelected(new Set());
      setFees({});
      setSetAllFee('');

    } catch (err) {
      console.error(err);
      alert("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  // Load fee summary
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

  // Set fee for all selected students
  const handleSetAllFees = () => {
    if (!setAllFee || isNaN(Number(setAllFee))) return alert('Enter valid fee');
    const map = {};
    for (const id of selected) map[id] = Number(setAllFee);
    setFees(prev => ({ ...prev, ...map }));
  };

  // Save group
  const saveGroup = async () => {
    if (selected.size === 0) return alert('Select students');
    if (!selectedTeacher) return alert('Please select a teacher');
    if (!groupName.trim()) return alert('Please enter a group name');

    const payload = [];
    for (const id of selected) {
      const fee = Number(fees[id]);
      if (!fee || isNaN(fee) || fee <= 0) return alert('Enter valid fee amount for all selected students');
      payload.push({ studentId: id, fee });
    }

    try {
      // Create the fee group
      await axios.post('https://ligand-dev-7.onrender.com/api/fee-groups', { 
        name: groupName.trim(), 
        collegeName, 
        batch, 
        programName, 
        technology, 
        students: payload,
        teacher: selectedTeacher
      }, { 
        headers: { Authorization: token ? `Bearer ${token}` : '' } 
      });

      // Update teacher field for all selected students
      const updatePromises = [...selected].map(studentId => 
        axios.put(`https://ligand-dev-7.onrender.com/api/users/${studentId}`, {
          teacher: selectedTeacher
        }, {
          headers: { Authorization: token ? `Bearer ${token}` : '' }
        })
      );

      await Promise.all(updatePromises);

      alert('Group saved and teacher assigned successfully');
      // Reset form
      setSelected(new Set());
      setFees({});
      setGroupName('');
      setSelectedTeacher('');
      setSetAllFee('');
      // Reload students to refresh list
      loadStudents();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Failed to save group');
    }
  };

  return (
    <div className="admin-payments">
      <div className="payments-container">
        <div className="payments-header">
          <h1 className="page-title">Fee Group Management</h1>
          <p className="page-subtitle">Create fee groups and assign teachers to students</p>
        </div>

        {/* Filters Card */}
        <div className="card filter-card">
          <div className="card-header">
            <h2 className="card-title">Filter Students</h2>
            <div className="card-subtitle">Select criteria to load students</div>
          </div>
          
          <div className="filter-grid">
            {/* College Filter */}
            <div className="form-group">
              <label className="form-label">College</label>
              <select 
                value={collegeName} 
                onChange={e => setCollegeName(e.target.value)}
                className="form-select"
              >
                <option value=''>Select College</option>
                {collegeOptions.map(c => (
                  <option key={c._id || c.value} value={c.value || c}>
                    {c.value || c}
                  </option>
                ))}
              </select>
            </div>

            {/* Batch Filter */}
            <div className="form-group">
              <label className="form-label">Batch</label>
              <select 
                value={batch} 
                onChange={e => setBatch(e.target.value)} 
                disabled={!batchOptions.length}
                className="form-select"
              >
                <option value=''>Select Batch</option>
                {batchOptions.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Program Filter */}
            <div className="form-group">
              <label className="form-label">Program</label>
              <select 
                value={programName} 
                onChange={e => setProgramName(e.target.value)} 
                disabled={!programOptions.length}
                className="form-select"
              >
                <option value=''>Select Program</option>
                {programOptions.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Technology Filter */}
            <div className="form-group">
              <label className="form-label">Technology</label>
              <select 
                value={technology} 
                onChange={e => setTechnology(e.target.value)} 
                disabled={!technologyOptions.length}
                className="form-select"
              >
                <option value=''>Select Technology</option>
                {technologyOptions.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="form-group action-group">
              <button 
                onClick={loadStudents} 
                disabled={loading || !collegeName || !batch || !programName || !technology}
                className={`btn btn-primary ${loading ? 'loading' : ''}`}
              >
                {loading ? 'Loading...' : 'Load Students'}
              </button>
              <button 
                onClick={loadSummary}
                disabled={summaryLoading}
                className="btn btn-secondary"
              >
                {summaryLoading ? 'Loading...' : 'View Summary'}
              </button>
            </div>
          </div>
        </div>

        {/* Students List Card */}
        <div className="card students-card">
          <div className="card-header">
            <div className="header-content">
              <h2 className="card-title">Available Students</h2>
              <div className="selection-counter">
                <span className="total-count">{students.length} students found</span>
                <span className="selected-count">{selected.size} selected</span>
              </div>
            </div>
          </div>

          <div className="students-list">
            {loading ? (
              <div style={{minHeight:"200px",height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}><Loader/></div>
            ) : students.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">👨‍🎓</div>
                <p>No students available. Please select filters and load students.</p>
                <small>Students already assigned to groups won't appear here.</small>
              </div>
            ) : (
              students.map(s => (
                <div 
                  key={s._id} 
                  className={`student-item ${selected.has(s._id) ? 'selected' : ''}`}
                  onClick={() => toggle(s._id)}
                >
                  <div className="student-checkbox">
                    <input 
                      type='checkbox' 
                      checked={selected.has(s._id)} 
                      onChange={() => toggle(s._id)}
                      className="checkbox-input"
                    />
                    <div className="checkbox-custom"></div>
                  </div>
                  <div className="student-info">
                    <div className="student-name">{s.name}</div>
                    <div className="student-usn">{s.usn}</div>
                    <div className="student-email">{s.email}</div>
                  </div>
                  <div className="student-fee">
                    {fees[s._id] ? (
                      <span className="fee-badge">₹{fees[s._id]}</span>
                    ) : (
                      <span className="fee-placeholder">Fee not set</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Fee Assignment Card */}
        {selected.size > 0 && (
          <div className="card fee-assignment-card">
            <div className="card-header">
              <h2 className="card-title">Create Fee Group</h2>
              <div className="card-subtitle">Assign fees and create group for selected students</div>
            </div>

            <div className="fee-assignment-content">
              {/* Group Name Input */}
              <div className="form-group">
                <label className="form-label">Group Name</label>
                <input 
                  type="text" 
                  placeholder="Enter group name (e.g., 'Batch 2024 Group A')" 
                  value={groupName}
                  onChange={e => setGroupName(e.target.value)}
                  className="form-input"
                />
              </div>

              {/* Teacher Selection */}
              <div className="form-group">
                <label className="form-label">Assign Teacher</label>
                <select 
                  value={selectedTeacher} 
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select a teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.firstname} {teacher.lastname}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bulk Fee Setting */}
              <div className="bulk-fee-section">
                <label className="form-label">Bulk Fee Assignment</label>
                <div className="bulk-fee-input-group">
                  <input 
                    type="number" 
                    placeholder="Enter fee amount for all selected" 
                    value={setAllFee}
                    onChange={e => setSetAllFee(e.target.value)}
                    className="form-input"
                    min="0"
                  />
                  <button 
                    onClick={handleSetAllFees}
                    className="btn btn-secondary"
                  >
                    Apply to All
                  </button>
                </div>
              </div>

              {/* Individual Fee Assignment */}
              <div className="individual-fees-section">
                <div className="section-header">
                  <h3 className="section-title">Individual Fee Assignment</h3>
                  <span className="section-subtitle">Edit individual fees if needed</span>
                </div>
                
                <div className="fees-list">
                  {[...selected].map(id => {
                    const s = students.find(x => x._id === id);
                    return (
                      <div key={id} className="fee-item">
                        <div className="student-details">
                          <div className="student-name">{s?.name || 'Unknown Student'}</div>
                          <div className="student-usn">{s?.usn || 'No USN'}</div>
                        </div>
                        <div className="fee-input-wrapper">
                          <span className="currency-symbol">₹</span>
                          <input 
                            type="number" 
                            placeholder="Enter fee" 
                            value={fees[id] || ''} 
                            onChange={e => setFee(id, e.target.value)}
                            className="fee-input"
                            min="0"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button 
                  onClick={() => {
                    setSelected(new Set());
                    setFees({});
                    setGroupName('');
                    setSelectedTeacher('');
                    setSetAllFee('');
                  }}
                  className="btn btn-outline"
                >
                  Clear Selection
                </button>
                <button 
                  onClick={saveGroup}
                  disabled={!groupName.trim() || !selectedTeacher || selected.size === 0}
                  className="btn btn-success"
                >
                  <span className="btn-icon">✓</span>
                  Create Group & Assign Fees
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Summary Card */}
        {summary && (
          <div className="card summary-card">
            <div className="card-header">
              <h2 className="card-title">Fee Summary</h2>
            </div>
            <div className="summary-content">
              {/* Add summary content here */}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .admin-payments {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 24px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .payments-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .payments-header {
          margin-bottom: 32px;
          text-align: center;
        }

        .page-title {
          font-size: 32px;
          font-weight: 700;
          color: #1a237e;
          margin: 0 0 8px 0;
          background: linear-gradient(135deg, #1a237e 0%, #3949ab 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .page-subtitle {
          font-size: 16px;
          color: #666;
          margin: 0;
        }

        /* Card Styles */
        .card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 24px;
          overflow: hidden;
          border: 1px solid #e0e0e0;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
        }

        .card-header {
          padding: 24px;
          border-bottom: 1px solid #f0f0f0;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }

        .card-title {
          font-size: 20px;
          font-weight: 600;
          color: #2d3748;
          margin: 0;
        }

        .card-subtitle {
          font-size: 14px;
          color: #718096;
          margin-top: 4px;
        }

        /* Filter Card */
        .filter-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          padding: 24px;
        }

        /* Form Styles */
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 14px;
          font-weight: 500;
          color: #4a5568;
        }

        .form-select,
        .form-input {
          padding: 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          transition: all 0.2s ease;
          background: white;
        }

        .form-select:focus,
        .form-input:focus {
          outline: none;
          border-color: #4299e1;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
        }

        .form-select:disabled {
          background-color: #f7fafc;
          cursor: not-allowed;
        }

        /* Button Styles */
        .btn {
          padding: 12px 24px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-primary {
          background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background: linear-gradient(135deg, #3182ce 0%, #2b6cb0 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(49, 130, 206, 0.3);
        }

        .btn-secondary {
          background: #edf2f7;
          color: #4a5568;
        }

        .btn-secondary:hover:not(:disabled) {
          background: #e2e8f0;
          transform: translateY(-1px);
        }

        .btn-success {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          color: white;
        }

        .btn-success:hover:not(:disabled) {
          background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(56, 161, 105, 0.3);
        }

        .btn-outline {
          background: transparent;
          color: #4a5568;
          border: 2px solid #e2e8f0;
        }

        .btn-outline:hover:not(:disabled) {
          background: #f7fafc;
          border-color: #cbd5e0;
        }

        .action-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
          justify-content: flex-end;
        }

        /* Students List */
        .students-card .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .selection-counter {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .total-count,
        .selected-count {
          font-size: 14px;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 20px;
        }

        .total-count {
          background: #edf2f7;
          color: #4a5568;
        }

        .selected-count {
          background: #4299e1;
          color: white;
        }

        .students-list {
          padding: 0;
          max-height: 400px;
          overflow-y: auto;
        }

        .student-item {
          display: flex;
          align-items: center;
          padding: 16px 24px;
          border-bottom: 1px solid #f0f0f0;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .student-item:hover {
          background-color: #f8fafc;
        }

        .student-item.selected {
          background-color: #ebf8ff;
          border-left: 4px solid #4299e1;
        }

        .student-checkbox {
          position: relative;
          margin-right: 16px;
        }

        .checkbox-input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 20px;
          width: 20px;
        }

        .checkbox-custom {
          position: absolute;
          top: 0;
          left: 0;
          height: 20px;
          width: 20px;
          background-color: white;
          border: 2px solid #cbd5e0;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .checkbox-input:checked ~ .checkbox-custom {
          background-color: #4299e1;
          border-color: #4299e1;
        }

        .checkbox-input:checked ~ .checkbox-custom:after {
          content: "";
          position: absolute;
          left: 6px;
          top: 2px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .student-info {
          flex: 1;
        }

        .student-name {
          font-weight: 500;
          color: #2d3748;
          margin-bottom: 4px;
        }

        .student-usn,
        .student-email {
          font-size: 12px;
          color: #718096;
        }

        .student-fee {
          margin-left: 16px;
        }

        .fee-badge {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .fee-placeholder {
          color: #a0aec0;
          font-size: 12px;
          font-style: italic;
        }

        /* Fee Assignment Card */
        .fee-assignment-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .bulk-fee-input-group {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .bulk-fee-input-group .form-input {
          flex: 1;
        }

        .individual-fees-section {
          background: #f8fafc;
          border-radius: 12px;
          padding: 20px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #2d3748;
          margin: 0;
        }

        .section-subtitle {
          font-size: 12px;
          color: #718096;
        }

        .fees-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-height: 300px;
          overflow-y: auto;
        }

        .fee-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: white;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }

        .student-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .fee-input-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .currency-symbol {
          font-weight: 600;
          color: #4a5568;
        }

        .fee-input {
          width: 120px;
          padding: 8px 12px;
          border: 2px solid #e2e8f0;
          border-radius: 6px;
          text-align: right;
          font-size: 14px;
        }

        .fee-input:focus {
          outline: none;
          border-color: #4299e1;
        }

        /* Action Buttons */
        .action-buttons {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 24px;
          border-top: 1px solid #e2e8f0;
        }

        .btn-icon {
          font-size: 16px;
        }

        /* Loading and Empty States */
        .loading-state,
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          text-align: center;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #e2e8f0;
          border-top-color: #4299e1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .admin-payments {
            padding: 16px;
          }

          .page-title {
            font-size: 24px;
          }

          .filter-grid {
            grid-template-columns: 1fr;
          }

          .students-card .header-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .selection-counter {
            align-self: stretch;
            justify-content: space-between;
          }

          .bulk-fee-input-group {
            flex-direction: column;
            align-items: stretch;
          }

          .action-buttons {
            flex-direction: column;
            gap: 12px;
          }

          .action-buttons .btn {
            width: 100%;
          }
        }

        /* Animation */
        .student-item {
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AdminPayments;