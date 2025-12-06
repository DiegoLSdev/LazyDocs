const BrowserMockup = () => {
  return (
    <div className="relative w-full max-w-2xl animate-float">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-3xl" />
      
      {/* Browser window */}
      <div className="relative bg-card rounded-xl border border-border overflow-hidden shadow-glow animate-glow">
        {/* Browser header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <div className="w-3 h-3 rounded-full bg-primary" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-muted rounded-md px-3 py-1.5 text-xs text-muted-foreground font-mono">
              http://lazydocs/docs/customization/sidebar
            </div>
          </div>
        </div>
        
        {/* Browser content */}
        <div className="flex">
          {/* Sidebar */}
          <div className="w-48 bg-secondary/30 p-4 border-r border-border hidden md:block">
            <div className="space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Getting Started</p>
              {['Introduction', 'Installation', 'Quick Start'].map((item, i) => (
                <p key={i} className="text-sm text-secondary-foreground/70 hover:text-foreground cursor-pointer transition-colors">{item}</p>
              ))}
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-4">Customization</p>
              {['Custom Logo', 'Colors & Themes', 'Dark Mode'].map((item, i) => (
                <p key={i} className="text-sm text-secondary-foreground/70 hover:text-foreground cursor-pointer transition-colors">{item}</p>
              ))}
              <p className="text-sm text-primary font-medium">Organize Sidebar</p>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1 p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Adding a Simple Page</h3>
            
            <p className="text-sm font-semibold text-foreground mb-2">Step 1: Create the Markdown File</p>
            <p className="text-xs text-muted-foreground mb-3">Create a .md file in the docs/ folder:</p>
            
            <div className="bg-muted rounded-lg p-3 mb-4 font-mono text-xs">
              <span className="text-primary">Example:</span>
              <span className="text-muted-foreground"> docs/my-new-page.md</span>
            </div>
            
            <div className="bg-muted rounded-lg p-3 font-mono text-xs space-y-1">
              <p><span className="text-muted-foreground">---</span></p>
              <p><span className="text-primary">title:</span> <span className="text-foreground">My New Page</span></p>
              <p><span className="text-primary">description:</span> <span className="text-foreground">Description of page</span></p>
              <p><span className="text-muted-foreground">---</span></p>
              <p className="mt-2"><span className="text-primary"># My New Page</span></p>
              <p><span className="text-muted-foreground">Content here...</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowserMockup;
