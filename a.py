import os

for root,_,files in os.walk("."):
    if 'node_modules' in root:
      continue
    for file in files:
        if not (file.endswith(".spec.ts") or file.endswith(".spec.tsx") or file.endswith(".test.ts") or file.endswith(".test.tsx")):
            continue
        abs=os.path.join(root,file)
        with open(abs,'r',encoding='utf8') as f:
            content=f.read()
        with open(abs,'w',encoding='utf8') as f:
            f.write("import { vi, describe, test, it, expect } from 'vitest';\n"+content)
        print(abs)
