// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function AdminPaymentsMark() {
//   const [collegeOptions, setCollegeOptions] = useState([]);
//   const [batchOptions, setBatchOptions] = useState([]);
//   const [programOptions, setProgramOptions] = useState([]);
//   const [technologyOptions, setTechnologyOptions] = useState([]);

//   const [filters, setFilters] = useState({
//     collegeName: "",
//     batch: "",
//     programName: "",
//     technology: "",
//   });

//   const [rows, setRows] = useState([]);
//   const [filteredRows, setFilteredRows] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [actionLoading, setActionLoading] = useState(false);

//   const token = localStorage.getItem("token");

//   const [searchEmail, setSearchEmail] = useState("");
//   const [searchUsn, setSearchUsn] = useState("");
//   const [searchGroup, setSearchGroup] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");

//   const [rowPayments, setRowPayments] = useState({});

//   // HISTORY MODAL STATES
//   const [showHistory, setShowHistory] = useState(false);
//   const [historyStudent, setHistoryStudent] = useState(null);
//   const [historyData, setHistoryData] = useState([]);

//   // ---------------------------- UPDATE PAYMENT FORM ----------------------------
//   const updateRowPayment = (rowKey, field, value) => {
//     setRowPayments((prev) => ({
//       ...prev,
//       [rowKey]: {
//         ...(prev[rowKey] || {}),
//         [field]: value,
//       },
//     }));
//   };

//   // ---------------------------- FETCH OPTIONS ----------------------------
//   useEffect(() => {
//     axios
//       .get("https://ligand-dev-7.onrender.com/api/options/collegeName")
//       .then((res) => setCollegeOptions(res.data || []))
//       .catch(() => setCollegeOptions([]));
//   }, []);

//   useEffect(() => {
//     if (!filters.collegeName) return setBatchOptions([]);

//     axios
//       .get("https://ligand-dev-7.onrender.com/api/attendance/options/batches", {
//         params: { collegeName: filters.collegeName },
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setBatchOptions(res.data || []))
//       .catch(() => setBatchOptions([]));
//   }, [filters.collegeName]);

//   useEffect(() => {
//     if (!filters.collegeName || !filters.batch) return setProgramOptions([]);

//     axios
//       .get("https://ligand-dev-7.onrender.com/api/attendance/options/programs", {
//         params: {
//           collegeName: filters.collegeName,
//           batch: filters.batch,
//         },
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setProgramOptions(res.data || []))
//       .catch(() => setProgramOptions([]));
//   }, [filters.collegeName, filters.batch]);

//   useEffect(() => {
//     if (!filters.collegeName || !filters.batch || !filters.programName)
//       return setTechnologyOptions([]);

//     axios
//       .get("https://ligand-dev-7.onrender.com/api/attendance/options/technologies", {
//         params: {
//           collegeName: filters.collegeName,
//           batch: filters.batch,
//           programName: filters.programName,
//         },
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setTechnologyOptions(res.data || []))
//       .catch(() => setTechnologyOptions([]));
//   }, [filters.collegeName, filters.batch, filters.programName]);

//   // ---------------------------- MAP API RESPONSE ----------------------------
//   const mapApiResponseToRows = (apiData) => {
//     const rows = [];
//     apiData.forEach((group) => {
//       group.students.forEach((s) => {
//         const student = s.student || {
//           _id: "unknown",
//           name: "Unknown",
//           usn: "N/A",
//           email: "",
//         };

//         rows.push({
//           groupId: group._id,
//           groupName: group.name,
//           student,
//           totalFee: s.totalFee,
//           paidFee: s.paidFee,
//           currentFee: s.currentFee,
//           pending: s.totalFee - s.paidFee,
//           status: s.status,
//         });
//       });
//     });

//     return rows;
//   };

//   // ---------------------------- FETCH STUDENTS ----------------------------
//   const fetchRows = async () => {
//     if (
//       !filters.collegeName ||
//       !filters.batch ||
//       !filters.programName ||
//       !filters.technology
//     ) {
//       alert("Please select all filters before loading data!");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await axios.get(
//         "https://ligand-dev-7.onrender.com/api/fee-groups/students",
//         {
//           params: filters,
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const mapped = mapApiResponseToRows(res.data);
//       setRows(mapped);
//       setFilteredRows(mapped);
//     } catch (err) {
//       alert("Error loading data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------------------- SUBMIT PAYMENT ----------------------------
//   const submitPayment = async (groupId, studentId) => {
//     const rowKey = `${groupId}_${studentId}`;
//     const data = rowPayments[rowKey] || {};

//     if (!data.amount || data.amount <= 0) {
//       alert("Please enter a valid payment amount");
//       return;
//     }

//     const form = new FormData();
//     form.append("amount", data.amount);
//     form.append("paymentMode", data.paymentMode || "");
//     form.append("remark", data.remark || "");
//     form.append("transactionId", data.transactionId || "");

//     if (data.receiptFile) form.append("receipt", data.receiptFile);

//     try {
//       setActionLoading(true);

//       await axios.post(
//         `https://ligand-dev-7.onrender.com/api/fee-groups/${groupId}/students/${studentId}/payment`,
//         form,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       fetchRows();
//       setRowPayments((prev) => {
//         const tmp = { ...prev };
//         delete tmp[rowKey];
//         return tmp;
//       });
//     } catch (err) {
//       alert(err.response?.data?.error || "Payment failed");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // ---------------------------- FILTER SEARCH ----------------------------
//   useEffect(() => {
//     let out = rows;

//     if (statusFilter === "paid") out = out.filter((r) => r.status === "Paid");
//     if (statusFilter === "unpaid") out = out.filter((r) => r.status !== "Paid");

//     if (searchEmail)
//       out = out.filter((r) =>
//         (r.student?.email || "")
//           .toLowerCase()
//           .includes(searchEmail.toLowerCase())
//       );

//     if (searchUsn)
//       out = out.filter((r) =>
//         (r.student?.usn || "").toLowerCase().includes(searchUsn.toLowerCase())
//       );

//     if (searchGroup)
//       out = out.filter((r) =>
//         r.groupName.toLowerCase().includes(searchGroup.toLowerCase())
//       );

//     setFilteredRows(out);
//   }, [searchEmail, searchUsn, searchGroup, statusFilter, rows]);

//   // ---------------------------- OPEN HISTORY MODAL ----------------------------
//   const openHistory = async (groupId, studentId, studentName) => {
//     try {
//       const res = await axios.get(
//         `https://ligand-dev-7.onrender.com/api/fee-groups/${groupId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const studentEntry = res.data.students.find(
//         (s) => String(s.student._id) === String(studentId)
//       );

//       if (!studentEntry) {
//         alert("No payment history found for this student!");
//         return;
//       }

//       setHistoryStudent(studentName);
//       setHistoryData(studentEntry.paymentHistory || []);
//       setShowHistory(true);
//     } catch (err) {
//       console.error("Error fetching payment history:", err);
//       alert("Failed to load payment history");
//     }
//   };

//   // Format currency
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(amount || 0);
//   };

//   // ---------------------------- RENDER ----------------------------
//   return (
//     <div className="admin-payments-container">
//       {/* Header */}
//       <header className="admin-payments-header">
//         <h1 className="admin-payments-title">💰 Fee Management System</h1>
//         <p className="admin-payments-subtitle">Manage student payments and track fee status</p>
//       </header>

//       {/* Filters Section */}
//       <div className="admin-payments-filters-card">
//         <h2 className="admin-payments-section-title">Filter Students</h2>
//         <div className="admin-payments-filters-grid">
//           <div className="admin-payments-filter-group">
//             <label className="admin-payments-filter-label">College</label>
//             <select
//               className="admin-payments-filter-select"
//               value={filters.collegeName}
//               onChange={(e) =>
//                 setFilters({ ...filters, collegeName: e.target.value })
//               }
//             >
//               <option value="">Select College</option>
//               {collegeOptions.map((c) => (
//                 <option key={c._id} value={c.value}>
//                   {c.value}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="admin-payments-filter-group">
//             <label className="admin-payments-filter-label">Batch</label>
//             <select
//               className="admin-payments-filter-select"
//               value={filters.batch}
//               onChange={(e) => setFilters({ ...filters, batch: e.target.value })}
//             >
//               <option value="">Select Batch</option>
//               {batchOptions.map((b) => (
//                 <option key={b} value={b}>
//                   {b}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="admin-payments-filter-group">
//             <label className="admin-payments-filter-label">Program</label>
//             <select
//               className="admin-payments-filter-select"
//               value={filters.programName}
//               onChange={(e) =>
//                 setFilters({ ...filters, programName: e.target.value })
//               }
//             >
//               <option value="">Select Program</option>
//               {programOptions.map((p) => (
//                 <option key={p} value={p}>
//                   {p}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="admin-payments-filter-group">
//             <label className="admin-payments-filter-label">Technology</label>
//             <select
//               className="admin-payments-filter-select"
//               value={filters.technology}
//               onChange={(e) =>
//                 setFilters({ ...filters, technology: e.target.value })
//               }
//             >
//               <option value="">Select Technology</option>
//               {technologyOptions.map((t) => (
//                 <option key={t} value={t}>
//                   {t}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="admin-payments-filter-actions">
//             <button 
//               className="admin-payments-load-btn"
//               onClick={fetchRows}
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <span className="admin-payments-spinner"></span>
//                   Loading...
//                 </>
//               ) : (
//                 '📥 Load Students'
//               )}
//             </button>
//             <button 
//               className="admin-payments-clear-btn"
//               onClick={() => {
//                 setFilters({
//                   collegeName: "",
//                   batch: "",
//                   programName: "",
//                   technology: "",
//                 });
//                 setRows([]);
//                 setFilteredRows([]);
//               }}
//             >
//               Clear Filters
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Search and Status Filters */}
//       <div className="admin-payments-search-card">
//         <h3 className="admin-payments-search-title">Search & Filter</h3>
//         <div className="admin-payments-search-grid">
//           <div className="admin-payments-search-group">
//             <div className="admin-payments-search-icon">📧</div>
//             <input
//               className="admin-payments-search-input"
//               placeholder="Search by email..."
//               value={searchEmail}
//               onChange={(e) => setSearchEmail(e.target.value)}
//             />
//           </div>

//           <div className="admin-payments-search-group">
//             <div className="admin-payments-search-icon">🎓</div>
//             <input
//               className="admin-payments-search-input"
//               placeholder="Search by USN..."
//               value={searchUsn}
//               onChange={(e) => setSearchUsn(e.target.value)}
//             />
//           </div>

//           <div className="admin-payments-search-group">
//             <div className="admin-payments-search-icon">🏷️</div>
//             <input
//               className="admin-payments-search-input"
//               placeholder="Search by group name..."
//               value={searchGroup}
//               onChange={(e) => setSearchGroup(e.target.value)}
//             />
//           </div>

