import React from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { mockRatingHistory, mockSubmissionStats, mockTopicSkills, mockActivityData, difficulty } from '../data/mockData';

const DashboardPage = () => {
  const { user } = useApp();

  const CircularProgress = ({ value, size = 120, strokeWidth = 8, label, color = "hsl(var(--primary))" }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">{value}%</span>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      </div>
    );
  };

  const getHeatmapClass = (count) => {
    if (count === 0) return 'color-empty';
    if (count <= 1) return 'color-github-1';
    if (count <= 2) return 'color-github-2';
    if (count <= 3) return 'color-github-3';
    return 'color-github-4';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.fullName?.split(' ')[0]}! 👋</h1>
        <p className="text-muted-foreground">Here's your competitive programming journey overview</p>
      </div>

      {/* Top Row - Profile Summary & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={user?.profilePhoto} alt={user?.fullName} />
                <AvatarFallback>{user?.fullName?.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{user?.username}</p>
                <p className="text-sm text-muted-foreground">Rating: {user?.rating}</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{user?.stats?.totalProblems}</p>
                <p className="text-sm text-muted-foreground">Problems Solved</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">{user?.stats?.streakDays}</p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-info">{user?.stats?.contestsParticipated}</p>
                <p className="text-sm text-muted-foreground">Contests</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">#{user?.stats?.currentRank}</p>
                <p className="text-sm text-muted-foreground">Global Rank</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Problems Solved Breakdown */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Problems Solved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-success rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Easy</span>
                      <span className="text-sm text-muted-foreground">{difficulty.Easy.solved}/{difficulty.Easy.total}</span>
                    </div>
                    <Progress value={(difficulty.Easy.solved / difficulty.Easy.total) * 100} className="h-2" />
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-warning rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Medium</span>
                      <span className="text-sm text-muted-foreground">{difficulty.Medium.solved}/{difficulty.Medium.total}</span>
                    </div>
                    <Progress value={(difficulty.Medium.solved / difficulty.Medium.total) * 100} className="h-2" />
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-destructive rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Hard</span>
                      <span className="text-sm text-muted-foreground">{difficulty.Hard.solved}/{difficulty.Hard.total}</span>
                    </div>
                    <Progress value={(difficulty.Hard.solved / difficulty.Hard.total) * 100} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="ml-8">
                <CircularProgress 
                  value={Math.round((user?.stats?.acceptedSubmissions / user?.stats?.totalSubmissions) * 100)} 
                  label="Acceptance"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row - Rating History & Submission Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rating History */}
        <Card>
          <CardHeader>
            <CardTitle>Rating History</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
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

        {/* Submission Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Submission Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={mockSubmissionStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="count"
                >
                  {mockSubmissionStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${(index % 5) + 1}))`} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {mockSubmissionStats.map((stat, index) => (
                <div key={stat.verdict} className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: `hsl(var(--chart-${(index % 5) + 1}))` }}
                  ></div>
                  <span className="text-muted-foreground">{stat.verdict}</span>
                  <span className="font-medium">{stat.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Third Row - Activity Map & Topic Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Map */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Activity Map</CardTitle>
            <p className="text-sm text-muted-foreground">Your daily submission activity over the past year</p>
          </CardHeader>
          <CardContent>
            <div className="w-full">
              <CalendarHeatmap
                startDate={new Date('2024-01-01')}
                endDate={new Date('2024-12-31')}
                values={mockActivityData}
                classForValue={(value) => {
                  if (!value) return 'color-empty';
                  return getHeatmapClass(value.count);
                }}
                tooltipDataAttrs={(value) => {
                  return {
                    'data-tip': `${value.date}: ${value.count || 0} submissions`,
                  };
                }}
              />
              <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-heatmap-empty border rounded"></div>
                  <div className="w-3 h-3 bg-heatmap-level1 rounded"></div>
                  <div className="w-3 h-3 bg-heatmap-level2 rounded"></div>
                  <div className="w-3 h-3 bg-heatmap-level3 rounded"></div>
                  <div className="w-3 h-3 bg-heatmap-level4 rounded"></div>
                </div>
                <span>More</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Topic Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Topic Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={mockTopicSkills}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="topic" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                />
                <Radar
                  name="Proficiency"
                  dataKey="proficiency"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Badges Section */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <p className="text-sm text-muted-foreground">Your earned badges and achievements</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {user?.badges?.map((badge) => (
              <div key={badge.id} className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                badge.earned 
                  ? 'border-primary bg-primary/5' 
                  : 'border-dashed border-muted-foreground/30 grayscale opacity-50'
              }`}>
                <div className="text-3xl mb-2">{badge.icon}</div>
                <h3 className="font-medium text-center">{badge.name}</h3>
                {badge.earned && (
                  <Badge variant="secondary" className="mt-2">Earned</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;