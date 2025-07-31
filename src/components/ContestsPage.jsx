import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { mockContests } from '../data/mockData';

const ContestsPage = () => {
  const { navigateTo } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const getStatusBadge = (status) => {
    const variants = {
      Live: 'bg-destructive text-destructive-foreground',
      Upcoming: 'bg-warning text-warning-foreground',
      Ended: 'bg-muted text-muted-foreground'
    };
    return variants[status] || 'bg-muted text-muted-foreground';
  };

  const getContestsByStatus = (status) => {
    if (status === 'all') return mockContests;
    return mockContests.filter(contest => contest.status.toLowerCase() === status);
  };

  const filteredContests = getContestsByStatus(activeTab).filter(contest =>
    contest.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
      })
    };
  };

  const handleContestClick = (contest) => {
    navigateTo('contest-details');
  };

  const contestStats = {
    total: mockContests.length,
    upcoming: mockContests.filter(c => c.status === 'Upcoming').length,
    live: mockContests.filter(c => c.status === 'Live').length,
    ended: mockContests.filter(c => c.status === 'Ended').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Contests</h1>
        <p className="text-muted-foreground">Participate in competitive programming contests</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{contestStats.total}</p>
              <p className="text-sm text-muted-foreground">Total Contests</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">{contestStats.upcoming}</p>
              <p className="text-sm text-muted-foreground">Upcoming</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-destructive">{contestStats.live}</p>
              <p className="text-sm text-muted-foreground">Live Now</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-muted-foreground">{contestStats.ended}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search contests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/>
              </svg>
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contest Tabs */}
      <Card>
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="live">Live</TabsTrigger>
              <TabsTrigger value="ended">Ended</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredContests.map((contest) => {
              const { date, time } = formatDateTime(contest.startTime);
              
              return (
                <Card 
                  key={contest.id} 
                  className="cursor-pointer hover:shadow-md transition-all border-l-4 border-l-primary/30 hover:border-l-primary"
                  onClick={() => handleContestClick(contest)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold hover:text-primary transition-colors">
                            {contest.title}
                          </h3>
                          <Badge className={getStatusBadge(contest.status)}>
                            {contest.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"/>
                              <polyline points="12,6 12,12 16,14"/>
                            </svg>
                            <span>{date} at {time}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                            </svg>
                            <span>Duration: {contest.duration} min</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                              <circle cx="9" cy="7" r="4"/>
                              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                            <span>{contest.participants.toLocaleString()} participants</span>
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="text-sm text-muted-foreground mb-2">Problems ({contest.problems.length}):</p>
                          <div className="flex flex-wrap gap-2">
                            {contest.problems.slice(0, 3).map((problem, index) => (
                              <Badge key={problem.id} variant="outline" className="text-xs">
                                {problem.title} ({problem.points}pts)
                              </Badge>
                            ))}
                            {contest.problems.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{contest.problems.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="ml-4">
                        <Button 
                          size="sm" 
                          variant={contest.status === 'Live' ? 'default' : contest.status === 'Upcoming' ? 'outline' : 'ghost'}
                          className={contest.status === 'Live' ? 'bg-destructive hover:bg-destructive/90' : ''}
                        >
                          {contest.status === 'Live' ? 'Join Now' : 
                           contest.status === 'Upcoming' ? 'Register' : 
                           'View Results'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {filteredContests.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto mb-4 opacity-50">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                    <path d="M4 22h16"/>
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                  </svg>
                  <p className="text-lg font-medium mb-2">No contests found</p>
                  <p className="text-sm">Try adjusting your search or check back later</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContestsPage;