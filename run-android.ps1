# Run Android with compatible JDK options
$env:JAVA_TOOL_OPTIONS="--add-opens=java.base/java.io=ALL-UNNAMED --add-opens=java.base/java.util=ALL-UNNAMED --add-opens=java.base/java.lang=ALL-UNNAMED --add-exports=java.base/sun.nio.ch=ALL-UNNAMED"
npx react-native run-android