//           <div className="admin-payments-search-group">
//             <div className="admin-payments-search-icon">📊</div>
//             <select
//               className="admin-payments-status-select"
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//             >
//               <option value="all">All Status</option>
//               <option value="paid">✅ Paid Only</option>
//               <option value="unpaid">❌ Unpaid Only</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Results Summary */}
//       {rows.length > 0 && (
//         <div className="admin-payments-summary">
//           <div className="admin-payments-summary-item">
//             <span className="admin-payments-summary-label">Total Students</span>
//             <span className="admin-payments-summary-value">{rows.length}</span>
//           </div>
//           <div className="admin-payments-summary-item">
//             <span className="admin-payments-summary-label">Filtered</span>
//             <span className="admin-payments-summary-value">{filteredRows.length}</span>
//           </div>
//           <div className="admin-payments-summary-item">
//             <span className="admin-payments-summary-label">Total Fees</span>
//             <span className="admin-payments-summary-value">{formatCurrency(rows.reduce((sum, r) => sum + (r.totalFee || 0), 0))}</span>
//           </div>
//           <div className="admin-payments-summary-item">
//             <span className="admin-payments-summary-label">Collected</span>
//             <span className="admin-payments-summary-value admin-payments-summary-collected">
//               {formatCurrency(rows.reduce((sum, r) => sum + (r.paidFee || 0), 0))}
//             </span>
//           </div>
//           <div className="admin-payments-summary-item">
//             <span className="admin-payments-summary-label">Pending</span>
//             <span className="admin-payments-summary-value admin-payments-summary-pending">
//               {formatCurrency(rows.reduce((sum, r) => sum + (r.pending || 0), 0))}
//             </span>
//           </div>
//         </div>
//       )}

//       {/* Table */}
//       <div className="admin-payments-table-container">
//         {loading ? (
//           <div className="admin-payments-loading">
//             <div className="admin-payments-loading-spinner"></div>
//             <p>Loading student data...</p>
//           </div>
//         ) : filteredRows.length === 0 ? (
//           <div className="admin-payments-empty">
//             <div className="admin-payments-empty-icon">📋</div>
//             <h3>No students found</h3>
//             <p>Select filters and load data to view students</p>
//           </div>
//         ) : (
//           <table className="admin-payments-table">
//             <thead>
//               <tr>
//                 <th>Student Details</th>
//                 <th>Group</th>
//                 <th>Total Fee</th>
//                 <th>Paid</th>
//                 <th>Pending</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredRows.map((r) => {
//                 const rowKey = `${r.groupId}_${r.student?._id}`;
//                 const pay = rowPayments[rowKey] || {};
//                 const isPaid = r.status === "Paid";
//                 const paymentProgress = r.totalFee > 0 ? (r.paidFee / r.totalFee) * 100 : 0;

//                 return (
//                   <tr key={rowKey} className={isPaid ? "admin-payments-row-paid" : "admin-payments-row-pending"}>
//                     <td className="admin-payments-cell-student">
//                       <div className="admin-payments-student-avatar">
//                         {r.student.name?.charAt(0).toUpperCase() || "?"}
//                       </div>
//                       <div className="admin-payments-student-info">
//                         <div className="admin-payments-student-name">{r.student.name}</div>
//                         <div className="admin-payments-student-details">
//                           <span className="admin-payments-student-usn">{r.student.usn}</span>
//                           <span className="admin-payments-student-email">{r.student.email}</span>
//                         </div>
//                       </div>
//                     </td>

//                     <td className="admin-payments-cell-group">
//                       <div className="admin-payments-group-badge">{r.groupName}</div>
//                     </td>

//                     <td className="admin-payments-cell-fee">
//                       <div className="admin-payments-fee-amount">{formatCurrency(r.totalFee)}</div>
//                     </td>

//                     <td className="admin-payments-cell-paid">
//                       <div className="admin-payments-fee-progress">
//                         <div className="admin-payments-fee-progress-bar">
//                           <div 
//                             className="admin-payments-fee-progress-fill"
//                             style={{ width: `${paymentProgress}%` }}
//                           ></div>
//                         </div>
//                         <div className="admin-payments-fee-paid">{formatCurrency(r.paidFee)}</div>
//                       </div>
//                     </td>

//                     <td className="admin-payments-cell-pending">
//                       <div className={`admin-payments-pending-amount ${r.pending > 0 ? 'admin-payments-pending-high' : ''}`}>
//                         {formatCurrency(r.pending)}
//                       </div>
//                     </td>

//                     <td className="admin-payments-cell-status">
//                       <span className={`admin-payments-status-badge ${isPaid ? 'admin-payments-status-paid' : 'admin-payments-status-unpaid'}`}>
//                         {isPaid ? '✅ Paid' : '❌ Unpaid'}
//                       </span>
//                     </td>

//                     <td className="admin-payments-cell-actions">
//                       <div className="admin-payments-action-buttons">
//                         <button 
//                           className="admin-payments-action-history"
//                           onClick={() => openHistory(r.groupId, r.student._id, r.student.name)}
//                         >
//                           📜 History
//                         </button>
                        
//                         {!isPaid && (
//                           <button 
//                             className="admin-payments-action-pay"
//                             onClick={() => {
//                               // Toggle payment form visibility
//                               if (rowPayments[rowKey]) {
//                                 setRowPayments(prev => {
//                                   const newPayments = { ...prev };
//                                   delete newPayments[rowKey];
//                                   return newPayments;
//                                 });
//                               } else {
//                                 setRowPayments(prev => ({
//                                   ...prev,
//                                   [rowKey]: {
//                                     amount: r.pending > 0 ? r.pending : '',
//                                     paymentMode: '',
//                                     transactionId: '',
//                                     remark: '',
//                                     receiptFile: null
//                                   }
//                                 }));
//                               }
//                             }}
//                           >
//                             💳 {rowPayments[rowKey] ? 'Cancel' : 'Add Payment'}
//                           </button>
//                         )}
//                       </div>

//                       {/* Payment Form */}
//                       {rowPayments[rowKey] && !isPaid && (
//                         <div className="admin-payments-payment-form">
//                           <div className="admin-payments-form-header">
//                             <h4>Record Payment for {r.student.name}</h4>
//                           </div>
                          
//                           <div className="admin-payments-form-grid">
//                             <div className="admin-payments-form-group">
//                               <label>Amount (₹)</label>
//                               <input
//                                 type="number"
//                                 className="admin-payments-form-input"
//                                 placeholder="Enter amount"
//                                 value={pay.amount || ""}
//                                 onChange={(e) =>
//                                   updateRowPayment(rowKey, "amount", e.target.value)
//                                 }
//                                 min="1"
//                                 max={r.pending}
//                               />
//                               <small>Max: {formatCurrency(r.pending)}</small>
//                             </div>

//                             <div className="admin-payments-form-group">
//                               <label>Payment Mode</label>
//                               <select
//                                 className="admin-payments-form-select"
//                                 value={pay.paymentMode || ""}
//                                 onChange={(e) =>
//                                   updateRowPayment(rowKey, "paymentMode", e.target.value)
//                                 }
//                               >
//                                 <option value="">Select Mode</option>
//                                 <option value="cash">💵 Cash</option>
//                                 <option value="online">🌐 Online</option>
//                                 <option value="cheque">🏦 Cheque</option>
//                                 <option value="bank_transfer">🏛️ Bank Transfer</option>
//                               </select>
//                             </div>

//                             {pay.paymentMode === "online" && (
//                               <>
//                                 <div className="admin-payments-form-group">
//                                   <label>Transaction ID</label>
//                                   <input
//                                     className="admin-payments-form-input"
//                                     placeholder="Enter transaction ID"
//                                     value={pay.transactionId || ""}
//                                     onChange={(e) =>
//                                       updateRowPayment(
//                                         rowKey,
//                                         "transactionId",
//                                         e.target.value
//                                       )
//                                     }
//                                   />
//                                 </div>

//                                 <div className="admin-payments-form-group">
//                                   <label>Receipt Upload</label>
//                                   <div className="admin-payments-file-upload">
//                                     <input
//                                       type="file"
//                                       className="admin-payments-file-input"
//                                       onChange={(e) =>
//                                         updateRowPayment(
//                                           rowKey,
//                                           "receiptFile",
//                                           e.target.files[0]
//                                         )
//                                       }
//                                     />
//                                     <span className="admin-payments-file-label">
//                                       {pay.receiptFile ? pay.receiptFile.name : 'Choose file...'}
//                                     </span>
//                                   </div>
//                                 </div>
//                               </>
//                             )}

//                             <div className="admin-payments-form-group admin-payments-form-full">
//                               <label>Remarks</label>
//                               <textarea
//                                 className="admin-payments-form-textarea"
//                                 placeholder="Add any remarks or notes..."
//                                 value={pay.remark || ""}
//                                 onChange={(e) =>
//                                   updateRowPayment(rowKey, "remark", e.target.value)
//                                 }
//                                 rows="2"
//                               />
//                             </div>
//                           </div>

//                           <div className="admin-payments-form-actions">
//                             <button
//                               className="admin-payments-form-submit"
//                               onClick={() => submitPayment(r.groupId, r.student._id)}
//                               disabled={actionLoading}
//                             >
//                               {actionLoading ? (
//                                 <>
//                                   <span className="admin-payments-spinner-small"></span>
//                                   Processing...
//                                 </>
//                               ) : (
//                                 '✅ Submit Payment'
//                               )}
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* Payment History Modal */}
//       {showHistory && (
//         <div className="admin-payments-modal">
//           <div className="admin-payments-modal-overlay" onClick={() => setShowHistory(false)}></div>
//           <div className="admin-payments-modal-content">
//             <div className="admin-payments-modal-header">
//               <h2 className="admin-payments-modal-title">
//                 📋 Payment History - {historyStudent}
//               </h2>
//               <button 
//                 className="admin-payments-modal-close"
//                 onClick={() => setShowHistory(false)}
//               >
//                 ×
//               </button>
//             </div>

//             <div className="admin-payments-modal-body">
//               {historyData.length === 0 ? (
//                 <div className="admin-payments-modal-empty">
//                   <div className="admin-payments-modal-empty-icon">📭</div>
//                   <h3>No Payment History</h3>
//                   <p>This student has no payment records yet.</p>
//                 </div>
//               ) : (
//                 <div className="admin-payments-history-table-container">
//                   <table className="admin-payments-history-table">
//                     <thead>
//                       <tr>
//                         <th>Date & Time</th>
//                         <th>Amount</th>
//                         <th>Payment Mode</th>
//                         <th>Transaction ID</th>
//                         <th>Remarks</th>
//                         <th>Receipt</th>
//                       </tr>
//                     </thead>

