import User from "../models/user.js";
import { sendEmail } from "./sendEmail.js";

export const sendGroupCreationEmails = async (group) => {
  try {
    console.log("📩 Preparing group emails for:", group._id);

    if (!group.students || group.students.length === 0) {
      console.error("❌ ERROR: group.students is missing!");
      return;
    }

    // Extract student IDs
    const studentIds = group.students.map(
      (s) => s.student?._id || s.student
    );

    // Fetch student details
    const users = await User.find({ _id: { $in: studentIds } });

    // Member list
    const memberListHTML = users
      .map(
        (u) =>
          `<li style="margin-bottom:6px;">
              <b>${u.name}</b> (${u.usn}) — ${u.email}
           </li>`
      )
      .join("");

    // Send email to each student
    for (const user of users) {
      console.log("📨 Sending mail to:", user.email);

      const studentEntry = group.students.find(
        (s) => String(s.student?._id || s.student) === String(user._id)
      );
      if (!studentEntry) continue;

      const pendingFee = studentEntry.totalFee - studentEntry.paidFee;

      // ---------------------------
      // 📧 PROFESSIONAL HTML EMAIL
      // ---------------------------
      const html = `
<table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial, sans-serif; background:#f4f6f9; padding:20px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:white; border-radius:12px; padding:25px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">

        <!-- Header -->
        <tr>
          <td style="text-align:center; padding-bottom:20px;">
            <h2 style="margin:0; color:#1a73e8; font-size:26px;">Fee Group Assignment</h2>
            <p style="margin:5px 0 0; color:#555;">You have been added to a new fee group</p>
          </td>
        </tr>

        <!-- Greeting -->
        <tr>
          <td style="padding:10px 0; font-size:16px; color:#333;">
            Hello <b>${user.name}</b>,<br/>
            <p>You are now part of a newly created fee group. Below are your details:</p>
          </td>
        </tr>

        <!-- Group Details Card -->
        <tr>
          <td style="padding:15px; background:#eef4ff; border-radius:10px; margin-top:10px;">
            <h3 style="margin-top:0; color:#1a54b3;">🎓 Group Details</h3>
            <p><b>Group Name:</b> ${group.name}</p>
            <p><b>College:</b> ${group.collegeName}</p>
            <p><b>Batch:</b> ${group.batch}</p>
            <p><b>Program:</b> ${group.programName}</p>
            <p><b>Technology:</b> ${group.technology}</p>
          </td>
        </tr>

        <!-- Fee Summary Card -->
        <tr>
          <td style="padding:15px; background:#fff7e6; border-radius:10px; margin-top:10px;">
            <h3 style="margin-top:0; color:#b37400;">💰 Your Fee Summary</h3>
            <p><b>Total Fee:</b> ₹${studentEntry.totalFee}</p>
            <p><b>Paid Amount:</b> ₹${studentEntry.paidFee}</p>
            <p><b>Pending Amount:</b> <span style="color:#d93025; font-weight:bold;">₹${pendingFee}</span></p>
          </td>
        </tr>

        <!-- Member list -->
        <tr>
          <td style="padding:15px; background:#e8fff1; border-radius:10px; margin-top:10px;">
            <h3 style="margin-top:0; color:#0d8a47;">👥 Group Members (${users.length})</h3>
            <ul style="padding-left:20px; margin:0; color:#333; font-size:15px;">
              ${memberListHTML}
            </ul>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding-top:25px; text-align:center; color:#666; font-size:14px;">
            <p>You can log in to your student portal anytime to view detailed fee status.</p>
            <p style="margin-top:10px;">Regards,<br/><b>Admin Team</b></p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
`;

      await sendEmail({
        to: user.email,
        subject: `Added to Fee Group: ${group.name}`,
        html,
      });
    }
  } catch (err) {
    console.error("❌ Group Email Failed:", err);
  }
};
