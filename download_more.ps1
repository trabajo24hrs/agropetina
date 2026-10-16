$moreImages = @(
  @{ Name = "lab-rio-negro.jpg"; Url = "https://biocuyoexportaciones.com.ar/wp-content/uploads/2023/04/biocuyo-exportaciones-produccion-de-ajo-valle-de-uco-mendoza-laboratorio-9.jpg" },
  @{ Name = "lab-semillas.jpg"; Url = "https://biocuyoexportaciones.com.ar/wp-content/uploads/2023/04/biocuyo-exportaciones-produccion-de-ajo-valle-de-uco-mendoza-laboratorio-10.jpg" },
  @{ Name = "lab-instalacion.jpg"; Url = "https://biocuyoexportaciones.com.ar/wp-content/uploads/2022/10/biocuyo-exportaciones-produccion-de-ajo-valle-de-uco-mendoza-laboratorio-6-scaled.jpg" }
)

foreach ($item in $moreImages) {
  $target = "c:\Users\progr\agropetina\assets\images\" + $item.Name
  try {
    Write-Host "Downloading $($item.Name)..."
    Invoke-WebRequest -Uri $item.Url -OutFile $target -UserAgent "Mozilla/5.0" -TimeoutSec 15
  } catch {
    Write-Host "Error downloading $($item.Name): $_"
  }
}

Get-ChildItem "c:\Users\progr\agropetina\assets\images\lab-*" | Select-Object Name, Length
