import glob

replacements = [
    ("bg-white/5", "bg-slate-50"),
    ("bg-white/10", "bg-slate-100"),
    ("bg-white/20", "bg-slate-200"),
    ("bg-black/40", "bg-slate-50"),
    ("bg-black/60", "bg-slate-50/80"),
    ("bg-black", "bg-white"),
    ("bg-background-secondary", "bg-slate-50"),
    ("bg-background-elevated", "bg-white"),
    
    ("border-white/5", "border-slate-100"),
    ("border-white/10", "border-slate-200"),
    ("border-white/20", "border-slate-300"),
    ("border-white/30", "border-slate-300"),

    ("text-white", "text-slate-900"),
    ("text-font-primary", "text-slate-900"),
]

def convert_light():
    files = glob.glob('src/components/**/*.tsx', recursive=True)
    count = 0
    
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
            print(f"Migrated {file} to light theme structure.")

    print(f"Success! Migrated {count} files to Light Skynet Theme.")

if __name__ == "__main__":
    convert_light()
