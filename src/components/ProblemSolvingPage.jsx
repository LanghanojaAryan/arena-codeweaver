import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { oneDark } from '@codemirror/theme-one-dark';
import { useApp } from '../context/AppContext';
import { mockProblems, mockSubmissions } from '../data/mockData';

const ProblemSolvingPage = () => {
  const { theme } = useApp();
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('// Write your solution here\nfunction solution() {\n    \n}');
  const [customInput, setCustomInput] = useState('');
  const [customOutput, setCustomOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(50);
  const [isResizing, setIsResizing] = useState(false);

  // For demo, we'll use the first problem
  const currentProblem = mockProblems[0];

  const languages = [
    { value: 'javascript', label: 'JavaScript', extension: javascript },
    { value: 'python', label: 'Python', extension: python },
    { value: 'cpp', label: 'C++', extension: cpp },
    { value: 'java', label: 'Java', extension: java }
  ];

  const getCurrentLanguageExtension = () => {
    return languages.find(lang => lang.value === selectedLanguage)?.extension || javascript;
  };

  const handleRun = async () => {
    setIsRunning(true);
    // Simulate code execution
    setTimeout(() => {
      setCustomOutput('Output:\n[0, 1]\n\nExpected:\n[0, 1]\n\n✅ Test case passed!');
      setIsRunning(false);
    }, 1500);
  };

  const handleSubmit = () => {
    // In a real app, this would submit the solution
    alert('Solution submitted successfully!');
  };

  const handleReset = () => {
    setCode('// Write your solution here\nfunction solution() {\n    \n}');
    setCustomInput('');
    setCustomOutput('');
  };

  // Resizable panel handlers
  const handleMouseDown = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    const containerWidth = window.innerWidth - 48; // Account for padding
    const newWidth = (e.clientX / containerWidth) * 100;
    setLeftPanelWidth(Math.min(Math.max(newWidth, 20), 80));
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing]);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Problems
          </Button>
          <div>
            <h1 className="text-xl font-bold">{currentProblem.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  currentProblem.difficulty === 'Easy' ? 'border-success text-success' :
                  currentProblem.difficulty === 'Medium' ? 'border-warning text-warning' :
                  'border-destructive text-destructive'
                }`}
              >
                {currentProblem.difficulty}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {currentProblem.topic}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Left Panel */}
        <div className="bg-card rounded-lg border" style={{ width: `${leftPanelWidth}%` }}>
          <Tabs defaultValue="description" className="h-full flex flex-col">
            <div className="border-b px-4 py-2">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="testcase">Test Case</TabsTrigger>
                <TabsTrigger value="submissions">Submissions</TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-auto">
              <TabsContent value="description" className="p-6 space-y-6 mt-0">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Problem Statement</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {currentProblem.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Examples</h4>
                  {currentProblem.examples.map((example, index) => (
                    <div key={index} className="bg-muted/30 rounded-lg p-4 mb-4">
                      <p className="font-medium mb-2">Example {index + 1}:</p>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Input:</span>
                          <code className="block bg-background p-2 rounded mt-1 font-mono text-xs">
                            {example.input}
                          </code>
                        </div>
                        <div>
                          <span className="font-medium">Output:</span>
                          <code className="block bg-background p-2 rounded mt-1 font-mono text-xs">
                            {example.output}
                          </code>
                        </div>
                        <p className="text-muted-foreground">
                          <span className="font-medium">Explanation:</span> {example.explanation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Constraints</h4>
                  <pre className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg whitespace-pre-wrap">
                    {currentProblem.constraints}
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="testcase" className="p-6 space-y-4 mt-0">
                <div>
                  <h4 className="font-semibold mb-3">Custom Test Case</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Input:</label>
                      <Textarea
                        placeholder="Enter your test input..."
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        className="font-mono text-sm"
                        rows={4}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Output:</label>
                      <Textarea
                        placeholder="Output will appear here..."
                        value={customOutput}
                        readOnly
                        className="font-mono text-sm bg-muted/30"
                        rows={6}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="submissions" className="p-6 mt-0">
                <div className="space-y-4">
                  <h4 className="font-semibold">Your Submissions</h4>
                  {mockSubmissions.slice(0, 2).map((submission) => (
                    <Card key={submission.id} className="border-l-4 border-l-primary/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge 
                            variant="outline"
                            className={submission.status === 'Accepted' ? 'border-success text-success' : 'border-destructive text-destructive'}
                          >
                            {submission.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(submission.submittedAt).toLocaleString()}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Language:</span>
                            <p className="font-medium">{submission.language}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Runtime:</span>
                            <p className="font-medium">{submission.runtime}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Memory:</span>
                            <p className="font-medium">{submission.memory}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Resizer */}
        <div 
          className="w-1 bg-border hover:bg-primary/50 cursor-col-resize flex-shrink-0"
          onMouseDown={handleMouseDown}
        />

        {/* Right Panel - Code Editor */}
        <div className="flex-1 bg-card rounded-lg border flex flex-col min-w-0">
          {/* Editor Header */}
          <div className="border-b p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleReset}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                  <path d="M21 3v5h-5"/>
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                  <path d="M8 16H3v5"/>
                </svg>
                Reset
              </Button>
              <Button variant="outline" size="sm" onClick={handleRun} disabled={isRunning}>
                {isRunning ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2 animate-spin">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                    <polygon points="5,3 19,12 5,21"/>
                  </svg>
                )}
                Run
              </Button>
              <Button size="sm" onClick={handleSubmit}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                  <path d="M12 19l7-7 3 3-7 7-3-3z"/>
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
                  <path d="M2 2l7.586 7.586"/>
                  <circle cx="11" cy="11" r="2"/>
                </svg>
                Submit
              </Button>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 overflow-auto">
            <CodeMirror
              value={code}
              onChange={(value) => setCode(value)}
              extensions={[getCurrentLanguageExtension()]}
              theme={theme === 'dark' ? oneDark : undefined}
              className="h-full text-sm"
              basicSetup={{
                lineNumbers: true,
                foldGutter: true,
                dropCursor: false,
                allowMultipleSelections: false,
                indentOnInput: true,
                bracketMatching: true,
                closeBrackets: true,
                autocompletion: true,
                highlightSelectionMatches: false,
                searchKeymap: true,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolvingPage;