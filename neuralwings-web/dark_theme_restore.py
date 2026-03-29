import os
import glob

replacements = [
    ("bg-slate-50", "bg-black"),
    ("bg-slate-100", "bg-black"),
    ("bg-slate-200/50", "bg-white/5"),
    ("bg-slate-200", "bg-white/10"),
    ("border-slate-300", "border-white/10"),
    ("border-slate-200", "border-white/5"),
    ("text-slate-900", "text-white"),
    ("text-slate-800", "text-white"),
    ("text-slate-500", "text-font-muted"),
    ("text-slate-600", "text-font-muted"),
    ("text-slate-700", "text-font-secondary"),
    ("shadow-slate-300", "shadow-cyan-500/20"),
]

def revert_theme():
    files = glob.glob('src/**/*.tsx', recursive=True)
    count = 0
    
    # Exclude the ones we just wrote perfectly for dark mode.
    # Actually, it's safe to run on them since they don't contain slate anyway.
    for file in files:
        with open(file, 'r') as f:
            content = f.read()
            
        original = content
        for old, new in replacements:
            content = content.replace(old, new)
            
        if content != original:
            with open(file, 'w') as f:
                f.write(content)
            count += 1
            print(f"Reverted theme in {file}")

    print(f"Success! Reverted {count} files back to dark theme.")

if __name__ == "__main__":
    revert_theme()
