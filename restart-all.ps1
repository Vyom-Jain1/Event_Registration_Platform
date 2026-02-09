Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   RESTARTING BACKEND WITH ADMIN FIX" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "`n[1/4] Rebuilding backend..." -ForegroundColor Yellow
cd e:\HackathonHcl\event-registration-backend
mvn clean package -DskipTests

Write-Host "`n[2/4] Starting backend..." -ForegroundColor Yellow
Start-Job -ScriptBlock {
    & "C:\Users\91879\.jdk\jdk-21.0.8\bin\java.exe" -jar "e:\HackathonHcl\event-registration-backend\target\event-registration-backend-1.0.0.jar" --spring.profiles.active=h2
} | Out-Null

Start-Sleep -Seconds 10

Write-Host "`n[3/4] Starting frontend..." -ForegroundColor Yellow
cd e:\HackathonHcl\event-registration-app
Start-Job -ScriptBlock {
    cd e:\HackathonHcl\event-registration-app
    npm start
} | Out-Null

Start-Sleep -Seconds 5

Write-Host "`n[4/4] Checking status..." -ForegroundColor Yellow
$backend = Test-NetConnection -ComputerName localhost -Port 8081 -WarningAction SilentlyContinue
$frontend = Test-NetConnection -ComputerName localhost -Port 3000 -WarningAction SilentlyContinue

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   SERVICES STATUS" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
if ($backend.TcpTestSucceeded) {
    Write-Host "Backend (8081):  RUNNING" -ForegroundColor Green
} else {
    Write-Host "Backend (8081):  STARTING..." -ForegroundColor Yellow
}
if ($frontend.TcpTestSucceeded) {
    Write-Host "Frontend (3000): RUNNING" -ForegroundColor Green
} else {
    Write-Host "Frontend (3000): STARTING..." -ForegroundColor Yellow
}

Write-Host "`nLogin with: admin@demo.com / admin123" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan
