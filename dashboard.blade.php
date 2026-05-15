<div class="space-y-8">
    @if($showOnboarding)
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
            <div class="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
                <div class="flex flex-col gap-2">
                    <p class="text-xs font-semibold uppercase tracking-widest text-indigo-500">Bem-vindo</p>
                    <h2 class="text-2xl font-bold text-slate-800">Seu fluxo de estudo em 3 passos</h2>
                    <p class="text-sm text-slate-500">Um guia rapido para comecar com clareza.</p>
                </div>

                <div class="mt-6 grid gap-4 md:grid-cols-3">
                    <div class="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                        <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">1. Organize</p>
                        <p class="mt-2 text-sm font-semibold text-slate-800">Crie cadernos e disciplinas</p>
                        <p class="mt-1 text-xs text-slate-500">Estruture seu concurso e os assuntos principais.</p>
                        <a href="{{ route('cadernos.index') }}" wire:navigate
                            class="mt-3 inline-flex text-xs font-semibold text-indigo-600 hover:text-indigo-500">
                            Ir para cadernos
                        </a>
                    </div>

                    <div class="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                        <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">2. Planeje</p>
                        <p class="mt-2 text-sm font-semibold text-slate-800">Monte seu cronograma</p>
                        <p class="mt-1 text-xs text-slate-500">Distribua estudos para manter consistencia.</p>
                        <a href="{{ route('cronograma.index') }}" wire:navigate
                            class="mt-3 inline-flex text-xs font-semibold text-indigo-600 hover:text-indigo-500">
                            Abrir cronograma
                        </a>
                    </div>

                    <div class="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                        <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">3. Registre</p>
                        <p class="mt-2 text-sm font-semibold text-slate-800">Inicie o timer e revise</p>
                        <p class="mt-1 text-xs text-slate-500">Controle horas e siga revisoes de hoje.</p>
                        <button type="button" x-data x-on:click="$dispatch('open-timer-modal')"
                            class="mt-3 inline-flex text-xs font-semibold text-indigo-600 hover:text-indigo-500">
                            Abrir timer
                        </button>
                    </div>
                </div>

                <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p class="text-xs text-slate-500">Voce pode rever este guia depois pelo menu Ajuda.</p>
                    <div class="flex items-center gap-3">
                        <a href="{{ route('ajuda') }}" wire:navigate
                            class="rounded-xl border border-indigo-200 px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 transition">
                            Abrir ajuda
                        </a>
                        <button type="button" wire:click="completeOnboarding"
                            class="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
                            Pular
                        </button>
                        <button type="button" wire:click="completeOnboarding"
                            class="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700">
                            Comecar agora
                        </button>
                    </div>
                </div>
            </div>
        </div>
    @endif

    <section class="relative overflow-hidden rounded-3xl border border-indigo-200 bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 p-8 text-white shadow-xl">
        <div class="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10"></div>
        <div class="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-black/10"></div>

        <div class="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-100">Painel de Estudos</p>
                <h1 class="mt-3 text-3xl font-bold leading-tight md:text-4xl">
                    Sua semana de estudos em um so lugar
                </h1>
                <p class="mt-3 max-w-2xl text-sm text-indigo-100">
                    Periodo atual: {{ $weekStart->format('d/m/Y') }} ate {{ $weekEnd->format('d/m/Y') }}
                </p>
            </div>

            <div class="rounded-2xl border border-white/20 bg-white/10 px-5 py-4">
                <p class="text-xs uppercase tracking-wide text-indigo-100">Estudos hoje</p>
                <p class="mt-1 text-3xl font-bold">{{ $stats['estudos_hoje'] }}</p>
            </div>
        </div>
    </section>

    <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Tarefas pendentes</p>
            <p class="mt-3 text-2xl font-bold text-amber-600">{{ $stats['tarefas_pendentes'] }}</p>
            <p class="mt-1 text-xs text-slate-500">de {{ $stats['tarefas_total'] }} tarefas totais</p>
        </article>

        <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Cronograma na semana</p>
            <p class="mt-3 text-2xl font-bold text-indigo-600">{{ $stats['cronograma_semana'] }}</p>
            <p class="mt-1 text-xs text-slate-500">itens planejados</p>
        </article>

        <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Disciplinas</p>
            <p class="mt-3 text-2xl font-bold text-emerald-600">{{ $stats['disciplinas'] }}</p>
            <p class="mt-1 text-xs text-slate-500">{{ $stats['assuntos'] }} assuntos cadastrados</p>
        </article>

        <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Cadernos</p>
            <p class="mt-3 text-2xl font-bold text-violet-600">{{ $stats['cadernos'] }}</p>
            <p class="mt-1 text-xs text-slate-500">{{ $stats['tarefas_concluidas'] }} tarefas concluidas</p>
        </article>
    </section>

    <section>
        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div class="flex items-start justify-between gap-4">
                <div>
                    <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Timer de estudo</p>
                    <h2 class="mt-2 text-lg font-bold text-slate-800">Resumo rapido</h2>
                    <p class="mt-1 text-sm text-slate-500">Acompanhe seu total diario e semanal.</p>
                </div>
                @if(auth()->user()->show_timer_widget)
                    <button x-data x-on:click="$dispatch('open-timer-modal')"
                        class="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700">
                        Abrir timer
                    </button>
                @else
                    <a href="{{ route('configuracoes') }}" wire:navigate
                        class="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition">
                        Ativar no menu
                    </a>
                @endif
            </div>

            {{-- Começa aqui a section do card --}}
            <div class="mt-5 grid gap-3 sm:grid-cols-2">
    <div
        class="relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-emerald-100 p-5 shadow-sm hover:shadow-md transition"
        x-data="{ shareOpen: false }"
    >
                    <p class="text-[11px] uppercase tracking-widest text-emerald-700 font-semibold">Total hoje</p>
                    <p class="mt-2 text-2xl font-bold text-emerald-800">
                        {{ round(($studyTotals['day_minutes'] ?? 0) / 60, 2) }}h
                    </p>
                    <p class="text-xs text-emerald-700">{{ $studyTotals['day_minutes'] ?? 0 }} min</p>
                    @if(($studyGoals['daily_goal'] ?? 0) > 0)
                        <p class="mt-2 text-xs text-emerald-700">
                            Hoje: {{ round(($studyTotals['day_minutes'] ?? 0) / 60, 2) }}h / {{ round(($studyGoals['daily_goal'] ?? 0) / 60, 2) }}h
                        </p>
                        <div class="mt-2 h-2 rounded-full bg-emerald-200">
                            <div class="h-2 rounded-full bg-emerald-600" style="width: {{ $studyGoals['daily_progress'] ?? 0 }}%"></div>
                        </div>
                        <p class="mt-1 text-[11px] text-emerald-700">Progresso: {{ $studyGoals['daily_progress'] ?? 0 }}%</p>
                    @endif

                    @php
                        $dayMinutes = (int) ($studyTotals['day_minutes'] ?? 0);
                        $dayHours = intdiv($dayMinutes, 60);
                        $dayRemain = $dayMinutes % 60;
                        $dayLabel = $dayHours > 0 ? ($dayRemain > 0 ? "{$dayHours}h{$dayRemain}m" : "{$dayHours}h") : "{$dayRemain}m";
                        $shareTextDaily = "Hoje (" . now()->format('d/m/Y') . ") estudei {$dayLabel}. #DisciplineFlow";
                        $avatarInitials = collect(preg_split('/\s+/', trim((string) auth()->user()->name)))
                            ->filter()
                            ->map(fn ($part) => mb_strtoupper(mb_substr($part, 0, 1)))
                            ->take(2)
                            ->implode('');
                    @endphp

                    <button
            type="button"
            x-on:click="shareOpen = !shareOpen"
            class="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm hover:bg-emerald-700 hover:scale-[1.02] transition"
        >
            Compartilhar hoje
        </button>
        <div class="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>

                    <div x-show="shareOpen" x-transition class="mt-3 rounded-xl border border-emerald-100 bg-white p-3">

                        <div id="share-card-dashboard" style="margin-top: 12px;">
    <div style="
        position: relative;
        width: 360px;
        height: 640px;
        border-radius: 32px;
        overflow: hidden;
        background: radial-gradient(circle at top, #1e1b4b, #020617);
        font-family: 'Inter', Arial, sans-serif;
        color: #fff;
    ">

        <div style="padding: 24px; display:flex; flex-direction:column; height:100%;">

            <!-- HEADER -->
            <div style="display:flex; align-items:center; gap:10px;">
                <div style="width:36px;height:36px;border-radius:50%;overflow:hidden;border:2px solid rgba(255,255,255,0.4)">
                    <img src="{{ route('avatar.me') }}" style="width:100%;height:100%;object-fit:cover;">
                </div>

                <div>
                    <div style="font-size:11px; letter-spacing:2px; opacity:.7;">STUDY REPORT</div>
                    <div style="font-weight:600; font-size:13px;">
                        {{ auth()->user()->name }}
                    </div>
                </div>
            </div>

            <!-- CARD -->
            <div style="
                margin-top:30px;
                padding:20px;
                border-radius:24px;
                background: linear-gradient(135deg, rgba(99,102,241,0.25), rgba(59,130,246,0.15));
                backdrop-filter: blur(12px);
                border:1px solid rgba(255,255,255,0.1);
            ">

                <!-- TITLE -->
                <div style="font-size:13px; opacity:.8; display:flex; align-items:center; gap:6px;">
                    <!-- chart icon -->
                  <div style="
    width: 20px;
    height: 20px;
    background: #ffffff;
    border-radius: 6px;
    display:flex;
    align-items:center;
    justify-content:center;
">
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8c37e1" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open-icon lucide-book-open"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>
</div>
                    Meu dia de estudos
                </div>

                <!-- DATE -->
                <div style="font-size:11px; opacity:.6; display:flex; align-items:center; gap:6px;margin-left:28px;">
                    {{ \Carbon\Carbon::now()->locale('pt_BR')->translatedFormat('d \d\e F \d\e Y') }}
                </div>

                <div style="margin-top:16px; font-size:22px; font-weight:700;">
                    Foco, disciplina <br>
                    <span style="color:#8b5cf6;">e progresso!🚀</span>
                </div>

                <!-- CÍRCULO -->
                <div style="display:flex; justify-content:center; margin-top:25px;">
                    <div style="
                        width:160px;
                        height:160px;
                        border-radius:50%;
                        background: conic-gradient(#22c55e {{ $studyGoals['daily_progress'] ?? 0 }}%, rgba(255,255,255,0.1) 0%);
                        display:flex;
                        align-items:center;
                        justify-content:center;
                    ">
                        <div style="
                            width:130px;
                            height:130px;
                            border-radius:50%;
                            background:#0f172a;
                            display:flex;
                            flex-direction:column;
                            align-items:center;
                            justify-content:center;
                        ">
                            <div style="font-size:11px; opacity:.6; display:flex; align-items:center; gap:4px;">
                                <!-- clock -->

                                TEMPO TOTAL
                            </div>

                            <div style="font-size:22px; font-weight:800;">
                                {{ $dayLabel }}
                            </div>

                            <div style="font-size:10px; color:#22c55e; display:flex; align-items:center; gap:4px;">
                                <!-- target -->
                               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5ec738" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big-icon lucide-circle-check-big"><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>
                                Meta: {{ round(($studyGoals['daily_goal'] ?? 0)/60,1) }}h
                            </div>
                        </div>
                    </div>
                </div>

                <!-- MÉTRICAS -->
                <div style="
                    margin-top:25px;
                    display:flex;
                    justify-content:center;
                    gap:50px;
                    text-align:center;
                ">

                    <!-- tópicos -->
                    <div>
                        <div style="display:flex; justify-content:center;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5ec738" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open-icon lucide-book-open"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>
                        </div>
                        <div style="font-size:10px; opacity:.6; margin-top:5px;">TÓPICOS</div>
                        <div style="font-weight:700;">3</div>
                    </div>

                    <!-- sequência -->
                    <div>
                        <div style="display:flex; justify-content:center;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#f7692b" stroke="#f7692b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flame-icon lucide-flame"><path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"/></svg>
                        </div>
                        <div style="font-size:10px; opacity:.6; margin-top:4px;">SEQUÊNCIA</div>
                        <div style="font-weight:700;">12</div>
                    </div>
                </div>

                <div style="
                    margin-top:15px;
                    font-size:11px;
                    text-align:center;
                    opacity:.7;
                ">
                    Um passo de cada vez, todos os dias.
                </div>
            </div>

            <!-- FOOTER -->
            <div style="margin-top:auto; display:flex; align-items:center; gap:10px;">
                <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                </div>

                <div>
                    <div style="font-weight:700;">DisciplineFlow</div>
                    <div style="font-size:10px; opacity:.6;">
                        Consistência → aprovação
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

                        <div class="mt-2 flex flex-wrap items-center gap-2">
                            <button type="button"
                                x-on:click="window.generateShareImage('share-card-dashboard', 'story-estudos.png')"
                                class="rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-100 transition">
                                Baixar story
                            </button>
                        </div>
                    </div>
                </div>
                <div class="rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
                    <p class="text-[11px] uppercase tracking-widest text-indigo-700 font-semibold">Total semana</p>
                    <p class="mt-2 text-2xl font-bold text-indigo-800">
                        {{ round(($studyTotals['week_minutes'] ?? 0) / 60, 2) }}h
                    </p>
                    <p class="text-xs text-indigo-700">{{ $studyTotals['week_minutes'] ?? 0 }} min</p>
                    @if(($studyGoals['weekly_goal'] ?? 0) > 0)
                        <p class="mt-2 text-xs text-indigo-700">
                            Semana: {{ round(($studyTotals['week_minutes'] ?? 0) / 60, 2) }}h / {{ round(($studyGoals['weekly_goal'] ?? 0) / 60, 2) }}h
                        </p>
                        <div class="mt-2 h-2 rounded-full bg-indigo-200">
                            <div class="h-2 rounded-full bg-indigo-600" style="width: {{ $studyGoals['weekly_progress'] ?? 0 }}%"></div>
                        </div>
                        <p class="mt-1 text-[11px] text-indigo-700">Progresso: {{ $studyGoals['weekly_progress'] ?? 0 }}%</p>
                    @endif
                </div>
            </div>

            <div class="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p class="text-xs text-slate-500">Status do timer</p>
                @php
                    $timerRunning = !empty($timerState['running']);
                    $timerSessionId = !empty($timerState['session_id']) ? (int) $timerState['session_id'] : null;
                    $timerStatus = $timerRunning ? 'Em andamento' : ($timerSessionId ? 'Pausado' : 'Desligado');
                    $timerStatusClass = $timerRunning ? 'text-emerald-600' : ($timerSessionId ? 'text-amber-600' : 'text-slate-500');
                    $timerWidgetEnabled = (bool) auth()->user()->show_timer_widget;
                @endphp
                <p class="mt-1 text-sm text-slate-800">
                    <span class="font-semibold {{ $timerStatusClass }}">{{ $timerStatus }}</span>
                    @if(!$timerWidgetEnabled)
                        <span class="text-xs text-slate-500">(widget desativado)</span>
                    @endif
                </p>
                <p class="text-xs text-slate-500 mt-1">
                    Tempo atual: {{ gmdate('H:i:s', (int) ($timerState['elapsed_seconds'] ?? 0)) }}
                </p>
                @if(!auth()->user()->show_timer_widget)
                    <p class="mt-2 text-xs text-amber-700">
                        Lembrete: sem o timer flutuante, voce pode esquecer de registrar suas horas.
                        Reative nas configuracoes quando quiser.
                    </p>
                @endif
            </div>
        </div>
    </section>

    <!-- Card Resumo Semanal -->
    <section class="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">

    <!-- efeito decorativo -->
    <div class="absolute -top-16 -right-16 w-40 h-40 bg-indigo-200/30 rounded-full blur-3xl"></div>

    <div class="relative flex items-start justify-between gap-4">
        <div>

            <div class="flex items-center gap-2">

    <div class="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-100">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" class="w-4 h-4 text-indigo-600">

            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 17l6-6 4 4 7-7" />
        </svg>
    </div>

    <span class="text-xs font-semibold uppercase tracking-wider text-indigo-600">
        Esta semana
    </span>

</div>

            <h2 class="mt-2 text-xl font-bold text-slate-900">
                Resumo semanal de disciplinas
            </h2>

            <p class="mt-1 text-sm text-slate-500">
                Acompanhe seu desempenho por disciplina.
            </p>
        </div>

        <a href="{{ route('relatorios.semanal') }}" wire:navigate
            class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 hover:scale-[1.03] transition">
            Ver análise completa →
        </a>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-2">

        <!-- Total de tempo -->
        <div class="rounded-2xl border border-indigo-100 bg-white/70 backdrop-blur p-5 shadow-sm hover:shadow-md transition">
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Total estudado
            </p>

            @php
                $weekMinutes = (int) ($weeklyResume['total_minutes'] ?? 0);
                $weekHours = intdiv($weekMinutes, 60);
                $weekRemain = $weekMinutes % 60;
            @endphp

            <p class="mt-3 text-4xl font-bold text-indigo-700">
                {{ $weekHours }}h
                <span class="text-xl text-indigo-400 font-semibold">
                    {{ str_pad($weekRemain, 2, '0', STR_PAD_LEFT) }}m
                </span>
            </p>

            <p class="mt-1 text-xs text-slate-500">
                {{ $weekMinutes }} minutos no total
            </p>

            <!-- barra visual -->
            <div class="mt-3 h-2 rounded-full bg-indigo-100 overflow-hidden">
                <div class="h-2 bg-indigo-500 rounded-full w-[65%] shadow-[0_0_8px_rgba(79,70,229,0.4)]"></div>
            </div>
        </div>

        <!-- Top disciplina -->
        <div class="rounded-2xl border border-indigo-100 bg-white/70 backdrop-blur p-5 shadow-sm hover:shadow-md transition">
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Foco principal
            </p>

            @if($weeklyResume['top_discipline'])
                <p class="mt-3 text-2xl font-bold text-indigo-800">
                    {{ $weeklyResume['top_discipline']['disciplina'] }}
                </p>

                @php
                    $topMinutos = (int) $weeklyResume['top_discipline']['minutos'];
                    $topHoras = intdiv($topMinutos, 60);
                    $topRemain = $topMinutos % 60;
                @endphp

                <p class="mt-1 text-sm text-slate-500">
                    {{ $topHoras }}h {{ str_pad($topRemain, 2, '0', STR_PAD_LEFT) }}m estudados
                </p>

                <!-- badge -->
                <span class="mt-3 inline-block rounded-lg bg-indigo-100 px-2 py-1 text-[11px] font-semibold text-indigo-600">
                    Disciplina destaque
                </span>
            @else
                <p class="mt-3 text-lg font-semibold text-slate-400">
                    Nenhuma disciplina
                </p>
                <p class="mt-1 text-xs text-slate-500">
                    Comece a estudar para ver dados
                </p>
            @endif
        </div>

    </div>
</section>

    <section class="grid gap-6 lg:grid-cols-3">
        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2"
            x-data="{
                async init() {
                    await window.ensureChartJs();
                    new Chart($refs.weekCanvas, {
                        type: 'bar',
                        data: {
                            labels: @js($chartWeekLabels),
                            datasets: [{
                                label: 'Estudos planejados',
                                data: @js($chartWeekValues),
                                backgroundColor: '#4f46e5',
                                borderRadius: 8,
                            }]
                        },
                        options: {
                            plugins: {
                                legend: { display: false }
                            },
                            scales: {
                                y: { beginAtZero: true, ticks: { precision: 0 } }
                            }
                        }
                    });
                }
            }">
            <h2 class="text-lg font-bold text-slate-800">Estudos por dia na semana</h2>
            <p class="mt-1 text-sm text-slate-500">Visualize a carga de estudo ao longo da semana.</p>
            <div class="mt-5 h-72">
                <canvas x-ref="weekCanvas"></canvas>
            </div>
        </div>

        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            x-data="{
                async init() {
                    await window.ensureChartJs();
                    new Chart($refs.taskCanvas, {
                        type: 'doughnut',
                        data: {
                            labels: ['Concluidas', 'Pendentes'],
                            datasets: [{
                                data: @js($chartTaskValues),
                                backgroundColor: ['#10b981', '#f59e0b']
                            }]
                        },
                        options: {
                            plugins: {
                                legend: { position: 'bottom' }
                            }
                        }
                    });
                }
            }">
            <h2 class="text-lg font-bold text-slate-800">Status das tarefas</h2>
            <p class="mt-1 text-sm text-slate-500">Acompanhe o andamento geral das suas tarefas.</p>
            <div class="mx-auto mt-6 max-w-[260px]">
                <canvas x-ref="taskCanvas"></canvas>
            </div>
        </div>
    </section>

    <section class="grid gap-6 lg:grid-cols-3">
        @if(auth()->user()->canAccessAdvancedStats())
            <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                <div class="flex items-start justify-between gap-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Heatmap de estudo</p>
                        <h2 class="mt-2 text-lg font-bold text-slate-800">Consistencia diaria</h2>
                        <p class="mt-1 text-sm text-slate-500">Ultimos 90 dias de estudo.</p>
                    </div>
                    <div class="text-right">
                        <p class="text-xs text-slate-500">Streak atual</p>
                        <p class="text-2xl font-bold text-rose-600">{{ $streaks['current'] }} dias</p>
                        <p class="text-xs text-slate-500">Melhor streak: {{ $streaks['longest'] }} dias</p>
                    </div>
                </div>

                @php
                    $heatmapValues = array_values($heatmap ?? []);
                    $maxHeat = !empty($heatmapValues) ? max($heatmapValues) : 0;
                @endphp

                <div class="mt-5 grid grid-cols-14 gap-1">
                    @foreach($heatmap as $day => $minutes)
                        @php
                            $ratio = $maxHeat > 0 ? $minutes / $maxHeat : 0;
                            $level = $ratio >= 0.75 ? 'bg-emerald-600' : ($ratio >= 0.5 ? 'bg-emerald-500' : ($ratio >= 0.25 ? 'bg-emerald-300' : ($minutes > 0 ? 'bg-emerald-200' : 'bg-slate-100')));
                        @endphp
                        <div class="h-4 w-4 rounded-[4px] {{ $level }}"
                            title="{{ $day }} - {{ $minutes }} min">
                        </div>
                    @endforeach
                </div>

                <div class="mt-4 flex items-center gap-2 text-xs text-slate-500">
                    <span>Menos</span>
                    <span class="h-3 w-3 rounded-[3px] bg-slate-100"></span>
                    <span class="h-3 w-3 rounded-[3px] bg-emerald-200"></span>
                    <span class="h-3 w-3 rounded-[3px] bg-emerald-300"></span>
                    <span class="h-3 w-3 rounded-[3px] bg-emerald-500"></span>
                    <span class="h-3 w-3 rounded-[3px] bg-emerald-600"></span>
                    <span>Mais</span>
                </div>
            </div>

            <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Gamificacao</p>
                <h2 class="mt-2 text-lg font-bold text-slate-800">Badges conquistados</h2>
                <p class="mt-1 text-sm text-slate-500">Progresso por metas e consistencia.</p>

                <div class="mt-5 space-y-3">
                    @foreach($badges as $badge)
                        @php
                            $earned = $badge->users->isNotEmpty();
                            $earnedAt = $earned ? $badge->users->first()->pivot->earned_at : null;
                        @endphp
                        <div class="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2">
                            <div class="h-10 w-10 rounded-xl {{ $earned ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-400' }} flex items-center justify-center">
                                <i class="fa-solid {{ $badge->icon ?? 'fa-award' }}"></i>
                            </div>
                            <div class="flex-1">
                                <p class="text-sm font-semibold text-slate-800">{{ $badge->name }}</p>
                                <p class="text-xs text-slate-500">{{ $badge->description }}</p>
                            </div>
                            <div class="text-right">
                                <p class="text-[11px] {{ $earned ? 'text-emerald-600' : 'text-slate-400' }}">
                                    {{ $earned ? 'Conquistado' : 'Bloqueado' }}
                                </p>
                                @if($earnedAt)
                                    <p class="text-[10px] text-slate-400">{{ \Carbon\Carbon::parse($earnedAt)->format('d/m/Y') }}</p>
                                @endif
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        @else
            <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3">
                <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Recursos Premium</p>
                <h2 class="mt-2 text-lg font-bold text-slate-800">Heatmap e Gamificacao</h2>
                <p class="mt-1 text-sm text-slate-500">
                    Esses insights avancados estao disponiveis no plano premium.
                </p>
            </div>
        @endif
    </section>

    <section>
        <livewire:estudo.revisoes-hoje />
    </section>

    <section class="grid gap-6 lg:grid-cols-3">
        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div class="mb-5 flex items-center justify-between">
                <h2 class="text-lg font-bold text-slate-800">Proximos estudos</h2>
                <a href="{{ route('cronograma.index') }}" wire:navigate
                    class="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500">
                    Abrir cronograma
                </a>
            </div>

            <div class="space-y-3">
                @forelse($proximosEstudos as $item)
                    <div class="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                        <div class="flex flex-wrap items-center justify-between gap-2">
                            <p class="text-sm font-semibold text-slate-800">
                                {{ $item->disciplina->nome ?? $item->disciplina->name }}
                            </p>
                            <span class="rounded-lg bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-700">
                                {{ $item->data_estudo?->format('d/m/Y') }}
                            </span>
                        </div>

                        @if($item->assunto)
                            <p class="mt-1 text-xs text-indigo-600">Assunto: {{ $item->assunto->titulo }}</p>
                        @endif

                        <p class="mt-2 text-sm text-slate-600">{{ $item->conteudo_planejado }}</p>
                    </div>
                @empty
                    <div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
                        <p class="text-sm font-medium text-slate-600">Nenhum estudo planejado.</p>
                          @if(auth()->user()->hasPermission('cronograma_create'))
                              <a href="{{ route('cronograma.index') }}" wire:navigate
                                  class="mt-3 inline-flex rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
                                  Criar cronograma
                              </a>
                          @endif
                    </div>
                @endforelse
            </div>
        </div>

        <div class="space-y-6">
            <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 class="text-lg font-bold text-slate-800">Proxima prova</h2>
                @if($proximaProva)
                    <p class="mt-3 text-sm text-slate-500">{{ $proximaProva->nome }}</p>
                    <p class="mt-1 text-2xl font-bold text-rose-600">{{ $proximaProva->data_prova?->format('d/m/Y') }}</p>
                    <p class="mt-2 text-xs text-slate-500">
                        {{ (int) now()->startOfDay()->diffInDays($proximaProva->data_prova->startOfDay(), false) }} dias restantes
                    </p>
                @else
                    <p class="mt-3 text-sm text-slate-500">Nenhuma data de prova definida.</p>
                @endif
            </div>

            <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 class="text-lg font-bold text-slate-800">Disciplinas em foco</h2>
                <div class="mt-4 space-y-3">
                    @forelse($disciplinasEmFoco as $disciplina)
                        <div class="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
                            <p class="text-sm font-semibold text-slate-800">{{ $disciplina->nome ?? $disciplina->name }}</p>
                            <p class="text-xs text-slate-500">{{ $disciplina->estudos_planejados_count }} estudos nesta semana</p>
                        </div>
                    @empty
                        <p class="text-sm text-slate-500">Sem dados de planejamento semanal ainda.</p>
                    @endforelse
                </div>
            </div>
        </div>
    </section>
