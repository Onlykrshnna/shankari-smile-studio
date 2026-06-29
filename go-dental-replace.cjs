const fs = require('fs');

const updateFile = (filePath) => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    const replacements = [
        // Names
        [/Dr\. Harshal's dental Clinic/gi, "Go Dental Clinic"],
        [/Dr\. Harshal's/gi, "Go Dental Clinic"],
        [/Dr\. Harshal/gi, "Dr. Katrina"],
        
        // Locations
        [/Shop No\. 3, Pendse Bhawan, Tilak Rd, opposite Durvankur Dining Hall, Sadashiv Peth/gi, 'Unit M04 & M05, Mezzanine floor, Manazil Al Raffa 01 - Al Mankhool - Dubai - United Arab Emirates'],
        [/Shop No\. 3, Pendse Bhawan, Tilak Rd/gi, 'Unit M04 & M05, Manazil Al Raffa 01'],
        [/Located in: Pendse Bhawan \| Plus code: GR6W\+79 Pune, Maharashtra/gi, 'Dubai, United Arab Emirates'],
        [/Sadashiv Peth, Pune/gi, 'Bur Dubai, Dubai'],
        [/Sadashiv Peth/gi, 'Bur Dubai'],
        [/Pune/gi, 'Dubai'],
        [/Maharashtra 411030/gi, 'United Arab Emirates'],
        [/Maharashtra/gi, 'Dubai'],
        [/411030/gi, ''],
        
        // Phone/Contact
        [/08888478098/g, '+971800777000'],
        [/8888478098/g, '971800777000'],
        [/088884 78098/g, '+971 800 777000'],
        [/info@drharshalsdental\.com/g, 'appointments@godentalclinic.com'],
        
        // Rating (It was 4.9 previously)
        [/276 patients/g, '2,729 patients'],
        [/276 reviews/gi, '2,729 reviews'],
        [/4\.9 · 276/g, '4.9 · 2,729'],
        [/276/g, '2729'],
        
        // Map link
        [/Dr\+Harshals\+dental\+Clinic\+Sadashiv\+Peth\+Pune/gi, 'Go+Dental+Clinic+Bur+Dubai']
    ];

    for (let [pattern, replacement] of replacements) {
        content = content.replace(pattern, replacement);
    }

    fs.writeFileSync(filePath, content);
};

updateFile('public/index.html');
updateFile('src/routes/index.tsx');

// Also update the preloader specifically in index.html
let indexHtml = fs.readFileSync('public/index.html', 'utf8');

// Title with Name
indexHtml = indexHtml.replace(/डॉ\. हर्षल'स डेंटल क्लिनिक/g, "Go Dental Clinic");

// Testimonials Replacement
const testTrackRegex = /<div class="test-track" id="testTrack">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/;
const match = indexHtml.match(testTrackRegex);

const review1 = `
      <div class="test-card">
        <div class="test-card-stars">★★★★★</div>
        <p class="test-card-quote">"Excellent service and very professional staff."</p>
        <div class="test-card-author">
          <div class="test-card-avatar">A</div>
          <div><div class="test-card-name">A Google User</div><div class="test-card-location">Dubai</div></div>
        </div>
      </div>`;
const review2 = `
      <div class="test-card">
        <div class="test-card-stars">★★★★★</div>
        <p class="test-card-quote">"The best dental clinic I have visited in Dubai."</p>
        <div class="test-card-author">
          <div class="test-card-avatar">S</div>
          <div><div class="test-card-name">Sarah</div><div class="test-card-location">Dubai</div></div>
        </div>
      </div>`;
const review3 = `
      <div class="test-card">
        <div class="test-card-stars">★★★★★</div>
        <p class="test-card-quote">"Highly recommended for braces and aligners!"</p>
        <div class="test-card-author">
          <div class="test-card-avatar">M</div>
          <div><div class="test-card-name">Mohammed</div><div class="test-card-location">Dubai</div></div>
        </div>
      </div>`;

if (match) {
    const newTestTrackInner = `
${review1}
${review2}
${review3}
<!-- Duplicate for infinite scroll -->
${review1}
${review2}
${review3}
    `;
    indexHtml = indexHtml.replace(match[1], newTestTrackInner);
}

// Subdescription replacement
indexHtml = indexHtml.replace(/Healthy teeth and gums start with the right habits\. Visit Go Dental Clinic for advanced, painless, and personalized dental treatments\./gi, "Go Dental Clinic (A part of Dr. Joy Dental Clinic group)is located at Al Mankhool, Bur Dubai. We provide a wide array of dental services by experts in the field.");
indexHtml = indexHtml.replace(/Healthy teeth and gums start with the right habits\./gi, "Go Dental Clinic is an affordable dental clinic in Al Mankhool.");

// Loader
indexHtml = indexHtml.replace(/<span>Go Dental Clinic<\/span> <span>Dental<\/span> <span>Centre<\/span>/gi, "<span>Go Dental</span> <span>Clinic</span> <span>Dubai</span>");
indexHtml = indexHtml.replace(/<div class="preloader-sub">Bur Dubai · Dubai<\/div>/gi, '<div class="preloader-sub">Bur Dubai · UAE</div>');
indexHtml = indexHtml.replace(/<div class="preloader-sub">Nagaur · Nagaur<\/div>/gi, '<div class="preloader-sub">Bur Dubai · UAE</div>');
indexHtml = indexHtml.replace(/<div class="preloader-sub">Nagaur · Rajasthan<\/div>/gi, '<div class="preloader-sub">Bur Dubai · UAE</div>');


// Schema hours
indexHtml = indexHtml.replace(/"openingHours": \["Mo-Su 10:00-18:30"\]/g, '"openingHours": ["Mo-Su 10:00-21:00"]');

fs.writeFileSync('public/index.html', indexHtml);

// Fix package.json name
let pkgJson = fs.readFileSync('package.json', 'utf8');
pkgJson = pkgJson.replace(/"name":\s*"[^"]+"/g, '"name": "go-dental-clinic"');
fs.writeFileSync('package.json', pkgJson);

console.log("Global replacements for Go Dental complete.");
