$logos = @(
  @{ Name = "biocuyo-logo.png"; Url = "https://biocuyoexportaciones.com.ar/wp-content/uploads/2023/04/biocuyo-exportaciones-produccion-de-ajo-valle-de-uco-mendoza-logo-home-1x-1-1.png" },
  @{ Name = "biocuyo-sticky-logo.png"; Url = "https://biocuyoexportaciones.com.ar/wp-content/uploads/2022/10/biocuyo-exportaciones-produccion-de-ajo-valle-de-uco-mendoza-logo-sticky-header-2x.png" }
)

foreach ($item in $logos) {
  $target = "c:\Users\progr\agropetina\assets\images\" + $item.Name
  try {
    Write-Host "Downloading $($item.Name)..."
    Invoke-WebRequest -Uri $item.Url -OutFile $target -UserAgent "Mozilla/5.0" -TimeoutSec 15
  } catch {
    Write-Host "Error downloading $($item.Name): $_"
  }
}

Get-ChildItem "c:\Users\progr\agropetina\assets\images\*logo*" | Select-Object Name, Length
