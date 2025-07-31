import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { mockProblems } from '../data/mockData';

const ProblemListPage = () => {
  const { navigateTo } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [topicFilter, setTopicFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');

  // Get unique values for filters
  const topics = [...new Set(mockProblems.map(p => p.topic))];
  const companies = [...new Set(mockProblems.map(p => p.company))];

  // Filter problems based on current filters
  const filteredProblems = useMemo(() => {
    return mockProblems.filter(problem => {
      const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           problem.topic.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = difficultyFilter === 'all' || problem.difficulty === difficultyFilter;
      const matchesStatus = statusFilter === 'all' || problem.status === statusFilter;
      const matchesTopic = topicFilter === 'all' || problem.topic === topicFilter;
      const matchesCompany = companyFilter === 'all' || problem.company === companyFilter;

      return matchesSearch && matchesDifficulty && matchesStatus && matchesTopic && matchesCompany;
    });
  }, [searchQuery, difficultyFilter, statusFilter, topicFilter, companyFilter]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Solved':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-success">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22,4 12,14.01 9,11.01"/>
          </svg>
        );
      case 'Attempted':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-warning">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 12l4 4 8-8"/>
          </svg>
        );
      default:
        return (
          <div className="w-4 h-4 border-2 border-muted-foreground rounded-full"></div>
        );
    }
  };

  const getDifficultyBadge = (difficulty) => {
    const variants = {
      Easy: 'bg-success/10 text-success border-success/20',
      Medium: 'bg-warning/10 text-warning border-warning/20',
      Hard: 'bg-destructive/10 text-destructive border-destructive/20'
    };
    return variants[difficulty] || 'bg-muted/10 text-muted-foreground';
  };

  const handleProblemClick = (problem) => {
    // In a real app, this would navigate to the problem solving page
    navigateTo('problem-solve');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Problem List</h1>
        <p className="text-muted-foreground">Practice coding problems to improve your skills</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="lg:col-span-2">
              <Input
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Solved">Solved</SelectItem>
                <SelectItem value="Attempted">Attempted</SelectItem>
                <SelectItem value="Unsolved">Unsolved</SelectItem>
              </SelectContent>
            </Select>

            <Select value={topicFilter} onValueChange={setTopicFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Topics</SelectItem>
                {topics.map(topic => (
                  <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={companyFilter} onValueChange={setCompanyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Companies</SelectItem>
                {companies.map(company => (
                  <SelectItem key={company} value={company}>{company}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProblems.length} of {mockProblems.length} problems
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setDifficultyFilter('all');
                setStatusFilter('all');
                setTopicFilter('all');
                setCompanyFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Problems Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="w-16">Status</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Topic</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Acceptance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProblems.map((problem) => (
                <TableRow 
                  key={problem.id} 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleProblemClick(problem)}
                >
                  <TableCell>
                    {getStatusIcon(problem.status)}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium hover:text-primary transition-colors">
                      {problem.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {problem.topic}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`text-xs border ${getDifficultyBadge(problem.difficulty)}`}
                    >
                      {problem.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground text-sm">{problem.company}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-sm font-medium">{problem.acceptanceRate}%</span>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredProblems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <div className="text-muted-foreground">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto mb-4 opacity-50">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="M21 21l-4.35-4.35"/>
                      </svg>
                      <p className="text-lg font-medium mb-2">No problems found</p>
                      <p className="text-sm">Try adjusting your search filters</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProblemListPage;