'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/layout/AuthProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
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
  FileText,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Loader2,
  Eye,
  EyeOff,
  Calendar,
  User,
} from 'lucide-react';

interface BlogCategory {
  id: string;
  slug: string;
  name_en: string;
  name_ru: string;
}

interface BlogPost {
  id: string;
  slug: string;
  title_en: string;
  title_ru: string;
  excerpt_en: string;
  excerpt_ru: string;
  content_en: string;
  content_ru: string;
  featuredImage?: string;
  categoryId?: string;
  category?: BlogCategory;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPostsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleSavePost = async (post: BlogPost) => {
    try {
      const method = post.id ? 'PUT' : 'POST';
      const response = await fetch('/api/admin/posts', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        await fetchPosts();
        setIsDialogOpen(false);
        setEditingPost(null);
      }
    } catch (error) {
      console.error('Failed to save post:', error);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`/api/admin/posts?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchPosts();
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleTogglePublished = async (post: BlogPost) => {
    try {
      await fetch('/api/admin/posts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...post,
          published: !post.published,
          publishedAt: !post.published ? new Date().toISOString() : post.publishedAt,
        }),
      });
      await fetchPosts();
    } catch (error) {
      console.error('Failed to toggle published:', error);
    }
  };

  const filteredPosts = posts.filter((post) => {
    if (filter === 'published') return post.published;
    if (filter === 'draft') return !post.published;
    return true;
  });

  if (loading || isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-5xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <FileText className="h-8 w-8 text-blue-500" />
        <h1 className="text-3xl font-bold">Blog Posts</h1>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All ({posts.length})
          </Button>
          <Button
            variant={filter === 'published' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('published')}
          >
            Published ({posts.filter((p) => p.published).length})
          </Button>
          <Button
            variant={filter === 'draft' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('draft')}
          >
            Drafts ({posts.filter((p) => !p.published).length})
          </Button>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="gradient"
              onClick={() => {
                setEditingPost(null);
                setIsDialogOpen(true);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPost ? 'Edit Post' : 'Create New Post'}
              </DialogTitle>
            </DialogHeader>
            <PostForm
              post={editingPost}
              categories={categories}
              onSave={handleSavePost}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingPost(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {filter === 'all'
                  ? 'No posts yet. Create your first blog post!'
                  : `No ${filter} posts.`}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {post.featuredImage && (
                    <img
                      src={post.featuredImage}
                      alt={post.title_en}
                      className="w-24 h-16 object-cover rounded"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={post.published ? 'default' : 'secondary'}>
                        {post.published ? (
                          <><Eye className="h-3 w-3 mr-1" /> Published</>
                        ) : (
                          <><EyeOff className="h-3 w-3 mr-1" /> Draft</>
                        )}
                      </Badge>
                      {post.category && (
                        <Badge variant="outline">{post.category.name_en}</Badge>
                      )}
                    </div>
                    <h3 className="font-semibold truncate">{post.title_en}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {post.excerpt_en}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                      <span className="font-mono">/blog/{post.slug}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleTogglePublished(post)}
                    >
                      {post.published ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditingPost(post);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDeletePost(post.id)}
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

interface PostFormProps {
  post: BlogPost | null;
  categories: BlogCategory[];
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}

function PostForm({ post, categories, onSave, onCancel }: PostFormProps) {
  const [formData, setFormData] = useState<BlogPost>(
    post || {
      id: '',
      slug: '',
      title_en: '',
      title_ru: '',
      excerpt_en: '',
      excerpt_ru: '',
      content_en: '',
      content_ru: '',
      featuredImage: '',
      categoryId: '',
      published: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  );

  const [activeTab, setActiveTab] = useState<'en' | 'ru'>('en');

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (value: string, locale: 'en' | 'ru') => {
    const updates: Partial<BlogPost> = {
      [`title_${locale}`]: value,
    };
    if (locale === 'en' && !post) {
      updates.slug = generateSlug(value);
    }
    setFormData({ ...formData, ...updates });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="slug">URL Slug</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="my-blog-post"
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.categoryId || ''}
            onValueChange={(value) =>
              setFormData({ ...formData, categoryId: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name_en}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="featuredImage">Featured Image URL</Label>
        <Input
          id="featuredImage"
          value={formData.featuredImage || ''}
          onChange={(e) =>
            setFormData({ ...formData, featuredImage: e.target.value })
          }
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="flex gap-2 border-b">
        <button
          type="button"
          className={`px-4 py-2 -mb-px ${
            activeTab === 'en'
              ? 'border-b-2 border-purple-500 font-medium'
              : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('en')}
        >
          English
        </button>
        <button
          type="button"
          className={`px-4 py-2 -mb-px ${
            activeTab === 'ru'
              ? 'border-b-2 border-purple-500 font-medium'
              : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('ru')}
        >
          Russian
        </button>
      </div>

      {activeTab === 'en' ? (
        <div className="space-y-4">
          <div>
            <Label htmlFor="title_en">Title (English)</Label>
            <Input
              id="title_en"
              value={formData.title_en}
              onChange={(e) => handleTitleChange(e.target.value, 'en')}
              placeholder="10 Best Tech Gifts for 2024"
              required
            />
          </div>
          <div>
            <Label htmlFor="excerpt_en">Excerpt (English)</Label>
            <Textarea
              id="excerpt_en"
              value={formData.excerpt_en}
              onChange={(e) =>
                setFormData({ ...formData, excerpt_en: e.target.value })
              }
              placeholder="A brief summary of the post..."
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="content_en">Content (English) - Markdown</Label>
            <Textarea
              id="content_en"
              value={formData.content_en}
              onChange={(e) =>
                setFormData({ ...formData, content_en: e.target.value })
              }
              placeholder="# Heading&#10;&#10;Your content here..."
              rows={12}
              className="font-mono text-sm"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <Label htmlFor="title_ru">Title (Russian)</Label>
            <Input
              id="title_ru"
              value={formData.title_ru}
              onChange={(e) => handleTitleChange(e.target.value, 'ru')}
              placeholder="10 лучших технических подарков на 2024"
            />
          </div>
          <div>
            <Label htmlFor="excerpt_ru">Excerpt (Russian)</Label>
            <Textarea
              id="excerpt_ru"
              value={formData.excerpt_ru}
              onChange={(e) =>
                setFormData({ ...formData, excerpt_ru: e.target.value })
              }
              placeholder="Краткое описание поста..."
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="content_ru">Content (Russian) - Markdown</Label>
            <Textarea
              id="content_ru"
              value={formData.content_ru}
              onChange={(e) =>
                setFormData({ ...formData, content_ru: e.target.value })
              }
              placeholder="# Заголовок&#10;&#10;Ваш контент здесь..."
              rows={12}
              className="font-mono text-sm"
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Switch
          id="published"
          checked={formData.published}
          onCheckedChange={(checked) =>
            setFormData({
              ...formData,
              published: checked,
              publishedAt: checked ? new Date().toISOString() : formData.publishedAt,
            })
          }
        />
        <Label htmlFor="published">Publish immediately</Label>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="gradient">
          {post ? 'Update Post' : 'Create Post'}
        </Button>
      </div>
    </form>
  );
}
