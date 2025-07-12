
import { Link } from "react-router-dom";
import { Users, Shield, CheckSquare, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            TaskFlow Management System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Streamline your workforce management with our comprehensive task tracking platform
          </p>
        </div>

        {/* Portal Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-blue-300">
            <CardHeader className="bg-blue-600 text-white rounded-t-lg">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8" />
                <div>
                  <CardTitle className="text-2xl">Employee Portal</CardTitle>
                  <CardDescription className="text-blue-100">
                    Access your tasks and submit completion reports
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <CheckSquare className="h-5 w-5 text-green-600" />
                  <span>View assigned tasks</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckSquare className="h-5 w-5 text-green-600" />
                  <span>Complete task checklists</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckSquare className="h-5 w-5 text-green-600" />
                  <span>Submit progress reports</span>
                </div>
              </div>
              <Link to="/employee-login" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors">
                  Employee Login
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-purple-300">
            <CardHeader className="bg-purple-600 text-white rounded-t-lg">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8" />
                <div>
                  <CardTitle className="text-2xl">Admin Portal</CardTitle>
                  <CardDescription className="text-purple-100">
                    Monitor employee progress and manage tasks
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  <span>View employee progress</span>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  <span>Generate completion reports</span>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  <span>Manage task assignments</span>
                </div>
              </div>
              <Link to="/admin-login" className="w-full">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 transition-colors">
                  Admin Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
