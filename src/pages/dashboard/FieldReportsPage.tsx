import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus, CheckCircle, XCircle, FileText, Filter } from "lucide-react";
import { fieldReports, sites, generators, zones, users } from "@/data/mockData";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { renderLocalizedString } from "@/utils/localizedString";

const FieldReportsPage = () => {
  const { toast } = useToast();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const zoneId = queryParams.get("zoneId");
  const siteId = queryParams.get("siteId");
  
  const [selectedZone, setSelectedZone] = useState<string>(zoneId || 'all');
  const [selectedSite, setSelectedSite] = useState<string>(siteId || 'all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [filteredReports, setFilteredReports] = useState<any[]>(fieldReports);
  const [zoneSites, setZoneSites] = useState<any[]>([]);
  
  useEffect(() => {
    document.title = "Fuel Flow Planner - Field Reports";
    
    // Update available sites based on selected zone
    if (selectedZone !== 'all') {
      setZoneSites(sites.filter(site => site.zoneId === selectedZone));
      if (selectedSite !== 'all' && !sites.some(site => site.id === selectedSite && site.zoneId === selectedZone)) {
        setSelectedSite('all');
      }
    } else {
      setZoneSites(sites);
    }
    
    // Filter reports
    filterReports();
  }, [selectedZone, selectedSite, selectedStatus, zoneId, siteId]);
  
  const filterReports = () => {
    let filtered = [...fieldReports];
    
    // Filter by site directly
    if (selectedSite !== 'all') {
      filtered = filtered.filter(report => report.siteId === selectedSite);
    }
    // Or filter by zone
    else if (selectedZone !== 'all') {
      const zoneSiteIds = sites.filter(site => site.zoneId === selectedZone).map(site => site.id);
      filtered = filtered.filter(report => zoneSiteIds.includes(report.siteId));
    }
    
    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(report => report.status === selectedStatus);
    }
    
    setFilteredReports(filtered);
  };

  const handleCreateReport = () => {
    toast({
      title: "Feature Not Available",
      description: "Creating field reports will be available soon.",
      duration: 3000,
    });
  };

  return (
    <DashboardLayout 
      title="Field Reports"
      description="View and manage field team reports for generators and tanks"
      actions={
        <Button size="sm" onClick={handleCreateReport}>
          <Plus className="h-4 w-4 mr-1" />
          Create Report
        </Button>
      }
    >
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-1/3">
          <label className="text-sm font-medium block mb-2">Zone</label>
          <Select 
            value={selectedZone} 
            onValueChange={setSelectedZone}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Zones</SelectItem>
              {zones.map(zone => (
                <SelectItem key={zone.id} value={zone.id}>
                  {renderLocalizedString(zone.name)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-1/3">
          <label className="text-sm font-medium block mb-2">Site</label>
          <Select 
            value={selectedSite} 
            onValueChange={setSelectedSite}
            disabled={zoneSites.length === 0}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select site" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sites</SelectItem>
              {zoneSites.map(site => (
                <SelectItem key={site.id} value={site.id}>
                  {renderLocalizedString(site.name)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-1/3">
          <label className="text-sm font-medium block mb-2">Status</label>
          <Select 
            value={selectedStatus} 
            onValueChange={setSelectedStatus}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="pending">Pending Review ({fieldReports.filter(r => r.status === "submitted").length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="mt-6">
          <div className="bg-card rounded-lg border shadow-sm">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="text-sm text-muted-foreground">
                Showing {filteredReports.length} of {fieldReports.length} reports
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                More Filters
              </Button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Report Date</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Site</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Generator</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Submitted By</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Status</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Readings</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.length > 0 ? (
                  filteredReports.map(report => {
                    const site = sites.find(s => s.id === report.siteId);
                    const generator = generators.find(g => g.id === report.generatorId);
                    const submitter = users.find(u => u.id === report.submittedBy);
                    const reviewer = report.reviewedBy ? users.find(u => u.id === report.reviewedBy) : null;
                    
                    return (
                      <tr key={report.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{report.reportDate}</td>
                        <td className="py-3 px-4">
                          <Link to={`/sites/${site?.id}`} className="hover:underline">
                            {site ? renderLocalizedString(site.name) : 'Unknown'}
                          </Link>
                        </td>
                        <td className="py-3 px-4">
                          <Link to={`/generators/${generator?.id}`} className="hover:underline">
                            {generator ? renderLocalizedString(generator.name) : 'Unknown'}
                          </Link>
                        </td>
                        <td className="py-3 px-4">{submitter?.name || report.submittedBy}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            report.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 
                            report.status === 'submitted' ? 'bg-blue-100 text-blue-800' : 
                            report.status === 'under_review' ? 'bg-amber-100 text-amber-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{report.readings.length}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="h-8" onClick={() => {
                              toast({
                                title: "View Report",
                                description: "This feature will be available soon."
                              });
                            }}>
                              <FileText className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            
                            {report.status === 'submitted' && (
                              <>
                                <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => {
                                  toast({
                                    title: "Approve Report",
                                    description: "This feature will be available soon."
                                  });
                                }}>
                                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                                </Button>
                                <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => {
                                  toast({
                                    title: "Reject Report",
                                    description: "This feature will be available soon."
                                  });
                                }}>
                                  <XCircle className="h-4 w-4 text-red-600" />
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-muted-foreground">
                      No field reports match your filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="pending" className="mt-6">
          <div className="space-y-6">
            {fieldReports.filter(r => r.status === "submitted").map(report => {
              const site = sites.find(s => s.id === report.siteId);
              const generator = generators.find(g => g.id === report.generatorId);
              const submitter = users.find(u => u.id === report.submittedBy);
              
              return (
                <div key={report.id} className="bg-card rounded-lg border shadow-sm p-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 border-b pb-4 mb-4">
                    <div>
                      <h3 className="text-lg font-medium">
                        Field Report - {report.reportDate}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Submitted by {submitter?.name || report.submittedBy}
                      </p>
                    </div>
                    <div>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Pending Review
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Site</p>
                      <p className="text-sm">
                        <Link to={`/sites/${site?.id}`} className="hover:underline">
                          {site ? renderLocalizedString(site.name) : 'Unknown'} ({site ? renderLocalizedString(site.location) : ''})
                        </Link>
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-1">Generator</p>
                      <p className="text-sm">
                        <Link to={`/generators/${generator?.id}`} className="hover:underline">
                          {generator ? renderLocalizedString(generator.name) : 'Unknown'} ({generator ? renderLocalizedString(generator.location) : ''})
                        </Link>
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Tank Readings</p>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left font-medium text-muted-foreground">Tank</th>
                          <th className="py-2 px-4 text-left font-medium text-muted-foreground">Fuel Level</th>
                          <th className="py-2 px-4 text-left font-medium text-muted-foreground">Timestamp</th>
                          <th className="py-2 px-4 text-left font-medium text-muted-foreground">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {report.readings.map((reading: any, index: number) => (
                          <tr key={index} className="border-b">
                            <td className="py-2 px-4">{reading.tankId}</td>
                            <td className="py-2 px-4">
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-muted rounded-full h-1.5">
                                  <div 
                                    className={`h-1.5 rounded-full ${
                                      reading.fuelLevel > 70 ? 'bg-emerald-500' : 
                                      reading.fuelLevel > 30 ? 'bg-amber-500' : 
                                      'bg-red-500'
                                    }`} 
                                    style={{ width: `${Math.min(100, reading.fuelLevel / 10)}%` }}
                                  ></div>
                                </div>
                                <span>{reading.fuelLevel}L</span>
                              </div>
                            </td>
                            <td className="py-2 px-4">{reading.timestamp}</td>
                            <td className="py-2 px-4">{reading.notes || 'No notes'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {report.notes && (
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-1">Notes</p>
                      <p className="text-sm text-muted-foreground">{renderLocalizedString(report.notes)}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" size="sm" onClick={() => {
                      toast({
                        title: "Report Rejected",
                        description: "This feature will be available soon."
                      });
                    }}>
                      <XCircle className="h-4 w-4 mr-1 text-red-600" />
                      Reject
                    </Button>
                    <Button size="sm" onClick={() => {
                      toast({
                        title: "Report Approved",
                        description: "This feature will be available soon."
                      });
                    }}>
                      <CheckCircle className="h-4 w-4 mr-1 text-emerald-600" />
                      Approve
                    </Button>
                  </div>
                </div>
              );
            })}
            
            {fieldReports.filter(r => r.status === "submitted").length === 0 && (
              <div className="bg-card rounded-lg border shadow-sm p-8 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Pending Reports</h3>
                <p className="text-muted-foreground mb-6">
                  All submitted field reports have been reviewed.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default FieldReportsPage;
