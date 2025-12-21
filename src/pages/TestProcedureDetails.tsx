import { ArrowLeft, CheckCircle2, History, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const TestProcedureDetails = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      {/* Back Link */}
      <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Test Procedures
      </button>

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">Quarterly Access Review Test</h1>
            <p className="text-muted-foreground text-sm">Test Procedure ID: tp-001 | Version 2</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="action" size="sm">
            <History className="h-4 w-4" />
            Version History
          </Button>
          <Button variant="action" size="sm">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" size="sm">
            <Trash2 className="h-4 w-4" />
            Deprecate
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-2">Status</p>
            <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">Active</Badge>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-2">Test Type</p>
            <Badge variant="outline" className="text-foreground">Manual</Badge>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-2">Frequency</p>
            <Badge variant="outline" className="text-foreground">Quarterly</Badge>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-2">Version</p>
            <span className="text-xl font-bold">v2</span>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="bg-transparent border-b border-border w-full justify-start rounded-none h-auto p-0 mb-6">
          <TabsTrigger 
            value="details" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
          >
            Details
          </TabsTrigger>
          <TabsTrigger 
            value="scope" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
          >
            Scope & Sampling
          </TabsTrigger>
          <TabsTrigger 
            value="steps" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
          >
            Test Steps
          </TabsTrigger>
          <TabsTrigger 
            value="results" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
          >
            Expected Results
          </TabsTrigger>
          <TabsTrigger 
            value="evidence" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
          >
            Evidence
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Test Procedure Details</CardTitle>
              <CardDescription>Complete information about this test procedure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Description */}
              <div>
                <p className="text-sm font-medium text-primary mb-2">Description</p>
                <p className="text-foreground">Validate MFA adoption and access controls across all systems</p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Control ID</p>
                  <p className="font-medium">1</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Created By</p>
                  <p className="font-medium">John Smith</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Created At</p>
                  <p className="font-medium">1/15/2024</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Last Updated</p>
                  <p className="font-medium">2/20/2024</p>
                </div>
              </div>

              {/* Dependencies */}
              <div>
                <p className="text-sm font-medium text-primary mb-2">Dependencies</p>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    Depends on IAM system availability and SIEM data completeness
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scope">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <p className="text-muted-foreground">Scope & Sampling content...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="steps">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <p className="text-muted-foreground">Test Steps content...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <p className="text-muted-foreground">Expected Results content...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evidence">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <p className="text-muted-foreground">Evidence content...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TestProcedureDetails;
