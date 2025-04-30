
import React from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sites, zones, users, generators, fuelPlans } from '@/data/mockData';
import { Fuel, Map, Users, Calendar } from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const ZoneDetailsPage = () => {
  const { zoneId } = useParams<{ zoneId: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Find the zone data
  const zone = zones.find(z => z.id === zoneId);
  
  if (!zone) {
    return (
      <DashboardLayout title="Zone Not Found" description="The requested zone could not be found.">
        <Button variant="outline" onClick={() => navigate('/zones')}>
          Back to Zones
        </Button>
      </DashboardLayout>
    );
  }
  
  // Get related data
  const supervisor = users.find(u => u.id === zone.supervisorId);
  const zoneSites = sites.filter(s => s.zoneId === zone.id);
  const zoneGenerators = generators.filter(g => zoneSites.some(s => s.id === g.siteId));
  const zoneFuelPlans = fuelPlans.filter(p => p.zoneId === zone.id);
  
  return (
    <DashboardLayout 
      title={zone.name} 
      description={`Zone details and management for ${zone.name}`}
      actions={
        <>
          <Button variant="outline" size="sm" asChild>
            <Link to="/zones">Back to Zones</Link>
          </Button>
          <Button size="sm" onClick={() => toast({
            title: "Feature Not Available",
            description: "Editing zone details will be available soon."
          })}>
            Edit Zone
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="col-span-2">
          <div className="bg-card rounded-lg border p-4">
            <h2 className="text-lg font-semibold mb-2">Zone Information</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Description:</span> {zone.description}</p>
              <p>
                <span className="font-medium">Supervisor:</span>{" "}
                {supervisor ? supervisor.name : "No supervisor assigned"}
              </p>
              <p><span className="font-medium">Sites:</span> {zoneSites.length}</p>
              <p><span className="font-medium">Generators:</span> {zoneGenerators.length}</p>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-card rounded-lg border p-4">
            <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
            <div className="space-y-2">
              <Button className="w-full" variant="outline" size="sm" onClick={() => navigate('/planning')}>
                <Calendar className="h-4 w-4 mr-2" />
                Manage Fuel Plans
              </Button>
              <Button className="w-full" variant="outline" size="sm" onClick={() => toast({
                title: "Feature Not Available",
                description: "Assigning supervisors will be available soon."
              })}>
                <Users className="h-4 w-4 mr-2" />
                Assign Supervisor
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="sites" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="sites">Sites</TabsTrigger>
          <TabsTrigger value="generators">Generators</TabsTrigger>
          <TabsTrigger value="plans">Fuel Plans</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sites" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Sites in {zone.name}</h2>
            <Button size="sm" onClick={() => toast({
              title: "Feature Not Available",
              description: "Adding new sites will be available soon."
            })}>
              Add Site
            </Button>
          </div>
          
          {zoneSites.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {zoneSites.map(site => (
                <div key={site.id} className="bg-card rounded-lg border p-4">
                  <h3 className="font-semibold">{site.name}</h3>
                  <p className="text-sm text-muted-foreground">{site.location}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-sm">{site.generators.length} generators</span>
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/sites/${site.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No sites in this zone yet.</p>
          )}
        </TabsContent>
        
        <TabsContent value="generators" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Generators in {zone.name}</h2>
          </div>
          
          {zoneGenerators.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {zoneGenerators.map(generator => {
                const site = sites.find(s => s.id === generator.siteId);
                return (
                  <div key={generator.id} className="bg-card rounded-lg border p-4">
                    <h3 className="font-semibold">{generator.name}</h3>
                    <p className="text-sm text-muted-foreground">{site?.name}</p>
                    <div className="mt-2">
                      <div className="bg-gray-100 dark:bg-gray-800 h-2 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${generator.status === 'operational' ? 'bg-green-500' : generator.status === 'maintenance' ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${generator.fuelLevel}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>Fuel level: {generator.fuelLevel}%</span>
                        <span className={`${generator.status === 'operational' ? 'text-green-500' : generator.status === 'maintenance' ? 'text-amber-500' : 'text-red-500'}`}>
                          {generator.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/generators/${generator.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No generators in this zone yet.</p>
          )}
        </TabsContent>
        
        <TabsContent value="plans" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Fuel Plans for {zone.name}</h2>
            <Button size="sm" onClick={() => navigate('/planning')}>
              Create New Plan
            </Button>
          </div>
          
          {zoneFuelPlans.length > 0 ? (
            <div className="space-y-4">
              {zoneFuelPlans.map(plan => (
                <div key={plan.id} className="bg-card rounded-lg border p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold">
                      Plan for {new Date(plan.month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      plan.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                      plan.status === 'submitted' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                    }`}>
                      {plan.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Created by: {users.find(u => u.id === plan.createdBy)?.name || 'Unknown'}
                  </p>
                  <p className="text-sm">Items: {plan.planItems.length}</p>
                  <div className="mt-3 flex justify-end">
                    <Button size="sm" variant="outline" onClick={() => navigate('/planning', { state: { planId: plan.id } })}>
                      View Plan
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No fuel plans for this zone yet.</p>
          )}
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Reports for {zone.name}</h2>
            <Button size="sm" onClick={() => navigate('/reports')}>
              View All Reports
            </Button>
          </div>
          
          <p>Field reports and analytics for this zone will be available soon.</p>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ZoneDetailsPage;
