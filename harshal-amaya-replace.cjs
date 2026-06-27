const fs = require('fs');

const updateFile = (filePath) => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    const replacements = [
        // Names
        [/Amaya Dental Clinic/gi, "Dr. Harshal's dental Clinic"],
        [/Amaya Dental Health Centre/gi, "Dr. Harshal's dental Clinic"],
        [/Amaya Dental Centre/gi, "Dr. Harshal's dental Clinic"],
        [/Amaya Dental/gi, "Dr. Harshal's dental Clinic"],
        [/Amaya/gi, "Dr. Harshal's"],
        
        // URLs and IDs
        [/amayadental\.in/g, "drharshalsdental.com"],
        [/amaya-dental-clinic/g, "dr-harshals-dental-clinic"]
    ];

    for (let [pattern, replacement] of replacements) {
        content = content.replace(pattern, replacement);
    }

    fs.writeFileSync(filePath, content);
};

// Files to update based on grep output
updateFile('public/index.html');
updateFile('src/routes/index.tsx');
updateFile('package.json');
updateFile('package-lock.json');

// Extra fixes for public/index.html
let indexHtml = fs.readFileSync('public/index.html', 'utf8');
// Fix the navigation brand specifically if it became "Dr. Harshal's dental Clinic<span class="dot">.</span>" which might be too long
indexHtml = indexHtml.replace(/<div class="footer-brand">Dr\. Harshal's dental Clinic<span class="dot">\.<\/span><\/div>/g, '<div class="footer-brand">Dr. Harshal\'s<span class="dot">.</span></div>');

// Ensure Preloader looks correct
indexHtml = indexHtml.replace(/<span>Dr\. Harshal's<\/span> <span>dental<\/span> <span>Clinic<\/span>/gi, "<span>Dr. Harshal's</span> <span>dental</span> <span>Clinic</span>");

fs.writeFileSync('public/index.html', indexHtml);

console.log("Amaya string replacements for Harshal Dental complete.");
