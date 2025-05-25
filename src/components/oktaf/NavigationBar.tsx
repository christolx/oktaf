import React, { useState } from 'react';
import { Search, Bell, Users, Settings } from 'lucide-react';

interface NavigationBarProps {
    className?: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ className = '' }) => {
    const [activeTab, setActiveTab] = useState('Albums');

    const tabs = ['Albums', 'Playlists', 'Tracks'];

    return (
        <div
            className={`
                w-full px-6 py-3 
                bg-gray-800/90 backdrop-blur-lg rounded-2xl 
                flex items-center justify-between
                border border-gray-700/30
                ${className}
            `}
        >
            {/* Left Section - Filter Tabs */}
            <div className="flex items-center gap-3">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`
                            px-5 py-2 rounded-lg
                            text-sm font-medium transition-all duration-200
                            ${activeTab === tab
                            ? 'bg-gray-600 text-white shadow-sm'
                            : 'bg-gray-900/80 text-gray-300 hover:bg-gray-700/80 hover:text-white'
                        }
                        `}
                        style={{ fontFamily: 'League Spartan, sans-serif' }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Center Section - Search Bar */}
            <div className="flex-1 max-w-96 mx-8">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="
                            w-full h-9 pl-10 pr-4
                            bg-gray-900/60 rounded-lg
                            text-gray-300 text-sm font-medium
                            placeholder:text-gray-400
                            outline-none border border-gray-700/50
                            focus:border-gray-600 focus:bg-gray-900/80
                            transition-all duration-200
                        "
                        style={{ fontFamily: 'League Spartan, sans-serif' }}
                    />
                </div>
            </div>

            {/* Right Section - Action Buttons */}
            <div className="flex items-center gap-2">
                {/* Notification Bell */}
                <button className="w-9 h-9 bg-gray-900/80 rounded-lg flex items-center justify-center hover:bg-gray-700/80 transition-colors border border-gray-700/50">
                    <Bell className="w-4 h-4 text-gray-300" strokeWidth={1.5} />
                </button>

                {/* Users/Groups */}
                <button className="w-9 h-9 bg-gray-900/80 rounded-lg flex items-center justify-center hover:bg-gray-700/80 transition-colors border border-gray-700/50">
                    <Users className="w-4 h-4 text-gray-300" strokeWidth={1.5} />
                </button>

                {/* Settings */}
                <button className="w-9 h-9 bg-gray-900/80 rounded-lg flex items-center justify-center hover:bg-gray-700/80 transition-colors border border-gray-700/50">
                    <Settings className="w-4 h-4 text-gray-300" strokeWidth={1.5} />
                </button>

                {/* Profile Avatar */}
                <button className="w-9 h-9 bg-gray-900/80 rounded-lg flex items-center justify-center hover:bg-gray-700/80 transition-colors border border-gray-700/50">
                    <div className="w-5 h-5 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default NavigationBar;
