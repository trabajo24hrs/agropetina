$images = @(
  @{ Name = "ajo-morado-10.jpg"; Url = "https://biocuyoexportaciones.com.ar/wp-content/uploads/2023/04/biocuyo-exportaciones-produccion-de-ajo-valle-de-uco-mendoza-ajo-morado-10.jpg" },
  @{ Name = "ajo-morado-11.jpg"; Url = "https://biocuyoexportaciones.com.ar/wp-content/uploads/2023/04/biocuyo-exportaciones-produccion-de-ajo-valle-de-uco-mendoza-ajo-morado-11.jpg" },
  @{ Name = "ajo-blanco-9.jpg";  Url = "https://biocuyoexportaciones.com.ar/wp-content/uploads/2023/04/biocuyo-exportaciones-produccion-de-ajo-valle-de-uco-mendoza-ajo-blanco-9.jpg" },
  @{ Name = "ajo-blanco-10.jpg"; Url = "https://biocuyoexportaciones.com.ar/wp-content/uploads/2023/04/biocuyo-exportaciones-produccion-de-ajo-valle-de-uco-mendoza-ajo-blanco-10.jpg" },
  @{ Name = "ajo-blanco-12.jpg"; Url = "https://biocuyoexportaciones.com.ar/wp-content/uploads/2023/04/biocuyo-exportaciones-produccion-de-ajo-valle-de-uco-mendoza-ajo-blanco-12.jpg" },
  @{ Name = "ajo-colorado-10.jpg"; Url = "https://biocuyoexportaciones.com.ar/wp-content/uploads/2023/04/biocuyo-exportaciones-produccion-de-ajo-valle-de-uco-mendoza-ajo-colorado-italo-10.jpg" },
  @{ Name = "ajo-colorado-12.jpg"; Url = "https://biocuyoexportaciones.com.ar/wp-content/uploads/2023/04/biocuyo-exportaciones-produccion-de-ajo-valle-de-uco-mendoza-ajo-colorado-italo-12.jpg" },
  @{ Name = "ajo-colorado-14.jpg"; Url = "https://biocuyoexportaciones.com.ar/wp-content/uploads/2023/04/biocuyo-exportaciones-produccion-de-ajo-valle-de-uco-mendoza-ajo-colorado-italo-14.jpg" }
)

foreach ($item in $images) {
  $target = "c:\Users\progr\agropetina\assets\images\" + $item.Name
  try {
    Write-Host "Downloading $($item.Name)..."
    Invoke-WebRequest -Uri $item.Url -OutFile $target -UserAgent "Mozilla/5.0" -TimeoutSec 15
  } catch {
    Write-Host "Error downloading $($item.Name): $_"
  }
}

Get-ChildItem "c:\Users\progr\agropetina\assets\images\ajo-*" | Select-Object Name, Length
