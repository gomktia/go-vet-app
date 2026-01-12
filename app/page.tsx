"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Heart,
  Calendar,
  MessageSquare,
  FileText,
  MapPin,
  Bell,
  Zap,
  Video,
  ShieldCheck,
  TrendingUp,
  Building2,
  Stethoscope,
  Users,
  LineChart,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Activity
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
              <Heart className="w-6 h-6 text-white fill-current" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">VetCare<span className="text-emerald-600">.</span></span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Funcionalidades</a>
            <a href="#solutions" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Soluções</a>
            <a href="#marketplace" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Marketplace</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold text-slate-900 dark:text-white hover:opacity-70 transition-opacity">Entrar</Link>
            <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 rounded-2xl px-6 font-black h-11 shadow-lg shadow-emerald-500/20" asChild>
              <Link href="/register">COMEÇAR AGORA</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] rounded-full"></div>
        </div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 rounded-full animate-in fade-in slide-in-from-bottom duration-700">
              <Zap className="w-4 h-4 text-emerald-600 fill-current" />
              <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 tracking-wider uppercase">Plataforma All-in-One</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter italic uppercase animate-in fade-in slide-in-from-left duration-1000">
              Cuidado <span className="text-emerald-600">Real</span>,<br />Tecnologia <span className="text-slate-400 dark:text-slate-600">Vital.</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed animate-in fade-in slide-in-from-left duration-1000 delay-100">
              A VetCare é o ecossistema definitivo que conecta tutores, veterinários e hospitais através de IA, telemedicina e gestão inteligente de ativos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 rounded-2xl px-10 font-black h-16 shadow-2xl shadow-emerald-500/30 text-lg group active:scale-95 transition-all" asChild>
                <Link href="/register">
                  ADHERIR À REDE <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <div className="flex -space-x-3 items-center">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 overflow-hidden shadow-lg">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="w-full h-full object-cover" />
                  </div>
                ))}
                <span className="pl-6 text-sm font-black text-slate-400 uppercase tracking-widest">+2.5k Usuários</span>
              </div>
            </div>
          </div>

          <div className="relative group animate-in zoom-in duration-1000 delay-300">
            <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full group-hover:bg-emerald-500/30 transition-colors duration-1000"></div>
            <Card className="border-none bg-slate-900 rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] dark:shadow-none ring-1 ring-white/10 relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
              <img
                src="/vetcare-mockup.png"
                alt="VetCare Platform Mockup"
                className="w-full h-auto"
              />
            </Card>

            {/* Floating Metric Card */}
            <div className="absolute -bottom-10 -left-10 bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-2xl z-20 animate-bounce duration-[3000ms]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Health Score Pet</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">94%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-slate-200/50 dark:border-slate-800/50 py-10 bg-slate-50/50 dark:bg-slate-950/50">
        <div className="container mx-auto px-6 flex flex-wrap justify-between items-center gap-8 grayscale opacity-50 dark:invert">
          <Building2 className="w-32 h-12" />
          <TrendingUp className="w-32 h-12" />
          <ShieldCheck className="w-32 h-12" />
          <Stethoscope className="w-32 h-12" />
          <Users className="w-32 h-12" />
        </div>
      </section>

      {/* Core Features - The "What" */}
      <section id="features" className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-xs font-black text-emerald-600 uppercase tracking-[0.3em]">Ecossistema VetCare</h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none italic uppercase">Uma plataforma, <span className="text-slate-400">três visões.</span></h3>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium pb-10">Desenhamos ferramentas específicas para cada elo da cadeia de saúde animal.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Tutors */}
            <Card className="border-none bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 dark:shadow-none hover:translate-y-[-10px] transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                <Heart className="w-24 h-24" />
              </div>
              <div className="w-14 h-14 bg-rose-50 dark:bg-rose-950/30 rounded-2xl flex items-center justify-center mb-10">
                <Heart className="w-8 h-8 text-rose-600 dark:text-rose-400" />
              </div>
              <h4 className="text-2xl font-black mb-4 text-slate-900 dark:text-white uppercase italic tracking-tighter">Para Tutores</h4>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-sm font-bold text-slate-500 dark:text-slate-400">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Prontuário Digital do Pet
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-slate-500 dark:text-slate-400">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Triagem com Inteligência Artificial
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-slate-500 dark:text-slate-400">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Telemedicina 24/7
                </li>
              </ul>
              <Button variant="ghost" className="w-full font-black text-xs uppercase tracking-widest text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30">Saiba mais</Button>
            </Card>

            {/* Veterinarians */}
            <Card className="border-none bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 dark:shadow-none hover:translate-y-[-10px] transition-all group overflow-hidden relative border-t-4 border-emerald-500/20">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                <Stethoscope className="w-24 h-24" />
              </div>
              <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl flex items-center justify-center mb-10">
                <Stethoscope className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h4 className="text-2xl font-black mb-4 text-slate-900 dark:text-white uppercase italic tracking-tighter">Para Veterinários</h4>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-sm font-bold text-slate-500 dark:text-slate-400">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Agenda Mestra de Consultas
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-slate-500 dark:text-slate-400">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Aluguel de Salas Cirúrgicas
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-slate-500 dark:text-slate-400">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Relatórios de Produtividade
                </li>
              </ul>
              <Button variant="ghost" className="w-full font-black text-xs uppercase tracking-widest text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30">Saiba mais</Button>
            </Card>

            {/* Clinics */}
            <Card className="border-none bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 dark:shadow-none hover:translate-y-[-10px] transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                <Building2 className="w-24 h-24" />
              </div>
              <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl flex items-center justify-center mb-10">
                <Building2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h4 className="text-2xl font-black mb-4 text-slate-900 dark:text-white uppercase italic tracking-tighter">Para Clínicas</h4>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-sm font-bold text-slate-500 dark:text-slate-400">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Gestão de Ocupação de Salas
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-slate-500 dark:text-slate-400">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Faturamento e Recebíveis
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-slate-500 dark:text-slate-400">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Smart Split Financeiro
                </li>
              </ul>
              <Button variant="ghost" className="w-full font-black text-xs uppercase tracking-widest text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30">Saiba mais</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Innovation Showcase - The "How" */}
      <section id="solutions" className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-emerald-500 blur-[150px] rounded-full"></div>
        </div>

        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <h3 className="text-5xl md:text-7xl font-black tracking-tight italic uppercase leading-none">A Revolução do <br /><span className="text-emerald-500">Fluxo de Saúde.</span></h3>

              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 uppercase tracking-tighter">Triagem Preditiva com IA</h4>
                    <p className="text-slate-400 font-medium leading-relaxed">Nossa IA analisa sintomas em tempo real, gerando um Pet Health Score e direcionando o tutor para o nível de cuidado correto.</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Video className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 uppercase tracking-tighter">Telemedicina Apple-Style</h4>
                    <p className="text-slate-400 font-medium leading-relaxed">Salas virtuais premium com histórico médico integrado e prescrição digital direta na tela durante a chamada.</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 uppercase tracking-tighter">Liquidamento Smart Split</h4>
                    <p className="text-slate-400 font-medium leading-relaxed">Pagamento integrado que automatiza o repasse entre hospital e veterinário especialista no ato do checkout.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-white/5 rounded-[4rem] border border-white/10 backdrop-blur-3xl p-10 relative group">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/20 blur-3xl animate-pulse"></div>
                <div className="space-y-8 relative z-10">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Dashboard Admin</p>
                      <h5 className="text-2xl font-black italic tracking-tighter uppercase">Sistema Ativo</h5>
                    </div>
                    <Badge className="bg-emerald-500 border-none px-4 py-1.5 font-bold uppercase text-[10px] tracking-widest">99.9% UPTIME</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-white/5 border-white/10 p-4">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Crescimento MRR</p>
                      <p className="text-xl font-black">+240%</p>
                    </Card>
                    <Card className="bg-white/5 border-white/10 p-4">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Vets On-line</p>
                      <p className="text-xl font-black">1.2k</p>
                    </Card>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl overflow-hidden relative group cursor-pointer hover:scale-[1.05] transition-transform">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                      <ShieldCheck className="w-20 h-20" />
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest mb-1">Segurança de Dados</p>
                    <h6 className="text-2xl font-black tracking-tight leading-none italic uppercase">Criptografia Ponta-a-Ponta HIPAA Compliant</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Highlight */}
      <section id="marketplace" className="py-32 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[4rem] p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center gap-16 shadow-2xl shadow-slate-200/50 dark:shadow-none">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-600/5 -skew-x-12 translate-x-20 pointer-events-none"></div>

            <div className="md:w-1/2 space-y-8 relative z-10 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight italic uppercase leading-none underline decoration-emerald-500/30 decoration-8 underline-offset-8">Marketplace <br /><span className="text-slate-400">de Salas.</span></h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">Sua clínica tem salas ociosas? Seu veterinário precisa de um consultório para um procedimento específico? <br /><br />Nossa rede conecta oferta e demanda de infraestrutura veterinária de forma instantânea.</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Button variant="outline" className="rounded-2xl h-14 px-8 font-black dark:border-slate-800 transition-all active:scale-95" asChild>
                  <Link href="/dashboard/marketplace">BUSCAR SALAS</Link>
                </Button>
                <Link href="/dashboard/clinic/settings" className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest hover:translate-x-2 transition-transform">TENHO UMA CLÍNICA <ArrowRight className="w-4 h-4" /></Link>
              </div>
            </div>

            <div className="md:w-1/2 relative">
              <div className="grid grid-cols-2 gap-4 animate-pulse">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-900 via-transparent to-transparent"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 text-center space-y-4">
                  <MapPin className="w-10 h-10 text-emerald-600 mx-auto" />
                  <div>
                    <p className="font-black text-2xl text-slate-900 dark:text-white leading-none">850+</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Clínicas Parceiras</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-slate-50 dark:bg-slate-950/20">
        <div className="container mx-auto px-6 overflow-hidden">
          <div className="flex gap-8 animate-in slide-in-from-right duration-[50000ms] repeat-infinite">
            {[
              { q: "A VetCare mudou minha forma de atender. Não preciso mais de uma clínica física fixa.", n: "Dr. Ricardo, Veterinário Especialista" },
              { q: "Ter o histórico da Luna na mão salvou a vida dela numa emergência fora da cidade.", n: "Aline, Tutora da Luna" },
              { q: "Minha taxa de ocupação de salas cirúrgicas subiu 45% após entrar no marketplace.", n: "Hospital Vet Tubarão" },
              { q: "A IA de triagem é impressionante! Me deu muita segurança antes da consulta.", n: "Carlos, Tutor do Rex" },
            ].map((t, i) => (
              <div key={i} className="min-w-[400px] p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-lg shadow-slate-200/50 dark:shadow-none space-y-6">
                <div className="flex gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map(s => <Heart key={s} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-xl font-bold text-slate-800 dark:text-white italic tracking-tight">"{t.q}"</p>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">/ {t.n}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-emerald-600 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 text-center text-white space-y-10">
          <h3 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">Faça parte do <br />futuro <span className="text-emerald-300">VetCare.</span></h3>
          <p className="text-xl md:text-2xl text-emerald-100 font-medium max-w-2xl mx-auto">Comece gratuitamente agora e descubra como a tecnologia pode elevar o padrão de cuidado do seu pet.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-10">
            <Button size="lg" variant="secondary" className="bg-white text-emerald-600 hover:bg-emerald-50 rounded-[2rem] h-20 px-12 font-black text-xl shadow-2xl active:scale-95 transition-all" asChild>
              <Link href="/register">CADASTRAR GRATUITAMENTE</Link>
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-[2rem] h-20 px-12 font-black text-xl active:scale-95 transition-all bg-transparent" asChild>
              <Link href="/about">FALAR COM ESPECIALISTA</Link>
            </Button>
          </div>
          <p className="text-[10px] font-black text-emerald-300 uppercase tracking-[0.3em] pt-10">Sem cartão de crédito • Cancelamento a qualquer momento</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-16 mb-20">
            <div className="space-y-6 lg:col-span-1">
              <div className="flex items-center gap-2">
                <Heart className="w-8 h-8 text-emerald-500 fill-current" />
                <span className="text-2xl font-black tracking-tighter text-white uppercase italic">VetCare<span className="text-emerald-600">.</span></span>
              </div>
              <p className="text-sm font-medium leading-relaxed">Redefinindo a saúde animal através da tecnologia de ponta e cuidado centrado no pet.</p>
            </div>

            <div className="space-y-6">
              <h5 className="text-white font-black uppercase text-xs tracking-widest leading-none">Produto</h5>
              <ul className="space-y-4 text-sm font-bold">
                <li><Link href="#features" className="hover:text-emerald-500 transition-colors">Funcionalidades</Link></li>
                <li><Link href="#marketplace" className="hover:text-emerald-500 transition-colors">Marketplace</Link></li>
                <li><Link href="/health-tips" className="hover:text-emerald-500 transition-colors">Dicas de Saúde</Link></li>
                <li><Link href="/telemedicine" className="hover:text-emerald-500 transition-colors">Telemedicina</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h5 className="text-white font-black uppercase text-xs tracking-widest leading-none">Legal</h5>
              <ul className="space-y-4 text-sm font-bold">
                <li><Link href="/privacy" className="hover:text-emerald-500 transition-colors">Privacidade</Link></li>
                <li><Link href="/terms" className="hover:text-emerald-500 transition-colors">Termos de Uso</Link></li>
                <li><Link href="/data" className="hover:text-emerald-500 transition-colors">LGPD</Link></li>
              </ul>
            </div>

            <div className="space-y-8">
              <h5 className="text-white font-black uppercase text-xs tracking-widest leading-none">Stay Healthy</h5>
              <div className="relative">
                <Input placeholder="seu@email.com" className="bg-white/5 border-white/10 rounded-2xl h-14 pl-6 pr-16 font-medium focus:ring-emerald-500" />
                <Button className="absolute right-2 top-2 h-10 w-10 bg-emerald-600 rounded-xl px-0">
                  <ArrowRight className="w-5 h-5 text-white" />
                </Button>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer"><Building2 className="w-5 h-5 text-white" /></div>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer"><Heart className="w-5 h-5 text-white" /></div>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-black uppercase tracking-widest">© 2024 VetCare Inc. Todos os direitos reservados.</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-700">Desenvolvido com ♥ por Antigravity AI</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
