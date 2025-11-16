import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2">
      {/*left side*/}
      <div className="flex flex-col justify-center items-center p-3 xs:p-4 sm:p-6 md:p-8 lg:p-6 xl:p-12 bg-base-100 overflow-y-auto h-full">
        <div className="w-full max-w-md space-y-3 xs:space-y-4 sm:space-y-5 lg:space-y-4 xl:space-y-6 my-auto py-2">
          <div className="text-center">
            <div className="flex flex-col items-center gap-1.5 xs:gap-2 group">
              <div
                className="auth-logo w-10 h-10 xs:w-12 xs:h-12 lg:w-11 lg:h-11 xl:w-14 xl:h-14 rounded-xl bg-primary/10 
                flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200"
              >
                <MessageSquare className="w-5 h-5 xs:w-6 xs:h-6 lg:w-5.5 lg:h-5.5 xl:w-7 xl:h-7 text-primary" />
              </div>
              <h1 className="text-lg xs:text-xl lg:text-lg xl:text-2xl font-bold mt-1">Welcome to Letteram</h1>
              <p className="text-xs xs:text-sm lg:text-xs xl:text-base text-base-content/60">Sign in to your account</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3 xs:space-y-4 lg:space-y-3 xl:space-y-5 auth-form-container">
            <div className="form-control">
              <label className="label py-0.5 lg:py-0.5">
                <span className="label-text font-medium text-xs xs:text-sm lg:text-xs xl:text-base">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 xs:pl-3 flex items-center pointer-events-none">
                  <Mail className="h-3.5 w-3.5 xs:h-4 xs:w-4 lg:h-3.5 lg:w-3.5 xl:h-5 xl:w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-8 xs:pl-10 text-xs xs:text-sm lg:text-xs xl:text-base 
                  h-9 xs:h-10 lg:h-9 xl:h-12 min-h-0"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label py-0.5 lg:py-0.5">
                <span className="label-text font-medium text-xs xs:text-sm lg:text-xs xl:text-base">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 xs:pl-3 flex items-center pointer-events-none">
                  <Lock className="h-3.5 w-3.5 xs:h-4 xs:w-4 lg:h-3.5 lg:w-3.5 xl:h-5 xl:w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-8 xs:pl-10 pr-8 xs:pr-10 text-xs xs:text-sm lg:text-xs xl:text-base 
                  h-9 xs:h-10 lg:h-9 xl:h-12 min-h-0"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-2.5 xs:pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-3.5 w-3.5 xs:h-4 xs:w-4 lg:h-3.5 lg:w-3.5 xl:h-5 xl:w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-3.5 w-3.5 xs:h-4 xs:w-4 lg:h-3.5 lg:w-3.5 xl:h-5 xl:w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full h-9 xs:h-10 lg:h-9 xl:h-12 text-xs xs:text-sm lg:text-xs xl:text-base min-h-0" 
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 xs:h-4 xs:w-4 lg:h-3.5 lg:w-3.5 xl:h-5 xl:w-5 animate-spin" />
                  <span className="ml-2">Loading...</span>
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center pt-1 xs:pt-2 lg:pt-1 xl:pt-2">
            <p className="text-xs xs:text-sm lg:text-xs xl:text-base text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary font-medium">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/*right side*/}
      <AuthImagePattern
        title="Welcome back to Letteram!"
        subtitle="Sign in to continue your conversations and catch up with your messages."
      />
    </div>
  );
};
export default LoginPage;