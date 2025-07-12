
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Import company data from AdminDashboard
const COMPANIES = [
  { id: "company1", name: "Company 1" },
  { id: "company2", name: "Company 2" },
  { id: "company3", name: "Company 3" },
];

const EmployeeLogin = () => {
  const [formData, setFormData] = useState({
    companyId: "",
    employeeId: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    if (!formData.companyId || !formData.employeeId || !formData.password) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all fields to continue."
      });
      setIsLoading(false);
      return;
    }

    // Get stored credentials
    const credentials = JSON.parse(localStorage.getItem('employeeCredentials') || '[]');
    const employee = credentials.find(
      (cred: any) => 
        cred.employeeId === formData.employeeId && 
        cred.password === formData.password &&
        cred.companyId === formData.companyId
    );

    if (!employee) {
      toast({
        variant: "destructive",
        title: "Invalid Credentials",
        description: "Please check your Employee ID and password."
      });
      setIsLoading(false);
      return;
    }

    // Login successful
    const employeeData = {
      ...employee,
      company: COMPANIES.find(c => c.id === employee.companyId)?.name
    };

    // Store employee data in localStorage
    localStorage.setItem('employeeData', JSON.stringify(employeeData));
    
    toast({
      title: "Login Successful!",
      description: `Welcome ${employee.name}! Redirecting to your dashboard...`
    });
    
    setTimeout(() => {
      navigate('/employee-dashboard');
    }, 1000);
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <Card className="shadow-xl border-0">
          <CardHeader className="bg-blue-600 text-white rounded-t-lg text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-500 p-3 rounded-full">
                <Users className="h-8 w-8" />
              </div>
            </div>
            <CardTitle className="text-2xl">Employee Login</CardTitle>
            <CardDescription className="text-blue-100">
              Enter your credentials to access your tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Select 
                  onValueChange={(value) => setFormData({...formData, companyId: value})}
                  value={formData.companyId}
                >
                  <SelectTrigger className="transition-all focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select your company" />
                  </SelectTrigger>
                  <SelectContent>
                    {COMPANIES.filter(c => c.id !== "all").map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  name="employeeId"
                  type="text"
                  placeholder="Enter your employee ID"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  className="transition-all focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="transition-all focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeLogin;
