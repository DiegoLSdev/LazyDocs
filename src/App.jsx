import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/Navbar";
import AppSidebar from "./components/AppSidebar";
import DocContent from "./components/DocContent";
import Footer from "./components/Footer";
import ReadingProgress from "./components/ReadingProgress";
import { loadConfig } from "./utils/config";
import { useDarkMode } from "./hooks/useDarkMode";
import { LocaleProvider } from "./contexts/LocaleContext";
import { SidebarProvider, SidebarInset } from "./components/ui/sidebar";
import { generateSidebarStructure } from "./utils/sidebar";
import TableOfContents from "@/components/TableOfContents.jsx";
import Hero from "./components/Hero";

function App() {
  const [content, setContent] = useState("");
  const [config, setConfig] = useState(null);
  const [sidebarStructure, setSidebarStructure] = useState([]);
  const { isDark, toggle: toggleDarkMode } = useDarkMode();
  const location = useLocation();

  // Detectar si estamos en la página principal
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    loadConfig().then(setConfig);
  }, []);


  useEffect(() => {
    if (config?.siteName) {
      document.title = config.siteName || "LazyDocs";
    }
  }, [config]);

  if (!config) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // Layout para la página principal (sin sidebar)
  if (isHomePage) {
    return (
      <HelmetProvider>
        <LocaleProvider>
          <div className="relative flex min-h-screen w-full flex-col">
            <Routes>
              <Route 
                path="/" 
                element={
                  <Hero 
                    config={config} 
                    isDark={isDark} 
                    onToggleDarkMode={toggleDarkMode} 
                  />
                } 
              />
            </Routes>
          </div>
        </LocaleProvider>
      </HelmetProvider>
    );
  }

  // Layout para páginas de documentación (con sidebar)
  return (
    <HelmetProvider>
      <LocaleProvider>
        <SidebarProvider defaultOpen={true}>
          <div className="relative flex min-h-full w-full flex-col items-center justify-center">
            {/* Header */}
            <Header
              config={config}
              isDark={isDark}
              onToggleDarkMode={toggleDarkMode}
            />
            <ReadingProgress />

            {/* Sidebar + Content */}
            <div className="flex flex-1 gap-0">
              {/* SIDEBAR - Sticky */}
              <AppSidebar docsPath={config.docsPath} config={config} />

              {/* CONTENT */}
              <SidebarInset className="flex min-h-0 flex-col pl-6 min-w-[900px] max-w-[900px]">
                <div className="flex flex-1 flex-col">
                  <Routes>
                    <Route
                      path="/docs/*"
                      element={
                        <DocContent
                          docsPath={config.docsPath}
                          siteName={config.siteName}
                          structure={sidebarStructure}
                          onContentChange={setContent}
                        />
                      }
                    />
                  </Routes>
                  <Footer config={config} />
                </div>
              </SidebarInset>

              {/* TableOfContents ahora recibe el contenido desde App */}
              <TableOfContents content={content} />
            </div>
          </div>
        </SidebarProvider>
      </LocaleProvider>
    </HelmetProvider>
  );
}

export default App;