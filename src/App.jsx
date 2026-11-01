import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './views/DashboardView';
import SessionDetailView from './views/SessionDetailView';
import ContentLibraryView from './views/ContentLibraryView';
import TaskBoardFullView from './views/TaskBoardFullView';
import ProgressFullView from './views/ProgressFullView';
import SessionArchiveView from './views/SessionArchiveView';
import AccessCodeView from './views/AccessCodeView';
import LiveSessionModal from './components/LiveSessionModal';
import VideoPlayerModal from './components/VideoPlayerModal';
import TaskDetailModal from './components/TaskDetailModal';
import BadgeDetailModal from './components/BadgeDetailModal';
import NotificationDrawer from './components/NotificationDrawer';
import { playModalOpen, isSoundEnabled } from './utils/sound';

export default function App() {
  const getInitialHash = () => {
    if (typeof window === 'undefined') return 'dashboard';
    const hash = window.location.hash.replace('#', '');
    return hash || 'dashboard';
  };

  const [currentScreen, setCurrentScreen] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#access-code') {
      return 'auth';
    }
    return 'portal';
  });

  const [activeTab, setActiveTab] = useState(() => {
    const init = getInitialHash();
    if (['dashboard', 'sessions', 'content-library', 'task-board', 'progress', 'session-archive'].includes(init)) {
      return init;
    }
    return 'dashboard';
  });

  const [sessionDetailOpen, setSessionDetailOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  // Modals
  const [liveModalOpen, setLiveModalOpen] = useState(false);
  const [videoModalItem, setVideoModalItem] = useState(null);
  const [taskModalItem, setTaskModalItem] = useState(null);
  const [badgeModalItem, setBadgeModalItem] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Search & Navigation state
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['dashboard', 'sessions', 'content-library', 'task-board', 'progress', 'session-archive'].includes(hash)) {
        setActiveTab(hash);
      } else if (hash === 'access-code') {
        setCurrentScreen('auth');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSelectSession = (session) => {
    setSelectedSession(session || {
      id: 'onshape-extrudes',
      badge: 'OCT 26 | 2:00 PM EST',
      title: 'STRYDEX AMA: Intro to Onshape Extrudes',
      description: 'Turn your startup idea into a focused, investor-ready execution plan that accelerates traction and team',
      isLive: true,
    });
    setSessionDetailOpen(true);
    setActiveTab('sessions');
    window.location.hash = 'sessions';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTask = (task) => {
    playModalOpen();
    setTaskModalItem(task);
  };

  const handleOpenBadge = (badge) => {
    playModalOpen();
    setBadgeModalItem(badge);
  };

  const handleSelectVideo = (video) => {
    playModalOpen();
    setVideoModalItem(video);
  };

  // If in Auth Screen (Page 2)
  if (currentScreen === 'auth') {
    return (
      <AccessCodeView
        onVerified={() => {
          setCurrentScreen('portal');
          window.location.hash = 'dashboard';
        }}
        onBack={() => {
          setCurrentScreen('portal');
        }}
      />
    );
  }

  // Render Portal (Pages 1, 3, 4 + Extensions)
  return (
    <div className="min-h-screen bg-[#071316] text-[#e0f3f2] flex flex-col lg:flex-row font-sans selection:bg-[#22cfb8] selection:text-[#06181b]">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSessionDetailOpen(tab === 'sessions');
          window.location.hash = tab;
        }}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        onLogout={() => {
          setCurrentScreen('auth');
          window.location.hash = 'access-code';
        }}
        soundOn={soundOn}
        setSoundOn={setSoundOn}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Global Portal Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenNotifications={() => setNotificationsOpen(true)}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onLogout={() => {
            setCurrentScreen('auth');
            window.location.hash = 'access-code';
          }}
        />

        {/* Page Routing */}
        <main className="flex-1 pb-16">
          {activeTab === 'sessions' || sessionDetailOpen ? (
            // Page 1: Session Detail ("STRYDEX AMA: Intro to Onshape Extrudes") with rocket launch background!
            <SessionDetailView
              onBack={() => {
                setSessionDetailOpen(false);
                setActiveTab('dashboard');
                window.location.hash = 'dashboard';
              }}
              onOpenContent={() => {
                setSessionDetailOpen(false);
                setActiveTab('content-library');
                window.location.hash = 'content-library';
              }}
              onJoinLive={() => setLiveModalOpen(true)}
            />
          ) : activeTab === 'content-library' ? (
            // Page 4: Content Library
            <ContentLibraryView
              onSelectVideo={handleSelectVideo}
              searchQuery={searchQuery}
            />
          ) : activeTab === 'task-board' ? (
            // Task Board Full Page
            <TaskBoardFullView onOpenTask={handleOpenTask} />
          ) : activeTab === 'progress' ? (
            // Progress Full Page
            <ProgressFullView onOpenBadge={handleOpenBadge} />
          ) : activeTab === 'session-archive' ? (
            // Session Archive Page
            <SessionArchiveView onSelectVideo={handleSelectVideo} />
          ) : (
            // Page 3: Dashboard Hub
            <DashboardView
              onSelectSession={handleSelectSession}
              onOpenTask={handleOpenTask}
              onOpenBadge={handleOpenBadge}
              searchQuery={searchQuery}
            />
          )}
        </main>
      </div>

      {/* Interactive Modals */}
      {liveModalOpen && (
        <LiveSessionModal
          session={selectedSession}
          onClose={() => setLiveModalOpen(false)}
        />
      )}

      {videoModalItem && (
        <VideoPlayerModal
          item={videoModalItem}
          onClose={() => setVideoModalItem(null)}
          onMarkComplete={(item) => {
            // Updated lesson
          }}
        />
      )}

      {taskModalItem && (
        <TaskDetailModal
          task={taskModalItem}
          onClose={() => setTaskModalItem(null)}
          onClaimReward={(task) => {
            // Reward claimed
          }}
        />
      )}

      {badgeModalItem && (
        <BadgeDetailModal
          badge={badgeModalItem}
          onClose={() => setBadgeModalItem(null)}
        />
      )}

      {notificationsOpen && (
        <NotificationDrawer
          isOpen={notificationsOpen}
          onClose={() => setNotificationsOpen(false)}
          onSelectSession={() => {
            handleSelectSession();
          }}
        />
      )}
    </div>
  );
}
