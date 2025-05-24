// Determine the API base URL based on the environment
const BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8000/api'
    : 'https://your-production-api-domain.com/api';  // We'll update this once we deploy

async function getCareerPath() {
    const careerInput = document.getElementById('careerInput').value;
    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('result');
    
    if (!careerInput) {
        alert('Please enter a career goal');
        return;
    }

    try {
        loadingDiv.style.display = 'block';
        resultDiv.innerHTML = '';

        // Get career path from Django backend
        const response = await fetch(`${BASE_URL}/generate-path/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ career_goal: careerInput })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to get career path');
        }

        // Get motivational quote
        const quoteResponse = await fetch('https://api.quotable.io/random');
        const quoteData = await quoteResponse.json();

        // Build the result HTML
        let html = `
            <div class="bg-white p-6 rounded-lg shadow-lg">
                <h2 class="text-2xl font-bold mb-4">${data.title}</h2>
                <p class="text-gray-600 mb-6">${data.description}</p>
                
                <div class="mb-6 p-4 bg-yellow-50 rounded">
                    <p class="italic text-gray-700">"${quoteData.content}"</p>
                    <p class="text-gray-500 text-right">- ${quoteData.author}</p>
                </div>

                <h3 class="text-xl font-semibold mb-4">Recommended Resources:</h3>
                <div class="space-y-4">
        `;

        data.resources.forEach(resource => {
            html += `
                <div class="resource-card bg-gray-50 p-4 rounded">
                    <h4 class="font-semibold">${resource.title}</h4>
                    <p class="text-gray-600 mb-2">${resource.description}</p>
                    <div class="flex justify-between items-center">
                        <a href="${resource.url}" target="_blank" 
                           class="text-blue-500 hover:text-blue-700">
                            Visit Resource →
                        </a>
                        <div class="flex items-center">
                            <span class="text-yellow-500">★</span>
                            <span class="ml-1">${resource.rating.toFixed(1)} (${resource.rating_count})</span>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;

        resultDiv.innerHTML = html;
    } catch (error) {
        resultDiv.innerHTML = `
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                ${error.message}
            </div>
        `;
    } finally {
        loadingDiv.style.display = 'none';
    }
}

// Add event listener for the form submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('careerForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            getCareerPath();
        });
    }
});
