@echo off
echo Starting Event Registration Backend...
echo.
cd /d "%~dp0"
set JAVA_HOME=C:\Users\91879\.jdk\jdk-21.0.8
set PATH=%JAVA_HOME%\bin;%PATH%
echo Using Java from: %JAVA_HOME%
echo.
java -version
echo.
echo Starting server with H2 database...
java -Dspring.profiles.active=h2 -jar target\event-registration-backend-1.0.0.jar
pause
