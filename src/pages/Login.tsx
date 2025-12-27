import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const validateForm = () => {
    const newErrors = { email: "", password: "", general: "" };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = t("login.errors.emailRequired");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("login.errors.emailInvalid");
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = t("login.errors.passwordRequired");
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = t("login.errors.passwordLength");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({ email: "", password: "", general: "" });

    try {
      // Simulate API call - replace with actual authentication
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: t("login.success.title"),
        description: t("login.success.message"),
      });
      
      navigate("/");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: t("login.errors.general"),
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-sidebar relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sidebar via-sidebar to-primary/20" />
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-sidebar-foreground">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
              <Shield className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-center mb-4">
            {t("login.branding.title")}
          </h1>
          <p className="text-lg text-sidebar-foreground/80 text-center max-w-md">
            {t("login.branding.subtitle")}
          </p>
          
          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full -translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-20 right-10 w-32 h-32 bg-primary/10 rounded-full" />
          <div className="absolute top-1/3 left-10 w-20 h-20 bg-primary/5 rounded-full" />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Top Bar */}
        <div className="flex justify-between items-center p-6">
          <div className="lg:hidden flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            <span className="font-semibold text-foreground">GRC Platform</span>
          </div>
          <div className="ltr:ml-auto rtl:mr-auto">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="text-center lg:text-start">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                {t("login.title")}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {t("login.subtitle")}
              </p>
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span className="text-sm">{errors.general}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  {t("login.email.label")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("login.email.placeholder")}
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`h-12 ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">
                  {t("login.password.label")}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("login.password.placeholder")}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`h-12 ltr:pr-12 rtl:pl-12 ${errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute ltr:right-4 rtl:left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange("rememberMe", !!checked)}
                    disabled={isLoading}
                  />
                  <Label
                    htmlFor="rememberMe"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    {t("login.rememberMe")}
                  </Label>
                </div>
                <a
                  href="#"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  {t("login.forgotPassword")}
                </a>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 text-base font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t("login.signingIn")}
                  </>
                ) : (
                  t("login.signIn")
                )}
              </Button>
            </form>

            {/* SSO Options */}
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-background text-muted-foreground">
                    {t("login.orContinueWith")}
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full h-12"
                disabled={isLoading}
              >
                <svg className="w-5 h-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
                  />
                </svg>
                {t("login.ssoLogin")}
              </Button>
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-muted-foreground">
              {t("login.noAccount")}{" "}
              <a href="#" className="text-primary hover:text-primary/80 font-medium transition-colors">
                {t("login.contactAdmin")}
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="p-6 text-center text-sm text-muted-foreground">
          {t("login.copyright")}
        </div>
      </div>
    </div>
  );
};

export default Login;
