// import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import RoleBasedRoute from './components/RoleBasedRoute';

import Navbar from './components/Navbar';
import FacultyDashboard from './faculty/FacultyDashboard';
import CollegeDashboard from './college/CollegeDashboard';
import CounselorDashboard from './counselor/CounselorDashboard';
import Header from './components/Header';
import Login from './pages/Login';
import DataTable from './college/Enquiries';
import CounselorData from './college/CounselorList';
import Faculties from './college/Faculties';
import Courses from './college/Courses';
import Branches from './college/Branches';
import CounselorForm from './college/CounselorForm';
import FacultiesForm from './college/FacultiesForm';
import BranchesForm from './college/BranchesForm';
import CoursesForm from './college/CoursesForm';
import Footer from './components/Footer';
import InquiryForm from './faculty/InquiryForm';
import AppointCounselor from './faculty/AppointCounselor';
import InquiryConformation from './counselor/Conformation';
import DemoForm from './pages/DemoForm';
import { ThemeProvider } from './context/ThemeContext';
import UserRegistrationForm from './pages/RegistrationForm';
import LandingPage from './components/LandingPage';
import Start from './components/Start';
import Logout from './pages/Logout';
import CollegeRegistrationForm from './pages/CollegeRegistration';
import MasterDashboard from './master/MasterDashboard';
import MasterCollegeList from './master/Colleges';
import MasterFacultyList from './master/FacultyList';
import MasterCounselorList from './master/CounselorList';
import MasterCollegeRequest from './master/CollegesRequests';
import MasterContactDetails from './master/ContactDetails';
import MasterLogin from './master/MasterLogin';
import MasterLogout from './master/MasterLogout';
import MasterCollegeForm from './master/CollegeForm';
import AppointCounselorForm from './faculty/AppointCounselorForm';
import ConformationForm from './counselor/CoformationForm';
import StudentProfile from './student/StudentProfile';
import EditInquiryForm from './college/EditInquiryForm';
import AddRemarks from './counselor/AddRemarks';
import EditConformation from './counselor/EditConformation';
import FileUploader from './student/UploadDocument';
import ViewDocuments from './student/ViewDocument';
import EditCounselorForm from './college/EditCounselorForm';
// import ContactUs from './components/ContactUs';

function App() {
  // const location = useLocation();
  const showNavbar = !["/landingpage", "/login", "/logout", "/masterlogin", "/masterlogout","/collegeregistrationform"].includes(location.pathname);



  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          {showNavbar &&  <Navbar />}
          <div className={`flex flex-col min-h-screen ${showNavbar ? "lg:ml-64" : ""}`}>
            {showNavbar && <Header />}
            <div className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/collegeregistrationform" element={<CollegeRegistrationForm />} />
                
                   {/* master dashboard  */}
                  <Route path="/masterdashboard" element={<MasterDashboard/>} />

                  <Route path="/mastercollegelist" element={<MasterCollegeList/>} />
                  <Route path="/mastercollegeform" element={<MasterCollegeForm/>} />

                  <Route path="/masterfacultylist" element={<MasterFacultyList/>} />
                  <Route path="/mastercounselorlist" element={<MasterCounselorList/>} />
                  <Route path="/mastercollegerequest" element={<MasterCollegeRequest/>} />
                  <Route path="/mastercontactdetails" element={<MasterContactDetails/>} />
                  <Route path="/masterlogin" element={<MasterLogin/>} />
                  <Route path="/masterlogout" element={<MasterLogout/>} />
                {/* college dashboard */}
                <Route path="/college" element={<CollegeDashboard />} />
                <Route path="/datatable" element={<DataTable />} />
                <Route path="/editinquiryform/:id" element={<EditInquiryForm />} />

                <Route path='/counselorlist' element={<CounselorData />} />
                <Route path='/counselorform' element={<CounselorForm />} />
                <Route path="/editcounselor/:id" element={<EditCounselorForm />} />


                <Route path='/facultylist' element={<Faculties />} />
                <Route path='/facultiesform' element={<FacultiesForm />} />
                          
                <Route path="/courseslist" element={<Courses />} />
                <Route path="/coursesform" element={<CoursesForm />} />

                <Route path="/brancheslist" element={<Branches />} />
                <Route path="/branchesform" element={<BranchesForm />} />

                {/* FacultyDashboard */}
                <Route path="/faculty" element={<FacultyDashboard />} />
                <Route path="/inquiryform" element={<InquiryForm />} />
               
                <Route path="/appointcounselor" element={<AppointCounselor />} />
                <Route path="/appointcounselorform/:id" element={<AppointCounselorForm />} />


                  {/* student dashboard  */}
                <Route path="/studentprofile" element={<StudentProfile />} />
                <Route path="/fileupload" element={<FileUploader />} />
                <Route path="/viewdocument" element={<ViewDocuments />} />
                  
             {/* counselor dashboard  */}
                <Route path="/counselor" element={<CounselorDashboard />} />
                <Route path="/inquiryconformation" element={<InquiryConformation />} />
                <Route path="/conformationform/:id" element={<ConformationForm />} />
                <Route path="/editconformation/:id" element={<EditConformation />} />
                <Route path="/demoinquiryconformation" element={<DemoForm />} />
                <Route path="/registration" element={<UserRegistrationForm />} />
                <Route path="/addremarks/:id" element={<AddRemarks />} />
              
                <Route path="/landingpage" element={<LandingPage />} />
                <Route path="/start" element={<Start />} />
                <Route path="/" element={<Navigate to="/landingpage" replace />} />
              </Routes>
            </div>
            {showNavbar && <Footer />}
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
