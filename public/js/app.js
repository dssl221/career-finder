// Career paths data
const careerPaths = {
    "data analyst": {
        title: "Data Analyst",
        steps: [
            {
                name: "Foundations",
                resources: [
                    { title: "SQL Basics", url: "https://www.w3schools.com/sql/", rating: 0 },
                    { title: "Python Programming", url: "https://www.python.org/about/gettingstarted/", rating: 0 },
                    { title: "Statistics Fundamentals", url: "https://www.khanacademy.org/math/statistics-probability", rating: 0 }
                ]
            },
            {
                name: "Data Analysis Tools",
                resources: [
                    { title: "Pandas Tutorial", url: "https://pandas.pydata.org/docs/getting_started/", rating: 0 },
                    { title: "Excel for Data Analysis", url: "https://support.microsoft.com/en-us/excel", rating: 0 }
                ]
            },
            {
                name: "Visualization",
                resources: [
                    { title: "Tableau Public", url: "https://public.tableau.com/en-us/s/", rating: 0 },
                    { title: "Power BI Basics", url: "https://powerbi.microsoft.com/en-us/learning/", rating: 0 }
                ]
            }
        ]
    },
    "web developer": {
        title: "Web Developer",
        steps: [
            {
                name: "HTML/CSS Basics",
                resources: [
                    { title: "HTML5 Tutorial", url: "https://www.w3schools.com/html/", rating: 0 },
                    { title: "CSS Fundamentals", url: "https://www.w3schools.com/css/", rating: 0 }
                ]
            },
            {
                name: "JavaScript",
                resources: [
                    { title: "JavaScript Basics", url: "https://javascript.info/", rating: 0 },
                    { title: "Modern JavaScript Tutorial", url: "https://javascript.info/", rating: 0 }
                ]
            },
            {
                name: "Frontend Frameworks",
                resources: [
                    { title: "React Tutorial", url: "https://reactjs.org/tutorial/tutorial.html", rating: 0 },
                    { title: "Vue.js Guide", url: "https://vuejs.org/v2/guide/", rating: 0 }
                ]
            }
        ]
    }
};

// Load ratings from localStorage
function loadRatings() {
    const savedRatings = localStorage.getItem('resourceRatings');
    if (savedRatings) {
        const ratings = JSON.parse(savedRatings);
        Object.keys(careerPaths).forEach(career => {
            careerPaths[career].steps.forEach(step => {
                step.resources.forEach(resource => {
                    const savedRating = ratings[resource.url];
                    if (savedRating !== undefined) {
                        resource.rating = savedRating;
                    }
                });
            });
        });
    }
}

// Save ratings to localStorage
function saveRatings() {
    const ratings = {};
    Object.keys(careerPaths).forEach(career => {
        careerPaths[career].steps.forEach(step => {
            step.resources.forEach(resource => {
                ratings[resource.url] = resource.rating;
            });
        });
    });
    localStorage.setItem('resourceRatings', JSON.stringify(ratings));
}

// Rate a resource
function rateResource(url, rating) {
    Object.keys(careerPaths).forEach(career => {
        careerPaths[career].steps.forEach(step => {
            step.resources.forEach(resource => {
                if (resource.url === url) {
                    resource.rating = rating;
                }
            });
        });
    });
    saveRatings();
    getCareerPath(); // Refresh the display
}

// Generate star rating HTML
function generateStarRating(url, currentRating) {
    let html = '<div class="flex items-center space-x-1">';
    for (let i = 1; i <= 5; i++) {
        html += `
            <button onclick="rateResource('${url}', ${i})" 
                    class="${i <= currentRating ? 'text-yellow-500' : 'text-gray-300'} hover:text-yellow-500">
                ★
            </button>`;
    }
    html += '</div>';
    return html;
}

// Fetch quote from ZenQuotes API
async function getQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        return `"${data.content}" - ${data.author}`;
    } catch (error) {
        console.error('Error fetching quote:', error);
        return "Your journey of a thousand miles begins with a single step. - Lao Tzu";
    }
}

// Main function to get career path
async function getCareerPath() {
    const input = document.getElementById('careerInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    loadingSpinner.classList.remove('hidden');
    
    try {
        const quote = await getQuote();
        const path = careerPaths[input];
        
        if (!path) {
            resultDiv.innerHTML = `
                <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                    Career path not found. Please try one of the available careers.
                </div>
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <p class="italic text-gray-600">${quote}</p>
                </div>
            `;
            return;
        }

        let html = `
            <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
                <p class="italic text-gray-600 mb-4">${quote}</p>
                <h2 class="text-2xl font-bold mb-4">Learning Path: ${path.title}</h2>
        `;

        path.steps.forEach((step, index) => {
            html += `
                <div class="mb-6">
                    <h3 class="text-xl font-semibold mb-3">Step ${index + 1}: ${step.name}</h3>
                    <div class="space-y-4">
            `;

            step.resources.forEach(resource => {
                html += `
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="flex justify-between items-center">
                            <a href="${resource.url}" 
                               target="_blank" 
                               class="text-blue-600 hover:text-blue-800 font-medium">
                                ${resource.title}
                            </a>
                            ${generateStarRating(resource.url, resource.rating)}
                        </div>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        });

        html += '</div>';
        resultDiv.innerHTML = html;
        
    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = `
            <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                An error occurred. Please try again later.
            </div>
        `;
    } finally {
        loadingSpinner.classList.add('hidden');
    }
}

// Load saved ratings when the page loads
document.addEventListener('DOMContentLoaded', loadRatings);
