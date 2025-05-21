// <!-- input code here -->import React from 'react';

import { ArrowRight, ArrowUp, AwardIcon, MailIcon, MapPinIcon, Phone, Settings, Trophy, BookOpen, Users, CheckSquare, CheckCircle, Menu, } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import LOGO from '../img/ih-logo.png'
import illustration from '../img/illustration-1.webp'
import About5 from '../img/about-5.webp'
import About2 from '../img/about-2.webp'
import Feature1 from '../img/features-illustration-1.jpg'
import Feature2 from '../img/features-illustration-2.jpg'
import Feature3 from '../img/features-illustration-3.jpg'
import { FaChartArea, FaCircleArrowRight } from "react-icons/fa6";
import { LuBriefcaseBusiness } from "react-icons/lu";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LandingPage: React.FC = () => {
   
// delay 
 

useEffect(() => {
    // Auto refresh once when the page loads
    const hasRefreshed = sessionStorage.getItem('hasRefreshed');
    if (!hasRefreshed) {
      sessionStorage.setItem('hasRefreshed', 'true');
      window.location.reload();
    }
  }, []);

// delay end 

    // contact form 
    // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/contact-form', formData);
      setFormData({ name: '', email: '', subject: '', message: '' });
      toast.success('Thank you for contacting us!', {
        position: 'top-center',
        autoClose: 5000,
        
      });
       
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to send message. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

    
    // contact form end


    const [activeTab, setActiveTab] = useState("college");

    const handleTabClick = (tab: SetStateAction<string>) => {
        setActiveTab(tab);
    };


    // FAQ 
    const [activeIndex, setActiveIndex] = useState<number | null>(null);


    const faqData = [
        {
            question: "What is Inquiry Handler?",
            answer: "Inquiry Handler is a user-friendly platform designed to simplify college admissions by connecting colleges, faculty, and counselors. It streamlines the inquiry process and ensures personalized support with real-time responses.",
        },
        {
            question: "How does Inquiry Handler streamline the inquiry process?",
            answer: "Inquiry Handler provides a structured process that efficiently manages inquiries. It tracks inquiries in real-time, improves communication, and simplifies the admissions journey for all stakeholders.",
        },
        {
            question: "Who can use Inquiry Handler?",
            answer: "Inquiry Handler is designed for colleges, faculty, and counselors. It helps colleges manage inquiries, enables faculty to allocate them, and allows counselors to verify and respond efficiently.",
        },
        {
            question: "What features make Inquiry Handler unique?",
            answer: "Key features include: Streamlined inquiry process management, User-friendly interface, Efficient query handling, Enhanced communication, Transparent inquiry tracking, Simplified admissions process.",
        },
        {
            question: "How does Inquiry Handler enhance communication?",
            answer: "Inquiry Handler centralizes communication, ensuring seamless interactions between colleges, faculty, and counselors. It also enables real-time updates to inquiries for transparency and efficiency.",
        },
        {
            question: "Is Inquiry Handler easy to use?",
            answer: "Yes, Inquiry Handler is designed with a user-friendly interface that makes it easy for colleges, faculty, and counselors to navigate and use its features effectively.",
        }
    ];

    const toggleFAQ = (index: number | SetStateAction<null>) => {
        setActiveIndex(index === activeIndex ? null : index);
    };
    // FAQ end


    // animated counter 
    type CounterProps = {
        end: number;
        duration: number;
        label: string;
    };

    const Counter = ({ end, duration, label }: CounterProps) => {
        const [count, setCount] = useState<number>(0);

        useEffect(() => {
            let start = 0;
            const increment = end / (duration * 60);

            const counter = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(counter);
                } else {
                    setCount(Math.ceil(start));
                }
            }, 1000 / 60);

            return () => clearInterval(counter);
        }, [end, duration]);

        return (
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <span className="text-4xl font-bold text-gray-800">{count}</span>
                <p className="text-gray-600 mt-2">{label}</p>
            </div>
        );
    };
    // animated counter end



    //  mobile responsive header 
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };
    //  mobile responsive header end
    return (
        <>


            <header className="bg-white shadow-md fixed top-0 w-full z-50 rounded-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3">
                    {/* Logo */}
                    <a href="index.html" className="flex items-center space-x-2">
                        <img src={LOGO} alt="Logo" className="w-10 sm:w-12 md:w-14" />
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-6 text-gray-800">
                        {['Home', 'About', 'Features', 'How It Works', 'FAQ', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.replace(/\s+/g, '')}`}
                                className="hover:text-[#63589F] transition-colors duration-200"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>

                    {/* Right-side: Sign In + Hamburger */}
                    <div className="flex items-center space-x-4">
                        {/* Desktop Sign In */}
                        <a
                            href="/login"
                            className="hidden md:flex items-center bg-[#63589F] text-white px-4 py-2 rounded-lg hover:bg-[#a39bd1] transition-colors duration-200"
                        >
                            <ArrowRight className="w-5 h-5 mr-2" />
                            <span>Sign In</span>
                        </a>

                        {/* Mobile Menu Toggle */}
                        <button className="md:hidden text-black focus:outline-none" onClick={toggleMobileMenu}>
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="bg-white shadow-md md:hidden px-4 py-4 transition-all duration-300 ease-in-out">
                        <ul className="space-y-4 text-gray-800">
                            {['Home', 'About', 'Features', 'How It Works', 'FAQ', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a href={`#${item.replace(/\s+/g, '')}`} className="hover:text-[#63589F]">
                                        {item}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a
                                    href="/login"
                                    className="block bg-[#63589F] text-white px-4 py-2 rounded-lg hover:bg-[#a39bd1] transition-colors duration-200"
                                >
                                    <ArrowRight className="w-5 h-5 inline-block mr-2" />
                                    <span>Sign In</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </header>


            <main className="main">
                {/* Hero Section */}
                <section id="Home" className="bg-white py-16">
                    <div className="container mx-auto px-4" data-aos="fade-up" data-aos-delay={100}>
                        <div className="flex flex-wrap items-center">
                            <div className="lg:w-1/2 w-full mb-8 lg:mb-0">
                                <div className="space-y-4" data-aos="fade-up" data-aos-delay={200}>
                                    <div className="text-[#63589F]  flex items-center space-x-2 mb-4">

                                        <Settings />
                                        <span className="text-lg font-semibold">
                                            Streamline Your College Admissions, Effortlessly.
                                        </span>
                                    </div>
                                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                                        Welcome to <br />
                                        <span className="text-[#63589F] ">Inquiry Handler</span>
                                    </h1>
                                    <p className="text-gray-600 mb-6">
                                        Inquiry Handler streamlines college admissions inquiries by connecting colleges,
                                        faculty, and counselors, ensuring a seamless experience for prospective students.
                                    </p>
                                    <div className="space-x-4">
                                        <a
                                            href="/collegeregistrationform"
                                            className="bg-[#63589F]  text-white px-6 py-3 rounded-lg hover:bg-[#a39bd1] transition"
                                        >
                                            Register Your College Now!!!
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:w-1/2 w-full">
                                <div className="overflow-hidden rounded-lg     w-full max-w-md" data-aos="zoom-out" data-aos-delay={300}>
                                    <img
                                        src={illustration}
                                        alt="Hero Image"
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12" data-aos="fade-up" data-aos-delay={500}>
                            <div className="p-4 bg-white rounded-lg   flex items-center space-x-4 transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out">
                                <Trophy className="text-[#63589F] w-16 h-16  " /> {/* Bounce Animation */}
                                <div>
                                    <h4 className="text-lg font-semibold">15x Colleges Connected</h4>
                                    <p className="text-gray-600">Streamlining admissions inquiries effortlessly</p>
                                </div>
                            </div>

                            <div className="p-4 bg-white rounded-lg   flex items-center space-x-4 transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out">
                                <LuBriefcaseBusiness className="text-[#63589F] w-16 h-16  " /> {/* Slow Spin */}
                                <div>
                                    <h4 className="text-lg font-semibold">12k Inquiries Handled</h4>
                                    <p className="text-gray-600">Ensuring real-time responses and support</p>
                                </div>
                            </div>

                            <div className="p-4 bg-white rounded-lg   flex items-center space-x-4 transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out">
                                <FaChartArea className="text-[#63589F] w-16 h-16  " /> {/* Pulse Animation */}
                                <div>
                                    <h4 className="text-lg font-semibold">50k Students Engaged</h4>
                                    <p className="text-gray-600">Personalized guidance for better decisions</p>
                                </div>
                            </div>

                            <div className="p-4 bg-white rounded-lg   flex items-center space-x-4 transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out">
                                <AwardIcon className="text-[#63589F] w-16 h-16  " /> {/* Bounce Animation */}
                                <div>
                                    <h4 className="text-lg font-semibold">20x Faculty Assisted</h4>
                                    <p className="text-gray-600">Organizing and tracking inquiries seamlessly</p>
                                </div>
                            </div>
                        </div>


                    </div>
                </section>


                {/* About Section */}
                <section id="About" className="py-16 bg-white">
                    <div className="container mx-auto px-4" data-aos="fade-up" data-aos-delay={100}>
                        <div className="flex flex-wrap items-center justify-between gap-8">
                            <div className="xl:w-2/5 w-full space-y-4" data-aos="fade-up" data-aos-delay={200}>
                                <span className="text-[#63589F] text-lg font-semibold">MORE ABOUT US</span>
                                <h2 className="text-3xl font-bold text-gray-800">Inquiry Handler</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Inquiry Handler simplifies college admissions by connecting colleges, faculty, and counselors, ensuring a
                                    seamless experience for students. Its user-friendly platform efficiently manages inquiries with real-time
                                    responses and personalized support. It enhances communication, tracks inquiries, and leverages technology to
                                    make the admissions process more transparent and accessible.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <ul className="space-y-3">
                                        <li className="flex items-center">
                                            {/* <i className="bi bi-arrow-right-circle-fill text-blue-600 text-xl mr-2" /> */}
                                            <FaCircleArrowRight className="text-xl mr-2 text-[#63589F]" />
                                            Streamlined Inquiry Process
                                        </li>
                                        <li className="flex items-center">
                                            <FaCircleArrowRight className="text-xl mr-2 text-[#63589F]" />
                                            User-Friendly Interface
                                        </li>
                                        <li className="flex items-center">
                                            <FaCircleArrowRight className="text-xl mr-2 text-[#63589F]" />
                                            Efficient Query Handling
                                        </li>
                                    </ul>
                                    <ul className="space-y-3">
                                        <li className="flex items-center">
                                            <FaCircleArrowRight className="text-xl mr-2 text-[#63589F]" />
                                            Enhanced Communication
                                        </li>
                                        <li className="flex items-center">
                                            <FaCircleArrowRight className="text-xl mr-2 text-[#63589F]" />
                                            Inquiry Tracking Easily
                                        </li>
                                        <li className="flex items-center">
                                            <FaCircleArrowRight className="text-xl mr-2 text-[#63589F]" />
                                            Simplified Admissions Process
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="xl:w-1/2 w-full" data-aos="fade-up" data-aos-delay={300}>
                                <div className="relative flex gap-4" data-aos="zoom-out" data-aos-delay={400}>
                                    <img
                                        src={About5}
                                        alt="Business Meeting"
                                        className="rounded-lg   w-full md:w-3/4 h-auto"
                                    />
                                    <img
                                        src={About2}
                                        alt="Team Discussion"
                                        className="rounded-lg  w-24 sm:w-32 md:w-36 h-auto absolute top-10 -left-10 md:right-10"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </section>


                {/* Features Section */}
                <section id="Features" className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Features</h2>
                    </div>

                    <div className="container mx-auto px-4">
                        {/* Tab Navigation */}
                        <div className="flex justify-center mb-8">
                            <ul className="flex flex-wrap border-b border-gray-300">
                                <li>
                                    <button
                                        className={`inline-block py-2 px-6 text-gray-700 hover:text-[#63589F] ${activeTab === "college" ? "text-[#63589F] border-b-2 border-[#63589F]" : ""
                                            }`}
                                        onClick={() => handleTabClick("college")}
                                    >
                                        College
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`inline-block py-2 px-6 text-gray-700 hover:text-[#63589F] ${activeTab === "faculty" ? "text-[#63589F] border-b-2 border-[#63589F]" : ""
                                            }`}
                                        onClick={() => handleTabClick("faculty")}
                                    >
                                        Faculty
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`inline-block py-2 px-6 text-gray-700 hover:text-[#63589F] ${activeTab === "counselors" ? "text-[#63589F] border-b-2 border-[#63589F]" : ""
                                            }`}
                                        onClick={() => handleTabClick("counselors")}
                                    >
                                        Counselors
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Tab Content */}
                        <div className="tab-content">
                            {activeTab === "college" && (
                                <div className="flex flex-col lg:flex-row gap-8 items-center">
                                    <div className="lg:w-1/2 order-1 space-y-4">
                                        <h3 className="text-2xl font-bold">For Colleges</h3>
                                        <p className="text-gray-600 italic">
                                            Empowering institutions to manage their admissions process seamlessly.
                                        </p>
                                        <ul className="space-y-3">
                                            <li className="flex items-start">
                                                <span className="text-[#63589F] text-xl mr-2">➔</span>
                                                <span>
                                                    <strong>Manage Faculty and Counselors</strong> – Easily add, remove, and oversee your team with role-based access and performance tracking.
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-[#63589F] text-xl mr-2">➔</span>
                                                <span>
                                                    <strong>Dashboard Overview</strong> – Get a centralized view of all inquiries, track progress, and monitor counselor performance with real-time updates.
                                                </span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="lg:w-1/2 order-2 text-center">
                                        <img
                                            src={Feature1}
                                            alt="For Colleges"
                                            className="rounded-lg w-full max-w-md"
                                        />
                                    </div>
                                </div>

                            )}

                            {activeTab === "faculty" && (
                                <div className="flex flex-col lg:flex-row gap-8 items-center">
                                    <div className="lg:w-1/2 order-2 lg:order-1 space-y-4">
                                        <h3 className="text-2xl font-bold">For Faculty</h3>
                                        <p className="text-gray-600 italic">
                                            Efficient tools to handle and allocate student inquiries.
                                        </p>
                                        <ul className="space-y-3">
                                            <li className="flex items-start">
                                                <span className="text-[#63589F] text-xl mr-2">➔</span>
                                                <span>
                                                    <strong>Inquiry Form Submission</strong> – Submit structured inquiry forms with detailed student information and required documentation.
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-[#63589F] text-xl mr-2">➔</span>
                                                <span>
                                                    <strong>Allocate Inquiries</strong> – Assign inquiries to the right counselors based on workload, expertise, and student preferences.
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="lg:w-1/2 order-1 lg:order-2 text-center">
                                        <img
                                            src={Feature2}
                                            alt="For Faculty"
                                            className="rounded-lg  w-full max-w-md"
                                        />
                                    </div>
                                </div>

                            )}

                            {activeTab === "counselors" && (
                                <div className="flex flex-col lg:flex-row gap-8 items-center">
                                    <div className="lg:w-1/2 order-2 lg:order-1 space-y-4">
                                        <h3 className="text-2xl font-bold">For Counselors</h3>
                                        <p className="text-gray-600 italic">
                                            Helping counselors provide accurate guidance to students.
                                        </p>
                                        <ul className="space-y-3">
                                            <li className="flex items-start">
                                                <span className="text-[#63589F] text-xl mr-2">➔</span>
                                                <span>
                                                    <strong>Verify Student Information</strong> – Ensure the accuracy of student data by cross-checking submitted details and validating credentials.
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-[#63589F] text-xl mr-2">➔</span>
                                                <span>
                                                    <strong>Status Management</strong> – Seamlessly update inquiry statuses, track progress, and provide timely updates to students.
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="lg:w-1/2 order-1 lg:order-2 text-center">
                                        <img
                                            src={Feature3}
                                            alt="For Counselors"
                                            className="rounded-lg  w-full max-w-md"
                                        />
                                    </div>
                                </div>

                            )}
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="HowItWorks" className="bg-gray-100 py-16">
                    <div className="container mx-auto px-4 text-center mb-8" data-aos="fade-up">
                        <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
                    </div>
                    <div id="features-cards">
                        <div className="container mx-auto px-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                                <div className="bg-orange-100 p-6 rounded-lg shadow-lg text-center" data-aos="zoom-in" data-aos-delay={100}>
                                    {/* <i className="bi bi-journal-text text-orange-500 text-4xl mb-4"></i> */}
                                    <BookOpen className="text-orange-500 text-4xl mb-4" />
                                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Faculty Submits Inquiry</h4>
                                    <p className="text-gray-600">
                                        Faculty members fill out and submit detailed inquiry forms with all necessary information.
                                    </p>
                                </div>

                                <div className="bg-blue-100 p-6 rounded-lg shadow-lg text-center" data-aos="zoom-in" data-aos-delay={200}>

                                    <Users className="text-blue-500 text-4xl mb-4" />
                                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Inquiry Allocation</h4>
                                    <p className="text-gray-600">
                                        Faculty assigns the submitted inquiries to designated counselors for further review.
                                    </p>
                                </div>

                                <div className="bg-green-100 p-6 rounded-lg shadow-lg text-center" data-aos="zoom-in" data-aos-delay={300}>

                                    <CheckSquare className="text-green-500 text-4xl mb-4" />

                                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Counselor Verification</h4>
                                    <p className="text-gray-600">
                                        Counselors review and verify the provided information to ensure data accuracy and completeness.
                                    </p>
                                </div>

                                <div className="bg-red-100 p-6 rounded-lg shadow-lg text-center" data-aos="zoom-in" data-aos-delay={400}>

                                    <CheckCircle className="text-red-500 text-4xl mb-4" />
                                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Status Updates</h4>
                                    <p className="text-gray-600">
                                        Counselors update the status of each inquiry (e.g., Pending, Verified, Resolved, or Closed) for transparency.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                {/* Stats Section */}
                <section id="stats" className="  py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                            <div className="w-full text-center p-4     rounded-lg">
                                <Counter end={1200} duration={1} label="Inquiries Managed" />
                            </div>
                            <div className="w-full text-center p-4     rounded-lg">
                                <Counter end={850} duration={1} label="Registrations Processed" />
                            </div>
                            <div className="w-full text-center p-4     rounded-lg">
                                <Counter end={5000} duration={1} label="Hours of Support" />
                            </div>
                            <div className="w-full text-center p-4     rounded-lg">
                                <Counter end={15} duration={1} label="Institutions Served" />
                            </div>
                        </div>
                    </div>
                </section>



                {/* FAQ Section */}
                <section id="FAQ" className="bg-gray-100 py-12">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">FAQ</h2>

                        {/* Grid Layout for FAQ */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Side: Introduction */}
                            <div className="col-span-1">
                                <h1 className="text-xl font-semibold text-gray-800 mb-4">Have a question? Check out the FAQ</h1>
                                <p className="text-black">
                                    Inquiry Handler simplifies the admissions process by offering efficient inquiry
                                    management, enhanced communication, and real-time support. Below are answers to
                                    common questions about how it works.
                                </p>
                                <div
                                    className="hidden lg:block"
                                    data-aos="fade-up"
                                    data-aos-delay="200"
                                >
                                    <svg
                                        className="text-[#63589F] w-48 h-52"
                                        viewBox="0 0 200 211"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M198.804 194.488C189.279 189.596 179.529 185.52 169.407 182.07L169.384 182.049C169.227 181.994 169.07 181.939 168.912 181.884C166.669 181.139 165.906 184.546 167.669 185.615C174.053 189.473 182.761 191.837 189.146 195.695C156.603 195.912 119.781 196.591 91.266 179.049C62.5221 161.368 48.1094 130.695 56.934 98.891C84.5539 98.7247 112.556 84.0176 129.508 62.667C136.396 53.9724 146.193 35.1448 129.773 30.2717C114.292 25.6624 93.7109 41.8875 83.1971 51.3147C70.1109 63.039 59.63 78.433 54.2039 95.0087C52.1221 94.9842 50.0776 94.8683 48.0703 94.6608C30.1803 92.8027 11.2197 83.6338 5.44902 65.1074C-1.88449 41.5699 14.4994 19.0183 27.9202 1.56641C28.6411 0.625793 27.2862 -0.561638 26.5419 0.358501C13.4588 16.4098 -0.221091 34.5242 0.896608 56.5659C1.8218 74.6941 14.221 87.9401 30.4121 94.2058C37.7076 97.0203 45.3454 98.5003 53.0334 98.8449C47.8679 117.532 49.2961 137.487 60.7729 155.283C87.7615 197.081 139.616 201.147 184.786 201.155L174.332 206.827C172.119 208.033 174.345 211.287 176.537 210.105C182.06 207.125 187.582 204.122 193.084 201.144C193.346 201.147 195.161 199.887 195.423 199.868C197.08 198.548 193.084 201.144 195.528 199.81C196.688 199.192 197.846 198.552 199.006 197.935C200.397 197.167 200.007 195.087 198.804 194.488ZM60.8213 88.0427C67.6894 72.648 78.8538 59.1566 92.1207 49.0388C98.8475 43.9065 106.334 39.2953 114.188 36.1439C117.295 34.8947 120.798 33.6609 124.168 33.635C134.365 33.5511 136.354 42.9911 132.638 51.031C120.47 77.4222 86.8639 93.9837 58.0983 94.9666C58.8971 92.6666 59.783 90.3603 60.8213 88.0427Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>

                            </div>

                            {/* Right Side: FAQ Questions */}
                            <div className="col-span-1 lg:col-span-2 space-y-4">
                                {faqData.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
                                        onClick={() => toggleFAQ(index)}
                                    >
                                        <h3 className="text-lg font-medium text-gray-800 flex justify-between">
                                            {item.question}
                                            <span className="text-gray-500">
                                                {activeIndex === index ? "-" : "+"}
                                            </span>
                                        </h3>
                                        {activeIndex === index && (
                                            <div className="mt-2 text-gray-600">
                                                <p>{item.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>



                {/* Call To Action Section */}
                <section id="call-to-action-2" className="bg-[#63589F] text-white py-12">
                    <div className="container mx-auto px-4">
                        <div
                            className="flex flex-wrap justify-center"
                            data-aos="zoom-in"
                            data-aos-delay={100}
                        >
                            <div className="xl:w-4/5 w-full px-4">
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold mb-4">
                                        Register Free for Your College
                                    </h3>
                                    <p className="mb-6 text-gray-300">
                                        Experience the power of our system and save your precious time.
                                        Register now and streamline your college admissions process effortlessly!
                                    </p>
                                    <a
                                        className="bg-white text-black hover:text-white px-6 py-3 rounded-md hover:bg-[#a39bd1] transition duration-300"
                                        href="/collegeregistrationform"
                                    >
                                        Register Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="Contact" className="bg-gray-100 py-12">
                    <div className="container mx-auto px-4 text-center" data-aos="fade-up">
                        <h2 className="text-3xl font-bold mb-4">Contact</h2>
                        <p className="text-gray-600 mb-8">
                            Reach out to us for any college admission-related inquiries or assistance.
                        </p>
                    </div>

                    <div className="container mx-auto px-4" data-aos="fade-up" data-aos-delay={100}>
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Contact Info */}
                            <div className="lg:w-2/5 w-full">
                                <div className="bg-[#63589F] p-6 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay={200}>
                                    <h3 className="text-xl text-white font-semibold mb-4">Contact Info</h3>
                                    <p className="text-white mb-6">
                                        We're here to assist you with all your college admission inquiries. Feel free to get in touch with us.
                                    </p>

                                    <div className="mb-4 flex items-start" data-aos="fade-up" data-aos-delay={300}>
                                        <div className="text-white text-2xl mr-4">
                                            {/* <i className="bi bi-geo-alt" /> */}
                                            <MapPinIcon />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">Our Location</h4>
                                            <p className="text-white">905, Shalin Complex, Sector 11,</p>
                                            <p className="text-white">Gandhinagar, Gujarat - 382011, India</p>
                                        </div>
                                    </div>

                                    <div className="mb-4 flex items-start" data-aos="fade-up" data-aos-delay={400}>
                                        <div className="text-white text-2xl mr-4">

                                            <Phone />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">Phone Number</h4>
                                            <p className="text-white">+91 93277 48151</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start" data-aos="fade-up" data-aos-delay={500}>
                                        <div className="text-white text-2xl mr-4">
                                            {/* <i className="bi bi-envelope" /> */}
                                            <MailIcon />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">Email Address</h4>
                                            <p className="text-white">info@inquiryhandler.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="lg:w-3/5 w-full">
                            <ToastContainer />
                                <div className="bg-white p-6 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay={300}>
                                    <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
                                    <p className="text-gray-600 mb-6">
                                        Have a question? Fill out the form below, and we'll get back to you as soon as possible.
                                    </p>

                                    <form onSubmit={handleSubmit}>
                                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Your Name"
                                                required
                                            />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Your Email"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Subject"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows={4}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Message"
                                                required
                                            />
                                        </div>
                                        <div className="text-center">
                                            <button
                                                type="submit"
                                                className="bg-[#63589F] text-white px-6 py-3 rounded-md hover:bg-[#a39bd1] transition duration-300"
                                            >
                                                Send Message
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer id="footer" className="bg-[#63589F] text-white py-6">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
                        {/* Logo & Description */}
                        <div>
                            <a href="#" className="flex items-center mb-4">
                                <img src={LOGO} alt="Inquiry Handler Logo" className="h-12" />
                            </a>
                            <p className="text-justify text-white text-sm md:text-base">
                                Inquiry Handler simplifies college admissions by connecting colleges, faculty, and counselors, ensuring a seamless experience for students. Its user-friendly platform efficiently manages inquiries with real-time responses and personalized support.
                            </p>
                        </div>

                        {/* Useful Links */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
                            <ul className="space-y-2">
                                <li><a href="#home" className="hover:text-teal-400">Home</a></li>
                                <li><a href="#about" className="hover:text-teal-400">About Us</a></li>
                                <li><a href="#faq" className="hover:text-teal-400">FAQ</a></li>
                                <li><a href="#privacy-policy" className="hover:text-teal-400">Privacy Policy</a></li>
                            </ul>
                        </div>

                        {/* Contact Us */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                            <div className="space-y-2 text-white text-sm md:text-base">
                                <p>905, Shalin Complex</p>
                                <p>Sector 11, Gandhinagar, Gujarat - 382011, India</p>
                                <p className="mt-3"><strong>Phone:</strong> +91 93277 48151</p>
                                <p><strong>Email:</strong> info@techcreaturesolution.com</p>
                            </div>
                        </div>

                        {/* Register Now */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Register Now</h4>
                            <a href="/collegeregistrationform" className="inline-block bg-white text-black hover:text-white py-2 px-4 rounded-md hover:bg-[#a39bd1]">
                                Join Us Now
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="container mx-auto px-4 mt-8 text-center border-t border-white pt-4">
                    <p className="text-white text-sm md:text-base">
                        © <span className="font-bold">Inquiry Handler</span> All Rights Reserved
                    </p>
                    <div className="mt-2">
                        Designed by
                        <a href="https://www.techcreaturesolution.com/" className="text-teal-400 ml-1 hover:underline">
                            Tech Creature Solution
                        </a>
                    </div>
                </div>
            </footer>




            <a
                href="#"
                id="scroll-top"
                className="fixed bottom-5 right-5 bg-[#63589F] text-white p-3 rounded-full shadow-lg hover:bg-[#a39bd1] flex items-center justify-center animate-bounce"
            >

                <ArrowUp />

            </a>

        </>
    );
};

export default LandingPage;