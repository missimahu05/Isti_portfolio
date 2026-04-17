import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiCamera, FiBriefcase, FiGlobe } from 'react-icons/fi';
import profileImg from '../assets/images/profile1.png';

const Hero = () => {
  return (
    <section 
      id="accueil" 
      className="relative min-h-screen flex items-end md:items-center justify-center pt-32 pb-0 overflow-visible bg-brand-light dark:bg-brand-dark transition-colors duration-1000"
    >
      {/* Background Faint Text (ISTIDJA...) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.05] pointer-events-none overflow-hidden select-none">
        <h2 className="text-[25vw] font-black tracking-tighter text-slate-900 dark:text-white leading-none">
          ISTIDJA
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Hero Text Content (Based on the new requested design) */}
        <div className="order-2 md:order-1 w-full md:w-1/2 z-10 relative py-20 md:py-0">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Main Headline */}
            <h1 className="flex flex-col mb-10">
              <span className="text-7xl md:text-8xl lg:text-9xl font-display italic font-black text-[#1A1A1A] dark:text-white/90 leading-[0.9] tracking-tighter">
                ISTI
              </span>
              <span className="text-7xl md:text-8xl lg:text-9xl font-display font-black text-brand-purple leading-[0.9] tracking-tighter uppercase">
                YAROU
              </span>
            </h1>

            {/* Role / Subtitle with Typewriter Effect */}
            <div className="text-3xl md:text-4xl text-slate-500 dark:text-slate-400 italic mb-10 font-medium tracking-tight h-[1.2em] flex items-center">
              <Typewriter words={["Product Designer", "Digital Curator", "Creative Strategist"]} />
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-500 max-w-lg mb-12 leading-relaxed">
              Sculpting digital experiences with an editorial lens. <br />
              Merging minimalist aesthetics with functional precision to create artful products.
            </p>

            {/* Action Group */}
            <div className="flex flex-wrap items-center gap-10">
              <motion.a 
                href="#portfolio"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-purple hover:bg-brand-purple-light text-white px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-xl shadow-brand-purple/20 transition-all"
              >
                Mon Univers
              </motion.a>

              <div className="flex items-center gap-6">
                <FiCamera className="text-2xl text-slate-400 dark:text-slate-600 hover:text-brand-purple transition-colors cursor-pointer" />
                <FiBriefcase className="text-2xl text-slate-400 dark:text-slate-600 hover:text-brand-purple transition-colors cursor-pointer" />
                <FiGlobe className="text-2xl text-slate-400 dark:text-slate-600 hover:text-brand-purple transition-colors cursor-pointer" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hero Image Group */}
        <div className="order-1 md:order-2 w-full md:w-1/2 relative flex justify-center items-end self-end mt-12 md:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 w-full max-w-[380px] lg:max-w-[420px] xl:max-w-[480px]"
          >
            <img 
              src={profileImg} 
              alt="Istidjabatou Yarou" 
              className="w-full h-auto object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_20px_80px_rgba(147,51,234,0.15)] transition-all duration-700 pointer-events-none"
            />
          </motion.div>
        </div>

      </div>

      {/* Hero Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <motion.div 
          animate={{ height: [15, 40, 15] }} 
          transition={{ duration: 2.5, repeat: Infinity }}
          className="w-px bg-gradient-to-t from-brand-purple to-transparent" 
        />
        <span className="text-[9px] uppercase tracking-[0.5em] font-black dark:text-white">Exploration</span>
      </div>
    </section>
  );
};

const Typewriter = ({ words }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const fullWord = words[currentWordIndex];
      if (isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        setSpeed(50);
      } else {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        setSpeed(150);
      }

      if (!isDeleting && currentText === fullWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, speed]);

  return (
    <span>
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-1.5 h-8 bg-brand-purple ml-2 align-middle"
      />
    </span>
  );
};

export default Hero;