</div>

@push('scripts')
<script>
    window.ensureScript = window.ensureScript || function (url, globalName) {
        window.__scriptPromises = window.__scriptPromises || {};
        if (window.__scriptPromises[url]) return window.__scriptPromises[url];

        window.__scriptPromises[url] = new Promise((resolve, reject) => {
            if (globalName && window[globalName]) {
                resolve(window[globalName]);
                return;
            }

            const el = document.createElement('script');
            el.src = url;
            el.async = true;
            el.onload = () => resolve(globalName ? window[globalName] : true);
            el.onerror = reject;
            document.head.appendChild(el);
        });

        return window.__scriptPromises[url];
    };

    window.ensureChartJs = function () {
        return window.ensureScript('https://cdn.jsdelivr.net/npm/chart.js', 'Chart');
    };

    window.ensureHtml2Canvas = function () {
        return window.ensureScript('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js', 'html2canvas');
    };

    window.ensureHtmlToImage = function () {
        if (window.htmlToImage) return Promise.resolve(window.htmlToImage);
        return window.ensureScript('https://cdn.jsdelivr.net/npm/html-to-image@1.11.11/dist/html-to-image.min.js', 'htmlToImage');
    };

    window.buildShareRenderOptions = function () {
        return {
            backgroundColor: null,
            scale: 3,
            useCORS: true,
            foreignObjectRendering: true,
            ignoreElements: (element) => element?.hasAttribute?.('data-html2canvas-ignore'),
            onclone: (clonedDocument) => {
                try {
                    clonedDocument.querySelectorAll('[data-html2canvas-ignore]').forEach((node) => node.remove());
                    clonedDocument.querySelectorAll('style, link[rel=\"stylesheet\"]').forEach((node) => node.remove());
                } catch (e) {}
            },
        };
    };

    window.downloadDataUrl = function (dataUrl, filename) {
        const link = document.createElement('a');
        link.download = filename || 'share.png';
        link.href = dataUrl;
        link.click();
    };

   window.generateShareImage = function (elementId, filename) {
    const el = document.getElementById(elementId);
    if (!el) return;

    htmlToImage.toPng(el, {
        cacheBust: true,
        pixelRatio: 2,
        skipFonts: true, // 🔥 evita erro de fonte externa

        filter: (node) => {
            // ignora ícones (FontAwesome)
            if (node.tagName === 'I') return false;

            return true; // inclui todos os outros elementos
        }
    })
    .then((dataUrl) => {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = filename || 'imagem.png';
        a.click();
    })
    .catch((err) => {
        console.error('Erro real:', err);
    });
};

    window.shareImage = function (elementId, filename) {
        const el = document.getElementById(elementId);
        if (!el) return;

        window.ensureHtmlToImage()
            .then(() => (window.htmlToImage || htmlToImage).toBlob(el, {
                cacheBust: true,
                pixelRatio: 3,
                filter: (node) => !node?.hasAttribute?.('data-html2canvas-ignore'),
            }))
            .then(async (blob) => {
                if (!blob) return;
                const file = new File([blob], filename || 'story-estudos.png', { type: 'image/png' });
                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    try {
                        await navigator.share({ files: [file], title: 'Meu estudo de hoje' });
                        return;
                    } catch (e) {}
                }
                window.downloadDataUrl(URL.createObjectURL(blob), filename || 'story-estudos.png');
                window.dispatchEvent(new CustomEvent('notify', {
                    detail: { message: 'Baixamos a imagem para voce compartilhar.', type: 'info' }
                }));
            })
            .catch((err) => {
                console.error('Erro ao compartilhar imagem:', err);
                window.dispatchEvent(new CustomEvent('notify', {
                    detail: { message: 'Nao foi possivel gerar a imagem.', type: 'error' }
                }));
            });
    };
</script>
@endpush
