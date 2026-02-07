import React from 'react';
import { motion } from 'motion/react';
import { Star, Clock, Users, TrendingUp, Edit3 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface CourseData {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  category: string;
}

interface CourseCardProps {
  course: CourseData;
  index: number;
  onClick?: () => void;
}

export function CourseCard({ course, index, onClick }: CourseCardProps) {
  const { currentUser } = useApp();
  const isInstructor = currentUser?.role === 'instructor';

  return (
    <motion.div
      className="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 flex flex-col h-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -12, transition: { duration: 0.3 } }}
      style={{
        boxShadow: '0 4px 24px rgba(107, 91, 123, 0.08)',
      }}
    >
      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at top, rgba(244, 184, 96, 0.15), transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Cover Image with Overlay */}
      <div className="relative h-[220px] overflow-hidden">
        <motion.img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <motion.div
            className="px-4 py-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
          >
            <span className="text-xs font-semibold text-[#6B5B7B]" style={{ fontFamily: 'Inter, sans-serif' }}>
              {course.category}
            </span>
          </motion.div>
        </div>

        {/* Trending Icon */}
        <div className="absolute top-4 left-4">
          <motion.div
            className="w-10 h-10 bg-[#F4B860]/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <TrendingUp className="w-5 h-5 text-white" />
          </motion.div>
        </div>

        {/* Rating Badge on Image */}
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-1 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-lg">
            <Star className="w-4 h-4 fill-[#F4B860] text-[#F4B860]" />
            <span className="text-sm font-bold text-[#2D3748]" style={{ fontFamily: 'Inter, sans-serif' }}>
              {course.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-xl font-bold text-[#2D3748] mb-3 group-hover:text-[#6B5B7B] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-[#718096] text-sm mb-4 line-clamp-2 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
          {course.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {course.tags.map((tag, idx) => (
            <motion.span
              key={idx}
              className="px-3 py-1.5 bg-gradient-to-r from-[#F4B860]/10 to-[#F4B860]/20 text-[#D69E3D] rounded-lg text-xs font-semibold border border-[#F4B860]/20"
              style={{ fontFamily: 'Inter, sans-serif' }}
              whileHover={{ scale: 1.05 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gray-100">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-[#6B5B7B]/60" />
            <span className="text-xs text-[#718096] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              {course.reviewCount}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#6B5B7B]/60" />
            <span className="text-xs text-[#718096] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              8 weeks
            </span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(course.rating)
                    ? 'fill-[#F4B860] text-[#F4B860]'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Button - mt-auto pushes it to bottom */}
        <motion.button
          onClick={onClick}
          className={`w-full mt-auto text-white py-3.5 rounded-2xl font-bold shadow-lg relative overflow-hidden group/btn ${
            isInstructor 
              ? 'bg-gradient-to-r from-[#F4B860] to-[#FFD580] shadow-[#F4B860]/20' 
              : 'bg-gradient-to-r from-[#6B5B7B] to-[#8B7B9B] shadow-[#6B5B7B]/20'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {/* Button Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
          
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isInstructor ? (
              <>
                <Edit3 className="w-4 h-4" />
                Edit Course
                <motion.span
                  className="inline-block"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.span>
              </>
            ) : (
              <>
                Start Learning
                <motion.span
                  className="inline-block"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.span>
              </>
            )}
          </span>
        </motion.button>
      </div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#F4B860]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}