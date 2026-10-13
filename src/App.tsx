import { useState, useCallback, useEffect } from 'react';
import { PALETTES, CATEGORIES } from './data/palettes';
import { Palette, CustomColors, DeviceMode, ColorRole, ToastMessage } from './types/palette';
import { safeHex } from './utils/colorUtils';
import { PaletteSidebar } from './components/Sidebar/PaletteSidebar';
import { PreviewToolbar } from './components/Preview/PreviewToolbar';
import { WebsitePreview } from './components/Preview/WebsitePreview';
import { CustomColorEditor } from './components/Customizer/CustomColorEditor';
import { Toast } from './components/Common/Toast';
import { Menu, Sliders } from 'lucide-react';

export function App() {
  const defaultPalette = PALETTES[0]; // Arctic
  const [selectedPalette, setSelectedPalette] = useState<Palette>(defaultPalette);

  // Active custom colors for the preview
  const [customColors, setCustomColors] = useState<CustomColors>({
    background: defaultPalette.colors.background.hex,
    primary: defaultPalette.colors.primary.hex,
    accent: defaultPalette.colors.accent.hex,
    text: defaultPalette.colors.text.hex,
  });

  const [isCustomized, setIsCustomized] = useState<boolean>(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Preview Mode
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');

  // Modals & Drawers
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Saved / Bookmarked Combinations
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('palette_studio_saved');
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return ['palette-1', 'palette-13']; // default seeds: Arctic & Deep Space
  });

  useEffect(() => {
    try {
      localStorage.setItem('palette_studio_saved', JSON.stringify(savedIds));
    } catch {
      // ignore
    }
  }, [savedIds]);

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback(
    (message: string, type: 'success' | 'info' | 'error' = 'success') => {
      const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 2600);
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // When user selects a preset palette from the sidebar
  const handleSelectPalette = useCallback((palette: Palette) => {
    setSelectedPalette(palette);
    setCustomColors({
      background: safeHex(palette.colors?.background?.hex, '#F8FAFC'),
      primary: safeHex(palette.colors?.primary?.hex, '#3B82F6'),
      accent: safeHex(palette.colors?.accent?.hex, '#14B8A6'),
      text: safeHex(palette.colors?.text?.hex, '#0F172A'),
    });
    setIsCustomized(false);
    setIsMobileSidebarOpen(false);
  }, []);

  // Step through palettes via previous / next
  const handleStepPalette = useCallback(
    (direction: 'prev' | 'next') => {
      const currentIndex = PALETTES.findIndex((p) => p.id === selectedPalette.id);
      let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex < 0) nextIndex = PALETTES.length - 1;
      if (nextIndex >= PALETTES.length) nextIndex = 0;
      handleSelectPalette(PALETTES[nextIndex]);
    },
    [selectedPalette, handleSelectPalette]
  );

  // Bookmark / save palette toggle
  const handleToggleSave = useCallback(
    (paletteId: string) => {
      setSavedIds((prev) => {
        const isAlreadySaved = prev.includes(paletteId);
        const palette = PALETTES.find((p) => p.id === paletteId);
        const name = palette ? palette.name : 'Combination';
        if (isAlreadySaved) {
          showToast(`Removed "${name}" from saved`, 'info');
          return prev.filter((id) => id !== paletteId);
        } else {
          showToast(`Saved "${name}" to collection`, 'success');
          return [...prev, paletteId];
        }
      });
    },
    [showToast]
  );

  // When user modifies a color in the customizer
  const handleColorChange = useCallback((role: ColorRole, newHex: string) => {
    setCustomColors((prev) => ({
      ...prev,
      [role]: newHex,
    }));
    setIsCustomized(true);
  }, []);

  // When user resets custom edits back to current preset
  const handleResetToPreset = useCallback(() => {
    setCustomColors({
      background: safeHex(selectedPalette.colors?.background?.hex, '#F8FAFC'),
      primary: safeHex(selectedPalette.colors?.primary?.hex, '#3B82F6'),
      accent: safeHex(selectedPalette.colors?.accent?.hex, '#14B8A6'),
      text: safeHex(selectedPalette.colors?.text?.hex, '#0F172A'),
    });
    setIsCustomized(false);
    showToast(`Restored "${selectedPalette.name}" preset`, 'info');
  }, [selectedPalette, showToast]);

  // Swatch click copy
  const handleCopySwatch = useCallback(
    (hex: string, label: string, roleName: string) => {
      navigator.clipboard.writeText(hex).then(
        () => showToast(`Copied ${hex} (${roleName}: ${label})`),
        () => showToast('Clipboard access was denied', 'error')
      );
    },
    [showToast]
  );

  const handleResetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('All');
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#F7F4ED] text-[#343630] font-sans">
      {/* Mobile Top Studio Bar (visible on md and smaller) */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#263A35] text-[#F7F4ED] border-b border-[#1E2E2A] shrink-0">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-[7px] border border-[#3A544D] bg-[#1E2E2A] text-xs font-medium text-[#F7F4ED] hover:bg-[#2C443E] transition-colors"
          aria-label="Open Palette Explorer"
        >
          <Menu className="w-4 h-4 text-[#A8BBB4]" />
          <span>Palettes ({PALETTES.length})</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-[6px] bg-[#1A2825] border border-[#3B544E] p-1 grid grid-cols-2 gap-0.5">
            <span className="rounded-[1px] bg-[#F7F4ED]" />
            <span className="rounded-[1px] bg-[#D16C50]" />
            <span className="rounded-[1px] bg-[#DCE5D8]" />
            <span className="rounded-[1px] bg-[#6D877F]" />
          </div>
          <span className="font-semibold text-xs tracking-tight text-[#F7F4ED]">
            Palette Studio
          </span>
        </div>

        <button
          onClick={() => setIsCustomizerOpen(true)}
          className="p-1.5 rounded-[7px] text-[#A8BBB4] hover:text-[#F7F4ED] hover:bg-[#314A43] transition-colors"
          title="Customize Colors"
          aria-label="Customize Colors"
        >
          <Sliders className="w-4 h-4" />
        </button>
      </div>

      {/* Main Studio Two-Column Workspace */}
      <div className="flex flex-1 w-full h-[calc(100vh-53px)] md:h-screen overflow-hidden">
        {/* Desktop / Tablet Left Dark Forest Sidebar */}
        <div className="hidden md:block w-80 lg:w-88 xl:w-96 shrink-0 h-full border-r border-[#1F2F2B]">
          <PaletteSidebar
            palettes={PALETTES}
            categories={CATEGORIES}
            selectedPalette={selectedPalette}
            onSelectPalette={handleSelectPalette}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onResetFilters={handleResetFilters}
            onCopySwatch={handleCopySwatch}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
          />
        </div>

        {/* Mobile Slide-over Drawer */}
        {isMobileSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-[#16221F]/70 backdrop-blur-xs transition-opacity"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            {/* Drawer Content */}
            <div className="relative w-4/5 max-w-sm h-full bg-[#263A35] shadow-elevated z-10 animate-in slide-in-from-left duration-200">
              <PaletteSidebar
                palettes={PALETTES}
                categories={CATEGORIES}
                selectedPalette={selectedPalette}
                onSelectPalette={handleSelectPalette}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                onResetFilters={handleResetFilters}
                onCopySwatch={handleCopySwatch}
                isMobileOpen={isMobileSidebarOpen}
                onCloseMobile={() => setIsMobileSidebarOpen(false)}
                savedIds={savedIds}
                onToggleSave={handleToggleSave}
              />
            </div>
          </div>
        )}

        {/* Right Main Panel: Editorial Preview Workspace */}
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#F7F4ED]">
          {/* Active Palette Specimen Header */}
          <PreviewToolbar
            selectedPalette={selectedPalette}
            customColors={customColors}
            isCustomized={isCustomized}
            deviceMode={deviceMode}
            onDeviceModeChange={setDeviceMode}
            onOpenCustomizer={() => setIsCustomizerOpen(true)}
            onResetCustom={handleResetToPreset}
            onShowToast={showToast}
            isSaved={savedIds.includes(selectedPalette.id)}
            onToggleSave={handleToggleSave}
            onStepPalette={handleStepPalette}
            onColorChange={handleColorChange}
          />

          {/* Website Preview Viewport */}
          <div className="flex-1 overflow-hidden relative">
            <WebsitePreview
              customColors={customColors}
              deviceMode={deviceMode}
            />
          </div>
        </main>
      </div>

      {/* Custom Color Editor Modal */}
      <CustomColorEditor
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        selectedPalette={selectedPalette}
        customColors={customColors}
        isCustomized={isCustomized}
        onColorChange={handleColorChange}
        onResetToPreset={handleResetToPreset}
        onShowToast={showToast}
      />

      {/* Global Studio Toast System */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
