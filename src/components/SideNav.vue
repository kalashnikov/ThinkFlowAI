<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { BackgroundVariant } from '@vue-flow/background'
import { ArrowLeftRight, Map, Palette, Layers, Grid } from 'lucide-vue-next'

const props = defineProps<{
    t: any
    locale: string
    config: any
}>()

const isEdgeTypeMenuOpen = ref(false)
const isBackgroundMenuOpen = ref(false)

const edgeTypeOptions = [
    { value: 'default', labelKey: 'nav.edgeTypes.default' },
    { value: 'straight', labelKey: 'nav.edgeTypes.straight' },
    { value: 'step', labelKey: 'nav.edgeTypes.step' },
    { value: 'smoothstep', labelKey: 'nav.edgeTypes.smoothstep' },
    { value: 'simplebezier', labelKey: 'nav.edgeTypes.simplebezier' }
]

const backgroundOptions = [
    { value: BackgroundVariant.Lines, labelKey: 'nav.lines' },
    { value: BackgroundVariant.Dots, labelKey: 'nav.dots' }
]

const closeMenus = () => {
    isEdgeTypeMenuOpen.value = false
    isBackgroundMenuOpen.value = false
}

const toggleEdgeTypeMenu = () => {
    isEdgeTypeMenuOpen.value = !isEdgeTypeMenuOpen.value
    if (isEdgeTypeMenuOpen.value) isBackgroundMenuOpen.value = false
}

const toggleBackgroundMenu = () => {
    isBackgroundMenuOpen.value = !isBackgroundMenuOpen.value
    if (isBackgroundMenuOpen.value) isEdgeTypeMenuOpen.value = false
}

const setEdgeType = (value: string) => {
    props.config.edgeType = value
    closeMenus()
}

const setBackgroundVariant = (value: any) => {
    props.config.backgroundVariant = value
    closeMenus()
}

const handleDocumentPointerDown = (e: Event) => {
    const target = e.target as HTMLElement | null
    if (!target) return
    if (target.closest('[data-side-menu="true"]')) return
    closeMenus()
}

onMounted(() => {
    document.addEventListener('pointerdown', handleDocumentPointerDown)
})

onUnmounted(() => {
    document.removeEventListener('pointerdown', handleDocumentPointerDown)
})
</script>

<template>
    <div class="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
        <div class="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl p-2 flex flex-col gap-2">
            <!-- 联动拖拽 -->
            <button
                @click="props.config.hierarchicalDragging = !props.config.hierarchicalDragging"
                class="side-btn"
                :class="props.config.hierarchicalDragging ? 'text-orange-500 bg-orange-50 border-orange-100' : 'text-slate-400 hover:text-slate-600'"
                :title="props.t('nav.hierarchicalDragging')"
            >
                <ArrowLeftRight class="w-5 h-5" />
            </button>

            <!-- 小地图 -->
            <button
                @click="props.config.showMiniMap = !props.config.showMiniMap"
                class="side-btn"
                :class="props.config.showMiniMap ? 'text-blue-500 bg-blue-50 border-blue-100' : 'text-slate-400 hover:text-slate-600'"
                :title="props.t('nav.map')"
            >
                <Map class="w-5 h-5" />
            </button>

            <div class="h-px bg-slate-100 mx-2 my-1"></div>

            <!-- 连线颜色 -->
            <div class="relative group p-2 flex flex-col items-center gap-1 bg-slate-50 rounded-xl border border-slate-100">
                <Palette class="w-4 h-4 text-slate-400" />
                <input type="color" v-model="props.config.edgeColor" class="w-5 h-5 rounded-md cursor-pointer bg-transparent border-none" />
                <span class="text-[8px] font-black text-slate-400 uppercase">{{ props.t('nav.edge') }}</span>
            </div>

            <!-- 连线类型 -->
            <div data-side-menu="true" class="relative">
                <button @click="toggleEdgeTypeMenu" class="side-btn" :class="isEdgeTypeMenuOpen ? 'bg-slate-100 text-slate-900' : 'text-slate-400'" :title="props.t('nav.edge')">
                    <Layers class="w-5 h-5" />
                </button>
                <div v-if="isEdgeTypeMenuOpen" class="absolute left-full ml-3 top-0 bg-white border border-slate-200 rounded-xl shadow-2xl p-1.5 min-w-[120px] z-50 transition-all">
                    <button
                        v-for="opt in edgeTypeOptions"
                        :key="opt.value"
                        class="w-full text-left px-3 py-2 rounded-lg text-[10px] font-black tracking-widest uppercase transition-colors"
                        :class="opt.value === props.config.edgeType ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:bg-slate-50'"
                        @click="setEdgeType(opt.value)"
                    >
                        {{ props.t(opt.labelKey) }}
                    </button>
                </div>
            </div>

            <!-- 背景类型 -->
            <div data-side-menu="true" class="relative">
                <button
                    @click="toggleBackgroundMenu"
                    class="side-btn"
                    :class="isBackgroundMenuOpen ? 'bg-slate-100 text-slate-900' : 'text-slate-400'"
                    :title="props.t('nav.lines')"
                >
                    <Grid class="w-5 h-5" />
                </button>
                <div
                    v-if="isBackgroundMenuOpen"
                    class="absolute left-full ml-3 top-0 bg-white border border-slate-200 rounded-xl shadow-2xl p-1.5 min-w-[100px] z-50 transition-all"
                >
                    <button
                        v-for="opt in backgroundOptions"
                        :key="String(opt.value)"
                        class="w-full text-left px-3 py-2 rounded-lg text-[10px] font-black tracking-widest uppercase transition-colors"
                        :class="opt.value === props.config.backgroundVariant ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:bg-slate-50'"
                        @click="setBackgroundVariant(opt.value)"
                    >
                        {{ props.t(opt.labelKey) }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.side-btn {
    @apply w-10 h-10 flex items-center justify-center rounded-xl border border-transparent transition-all active:scale-90 relative;
}
.side-btn:hover {
    @apply border-slate-200 shadow-sm;
}
</style>
