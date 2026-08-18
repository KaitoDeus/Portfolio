'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Upload,
  Search,
  Sparkles,
  GripVertical,
  ArrowUpDown,
  Layers,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { IPortfolioData, IProject, ISkill, ITimelineItem, ICertificate, ImageSource } from '@/core/models/PortfolioModels';
import { getImageSrc } from '@/shared/lib/utils';
import { portfolioData } from '@/core/data/portfolioData';
import { getDeviconSvgUrl, DEVICONS_LIST, IDeviconItem } from '@/shared/lib/devicon';

export default function AdminPage() {
  const [data, setData] = useState<IPortfolioData>(portfolioData);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'timeline' | 'certs' | 'profile'>('projects');
  const [isLocal, setIsLocal] = useState(true);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [copiedGit, setCopiedGit] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);

  // Devicon Picker state inside Edit Skill modal
  const [deviconSearch, setDeviconSearch] = useState('');
  const [deviconCategoryFilter, setDeviconCategoryFilter] = useState<'all' | 'frontend' | 'backend' | 'database' | 'devops' | 'tools'>('all');
  const [draggedSkillIndex, setDraggedSkillIndex] = useState<number | null>(null);

  // File input refs for uploading
  const projectFileRef = useRef<HTMLInputElement>(null);
  const certFileRef = useRef<HTMLInputElement>(null);

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

  const handleUpload = async (file: File, onDone: (url: string) => void) => {
    if (!file) return;
    setUploadingImg(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      if (res.ok && result.url) {
        onDone(result.url);
        setStatusMessage({ type: 'success', text: 'Image uploaded successfully to /uploads!' });
      } else {
        setStatusMessage({ type: 'error', text: result.error || 'Failed to upload image' });
      }
    } catch (err) {
      console.error('Upload error:', err);
      setStatusMessage({ type: 'error', text: 'Failed to upload image file.' });
    } finally {
      setUploadingImg(false);
    }
  };

  const serializePortfolioData = (input: IPortfolioData) => {
    const cleanImage = (img: ImageSource | string | undefined | null): string => {
      if (!img) return '';
      if (typeof img === 'string') return img;
      if (typeof img === 'object' && 'src' in img) return img.src;
      return String(img);
    };

    return {
      ...input,
      avatars: {
        hero: cleanImage(input.avatars?.hero),
        about: cleanImage(input.avatars?.about),
        skills: cleanImage(input.avatars?.skills),
        contact: cleanImage(input.avatars?.contact),
      },
      education: (input.education || []).map((item) => ({
        ...item,
        logo: cleanImage(item.logo),
      })),
      career: (input.career || []).map((item) => ({
        ...item,
        logo: cleanImage(item.logo),
      })),
      certificates: (input.certificates || []).map((cert) => ({
        ...cert,
        image: cleanImage(cert.image),
      })),
      projects: (input.projects || []).map((proj) => ({
        ...proj,
        image: cleanImage(proj.image),
      })),
    };
  };

  const handleSaveToFile = async () => {
    if (!data) return;
    setSaving(true);
    setStatusMessage(null);

    try {
      const cleanData = serializePortfolioData(data);
      const res = await fetch('/api/admin/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanData),
      });

      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const result = await res.json();
        if (res.ok) {
          setStatusMessage({ type: 'success', text: result.message || 'Saved to file successfully!' });
        } else {
          setStatusMessage({ type: 'error', text: result.error || 'Failed to save changes' });
        }
      } else {
        const text = await res.text();
        console.error('Non-JSON response:', text);
        setStatusMessage({ type: 'error', text: `Server returned unexpected response (${res.status}).` });
      }
    } catch (err) {
      console.error('Save error:', err);
      const msg = err instanceof Error ? err.message : String(err);
      setStatusMessage({ type: 'error', text: `Network error: ${msg}` });
    } finally {
      setSaving(false);
    }
  };

  const copyGitCommand = () => {
    const cmd = 'git add . && git commit -m "feat(portfolio): update portfolio data" && git push';
    navigator.clipboard.writeText(cmd);
    setCopiedGit(true);
    setTimeout(() => setCopiedGit(false), 3000);
  };

  // --- Project Helpers ---
  const saveProject = (project: IProject, index: number) => {
    if (!data) return;
    if (!project.title.trim()) {
      setStatusMessage({ type: 'error', text: 'Project title cannot be empty!' });
      return;
    }
    const duplicate = data.projects.find(
      (p, i) => i !== index && p.title.trim().toLowerCase() === project.title.trim().toLowerCase()
    );
    if (duplicate) {
      setStatusMessage({
        type: 'error',
        text: `Duplicate project: "${duplicate.title}" already exists in your projects list!`,
      });
      return;
    }

    const updated = [...data.projects];
    if (index >= 0) {
      updated[index] = project;
    } else {
      updated.unshift(project);
    }
    setData({ ...data, projects: updated });
    setEditingProject(null);
    setStatusMessage({ type: 'success', text: `Project "${project.title}" saved successfully!` });
  };

  const deleteProject = (index: number) => {
    if (!data || !confirm('Are you sure you want to delete this project?')) return;
    const updated = data.projects.filter((_, i) => i !== index);
    setData({ ...data, projects: updated });
  };

  // --- Skill Helpers ---
  const saveSkill = (skill: ISkill, index: number) => {
    if (!data) return;
    if (!skill.name.trim()) {
      setStatusMessage({ type: 'error', text: 'Skill name cannot be empty!' });
      return;
    }
    const duplicate = data.skills.find(
      (s, i) => i !== index && s.name.trim().toLowerCase() === skill.name.trim().toLowerCase()
    );
    if (duplicate) {
      setStatusMessage({
        type: 'error',
        text: `Duplicate skill: "${duplicate.name}" already exists in your skills list (Position #${data.skills.indexOf(duplicate) + 1}).`,
      });
      return;
    }

    const updated = [...data.skills];
    if (index >= 0) {
      updated[index] = skill;
    } else {
      updated.push(skill);
    }
    setData({ ...data, skills: updated });
    setEditingSkill(null);
    setStatusMessage({ type: 'success', text: `Skill "${skill.name}" saved successfully!` });
  };

  const deleteSkill = (index: number) => {
    if (!data || !confirm('Are you sure you want to delete this skill?')) return;
    const updated = data.skills.filter((_, i) => i !== index);
    setData({ ...data, skills: updated });
  };

  const moveSkill = (fromIdx: number, toIdx: number) => {
    if (!data || toIdx < 0 || toIdx >= data.skills.length) return;
    const updated = [...data.skills];
    const [moved] = updated.splice(fromIdx, 1);
    updated.splice(toIdx, 0, moved);
    setData({ ...data, skills: updated });
  };

  const sortSkillsByCategory = () => {
    if (!data) return;
    const order: Record<string, number> = { frontend: 1, backend: 2, database: 3, devops: 4, tools: 5, core: 6 };
    const sorted = [...data.skills].sort((a, b) => {
      const orderA = order[a.category] || 99;
      const orderB = order[b.category] || 99;
      if (orderA !== orderB) return orderA - orderB;
      return a.name.localeCompare(b.name);
    });
    setData({ ...data, skills: sorted });
    setStatusMessage({ type: 'success', text: 'Skills grouped by category!' });
  };

  const sortSkillsAZ = () => {
    if (!data) return;
    const sorted = [...data.skills].sort((a, b) => a.name.localeCompare(b.name));
    setData({ ...data, skills: sorted });
    setStatusMessage({ type: 'success', text: 'Skills sorted alphabetically (A-Z)!' });
  };

  // Filtered Devicons for quick picker
  const filteredDevicons = DEVICONS_LIST.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(deviconSearch.toLowerCase()) ||
      item.iconKey.toLowerCase().includes(deviconSearch.toLowerCase());
    const matchesCategory =
      deviconCategoryFilter === 'all' || item.category === deviconCategoryFilter;
    return matchesSearch && matchesCategory;
  });

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
    if (!cert.title.trim()) {
      setStatusMessage({ type: 'error', text: 'Certificate title cannot be empty!' });
      return;
    }
    const duplicate = data.certificates.find(
      (c, i) => i !== index && c.title.trim().toLowerCase() === cert.title.trim().toLowerCase()
    );
    if (duplicate) {
      setStatusMessage({
        type: 'error',
        text: `Duplicate certificate: "${duplicate.title}" already exists in your certificates list!`,
      });
      return;
    }

    const updated = [...data.certificates];
    if (index >= 0) {
      updated[index] = cert;
    } else {
      updated.push(cert);
    }
    setData({ ...data, certificates: updated });
    setEditingCert(null);
    setStatusMessage({ type: 'success', text: `Certificate "${cert.title}" saved successfully!` });
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
                      image: '/assets/img/proj/project_neoshop.webp',
                      link: '',
                      githubLink: '',
                      status: 'completed',
                      technologies: ['React', 'TypeScript'],
                      startDate: new Date().toISOString().split('T')[0],
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
                  <div className="h-36 bg-secondary/30 border-b border-border/40 overflow-hidden flex items-center justify-center relative">
                    <img
                      src={getImageSrc(project.image)}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start gap-2 mb-2">
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Skills Management</h2>
                <p className="text-sm text-muted-foreground">
                  Drag &amp; drop cards or click the arrows to reorder. Changes sync with the homepage marquee ribbon.
                </p>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={sortSkillsByCategory}
                  className="text-xs font-semibold"
                  title="Group Frontend -> Backend -> Database -> DevOps -> Tools"
                >
                  <Layers className="w-3.5 h-3.5 mr-1 text-blue-500" /> Group by Category
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={sortSkillsAZ}
                  className="text-xs font-semibold"
                  title="Sort skills A to Z"
                >
                  <ArrowUpDown className="w-3.5 h-3.5 mr-1 text-green-500" /> Sort A-Z
                </Button>
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.skills.map((skill, idx) => (
                <div
                  key={idx}
                  draggable
                  onDragStart={() => setDraggedSkillIndex(idx)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (draggedSkillIndex !== null && draggedSkillIndex !== idx) {
                      moveSkill(draggedSkillIndex, idx);
                      setDraggedSkillIndex(null);
                    }
                  }}
                  className={`p-3.5 rounded-xl bg-card/60 border border-border/60 flex items-center justify-between gap-3 group hover:border-foreground/50 transition-all ${
                    draggedSkillIndex === idx ? 'opacity-40 scale-95 border-dashed border-foreground' : ''
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* Drag Handle */}
                    <div
                      className="cursor-grab active:cursor-grabbing text-muted-foreground/40 group-hover:text-muted-foreground transition-colors shrink-0"
                      title="Drag to reorder"
                    >
                      <GripVertical size={16} />
                    </div>

                    {/* Sequence index badge */}
                    <span className="text-[10px] font-mono font-bold text-muted-foreground/60 w-4 text-center shrink-0">
                      {idx + 1}
                    </span>

                    {/* Icon Logo */}
                    <div
                      className="w-9 h-9 rounded-xl bg-background/90 border border-border/80 p-1.5 flex items-center justify-center shrink-0 shadow-xs"
                      style={{ borderColor: skill.color ? `${skill.color}50` : undefined }}
                    >
                      <img
                        src={getDeviconSvgUrl(skill.icon || skill.name)}
                        alt={skill.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>

                    {/* Title & Category */}
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-foreground truncate">{skill.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-semibold">{skill.category}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-0.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => moveSkill(idx, idx - 1)}
                      disabled={idx === 0}
                      title="Move Left / Earlier"
                      className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-20 disabled:pointer-events-none transition-colors"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSkill(idx, idx + 1)}
                      disabled={idx === data.skills.length - 1}
                      title="Move Right / Later"
                      className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-20 disabled:pointer-events-none transition-colors"
                    >
                      <ChevronRight size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingSkill({ index: idx, item: { ...skill } })}
                      className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      title="Edit Skill"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteSkill(idx)}
                      className="p-1 rounded text-red-500 hover:text-red-600 hover:bg-red-500/10 transition-colors"
                      title="Delete Skill"
                    >
                      <Trash2 size={13} />
                    </button>
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
                  <p className="text-xs text-muted-foreground">Manage your credentials and upload certificate photos.</p>
                </div>
                <Button
                  size="sm"
                  onClick={() =>
                    setEditingCert({
                      index: -1,
                      item: {
                        title: '',
                        image: '/assets/img/cert/gemini-educator.webp',
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

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {data.certificates.map((cert, idx) => (
                  <Card key={idx} className="border-border/60 bg-card/60 overflow-hidden flex flex-col justify-between group">
                    <div className="h-36 bg-secondary/30 p-2 overflow-hidden flex items-center justify-center">
                      <img
                        src={getImageSrc(cert.image)}
                        alt={cert.title}
                        className="max-h-full max-w-full object-contain rounded transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4 space-y-3">
                      <h4 className="font-bold text-sm line-clamp-1">{cert.title}</h4>
                      <p className="text-[11px] text-muted-foreground font-mono truncate">{typeof cert.image === 'string' ? cert.image : 'Static Asset'}</p>
                      <div className="flex items-center gap-2 pt-2 border-t border-border/40">
                        <Button variant="outline" size="sm" onClick={() => setEditingCert({ index: idx, item: { ...cert } })} className="flex-1">
                          <Edit2 size={13} className="mr-1" /> Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteCert(idx)} className="shrink-0 px-3 flex items-center justify-center">
                          <Trash2 size={13} />
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
              {/* Thumbnail Live Preview */}
              {editingProject.item.image && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground">Thumbnail Preview</label>
                  <div className="h-40 w-full rounded-xl bg-secondary/40 border border-border/60 overflow-hidden flex items-center justify-center">
                    <img
                      src={getImageSrc(editingProject.item.image)}
                      alt="Project Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>
              )}

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
                  <label className="text-xs font-bold">Status</label>
                  <select
                    className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs font-medium"
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
                <div className="space-y-1">
                  <label className="text-xs font-bold">Start Date</label>
                  <Input
                    type="date"
                    value={editingProject.item.startDate || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        item: { ...editingProject.item, startDate: e.target.value },
                      })
                    }
                  />
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

              {/* Image upload & Path */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold">Image (Upload from computer or input path)</label>
                <div className="flex gap-2">
                  <Input
                    value={typeof editingProject.item.image === 'string' ? editingProject.item.image : ''}
                    placeholder="/assets/img/proj/my-project.webp or https://..."
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        item: { ...editingProject.item, image: e.target.value },
                      })
                    }
                    className="flex-1 font-mono text-xs"
                  />
                  <input
                    type="file"
                    ref={projectFileRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleUpload(file, (url) => {
                          setEditingProject({
                            ...editingProject,
                            item: { ...editingProject.item, image: url },
                          });
                        });
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={uploadingImg}
                    onClick={() => projectFileRef.current?.click()}
                    className="shrink-0 font-semibold text-xs"
                  >
                    {uploadingImg ? <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Upload className="w-3.5 h-3.5 mr-1.5" />}
                    Upload Image
                  </Button>
                </div>
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
          <Card className="max-w-xl w-full max-h-[90vh] overflow-y-auto border-border shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <CardTitle>{editingSkill.index >= 0 ? 'Edit Skill' : 'Add New Skill'}</CardTitle>
                <Badge variant="outline" className="text-[10px] uppercase font-bold">
                  Devicon
                </Badge>
              </div>
              <button onClick={() => setEditingSkill(null)} className="text-muted-foreground hover:text-foreground font-bold">
                ✕
              </button>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Active Icon Preview Header */}
              <div className="p-4 rounded-xl bg-secondary/40 border border-border/60 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl bg-background border border-border p-2.5 flex items-center justify-center shrink-0 shadow-sm"
                    style={{ borderColor: editingSkill.item.color ? `${editingSkill.item.color}60` : undefined }}
                  >
                    <img
                      src={getDeviconSvgUrl(editingSkill.item.icon || editingSkill.item.name)}
                      alt={editingSkill.item.name || 'Icon Preview'}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-foreground">{editingSkill.item.name || 'Skill Name Preview'}</h4>
                    <p className="text-xs text-muted-foreground uppercase font-mono">{editingSkill.item.icon || 'icon-key'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-1 rounded-full font-bold uppercase bg-secondary text-foreground border border-border/50">
                    {editingSkill.item.category}
                  </span>
                  <span
                    className="w-4 h-4 rounded-full border border-border shadow-xs"
                    style={{ backgroundColor: editingSkill.item.color || '#61DAFB' }}
                    title={editingSkill.item.color}
                  />
                </div>
              </div>

              {/* Devicon Quick Selector Gallery */}
              <div className="space-y-2.5 p-3 rounded-xl border border-border/60 bg-card/60">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs font-bold flex items-center gap-1.5 text-foreground">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" /> Choose from Devicon Library (1-Click Fill)
                  </label>
                </div>

                {/* Search & Category filter */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search Devicons (e.g. react, docker, java, postgres...)"
                      value={deviconSearch}
                      onChange={(e) => setDeviconSearch(e.target.value)}
                      className="pl-8 h-8 text-xs font-medium"
                    />
                  </div>
                  <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0">
                    {(['all', 'frontend', 'backend', 'database', 'devops', 'tools'] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setDeviconCategoryFilter(cat)}
                        className={`text-[10px] px-2.5 py-1 rounded-md font-bold uppercase whitespace-nowrap transition-colors ${
                          deviconCategoryFilter === cat
                            ? 'bg-foreground text-background shadow-xs'
                            : 'bg-secondary text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Devicons Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-36 overflow-y-auto p-1 border border-border/40 rounded-lg bg-background/50">
                  {filteredDevicons.map((item: IDeviconItem) => (
                    <button
                      key={item.iconKey}
                      type="button"
                      onClick={() => {
                        setEditingSkill({
                          ...editingSkill,
                          item: {
                            ...editingSkill.item,
                            name: item.name,
                            icon: item.iconKey,
                            color: item.brandColor,
                            category: item.category,
                          },
                        });
                      }}
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all text-center group ${
                        editingSkill.item.icon === item.iconKey
                          ? 'border-foreground bg-secondary ring-1 ring-foreground'
                          : 'border-border/40 hover:border-foreground/40 hover:bg-secondary/50'
                      }`}
                      title={`${item.name} (${item.category})`}
                    >
                      <img src={item.svgUrl} alt={item.name} className="w-5 h-5 object-contain group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-semibold text-foreground truncate w-full">{item.name}</span>
                    </button>
                  ))}
                  {filteredDevicons.length === 0 && (
                    <div className="col-span-full py-4 text-center text-xs text-muted-foreground">
                      No tech icons matching &ldquo;{deviconSearch}&rdquo;. You can manually type the name and icon key below.
                    </div>
                  )}
                </div>
              </div>

              {/* Manual Form Inputs */}
              <div className="space-y-4 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold">Skill Name</label>
                    <Input
                      value={editingSkill.item.name}
                      placeholder="e.g. React, PostgreSQL"
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
                      className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs font-medium"
                      value={editingSkill.item.category}
                      onChange={(e) =>
                        setEditingSkill({
                          ...editingSkill,
                          item: { ...editingSkill.item, category: e.target.value as 'frontend' | 'backend' | 'database' | 'devops' | 'tools' | 'core' },
                        })
                      }
                    >
                      <option value="frontend">Frontend</option>
                      <option value="backend">Backend</option>
                      <option value="database">Database</option>
                      <option value="devops">DevOps</option>
                      <option value="tools">Tools</option>
                      <option value="core">Core</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        placeholder="#61DAFB"
                        onChange={(e) =>
                          setEditingSkill({
                            ...editingSkill,
                            item: { ...editingSkill.item, color: e.target.value },
                          })
                        }
                        className="font-mono text-xs"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold">Devicon Icon Key</label>
                    <Input
                      value={editingSkill.item.icon}
                      placeholder="react, typescript, java..."
                      onChange={(e) =>
                        setEditingSkill({
                          ...editingSkill,
                          item: { ...editingSkill.item, icon: e.target.value.toLowerCase().trim() },
                        })
                      }
                      className="font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Live Duplicate Warning Alert */}
              {(() => {
                const duplicateSkill = data.skills.find(
                  (s, i) =>
                    i !== editingSkill.index &&
                    s.name.trim().toLowerCase() === editingSkill.item.name.trim().toLowerCase() &&
                    editingSkill.item.name.trim().length > 0
                );
                if (!duplicateSkill) return null;
                const pos = data.skills.indexOf(duplicateSkill) + 1;
                return (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-medium flex items-center gap-2.5">
                    <AlertCircle size={18} className="shrink-0" />
                    <div>
                      <p className="font-bold">Duplicate Skill Detected!</p>
                      <p>
                        A skill named <strong>&ldquo;{duplicateSkill.name}&rdquo;</strong> already exists at position #{pos} ({duplicateSkill.category.toUpperCase()}). Please change the name or edit the existing one.
                      </p>
                    </div>
                  </div>
                );
              })()}

              <div className="flex justify-end gap-2 pt-4 border-t border-border/40">
                <Button variant="outline" onClick={() => setEditingSkill(null)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => saveSkill(editingSkill.item, editingSkill.index)}
                  disabled={
                    !editingSkill.item.name.trim() ||
                    data.skills.some(
                      (s, i) =>
                        i !== editingSkill.index &&
                        s.name.trim().toLowerCase() === editingSkill.item.name.trim().toLowerCase() &&
                        editingSkill.item.name.trim().length > 0
                    )
                  }
                  className="bg-foreground text-background font-bold disabled:opacity-40"
                >
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
              {/* Thumbnail Live Preview */}
              {editingCert.item.image && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground">Thumbnail Preview</label>
                  <div className="h-36 w-full rounded-xl bg-secondary/40 border border-border/60 overflow-hidden flex items-center justify-center">
                    <img
                      src={getImageSrc(editingCert.item.image)}
                      alt="Certificate Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold">Certificate Title</label>
                <Input
                  value={editingCert.item.title}
                  placeholder="e.g. FPT Talent Assessment"
                  onChange={(e) =>
                    setEditingCert({
                      ...editingCert,
                      item: { ...editingCert.item, title: e.target.value },
                    })
                  }
                />
              </div>

              {/* Upload Image & Path Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold">Certificate Image</label>
                <div className="flex gap-2">
                  <Input
                    value={typeof editingCert.item.image === 'string' ? editingCert.item.image : ''}
                    placeholder="/assets/img/cert/... or /uploads/..."
                    onChange={(e) =>
                      setEditingCert({
                        ...editingCert,
                        item: { ...editingCert.item, image: e.target.value },
                      })
                    }
                    className="flex-1 font-mono text-xs"
                  />
                  <input
                    type="file"
                    ref={certFileRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleUpload(file, (url) => {
                          setEditingCert({
                            ...editingCert,
                            item: { ...editingCert.item, image: url },
                          });
                        });
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={uploadingImg}
                    onClick={() => certFileRef.current?.click()}
                    className="shrink-0 font-semibold text-xs"
                  >
                    {uploadingImg ? <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Upload className="w-3.5 h-3.5 mr-1.5" />}
                    Upload Image
                  </Button>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Click <strong>Upload Image</strong> to pick any picture from your PC, or type a URL.
                </p>
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
