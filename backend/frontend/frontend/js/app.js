// Career paths and resources database
const careerPaths = {
    'data analyst': {
        steps: [
            'Learn SQL fundamentals',
            'Master Excel and spreadsheets',
            'Study statistics and probability',
            'Learn Python for data analysis',
            'Master data visualization tools',
            'Practice with real datasets'
        ],
        resources: [
            'SQL: Khan Academy SQL Course',
            'Excel: Microsoft Excel Tutorial',
            'Statistics: Statistics by MIT OpenCourseWare',
            'Python: DataCamp Python Courses',
            'Visualization: Tableau Public'
        ]
    },
    'web developer': {
        steps: [
            'Learn HTML & CSS basics',
            'Study JavaScript fundamentals',
            'Master a frontend framework',
            'Learn backend development',
            'Study databases',
            'Build portfolio projects'
        ],
        resources: [
            'HTML/CSS: freeCodeCamp Web Design',
            'JavaScript: JavaScript.info',
            'React: React Documentation',
            'Backend: Node.js Documentation',
            'MongoDB University'
        ]
    }
};

// Fetch and display an inspirational quote
async function getQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        document.getElementById('quote').textContent = `"${data.content}" - ${data.author}`;
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
}

// Generate and display career path
function generatePath() {
    const careerGoal = document.getElementById('careerGoal').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    
    if (careerPaths[careerGoal]) {
        const path = careerPaths[careerGoal];
        let html = `
            <h2 class="text-2xl font-bold text-indigo-600 mb-4">Your Learning Path for ${careerGoal.toUpperCase()}</h2>
            
            <div class="mb-6">
                <h3 class="text-xl font-semibold text-gray-700 mb-3">Steps to Follow:</h3>
                <ol class="list-decimal list-inside space-y-2">
                    ${path.steps.map(step => `<li class="text-gray-600">${step}</li>`).join('')}
                </ol>
            </div>
            
            <div>
                <h3 class="text-xl font-semibold text-gray-700 mb-3">Free Resources:</h3>
                <ul class="list-disc list-inside space-y-2">
                    ${path.resources.map(resource => `<li class="text-gray-600">${resource}</li>`).join('')}
                </ul>
            </div>
        `;
        resultDiv.innerHTML = html;
        resultDiv.classList.remove('hidden');
    } else {
        resultDiv.innerHTML = `
            <div class="text-red-500">
                Sorry, we don't have a specific path for "${careerGoal}" yet. 
                Please try another career goal like "data analyst" or "web developer".
            </div>
        `;
        resultDiv.classList.remove('hidden');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    getQuote();
    document.getElementById('generateBtn').addEventListener('click', generatePath);
});