//                     <tbody>
//                       {historyData.map((h, i) => (
//                         <tr key={i}>
//                           <td className="admin-payments-history-date">
//                             {h.paidOn ? new Date(h.paidOn).toLocaleString('en-IN', {
//                               day: '2-digit',
//                               month: 'short',
//                               year: 'numeric',
//                               hour: '2-digit',
//                               minute: '2-digit',
//                             }) : 'N/A'}
//                           </td>
//                           <td className="admin-payments-history-amount">
//                             <span className="admin-payments-amount-badge">
//                               {formatCurrency(h.amount)}
//                             </span>
//                           </td>
//                           <td className="admin-payments-history-mode">
//                             <span className={`admin-payments-mode-badge admin-payments-mode-${h.paymentMode}`}>
//                               {h.paymentMode}
//                             </span>
//                           </td>
//                           <td className="admin-payments-history-transaction">
//                             {h.transactionId || "N/A"}
//                           </td>
//                           <td className="admin-payments-history-remarks">
//                             {h.remark || "-"}
//                           </td>
//                           <td className="admin-payments-history-receipt">
//                             {h.receipt ? (
//                               <a
//                                 href={`https://ligand-dev-7.onrender.com/uploads/receipts/${h.receipt}`}
//                                 target="_blank"
//                                 rel="noreferrer"
//                                 className="admin-payments-receipt-link"
//                               >
//                                 📄 View
//                               </a>
//                             ) : (
//                               <span className="admin-payments-no-receipt">No File</span>
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>

//             <div className="admin-payments-modal-footer">
//               <button 
//                 className="admin-payments-modal-close-btn"
//                 onClick={() => setShowHistory(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Global Loading Overlay */}
//       {actionLoading && (
//         <div className="admin-payments-global-loading">
//           <div className="admin-payments-global-spinner"></div>
//           <p>Processing payment, please wait...</p>
//         </div>
//       )}

//       {/* Internal CSS */}
//       <style>{`
//         /* Reset and Base Styles */
//         .admin-payments-container * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//         }

//         .admin-payments-container {
//           min-height: 100vh;
//           background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
//           padding: 24px;
//         }

//         /* Header */
//         .admin-payments-header {
//           margin-bottom: 32px;
//           text-align: center;
//         }

//         .admin-payments-title {
//           font-size: 36px;
//           font-weight: 800;
//           color: #2d3748;
//           margin-bottom: 8px;
//           background: linear-gradient(90deg, #667eea, #764ba2);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }

//         .admin-payments-subtitle {
//           color: #718096;
//           font-size: 16px;
//           max-width: 600px;
//           margin: 0 auto;
//         }

//         /* Filters Card */
//         .admin-payments-filters-card {
//           background: white;
//           border-radius: 20px;
//           padding: 28px;
//           margin-bottom: 24px;
//           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
//         }

//         .admin-payments-section-title {
//           font-size: 20px;
//           font-weight: 700;
//           color: #2d3748;
//           margin-bottom: 24px;
//           display: flex;
//           align-items: center;
//           gap: 10px;
//         }

//         .admin-payments-section-title::before {
//           content: '';
//           width: 4px;
//           height: 20px;
//           background: linear-gradient(135deg, #667eea, #764ba2);
//           border-radius: 2px;
//         }

//         .admin-payments-filters-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
//           gap: 20px;
//           align-items: end;
//         }

//         .admin-payments-filter-group {
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//         }

//         .admin-payments-filter-label {
//           color: #4a5568;
//           font-size: 14px;
//           font-weight: 600;
//           margin-bottom: 4px;
//         }

//         .admin-payments-filter-select {
//           padding: 14px 16px;
//           border: 2px solid #e2e8f0;
//           border-radius: 12px;
//           font-size: 15px;
//           background: white;
//           cursor: pointer;
//           transition: all 0.3s;
//           appearance: none;
//           background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234a5568' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
//           background-repeat: no-repeat;
//           background-position: right 16px center;
//           background-size: 16px;
//           padding-right: 40px;
//         }

//         .admin-payments-filter-select:focus {
//           outline: none;
//           border-color: #667eea;
//           box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
//         }

//         .admin-payments-filter-actions {
//           display: flex;
//           gap: 12px;
//           align-items: center;
//         }

//         .admin-payments-load-btn {
//           padding: 14px 28px;
//           background: linear-gradient(135deg, #667eea, #764ba2);
//           color: white;
//           border: none;
//           border-radius: 12px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s;
//           display: flex;
//           align-items: center;
//           gap: 10px;
//         }

//         .admin-payments-load-btn:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
//         }

//         .admin-payments-load-btn:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//         }

//         .admin-payments-clear-btn {
//           padding: 14px 24px;
//           background: white;
//           color: #4a5568;
//           border: 2px solid #e2e8f0;
//           border-radius: 12px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s;
//         }

//         .admin-payments-clear-btn:hover {
//           background: #f7fafc;
//           border-color: #cbd5e0;
//         }

//         /* Search Card */
//         .admin-payments-search-card {
//           background: white;
//           border-radius: 20px;
//           padding: 24px;
//           margin-bottom: 24px;
//           box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
//         }

//         .admin-payments-search-title {
//           font-size: 18px;
//           font-weight: 600;
//           color: #2d3748;
//           margin-bottom: 20px;
//         }

//         .admin-payments-search-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
//           gap: 16px;
//         }

//         .admin-payments-search-group {
//           position: relative;
//         }

//         .admin-payments-search-icon {
//           position: absolute;
//           left: 16px;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #a0aec0;
//           font-size: 18px;
//         }

//         .admin-payments-search-input {
//           width: 100%;
//           padding: 14px 16px 14px 46px;
//           border: 2px solid #e2e8f0;
//           border-radius: 12px;
//           font-size: 15px;
//           transition: all 0.3s;
//           background: #f8fafc;
//         }

//         .admin-payments-search-input:focus {
//           outline: none;
//           border-color: #667eea;
//           background: white;
//           box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
//         }

//         .admin-payments-status-select {
//           width: 100%;
//           padding: 14px 16px;
//           border: 2px solid #e2e8f0;
//           border-radius: 12px;
//           font-size: 15px;
//           background: #f8fafc;
//           cursor: pointer;
//           transition: all 0.3s;
//         }

//         .admin-payments-status-select:focus {
//           outline: none;
//           border-color: #667eea;
//           background: white;
//           box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
//         }

//         /* Summary */
//         .admin-payments-summary {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
//           gap: 16px;
//           margin-bottom: 24px;
//         }

//         .admin-payments-summary-item {
//           background: white;
//           border-radius: 16px;
//           padding: 20px;
//           text-align: center;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
//           transition: transform 0.3s;
//         }

//         .admin-payments-summary-item:hover {
//           transform: translateY(-4px);
//         }

//         .admin-payments-summary-label {
//           display: block;
//           color: #718096;
//           font-size: 14px;
//           margin-bottom: 8px;
//           font-weight: 500;
//         }

//         .admin-payments-summary-value {
//           display: block;
//           font-size: 24px;
//           font-weight: 700;
//           color: #2d3748;
//         }

//         .admin-payments-summary-collected {
//           color: #48bb78;
//         }

//         .admin-payments-summary-pending {
//           color: #f56565;
//         }

//         /* Table Container */
//         .admin-payments-table-container {
//           background: white;
//           border-radius: 20px;
//           overflow: hidden;
//           box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
//         }

//         .admin-payments-loading {
//           padding: 60px 20px;
//           text-align: center;
//         }

//         .admin-payments-loading-spinner {
//           width: 50px;
//           height: 50px;
//           border: 4px solid #e2e8f0;
//           border-top: 4px solid #667eea;
//           border-radius: 50%;
//           animation: admin-payments-spin 1s linear infinite;
//           margin: 0 auto 20px;
//         }

//         .admin-payments-empty {
//           padding: 80px 20px;
//           text-align: center;
//           color: #a0aec0;
//         }

//         .admin-payments-empty-icon {
//           font-size: 64px;
//           margin-bottom: 20px;
//           opacity: 0.5;
//         }

//         .admin-payments-empty h3 {
//           font-size: 24px;
//           color: #718096;
//           margin-bottom: 8px;
//         }

//         /* Table */
//         .admin-payments-table {
//           width: 100%;
//           border-collapse: collapse;
//         }

//         .admin-payments-table thead {
//           background: linear-gradient(135deg, #667eea, #764ba2);
//         }

//         .admin-payments-table th {
//           padding: 20px 24px;
//           color: white;
//           font-weight: 600;
//           text-align: left;
//           font-size: 14px;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//           border-bottom: 2px solid rgba(255, 255, 255, 0.1);
//         }

//         .admin-payments-table tbody tr {
//           border-bottom: 2px solid #f7fafc;
//           transition: all 0.3s;
//         }

//         .admin-payments-table tbody tr:hover {
//           background: #f8fafc;
//         }

//         .admin-payments-row-paid {
//           background: rgba(72, 187, 120, 0.02);
//         }

//         .admin-payments-row-pending {
//           background: rgba(245, 101, 101, 0.02);
//         }

//         .admin-payments-table td {
//           padding: 20px 24px;
//           color: #4a5568;
//         }

//         /* Student Cell */
//         .admin-payments-cell-student {
//           min-width: 250px;
//         }

//         .admin-payments-student-avatar {
//           width: 50px;
//           height: 50px;
//           background: linear-gradient(135deg, #667eea, #764ba2);
//           color: white;
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 20px;
//           font-weight: bold;
//           margin-right: 16px;
//         }

//         .admin-payments-student-info {
//           display: flex;
//           align-items: center;
//           gap: 16px;
//         }

//         .admin-payments-student-name {
//           font-weight: 600;
//           color: #2d3748;
//           margin-bottom: 4px;
//         }

//         .admin-payments-student-details {
//           display: flex;
//           flex-direction: column;
//           gap: 4px;
//         }

//         .admin-payments-student-usn {
//           color: #667eea;
//           font-weight: 500;
//           font-size: 14px;
//         }

//         .admin-payments-student-email {
//           color: #718096;
//           font-size: 13px;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           white-space: nowrap;
//           max-width: 200px;
//         }

//         /* Group Cell */
//         .admin-payments-group-badge {
//           background: rgba(102, 126, 234, 0.1);
//           color: #667eea;
//           padding: 8px 16px;
//           border-radius: 20px;
//           font-size: 13px;
//           font-weight: 600;
//           display: inline-block;
//         }

//         /* Fee Cells */
//         .admin-payments-fee-amount {
//           font-weight: 700;
//           color: #2d3748;
//           font-size: 16px;
//         }

//         .admin-payments-fee-progress {
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//         }

//         .admin-payments-fee-progress-bar {
//           height: 8px;
//           background: #e2e8f0;
//           border-radius: 4px;
//           overflow: hidden;
//         }

//         .admin-payments-fee-progress-fill {
//           height: 100%;
//           background: linear-gradient(90deg, #48bb78, #38a169);
//           border-radius: 4px;
//           transition: width 0.6s ease;
//         }

//         .admin-payments-fee-paid {
//           font-weight: 600;
//           color: #48bb78;
//           font-size: 14px;
//         }

//         .admin-payments-pending-amount {
//           font-weight: 600;
//           color: #718096;
//         }

