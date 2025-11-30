import GuestLayout from "./components/GuestLAyout/GuestLayout";
import { Route, Routes } from "react-router-dom";
import Login from "./components/GuestLAyout/Login";
import Register from "./components/GuestLAyout/Register";
import UserLayout from "./components/UserLayout/UserLayout";
import Profile from "./components/UserLayout/Profile";
import ChangePassword from "./components/UserLayout/ChangePassword";
import ForgotPassword from "./components/UserLayout/ForgotPassword";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import ManageExam from "./components/AdminLayout/ManageExam";
import Home from "./components/GuestLAyout/Home";
import AttendExam from "./components/UserLayout/AttendExam";
import ExamHistory from "./components/UserLayout/ExamHistory";
import AdminExamAttempts from "./components/AdminLayout/AdminExamAttempts";
import MyNotes from "./components/UserLayout/MyNotes";
import Chapter4 from "./components/UserLayout/Chapter4";
import Chapter5 from "./components/UserLayout/Chapter5";
import Chapter3 from "./components/UserLayout/Chapter3";
import Chapter6 from "./components/UserLayout/Chapter6";
import Notes from "./components/UserLayout/Notes";
import AdminNotesControl from "./components/AdminLayout/AdminNotesControl";
import ServerSetup from "./components/UserLayout/ServerSetup";
import PostmanSetup from "./components/UserLayout/PostmanSetup";
import UserBackend from "./components/UserLayout/UserBackend";
import RegistrationFrontend from "./components/UserLayout/RegistrationFrontend";
import LoginFrontend from "./components/UserLayout/LoginFrontend";
import ItemBackend from "./components/UserLayout/ItemBackend";
import ItemFrontend from "./components/UserLayout/ItemFrontend";
import RoleBasedNotes from "./components/UserLayout/RoleBasedNotes";
import ViewItemFrontendNotes from "./components/UserLayout/ViewItemFrontendNotes";
import AdminOptions from "./components/AdminLayout/AdminOptions";
import ManageExamVisibility from "./components/AdminLayout/ExamsManager";
import InterviewPage from "./components/UserLayout/UserInterview";
import InterviewControl from "./components/AdminLayout/InterviewControl";
import AdminDashboard from "./components/AdminLayout/AdminDashboard";
import AdminAttendance from "./components/AdminLayout/AdminAttendance";
import AdminPayments from "./components/AdminLayout/AdminPayments";
import AdminPaymentsMark from "./components/AdminLayout/AdminPaymentsMark";
import AdminPaymentsDashboard from "./components/AdminLayout/AdminPaymentsDashboard";
import AdminNewDashboard from "./components/AdminLayout/AdminNewDashboard";
import TeacherChangePassword from "./components/TeacherLayout/TeacherChangePassword";
import TeacherStudent from "./components/TeacherLayout/TeacherStudent";
import TeacherEditProfile from "./components/TeacherLayout/TeacherEditProfile";
import ManageTeachers from "./components/TeacherLayout/ManageTeachers";
import TeacherLayout from "./components/TeacherLayout/TeacherLayout";
import TeacherRegister from "./components/TeacherLayout/TeacherRegister";
import TeacherLogin from "./components/TeacherLayout/TeacherLogin";
import Homework from "./components/AdminLayout/Homework";
import TeacherHomework from "./components/TeacherLayout/TeacherHomeWork";
import TeacherForgot from "./components/TeacherLayout/TeacherForgot";
import AdminApproveStudents from "./components/AdminLayout/AdminApproveStudents";
import CreateAppPassword from "./components/UserLayout/CreateAppPassword";
import NoteForgotChangePassword from "./components/UserLayout/NoteForgotChangePassword";
import ProfileNotes from "./components/UserLayout/ProfileNotes";
import TeacherAttendance from "./components/TeacherLayout/TeacherAttendance";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<GuestLayout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/teacher-login" element={<TeacherLogin />} />
          <Route path="teacher-forgot-pwd" element={<TeacherForgot />} />
          
        </Route>




        <Route path="/user" element={<UserLayout />}>
          <Route index element={<AttendExam />} />
          <Route path="/user/notes" element={<Notes />} />
          <Route path="/user/clientsetup" element={<MyNotes />} />
          <Route path="/user/BootstrapinReact" element={<Chapter4 />} />
          <Route path="/user/CommonLayouts" element={<Chapter5 />} />
          <Route path="/user/LandingPages" element={<Chapter6 />} />
          <Route path="/user/IntroductiontoMERNStack" element={<Chapter3 />} />
          <Route path="/user/ServerSetup" element={<ServerSetup />} />
          <Route path="/user/PostmanSetup" element={<PostmanSetup />} />
          <Route path="/user/userbackend" element={<UserBackend />} />
          <Route path="/user/CreateAppPassword" element={<CreateAppPassword/>} />
          <Route path="/user/ProfileNotes" element={<ProfileNotes/>} />
          <Route path="/user/NoteForgotChangePassword" element={<NoteForgotChangePassword/>} />
          <Route
            path="/user/RegistrationFrontend"
            element={<RegistrationFrontend />}
          />
          <Route path="/user/loginfrontend" element={<LoginFrontend />} />
          <Route path="/user/itembackend" element={<ItemBackend />} />
          <Route path="/user/itemfrontend" element={<ItemFrontend />} />
          <Route path="/user/rolebasednotes" element={<RoleBasedNotes />} />
          <Route
            path="/user/viewitemfrontendnotes"
            element={<ViewItemFrontendNotes />}
          />
          <Route path="/user/history" element={<ExamHistory />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/changepassword" element={<ChangePassword />} />
          <Route path="/user/interview" element={<InterviewPage />} />
        </Route>




        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<ManageExam />} />
          <Route path="/admin/exam" element={<ManageExam />} />
          <Route path="/admin/notescontroll" element={<AdminNotesControl />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/attendance" element={<AdminAttendance />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
          <Route path="/admin/payments/mark" element={<AdminPaymentsMark />} />
          <Route
            path="/admin/payments/dashboard"
            element={<AdminPaymentsDashboard />}
          />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/admindashboard" element={<AdminNewDashboard />} />
          <Route path="/admin/adminoptions" element={<AdminOptions />} />
          <Route path="/admin/history" element={<AdminExamAttempts />} />
          <Route path="/admin/changepassword" element={<ChangePassword />} />
          <Route
            path="/admin/manageexamsvisibility"
            element={<ManageExamVisibility />}
          />
          <Route
            path="/admin/interviewcontrol"
            element={<InterviewControl />}
          />
          <Route path="/admin/add-teacher" element={<TeacherRegister />} />
          <Route path="/admin/manage-teacher" element={<ManageTeachers />} />
          <Route path="/admin/student/homework" element={<Homework />} />
          <Route path="/admin/student/approve" element={<AdminApproveStudents />} />
        </Route>






        <Route path="/teacher" element={<TeacherLayout />}>
          <Route path="/teacher/students" element={<TeacherStudent />} />
          <Route index element={<TeacherHomework />} />
          <Route path="/teacher/homeworks" element={<TeacherHomework />} />
          <Route
            path="/teacher/markattendance"
            element={<TeacherAttendance />}
          />
          <Route
            path="/teacher/change-password"
            element={<TeacherChangePassword />}
          />
          <Route
            path="/teacher/edit-profile"
            element={<TeacherEditProfile />}
          />
          <Route path="/teacher/students" element={<TeacherStudent />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
