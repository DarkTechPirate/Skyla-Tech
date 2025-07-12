
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    adminName: "",
    adminCode: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    if (!formData.adminName || !formData.adminCode) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all fields to continue."
      });
      setIsLoading(false);
      return;
    }

    // Simple admin validation (in real app, this would be proper authentication)
    if (formData.adminCode !== "ADMIN123") {
      toast({
        variant: "destructive",
        title: "Invalid Admin Code",
        description: "Please enter the correct admin code."
      });
      setIsLoading(false);
      return;
    }

    // Simulate login process
    setTimeout(() => {
      // Store admin data in localStorage for demo purposes
      localStorage.setItem('adminData', JSON.stringify(formData));
      toast({
        title: "Admin Login Successful!",
        description: `Welcome ${formData.adminName}! Accessing admin dashboard...`
      });
      
      setTimeout(() => {
        navigate('/admin-dashboard');
      }, 1000);
      setIsLoading(false);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <Card className="shadow-xl border-0">
          <CardHeader className="bg-purple-600 text-white rounded-t-lg text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-purple-500 p-3 rounded-full">
                <Shield className="h-8 w-8" />
              </div>
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription className="text-purple-100">
              Access the administrative dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adminName">Admin Name</Label>
                <Input
                  id="adminName"
                  name="adminName"
                  type="text"
                  placeholder="Enter admin name"
                  value={formData.adminName}
                  onChange={handleInputChange}
                  className="transition-all focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="adminCode">Admin Code</Label>
                <Input
                  id="adminCode"
                  name="adminCode"
                  type="password"
                  placeholder="Enter admin code"
                  value={formData.adminCode}
                  onChange={handleInputChange}
                  className="transition-all focus:ring-2 focus:ring-purple-500"
                />
                <p className="text-sm text-gray-500">Demo code: ADMIN123</p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Admin Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
