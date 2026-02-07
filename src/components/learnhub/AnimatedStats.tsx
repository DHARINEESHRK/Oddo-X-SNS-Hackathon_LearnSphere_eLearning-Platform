import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Users, BookOpen, Award, TrendingUp } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  delay: number;
}

function StatItem({ icon, value, label, delay }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-3 p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 shadow-lg"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -5, scale: 1.05 }}
    >
      <motion.div
        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6B5B7B] to-[#8B7B9B] flex items-center justify-center shadow-lg"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        {icon}
      </motion.div>
      
      <div className="text-center">
        <motion.div
          className="text-4xl font-bold text-[#2D3748]"
          style={{ fontFamily: 'Inter, sans-serif' }}
          initial={{ scale: 0.5 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.2, type: 'spring' }}
        >
          {count.toLocaleString()}+
        </motion.div>
        <div
          className="text-sm text-[#718096] mt-1"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {label}
        </div>
      </div>
    </motion.div>
  );
}

export function AnimatedStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
      <StatItem
        icon={<Users className="w-8 h-8 text-white" />}
        value={15000}
        label="Active Students"
        delay={0.1}
      />
      <StatItem
        icon={<BookOpen className="w-8 h-8 text-white" />}
        value={250}
        label="Quality Courses"
        delay={0.2}
      />
      <StatItem
        icon={<Award className="w-8 h-8 text-white" />}
        value={5000}
        label="Certificates"
        delay={0.3}
      />
      <StatItem
        icon={<TrendingUp className="w-8 h-8 text-white" />}
        value={98}
        label="Success Rate %"
        delay={0.4}
      />
    </div>
  );
}
