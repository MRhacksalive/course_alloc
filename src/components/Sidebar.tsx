
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  LayoutDashboard,
  BookOpenCheck,
  User,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  isAdmin?: boolean;
}

const Sidebar = ({ isAdmin = false }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const studentLinks = [
    { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { title: "Available Courses", path: "/courses", icon: BookOpen },
    { title: "My Courses", path: "/allocated", icon: BookOpenCheck },
    { title: "Profile", path: "/profile", icon: User },
  ];

  const adminLinks = [
    { title: "Admin Dashboard", path: "/admin", icon: LayoutDashboard },
    { title: "Manage Courses", path: "/admin/courses", icon: BookOpen },
    { title: "Manage Students", path: "/admin/students", icon: User },
  ];

  const links = isAdmin ? adminLinks : studentLinks;

  const handleLogout = () => {
    navigate("/");
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const getThemeIcon = () => {
    return theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />;
  };

  const getThemeText = () => {
    return theme === "dark" ? "Dark Mode" : "Light Mode";
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white dark:bg-gray-800 shadow-md"
        onClick={toggleSidebar}
      >
        {collapsed ? <Menu size={20} /> : <X size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 transform md:translate-x-0 flex flex-col",
          collapsed ? "-translate-x-full" : "translate-x-0"
        )}
      >
        {/* Logo and Title */}
        <div className="flex items-center p-6 border-b dark:border-gray-700">
          <BookOpen className="h-8 w-8 text-university-700 dark:text-university-400" />
          <div className="ml-2">
            <h1 className="text-xl font-bold text-university-800 dark:text-university-200">UniCourse</h1>
            <p className="text-xs text-university-600 dark:text-university-400">
              {isAdmin ? "Admin Portal" : "Student Portal"}
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.path}>
                <Button
                  variant={
                    location.pathname === link.path ? "secondary" : "ghost"
                  }
                  className={cn(
                    "w-full justify-start",
                    location.pathname === link.path
                      ? "bg-university-100 text-university-800 dark:bg-university-900 dark:text-university-200"
                      : "text-university-600 hover:bg-university-50 hover:text-university-800 dark:text-university-400 dark:hover:bg-gray-700 dark:hover:text-university-200"
                  )}
                  onClick={() => {
                    navigate(link.path);
                    if (window.innerWidth < 768) {
                      setCollapsed(true);
                    }
                  }}
                >
                  <link.icon className="h-5 w-5 mr-2" />
                  {link.title}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Theme Toggle */}
        <div className="p-4 border-t dark:border-gray-700">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between text-university-600 hover:bg-university-50 hover:text-university-800 dark:text-university-400 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-university-200"
                  onClick={toggleTheme}
                >
                  <div className="flex items-center">
                    {getThemeIcon()}
                    <span className="ml-2">{getThemeText()}</span>
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Click to toggle between light and dark theme</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Footer with Logout */}
        <div className="p-4 border-t dark:border-gray-700">
          <Button
            variant="ghost"
            className="w-full justify-start text-university-600 hover:bg-university-50 hover:text-university-800 dark:text-university-400 dark:hover:bg-gray-700 dark:hover:text-university-200"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
