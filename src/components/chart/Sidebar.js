import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button onClick={toggleSidebar} className="sidebar-toggle">
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="2x" />
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav>
          <ul>
            <li>
              <Link href="/">
                홈 
              </Link>
            </li>
            <li>
              <Link href="/device">
                디바이스 등록 및 목록 
              </Link>
            </li>
            <li>
              <Link href="/log">
                로그 확인 
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default Sidebar;