//         .admin-payments-pending-high {
//           color: #f56565;
//           font-weight: 700;
//         }

//         /* Status Cell */
//         .admin-payments-status-badge {
//           padding: 8px 16px;
//           border-radius: 20px;
//           font-size: 13px;
//           font-weight: 600;
//         }

//         .admin-payments-status-paid {
//           background: rgba(72, 187, 120, 0.1);
//           color: #38a169;
//         }

//         .admin-payments-status-unpaid {
//           background: rgba(245, 101, 101, 0.1);
//           color: #e53e3e;
//         }

//         /* Actions Cell */
//         .admin-payments-cell-actions {
//           min-width: 300px;
//         }

//         .admin-payments-action-buttons {
//           display: flex;
//           gap: 10px;
//           margin-bottom: 16px;
//         }

//         .admin-payments-action-history {
//           padding: 10px 20px;
//           background: rgba(102, 126, 234, 0.1);
//           color: #667eea;
//           border: none;
//           border-radius: 10px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }

//         .admin-payments-action-history:hover {
//           background: rgba(102, 126, 234, 0.2);
//         }

//         .admin-payments-action-pay {
//           padding: 10px 20px;
//           background: linear-gradient(135deg, #48bb78, #38a169);
//           color: white;
//           border: none;
//           border-radius: 10px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }

//         .admin-payments-action-pay:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 6px 16px rgba(72, 187, 120, 0.3);
//         }

//         /* Payment Form */
//         .admin-payments-payment-form {
//           background: #f8fafc;
//           border-radius: 12px;
//           padding: 20px;
//           border: 2px solid #e2e8f0;
//           margin-top: 16px;
//           animation: admin-payments-slide-down 0.3s ease;
//         }

//         @keyframes admin-payments-slide-down {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .admin-payments-form-header {
//           margin-bottom: 20px;
//         }

//         .admin-payments-form-header h4 {
//           color: #2d3748;
//           font-size: 16px;
//           font-weight: 600;
//         }

//         .admin-payments-form-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: 16px;
//           margin-bottom: 20px;
//         }

//         .admin-payments-form-group {
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//         }

//         .admin-payments-form-group label {
//           color: #4a5568;
//           font-size: 14px;
//           font-weight: 600;
//         }

//         .admin-payments-form-input {
//           padding: 12px 16px;
//           border: 2px solid #e2e8f0;
//           border-radius: 10px;
//           font-size: 15px;
//           transition: all 0.3s;
//         }

//         .admin-payments-form-input:focus {
//           outline: none;
//           border-color: #667eea;
//           box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
//         }

//         .admin-payments-form-select {
//           padding: 12px 16px;
//           border: 2px solid #e2e8f0;
//           border-radius: 10px;
//           font-size: 15px;
//           background: white;
//           cursor: pointer;
//           transition: all 0.3s;
//         }

//         .admin-payments-form-select:focus {
//           outline: none;
//           border-color: #667eea;
//           box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
//         }

//         .admin-payments-file-upload {
//           position: relative;
//         }

//         .admin-payments-file-input {
//           position: absolute;
//           width: 100%;
//           height: 100%;
//           opacity: 0;
//           cursor: pointer;
//         }

//         .admin-payments-file-label {
//           display: block;
//           padding: 12px 16px;
//           background: white;
//           border: 2px dashed #e2e8f0;
//           border-radius: 10px;
//           text-align: center;
//           color: #718096;
//           cursor: pointer;
//           transition: all 0.3s;
//         }

//         .admin-payments-file-label:hover {
//           border-color: #cbd5e0;
//           background: #f7fafc;
//         }

//         .admin-payments-form-full {
//           grid-column: 1 / -1;
//         }

//         .admin-payments-form-textarea {
//           padding: 12px 16px;
//           border: 2px solid #e2e8f0;
//           border-radius: 10px;
//           font-size: 15px;
//           font-family: inherit;
//           resize: vertical;
//           transition: all 0.3s;
//         }

//         .admin-payments-form-textarea:focus {
//           outline: none;
//           border-color: #667eea;
//           box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
//         }

//         .admin-payments-form-actions {
//           text-align: right;
//         }

//         .admin-payments-form-submit {
//           padding: 12px 24px;
//           background: linear-gradient(135deg, #48bb78, #38a169);
//           color: white;
//           border: none;
//           border-radius: 10px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }

//         .admin-payments-form-submit:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 6px 16px rgba(72, 187, 120, 0.3);
//         }

//         .admin-payments-form-submit:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//         }

//         /* Spinners */
//         @keyframes admin-payments-spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }

//         .admin-payments-spinner {
//           width: 20px;
//           height: 20px;
//           border: 2px solid rgba(255, 255, 255, 0.3);
//           border-top: 2px solid white;
//           border-radius: 50%;
//           animation: admin-payments-spin 1s linear infinite;
//         }

//         .admin-payments-spinner-small {
//           width: 16px;
//           height: 16px;
//           border: 2px solid rgba(255, 255, 255, 0.3);
//           border-top: 2px solid white;
//           border-radius: 50%;
//           animation: admin-payments-spin 1s linear infinite;
//         }

//         /* Modal */
//         .admin-payments-modal {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           z-index: 1000;
//         }

//         .admin-payments-modal-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: rgba(0, 0, 0, 0.7);
//           backdrop-filter: blur(8px);
//           animation: admin-payments-fade-in 0.3s ease;
//         }

//         @keyframes admin-payments-fade-in {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }

//         .admin-payments-modal-content {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           background: white;
//           border-radius: 20px;
//           width: 90%;
//           max-width: 1000px;
//           max-height: 80vh;
//           overflow-y: auto;
//           box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
//           animation: admin-payments-modal-slide 0.4s ease;
//         }

//         @keyframes admin-payments-modal-slide {
//           from {
//             opacity: 0;
//             transform: translate(-50%, -40%);
//           }
//           to {
//             opacity: 1;
//             transform: translate(-50%, -50%);
//           }
//         }

//         .admin-payments-modal-header {
//           padding: 24px 32px;
//           background: linear-gradient(135deg, #667eea, #764ba2);
//           color: white;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           border-radius: 20px 20px 0 0;
//         }

//         .admin-payments-modal-title {
//           font-size: 24px;
//           font-weight: 700;
//           margin: 0;
//         }

//         .admin-payments-modal-close {
//           background: rgba(255, 255, 255, 0.2);
//           color: white;
//           border: none;
//           width: 40px;
//           height: 40px;
//           border-radius: 50%;
//           font-size: 24px;
//           cursor: pointer;
//           transition: background 0.3s ease;
//         }

//         .admin-payments-modal-close:hover {
//           background: rgba(255, 255, 255, 0.3);
//         }

//         .admin-payments-modal-body {
//           padding: 32px;
//         }

//         .admin-payments-modal-empty {
//           text-align: center;
//           padding: 60px 20px;
//           color: #a0aec0;
//         }

//         .admin-payments-modal-empty-icon {
//           font-size: 64px;
//           margin-bottom: 20px;
//           opacity: 0.5;
//         }

//         .admin-payments-modal-empty h3 {
//           font-size: 24px;
//           color: #718096;
//           margin-bottom: 8px;
//         }

//         /* History Table */
//         .admin-payments-history-table-container {
//           overflow-x: auto;
//         }

//         .admin-payments-history-table {
//           width: 100%;
//           border-collapse: collapse;
//         }

//         .admin-payments-history-table th {
//           padding: 16px 20px;
//           background: #f7fafc;
//           color: #4a5568;
//           font-weight: 600;
//           text-align: left;
//           font-size: 14px;
//           border-bottom: 2px solid #e2e8f0;
//         }

//         .admin-payments-history-table td {
//           padding: 16px 20px;
//           color: #4a5568;
//           border-bottom: 1px solid #f1f5f9;
//         }

//         .admin-payments-history-date {
//           font-family: monospace;
//           font-size: 14px;
//           color: #718096;
//         }

//         .admin-payments-amount-badge {
//           background: rgba(72, 187, 120, 0.1);
//           color: #38a169;
//           padding: 6px 12px;
//           border-radius: 20px;
//           font-weight: 600;
//         }

//         .admin-payments-mode-badge {
//           padding: 6px 12px;
//           border-radius: 20px;
//           font-size: 12px;
//           font-weight: 600;
//           display: inline-block;
//         }

//         .admin-payments-mode-cash {
//           background: rgba(102, 126, 234, 0.1);
//           color: #667eea;
//         }

//         .admin-payments-mode-online {
//           background: rgba(72, 187, 120, 0.1);
//           color: #38a169;
//         }

//         .admin-payments-mode-cheque {
//           background: rgba(245, 158, 11, 0.1);
//           color: #d69e2e;
//         }

//         .admin-payments-mode-bank_transfer {
//           background: rgba(159, 122, 234, 0.1);
//           color: #805ad5;
//         }

//         .admin-payments-history-transaction {
//           font-family: monospace;
//           font-size: 14px;
//           color: #2d3748;
//         }

//         .admin-payments-receipt-link {
//           color: #667eea;
//           text-decoration: none;
//           font-weight: 600;
//           transition: color 0.3s;
//         }

//         .admin-payments-receipt-link:hover {
//           color: #764ba2;
//         }

//         .admin-payments-no-receipt {
//           color: #a0aec0;
//           font-style: italic;
//         }

//         .admin-payments-modal-footer {
//           padding: 20px 32px;
//           border-top: 2px solid #f1f5f9;
//           text-align: right;
//         }

//         .admin-payments-modal-close-btn {
//           padding: 12px 24px;
//           background: #667eea;
//           color: white;
//           border: none;
//           border-radius: 10px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s;
//         }

//         .admin-payments-modal-close-btn:hover {
//           background: #764ba2;
//           transform: translateY(-2px);
//         }

//         /* Global Loading */
//         .admin-payments-global-loading {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: rgba(0, 0, 0, 0.8);
//           backdrop-filter: blur(4px);
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           z-index: 2000;
//           color: white;
//         }

//         .admin-payments-global-spinner {
//           width: 60px;
//           height: 60px;
//           border: 4px solid rgba(255, 255, 255, 0.3);
//           border-top: 4px solid white;
//           border-radius: 50%;
//           animation: admin-payments-spin 1s linear infinite;
//           margin-bottom: 20px;
//         }

//         /* Responsive Design */
//         @media (max-width: 1024px) {
//           .admin-payments-container {
//             padding: 16px;
//           }

//           .admin-payments-title {
//             font-size: 28px;
//           }

//           .admin-payments-filters-grid {
//             grid-template-columns: 1fr;
//           }

//           .admin-payments-search-grid {
//             grid-template-columns: 1fr;
//           }

//           .admin-payments-table {
//             display: block;
//             overflow-x: auto;
//           }

//           .admin-payments-modal-content {
//             width: 95%;
//             max-height: 90vh;
//           }
//         }

//         @media (max-width: 768px) {
//           .admin-payments-student-info {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 12px;
//           }

