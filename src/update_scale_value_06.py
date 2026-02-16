import re

file_path = 'feedexternal/Feed.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# We want to change scale: 0.8 to scale: 0.6 in the initial prop for images.
# Previous logic was targeting `initial={{ opacity: 0, scale: 0.8 }}`
# The text blocks have `scale: 0.95` and `filter`, so they are safe.

pattern = r'initial=\{\{ opacity: 0, scale: 0\.8 \}\}'

# Replacement
replacement = 'initial={{ opacity: 0, scale: 0.6 }}'

new_content = re.sub(pattern, replacement, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
