'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/layout/AuthProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Handshake, Loader2, ExternalLink, Mail } from 'lucide-react';

interface PartnerRequest {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  company: string | null;
  website: string | null;
  country: string | null;
  message: string;
  status: 'NEW' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED';
  notes: string | null;
}

export default function AdminPartnersPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [requests, setRequests] = useState<PartnerRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<PartnerRequest | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Fetch partner requests - for demo, use sample data
    setRequests(getSampleRequests());
    setIsLoading(false);
  }, []);

  const filteredRequests =
    filterStatus === 'all'
      ? requests
      : requests.filter((r) => r.status === filterStatus);

  const handleStatusChange = (id: string, status: PartnerRequest['status']) => {
    setRequests(requests.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const handleNotesUpdate = (id: string, notes: string) => {
    setRequests(requests.map((r) => (r.id === id ? { ...r, notes } : r)));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'bg-blue-100 text-blue-800';
      case 'IN_REVIEW':
        return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading || isLoading) {
    return (
      <div className="container py-12 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Handshake className="h-8 w-8 text-orange-500" />
          <h1 className="text-3xl font-bold">Partnership Requests</h1>
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Requests</SelectItem>
            <SelectItem value="NEW">New</SelectItem>
            <SelectItem value="IN_REVIEW">In Review</SelectItem>
            <SelectItem value="APPROVED">Approved</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Requests Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium">Date</th>
                  <th className="text-left p-4 font-medium">Contact</th>
                  <th className="text-left p-4 font-medium">Company</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="border-t">
                    <td className="p-4 text-sm text-muted-foreground">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <p className="font-medium">{request.name}</p>
                      <a
                        href={`mailto:${request.email}`}
                        className="text-sm text-purple-600 hover:underline flex items-center gap-1"
                      >
                        <Mail className="h-3 w-3" />
                        {request.email}
                      </a>
                    </td>
                    <td className="p-4">
                      <p>{request.company || '—'}</p>
                      {request.website && (
                        <a
                          href={request.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-purple-600 hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Website
                        </a>
                      )}
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedRequest(request)}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog
        open={!!selectedRequest}
        onOpenChange={(open) => !open && setSelectedRequest(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Partnership Request Details</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedRequest.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a
                    href={`mailto:${selectedRequest.email}`}
                    className="font-medium text-purple-600 hover:underline"
                  >
                    {selectedRequest.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Company</p>
                  <p className="font-medium">{selectedRequest.company || '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Country</p>
                  <p className="font-medium">{selectedRequest.country || '—'}</p>
                </div>
              </div>

              {selectedRequest.website && (
                <div>
                  <p className="text-sm text-muted-foreground">Website</p>
                  <a
                    href={selectedRequest.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-purple-600 hover:underline"
                  >
                    {selectedRequest.website}
                  </a>
                </div>
              )}

              <div>
                <p className="text-sm text-muted-foreground mb-2">Message</p>
                <div className="p-4 bg-muted rounded-lg">
                  <p>{selectedRequest.message}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Status</p>
                <Select
                  value={selectedRequest.status}
                  onValueChange={(value) =>
                    handleStatusChange(
                      selectedRequest.id,
                      value as PartnerRequest['status']
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NEW">New</SelectItem>
                    <SelectItem value="IN_REVIEW">In Review</SelectItem>
                    <SelectItem value="APPROVED">Approved</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Internal Notes</p>
                <Textarea
                  value={selectedRequest.notes || ''}
                  onChange={(e) =>
                    handleNotesUpdate(selectedRequest.id, e.target.value)
                  }
                  placeholder="Add notes about this request..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  variant="gradient"
                  onClick={() => setSelectedRequest(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function getSampleRequests(): PartnerRequest[] {
  return [
    {
      id: '1',
      createdAt: new Date().toISOString(),
      name: 'John Smith',
      email: 'john@example.com',
      company: 'Gift Co.',
      website: 'https://giftco.example.com',
      country: 'United States',
      message: 'We would love to partner with AI Gift Finder. Our company specializes in personalized gifts and we think there is a great opportunity for collaboration.',
      status: 'NEW',
      notes: null,
    },
    {
      id: '2',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      name: 'Jane Doe',
      email: 'jane@influencer.com',
      company: null,
      website: 'https://instagram.com/janedoe',
      country: 'Canada',
      message: 'Im a gift content creator with 50K followers. Interested in affiliate partnership.',
      status: 'IN_REVIEW',
      notes: 'Good engagement on Instagram. Follow up next week.',
    },
  ];
}
