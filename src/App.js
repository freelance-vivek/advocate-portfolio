import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Scale, BookOpen, Building2, Award, Mail, Phone, MapPin, GraduationCap, Briefcase, Library, FileText, Users, Shield, ChevronRight, ArrowRight } from 'lucide-react';

// Smooth scroll utility
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// Navigation Component
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Practice Areas', id: 'practice' },
    { label: 'Experience', id: 'experience' },
    { label: 'Credentials', id: 'credentials' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-slate-900/80 backdrop-blur-xl shadow-2xl border-b border-amber-500/10' : 'bg-transparent'
      }`}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 md:max-w-7xl">
        <div className="flex justify-between items-center h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => scrollToSection('hero')}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <Scale className="w-8 h-8 text-amber-500 relative z-10" />
            </div>
            <div>
              <span className="text-xl font-serif text-white block">Dr. Preeti Pathak</span>
              <span className="text-xs text-amber-500">High Court Advocate</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 text-gray-300 hover:text-amber-500 transition-all duration-300 text-sm tracking-wide relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white relative z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-amber-500/10"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                scrollToSection(item.id);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-6 py-4 text-gray-300 hover:bg-slate-800/50 hover:text-amber-500 transition-all duration-300 border-b border-slate-800/50"
            >
              {item.label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

// Hero Section
const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-amber-500 rounded-full"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.5
          }}
          animate={{
            y: [null, Math.random() * -100],
            opacity: [null, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-4 w-full mx-auto md:max-w-6xl">
        {/* Logo with Glow Effect */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="relative inline-block mb-8 mt-2"
        >
          <div className="absolute inset-0 bg-amber-500 blur-3xl opacity-50 animate-pulse" />
          <div className="relative bg-gradient-to-br from-amber-500 to-amber-600 p-4 md:p-6 rounded-full">
            <Scale className="w-12 h-12 md:w-16 md:h-16 text-slate-900" />
          </div>
        </motion.div>

        {/* Main Title with Gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-4 leading-tight"
        >
          <span className="bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
            Dr. Preeti Pathak
          </span>
          <br />
          <span className="text-3xl md:text-4xl lg:text-5xl text-gray-400">(Mishra)</span>
        </motion.h1>

        {/* Subtitle with Underline Effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-y-3 mb-12"
        >
          <div className="inline-block">
            <p className="text-2xl md:text-3xl text-amber-500 font-semibold mb-2">
              Advocate, High Court of Madhya Pradesh
            </p>
            <div className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          </div>
          <p className="text-lg text-gray-400">Enrollment No: 6052/2023 | Jabalpur</p>
        </motion.div>

        {/* Expertise Tags with Stagger Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {['Constitutional Law', 'Service Matters', 'Public Interest Litigation', 'Municipal Governance', 'Civil & Criminal Law'].map((area, i) => (
            <motion.span
              key={area}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.1, type: "spring" }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-900 border border-amber-500/30 text-gray-300 rounded-full text-sm font-medium shadow-lg hover:shadow-amber-500/20 transition-all duration-300 cursor-default"
            >
              {area}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
            className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-2xl shadow-amber-500/30 flex items-center space-x-2"
          >
            <span>Schedule Consultation</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('practice')}
            className="px-8 py-4 bg-transparent border-2 border-amber-500 text-amber-500 font-semibold rounded-xl hover:bg-amber-500 hover:text-slate-900 transition-all duration-300"
          >
            View Practice Areas
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center space-y-2"
        >
          <span className="text-amber-500 text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-amber-500 rounded-full flex items-start justify-center p-2">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-3 bg-amber-500 rounded-full" 
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section id="about" className="relative py-32 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 md:max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-full text-sm font-semibold">
                Professional Profile
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              Excellence in
              <span className="block bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
                Legal Advocacy
              </span>
            </h2>

            <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
              <p>
                With a strong academic foundation spanning multiple disciplines and diverse professional experience, I bring comprehensive expertise in litigation, constitutional law, service matters, and municipal governance.
              </p>
              <p>
                My practice is built on a foundation of integrity, diligence, and an unwavering commitment to justice. I believe in delivering results through thorough legal research, strategic advocacy, and a deep understanding of both statutory frameworks and practical implications.
              </p>
              
              {/* Quote Box */}
              <div className="relative pl-6 border-l-4 border-amber-500 py-4">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-slate-900 text-xs font-bold">"</span>
                </div>
                <p className="text-amber-400 font-medium italic text-xl">
                  Justice delayed is justice denied. I strive to provide timely, effective, and transparent legal representation.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Academic Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-500/20 rounded-2xl p-8 shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
              <div className="relative z-10">
                <GraduationCap className="w-14 h-14 text-amber-500 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Academic Excellence</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {['Ph.D. Child Development', 'LL.B. (Law)', 'M.A. English Literature', 'M.H.Sc. Child Development', 'B.Ed. Education', 'PGDCA'].map((degree, i) => (
                    <div key={i} className="flex items-center space-x-2 text-gray-300">
                      <ChevronRight className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span>{degree}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Values Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-500/20 rounded-2xl p-8 shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
              <div className="relative z-10">
                <Shield className="w-14 h-14 text-amber-500 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Core Values</h3>
                <div className="space-y-3">
                  {['Integrity & Ethics', 'Diligence & Dedication', 'Transparency', 'Professionalism'].map((value, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-amber-500 rounded-full" />
                      <span className="text-gray-300">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Practice Areas Section
const PracticeAreasSection = () => {
  const practiceAreas = [
    {
      icon: FileText,
      title: "Writ Petitions",
      description: "Comprehensive representation in recruitment processes, competitive examinations, town & country planning, municipal governance, encroachment, land ceiling, mining, and land acquisition matters.",
      gradient: "from-blue-500/20 to-blue-600/20"
    },
    {
      icon: GraduationCap,
      title: "Education Law",
      description: "Expert handling of professional courses, institutional disputes, regulatory compliance, and educational policy matters with focus on rights and obligations.",
      gradient: "from-purple-500/20 to-purple-600/20"
    },
    {
      icon: Briefcase,
      title: "Service & Employment",
      description: "Specialized advocacy in government service matters, disciplinary proceedings, labor disputes, and employment contracts with thorough legal analysis.",
      gradient: "from-green-500/20 to-green-600/20"
    },
    {
      icon: Building2,
      title: "Municipal Law",
      description: "Extensive experience in panchayat and municipal taxation, electricity disputes, cooperative matters, and local governance issues.",
      gradient: "from-orange-500/20 to-orange-600/20"
    },
    {
      icon: Scale,
      title: "Corporate & Commercial",
      description: "Proficient representation in arbitration, conciliation, RERA-related cases, contract disputes, and comprehensive company law matters.",
      gradient: "from-red-500/20 to-red-600/20"
    },
    {
      icon: Users,
      title: "Public Interest Litigation",
      description: "Dedicated advocacy for public welfare, governance accountability, environmental protection, and safeguarding constitutional rights.",
      gradient: "from-amber-500/20 to-amber-600/20"
    }
  ];

  return (
    <section id="practice" className="relative py-32 bg-slate-950">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 md:max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-full text-sm font-semibold mb-4">
            Areas of Expertise
          </span>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
            Practice Areas
          </h2>
          <p className="text-gray-400 text-lg w-full mx-auto max-w-3xl">
            Comprehensive legal services across constitutional, civil, criminal, and administrative law domains with proven expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practiceAreas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${area.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Card */}
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 group-hover:border-amber-500/50 rounded-2xl p-8 h-full transition-all duration-300 shadow-xl">
                {/* Icon with Background */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-amber-500/10 rounded-2xl blur-xl" />
                  <div className="relative bg-gradient-to-br from-amber-500/10 to-transparent p-4 rounded-2xl inline-block">
                    <area.icon className="w-12 h-12 text-amber-500" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-500 transition-colors">
                  {area.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {area.description}
                </p>

                {/* Hover Arrow */}
                <div className="mt-6 flex items-center text-amber-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                  <span className="text-sm font-semibold mr-2">Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Experience Timeline
const ExperienceSection = () => {
  const experiences = [
    {
      title: "Deputy Advocate General's Office",
      organization: "High Court of Madhya Pradesh, Jabalpur",
      description: "Currently working with Swapnil Ganguly, Deputy Advocate General, handling complex litigation matters including constitutional cases, service matters, and administrative law",
      current: true,
      icon: Scale
    },
    {
      title: "Panel Lawyer",
      organization: "Municipal Corporation, Chhindwara",
      description: "Comprehensive legal representation for municipal matters, administrative disputes, governance issues, and regulatory compliance",
      icon: Building2
    },
    {
      title: "Panel Lawyer",
      organization: "Municipal Corporation, Satna",
      description: "Advisory and litigation services for municipal administration, taxation matters, and regulatory compliance with focus on public interest",
      icon: Building2
    },
    {
      title: "Panel Lawyer",
      organization: "Nagar Parishad Baihar, District Balaghat",
      description: "Comprehensive legal support for local governance, administrative matters, and civic issues ensuring transparency and accountability",
      icon: Building2
    },
    {
      title: "Independent Practice",
      organization: "High Court of Madhya Pradesh",
      description: "Specializing in constitutional cases, writ petitions, PILs, service matters, civil & criminal litigation with proven track record",
      icon: Briefcase
    }
  ];

  return (
    <section id="experience" className="relative py-32 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 md:max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-full text-sm font-semibold mb-4">
            Professional Journey
          </span>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
            Experience
          </h2>
          <p className="text-gray-400 text-lg w-full mx-auto max-w-3xl">
            Diverse expertise across institutional representation and independent practice with focus on excellence
          </p>
        </motion.div>

        <div className="relative w-full mx-auto md:max-w-5xl">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 via-amber-500/50 to-transparent" />

          <div className="space-y-16">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`flex flex-col lg:flex-row gap-8 items-center ${
                  i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content Side */}
                <div className="flex-1 w-full">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group relative bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-amber-500/50 rounded-2xl p-8 shadow-2xl hover:shadow-amber-500/20 transition-all duration-300"
                  >
                    {exp.current && (
                      <div className="absolute top-4 right-4">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-amber-500/10 rounded-xl">
                        <exp.icon className="w-6 h-6 text-amber-500" />
                      </div>
                      {exp.current && (
                        <span className="px-3 py-1 bg-amber-500 text-slate-900 text-xs font-bold rounded-full">
                          CURRENT
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-amber-500 font-semibold mb-4 text-lg">{exp.organization}</p>
                    <p className="text-gray-400 leading-relaxed">{exp.description}</p>
                  </motion.div>
                </div>

                {/* Timeline Node */}
                <div className="hidden lg:block relative flex-shrink-0 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3, type: "spring" }}
                    className="relative"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-2xl shadow-amber-500/50">
                      <exp.icon className="w-10 h-10 text-slate-900" />
                    </div>
                    {exp.current && (
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 bg-amber-500 rounded-full opacity-30 blur-md"
                      />
                    )}
                  </motion.div>
                </div>

                {/* Empty Space for Alignment */}
                <div className="hidden lg:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Credentials Section
const CredentialsSection = () => {
  return (
    <section id="credentials" className="relative py-32 bg-slate-950">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 md:max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-full text-sm font-semibold mb-4">
            Trust & Authority
          </span>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
            Credentials & Facilities
          </h2>
          <p className="text-gray-400 text-lg w-full mx-auto max-w-3xl">
            Professional enrollment and comprehensive legal research infrastructure
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Enrollment Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 group-hover:border-amber-500/50 rounded-3xl p-10 shadow-2xl transition-all duration-300 h-full">
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-4 bg-gradient-to-br from-amber-500/20 to-transparent rounded-2xl">
                  <Award className="w-12 h-12 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">Enrollment Details</h3>
                  <p className="text-amber-500 text-sm">Official Bar Registration</p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { label: "Bar Council", value: "Madhya Pradesh State Bar Council" },
                  { label: "Enrollment Number", value: "6052/2023" },
                  { label: "Court", value: "High Court of Madhya Pradesh" },
                  { label: "Location", value: "Jabalpur" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex justify-between items-center py-4 border-b border-slate-700/50 group-hover:border-amber-500/30 transition-colors"
                  >
                    <span className="text-gray-400 font-medium">{item.label}</span>
                    <span className="text-white font-semibold text-right">{item.value}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                <p className="text-amber-500 text-sm text-center font-medium">
                  ✓ Verified & Registered Legal Professional
                </p>
              </div>
            </div>
          </motion.div>

          {/* Library Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 group-hover:border-amber-500/50 rounded-3xl p-10 shadow-2xl transition-all duration-300 h-full">
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-4 bg-gradient-to-br from-amber-500/20 to-transparent rounded-2xl">
                  <Library className="w-12 h-12 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">Legal Library</h3>
                  <p className="text-amber-500 text-sm">Research Infrastructure</p>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Comprehensive legal research facility equipped with leading journals and authoritative law reports for thorough case preparation:
              </p>

              <div className="grid grid-cols-1 gap-3">
                {[
                  'All India Reporter (A.I.R.)',
                  'Supreme Court Cases (S.C.C.)',
                  'Madhya Pradesh Law Journal (M.P.L.J.)',
                  'Jabalpur Law Journal (J.L.J.)',
                  'Madhya Pradesh Judicial Reports (M.P.J.R.)',
                  'Specialized Journals & References'
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <BookOpen className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section id="contact" className="relative py-32 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 md:max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-full text-sm font-semibold mb-4">
            Let's Connect
          </span>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
            Get in Touch
          </h2>
          <p className="text-gray-400 text-lg w-full mx-auto max-w-3xl">
            For professional legal consultation and representation services in the High Court of Madhya Pradesh
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 w-full mx-auto md:max-w-6xl">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {[
              {
                icon: MapPin,
                title: "Office Address",
                content: "Flat No. 13, 14 Dixit Pride, 3rd Floor\nIFP Taiyabali Petrol Pump\nNapier Town, Jabalpur, M.P. 482001",
                gradient: "from-blue-500/20 to-blue-600/20"
              },
              {
                icon: Phone,
                title: "Contact Numbers",
                content: "+91 91310 80752\n+91 99810 40969",
                gradient: "from-green-500/20 to-green-600/20"
              },
              {
                icon: Mail,
                title: "Email Address",
                content: "preetimishra22117479@gmail.com",
                gradient: "from-purple-500/20 to-purple-600/20"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`} />
                <div className="relative flex items-start space-x-4 p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 group-hover:border-amber-500/50 rounded-2xl transition-all duration-300">
                  <div className="flex-shrink-0 p-4 bg-amber-500/10 rounded-xl">
                    <item.icon className="w-7 h-7 text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                      {item.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-3xl blur-2xl" />
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-500/30 rounded-3xl p-10 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-block p-4 bg-amber-500/10 rounded-2xl mb-4">
                  <Scale className="w-12 h-12 text-amber-500" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Schedule a Consultation</h3>
                <p className="text-gray-300 leading-relaxed">
                  For professional legal representation in the High Court of Madhya Pradesh, reach out to discuss your case with comprehensive legal services.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  { icon: BookOpen, text: 'Constitutional & Statutory Matters' },
                  { icon: Scale, text: 'Civil & Criminal Litigation' },
                  { icon: Shield, text: 'Service & Administrative Law' },
                  { icon: Users, text: 'Public Interest Litigations' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center space-x-3 p-3 bg-slate-900/50 rounded-lg"
                  >
                    <item.icon className="w-5 h-5 text-amber-500" />
                    <span className="text-gray-300 text-sm">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-500/30 flex items-center justify-center space-x-2"
              >
                <span>Contact Now</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <p className="text-center text-gray-500 text-xs mt-6">
                Available for consultations by appointment
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 md:max-w-7xl">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Scale className="w-8 h-8 text-amber-500" />
              </div>
              <div>
                <span className="text-2xl font-serif text-white block font-bold">Dr. Preeti Pathak</span>
                <span className="text-xs text-amber-500">Advocate, High Court of M.P.</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 w-full max-w-md">
              Committed to delivering justice with integrity, diligence, and professionalism. Providing comprehensive legal services across constitutional, civil, and administrative law.
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Enrollment No: 6052/2023 | M.P. State Bar Council</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['About', 'Practice Areas', 'Experience', 'Credentials', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                    className="text-gray-400 hover:text-amber-500 transition-colors text-sm flex items-center space-x-2 group"
                  >
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <span>{item}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Key Areas</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {['Constitutional Law', 'Writ Petitions', 'Service Matters', 'Municipal Law', 'PIL', 'Civil & Criminal'].map((item) => (
                <li key={item} className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Dr. Preeti Pathak (Mishra). All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="tel:+919131080752" className="text-gray-400 hover:text-amber-500 transition-colors p-2 hover:bg-slate-800 rounded-lg">
                <Phone className="w-5 h-5" />
              </a>
              <a href="mailto:preetimishra22117479@gmail.com" className="text-gray-400 hover:text-amber-500 transition-colors p-2 hover:bg-slate-800 rounded-lg">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-6 bg-slate-900/50 border border-slate-800/50 rounded-xl">
          <p className="text-gray-500 text-xs text-center leading-relaxed">
            <strong className="text-gray-400">Legal Disclaimer:</strong> The information provided on this website is for general informational purposes only and does not constitute legal advice. 
            For specific legal guidance related to your situation, please contact the office directly for a professional consultation.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
export default function App() {
  return (
    <div className="bg-slate-950" >
      <Navigation />
      <HeroSection />
      <AboutSection />
      <PracticeAreasSection />
      <ExperienceSection />
      <CredentialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}