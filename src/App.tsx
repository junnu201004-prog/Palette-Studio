import { useState, useCallback } from 'react';
import { PALETTES, CATEGORIES } from './data/palettes';
import { Palette, CustomColors, DeviceMode, ColorRole, ToastMessage } from './types/palette';
import { PaletteSidebar } from './components/Sidebar/PaletteSidebar';
import { PreviewToolbar } from './components/Preview/PreviewToolbar';
import { WebsitePreview } from './components/Preview/WebsitePreview';
import { CustomColorEditor } from './components/Customizer/CustomColorEditor';
import { Toast } from './components/Common/Toast';
import { Menu, Sliders, Palette as PaletteIcon } from 'lucide-react';

export function App() {
  // Palettes data
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

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback(
    (message: string, type: 'success' | 'info' | 'error' = 'success') => {
      const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
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
      background: palette.colors.background.hex,
      primary: palette.colors.primary.hex,
      accent: palette.colors.accent.hex,
      text: palette.colors.text.hex,
    });
    setIsCustomized(false);
    setIsMobileSidebarOpen(false);
  }, []);

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
      background: selectedPalette.colors.background.hex,
      primary: selectedPalette.colors.primary.hex,
      accent: selectedPalette.colors.accent.hex,
      text: selectedPalette.colors.text.hex,
    });
    setIsCustomized(false);
    showToast(`Reset colors to ${selectedPalette.name} preset`, 'info');
  }, [selectedPalette, showToast]);

  // Swatch click copy
  const handleCopySwatch = useCallback(
    (hex: string, label: string, roleName: string) => {
      navigator.clipboard.writeText(hex).then(
        () => showToast(`Copied ${hex} (${roleName}: ${label}) to clipboard!`),
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
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100 text-slate-900 font-sans">
      {/* Mobile Top App Bar (visible on md and smaller) */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 shrink-0">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          aria-label="Open Palette Explorer"
        >
          <Menu className="w-4 h-4 text-slate-600" />
          <span>Palettes ({PALETTES.length})</span>
        </button>

        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <PaletteIcon className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-xs tracking-tight">Palette Studio</span>
        </div>

        <button
          onClick={() => setIsCustomizerOpen(true)}
          className="p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors"
          title="Customize Colors"
          aria-label="Customize Colors"
        >
          <Sliders className="w-4 h-4" />
        </button>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex flex-1 w-full h-[calc(100vh-53px)] md:h-screen overflow-hidden">
        {/* Desktop / Tablet Left Sidebar (w-80 or w-96) */}
        <div className="hidden md:block w-80 lg:w-88 xl:w-96 shrink-0 h-full border-r border-slate-200">
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
          />
        </div>

        {/* Mobile Slide-over Drawer */}
        {isMobileSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            {/* Drawer Content */}
            <div className="relative w-4/5 max-w-sm h-full bg-white shadow-2xl z-10 animate-in slide-in-from-left duration-200">
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
              />
            </div>
          </div>
        )}

        {/* Right Main Panel: Preview Toolbar & Realistic Website Preview */}
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-slate-100">
          {/* Preview Toolbar */}
          <PreviewToolbar
            selectedPalette={selectedPalette}
            customColors={customColors}
            isCustomized={isCustomized}
            deviceMode={deviceMode}
            onDeviceModeChange={setDeviceMode}
            onOpenCustomizer={() => setIsCustomizerOpen(true)}
            onResetCustom={handleResetToPreset}
            onShowToast={showToast}
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

      {/* Global Toast System */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;

