# Apply Modern Navigation to All CGP360 Pages

$pages = @(
    "packages.html",
    "portfolio.html",
    "case-studies.html",
    "contact.html",
    "ads.html",
    "about.html",
    "why-us.html"
)

$cssToAdd = @'
    <style>
        /* Navigation Link Styles */
        .nav-link {
            position: relative;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .nav-link::before {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            transition: width 0.3s ease;
        }

        .nav-link:hover::before {
            width: 100%;
        }

        .nav-link:hover {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            transform: translateY(-2px);
        }
    </style>
'@

foreach ($page in $pages) {
    $filePath = "c:\Users\hp\Desktop\CGP360\$page"
    
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        
        # Add CSS before </head> if not already present
        if ($content -notmatch "\.nav-link") {
            $content = $content -replace '</head>', "$cssToAdd`r`n</head>"
        }
        
        # Update nav links
        $content = $content -replace 'class="hover:text-slate-900"', 'class="nav-link"'
        $content = $content -replace 'gap-6 text-sm', 'gap-8 text-sm'
        
        # Update Get Free Audit button
        $content = $content -replace 'class="hidden sm:inline-flex items-center justify-center rounded-md bg-brand-deepblue px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">Get\s+Free Audit', 'class="hidden sm:inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300"><i data-lucide="sparkles" class="w-4 h-4 mr-1.5"></i>Get Free Audit'
        
        # Update WhatsApp button if present
        $content = $content -replace 'class="inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50">\s*WhatsApp', 'class="inline-flex items-center justify-center rounded-lg border-2 border-emerald-500 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-500 hover:text-white hover:scale-105 transition-all duration-300"><i data-lucide="message-circle" class="w-4 h-4 mr-1.5"></i>WhatsApp'
        
        # Update gap-2 to gap-3 in button container
        $content = $content -replace '<div class="flex items-center gap-2">\s*<a href="contact\.html"', '<div class="flex items-center gap-3"><a href="contact.html"'
        
        Set-Content $filePath -Value $content -NoNewline
        Write-Host "✓ Updated $page"
    } else {
        Write-Host "✗ File not found: $page"
    }
}

Write-Host "`nNavigation update complete!"
