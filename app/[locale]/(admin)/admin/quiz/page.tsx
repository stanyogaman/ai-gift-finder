'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/layout/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Link } from '@/lib/i18n/navigation';
import {
  HelpCircle,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Loader2,
  GripVertical,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface QuizOption {
  id: string;
  value: string;
  label_en: string;
  label_ru: string;
  icon?: string;
}

interface QuizQuestion {
  id: string;
  order: number;
  key: string;
  type: 'single' | 'multi' | 'text' | 'slider';
  title_en: string;
  title_ru: string;
  description_en?: string;
  description_ru?: string;
  options: QuizOption[];
}

export default function AdminQuizPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/admin/quiz');
      if (response.ok) {
        const data = await response.json();
        setQuestions(data.questions || []);
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveQuestion = async (question: QuizQuestion) => {
    try {
      const method = question.id ? 'PUT' : 'POST';
      const response = await fetch('/api/admin/quiz', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(question),
      });

      if (response.ok) {
        await fetchQuestions();
        setIsDialogOpen(false);
        setEditingQuestion(null);
      }
    } catch (error) {
      console.error('Failed to save question:', error);
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return;

    try {
      const response = await fetch(`/api/admin/quiz?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchQuestions();
      }
    } catch (error) {
      console.error('Failed to delete question:', error);
    }
  };

  const handleMoveQuestion = async (id: string, direction: 'up' | 'down') => {
    const index = questions.findIndex((q) => q.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === questions.length - 1)
    ) {
      return;
    }

    const newQuestions = [...questions];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newQuestions[index], newQuestions[targetIndex]] = [
      newQuestions[targetIndex],
      newQuestions[index],
    ];

    // Update order values
    newQuestions.forEach((q, i) => (q.order = i));
    setQuestions(newQuestions);

    // Save to server
    try {
      await fetch('/api/admin/quiz/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions: newQuestions.map((q) => ({ id: q.id, order: q.order })) }),
      });
    } catch (error) {
      console.error('Failed to reorder questions:', error);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <HelpCircle className="h-8 w-8 text-purple-500" />
        <h1 className="text-3xl font-bold">Quiz Management</h1>
      </div>

      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">
          Manage quiz questions and their options. Drag to reorder.
        </p>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="gradient"
              onClick={() => {
                setEditingQuestion(null);
                setIsDialogOpen(true);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingQuestion ? 'Edit Question' : 'Add New Question'}
              </DialogTitle>
            </DialogHeader>
            <QuestionForm
              question={editingQuestion}
              onSave={handleSaveQuestion}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingQuestion(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {questions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No questions yet. Add your first question!</p>
            </CardContent>
          </Card>
        ) : (
          questions.map((question, index) => (
            <Card key={question.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleMoveQuestion(question.id, 'up')}
                      disabled={index === 0}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <GripVertical className="h-4 w-4 text-muted-foreground mx-auto" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleMoveQuestion(question.id, 'down')}
                      disabled={index === questions.length - 1}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">#{index + 1}</Badge>
                      <Badge>{question.type}</Badge>
                      <span className="font-mono text-sm text-muted-foreground">
                        {question.key}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-1">{question.title_en}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{question.title_ru}</p>

                    {expandedQuestion === question.id && (
                      <div className="mt-4 p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2">Options:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {question.options.map((option) => (
                            <div
                              key={option.id}
                              className="text-sm p-2 bg-background rounded"
                            >
                              <span className="font-mono text-xs text-muted-foreground">
                                {option.value}
                              </span>
                              <p>{option.label_en}</p>
                              <p className="text-muted-foreground">{option.label_ru}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setExpandedQuestion(
                          expandedQuestion === question.id ? null : question.id
                        )
                      }
                    >
                      {expandedQuestion === question.id ? 'Collapse' : 'Expand'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditingQuestion(question);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDeleteQuestion(question.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

interface QuestionFormProps {
  question: QuizQuestion | null;
  onSave: (question: QuizQuestion) => void;
  onCancel: () => void;
}

function QuestionForm({ question, onSave, onCancel }: QuestionFormProps) {
  const [formData, setFormData] = useState<QuizQuestion>(
    question || {
      id: '',
      order: 0,
      key: '',
      type: 'single',
      title_en: '',
      title_ru: '',
      description_en: '',
      description_ru: '',
      options: [],
    }
  );

  const [newOption, setNewOption] = useState({
    value: '',
    label_en: '',
    label_ru: '',
    icon: '',
  });

  const addOption = () => {
    if (!newOption.value || !newOption.label_en) return;

    setFormData({
      ...formData,
      options: [
        ...formData.options,
        { ...newOption, id: crypto.randomUUID() },
      ],
    });
    setNewOption({ value: '', label_en: '', label_ru: '', icon: '' });
  };

  const removeOption = (id: string) => {
    setFormData({
      ...formData,
      options: formData.options.filter((o) => o.id !== id),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="key">Key (unique identifier)</Label>
          <Input
            id="key"
            value={formData.key}
            onChange={(e) => setFormData({ ...formData, key: e.target.value })}
            placeholder="e.g., relationship"
            required
          />
        </div>
        <div>
          <Label htmlFor="type">Question Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value: 'single' | 'multi' | 'text' | 'slider') =>
              setFormData({ ...formData, type: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single Choice</SelectItem>
              <SelectItem value="multi">Multiple Choice</SelectItem>
              <SelectItem value="text">Text Input</SelectItem>
              <SelectItem value="slider">Slider</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="title_en">Title (English)</Label>
        <Input
          id="title_en"
          value={formData.title_en}
          onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
          placeholder="Who are you shopping for?"
          required
        />
      </div>

      <div>
        <Label htmlFor="title_ru">Title (Russian)</Label>
        <Input
          id="title_ru"
          value={formData.title_ru}
          onChange={(e) => setFormData({ ...formData, title_ru: e.target.value })}
          placeholder="Для кого вы выбираете подарок?"
        />
      </div>

      <div>
        <Label htmlFor="description_en">Description (English)</Label>
        <Textarea
          id="description_en"
          value={formData.description_en || ''}
          onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
          placeholder="Optional helper text"
        />
      </div>

      <div>
        <Label htmlFor="description_ru">Description (Russian)</Label>
        <Textarea
          id="description_ru"
          value={formData.description_ru || ''}
          onChange={(e) => setFormData({ ...formData, description_ru: e.target.value })}
          placeholder="Дополнительный текст"
        />
      </div>

      {(formData.type === 'single' || formData.type === 'multi') && (
        <div>
          <Label>Options</Label>
          <div className="space-y-2 mt-2">
            {formData.options.map((option) => (
              <div
                key={option.id}
                className="flex items-center gap-2 p-2 bg-muted rounded"
              >
                <span className="font-mono text-sm">{option.value}</span>
                <span className="flex-1">{option.label_en}</span>
                <span className="text-muted-foreground">{option.label_ru}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => removeOption(option.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}

            <div className="grid grid-cols-4 gap-2 mt-4">
              <Input
                placeholder="Value"
                value={newOption.value}
                onChange={(e) => setNewOption({ ...newOption, value: e.target.value })}
              />
              <Input
                placeholder="Label (EN)"
                value={newOption.label_en}
                onChange={(e) => setNewOption({ ...newOption, label_en: e.target.value })}
              />
              <Input
                placeholder="Label (RU)"
                value={newOption.label_ru}
                onChange={(e) => setNewOption({ ...newOption, label_ru: e.target.value })}
              />
              <Button type="button" variant="outline" onClick={addOption}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="gradient">
          Save Question
        </Button>
      </div>
    </form>
  );
}
