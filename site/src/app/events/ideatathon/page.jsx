'use client'
import Head from 'next/head';
import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  Download,
  ExternalLink,
  Clock,
  Target,
  Lightbulb,
  Zap,
  Star,
  Award,
  Mail,
  Phone,
  ChevronDown,
  Sparkles,
  Rocket,
  Brain,
  Heart,
  Leaf,
  GraduationCap,
  Building,
  Home,
  Upload,
  Video,
  FileText,
  Instagram,
  ArrowRight
} from 'lucide-react'

const IdeatathonPage = () => {

   const [isOpen, setIsOpen] = useState(false);

  const menuItems = ['About', 'Timeline', 'Prizes', 'Judges', 'Partners', 'Contact'];
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null;

  const judges = {
    Technology: [
      { name: "Divyam Kalra", role: "Co-founder of Humara Pandit| Ex ZX", linkedin: "https://www.linkedin.com/in/divyamkalra/", img: "/ideatathon/judges/divyam.jpg" },
      { name: "Vandana Chauhan", role: "Software Engineer @ Palo Alto Networks", linkedin: "https://www.linkedin.com/in/chvandana/", img: "/ideatathon/judges/vandana.jpg" },
      { name: "Rishabh Jain", role: "SWE-2 @ Goldman Sachs", linkedin: "https://www.linkedin.com/in/rishabhjain21/", img: "/ideatathon/judges/rishabh.jpg" },
      { name: "Abhinav Gambhir", role: "Global Lead IEEE HIZE | Ex Microsoft", linkedin: "https://www.linkedin.com/in/abhinavgambhir/", img: "/ideatathon/judges/abhinav.jpg" },
      { name: "Rishabh Raj", role: "Senior Associate - Cubastion", linkedin: "https://www.linkedin.com/in/rishabhraj2257/", img: "/ideatathon/judges/rishabhraj.jpg" }
    ],
    Entrepreneurship: [
      { name: "Aditya Sharma", role: "Co-founder of Humara Pandit | Ex ExxonMobil", linkedin: "https://www.linkedin.com/in/adityasharma08/", img: "/ideatathon/judges/aditya.jpg" }
    ],
    Healthcare: [
      { name: "Anamika M P", role: "Relations Manager CREDO | Mesa Founding Cohort 2.0", linkedin: "https://www.linkedin.com/in/anamikamp/", img: "/ideatathon/judges/anamika.jpg" }
    ],
    Environment: [
      { name: "Sidharth Sekhar", role: "AGM Strategy - FITSOL", linkedin: "https://www.linkedin.com/in/sidharth-sekhar/", img: "/ideatathon/judges/sidharth.jpg" }
    ],
    Education: [
      { name: "Parul Sharma", role: "Founder Aerie", linkedin: "https://www.linkedin.com/in/parul-sharma-aerie/", img: "/ideatathon/judges/parul.jpg" }
    ]
  }

  // New data arrays for Hosted By, Event Partner, and Platform Collaborator
  const hostedBy = [
    { name: "C Square", logo: "/ideatathon/csquare.jpg", url: "#" }
  ];

  const eventPartner = [
    { name: "Ascent Circle", logo: "/ideatathon/ascentcircle.png", url: "#" }
  ];

  const platformCollaborator = [
    { name: "Event Eye", logo: "/ideatathon/eventeye.png", url: "#" }
  ];

  const partners = [
    { name: "Devorious Technologies", ceo: "Harsahibjit Singh", logo: "/ideatathon/devo.png", url: "https://www.devorious.com/" },
    { name: "UNCLE Fab", ceo: "Nitesh Kumar", logo: "/ideatathon/unclefab.png", url: "https://www.unclefab.co/" },
    { name: "Biostack", ceo: "Mr. Sandeep Kumar", logo: "/ideatathon/biostack.png", url: "#" },
    { name: "Humara Pandit", ceo: "Divyam Kalra & Aditya Sharma", logo: "/ideatathon/humarapandit.png", url: "https://humarapandit.com/" },
    { name: "Bloc", ceo: "Rishabh", logo: "/ideatathon/bloc.png", url: "#" },
    { name: "Aerie Academy", ceo: "Parul Sharma", logo: "/ideatathon/aerie.png", url: "https://www.aerieacademy.com/" },
    { name: "Earthly Liquids", ceo: "Rupanshi Garg & Garvit Nama", logo: "/ideatathon/earthlyliquids.png", url: "#" },
    { name: "Lotus Multi-speciality Hospital", ceo: "Dr. Amit Sharma", logo: "/ideatathon/lotus.png", url: "https://www.lotushospital.co.in/" },
    { name: "Wave", ceo: "Aastha", logo: "/ideatathon/wave.png", url: "https://www.wave-length.in/" } // Added Wave Company
  ]
  
  const communityPartners = [
      { name: "Ascentia", secretary: "Rejinald Moses", logo: "/ideatathon/ascentia.png", url: "#" },
      { name: "Apex Techno Warriors", secretary: "Umang Dokania", logo: "/ideatathon/apex.png", url: "#" },
      { name: "CU Updates", secretary: "Ankul Kumar", logo: "/ideatathon/cuupdates.png", url: "#" },
  ];

  const rounds = [
    {
      round: 1,
      title: "Ideation Phase",
      icon: <FileText/>,
      dates: "13 Jul - 06 Aug",
      color: "blue"
    },
    {
      round: 2,
      title: "Ideation To Reality",
      icon: <Video/>,
      dates: "08 Aug - 12 Aug",
      color: "purple"
    },
    {
      round: 3,
      title: "Grand Finale",
      icon: <Trophy/>,
      dates: "19 Aug 2025",
      color: "pink"
    }
  ];

  const participationRules = [
    "Submit a video (max 3 min)",
    "Include: Problem statement received, Your proposed solution, Feasibility & real-world use",
    "Judging: Clarity, presentation, confidence & communication",
    "Format: MP4 / MOV / YouTube/Drive link (view access ON)"
  ]

  const FloatingParticles = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )

  const GlowingOrb = ({ className, delay = 0 }) => (
    <motion.div
      className={`absolute rounded-full blur-xl ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
      }}
    />
  )



  return (
    <>
    <Head>
      <title>Ideat-a-thon 2025 | Innovation Challenge by Tamboo Baba at Chandigarh University</title>
      <meta name="description" content="Ignite, Innovate, Impact with Ideat-a-thon 2025! India's boldest innovation challenge by Tamboo Baba at Chandigarh University. Compete across AI, Entrepreneurship, Healthcare, Environment, and Education tracks for ₹1,00,000+ in prizes." />
      {/* Open Graph Tags for Social Sharing */}
      <meta property="og:title" content="Ideat-a-thon 2025 | Innovation Challenge by Tamboo Baba" />
      <meta property="og:description" content="Ignite, Innovate, Impact with Ideat-a-thon 2025! India's boldest innovation challenge by Tamboo Baba at Chandigarh University. Compete across 5 tracks for ₹1,00,000+ in prizes." />
      <meta property="og:image" content="https://tamboobaba.com/logo.png" /> {/* Replace with your actual image URL */}
      <meta property="og:url" content="https://tamboobaba.com/events/ideatathon" /> {/* Replace with your actual page URL */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Tamboo Baba" />
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Ideat-a-thon 2025 | Innovation Challenge by Tamboo Baba" />
      <meta name="twitter:description" content="Ignite, Innovate, Impact with Ideat-a-thon 2025! India's boldest innovation challenge by Tamboo Baba at Chandigarh University. Compete across 5 tracks for ₹1,00,000+ in prizes." />
      <meta name="twitter:image" content="https://tamboobaba.com/logo.png" /> {/* Replace with your actual image URL */}
      {/* Schema Markup (JSON-LD) */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "Event",
          "name": "Ideat-a-thon 2025",
          "startDate": "2025-XX-XXT09:00:00+05:30", // Replace with actual date and time
          "endDate": "2025-XX-XXT09:00:00+05:30",   // Replace with actual date and time
          "eventStatus": "https://schema.org/EventScheduled",
          "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
          "location": {
            "@type": "Place",
            "name": "Chandigarh University",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "NH-5, Chandigarh-Ludhiana Hwy",
              "addressLocality": "Mohali",
              "addressRegion": "Punjab",
              "postalCode": "140413",
              "addressCountry": "IN"
            }
          },
          "image": [
            "https://tamboobaba.com/logo.png" // Replace with your actual image URL
          ],
          "description": "India's boldest innovation challenge by Tamboo Baba at Chandigarh University, focusing on AI, Entrepreneurship, Healthcare, Environment, and Education.",
          "offers": {
            "@type": "Offer",
            "name": "Registration",
            "url": "https://unstop.com/o/DISMc2C?lb=Rljx3SsD&utm_medium=Share&utm_source=shortUrl",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock"
          },
          "organizer": {
            "@type": "Organization",
            "name": "Tamboo Baba",
            "url": "https://tamboobaba.com"
          }
        }
        `}
      </script>
    </Head>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-hidden pt-5">
      <FloatingParticles />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Tamboo Baba
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              {menuItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Register Button */}
            <a
              href="#konfhubpayment"
              className="hidden md:inline px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-sm font-semibold hover:scale-105 transition-transform glow hover-glow"
            >
              Enroll for Second Round
            </a>

            {/* Hamburger Icon */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu (dropdown) */}
        {isOpen && (
          <div className="md:hidden px-4 pb-4 bg-gray-900/90 border-t border-gray-800">
            <div className="flex flex-col gap-3">
              {menuItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  {item}
                </a>
              ))}
              <a
                href="#konfhubpayment"
                onClick={() => setIsOpen(false)}
                className="mt-3 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-sm font-semibold text-center hover:scale-105 transition-transform"
              >
                Enroll for Second Round
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <motion.section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-4 pt-16"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80" />

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.5 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <Sparkles className="absolute -top-4 -left-4 w-8 h-8 text-yellow-400 animate-pulse" />
              <Rocket className="w-20 h-20 mx-auto text-blue-400 animate-bounce" />
              <Zap className="absolute -bottom-4 -right-4 w-8 h-8 text-purple-400 animate-pulse" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            Ideat-a-thon 2025
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-2xl md:text-3xl font-bold mb-8 text-gray-300"
          >
            Ignite. Innovate. Impact.
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            India's boldest innovation challenge is here! Hosted at Chandigarh University and proudly organized by{" "}
            <a href="https://tamboobaba.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-bold hover:underline">
              Tamboo Baba
            </a>, Ideat-a-thon is a stage for revolutionary ideas solving real-world challenges.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.a
              href="#konfhubpayment"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-bold text-lg overflow-hidden transform transition-all duration-300 hover:scale-105 glow hover-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Enroll for Second Round <ExternalLink className="w-5 h-5" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>

            <motion.a
              href="https://unstop.com/hackathons/ideat-a-thon-chandigarh-university-1510924"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 border-2 border-gray-600 rounded-full font-bold text-lg hover:border-blue-400 transition-all duration-300 flex items-center gap-2 hover-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Upload className="w-5 h-5" />
              Upload Video
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="mt-16"
          >
            <a href="#about" className="inline-block">
              <ChevronDown className="w-8 h-8 mx-auto animate-bounce text-gray-400 hover:text-blue-400 transition-colors" />
            </a>
          </motion.div>
        </div>
      </motion.section>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* About Section */}
        <motion.section
          id="about"
          className="mb-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              About the Event
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Ideat-a-thon 2025 is a national innovation sprint inviting India's brightest problem-solvers
              to compete and collaborate for 24 hours of non-stop creativity and impact.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover-glow"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <MapPin className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Venue</h3>
              <p className="text-gray-300">Chandigarh University</p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover-glow"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Users className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Organized By</h3>
              <p className="text-gray-300">
                <a href="https://tamboobaba.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-bold hover:underline">
                  Tamboo Baba
                </a>
              </p>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Target className="w-8 h-8" />, title: "5 Diverse Problem Tracks", color: "text-blue-400" },
              { icon: <Lightbulb className="w-8 h-8" />, title: "Real-World Case-Based Challenges", color: "text-yellow-400" },
              { icon: <Users className="w-8 h-8" />, title: "Mentorship, Collaboration & Recognition", color: "text-green-400" },
              { icon: <Trophy className="w-8 h-8" />, title: "Cash Prizes, Goodies & Certificates", color: "text-purple-400" }
            ].map((highlight, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/30 text-center hover-glow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <div className={`${highlight.color} mb-4 flex justify-center`}>
                  {highlight.icon}
                </div>
                <h4 className="font-semibold text-gray-200">{highlight.title}</h4>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Guidelines Section */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Guidelines for Round 2</h2>
            <p className="text-lg text-gray-400">Important rules for the video submission round</p>
          </div>

          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover-glow">
            <div className="grid md:grid-cols-2 gap-6">
              {participationRules.map((rule, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <Star className="w-4 h-4 text-white"/>
                  </div>
                  <p className="text-gray-300">{rule}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Timeline Section */}
        <motion.section
            id="timeline"
            className="mb-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Event Timeline</h2>
                <p className="text-lg text-gray-400">The Journey to the Grand Finale</p>
            </div>

            <motion.div 
                className="flex justify-between items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ staggerChildren: 0.3 }}
            >
                {rounds.map((round, index) => (
                    <React.Fragment key={round.round}>
                        <motion.div
                            className="flex flex-col items-center text-center w-1/4"
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className={`w-24 h-24 rounded-full bg-gradient-to-br from-${round.color}-500/20 to-${round.color}-500/10 border-2 border-${round.color}-500 flex items-center justify-center mb-4`}>
                                <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-${round.color}-500 to-${round.color}-700 flex items-center justify-center text-white text-3xl shadow-lg shadow-${round.color}-500/30`}>
                                    {round.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white">{round.title}</h3>
                            <p className={`font-semibold text-sm text-${round.color}-400`}>{`Round ${round.round}`}</p>
                            <p className="text-gray-400 text-xs mt-2">{round.dates}</p>
                        </motion.div>
                        
                        {index < rounds.length - 1 && (
                            <motion.div 
                                className="flex-1 h-1 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700"
                                variants={{
                                    hidden: { scaleX: 0, opacity: 0 },
                                    visible: { scaleX: 1, opacity: 1 }
                                }}
                                style={{ transformOrigin: 'left' }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            />
                        )}
                    </React.Fragment>
                ))}
            </motion.div>
        </motion.section>

        {/* Prizes Section */}
        <motion.section
          id="prizes"
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Prizes & Rewards</h2>
            <p className="text-2xl font-bold text-yellow-400 mb-4">Total Prize Pool: ₹1,00,000+</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { position: "1st", prize: "₹40,000", icon: "🥇", color: "from-yellow-400 to-yellow-600" },
              { position: "2nd", prize: "₹20,000", icon: "🥈", color: "from-gray-300 to-gray-500" },
              { position: "3rd", prize: "₹10,000", icon: "🥉", color: "from-orange-400 to-orange-600" },
              { position: "Special", prize: "₹3,000", icon: "🗣️", color: "from-purple-400 to-purple-600", subtitle: "Orator's Crown" }
            ].map((prize, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${prize.color} p-6 rounded-2xl text-center text-white relative overflow-hidden hover-glow`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 10 }}
              >
                <div className="text-4xl mb-2">{prize.icon}</div>
                <h3 className="text-xl font-bold mb-1">{prize.position} Prize</h3>
                {prize.subtitle && <p className="text-sm opacity-90 mb-2">{prize.subtitle}</p>}
                <p className="text-2xl font-black">{prize.prize}</p>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full" />
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              className="bg-gradient-to-br from-green-500/20 to-blue-500/20 p-6 rounded-2xl border border-green-500/30 hover-glow"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Award className="w-6 h-6 text-green-400" />
                Additional Rewards
              </h4>
              <p className="text-gray-300">🎁 Goodies + Swag Kits for all finalists</p>
            </motion.div>
            
            <motion.div
              className="bg-gradient-to-br from-pink-500/20 to-orange-500/20 p-6 rounded-2xl border border-pink-500/30 hover-glow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                <a
                  href="https://www.instagram.com/tamboobaba?igsh=MWNtejh2Y2ZsOXI4bQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline"
                >
                  <Award className="w-6 h-6 text-pink-400" />
                  Insta Icon Award
                </a>
              </h4>
              <p className="text-gray-300">🏆 Recognition for creative social media presence.</p>
            </motion.div>


            <motion.div
              className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-2xl border border-purple-500/30 hover-glow"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Star className="w-6 h-6 text-purple-400" />
                Certificates
              </h4>
              <p className="text-gray-300">📜 Participation Certificates for all registered teams</p>
            </motion.div>
          </div>
        </motion.section>



        <motion.section 
          id="konfhubpayment" 
          className="mb-24 scroll-mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Register for Round 2
            </h2>
            <p className="text-lg text-gray-400">
              Secure your spot in the next phase of the Ideat-a-thon!
            </p>
            <p className="mt-4 text-red-400 font-semibold text-lg">
              ⚠️ Only shortlisted participants for Round 2 should proceed with payment.
            </p>
          </div>

          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-gray-700/50 shadow-lg shadow-purple-500/10">
            <iframe
              src="https://konfhub.com/widget/round-2-ideatathon?desc=true&ticketId=55586&secondaryBg=1F2937&isRTL=true&ticketBg=111827&borderCl=1F2937&bg=000000&fontColor=D1D5DB&ticketCl=60A5FA&btnColor=7C3AED&fontFamily=Prompt&borderRadius=10"
              id="konfhub-widget"
              title="Register for Round 2 Ideatathon"
              width="100%"
              height="500"
              style={{ border: 'none' }}
            ></iframe>
          </div>
        </motion.section>


        {/* Judges Section */}
        <motion.section
          id="judges"
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent pb-1">Judging Panel</h2>
            <p className="text-lg text-gray-400">Meet our esteemed judges across all tracks</p>
          </div>

          <div className="space-y-8">
            {Object.entries(judges).map(([track, trackJudges], trackIndex) => (
              <motion.div
                key={track}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover-glow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: trackIndex * 0.1 }}
              >
                <h3 className="text-2xl font-bold mb-6 text-center">{track} Track</h3>
                <div className={`grid ${trackJudges.length === 1 ? 'justify-center flex items-center lg:grid-cols-1' : 'lg:grid-cols-3'} md:grid-cols-2 gap-6`}>
                  {trackJudges.map((judge, index) => (
                    <motion.a
                      key={index}
                      href={judge.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 p-6 rounded-xl border border-gray-600/50 hover:border-blue-500/50 transition-all duration-300 group hover-glow"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 p-1">
                        <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                          <Image
                            src={judge.img}
                            alt={judge.name}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover rounded-full"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${judge.name.split(' ')[0]}+${judge.name.split(' ')[1]}&background=random&color=fff&size=128`
                            }}
                          />
                        </div>
                      </div>
                      <h4 className="font-bold text-center mb-2 group-hover:text-blue-400 transition-colors">{judge.name}</h4>
                      <p className="text-sm text-gray-400 text-center">{judge.role}</p>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover-glow">
            <h3 className="text-2xl font-bold mb-6 text-center">Judging Criteria</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { criteria: "Innovation & Originality", percentage: "30%", color: "text-blue-400" },
                { criteria: "Feasibility & Implementation", percentage: "20%", color: "text-green-400" },
                { criteria: "Societal Impact & Scalability", percentage: "30%", color: "text-purple-400" },
                { criteria: "Presentation Quality", percentage: "20%", color: "text-yellow-400" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`text-3xl font-bold ${item.color} mb-2`}>{item.percentage}</div>
                  <p className="text-gray-300 text-sm">{item.criteria}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Event Lead Section */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Event Lead</h2>
            <p className="text-lg text-gray-400">Leading this incredible innovation journey</p>
          </div>

          <motion.div
            className="max-w-md mx-auto bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 text-center hover-glow"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
          >
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 p-1">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <Image
                  src="/ideatathon/ansh.png"
                  alt="Ansh Malhotra"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=Ansh+Malhotra&background=random&color=fff&size=128`
                  }}
                />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Ansh Malhotra</h3>
            <p className="text-gray-400 mb-4">Event Lead & Organizer</p>
            <div className="flex justify-center space-x-4">
              <motion.a
                href="https://in.linkedin.com/in/ansh-malhotra-748700293"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover-glow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </motion.section>

        {/* Hosted By Section - Vertical Layout */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Hosted By
              </h2>
              <p className="text-lg text-gray-400">C Square Chandigarh University</p>
            </div>

            {/* Spacer */}
            <div className="h-8"></div>

            {/* Logo Card */}
            <motion.div
              className="p-8 rounded-xl border border-gray-800 hover:border-gray-600 transition-all duration-300 bg-[#111827] text-center group w-full max-w-xs"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.04, y: -5 }}
            >
              <a
                href="https://in.linkedin.com/company/csquare-club"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden bg-gray-900 flex items-center justify-center p-2">
                  <Image
                    src="/ideatathon/csquare.png"
                    alt="C Square logo"
                    width={80}
                    height={80}
                    className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="font-bold text-xl text-white group-hover:text-blue-400 transition-colors">
                  C Square
                </h3>
              </a>
            </motion.div>
          </div>
        </motion.section>
        
        {/* Event Partner Section */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
                Event Partner
              </h2>
              <p className="text-lg text-gray-400">Ascent Circle</p>
            </div>

            {/* Spacer */}
            <div className="h-8"></div>

            {/* Logo Card */}
            <motion.div
              className="p-8 rounded-xl border border-gray-800 hover:border-gray-600 transition-all duration-300 bg-[#111827] text-center group w-full max-w-xs"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.04, y: -5 }}
            >
              <a
                href="https://ascentcircle.web.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden bg-gray-900 flex items-center justify-center p-2">
                  <Image
                    src="/ideatathon/ascentcircle.png"
                    alt="Ascent Circle logo"
                    width={80}
                    height={80}
                    className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="font-bold text-xl text-white group-hover:text-red-400 transition-colors">
                  Ascent Circle
                </h3>
              </a>
            </motion.div>
          </div>
        </motion.section>

        {/* Platform Collaborator Section */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Platform Collaborator
              </h2>
              <p className="text-lg text-gray-400">EventEye</p>
            </div>

            {/* Spacer */}
            <div className="h-8"></div>

            {/* Logo Card */}
            <motion.div
              className="p-8 rounded-xl border border-gray-800 hover:border-gray-600 transition-all duration-300 bg-[#111827] text-center group w-full max-w-xs"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.04, y: -5 }}
            >
              <a
                href="https://www.eventeye.in/events/ideatathon-chandigarh-university-2025"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden bg-gray-900 flex items-center justify-center p-2">
                  <Image
                    src="/ideatathon/eventeye.png"
                    alt="EventEye logo"
                    width={80}
                    height={80}
                    className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="font-bold text-xl text-white group-hover:text-green-400 transition-colors">
                  Eventeye
                </h3>
              </a>
            </motion.div>
          </div>
        </motion.section>
        
        {/* Community Partners Section */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
              Community Partners
            </h2>
            <p className="text-lg text-gray-400">Our wonderful community collaborators</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
            {communityPartners.map((partner, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl border border-gray-800 hover:border-gray-600 transition-all duration-300 bg-[#111827] text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.04, y: -5 }}
              >
                <a href={partner.url} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden bg-gray-900 flex items-center justify-center">
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        width={64}
                        height={64}
                        className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${partner.name.split(' ')[0]}&background=random&color=fff&size=64`;
                        }}
                      />
                    </div>
                    <h3 className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors">
                      {partner.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">Secretary: {partner.secretary}</p>
                  </a>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Partners Section (now "Supported By") */}
        <motion.section
          id="partners"
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">
              Supported By
            </h2>
            <p className="text-lg text-gray-400">Our amazing partners who make this event possible</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-xl border ${
                  partner.name === "Devorious Technologies"
                    ? 'border-blue-500/40 shadow-md shadow-blue-500/30'
                    : 'border-gray-800 hover:border-gray-600'
                } transition-all duration-300 bg-[#111827] text-center group`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.04, y: -5 }}
              >
                {partner.url !== "#" ? (
                  <a href={partner.url} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden bg-gray-900 flex items-center justify-center">
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        width={64}
                        height={64}
                        className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${partner.name.split(' ')[0]}&background=random&color=fff&size=64`;
                        }}
                      />
                    </div>
                    <h3 className={`font-bold text-sm ${
                      partner.name === "Devorious Technologies"
                        ? 'text-blue-400'
                        : 'text-white group-hover:text-blue-400'
                    } transition-colors`}>
                      {partner.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">CEO: {partner.ceo}</p>
                  </a>
                ) : (
                  <>
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden bg-gray-900 flex items-center justify-center">
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        width={64}
                        height={64}
                        className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${partner.name.split(' ')[0]}&background=random&color=fff&size=64`;
                        }}
                      />
                    </div>
                    <h3 className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors">
                      {partner.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">CEO: {partner.ceo}</p>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Registration Links Section */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Get Started</h2>
            <p className="text-lg text-gray-400">Everything you need to participate</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.a
              href="#konfhubpayment"
              className="group bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-8 rounded-2xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 text-center hover-glow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Users className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Enroll for Second Round</h3>
              <p className="text-gray-400 mb-4">Join the innovation challenge</p>
              <ExternalLink className="w-5 h-5 mx-auto text-blue-400" />
            </motion.a>

            <motion.a
              href="https://unstop.com/hackathons/ideat-a-thon-chandigarh-university-1510924"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-green-600/20 to-emerald-600/20 p-8 rounded-2xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300 text-center hover-glow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Video className="w-12 h-12 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Upload Video</h3>
              <p className="text-gray-400 mb-4">Submit your video for Round 2</p>
              <ExternalLink className="w-5 h-5 mx-auto text-green-400" />
            </motion.a>

            <motion.a
              href="/ideatathon/IDEAT-A-THON_PPT_TEMPLATE.pptx"
              download
              className="group bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-8 rounded-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 text-center hover-glow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Download className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">PPT Template</h3>
              <p className="text-gray-400 mb-4">Download presentation template</p>
              <Download className="w-5 h-5 mx-auto text-purple-400" />
            </motion.a>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Contact Us</h2>
            <p className="text-lg text-gray-400">Have questions? We're here to help!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <motion.a
              href="mailto:info@tamboobaba.com"
              className="group bg-gradient-to-br from-red-600/20 to-pink-600/20 p-6 rounded-2xl border border-red-500/30 hover:border-red-400/50 transition-all duration-300 flex items-center gap-4 hover-glow"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Mail className="w-8 h-8 text-red-400 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="font-bold">Email</h3>
                <p className="text-gray-400 text-sm">info@tamboobaba.com</p>
              </div>
            </motion.a>

            <motion.a
              href="https://chat.whatsapp.com/JIlW1QAVC9eDXBniGOLO3x"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-green-600/20 to-emerald-600/20 p-6 rounded-2xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300 flex items-center gap-4 hover-glow"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Phone className="w-8 h-8 text-green-400 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="font-bold">WhatsApp Group</h3>
                <p className="text-gray-400 text-sm">Join our community</p>
              </div>
            </motion.a>

            <motion.a
              href="tel:+917986613334"
              className="group bg-gradient-to-br from-blue-600/20 to-indigo-600/20 p-6 rounded-2xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 flex items-center gap-4 hover-glow"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Phone className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="font-bold">Call Us</h3>
                <p className="text-gray-400 text-sm">+91 7986613334</p>
              </div>
            </motion.a>

            <motion.a
              href="https://tamboobaba.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-purple-600/20 to-violet-600/20 p-6 rounded-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 flex items-center gap-4 hover-glow"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <ExternalLink className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="font-bold">Website</h3>
                <p className="text-gray-400 text-sm">tamboobaba.com</p>
              </div>
            </motion.a>
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <footer className="relative bg-gradient-to-r from-gray-900 via-black to-gray-900 border-t border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="col-span-2"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Tamboo Baba
                </h3>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Empowering innovation and fostering creativity through world-class events and competitions.
                Join us in shaping the future of technology and entrepreneurship.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: <Mail className="w-5 h-5" />, href: "mailto:info@tamboobaba.com" },
                  { icon: <Phone className="w-5 h-5" />, href: "tel:+917986613334" },
                  { icon: <ExternalLink className="w-5 h-5" />, href: "https://tamboobaba.com" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover-glow"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { name: "Enroll for Second Round", href: "#konfhubpayment" },
                  { name: "Upload Video", href: "https://unstop.com/hackathons/ideat-a-thon-chandigarh-university-1510924" },
                  // { name: "Download Template", href: "/ideatathon/IDEAT-A-THON_PPT_TEMPLATE.pptx" },
                  { name: "Contact Us", href: "mailto:info@tamboobaba.com" }
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2"
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-lg font-bold mb-4">Event Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  Chandigarh University
                </li>
                <li className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-green-400" />
                  2025
                </li>
                <li className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  ₹1,00,000+ Prize Pool
                </li>
                <li className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" />
                  3 Rounds of Innovation
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            className="border-t border-gray-800 mt-12 pt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-gray-400">
              © 2025 Tamboo Baba. All rights reserved. |
              <span className="text-blue-400 ml-1">Ideat-a-thon 2025 - Ignite. Innovate. Impact.</span>
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Website developed by <a href="https://devorious.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Devorious Technologies</a>
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg z-50 glow hover-glow"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ChevronDown className="w-6 h-6 text-white rotate-180" />
      </motion.button>
    </div>
    </>
  )
}

export default IdeatathonPage