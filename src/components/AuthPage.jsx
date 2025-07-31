
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    enrollmentNo: '',
    email: '',
    username: '',
    profilePhoto: '',
    password: '',
    confirmPassword: ''
  });
  const { login } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login(formData);
    } else {
      // Handle registration
      login(formData); // For demo, we'll just log them in
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const EyeIcon = ({ show, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {show ? (
          <>
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
            <path d="M1 1l22 22"/>
          </>
        ) : (
          <>
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </>
        )}
      </svg>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M9 9l6 6M15 9l-6 6"/>
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              CodeArena
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            {isLogin ? 'Welcome back to your coding journey!' : 'Join thousands of competitive programmers'}
          </p>
        </div>

        <Card className="shadow-2xl border border-border/50 bg-card/95 backdrop-blur-sm">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-3xl text-center font-bold">
              {isLogin ? 'Sign In' : 'Create Account'}
            </CardTitle>
            <CardDescription className="text-center text-base">
              {isLogin 
                ? 'Enter your credentials to access your account' 
                : 'Fill in your details to get started with CodeArena'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="h-11"
                        required={!isLogin}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                      <Input
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Choose a username"
                        className="h-11"
                        required={!isLogin}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">University Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@university.edu"
                      className="h-11"
                      required={!isLogin}
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="enrollmentNo" className="text-sm font-medium">Enrollment Number</Label>
                <Input
                  id="enrollmentNo"
                  name="enrollmentNo"
                  value={formData.enrollmentNo}
                  onChange={handleInputChange}
                  placeholder="Enter your enrollment number"
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="pr-12 h-11"
                    required
                  />
                  <EyeIcon 
                    show={showPassword} 
                    onClick={() => setShowPassword(!showPassword)} 
                  />
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      className="pr-12 h-11"
                      required={!isLogin}
                    />
                    <EyeIcon 
                      show={showConfirmPassword} 
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                    />
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full h-12 text-base font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-200">
                {isLogin ? 'Sign In to CodeArena' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-colors"
                >
                  {isLogin ? 'Sign up here' : 'Sign in here'}
                </button>
              </p>
            </div>

            {/* Demo credentials hint */}
            {isLogin && (
              <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 border border-orange-200/50 dark:border-orange-800/30 rounded-lg">
                <div className="text-center">
                  <p className="font-semibold text-orange-800 dark:text-orange-200 mb-2">🚀 Demo Credentials</p>
                  <div className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                    <p><span className="font-medium">Enrollment:</span> CS2021001</p>
                    <p><span className="font-medium">Password:</span> Any password works!</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            By continuing, you agree to CodeArena's Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
