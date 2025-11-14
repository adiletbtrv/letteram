import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    if (location.pathname === path) {
      navigate('/');
    } else {
      navigate(path);
    }
  };

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80 animate-in slide-in-from-top duration-300"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link 
              to="/" 
              className="flex items-center gap-2.5 hover:opacity-80 transition-all duration-200 
              hover:scale-105 active:scale-95"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center
              transition-all duration-200 hover:bg-primary/20">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Letteram</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNavClick('/settings')}
              className={`
                btn btn-sm gap-2 transition-all duration-200
                hover:scale-105 active:scale-95
                ${location.pathname === '/settings' ? 'btn-primary' : 'btn-ghost'}
              `}
            >
              <Settings className="w-4 h-4 transition-transform duration-200 hover:rotate-90" />
              <span className="hidden sm:inline">Settings</span>
            </button>

            {authUser && (
              <>
                <button
                  onClick={() => handleNavClick('/profile')}
                  className={`
                    btn btn-sm gap-2 transition-all duration-200
                    hover:scale-105 active:scale-95
                    ${location.pathname === '/profile' ? 'btn-primary' : 'btn-ghost'}
                  `}
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </button>

                <button 
                  className="btn btn-sm btn-ghost gap-2 transition-all duration-200
                  hover:scale-105 active:scale-95 hover:text-error" 
                  onClick={logout}
                >
                  <LogOut className="size-5 transition-transform duration-200 hover:-translate-x-1" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;