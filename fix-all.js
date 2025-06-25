/**
 * Comprehensive fix script for React Native Android Studio issues
 * This script applies all fixes for Node.js path and bundle loading issues
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

console.log(`\n${colors.bright}${colors.green}===== React Native Android Studio Comprehensive Fix =====${colors.reset}\n`);

// Get Node.js path
const nodePath = process.execPath;
const nodeDir = path.dirname(nodePath);

console.log(`${colors.cyan}Node.js executable: ${nodePath}${colors.reset}`);
console.log(`${colors.cyan}Node.js directory: ${nodeDir}${colors.reset}\n`);

// Create a function to ensure a directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`${colors.green}✓ Created directory: ${dirPath}${colors.reset}`);
  }
}

// 1. Fix MainApplication.kt
try {
  console.log(`${colors.yellow}Fixing MainApplication.kt...${colors.reset}`);
  
  // Find MainApplication.kt
  const mainAppDir = path.join(__dirname, 'android', 'app', 'src', 'main', 'java');
  
  // Find the package directory by searching for MainApplication.kt
  function findMainApplication(dir) {
    if (!fs.existsSync(dir)) return null;
    
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        const result = findMainApplication(fullPath);
        if (result) return result;
      } else if (file.name === 'MainApplication.kt' || file.name === 'MainApplication.java') {
        return fullPath;
      }
    }
    
    return null;
  }
  
  const mainAppPath = findMainApplication(mainAppDir);
  
  if (mainAppPath) {
    console.log(`${colors.cyan}Found MainApplication at: ${mainAppPath}${colors.reset}`);
    
    // Read the file content
    let content = fs.readFileSync(mainAppPath, 'utf8');
    
    // Check if it's Kotlin
    if (mainAppPath.endsWith('.kt')) {
      // Find the reactNativeHost declaration
      const reactNativeHostMatch = content.match(/override val reactNativeHost: ReactNativeHost = ReactNativeHostWrapper\(/);
      
      if (reactNativeHostMatch) {
        // Find the DefaultReactNativeHost object declaration
        const defaultHostMatch = content.match(/object : DefaultReactNativeHost\(this\) \{/);
        
        if (defaultHostMatch) {
          // Find the position to insert our method - after the getJSMainModuleName method
          const jsMainModuleMatch = content.match(/override fun getJSMainModuleName\(\): String =/);
          
          if (jsMainModuleMatch) {
            // Find the end of the line
            const endOfLine = content.indexOf('\n', jsMainModuleMatch.index);
            
            // Check if getJSBundleFile is already implemented
            if (!content.includes('override fun getJSBundleFile()')) {
              // Add our getJSBundleFile method
              const bundleMethod = `

          override fun getJSBundleFile(): String? {
            val bundleInAssets = try {
              val assets = application.assets.list("")
              assets != null && assets.contains("index.android.bundle")
            } catch (e: Exception) {
              false
            }

            return if (bundleInAssets) {
              "assets://index.android.bundle"
            } else if (BuildConfig.DEBUG) {
              // In debug mode, try to use Metro
              super.getJSBundleFile()
            } else {
              // In release mode, we must have a bundle
              "assets://index.android.bundle"
            }
          }
`;
              
              // Insert the method
              content = content.slice(0, endOfLine + 1) + bundleMethod + content.slice(endOfLine + 1);
              
              // Write the updated content back to the file
              fs.writeFileSync(mainAppPath, content);
              console.log(`${colors.green}✓ Added getJSBundleFile method to DefaultReactNativeHost in MainApplication.kt${colors.reset}`);
            } else {
              console.log(`${colors.yellow}⚠️ getJSBundleFile is already implemented${colors.reset}`);
            }
          } else {
            console.error(`${colors.red}✗ Could not find getJSMainModuleName method${colors.reset}`);
          }
        } else {
          console.error(`${colors.red}✗ Could not find DefaultReactNativeHost object${colors.reset}`);
        }
      } else {
        console.error(`${colors.red}✗ Could not find reactNativeHost declaration${colors.reset}`);
      }
    } else {
      console.log(`${colors.yellow}⚠️ Java implementation not supported yet${colors.reset}`);
    }
  } else {
    console.error(`${colors.red}✗ Could not find MainApplication.kt or MainApplication.java${colors.reset}`);
  }
} catch (error) {
  console.error(`${colors.red}✗ Error fixing MainApplication.kt: ${error.message}${colors.reset}`);
}

// 2. Fix settings.gradle
try {
  console.log(`\n${colors.yellow}Fixing settings.gradle...${colors.reset}`);
  
  const settingsGradlePath = path.join(__dirname, 'android', 'settings.gradle');
  
  if (fs.existsSync(settingsGradlePath)) {
    let content = fs.readFileSync(settingsGradlePath, 'utf8');
    
    // Check if we need to modify the file
    if (!content.includes('gradle.ext.nodeExecutable')) {
      // Find the pluginManagement block
      const pluginManagementIndex = content.indexOf('pluginManagement {');
      
      if (pluginManagementIndex !== -1) {
        // Find the opening brace of the pluginManagement block
        const openBraceIndex = content.indexOf('{', pluginManagementIndex);
        
        // Insert our Node.js configuration after the opening brace
        const nodeConfig = `
  // Define Node.js executable
  def nodeExecutable = System.getenv("NODE_BINARY") ?: "${nodePath}"
  println "Using Node.js executable: \${nodeExecutable}"
  
  // Make nodeExecutable available to the rest of the build
  gradle.ext.nodeExecutable = nodeExecutable
  
`;
        
        // Insert the configuration
        content = content.slice(0, openBraceIndex + 1) + nodeConfig + content.slice(openBraceIndex + 1);
        
        // Write the updated content back to the file
        fs.writeFileSync(settingsGradlePath, content);
        console.log(`${colors.green}✓ Updated settings.gradle with Node.js configuration${colors.reset}`);
      } else {
        console.error(`${colors.red}✗ Could not find pluginManagement block in settings.gradle${colors.reset}`);
      }
    } else {
      console.log(`${colors.yellow}⚠️ settings.gradle already contains Node.js configuration${colors.reset}`);
    }
  } else {
    console.error(`${colors.red}✗ settings.gradle not found${colors.reset}`);
  }
} catch (error) {
  console.error(`${colors.red}✗ Error updating settings.gradle: ${error.message}${colors.reset}`);
}

// 3. Fix gradle.properties
try {
  console.log(`\n${colors.yellow}Fixing gradle.properties...${colors.reset}`);
  
  const gradlePropertiesPath = path.join(__dirname, 'android', 'gradle.properties');
  
  let content = '';
  
  // Read existing content if file exists
  if (fs.existsSync(gradlePropertiesPath)) {
    content = fs.readFileSync(gradlePropertiesPath, 'utf8');
  }
  
  // Update or add nodeExecutable
  if (content.includes('nodeExecutable=')) {
    content = content.replace(/nodeExecutable=.*(\r?\n|$)/g, `nodeExecutable=${nodePath}\n`);
  } else {
    content += `\n# Fix for "Cannot run program 'node'" error\nnodeExecutable=${nodePath}\n`;
  }
  
  // Add org.gradle.warning.mode=none if it doesn't exist
  if (!content.includes('org.gradle.warning.mode=')) {
    content += '\n# Suppress Gradle deprecation warnings\norg.gradle.warning.mode=none\n';
  }
  
  // Write the updated content
  fs.writeFileSync(gradlePropertiesPath, content);
  console.log(`${colors.green}✓ Updated gradle.properties with Node.js path and warning mode${colors.reset}`);
} catch (error) {
  console.error(`${colors.red}✗ Error updating gradle.properties: ${error.message}${colors.reset}`);
}

// 4. Create node script in the android directory
try {
  console.log(`\n${colors.yellow}Creating node script...${colors.reset}`);
  
  const androidNodePath = path.join(__dirname, 'android', 'node');
  
  // Create a simple shell script that executes node
  const scriptContent = `#!/bin/sh\nexec "${nodePath}" "$@"\n`;
  fs.writeFileSync(androidNodePath, scriptContent);
  fs.chmodSync(androidNodePath, '755'); // Make it executable
  console.log(`${colors.green}✓ Created node script at ${androidNodePath}${colors.reset}`);
} catch (error) {
  console.error(`${colors.red}✗ Error creating node script: ${error.message}${colors.reset}`);
}

// 5. Create .env file with NODE_BINARY
try {
  console.log(`\n${colors.yellow}Creating .env file...${colors.reset}`);
  
  const envPath = path.join(__dirname, '.env');
  fs.writeFileSync(envPath, `NODE_BINARY=${nodePath}\n`);
  console.log(`${colors.green}✓ Created .env file with NODE_BINARY=${nodePath}${colors.reset}`);
} catch (error) {
  console.error(`${colors.red}✗ Error creating .env file: ${error.message}${colors.reset}`);
}

// 6. Create react-native.config.js file if it doesn't exist
try {
  console.log(`\n${colors.yellow}Creating react-native.config.js...${colors.reset}`);
  
  const rnConfigPath = path.join(__dirname, 'react-native.config.js');
  
  if (!fs.existsSync(rnConfigPath)) {
    const rnConfigContent = `
module.exports = {
  project: {
    ios: {},
    android: {
      sourceDir: './android',
    },
  },
  assets: ['./assets/'],
};
`;
    fs.writeFileSync(rnConfigPath, rnConfigContent);
    console.log(`${colors.green}✓ Created react-native.config.js${colors.reset}`);
  } else {
    console.log(`${colors.yellow}⚠️ react-native.config.js already exists${colors.reset}`);
  }
} catch (error) {
  console.error(`${colors.red}✗ Error creating react-native.config.js: ${error.message}${colors.reset}`);
}

// 7. Create repositories.gradle file
try {
  console.log(`\n${colors.yellow}Creating repositories.gradle file...${colors.reset}`);
  
  const repositoriesGradlePath = path.join(__dirname, 'android', 'repositories.gradle');
  
  const repositoriesContent = `// Define repositories for all projects
allprojects {
    repositories {
        google()
        mavenCentral()
        maven { url 'https://www.jitpack.io' }
    }
}

// Define repositories for buildscript
buildscript {
    repositories {
        google()
        mavenCentral()
    }
}

// Define repositories for settings
settings.dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
        maven { url 'https://www.jitpack.io' }
    }
}
`;
  
  fs.writeFileSync(repositoriesGradlePath, repositoriesContent);
  console.log(`${colors.green}✓ Created repositories.gradle file${colors.reset}`);
} catch (error) {
  console.error(`${colors.red}✗ Error creating repositories.gradle file: ${error.message}${colors.reset}`);
}

// 8. Create assets directory and .gitkeep
try {
  console.log(`\n${colors.yellow}Creating assets directory...${colors.reset}`);
  
  const assetsDir = path.join(__dirname, 'android', 'app', 'src', 'main', 'assets');
  ensureDirectoryExists(assetsDir);
  
  const gitkeepPath = path.join(assetsDir, '.gitkeep');
  fs.writeFileSync(gitkeepPath, '');
  console.log(`${colors.green}✓ Created .gitkeep in assets directory${colors.reset}`);
} catch (error) {
  console.error(`${colors.red}✗ Error creating assets directory: ${error.message}${colors.reset}`);
}

// 8. Generate the bundle
try {
  console.log(`\n${colors.yellow}Generating JavaScript bundle...${colors.reset}`);
  
  // Create assets directory if it doesn't exist
  const assetsDir = path.join(__dirname, 'android', 'app', 'src', 'main', 'assets');
  ensureDirectoryExists(assetsDir);
  
  // Generate the bundle
  execSync('npx react-native bundle --platform android --dev false --entry-file App.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res', { stdio: 'inherit' });
  
  // Check if the bundle was generated successfully
  const bundlePath = path.join(__dirname, 'android', 'app', 'src', 'main', 'assets', 'index.android.bundle');
  if (fs.existsSync(bundlePath)) {
    console.log(`${colors.green}✓ Bundle generated successfully!${colors.reset}`);
    console.log(`${colors.cyan}Bundle location: ${bundlePath}${colors.reset}`);
  } else {
    console.error(`${colors.red}✗ Failed to generate bundle${colors.reset}`);
  }
} catch (error) {
  console.error(`${colors.red}✗ Error generating bundle: ${error.message}${colors.reset}`);
}

// 9. Make the shell scripts executable
try {
  console.log(`\n${colors.yellow}Making shell scripts executable...${colors.reset}`);
  
  const openStudioPath = path.join(__dirname, 'open-android-studio.sh');
  if (fs.existsSync(openStudioPath)) {
    fs.chmodSync(openStudioPath, '755');
    console.log(`${colors.green}✓ Made open-android-studio.sh executable${colors.reset}`);
  }
  
  const runAndroidPath = path.join(__dirname, 'run-android.sh');
  if (fs.existsSync(runAndroidPath)) {
    fs.chmodSync(runAndroidPath, '755');
    console.log(`${colors.green}✓ Made run-android.sh executable${colors.reset}`);
  }
  
  const generateBundlePath = path.join(__dirname, 'generate-bundle.sh');
  if (fs.existsSync(generateBundlePath)) {
    fs.chmodSync(generateBundlePath, '755');
    console.log(`${colors.green}✓ Made generate-bundle.sh executable${colors.reset}`);
  }
} catch (error) {
  console.error(`${colors.red}✗ Error making scripts executable: ${error.message}${colors.reset}`);
}

console.log(`\n${colors.bright}${colors.green}===== Instructions for Android Studio =====${colors.reset}\n`);
console.log(`${colors.yellow}1. Open Android Studio with:${colors.reset}`);
console.log(`   ${colors.bright}npm run studio${colors.reset}`);
console.log(`${colors.yellow}2. In Android Studio, go to Preferences > Appearance & Behavior > Path Variables${colors.reset}`);
console.log(`${colors.yellow}3. Add a new variable:${colors.reset}`);
console.log(`   - Name: ${colors.bright}NODE_BINARY${colors.reset}`);
console.log(`   - Value: ${colors.bright}${nodePath}${colors.reset}`);
console.log(`${colors.yellow}4. Click Apply and OK${colors.reset}`);
console.log(`${colors.yellow}5. Run the app from Android Studio${colors.reset}\n`);

console.log(`${colors.bright}${colors.green}===== All Fixes Applied =====${colors.reset}\n`);
