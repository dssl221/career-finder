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

// Career paths data (fallback when API is not available)
const careerPaths = {
    "data analyst": {
        steps: [
            {
                description: "Learn the Fundamentals",
                resources: [
                    {
                        title: "SQL Essential Training",
                        url: "https://www.linkedin.com/learning/sql-essential-training",
                        rating: 4.8
                    },
                    {
                        title: "Statistics Fundamentals",
                        url: "https://www.khanacademy.org/math/statistics-probability",
                        rating: 4.9
                    }
                ]
            },
            {
                description: "Master Data Analysis Tools",
                resources: [
                    {
                        title: "Python for Data Analysis",
                        url: "https://www.coursera.org/learn/python-data-analysis",
                        rating: 4.7
                    },
                    {
                        title: "Excel for Data Analysis",
                        url: "https://www.udemy.com/course/excel-for-data-analysis",
                        rating: 4.6
                    }
                ]
            }
        ]
    }
};

// Function to generate career path
async function generatePath() {
    const careerGoal = document.getElementById('careerGoal').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    
    try {
        // Try to fetch from API first
        const response = await fetch('http://localhost:8000/api/generate-path/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ career_goal: careerGoal })
        });
        
        if (!response.ok) throw new Error('API request failed');
        
        const data = await response.json();
        displayPath(data);
    } catch (error) {
        console.error('Error:', error);
        // Fallback to local data if API fails
        if (careerPaths[careerGoal]) {
            displayPath(careerPaths[careerGoal]);
        } else {
            resultDiv.innerHTML = '<p class="text-red-500">Career path not found. Please try a different career goal.</p>';
        }
    }
}

// Function to display the career path
function displayPath(pathData) {
    const resultDiv = document.getElementById('result');
    let html = '<div class="space-y-6">';
    
    pathData.steps.forEach((step, index) => {
        html += `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-bold mb-4">Step ${index + 1}: ${step.description}</h3>
                <div class="space-y-4">
                    ${step.resources.map(resource => `
                        <div class="bg-gray-50 p-4 rounded">
                            <a href="${resource.url}" target="_blank" class="text-blue-600 hover:text-blue-800 font-medium">
                                ${resource.title}
                            </a>
                            <div class="text-sm text-gray-600 mt-1">Rating: ${resource.rating}/5.0</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    resultDiv.innerHTML = html;
}

// Initialize quote on page load
document.addEventListener('DOMContentLoaded', getQuote);
