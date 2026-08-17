'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FolderKanban,
  Lightbulb,
  GraduationCap,
  Award,
  User,
  Save,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ArrowLeft,
  Terminal,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { IPortfolioData, IProject, ISkill, ITimelineItem, ICertificate } from '@/core/models/PortfolioModels';
import { getImageSrc } from '@/shared/lib/utils';
import { portfolioData } from '@/core/data/portfolioData';

export default function AdminPage() {
  const [data, setData] = useState<IPortfolioData>(portfolioData);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'timeline' | 'certs' | 'profile'>('projects');
  const [isLocal, setIsLocal] = useState(true);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [copiedGit, setCopiedGit] = useState(false);

  // Edit / Add Modals state
  const [editingProject, setEditingProject] = useState<{ index: number; item: IProject } | null>(null);
  const [editingSkill, setEditingSkill] = useState<{ index: number; item: ISkill } | null>(null);
  const [editingTimeline, setEditingTimeline] = useState<{ type: 'education' | 'career'; index: number; item: ITimelineItem } | null>(null);
  const [editingCert, setEditingCert] = useState<{ index: number; item: ICertificate } | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetch('/api/admin/portfolio')
      .then((res) => res.json())
      .then((result) => {
        if (isMounted && result.data) {
          setData(result.data);
          setIsLocal(result.isLocal !== false);
        }
      })
      .catch((err) => {
        console.warn('Loaded initial bundled data fallback:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSaveToFile = async () => {
    if (!data) return;
    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/admin/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setStatusMessage({ type: 'success', text: result.message || 'Saved to file successfully!' });
      } else {
        setStatusMessage({ type: 'error', text: result.error || 'Failed to save changes' });
      }
    } catch (err) {
      console.error('Save error:', err);
      setStatusMessage({ type: 'error', text: 'Network error while saving data to local file.' });
    } finally {
      setSaving(false);
    }
  };

  const copyGitCommand = () => {
    const cmd = 'git add src/core/data/portfolioData.json && git commit -m "feat(portfolio): update portfolio data" && git push';
    navigator.clipboard.writeText(cmd);
    setCopiedGit(true);
    setTimeout(() => setCopiedGit(false), 3000);
  };

  // --- Project Helpers ---
  const saveProject = (project: IProject, index: number) => {
    if (!data) return;
    const updated = [...data.projects];
    if (index >= 0) {
      updated[index] = project;
    } else {
      updated.unshift(project);
    }
    setData({ ...data, projects: updated });
    setEditingProject(null);
  };

  const deleteProject = (index: number) => {
    if (!data || !confirm('Are you sure you want to delete this project?')) return;
    const updated = data.projects.filter((_, i) => i !== index);
    setData({ ...data, projects: updated });
  };

  // --- Skill Helpers ---
  const saveSkill = (skill: ISkill, index: number) => {
    if (!data) return;
    const updated = [...data.skills];
    if (index >= 0) {
      updated[index] = skill;
    } else {
      updated.push(skill);
    }
    setData({ ...data, skills: updated });
    setEditingSkill(null);
  };

  const deleteSkill = (index: number) => {
    if (!data || !confirm('Are you sure you want to delete this skill?')) return;
    const updated = data.skills.filter((_, i) => i !== index);
    setData({ ...data, skills: updated });
  };

  // --- Timeline Helpers ---
  const saveTimeline = (type: 'education' | 'career', item: ITimelineItem, index: number) => {
    if (!data) return;
    const updated = [...data[type]];
    if (index >= 0) {
      updated[index] = item;
    } else {
      updated.unshift(item);
    }
    setData({ ...data, [type]: updated });
    setEditingTimeline(null);
  };

  const deleteTimeline = (type: 'education' | 'career', index: number) => {
    if (!data || !confirm(`Delete this ${type} item?`)) return;
    const updated = data[type].filter((_, i) => i !== index);
    setData({ ...data, [type]: updated });
  };

  // --- Certificate Helpers ---
  const saveCert = (cert: ICertificate, index: number) => {
    if (!data) return;
    const updated = [...data.certificates];
    if (index >= 0) {
      updated[index] = cert;
    } else {
      updated.push(cert);
    }
    setData({ ...data, certificates: updated });
    setEditingCert(null);
  };

  const deleteCert = (index: number) => {
    if (!data || !confirm('Delete this certificate?')) return;
    const updated = data.certificates.filter((_, i) => i !== index);
    setData({ ...data, certificates: updated });
  };



  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-xl border-b border-border/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
              title="Return to Portfolio"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight">Portfolio Admin CMS</h1>
                <Badge variant={isLocal ? 'default' : 'secondary'} className="text-[10px] uppercase font-bold">
                  {isLocal ? 'Local Dev Mode' : 'Production Read-Only'}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Changes are saved directly to <code className="text-foreground font-mono">portfolioData.json</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link href="/" target="_blank" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              <span>View Site</span>
              <ExternalLink size={12} />
            </Link>
            <Button
              onClick={handleSaveToFile}
              disabled={saving}
              className="bg-foreground text-background hover:bg-foreground/90 font-bold px-6 shadow-lg ml-auto sm:ml-0"
            >
              {saving ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" /> Save to File
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Notification Toast */}
      {statusMessage && (
        <div className="max-w-7xl mx-auto px-6 pt-4">
          <div
            className={`p-4 rounded-xl flex items-center justify-between border ${
              statusMessage.type === 'success'
                ? 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400'
                : 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400'
            }`}
          >
            <div className="flex items-center gap-3">
              {statusMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
              <span className="text-sm font-medium">{statusMessage.text}</span>
            </div>
            <button onClick={() => setStatusMessage(null)} className="text-xs opacity-60 hover:opacity-100 font-bold">
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Git Helper Card */}
        <Card className="bg-card/40 border-border/60 backdrop-blur-md">
          <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-foreground/5 text-foreground">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Push changes to Production</p>
                <p className="text-xs text-muted-foreground">After clicking &ldquo;Save to File&rdquo;, commit and push to sync Vercel / GitHub automatically.</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={copyGitCommand}
              className="text-xs font-mono border-border/70 hover:bg-secondary w-full md:w-auto"
            >
              {copiedGit ? <Check className="w-3.5 h-3.5 mr-1.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
              {copiedGit ? 'Copied to Clipboard!' : 'Copy Git Push Command'}
            </Button>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border/40">
          {[
            { id: 'projects', label: 'Projects', icon: FolderKanban, count: data.projects.length },
            { id: 'skills', label: 'Skills', icon: Lightbulb, count: data.skills.length },
            { id: 'timeline', label: 'Timeline & Career', icon: GraduationCap, count: data.education.length + data.career.length },
            { id: 'certs', label: 'Certificates', icon: Award, count: data.certificates.length },
            { id: 'profile', label: 'Profile & Bio', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'projects' | 'skills' | 'timeline' | 'certs' | 'profile')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-foreground text-background shadow-md'
                    : 'bg-card/50 text-muted-foreground hover:text-foreground hover:bg-secondary/70 border border-border/40'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[11px] px-2 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-background/20 text-background' : 'bg-secondary text-foreground'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Projects Management</h2>
                <p className="text-sm text-muted-foreground">Add, edit, or remove showcase projects from your portfolio.</p>
              </div>
              <Button
                onClick={() =>
                  setEditingProject({
                    index: -1,
                    item: {
                      id: `project-${Date.now()}`,
                      title: '',
                      role: 'Developer',
                      image: '/src/assets/img/proj/project_neoshop.webp',
                      link: '',
                      githubLink: '',
                      status: 'completed',
                      technologies: ['React', 'TypeScript'],
                      startDate: new Date().toISOString().split('T')[0],
                      category: 'personal',
                    },
                  })
                }
                className="bg-foreground text-background hover:bg-foreground/90 font-bold"
              >
                <Plus className="w-4 h-4 mr-1.5" /> Add Project
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.projects.map((project, idx) => (
                <Card key={project.id || idx} className="border-border/60 bg-card/60 overflow-hidden flex flex-col justify-between group">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <Badge variant="outline" className="text-[10px] uppercase font-bold">
                        {project.category}
                      </Badge>
                      <Badge variant={project.status === 'completed' ? 'secondary' : 'default'} className="text-[10px]">
                        {project.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-bold text-foreground line-clamp-1">{project.title}</CardTitle>
                    <CardDescription className="text-xs text-muted-foreground">{project.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/80 text-foreground border border-border/40">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground truncate font-mono">
                      {project.link || project.githubLink || 'No external links'}
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-border/40">
                      <Button variant="outline" size="sm" onClick={() => setEditingProject({ index: idx, item: { ...project } })} className="flex-1">
                        <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => deleteProject(idx)} className="shrink-0 px-3 flex items-center justify-center">
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SKILLS */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Skills Management</h2>
                <p className="text-sm text-muted-foreground">Manage your technical stack, colors, categories, and icon mappings.</p>
              </div>
              <Button
                onClick={() =>
                  setEditingSkill({
                    index: -1,
                    item: {
                      name: '',
                      icon: 'react',
                      color: '#61DAFB',
                      category: 'frontend',
                    },
                  })
                }
                className="bg-foreground text-background hover:bg-foreground/90 font-bold"
              >
                <Plus className="w-4 h-4 mr-1.5" /> Add Skill
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-card/60 border border-border/60 flex items-center justify-between gap-3 group hover:border-foreground/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-border/80 flex items-center justify-center font-bold text-xs" style={{ color: skill.color }}>
                      {skill.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground">{skill.name}</p>
                      <p className="text-[11px] text-muted-foreground uppercase">{skill.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                    <Button variant="ghost" size="icon-sm" onClick={() => setEditingSkill({ index: idx, item: { ...skill } })}>
                      <Edit2 size={14} />
                    </Button>
                    <Button variant="ghost" size="icon-sm" onClick={() => deleteSkill(idx)} className="text-red-500 hover:text-red-600">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: TIMELINE & CAREER */}
        {activeTab === 'timeline' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Education */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" /> Education
                </h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    setEditingTimeline({
                      type: 'education',
                      index: -1,
                      item: {
                        year: '2023 - 2027',
                        title: '',
                        subtitle: '',
                        location: 'Hồ Chí Minh',
                        extra: '',
                        details: [],
                      },
                    })
                  }
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Education
                </Button>
              </div>

              <div className="space-y-4">
                {data.education.map((item, idx) => (
                  <Card key={idx} className="border-border/60 bg-card/60">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs font-bold text-muted-foreground">{item.year}</p>
                          <h4 className="font-bold text-base text-foreground">{item.title}</h4>
                          <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon-sm" onClick={() => setEditingTimeline({ type: 'education', index: idx, item: { ...item } })}>
                            <Edit2 size={14} />
                          </Button>
                          <Button variant="ghost" size="icon-sm" onClick={() => deleteTimeline('education', idx)} className="text-red-500">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                      {item.extra && <p className="text-xs text-foreground/80 whitespace-pre-wrap">{item.extra}</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Career */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <User className="w-5 h-5" /> Career Timeline
                </h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    setEditingTimeline({
                      type: 'career',
                      index: -1,
                      item: {
                        year: 'Present',
                        title: '',
                        subtitle: '',
                        location: 'Remote',
                        extra: '',
                        details: [],
                      },
                    })
                  }
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Career
                </Button>
              </div>

              <div className="space-y-4">
                {data.career.map((item, idx) => (
                  <Card key={idx} className="border-border/60 bg-card/60">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs font-bold text-muted-foreground">{item.year}</p>
                          <h4 className="font-bold text-base text-foreground">{item.title}</h4>
                          <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon-sm" onClick={() => setEditingTimeline({ type: 'career', index: idx, item: { ...item } })}>
                            <Edit2 size={14} />
                          </Button>
                          <Button variant="ghost" size="icon-sm" onClick={() => deleteTimeline('career', idx)} className="text-red-500">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                      {item.extra && <p className="text-xs text-foreground/80 whitespace-pre-wrap">{item.extra}</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CERTIFICATES */}
        {activeTab === 'certs' && (
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">Certificates & Awards</h3>
                  <p className="text-xs text-muted-foreground">Manage your credentials and credentials images.</p>
                </div>
                <Button
                  size="sm"
                  onClick={() =>
                    setEditingCert({
                      index: -1,
                      item: {
                        title: '',
                        image: '/src/assets/img/cert/gemini-educator.webp',
                        rating: 1,
                        status: '',
                      },
                    })
                  }
                  className="bg-foreground text-background font-bold"
                >
                  <Plus className="w-4 h-4 mr-1.5" /> Add Certificate
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {data.certificates.map((cert, idx) => (
                  <Card key={idx} className="border-border/60 bg-card/60">
                    <CardContent className="p-4 space-y-3">
                      <div className="h-28 rounded-lg bg-secondary/50 overflow-hidden flex items-center justify-center">
                        <img
                          src={getImageSrc(cert.image)}
                          alt={cert.title}
                          className="h-full object-contain"
                        />
                      </div>
                      <h4 className="font-bold text-sm line-clamp-1">{cert.title}</h4>
                      <div className="flex justify-end gap-2 pt-2 border-t border-border/40">
                        <Button variant="ghost" size="icon-sm" onClick={() => setEditingCert({ index: idx, item: { ...cert } })}>
                          <Edit2 size={14} />
                        </Button>
                        <Button variant="ghost" size="icon-sm" onClick={() => deleteCert(idx)} className="text-red-500">
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PROFILE & BIO */}
        {activeTab === 'profile' && (
          <div className="space-y-6 max-w-4xl">
            <Card className="border-border/60 bg-card/60">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Personal Profile & Bio</CardTitle>
                <CardDescription>Update your general information, typewriter headline roles, and summary.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Display Name</label>
                    <Input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Full Legal Name</label>
                    <Input
                      value={data.personalInfo.fullname}
                      onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, fullname: e.target.value } })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Typewriter Roles (Comma-separated)</label>
                  <Input
                    value={data.roles.join(', ')}
                    onChange={(e) =>
                      setData({
                        ...data,
                        roles: e.target.value
                          .split(',')
                          .map((r) => r.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                  <p className="text-[11px] text-muted-foreground">Example: Software Developer, Fullstack Engineer, Game Developer</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Bio Description</label>
                  <Textarea rows={4} value={data.bio} onChange={(e) => setData({ ...data, bio: e.target.value })} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Date of Birth</label>
                    <Input
                      value={data.personalInfo.dateOfBirth}
                      onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, dateOfBirth: e.target.value } })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Gender</label>
                    <Input
                      value={data.personalInfo.gender}
                      onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, gender: e.target.value } })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Location / Address</label>
                    <Input
                      value={data.personalInfo.address}
                      onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, address: e.target.value } })}
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-border/40">
                  <h4 className="font-bold text-sm">Social Media Links</h4>
                  {data.socialLinks.map((link, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="w-24 text-xs font-bold uppercase text-muted-foreground">{link.platform}</span>
                      <Input
                        value={link.url}
                        onChange={(e) => {
                          const updated = [...data.socialLinks];
                          updated[idx] = { ...updated[idx], url: e.target.value };
                          setData({ ...data, socialLinks: updated });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* --- EDIT PROJECT MODAL --- */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto border-border shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{editingProject.index >= 0 ? 'Edit Project' : 'Add New Project'}</CardTitle>
              <button onClick={() => setEditingProject(null)} className="text-muted-foreground hover:text-foreground font-bold">
                ✕
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold">Project Title</label>
                  <Input
                    value={editingProject.item.title}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        item: { ...editingProject.item, title: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold">Role</label>
                  <Input
                    value={editingProject.item.role}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        item: { ...editingProject.item, role: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold">Category</label>
                  <select
                    className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs"
                    value={editingProject.item.category}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        item: { ...editingProject.item, category: e.target.value as 'personal' | 'school' | 'unity' },
                      })
                    }
                  >
                    <option value="personal">Personal Project</option>
                    <option value="school">School Project</option>
                    <option value="unity">Unity Developer</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold">Status</label>
                  <select
                    className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs"
                    value={editingProject.item.status}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        item: { ...editingProject.item, status: e.target.value as 'completed' | 'in-progress' },
                      })
                    }
                  >
                    <option value="completed">Completed</option>
                    <option value="in-progress">In Progress</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Technologies (Comma-separated)</label>
                <Input
                  value={editingProject.item.technologies.join(', ')}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      item: {
                        ...editingProject.item,
                        technologies: e.target.value
                          .split(',')
                          .map((t) => t.trim())
                          .filter(Boolean),
                      },
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold">Demo URL</label>
                  <Input
                    value={editingProject.item.link}
                    placeholder="https://..."
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        item: { ...editingProject.item, link: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold">GitHub URL</label>
                  <Input
                    value={editingProject.item.githubLink}
                    placeholder="https://github.com/..."
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        item: { ...editingProject.item, githubLink: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Image Path or URL</label>
                <Input
                  value={typeof editingProject.item.image === 'string' ? editingProject.item.image : ''}
                  placeholder="/src/assets/img/proj/project_neoshop.webp"
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      item: { ...editingProject.item, image: e.target.value },
                    })
                  }
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setEditingProject(null)}>
                  Cancel
                </Button>
                <Button onClick={() => saveProject(editingProject.item, editingProject.index)} className="bg-foreground text-background font-bold">
                  Save Project
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* --- EDIT SKILL MODAL --- */}
      {editingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <Card className="max-w-md w-full border-border shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{editingSkill.index >= 0 ? 'Edit Skill' : 'Add New Skill'}</CardTitle>
              <button onClick={() => setEditingSkill(null)} className="text-muted-foreground hover:text-foreground font-bold">
                ✕
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold">Skill Name</label>
                <Input
                  value={editingSkill.item.name}
                  onChange={(e) =>
                    setEditingSkill({
                      ...editingSkill,
                      item: { ...editingSkill.item, name: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Category</label>
                <select
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs"
                  value={editingSkill.item.category}
                  onChange={(e) =>
                    setEditingSkill({
                      ...editingSkill,
                      item: { ...editingSkill.item, category: e.target.value as 'frontend' | 'backend' | 'database' | 'devops' },
                    })
                  }
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="database">Database</option>
                  <option value="devops">DevOps & Tools</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold">Brand Color (HEX)</label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      className="w-10 p-0 h-9 rounded-md cursor-pointer"
                      value={editingSkill.item.color.startsWith('#') ? editingSkill.item.color : '#61DAFB'}
                      onChange={(e) =>
                        setEditingSkill({
                          ...editingSkill,
                          item: { ...editingSkill.item, color: e.target.value },
                        })
                      }
                    />
                    <Input
                      value={editingSkill.item.color}
                      onChange={(e) =>
                        setEditingSkill({
                          ...editingSkill,
                          item: { ...editingSkill.item, color: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold">Icon Key</label>
                  <Input
                    value={editingSkill.item.icon}
                    placeholder="react, typescript, java..."
                    onChange={(e) =>
                      setEditingSkill({
                        ...editingSkill,
                        item: { ...editingSkill.item, icon: e.target.value },
                      })
                    }
                  />
                </div>
              </div>



              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setEditingSkill(null)}>
                  Cancel
                </Button>
                <Button onClick={() => saveSkill(editingSkill.item, editingSkill.index)} className="bg-foreground text-background font-bold">
                  Save Skill
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* --- EDIT TIMELINE MODAL --- */}
      {editingTimeline && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <Card className="max-w-md w-full border-border shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                {editingTimeline.index >= 0 ? 'Edit' : 'Add'} {editingTimeline.type === 'education' ? 'Education' : 'Career'} Item
              </CardTitle>
              <button onClick={() => setEditingTimeline(null)} className="text-muted-foreground hover:text-foreground font-bold">
                ✕
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold">Title / Institution</label>
                <Input
                  value={editingTimeline.item.title || ''}
                  onChange={(e) =>
                    setEditingTimeline({
                      ...editingTimeline,
                      item: { ...editingTimeline.item, title: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold">Subtitle / Degree / Role</label>
                <Input
                  value={editingTimeline.item.subtitle || ''}
                  onChange={(e) =>
                    setEditingTimeline({
                      ...editingTimeline,
                      item: { ...editingTimeline.item, subtitle: e.target.value },
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold">Year / Duration</label>
                  <Input
                    value={editingTimeline.item.year}
                    onChange={(e) =>
                      setEditingTimeline({
                        ...editingTimeline,
                        item: { ...editingTimeline.item, year: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold">Location</label>
                  <Input
                    value={editingTimeline.item.location || ''}
                    onChange={(e) =>
                      setEditingTimeline({
                        ...editingTimeline,
                        item: { ...editingTimeline.item, location: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold">Extra Details (Supports Markdown links)</label>
                <Textarea
                  rows={3}
                  value={editingTimeline.item.extra || ''}
                  onChange={(e) =>
                    setEditingTimeline({
                      ...editingTimeline,
                      item: { ...editingTimeline.item, extra: e.target.value },
                    })
                  }
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setEditingTimeline(null)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => saveTimeline(editingTimeline.type, editingTimeline.item, editingTimeline.index)}
                  className="bg-foreground text-background font-bold"
                >
                  Save Timeline
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* --- EDIT CERTIFICATE MODAL --- */}
      {editingCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <Card className="max-w-md w-full border-border shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{editingCert.index >= 0 ? 'Edit Certificate' : 'Add New Certificate'}</CardTitle>
              <button onClick={() => setEditingCert(null)} className="text-muted-foreground hover:text-foreground font-bold">
                ✕
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold">Certificate Title</label>
                <Input
                  value={editingCert.item.title}
                  onChange={(e) =>
                    setEditingCert({
                      ...editingCert,
                      item: { ...editingCert.item, title: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold">Image Path or URL</label>
                <Input
                  value={typeof editingCert.item.image === 'string' ? editingCert.item.image : ''}
                  onChange={(e) =>
                    setEditingCert({
                      ...editingCert,
                      item: { ...editingCert.item, image: e.target.value },
                    })
                  }
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setEditingCert(null)}>
                  Cancel
                </Button>
                <Button onClick={() => saveCert(editingCert.item, editingCert.index)} className="bg-foreground text-background font-bold">
                  Save Certificate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