//           .admin-payments-student-avatar {
//             margin-right: 0;
//           }

//           .admin-payments-action-buttons {
//             flex-direction: column;
//           }

//           .admin-payments-form-grid {
//             grid-template-columns: 1fr;
//           }

//           .admin-payments-history-table {
//             display: block;
//             overflow-x: auto;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPaymentsMark() {
  const [collegeOptions, setCollegeOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [programOptions, setProgramOptions] = useState([]);
  const [technologyOptions, setTechnologyOptions] = useState([]);

  const [filters, setFilters] = useState({
    collegeName: "",
    batch: "",
    programName: "",
    technology: "",
  });

  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const token = localStorage.getItem("token");

  const [searchEmail, setSearchEmail] = useState("");
  const [searchUsn, setSearchUsn] = useState("");
  const [searchGroup, setSearchGroup] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // PAYMENT MODAL STATES
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentPaymentData, setCurrentPaymentData] = useState({
    groupId: "",
    studentId: "",
    studentName: "",
    pendingAmount: 0,
  });
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    paymentMode: "",
    transactionId: "",
    remark: "",
    receiptFile: null,
    receiptPreview: null,
  });

  // HISTORY MODAL STATES
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyStudent, setHistoryStudent] = useState(null);
  const [historyData, setHistoryData] = useState([]);

  // ---------------------------- FETCH OPTIONS ----------------------------
  useEffect(() => {
    axios
      .get("https://ligand-dev-7.onrender.com/api/options/collegeName")
      .then((res) => setCollegeOptions(res.data || []))
      .catch(() => setCollegeOptions([]));
  }, []);

  useEffect(() => {
    if (!filters.collegeName) return setBatchOptions([]);

    axios
      .get("https://ligand-dev-7.onrender.com/api/attendance/options/batches", {
        params: { collegeName: filters.collegeName },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBatchOptions(res.data || []))
      .catch(() => setBatchOptions([]));
  }, [filters.collegeName]);

  useEffect(() => {
    if (!filters.collegeName || !filters.batch) return setProgramOptions([]);

    axios
      .get("https://ligand-dev-7.onrender.com/api/attendance/options/programs", {
        params: {
          collegeName: filters.collegeName,
          batch: filters.batch,
        },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProgramOptions(res.data || []))
      .catch(() => setProgramOptions([]));
  }, [filters.collegeName, filters.batch]);

  useEffect(() => {
    if (!filters.collegeName || !filters.batch || !filters.programName)
      return setTechnologyOptions([]);

    axios
      .get("https://ligand-dev-7.onrender.com/api/attendance/options/technologies", {
        params: {
          collegeName: filters.collegeName,
          batch: filters.batch,
          programName: filters.programName,
        },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTechnologyOptions(res.data || []))
      .catch(() => setTechnologyOptions([]));
  }, [filters.collegeName, filters.batch, filters.programName]);

  // ---------------------------- MAP API RESPONSE ----------------------------
  const mapApiResponseToRows = (apiData) => {
    const rows = [];
    apiData.forEach((group) => {
      group.students.forEach((s) => {
        const student = s.student || {
          _id: "unknown",
          name: "Unknown",
          usn: "N/A",
          email: "",
        };

        rows.push({
          groupId: group._id,
          groupName: group.name,
          student,
          totalFee: s.totalFee,
          paidFee: s.paidFee,
          currentFee: s.currentFee,
          pending: s.totalFee - s.paidFee,
          status: s.status,
        });
      });
    });

    return rows;
  };

  // ---------------------------- FETCH STUDENTS ----------------------------
  const fetchRows = async () => {
    if (
      !filters.collegeName ||
      !filters.batch ||
      !filters.programName ||
      !filters.technology
    ) {
      alert("Please select all filters before loading data!");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(
        "https://ligand-dev-7.onrender.com/api/fee-groups/students",
        {
          params: filters,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const mapped = mapApiResponseToRows(res.data);
      setRows(mapped);
      setFilteredRows(mapped);
    } catch (err) {
      alert("Error loading data");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------- OPEN PAYMENT MODAL ----------------------------
  const openPaymentModal = (row) => {
    setCurrentPaymentData({
      groupId: row.groupId,
      studentId: row.student._id,
      studentName: row.student.name,
      pendingAmount: row.pending,
    });
    
    setPaymentForm({
      amount: row.pending > 0 ? row.pending : "",
      paymentMode: "",
      transactionId: "",
      remark: "",
      receiptFile: null,
      receiptPreview: null,
    });
    
    setShowPaymentModal(true);
  };

  // ---------------------------- HANDLE PAYMENT FORM ----------------------------
  const handlePaymentFormChange = (field, value) => {
    setPaymentForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentForm((prev) => ({
          ...prev,
          receiptFile: file,
          receiptPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeReceipt = () => {
    setPaymentForm((prev) => ({
      ...prev,
      receiptFile: null,
      receiptPreview: null,
    }));
  };

  // ---------------------------- SUBMIT PAYMENT ----------------------------
  const submitPayment = async () => {
    const { amount, paymentMode, remark, transactionId, receiptFile } = paymentForm;
    const { groupId, studentId, pendingAmount } = currentPaymentData;

    if (!amount || amount <= 0) {
      alert("Please enter a valid payment amount");
      return;
    }

    if (amount > pendingAmount) {
      alert(`Amount cannot exceed pending amount: ₹${pendingAmount}`);
      return;
    }

    if (paymentMode === "online" && !transactionId) {
      alert("Please enter transaction ID for online payments");
      return;
    }

    const form = new FormData();
    form.append("amount", amount);
    form.append("paymentMode", paymentMode);
    form.append("remark", remark || "");
    form.append("transactionId", transactionId || "");

    if (receiptFile) form.append("receipt", receiptFile);

    try {
      setActionLoading(true);

      await axios.post(
        `https://ligand-dev-7.onrender.com/api/fee-groups/${groupId}/students/${studentId}/payment`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Close modal and refresh data
      setShowPaymentModal(false);
      fetchRows();
      
      // Reset form
      setPaymentForm({
        amount: "",
        paymentMode: "",
        transactionId: "",
        remark: "",
        receiptFile: null,
        receiptPreview: null,
      });
      
    } catch (err) {
      alert(err.response?.data?.error || "Payment failed");
    } finally {
      setActionLoading(false);
    }
  };

  // ---------------------------- FILTER SEARCH ----------------------------
  useEffect(() => {
    let out = rows;

    if (statusFilter === "paid") out = out.filter((r) => r.status === "Paid");
    if (statusFilter === "unpaid") out = out.filter((r) => r.status !== "Paid");

    if (searchEmail)
      out = out.filter((r) =>
        (r.student?.email || "")
          .toLowerCase()
          .includes(searchEmail.toLowerCase())
      );

    if (searchUsn)
      out = out.filter((r) =>
        (r.student?.usn || "").toLowerCase().includes(searchUsn.toLowerCase())
      );

    if (searchGroup)
      out = out.filter((r) =>
        r.groupName.toLowerCase().includes(searchGroup.toLowerCase())
      );

    setFilteredRows(out);
  }, [searchEmail, searchUsn, searchGroup, statusFilter, rows]);

  // ---------------------------- OPEN HISTORY MODAL ----------------------------
  const openHistoryModal = async (groupId, studentId, studentName) => {
    try {
      const res = await axios.get(
        `https://ligand-dev-7.onrender.com/api/fee-groups/${groupId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const studentEntry = res.data.students.find(
        (s) => String(s.student._id) === String(studentId)
      );

      if (!studentEntry) {
        alert("No payment history found for this student!");
        return;
      }

      setHistoryStudent(studentName);
      setHistoryData(studentEntry.paymentHistory || []);
      setShowHistoryModal(true);
    } catch (err) {
      console.error("Error fetching payment history:", err);
      alert("Failed to load payment history");
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  // ---------------------------- RENDER ----------------------------
  return (
    <div className="admin-payments-container">
      {/* Header */}
      <header className="admin-payments-header">
        <div className="admin-payments-header-content">
          <div className="admin-payments-header-icon">💰</div>
          <div>
            <h1 className="admin-payments-title">Fee Management System</h1>
            <p className="admin-payments-subtitle">Manage student payments and track fee status</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="admin-payments-main">
        {/* Filters Section */}
        <div className="admin-payments-filters-card">
          <h2 className="admin-payments-section-title">
            <span className="admin-payments-section-icon">🔍</span>
            Filter Students
          </h2>
          <div className="admin-payments-filters-grid">
            {[
              { label: "College", value: filters.collegeName, options: collegeOptions, onChange: (e) => setFilters({ ...filters, collegeName: e.target.value }) },
              { label: "Batch", value: filters.batch, options: batchOptions, onChange: (e) => setFilters({ ...filters, batch: e.target.value }) },
              { label: "Program", value: filters.programName, options: programOptions, onChange: (e) => setFilters({ ...filters, programName: e.target.value }) },
              { label: "Technology", value: filters.technology, options: technologyOptions, onChange: (e) => setFilters({ ...filters, technology: e.target.value }) },
            ].map((filter, idx) => (
              <div className="admin-payments-filter-group" key={idx}>
                <label className="admin-payments-filter-label">{filter.label}</label>
                <div className="admin-payments-select-wrapper">
                  <select
                    className="admin-payments-filter-select"
                    value={filter.value}
                    onChange={filter.onChange}
                  >
                    <option value="">Select {filter.label}</option>
                    {filter.options.map((opt) => (
                      <option key={opt._id || opt} value={opt.value || opt}>
                        {opt.value || opt}
                      </option>
                    ))}
                  </select>
                  <div className="admin-payments-select-arrow">▼</div>
                </div>
              </div>
            ))}

            <div className="admin-payments-filter-actions">
              <button 
                className="admin-payments-load-btn"
                onClick={fetchRows}
                disabled={loading}
              >
                <span className="admin-payments-btn-icon">{loading ? "⏳" : "📥"}</span>
                {loading ? "Loading..." : "Load Students"}
              </button>
              <button 
                className="admin-payments-clear-btn"
                onClick={() => {
                  setFilters({
                    collegeName: "",
                    batch: "",
                    programName: "",
                    technology: "",
                  });
                  setRows([]);
                  setFilteredRows([]);
                }}
              >
                <span className="admin-payments-btn-icon">🔄</span>
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Search and Status Filters */}
        <div className="admin-payments-search-card">
          <h3 className="admin-payments-search-title">
            <span className="admin-payments-search-icon">🔍</span>
            Search & Filter
          </h3>
          <div className="admin-payments-search-grid">
            {[
              { icon: "📧", placeholder: "Search by email...", value: searchEmail, onChange: setSearchEmail },
              { icon: "🎓", placeholder: "Search by USN...", value: searchUsn, onChange: setSearchUsn },
              { icon: "🏷️", placeholder: "Search by group name...", value: searchGroup, onChange: setSearchGroup },
            ].map((search, idx) => (
              <div className="admin-payments-search-group" key={idx}>
                <div className="admin-payments-search-icon-wrapper">{search.icon}</div>
                <input
                  className="admin-payments-search-input"
                  placeholder={search.placeholder}
                  value={search.value}
                  onChange={(e) => search.onChange(e.target.value)}
                />
              </div>
            ))}

            <div className="admin-payments-search-group">
              <div className="admin-payments-search-icon-wrapper">📊</div>
              <select
                className="admin-payments-status-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="paid">✅ Paid Only</option>
                <option value="unpaid">❌ Unpaid Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        {rows.length > 0 && (
          <div className="admin-payments-summary">
            {[
              { label: "Total Students", value: rows.length, color: "#667eea" },
              { label: "Filtered", value: filteredRows.length, color: "#764ba2" },
              { label: "Total Fees", value: formatCurrency(rows.reduce((sum, r) => sum + (r.totalFee || 0), 0)), color: "#48bb78" },
              { label: "Collected", value: formatCurrency(rows.reduce((sum, r) => sum + (r.paidFee || 0), 0)), color: "#38a169" },
              { label: "Pending", value: formatCurrency(rows.reduce((sum, r) => sum + (r.pending || 0), 0)), color: "#f56565" },
            ].map((item, idx) => (
              <div className="admin-payments-summary-item" key={idx} style={{ borderLeftColor: item.color }}>
                <div className="admin-payments-summary-label">{item.label}</div>
                <div className="admin-payments-summary-value" style={{ color: item.color }}>{item.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Table */}
        <div className="admin-payments-table-container">
          {loading ? (
            <div className="admin-payments-loading">
              <div className="admin-payments-loading-spinner"></div>
              <p>Loading student data...</p>
            </div>
          ) : filteredRows.length === 0 ? (
            <div className="admin-payments-empty">
              <div className="admin-payments-empty-icon">📋</div>
              <h3>No students found</h3>
              <p>Select filters and load data to view students</p>
            </div>
          ) : (
            <table className="admin-payments-table">
              <thead>
                <tr>
                  <th>Student Details</th>
                  <th>Group</th>
                  <th>Total Fee</th>
                  <th>Paid</th>
                  <th>Pending</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredRows.map((r) => {
                  const isPaid = r.status === "Paid";
                  const paymentProgress = r.totalFee > 0 ? (r.paidFee / r.totalFee) * 100 : 0;

                  return (
                    <tr key={`${r.groupId}_${r.student?._id}`} className={isPaid ? "admin-payments-row-paid" : "admin-payments-row-pending"}>
                      <td className="admin-payments-cell-student">
                        <div className="admin-payments-student-avatar">
                          {r.student.name?.charAt(0).toUpperCase() || "?"}
                        </div>
                        <div className="admin-payments-student-info">
                          <div className="admin-payments-student-name">{r.student.name}</div>
                          <div className="admin-payments-student-details">
                            <span className="admin-payments-student-usn">{r.student.usn}</span>
                            <span className="admin-payments-student-email">{r.student.email}</span>
                          </div>
                        </div>
                      </td>

                      <td className="admin-payments-cell-group">
                        <div className="admin-payments-group-badge">{r.groupName}</div>
                      </td>

                      <td className="admin-payments-cell-fee">
                        <div className="admin-payments-fee-amount">{formatCurrency(r.totalFee)}</div>
                      </td>

                      <td className="admin-payments-cell-paid">
                        <div className="admin-payments-fee-progress">
                          <div className="admin-payments-progress-header">
                            <span className="admin-payments-progress-label">Progress</span>
                            <span className="admin-payments-progress-percentage">{Math.round(paymentProgress)}%</span>
                          </div>
                          <div className="admin-payments-fee-progress-bar">
                            <div 
                              className="admin-payments-fee-progress-fill"
                              style={{ width: `${paymentProgress}%` }}
                            ></div>
                          </div>
                          <div className="admin-payments-fee-paid">{formatCurrency(r.paidFee)}</div>
                        </div>
                      </td>

                      <td className="admin-payments-cell-pending">
                        <div className={`admin-payments-pending-amount ${r.pending > 0 ? 'admin-payments-pending-high' : ''}`}>
                          {formatCurrency(r.pending)}
                        </div>
                      </td>

                      <td className="admin-payments-cell-status">
                        <span className={`admin-payments-status-badge ${isPaid ? 'admin-payments-status-paid' : 'admin-payments-status-unpaid'}`}>
                          {isPaid ? '✅ Paid' : '❌ Pending'}
                        </span>
                      </td>

                      <td className="admin-payments-cell-actions">
                        <div className="admin-payments-action-buttons">
                          <button 
                            className="admin-payments-action-history"
                            onClick={() => openHistoryModal(r.groupId, r.student._id, r.student.name)}
                          >
                            <span className="admin-payments-action-icon">📜</span>
                            History
                          </button>
                          
                          {!isPaid && r.pending > 0 && (
                            <button 
                              className="admin-payments-action-pay"
                              onClick={() => openPaymentModal(r)}
                            >
                              <span className="admin-payments-action-icon">💳</span>
                              Add Payment
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="admin-payments-modal">
          <div className="admin-payments-modal-overlay" onClick={() => !actionLoading && setShowPaymentModal(false)}></div>
          <div className="admin-payments-modal-content">
            <div className="admin-payments-modal-header">
              <div className="admin-payments-modal-header-content">
                <h2 className="admin-payments-modal-title">
                  <span className="admin-payments-modal-icon">💳</span>
                  Record Payment
                </h2>
                <p className="admin-payments-modal-subtitle">For {currentPaymentData.studentName}</p>
              </div>
              <button 
                className="admin-payments-modal-close"
                onClick={() => !actionLoading && setShowPaymentModal(false)}
                disabled={actionLoading}
              >
                ×
              </button>
            </div>

            <div className="admin-payments-modal-body">
              <div className="admin-payments-payment-form">
                <div className="admin-payments-payment-summary">
                  <div className="admin-payments-payment-summary-item">
                    <span className="admin-payments-payment-summary-label">Pending Amount</span>
                    <span className="admin-payments-payment-summary-value admin-payments-payment-pending">
                      {formatCurrency(currentPaymentData.pendingAmount)}
                    </span>
                  </div>
                </div>

                <div className="admin-payments-form-grid">
                  <div className="admin-payments-form-group">
                    <label className="admin-payments-form-label">
                      <span className="admin-payments-form-label-icon">₹</span>
                      Amount
                    </label>
                    <input
                      type="number"
                      className="admin-payments-form-input"
                      placeholder="Enter payment amount"
                      value={paymentForm.amount}
                      onChange={(e) => handlePaymentFormChange("amount", e.target.value)}
                      min="1"
                      max={currentPaymentData.pendingAmount}
                      disabled={actionLoading}
                    />
                    <div className="admin-payments-form-hint">
                      Maximum: {formatCurrency(currentPaymentData.pendingAmount)}
                    </div>
                  </div>

                  <div className="admin-payments-form-group">
                    <label className="admin-payments-form-label">
                      <span className="admin-payments-form-label-icon">💳</span>
                      Payment Mode
                    </label>
                    <div className="admin-payments-select-wrapper">
                      <select
                        className="admin-payments-form-select"
                        value={paymentForm.paymentMode}
                        onChange={(e) => handlePaymentFormChange("paymentMode", e.target.value)}
                        disabled={actionLoading}
                      >
                        <option value="">Select Payment Mode</option>
                        <option value="cash">💵 Cash</option>
                        <option value="online">🌐 Online</option>
                        <option value="cheque">🏦 Cheque</option>
                        <option value="bank_transfer">🏛️ Bank Transfer</option>
                      </select>
                      <div className="admin-payments-select-arrow">▼</div>
                    </div>
                  </div>

                  {paymentForm.paymentMode === "online" && (
                    <>
                      <div className="admin-payments-form-group">
                        <label className="admin-payments-form-label">
                          <span className="admin-payments-form-label-icon">🔢</span>
                          Transaction ID
                        </label>
                        <input
                          className="admin-payments-form-input"
                          placeholder="Enter transaction ID"
                          value={paymentForm.transactionId}
                          onChange={(e) => handlePaymentFormChange("transactionId", e.target.value)}
                          disabled={actionLoading}
                        />
                        <div className="admin-payments-form-hint">
                          Required for online payments
                        </div>
                      </div>

                      <div className="admin-payments-form-group">
                        <label className="admin-payments-form-label">
                          <span className="admin-payments-form-label-icon">📎</span>
                          Receipt Upload
                        </label>
                        <div className="admin-payments-file-upload-area">
                          <input
                            type="file"
                            id="receipt-upload"
                            className="admin-payments-file-input"
                            onChange={handleFileUpload}
                            accept="image/*,.pdf,.doc,.docx"
                            disabled={actionLoading}
                          />
                          
                          {paymentForm.receiptPreview ? (
                            <div className="admin-payments-file-preview">
                              <div className="admin-payments-file-preview-content">
                                {paymentForm.receiptPreview.startsWith('data:image') ? (
                                  <img 
                                    src={paymentForm.receiptPreview} 
                                    alt="Receipt preview" 
                                    className="admin-payments-file-preview-image"
                                  />
                                ) : (
                                  <div className="admin-payments-file-preview-icon">📄</div>
                                )}
                                <div className="admin-payments-file-preview-info">
                                  <div className="admin-payments-file-preview-name">{paymentForm.receiptFile.name}</div>
                                  <div className="admin-payments-file-preview-size">
                                    {(paymentForm.receiptFile.size / 1024).toFixed(2)} KB
                                  </div>
                                </div>
                              </div>
                              <button 
                                type="button"
                                className="admin-payments-file-remove"
                                onClick={removeReceipt}
                                disabled={actionLoading}
                              >
                                🗑️
                              </button>
                            </div>
                          ) : (
                            <label htmlFor="receipt-upload" className="admin-payments-file-upload-label">
                              <div className="admin-payments-file-upload-icon">📎</div>
                              <div className="admin-payments-file-upload-text">
                                <div className="admin-payments-file-upload-title">Upload Receipt</div>
                                <div className="admin-payments-file-upload-subtitle">Click to browse or drag & drop</div>
                                <div className="admin-payments-file-upload-hint">Supports: JPG, PNG, PDF, DOC (Max 5MB)</div>
                              </div>
                            </label>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="admin-payments-form-group admin-payments-form-full">
                    <label className="admin-payments-form-label">
                      <span className="admin-payments-form-label-icon">📝</span>
                      Remarks
                    </label>
                    <textarea
                      className="admin-payments-form-textarea"
                      placeholder="Add any remarks or notes about this payment..."
                      value={paymentForm.remark}
                      onChange={(e) => handlePaymentFormChange("remark", e.target.value)}
                      rows="3"
                      disabled={actionLoading}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="admin-payments-modal-footer">
              <button 
                className="admin-payments-modal-cancel"
                onClick={() => setShowPaymentModal(false)}
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                className="admin-payments-modal-submit"
                onClick={submitPayment}
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <>
                    <span className="admin-payments-spinner-small"></span>
                    Processing...
                  </>
                ) : (
                  '✅ Submit Payment'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && (
        <div className="admin-payments-modal">
          <div className="admin-payments-modal-overlay" onClick={() => setShowHistoryModal(false)}></div>
          <div className="admin-payments-modal-content">
            <div className="admin-payments-modal-header">
              <div className="admin-payments-modal-header-content">
                <h2 className="admin-payments-modal-title">
                  <span className="admin-payments-modal-icon">📜</span>
                  Payment History - {historyStudent}
                </h2>
              </div>
              <button 
                className="admin-payments-modal-close"
                onClick={() => setShowHistoryModal(false)}
              >
                ×
              </button>
            </div>

            <div className="admin-payments-modal-body">
              {historyData.length === 0 ? (
                <div className="admin-payments-modal-empty">
                  <div className="admin-payments-modal-empty-icon">📭</div>
                  <h3>No Payment History</h3>
                  <p>This student has no payment records yet.</p>
                </div>
              ) : (
                <div className="admin-payments-history-container">
                  <table className="admin-payments-history-table">
                    <thead>
                      <tr>
                        <th>Date & Time</th>
                        <th>Amount</th>
                        <th>Payment Mode</th>
                        <th>Transaction ID</th>
                        <th>Remarks</th>
                        <th>Receipt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historyData.map((h, i) => (
                        <tr key={i}>
                          <td className="admin-payments-history-date">
                            {h.paidOn ? new Date(h.paidOn).toLocaleString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            }) : 'N/A'}
                          </td>
                          <td className="admin-payments-history-amount">
                            <span className="admin-payments-amount-badge">
                              {formatCurrency(h.amount)}
                            </span>
                          </td>
                          <td className="admin-payments-history-mode">
                            <span className={`admin-payments-mode-badge admin-payments-mode-${h.paymentMode}`}>
                              {h.paymentMode}
                            </span>
                          </td>
                          <td className="admin-payments-history-transaction">
                            <code className="admin-payments-transaction-id">
                              {h.transactionId || "N/A"}
                            </code>
                          </td>
                          <td className="admin-payments-history-remarks">
                            {h.remark || "-"}
                          </td>
                          <td className="admin-payments-history-receipt">
                            {h.receipt ? (
                              <a
                                href={`https://ligand-dev-7.onrender.com/uploads/receipts/${h.receipt}`}
                                target="_blank"
                                rel="noreferrer"
                                className="admin-payments-receipt-link"
                              >
                                <span className="admin-payments-receipt-icon">📄</span>
                                View
                              </a>
                            ) : (
                              <span className="admin-payments-no-receipt">No File</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="admin-payments-modal-footer">
              <button 
                className="admin-payments-modal-close-btn"
                onClick={() => setShowHistoryModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Loading Overlay */}
      {actionLoading && (
        <div className="admin-payments-global-loading">
          <div className="admin-payments-global-spinner"></div>
          <p>Processing payment, please wait...</p>
        </div>
      )}

      {/* Internal CSS */}
      <style jsx>{`
        /* Enhanced CSS Styles */
        .admin-payments-container {
          min-height: 100vh;
         
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .admin-payments-header {
          margin-bottom: 30px;
          color: black;
        }

        .admin-payments-header-content {
          display: flex;
          align-items: center;
          gap: 20px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 25px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .admin-payments-header-icon {
          font-size: 48px;
          background: white;
          width: 80px;
          height: 80px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #667eea;
        }

        .admin-payments-title {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 8px;
          color: #667eea;
        }

        .admin-payments-subtitle {
          color: rgba(0, 0, 0, 0.9);
          font-size: 16px;
        }

        .admin-payments-main {
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Cards */
        .admin-payments-filters-card,
        .admin-payments-search-card,
        .admin-payments-table-container {
          background: white;
          border-radius: 20px;
          padding: 30px;
          margin-bottom: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(10px);
        }

        /* Section Titles */
        .admin-payments-section-title,
        .admin-payments-search-title {
          font-size: 20px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .admin-payments-section-icon,
        .admin-payments-search-icon {
          font-size: 24px;
        }

        /* Filters Grid */
        .admin-payments-filters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
          align-items: end;
        }

        .admin-payments-filter-group {
          position: relative;
        }

        .admin-payments-filter-label {
          color: #4a5568;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 10px;
          display: block;
        }

        .admin-payments-select-wrapper {
          position: relative;
        }

        .admin-payments-filter-select,
        .admin-payments-form-select {
          width: 100%;
          padding: 16px 20px;
          border: 2px solid #e2e8f0;
          border-radius: 15px;
          font-size: 16px;
          background: white;
          cursor: pointer;
          transition: all 0.3s;
          appearance: none;
          padding-right: 50px;
          font-weight: 500;
        }

        .admin-payments-filter-select:focus,
        .admin-payments-form-select:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15);
        }

        .admin-payments-select-arrow {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #718096;
          pointer-events: none;
          font-size: 12px;
        }

        /* Buttons */
        .admin-payments-filter-actions {
          display: flex;
          gap: 15px;
          grid-column: 1 / -1;
        }

        .admin-payments-load-btn,
        .admin-payments-clear-btn {
          padding: 16px 32px;
          border-radius: 15px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 12px;
          border: none;
        }

        .admin-payments-load-btn {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          flex: 1;
        }

        .admin-payments-load-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(102, 126, 234, 0.4);
        }

        .admin-payments-load-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .admin-payments-clear-btn {
          background: white;
          color: #4a5568;
          border: 2px solid #e2e8f0;
          flex: 1;
        }

        .admin-payments-clear-btn:hover {
          background: #f7fafc;
          border-color: #cbd5e0;
          transform: translateY(-2px);
        }

        .admin-payments-btn-icon {
          font-size: 20px;
        }

        /* Search Grid */
        .admin-payments-search-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .admin-payments-search-group {
          position: relative;
        }

        .admin-payments-search-icon-wrapper {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #718096;
          font-size: 20px;
        }

        .admin-payments-search-input,
        .admin-payments-status-select {
          width: 100%;
          padding: 16px 20px 16px 55px;
          border: 2px solid #e2e8f0;
          border-radius: 15px;
          font-size: 16px;
          transition: all 0.3s;
          background: #f8fafc;
          font-weight: 500;
        }

        .admin-payments-search-input:focus,
        .admin-payments-status-select:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15);
        }

        .admin-payments-status-select {
          padding-left: 55px;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234a5568' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 20px center;
          background-size: 16px;
          padding-right: 50px;
        }

        /* Summary */
        .admin-payments-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }

        .admin-payments-summary-item {
          background: white;
          border-radius: 15px;
          padding: 25px;
          border-left: 5px solid;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s;
        }

        .admin-payments-summary-item:hover {
          transform: translateY(-5px);
        }

        .admin-payments-summary-label {
          color: #718096;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 10px;
          display: block;
        }

        .admin-payments-summary-value {
          font-size: 28px;
          font-weight: 800;
        }

        /* Table */
        .admin-payments-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 10px;
        }

        .admin-payments-table thead {
          background: linear-gradient(135deg, #667eea, #764ba2);
        }

        .admin-payments-table th {
          padding: 20px;
          color: white;
          font-weight: 600;
          text-align: left;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .admin-payments-table th:first-child {
          border-radius: 15px 0 0 15px;
        }

        .admin-payments-table th:last-child {
          border-radius: 0 15px 15px 0;
        }

        .admin-payments-table tbody tr {
          background: white;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          transition: all 0.3s;
        }

        .admin-payments-table tbody tr:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }

        .admin-payments-table td {
          padding: 25px 20px;
          border-bottom: 2px solid #f7fafc;
        }

        .admin-payments-table td:first-child {
          border-radius: 15px 0 0 15px;
        }

        .admin-payments-table td:last-child {
          border-radius: 0 15px 15px 0;
        }

        /* Student Cell */
        .admin-payments-cell-student {
          min-width: 300px;
        }

        .admin-payments-student-avatar {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
          margin-right: 20px;
          float: left;
        }

        .admin-payments-student-info {
          overflow: hidden;
        }

        .admin-payments-student-name {
          font-weight: 700;
          color: #2d3748;
          font-size: 18px;
          margin-bottom: 8px;
        }

        .admin-payments-student-details {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .admin-payments-student-usn {
          color: #667eea;
          font-weight: 600;
          font-size: 14px;
        }

        .admin-payments-student-email {
          color: #718096;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Group Badge */
        .admin-payments-group-badge {
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
          padding: 10px 20px;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 600;
          display: inline-block;
          border: 2px solid rgba(102, 126, 234, 0.2);
        }

        /* Progress Bar */
        .admin-payments-progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .admin-payments-progress-label {
          color: #718096;
          font-size: 14px;
          font-weight: 500;
        }

        .admin-payments-progress-percentage {
          color: #48bb78;
          font-weight: 700;
          font-size: 16px;
        }

        .admin-payments-fee-progress-bar {
          height: 10px;
          background: #e2e8f0;
          border-radius: 5px;
          overflow: hidden;
          margin-bottom: 10px;
        }

        .admin-payments-fee-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #48bb78, #38a169);
          border-radius: 5px;
          transition: width 0.6s ease;
        }

        /* Status Badge */
        .admin-payments-status-badge {
          padding: 10px 20px;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 600;
          display: inline-block;
          min-width: 100px;
          text-align: center;
        }

        .admin-payments-status-paid {
          background: rgba(72, 187, 120, 0.1);
          color: #38a169;
          border: 2px solid rgba(72, 187, 120, 0.2);
        }

        .admin-payments-status-unpaid {
          background: rgba(245, 101, 101, 0.1);
          color: #e53e3e;
          border: 2px solid rgba(245, 101, 101, 0.2);
        }

        /* Action Buttons */
        .admin-payments-action-buttons {
          display: flex;
          gap: 12px;
        }

        .admin-payments-action-history,
        .admin-payments-action-pay {
          padding: 12px 20px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 10px;
          border: none;
        }

        .admin-payments-action-history {
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
          border: 2px solid rgba(102, 126, 234, 0.2);
        }

        .admin-payments-action-history:hover {
          background: rgba(102, 126, 234, 0.2);
          transform: translateY(-2px);
        }

        .admin-payments-action-pay {
          background: linear-gradient(135deg, #48bb78, #38a169);
          color: white;
        }

        .admin-payments-action-pay:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(72, 187, 120, 0.3);
        }

        .admin-payments-action-icon {
          font-size: 16px;
        }

        /* Modals */
        .admin-payments-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .admin-payments-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          animation: admin-payments-fade-in 0.3s ease;
        }

        @keyframes admin-payments-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .admin-payments-modal-content {
          position: relative;
          background: white;
          
          
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
          animation: admin-payments-modal-slide-up 0.4s ease;
          z-index: 10001;
        }

        @keyframes admin-payments-modal-slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .admin-payments-modal-header {
          padding: 30px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .admin-payments-modal-header-content {
          flex: 1;
        }

        .admin-payments-modal-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .admin-payments-modal-subtitle {
          color: rgba(255, 255, 255, 0.9);
          font-size: 16px;
        }

        .admin-payments-modal-icon {
          font-size: 28px;
        }

        .admin-payments-modal-close {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
          transition: background 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .admin-payments-modal-close:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.3);
        }

        .admin-payments-modal-close:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .admin-payments-modal-body {
          padding: 30px;
        }

        /* Payment Form in Modal */
        .admin-payments-payment-form {
          background: #f8fafc;
          border-radius: 15px;
          padding: 30px;
          border: 2px solid #e2e8f0;
        }

        .admin-payments-payment-summary {
          background: white;
          border-radius: 15px;
          padding: 20px;
          margin-bottom: 30px;
          border: 2px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .admin-payments-payment-summary-item {
          text-align: center;
        }

        .admin-payments-payment-summary-label {
          color: #718096;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 10px;
          display: block;
        }

        .admin-payments-payment-summary-value {
          font-size: 32px;
          font-weight: 800;
        }

        .admin-payments-payment-pending {
          color: #f56565;
        }

        .admin-payments-form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
        }

        .admin-payments-form-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .admin-payments-form-label {
          color: #4a5568;
          font-size: 15px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .admin-payments-form-label-icon {
          font-size: 18px;
        }

        .admin-payments-form-input,
        .admin-payments-form-textarea {
          padding: 16px 20px;
          border: 2px solid #e2e8f0;
          border-radius: 15px;
          font-size: 16px;
          transition: all 0.3s;
          background: white;
          font-weight: 500;
        }

        .admin-payments-form-input:focus,
        .admin-payments-form-textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15);
        }

        .admin-payments-form-input:disabled,
        .admin-payments-form-textarea:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .admin-payments-form-textarea {
          resize: vertical;
          min-height: 100px;
          font-family: inherit;
        }

        .admin-payments-form-hint {
          color: #a0aec0;
          font-size: 13px;
          margin-top: 5px;
        }

        /* File Upload Area */
        .admin-payments-file-upload-area {
          width: 100%;
        }

        .admin-payments-file-input {
          display: none;
        }

        .admin-payments-file-upload-label {
          display: block;
          width: 100%;
          padding: 40px 20px;
          border: 3px dashed #e2e8f0;
          border-radius: 15px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
          background: white;
        }

        .admin-payments-file-upload-label:hover {
          border-color: #cbd5e0;
          background: #f7fafc;
        }

        .admin-payments-file-upload-icon {
          font-size: 48px;
          color: #718096;
          margin-bottom: 15px;
        }

        .admin-payments-file-upload-title {
          color: #4a5568;
          font-weight: 600;
          font-size: 18px;
          margin-bottom: 8px;
        }

        .admin-payments-file-upload-subtitle {
          color: #718096;
          font-size: 14px;
          margin-bottom: 5px;
        }

        .admin-payments-file-upload-hint {
          color: #a0aec0;
          font-size: 12px;
        }

        /* File Preview */
        .admin-payments-file-preview {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          border: 2px solid #e2e8f0;
          border-radius: 15px;
          background: white;
        }

        .admin-payments-file-preview-content {
          display: flex;
          align-items: center;
          gap: 15px;
          flex: 1;
        }

        .admin-payments-file-preview-image {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 10px;
          border: 2px solid #e2e8f0;
        }

        .admin-payments-file-preview-icon {
          width: 60px;
          height: 60px;
          background: #f7fafc;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: #718096;
          border: 2px solid #e2e8f0;
        }

        .admin-payments-file-preview-info {
          flex: 1;
        }

        .admin-payments-file-preview-name {
          color: #4a5568;
          font-weight: 600;
          margin-bottom: 5px;
          word-break: break-all;
        }

        .admin-payments-file-preview-size {
          color: #a0aec0;
          font-size: 13px;
        }

        .admin-payments-file-remove {
          background: #f56565;
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.3s;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .admin-payments-file-remove:hover:not(:disabled) {
          background: #e53e3e;
        }

        .admin-payments-file-remove:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Modal Footer */
        .admin-payments-modal-footer {
          padding: 30px;
          border-top: 2px solid #f1f5f9;
          display: flex;
          gap: 15px;
          justify-content: flex-end;
        }

        .admin-payments-modal-cancel,
        .admin-payments-modal-submit,
        .admin-payments-modal-close-btn {
          padding: 16px 32px;
          border-radius: 15px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s;
          border: none;
          min-width: 120px;
        }

        .admin-payments-modal-cancel {
          background: white;
          color: #4a5568;
          border: 2px solid #e2e8f0;
        }

        .admin-payments-modal-cancel:hover:not(:disabled) {
          background: #f7fafc;
          border-color: #cbd5e0;
        }

        .admin-payments-modal-submit {
          background: linear-gradient(135deg, #48bb78, #38a169);
          color: white;
        }

        .admin-payments-modal-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(72, 187, 120, 0.3);
        }

        .admin-payments-modal-close-btn {
          background: #667eea;
          color: white;
        }

        .admin-payments-modal-close-btn:hover {
          background: #764ba2;
        }

        /* Loading States */
        .admin-payments-loading {
          padding: 60px 20px;
          text-align: center;
          color: #718096;
        }

        .admin-payments-loading-spinner {
          width: 60px;
          height: 60px;
          border: 4px solid #e2e8f0;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          animation: admin-payments-spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes admin-payments-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .admin-payments-spinner-small {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: admin-payments-spin 1s linear infinite;
          display: inline-block;
          margin-right: 10px;
        }

        /* Empty States */
        .admin-payments-empty {
          padding: 80px 20px;
          text-align: center;
          color: #a0aec0;
        }

        .admin-payments-empty-icon {
          font-size: 64px;
          margin-bottom: 20px;
          opacity: 0.5;
        }

        .admin-payments-empty h3 {
          font-size: 24px;
          color: #718096;
          margin-bottom: 8px;
        }

        .admin-payments-modal-empty {
          text-align: center;
          padding: 60px 20px;
          color: #a0aec0;
        }

        .admin-payments-modal-empty-icon {
          font-size: 64px;
          margin-bottom: 20px;
          opacity: 0.5;
        }

        .admin-payments-modal-empty h3 {
          font-size: 24px;
          color: #718096;
          margin-bottom: 8px;
        }

        /* History Table in Modal */
        .admin-payments-history-container {
          overflow-x: auto;
        }

        .admin-payments-history-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        .admin-payments-history-table th {
          padding: 20px;
          background: #f7fafc;
          color: #4a5568;
          font-weight: 600;
          text-align: left;
          font-size: 14px;
          border-bottom: 2px solid #e2e8f0;
        }

        .admin-payments-history-table td {
          padding: 20px;
          color: #4a5568;
          border-bottom: 1px solid #f1f5f9;
        }

        .admin-payments-history-table tr:last-child td {
          border-bottom: none;
        }

        .admin-payments-history-date {
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 13px;
          color: #718096;
          white-space: nowrap;
        }

        .admin-payments-amount-badge {
          background: rgba(72, 187, 120, 0.1);
          color: #38a169;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 14px;
          display: inline-block;
        }

        .admin-payments-mode-badge {
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          display: inline-block;
          min-width: 100px;
          text-align: center;
        }

        .admin-payments-mode-cash {
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
          border: 2px solid rgba(102, 126, 234, 0.2);
        }

        .admin-payments-mode-online {
          background: rgba(72, 187, 120, 0.1);
          color: #38a169;
          border: 2px solid rgba(72, 187, 120, 0.2);
        }

        .admin-payments-mode-cheque {
          background: rgba(245, 158, 11, 0.1);
          color: #d69e2e;
          border: 2px solid rgba(245, 158, 11, 0.2);
        }

        .admin-payments-mode-bank_transfer {
          background: rgba(159, 122, 234, 0.1);
          color: #805ad5;
          border: 2px solid rgba(159, 122, 234, 0.2);
        }

        .admin-payments-transaction-id {
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 13px;
          color: #2d3748;
          background: #f7fafc;
          padding: 5px 10px;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
          word-break: break-all;
        }

        .admin-payments-receipt-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(102, 126, 234, 0.1);
          border-radius: 20px;
          border: 2px solid rgba(102, 126, 234, 0.2);
        }

        .admin-payments-receipt-link:hover {
          background: rgba(102, 126, 234, 0.2);
          color: #764ba2;
        }

        .admin-payments-receipt-icon {
          font-size: 16px;
        }

        .admin-payments-no-receipt {
          color: #a0aec0;
          font-style: italic;
        }

        /* Global Loading */
        .admin-payments-global-loading {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(10px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 20000;
          color: white;
        }

        .admin-payments-global-spinner {
          width: 80px;
          height: 80px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid white;
          border-radius: 50%;
          animation: admin-payments-spin 1s linear infinite;
          margin-bottom: 20px;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .admin-payments-filters-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .admin-payments-search-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .admin-payments-summary {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .admin-payments-container {
            padding: 10px;
          }

          .admin-payments-header-content {
            flex-direction: column;
            text-align: center;
            padding: 20px;
          }

          .admin-payments-header-icon {
            width: 60px;
            height: 60px;
            font-size: 32px;
          }

          .admin-payments-title {
            font-size: 24px;
          }

          .admin-payments-filters-card,
          .admin-payments-search-card,
          .admin-payments-table-container {
            padding: 20px;
          }

          .admin-payments-filters-grid,
          .admin-payments-search-grid {
            grid-template-columns: 1fr;
          }

          .admin-payments-filter-actions {
            flex-direction: column;
          }

          .admin-payments-summary {
            grid-template-columns: repeat(2, 1fr);
          }

          .admin-payments-table {
            display: block;
            overflow-x: auto;
          }

          .admin-payments-student-avatar {
            float: none;
            margin: 0 auto 15px;
          }

          .admin-payments-student-info {
            text-align: center;
          }

          .admin-payments-modal-content {
            max-height: 95vh;
            margin: 10px;
          }

          .admin-payments-modal-header,
          .admin-payments-modal-body,
          .admin-payments-modal-footer {
            padding: 20px;
          }

          .admin-payments-payment-form {
            padding: 20px;
          }

          .admin-payments-form-grid {
            grid-template-columns: 1fr;
          }

          .admin-payments-modal-footer {
            flex-direction: column;
          }

          .admin-payments-modal-cancel,
          .admin-payments-modal-submit,
          .admin-payments-modal-close-btn {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .admin-payments-summary {
            grid-template-columns: 1fr;
          }

          .admin-payments-action-buttons {
            flex-direction: column;
          }

          .admin-payments-action-history,
          .admin-payments-action-pay {
            width: 100%;
            justify-content: center;
          }

          .admin-payments-file-preview-content {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}