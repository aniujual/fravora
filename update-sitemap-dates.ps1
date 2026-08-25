# Updates sitemap.xml lastmod dates from git commit history for each tracked file.
# Run from the repo root after committing changes: .\update-sitemap-dates.ps1

$sitemap = Get-Content sitemap.xml -Raw
$urls = [regex]::Matches($sitemap, '<loc>(https://[^<]+)</loc>')

foreach ($match in $urls) {
    $url = $match.Groups[1].Value
    # Derive relative file path from URL
    $rel = $url -replace 'https://fravora.app/', ''
    if ($rel -eq '' -or $rel -eq '/') { $rel = 'index.html' }

    $date = git log -1 --format='%as' -- $rel 2>$null
    if ($date) {
        $sitemap = $sitemap -replace "(<loc>$([regex]::Escape($url))</loc>\s*<lastmod>)[^<]+(</lastmod>)", "`${1}$date`$2"
    }
}

$sitemap | Set-Content sitemap.xml -NoNewline
Write-Host "sitemap.xml updated."
