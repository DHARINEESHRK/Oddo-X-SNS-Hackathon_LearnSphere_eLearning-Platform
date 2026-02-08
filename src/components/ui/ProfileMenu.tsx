import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Settings, BookOpen, GraduationCap, LayoutDashboard, LogOut } from 'lucide-react';
import { UserRole } from '../../types';

interface ProfileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    userName: string;
    userEmail: string;
    userRole: UserRole;
    onLogout: () => void;
    onNavigate?: (page: string) => void;
}

export function ProfileMenu({
    isOpen,
    onClose,
    userName,
    userEmail,
    userRole,
    onLogout,
    onNavigate,
}: ProfileMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close menu
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        // Handle escape key to close menu
        function handleEscapeKey(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isOpen, onClose]);

    const handleMenuClick = (action: string) => {
        if (action === 'logout') {
            onLogout();
        } else if (onNavigate) {
            onNavigate(action);
        }
        onClose();
    };

    // Get role-specific menu item
    const getRoleMenuItem = () => {
        switch (userRole) {
            case 'learner':
                return {
                    label: 'My Courses',
                    icon: BookOpen,
                    action: 'my-courses',
                };
            case 'instructor':
                return {
                    label: 'Your Courses',
                    icon: GraduationCap,
                    action: 'your-courses',
                };
            case 'admin':
                return {
                    label: 'Dashboard',
                    icon: LayoutDashboard,
                    action: 'dashboard',
                };
            default:
                return null;
        }
    };

    const roleMenuItem = getRoleMenuItem();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={menuRef}
                    className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                    {/* User Info Section */}
                    <div className="px-4 py-4 bg-gradient-to-r from-[#6E5B6A]/5 to-[#F5AE35]/5">
                        <p
                            className="font-semibold text-[#202732] text-base truncate"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                            {userName}
                        </p>
                        <p
                            className="text-xs text-[#718096] truncate mt-0.5"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                            {userEmail}
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-200" />

                    {/* Menu Items */}
                    <div className="py-2">
                        {/* Profile */}
                        <MenuItem
                            icon={User}
                            label="Profile"
                            onClick={() => handleMenuClick('profile')}
                        />

                        {/* Settings */}
                        <MenuItem
                            icon={Settings}
                            label="Settings"
                            onClick={() => handleMenuClick('settings')}
                        />

                        {/* Role-specific menu item */}
                        {roleMenuItem && (
                            <MenuItem
                                icon={roleMenuItem.icon}
                                label={roleMenuItem.label}
                                onClick={() => handleMenuClick(roleMenuItem.action)}
                            />
                        )}
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-200" />

                    {/* Logout */}
                    <div className="py-2">
                        <MenuItem
                            icon={LogOut}
                            label="Logout"
                            onClick={() => handleMenuClick('logout')}
                            variant="danger"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

interface MenuItemProps {
    icon: React.ElementType;
    label: string;
    onClick: () => void;
    variant?: 'default' | 'danger';
}

function MenuItem({ icon: Icon, label, onClick, variant = 'default' }: MenuItemProps) {
    const isLogout = variant === 'danger';

    return (
        <motion.button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${isLogout
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-[#202732] hover:bg-[#F1F2F4]'
                }`}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.15 }}
        >
            <Icon className={`w-4 h-4 ${isLogout ? 'text-red-500' : 'text-[#718096]'}`} />
            <span
                className="text-sm font-medium"
                style={{ fontFamily: 'Inter, sans-serif' }}
            >
                {label}
            </span>
        </motion.button>
    );
}
