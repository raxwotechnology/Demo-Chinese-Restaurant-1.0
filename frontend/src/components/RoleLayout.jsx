import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "./ProtectedRoute";
import useTokenCountdown from "../hooks/useTokenCountdown";
import {
  FaBars, FaSignOutAlt, FaUserCircle, FaRedo
} from "react-icons/fa";
import {
  LayoutDashboard, FileText, BarChart3, Database, ShoppingCart, Utensils,
  Activity, History, Truck, Receipt, FileBarChart, Coins, Wallet,
  Package, Banknote, Settings2, UserCog, Users, UserCheck, UserPlus,
  CalendarClock, Car, Key, Printer, MessageSquare, DollarSign, RefreshCw
} from "lucide-react";
import "./Sidebar.css";
import NotificationCenter from "./NotificationCenter";
import useRefreshStatus from "../hooks/useRefreshStatus";

const NavItem = ({ to, label, icon: Icon, isActive, onClick }) => {
  return (
    <Link 
      to={to} 
      className={`nav-item ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
      <span className="nav-label">{label}</span>
    </Link>
  );
};

const RoleLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const { user, logout } = useAuth();
  const countdown = useTokenCountdown();
  const location = useLocation();
  const dropdownRef = useRef();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isHovered, setIsHovered] = useState(false);
  const { refreshed, markAsRefreshed } = useRefreshStatus();

  const handleHardRefresh = async () => {
    await markAsRefreshed();
    window.location.reload(); // hard reload
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderSidebarMenu = () => {
    const getItemProps = (to) => ({
      to,
      isActive: location.pathname === to,
      onClick: () => isMobile && setSidebarOpen(false)
    });

    switch (user?.role) {
      case "admin":
        return (
          <>
            <div className="sidebar-group-title">Main</div>
            <NavItem label="Dashboard" icon={LayoutDashboard} {...getItemProps("/admin")} />
            <NavItem label="Daily Report" icon={FileText} {...getItemProps("/cashier/today")} />
            <NavItem label="Monthly Report" icon={BarChart3} {...getItemProps("/admin/report")} />
            <NavItem label="Database Status" icon={Database} {...getItemProps("/admin/db-Status")} />

            <div className="sidebar-group-title">Operations</div>
            <NavItem label="Order Management" icon={ShoppingCart} {...getItemProps("/cashier")} />
            <NavItem label="Manage Menu" icon={Utensils} {...getItemProps("/admin/menu")} />
            <NavItem label="Live Orders" icon={Activity} {...getItemProps("/kitchen")} />
            <NavItem label="Order History" icon={History} {...getItemProps("/cashier/orders")} />
            <NavItem label="Takeaway Orders" icon={Truck} {...getItemProps("/cashier/takeaway-orders")} />
            <NavItem label="Restaurant Bills" icon={Receipt} {...getItemProps("/admin/bills")} />

            <div className="sidebar-group-title">Financials</div>
            <NavItem label="Cashier Summery" icon={FileBarChart} {...getItemProps("/cashier-summery")} />
            <NavItem label="Other Incomes" icon={Coins} {...getItemProps("/cashier/other-income")} />
            <NavItem label="Other Expenses" icon={Wallet} {...getItemProps("/cashier/other-expences")} />
            <NavItem label="Supplier Expenses" icon={Package} {...getItemProps("/admin/expenses")} />
            <NavItem label="Salary Payments" icon={Banknote} {...getItemProps("/admin/salaries")} />
            <NavItem label="Service / Delivery Charges" icon={Settings2} {...getItemProps("/admin/service-charge")} />
            <NavItem label="Currency" icon={DollarSign} {...getItemProps("/admin/currency")} />

            <div className="sidebar-group-title">People</div>
            <NavItem label="User Management" icon={UserCog} {...getItemProps("/admin/users")} />
            <NavItem label="Customers" icon={Users} {...getItemProps("/admin/customers")} />
            <NavItem label="Employees" icon={UserCheck} {...getItemProps("/admin/employees")} />
            <NavItem label="Live Attendance" icon={UserPlus} {...getItemProps("/admin/attendance/add")} />
            <NavItem label="Attendance History" icon={CalendarClock} {...getItemProps("/admin/attendance")} />

            <div className="sidebar-group-title">Registration</div>
            <NavItem label="Takeaway Driver" icon={Car} {...getItemProps("/cashier/driver-register")} />
            <NavItem label="Suppliers Register" icon={Package} {...getItemProps("/admin/suppliers")} />
            <NavItem label="Signup Key" icon={Key} {...getItemProps("/admin/signup-key")} />

            <div className="sidebar-group-title">Settings</div>
            <NavItem label="Printer Settings" icon={Printer} {...getItemProps("/printer-settings")} />
            <NavItem label="Update Refresh" icon={RefreshCw} {...getItemProps("/admin/refresh-update")} />
          </>
        );
      case "cashier":
        return (
          <>
            <div className="sidebar-group-title">Sales</div>
            <NavItem label="Order Management" icon={ShoppingCart} {...getItemProps("/cashier")} />
            <NavItem label="Live Orders" icon={Activity} {...getItemProps("/kitchen")} />
            <NavItem label="Order History" icon={History} {...getItemProps("/cashier/orders")} />
            <NavItem label="Takeaway Orders" icon={Truck} {...getItemProps("/cashier/takeaway-orders")} />
            
            <div className="sidebar-group-title">Reporting</div>
            <NavItem label="Daily Report" icon={FileText} {...getItemProps("/cashier/today")} />
            <NavItem label="Cashier Summery" icon={FileBarChart} {...getItemProps("/cashier-summery")} />
            
            <div className="sidebar-group-title">Finance</div>
            <NavItem label="Other Incomes" icon={Coins} {...getItemProps("/cashier/other-income")} />
            <NavItem label="Other Expenses" icon={Wallet} {...getItemProps("/cashier/other-expences")} />
            
            <div className="sidebar-group-title">System</div>
            <NavItem label="Driver Register" icon={Car} {...getItemProps("/cashier/driver-register")} />
            <NavItem label="Admin Requests" icon={MessageSquare} {...getItemProps("/admin/kitchen-requests")} />
            <NavItem label="Live Attendance" icon={UserPlus} {...getItemProps("/cashier/attendance/add")} />
            <NavItem label="Printer Settings" icon={Printer} {...getItemProps("/printer-settings")} />
          </>
        );
      case "kitchen":
        return (
          <>
            <div className="sidebar-group-title">Kitchen Board</div>
            <NavItem label="Live Orders" icon={Activity} {...getItemProps("/kitchen")} />
            <NavItem label="Order History" icon={History} {...getItemProps("/kitchen/history")} />
            <NavItem label="Manage Menu" icon={Utensils} {...getItemProps("/kitchen/menu")} />
            
            <div className="sidebar-group-title">Communications</div>
            <NavItem label="Admin Requests" icon={MessageSquare} {...getItemProps("/kitchen/kitchen-requestsForm")} />
            <NavItem label="Attendance" icon={UserPlus} {...getItemProps("/kitchen/attendance/add")} />
          </>
        );
      default:
        return null;
    }
  };

  const getSidebarClass = () => {
    const isOpen = sidebarOpen || (isHovered && !isMobile);
    return isOpen ? "open" : "collapsed";
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if (!sidebarOpen) {
      setIsHovered(false);
    }
  };

  return (
    <div className="layout d-flex">
      {!isMobile || sidebarOpen ? (
        <aside 
          className={`sidebar ${getSidebarClass()}`}
          onMouseEnter={() => !isMobile && !sidebarOpen && setIsHovered(true)}
          onMouseLeave={() => !isMobile && !sidebarOpen && setIsHovered(false)}
        >
          <div className="sidebar-header d-flex align-items-center">
            {(sidebarOpen || (isHovered && !isMobile)) && (
              <>
                <img
                  src="/logo.jpg"
                  alt="Logo"
                  className="sidebar-logo rounded-circle me-2"
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "cover",
                    border: "2px solid #fff",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                  }}
                />
                <h3 className="justify-content-left sidebar-title mb-0">Gasma Chinese Restaurant-RMS</h3>
              </>
            )}
          </div>
          <ul className="sidebar-menu">{renderSidebarMenu()}</ul>
        </aside>
      ) : null}

      <div className="main-content flex-grow-1">
        <header className="top-navbar">
          <div className="navbar-left">
            <button className="btn-toggle" onClick={toggleSidebar}>
              <FaBars />
            </button>
            <span className="session-timer">⏳ Session expires in: {countdown}</span>
            <div >
              <NotificationCenter />
            </div>
            <button 
              className="btn btn-outline-secondary ms-2 d-flex align-items-center justify-content-center position-relative"
              onClick={handleHardRefresh}
              title="Hard refresh page"
              style={{ width: '36px', height: '36px', padding: 0 }}
            >
              <FaRedo />
              {!refreshed && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: '0.65em', minWidth: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  1
                </span>
              )}
            </button>
          </div>
          <div className="navbar-right" ref={dropdownRef}>
            <div className="user-dropdown">
              <div
                className="user-toggle"
                onClick={() => setUserDropdown(!userDropdown)}
                style={{ cursor: "pointer" }}
              >
                <FaUserCircle className="user-icon" />
                <span className="user-role">{user?.role}</span>
              </div>
              {userDropdown && (
                <div className="dropdown-menu show">
                  <button className="dropdown-item" onClick={logout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RoleLayout;
