import os
import re

def process_file(filepath):
    print(f"Processing {filepath}...")
    with open(filepath, 'r') as f:
        content = f.read()

    # Text Colors
    content = content.replace('text-slate-900', 'text-white')
    content = content.replace('text-slate-800', 'text-slate-200')
    content = content.replace('text-slate-700', 'text-slate-300')
    content = content.replace('text-slate-600', 'text-slate-400')
    content = content.replace('text-slate-500', 'text-slate-400')
    
    # Backgrounds
    content = content.replace('bg-slate-50', 'bg-[#0B1120]')
    content = content.replace('bg-white', 'bg-[#050A15]')
    content = content.replace('bg-[#050A15]/40', 'bg-white/5')
    content = content.replace('bg-[#050A15]/50', 'bg-white/5')
    content = content.replace('bg-[#050A15]/60', 'bg-white/5')
    content = content.replace('bg-[#050A15]/70', 'bg-white/10')
    content = content.replace('bg-[#050A15]/80', 'bg-[#0B1120]/80')
    
    # Borders
    content = content.replace('border-slate-200', 'border-white/10')
    content = content.replace('border-slate-300', 'border-white/10')
    content = content.replace('border-slate-100', 'border-white/5')
    
    # Gradients
    content = content.replace('bg-[radial-gradient(ellipse_at_top,#f8fafc_0%,#e0f2fe_100%)]', 'bg-[#050A15]')
    content = content.replace('bg-[radial-gradient(ellipse_at_center,#f0f9ff_0%,#e2e8f0_100%)]', 'bg-[#050A15]')
    content = content.replace('bg-[radial-gradient(ellipse_at_bottom_right,#e0f2fe_0%,#ffffff_100%)]', 'bg-[#0B1120]')
    content = content.replace('bg-[radial-gradient(ellipse_at_top_left,#f8fafc_0%,#e0f2fe_100%)]', 'bg-[#050A15]')
    content = content.replace('from-[#f0f9ff] via-[#ffffff] to-[#ecfeff]', 'from-[#050A15] via-[#0B1120] to-[#0A1929]')
    
    # Shadows (make them glow cyan instead of drop shadows)
    content = re.sub(r'shadow-\[0_\d+px_\d+px_[^\]]+\]', 'shadow-[0_0_40px_rgba(6,182,212,0.15)]', content)
    
    # Orbs
    content = content.replace('bg-blue-300/20', 'bg-blue-600/10')
    content = content.replace('bg-blue-300/15', 'bg-blue-600/10')
    content = content.replace('bg-cyan-300/10', 'bg-cyan-500/10')
    content = content.replace('bg-cyan-300/15', 'bg-cyan-500/10')
    content = content.replace('bg-cyan-400/20', 'bg-cyan-500/10')
    
    with open(filepath, 'w') as f:
        f.write(content)

components_dir = 'src/components'
for root, dirs, files in os.walk(components_dir):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            process_file(os.path.join(root, file))

print("Dark Theme conversion applied.")
