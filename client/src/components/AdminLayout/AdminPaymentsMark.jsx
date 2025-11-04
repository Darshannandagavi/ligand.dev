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
  const [rowPayments, setRowPayments] = useState({});

  // Internal CSS Styles
  const styles = {
    container: {
      padding: "24px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f5f7fa",
      minHeight: "100vh",
    },
    header: {
      color: "#2c3e50",
      marginBottom: "24px",
      fontSize: "28px",
      fontWeight: "600",
      borderBottom: "3px solid #3498db",
      paddingBottom: "12px",
    },
    filterContainer: {
      display: "flex",
      gap: "16px",
      marginBottom: "24px",
      alignItems: "center",
      flexWrap: "wrap",
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    select: {
      padding: "10px 16px",
      border: "2px solid #e1e8ed",
      borderRadius: "8px",
      fontSize: "14px",
      minWidth: "180px",
      backgroundColor: "white",
      transition: "all 0.3s ease",
      outline: "none",
    },
    selectHover: {
      borderColor: "#3498db",
      boxShadow: "0 0 0 3px rgba(52, 152, 219, 0.1)",
    },
    button: {
      padding: "10px 24px",
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      transition: "all 0.3s ease",
      minWidth: "100px",
    },
    buttonHover: {
      backgroundColor: "#2980b9",
      transform: "translateY(-1px)",
    },
    buttonDisabled: {
      backgroundColor: "#bdc3c7",
      cursor: "not-allowed",
      transform: "none",
    },
    tableContainer: {
      backgroundColor: "white",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "14px",
    },
    tableHeader: {
      backgroundColor: "#34495e",
      color: "white",
      padding: "16px 12px",
      textAlign: "center",
      fontWeight: "600",
      fontSize: "13px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    tableCell: {
      padding: "16px 12px",
      borderBottom: "1px solid #ecf0f1",
      verticalAlign: "middle",
      textAlign: "center",
    },
    profilePic: {
      height: "70px",
      width: "70px",
      borderRadius: "50%",
      boxShadow: "0 0 10px rgba(79, 79, 79, 0.51)",
    },
    tableRow: {
      transition: "background-color 0.2s ease",
    },
    tableRowHover: {
      backgroundColor: "#f8f9fa",
    },
    statusBadge: {
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
      textAlign: "center",
      display: "inline-block",
      minWidth: "60px",
    },
    paidBadge: {
      backgroundColor: "#d4edda",
      color: "#155724",
    },
    unpaidBadge: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
    },
    actionButton: {
      padding: "8px 16px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: "600",
      transition: "all 0.2s ease",
      marginTop: "8px",
      minWidth: "100px",
    },
    paidButton: {
      backgroundColor: "#dc3545",
      color: "white",
    },
    unpaidButton: {
      backgroundColor: "#28a745",
      color: "white",
    },
    loadingOverlay: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px",
      fontSize: "16px",
      color: "#7f8c8d",
    },
    processingIndicator: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
      backgroundColor: "#fff3cd",
      color: "#856404",
      borderRadius: "8px",
      marginTop: "16px",
      fontSize: "14px",
      fontWeight: "500",
    },
    amountText: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#2c3e50",
      margin: "8px 0",
    },
    installmentCell: {
      textAlign: "center",
      verticalAlign: "middle",
    },
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          "https://ligand-software-solutions-workshop-2.onrender.com/api/options/collegeName"
        );
        setCollegeOptions(res.data || []);
      } catch (err) {
        setCollegeOptions([]);
      }
    };
    fetch();
  }, []);

  // Reapply client filters automatically when rows or filter inputs change
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, searchEmail, searchUsn, searchGroup, statusFilter]);

  useEffect(() => {
    if (!filters.collegeName) {
      setBatchOptions([]);
      setFilters((f) => ({ ...f, batch: "" }));
      return;
    }
    (async () => {
      try {
        const res = await axios.get(
          "https://ligand-software-solutions-workshop-2.onrender.com/api/attendance/options/batches",
          {
            params: { collegeName: filters.collegeName },
            headers: { Authorization: token ? `Bearer ${token}` : "" },
          }
        );
        setBatchOptions(res.data || []);
      } catch (err) {
        setBatchOptions([]);
      }
    })();
  }, [filters.collegeName, token]);

  useEffect(() => {
    if (!filters.collegeName || !filters.batch) {
      setProgramOptions([]);
      setFilters((f) => ({ ...f, programName: "" }));
      return;
    }
    (async () => {
      try {
        const res = await axios.get(
          "https://ligand-software-solutions-workshop-2.onrender.com/api/attendance/options/programs",
          {
            params: { collegeName: filters.collegeName, batch: filters.batch },
            headers: { Authorization: token ? `Bearer ${token}` : "" },
          }
        );
        setProgramOptions(res.data || []);
      } catch (err) {
        setProgramOptions([]);
      }
    })();
  }, [filters.collegeName, filters.batch, token]);

  useEffect(() => {
    if (!filters.collegeName || !filters.batch || !filters.programName) {
      setTechnologyOptions([]);
      setFilters((f) => ({ ...f, technology: "" }));
      return;
    }
    (async () => {
      try {
        const res = await axios.get(
          "https://ligand-software-solutions-workshop-2.onrender.com/api/attendance/options/technologies",
          {
            params: {
              collegeName: filters.collegeName,
              batch: filters.batch,
              programName: filters.programName,
            },
            headers: { Authorization: token ? `Bearer ${token}` : "" },
          }
        );
        setTechnologyOptions(res.data || []);
      } catch (err) {
        setTechnologyOptions([]);
      }
    })();
  }, [filters.collegeName, filters.batch, filters.programName, token]);

  // Function to map API response to expected format
  const mapApiResponseToRows = (apiData) => {
    const rows = [];

    apiData.forEach((feeGroup) => {
      // Create installments array based on payment history
      const createInstallments = (studentData) => {
        const installments = [];
        const paymentHistory = studentData.paymentHistory || [];

        // Assuming 3 installments maximum
        for (let i = 0; i < 3; i++) {
          if (i < paymentHistory.length) {
            installments.push({
              amount: paymentHistory[i].amount,
              status: "Paid",
              paidOn: paymentHistory[i].paidOn,
            });
          } else {
            // Calculate remaining amount for unpaid installments
            const paidAmount = studentData.paidFee || 0;
            const totalAmount = studentData.totalFee || 0;
            const remainingAmount = totalAmount - paidAmount;

            if (remainingAmount > 0 && i === paymentHistory.length) {
              installments.push({
                amount: remainingAmount,
                status: "Unpaid",
              });
            } else {
              installments.push({
                amount: 0,
                status: "Unpaid",
              });
            }
          }
        }

        return installments;
      };

      feeGroup.students.forEach((studentData) => {
        const row = {
          groupId: feeGroup._id,
          groupName: feeGroup.name || `Group ${feeGroup._id}`,
          student: studentData.student,
          installments: createInstallments(studentData),
          pending: studentData.totalFee - studentData.paidFee,
          currentFee: studentData.currentFee,
          paidFee: studentData.paidFee,
          totalFee: studentData.totalFee,
          status: studentData.status,
        };
        rows.push(row);
      });
    });

    return rows;
  };

  const fetchRows = async () => {
    if (
      !filters.collegeName ||
      !filters.batch ||
      !filters.programName ||
      !filters.technology
    )
      return alert("Select all filters");
    try {
      setLoading(true);
      const res = await axios.get(
        "https://ligand-software-solutions-workshop-2.onrender.com/api/fee-groups/students",
        {
          params: filters,
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        }
      );
      const apiData = res.data || [];
      console.log("API Response:", apiData);

      // Map the API response to the expected format
      const mappedRows = mapApiResponseToRows(apiData);
      console.log("Mapped Rows:", mappedRows);

      setRows(mappedRows);
      setFilteredRows(mappedRows);
    } catch (err) {
      console.error(err);
      alert("Error loading rows");
    } finally {
      setLoading(false);
    }
  };

  const submitPayment = async (groupId, studentId) => {
    const data = rowPayments[`${groupId}_${studentId}`] || {};
    const amount = Number(data.amount || 0);
    const installmentIndex =
      typeof data.installmentIndex !== "undefined"
        ? Number(data.installmentIndex)
        : undefined;
    if (!amount || isNaN(amount) || amount <= 0)
      return alert("Enter valid amount");
    try {
      setActionLoading(true);
      await axios.post(
        `https://ligand-software-solutions-workshop-2.onrender.com/api/fee-groups/${groupId}/students/${studentId}/payment`,
        { amount, installmentIndex },
        { headers: { Authorization: token ? `Bearer ${token}` : "" } }
      );

      const res = await axios.get(
        "https://ligand-software-solutions-workshop-2.onrender.com/api/fee-groups/students",
        {
          params: filters,
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        }
      );
      const apiData = res.data || [];
      const mappedRows = mapApiResponseToRows(apiData);
      setRows(mappedRows);
      setFilteredRows(mappedRows);

      // clear the input for that row
      setRowPayments((prev) => {
        const np = { ...prev };
        delete np[`${groupId}_${studentId}`];
        return np;
      });
    } catch (err) {
      console.error(err);
      alert("Error submitting payment");
    } finally {
      setActionLoading(false);
    }
  };

  // Helper function to combine styles
  const combineStyles = (baseStyle, ...additionalStyles) => ({
    ...baseStyle,
    ...Object.assign({}, ...additionalStyles),
  });

  const applyFilters = () => {
    const qEmail = (searchEmail || "").trim().toLowerCase();
    const qUsn = (searchUsn || "").trim().toLowerCase();
    const qGroup = (searchGroup || "").trim().toLowerCase();

    const out = rows.filter((r) => {
      // ✅ Filter by status directly from row.status
      if (statusFilter === "paid" && r.status !== "Paid") return false;
      if (statusFilter === "unpaid" && r.status === "Paid") return false;

      // ✅ Email filter
      if (
        qEmail &&
        !(r.student && (r.student.email || "").toLowerCase().includes(qEmail))
      )
        return false;

      // ✅ USN filter
      if (
        qUsn &&
        !(r.student && (r.student.usn || "").toLowerCase().includes(qUsn))
      )
        return false;

      // ✅ Group name filter
      if (qGroup && !(r.groupName || "").toLowerCase().includes(qGroup))
        return false;

      return true;
    });

    setFilteredRows(out);
  };

  const clearFilters = () => {
    setSearchEmail("");
    setSearchUsn("");
    setSearchGroup("");
    setStatusFilter("all");
    setFilteredRows(rows);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Fee Installment Management</h2>

      <div style={styles.filterContainer}>
        <select
          value={filters.collegeName}
          onChange={(e) =>
            setFilters({ ...filters, collegeName: e.target.value })
          }
          style={combineStyles(
            styles.select,
            filters.collegeName && styles.selectHover
          )}
        >
          <option value="">Select College</option>
          {collegeOptions.map((c) => (
            <option key={c._id || c.value} value={c.value || c}>
              {c.value || c}
            </option>
          ))}
        </select>

        <select
          value={filters.batch}
          onChange={(e) => setFilters({ ...filters, batch: e.target.value })}
          disabled={!batchOptions.length}
          style={combineStyles(
            styles.select,
            filters.batch && styles.selectHover,
            !batchOptions.length && styles.buttonDisabled
          )}
        >
          <option value="">Select Batch</option>
          {batchOptions.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <select
          value={filters.programName}
          onChange={(e) =>
            setFilters({ ...filters, programName: e.target.value })
          }
          disabled={!programOptions.length}
          style={combineStyles(
            styles.select,
            filters.programName && styles.selectHover,
            !programOptions.length && styles.buttonDisabled
          )}
        >
          <option value="">Select Program</option>
          {programOptions.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <select
          value={filters.technology}
          onChange={(e) =>
            setFilters({ ...filters, technology: e.target.value })
          }
          disabled={!technologyOptions.length}
          style={combineStyles(
            styles.select,
            filters.technology && styles.selectHover,
            !technologyOptions.length && styles.buttonDisabled
          )}
        >
          <option value="">Select Technology</option>
          {technologyOptions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <button
          onClick={fetchRows}
          disabled={loading || actionLoading}
          style={combineStyles(
            styles.button,
            !(loading || actionLoading) && styles.buttonHover,
            (loading || actionLoading) && styles.buttonDisabled
          )}
        >
          {loading ? "Loading..." : "Load Students"}
        </button>
        <div
          style={{
            marginLeft: 12,
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          <input
            placeholder="Search email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #e1e8ed",
            }}
          />
          <input
            placeholder="Search USN"
            value={searchUsn}
            onChange={(e) => setSearchUsn(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #e1e8ed",
            }}
          />
          <input
            placeholder="Search group"
            value={searchGroup}
            onChange={(e) => setSearchGroup(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #e1e8ed",
            }}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: 8 }}
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
          <button
            onClick={applyFilters}
            style={combineStyles(styles.button, styles.buttonHover)}
          >
            Filter
          </button>
          <button
            onClick={clearFilters}
            style={combineStyles(styles.button, { backgroundColor: "#95a5a6" })}
          >
            Clear
          </button>
        </div>
      </div>

      {loading ? (
        <div style={styles.loadingOverlay}>
          <div>Loading student data...</div>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Student Profile</th>
                <th style={styles.tableHeader}>Student Name</th>
                <th style={styles.tableHeader}>USN</th>
                <th style={styles.tableHeader}>Project Group</th>
                <th style={styles.tableHeader}>Total Fees</th>
                <th style={styles.tableHeader}>Paid Fees</th>
                <th style={styles.tableHeader}>Pending Amount</th>
                <th style={styles.tableHeader}>Actions</th>
                <th style={styles.tableHeader}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((r, rowIndex) => {
                const pending = Number(r.pending || 0);
                return (
                  <tr
                    key={`${r.groupId}-${r.student?._id || rowIndex}`}
                    style={styles.tableRow}
                  >
                    <td style={styles.tableCell}>
                      <img
                        src={
                          r.student.profilePic
                            ? `https://ligand-software-solutions-workshop-2.onrender.com/uploads/${r.student.profilePic}`
                            : "/default_user.jpeg"
                        }
                        onError={(e) => {
                          e.target.src = "/default_user.jpeg";
                        }}
                        style={styles.profilePic}
                        alt="profile"
                      />
                    </td>

                    <td style={styles.tableCell}>
                      <strong>{r.student?.name || "Unknown"}</strong>
                    </td>
                    <td style={styles.tableCell}>
                      <code>{r.student?.usn || "N/A"}</code>
                    </td>
                    <td style={styles.tableCell}>
                      <span
                        style={{
                          backgroundColor: "#e8f4fd",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                        }}
                      >
                        {r.groupName || "N/A"}
                      </span>
                    </td>

                    <td style={styles.tableCell}>{r.totalFee}</td>
                    <td style={styles.tableCell}>{r.paidFee}</td>

                    <td style={styles.tableCell}>
                      <div
                        style={{
                          fontWeight: "600",
                          color: pending > 0 ? "#e74c3c" : "#27ae60",
                        }}
                      >
                        ₹{pending}
                      </div>
                    </td>

                    <td style={styles.tableCell}>
                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="number"
                          placeholder="Amount"
                          value={
                            (rowPayments[`${r.groupId}_${r.student._id}`] || {})
                              .amount || ""
                          }
                          onChange={(e) =>
                            setRowPayments((prev) => ({
                              ...prev,
                              [`${r.groupId}_${r.student._id}`]: {
                                ...(prev[`${r.groupId}_${r.student._id}`] ||
                                  {}),
                                amount: e.target.value,
                              },
                            }))
                          }
                          style={{
                            width: 120,
                            padding: "6px 8px",
                            borderRadius: 6,
                            border: "1px solid #e2e8f0",
                          }}
                        />
                        <select
                          value={
                            (rowPayments[`${r.groupId}_${r.student._id}`] || {})
                              .installmentIndex ?? ""
                          }
                          onChange={(e) =>
                            setRowPayments((prev) => ({
                              ...prev,
                              [`${r.groupId}_${r.student._id}`]: {
                                ...(prev[`${r.groupId}_${r.student._id}`] ||
                                  {}),
                                installmentIndex: e.target.value,
                              },
                            }))
                          }
                          style={{ padding: "6px 8px", borderRadius: 6 }}
                        >
                          <option value="">Select Installment</option>
                          <option value="0">Installment 1</option>
                          <option value="1">Installment 2</option>
                          <option value="2">Installment 3</option>
                        </select>
                        <button
                          disabled={actionLoading}
                          onClick={() =>
                            submitPayment(r.groupId, r.student._id)
                          }
                          style={combineStyles(
                            styles.actionButton,
                            styles.unpaidButton
                          )}
                        >
                          {actionLoading ? "Processing..." : "Submit"}
                        </button>
                      </div>
                    </td>

                    <td style={styles.tableCell}>
                      {r.status === "Paid" ? (
                        <span
                          style={combineStyles(
                            styles.statusBadge,
                            styles.paidBadge
                          )}
                        >
                          PAID
                        </span>
                      ) : (
                        <span
                          style={combineStyles(
                            styles.statusBadge,
                            styles.unpaidBadge
                          )}
                        >
                          UNPAID
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {rows.length === 0 && !loading && (
            <div style={styles.loadingOverlay}>
              <div>
                No students found. Please adjust your filters and try again.
              </div>
            </div>
          )}
        </div>
      )}

      {actionLoading && (
        <div style={styles.processingIndicator}>
          ⏳ Processing payment status update...
        </div>
      )}
    </div>
  );
}
