# Setup script to download and set up JDK 17
# Create a directory to store JDK
$jdkDir = "$env:USERPROFILE\jdk-17"
if (!(Test-Path -Path $jdkDir)) {
    New-Item -ItemType Directory -Path $jdkDir -Force
}

# Download URL for AdoptOpenJDK 17
$jdkUrl = "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.9%2B9/OpenJDK17U-jdk_x64_windows_hotspot_17.0.9_9.zip"
$zipFile = "$env:TEMP\jdk17.zip"

# Download JDK
Write-Host "Downloading JDK 17..."
Invoke-WebRequest -Uri $jdkUrl -OutFile $zipFile

# Extract JDK
Write-Host "Extracting JDK 17..."
Expand-Archive -Path $zipFile -DestinationPath $jdkDir -Force

# Update gradle.properties to use this JDK
$gradleProps = Get-Content "android\gradle.properties"
$newContent = $gradleProps -replace "org.gradle.java.installations.auto-detect=true", "org.gradle.java.home=$jdkDir\jdk-17.0.9+9"
Set-Content -Path "android\gradle.properties" -Value $newContent

# Clean up
Remove-Item $zipFile -Force

Write-Host "JDK 17 has been set up at $jdkDir"
Write-Host "Updated gradle.properties to use JDK 17"
