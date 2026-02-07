import React from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  Code,
  Palette,
  Database,
  Smartphone,
  BarChart3,
  Globe,
  Briefcase,
} from 'lucide-react';

export function AppIcons() {
  const projects = [
    { icon: TrendingUp, name: 'Financial Improvement', color: '#E8A84E', gradient: 'linear-gradient(135deg, #E8A84E 0%, #F5C168 100%)' },
    { icon: Code, name: 'Web Development', color: '#6E5B6A', gradient: 'linear-gradient(135deg, #6E5B6A 0%, #8B7280 100%)' },
    { icon: Palette, name: 'UI/UX Design', color: '#9AACB6', gradient: 'linear-gradient(135deg, #9AACB6 0%, #B8C8D1 100%)' },
    { icon: Database, name: 'Data Analytics', color: '#E8A84E', gradient: 'linear-gradient(135deg, #E8A84E 0%, #F5C168 100%)' },
    { icon: Smartphone, name: 'Mobile Apps', color: '#6E5B6A', gradient: 'linear-gradient(135deg, #6E5B6A 0%, #8B7280 100%)' },
    { icon: BarChart3, name: 'Business Strategy', color: '#9AACB6', gradient: 'linear-gradient(135deg, #9AACB6 0%, #B8C8D1 100%)' },
    { icon: Globe, name: 'Digital Marketing', color: '#E8A84E', gradient: 'linear-gradient(135deg, #E8A84E 0%, #F5C168 100%)' },
    { icon: Briefcase, name: 'Project Management', color: '#6E5B6A', gradient: 'linear-gradient(135deg, #6E5B6A 0%, #8B7280 100%)' },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl text-[#202732] mb-4" style={{ fontFamily: 'Brush Script MT, cursive' }}>
            Real-time Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn by doing with hands-on projects that mirror real-world scenarios
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.name}
                className="flex flex-col items-center gap-3 group cursor-pointer"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 1.0 + index * 0.08,
                  type: 'spring',
                  stiffness: 150,
                }}
              >
                <motion.div
                  className="relative w-24 h-24 rounded-[20px] flex items-center justify-center"
                  style={{
                    background: project.gradient,
                    boxShadow: `0 6px 20px ${project.color}25`,
                  }}
                  whileHover={{
                    y: -6,
                    boxShadow: `0 12px 28px ${project.color}35`,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </motion.div>

                  {/* Shine effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-white/0 to-white/20"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Project Name */}
                <motion.span
                  className="text-sm text-center text-[#202732] font-medium leading-tight max-w-[120px]"
                  whileHover={{ scale: 1.02 }}
                >
                  {project.name}
                </motion.span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}