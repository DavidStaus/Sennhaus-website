#!/usr/bin/env python3
import shutil
import os

# Copy coaching favicons
coaching_files = [
    'android-chrome-192x192.png',
    'android-chrome-512x512.png', 
    'apple-touch-icon.png',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'favicon.ico'
]

src_coaching = '/workspaces/Sennhaus-website/coaching favicons'
dst_coaching = '/workspaces/Sennhaus-website/coaching/favicons'

for f in coaching_files:
    src = os.path.join(src_coaching, f)
    dst = os.path.join(dst_coaching, f)
    if os.path.exists(src):
        shutil.copy2(src, dst)
        print(f"Copied {f} to coaching/favicons/")

# Copy photography favicons
src_photo = '/workspaces/Sennhaus-website/photography favicons'
dst_photo = '/workspaces/Sennhaus-website/photography/favicons'

for f in coaching_files:
    src = os.path.join(src_photo, f)
    dst = os.path.join(dst_photo, f)
    if os.path.exists(src):
        shutil.copy2(src, dst)
        print(f"Copied {f} to photography/favicons/")

print("All favicon files migrated successfully!")
