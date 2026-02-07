import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, Lock, Users, Award, Download, MessageSquare } from 'lucide-react';

export function OptionsTab() {
  const [isPublic, setIsPublic] = useState(true);
  const [requiresEnrollment, setRequiresEnrollment] = useState(false);
  const [enableComments, setEnableComments] = useState(true);
  const [enableCertificate, setEnableCertificate] = useState(true);
  const [enableDownloads, setEnableDownloads] = useState(false);
  const [maxStudents, setMaxStudents] = useState('');

  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`w-12 h-6 rounded-full transition-colors relative ${
        enabled ? 'bg-[#6E5B6A]' : 'bg-gray-300'
      }`}
    >
      <motion.div
        className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow"
        animate={{ x: enabled ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  );

  return (
    <div className="max-w-4xl">
      <div className="space-y-6">
        {/* Visibility Settings */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-[#6E5B6A]/10 rounded-lg">
              <Globe className="w-6 h-6 text-[#6E5B6A]" />
            </div>
            <div className="flex-1">
              <h3
                className="text-2xl text-[#202732] mb-1"
                style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
              >
                Visibility & Access
              </h3>
              <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                Control who can see and access your course
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Public/Private */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4
                  className="text-base font-semibold text-[#202732] mb-1"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Public Course
                </h4>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Anyone can discover and view this course
                </p>
              </div>
              <ToggleSwitch enabled={isPublic} onChange={() => setIsPublic(!isPublic)} />
            </div>

            {/* Requires Enrollment */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4
                  className="text-base font-semibold text-[#202732] mb-1"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Require Enrollment
                </h4>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Students must enroll before accessing content
                </p>
              </div>
              <ToggleSwitch
                enabled={requiresEnrollment}
                onChange={() => setRequiresEnrollment(!requiresEnrollment)}
              />
            </div>

            {/* Max Students */}
            <div>
              <label
                className="block text-sm font-medium text-[#202732] mb-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Maximum Students (Optional)
              </label>
              <input
                type="number"
                value={maxStudents}
                onChange={(e) => setMaxStudents(e.target.value)}
                placeholder="Leave empty for unlimited"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#6E5B6A] focus:outline-none transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>
          </div>
        </motion.div>

        {/* Learning Experience */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-[#F5AE35]/10 rounded-lg">
              <Users className="w-6 h-6 text-[#F5AE35]" />
            </div>
            <div className="flex-1">
              <h3
                className="text-2xl text-[#202732] mb-1"
                style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
              >
                Learning Experience
              </h3>
              <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                Customize how students interact with your course
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Comments */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 flex-1">
                <MessageSquare className="w-5 h-5 text-gray-400" />
                <div>
                  <h4
                    className="text-base font-semibold text-[#202732] mb-1"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Enable Comments
                  </h4>
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Let students ask questions and discuss
                  </p>
                </div>
              </div>
              <ToggleSwitch
                enabled={enableComments}
                onChange={() => setEnableComments(!enableComments)}
              />
            </div>

            {/* Certificate */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 flex-1">
                <Award className="w-5 h-5 text-gray-400" />
                <div>
                  <h4
                    className="text-base font-semibold text-[#202732] mb-1"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Issue Certificate
                  </h4>
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Award certificate upon course completion
                  </p>
                </div>
              </div>
              <ToggleSwitch
                enabled={enableCertificate}
                onChange={() => setEnableCertificate(!enableCertificate)}
              />
            </div>

            {/* Downloads */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 flex-1">
                <Download className="w-5 h-5 text-gray-400" />
                <div>
                  <h4
                    className="text-base font-semibold text-[#202732] mb-1"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Downloadable Resources
                  </h4>
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Allow students to download course materials
                  </p>
                </div>
              </div>
              <ToggleSwitch
                enabled={enableDownloads}
                onChange={() => setEnableDownloads(!enableDownloads)}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
