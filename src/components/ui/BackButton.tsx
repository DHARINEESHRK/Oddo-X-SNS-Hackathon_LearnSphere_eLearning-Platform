import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
    onClick: () => void;
    label?: string;
}

export function BackButton({ onClick, label = 'Back' }: BackButtonProps) {
    return (
        <motion.button
            onClick={onClick}
            className="flex items-center gap-2 text-[#6E5B6A] hover:bg-[#F1F2F4] px-4 py-2 rounded-lg transition-colors"
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.98 }}
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
        >
            <ArrowLeft className="w-5 h-5" />
            {label}
        </motion.button>
    );
}
