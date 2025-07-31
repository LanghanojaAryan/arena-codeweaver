import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockRatingHistory, mockSubmissions, difficulty } from '../data/mockData';

const ProfilePage = () => {
  const { user, setUser } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: user?.fullName || '',
    username: user?.username || '',
    email: user?.email || '',
  });

  const handleSave = () => {
    setUser({
      ...user,
      ...editForm
    });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const getTotalProblems = () => {
    return difficulty.Easy.solved + difficulty.Medium.solved + difficulty.Hard.solved;
  };

  const getAcceptanceRate = () => {
    return Math.round((user?.stats?.acceptedSubmissions / user?.stats?.totalSubmissions) * 100);
  };

  const EditIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );

  const CheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20,6 9,17 4,12"/>
    </svg>
  );

  const XIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage your account and view your progress</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-1 space-y-6">
          {/* Basic Info Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Profile Information</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
                >
                  {isEditing ? <XIcon /> : <EditIcon />}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={user?.profilePhoto} alt={user?.fullName} />
                  <AvatarFallback className="text-lg">{user?.fullName?.substring(0, 2)}</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button variant="outline" size="sm" className="mb-4">
                    Change Photo
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="fullName"
                      name="fullName"
                      value={editForm.fullName}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="text-sm font-medium mt-1">{user?.fullName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="username">Username</Label>
                  {isEditing ? (
                    <Input
                      id="username"
                      name="username"
                      value={editForm.username}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="text-sm font-medium mt-1">@{user?.username}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="text-sm font-medium mt-1">{user?.email}</p>
                  )}
                </div>

                <div>
                  <Label>Enrollment Number</Label>
                  <p className="text-sm font-medium mt-1">{user?.enrollmentNo}</p>
                </div>

                {isEditing && (
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSave} size="sm" className="flex-1">
                      <CheckIcon className="mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)} size="sm" className="flex-1">
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Stats Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{user?.rating}</p>
                  <p className="text-sm text-muted-foreground">Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-info">#{user?.stats?.currentRank}</p>
                  <p className="text-sm text-muted-foreground">Global Rank</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">{getTotalProblems()}</p>
                  <p className="text-sm text-muted-foreground">Problems Solved</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-warning">{getAcceptanceRate()}%</p>
                  <p className="text-sm text-muted-foreground">Acceptance Rate</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{user?.stats?.contestsParticipated}</p>
                  <p className="text-sm text-muted-foreground">Contests</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-destructive">{user?.stats?.streakDays}</p>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {user?.badges?.filter(badge => badge.earned).map((badge) => (
                  <div key={badge.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                    <div className="text-2xl">{badge.icon}</div>
                    <div>
                      <p className="font-medium text-sm">{badge.name}</p>
                      <Badge variant="secondary" className="text-xs">Earned</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="activity" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="problems">Problems</TabsTrigger>
              <TabsTrigger value="contests">Contests</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="space-y-6">
              {/* Rating Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Rating Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockRatingHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="date" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="rating" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Recent Submissions */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockSubmissions.map((submission) => (
                      <div key={submission.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge 
                            variant="outline"
                            className={submission.status === 'Accepted' ? 'border-success text-success' : 'border-destructive text-destructive'}
                          >
                            {submission.status}
                          </Badge>
                          <div>
                            <p className="font-medium">{submission.problemTitle}</p>
                            <p className="text-sm text-muted-foreground">{submission.language}</p>
                          </div>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <p>{new Date(submission.submittedAt).toLocaleDateString()}</p>
                          <p>{submission.runtime}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="problems" className="space-y-6">
              {/* Problem Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-success">{difficulty.Easy.solved}</p>
                      <p className="text-sm text-muted-foreground mb-2">Easy</p>
                      <Progress value={(difficulty.Easy.solved / difficulty.Easy.total) * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {difficulty.Easy.solved}/{difficulty.Easy.total}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-warning">{difficulty.Medium.solved}</p>
                      <p className="text-sm text-muted-foreground mb-2">Medium</p>
                      <Progress value={(difficulty.Medium.solved / difficulty.Medium.total) * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {difficulty.Medium.solved}/{difficulty.Medium.total}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-destructive">{difficulty.Hard.solved}</p>
                      <p className="text-sm text-muted-foreground mb-2">Hard</p>
                      <Progress value={(difficulty.Hard.solved / difficulty.Hard.total) * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {difficulty.Hard.solved}/{difficulty.Hard.total}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="contests" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contest Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto mb-4 opacity-50">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                      <path d="M4 22h16"/>
                      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                    </svg>
                    <p className="text-lg font-medium mb-2">Contest History</p>
                    <p className="text-sm text-muted-foreground">Your contest participation and rankings will appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;