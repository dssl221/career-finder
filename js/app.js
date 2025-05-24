// Determine the API base URL based on the environment
const BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8000/api'
    : 'https://dssl221.pythonanywhere.com/api';  // We'll update this once we deploy

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
        const quoteResponse = await fetch('https://zenquotes.io/api/random');
        const [quoteData] = await quoteResponse.json();

        // Create and display the result
        const pathHtml = `
            <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Your Career Path</h2>
                <div class="space-y-4">
                    ${data.steps.map((step, index) => `
                        <div class="border-l-4 border-blue-500 pl-4">
                            <h3 class="font-bold text-lg">Step ${index + 1}</h3>
                            <p class="text-gray-700">${step.description}</p>
                            ${step.resources ? `
                                <div class="mt-2">
                                    <h4 class="font-semibold">Resources:</h4>
                                    <ul class="list-disc list-inside">
                                        ${step.resources.map(resource => `
                                            <li class="flex items-center gap-2">
                                                <a href="${resource.url}" target="_blank" class="text-blue-600 hover:underline">${resource.title}</a>
                                                <div class="resource-rating" data-resource-id="${resource.id}">
                                                    ${generateStarRating(resource.rating)}
                                                </div>
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="bg-white rounded-lg shadow-lg p-6">
                <blockquote class="text-xl italic text-gray-700">
                    "${quoteData.q}"
                    <footer class="text-gray-600 mt-2">— ${quoteData.a}</footer>
                </blockquote>
            </div>
        `;

        resultDiv.innerHTML = pathHtml;
        setupResourceRating();

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

function generateStarRating(rating) {
    return `
        <div class="flex gap-1">
            ${Array.from({ length: 5 }, (_, i) => `
                <button class="star-button ${i < rating ? 'text-yellow-400' : 'text-gray-300'}" data-rating="${i + 1}">
                    ★
                </button>
            `).join('')}
        </div>
    `;
}

function setupResourceRating() {
    document.querySelectorAll('.resource-rating').forEach(container => {
        const resourceId = container.dataset.resourceId;
        container.querySelectorAll('.star-button').forEach(button => {
            button.addEventListener('click', async () => {
                const rating = parseInt(button.dataset.rating);
                try {
                    const response = await fetch(`${BASE_URL}/rate-resource/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            resource_id: resourceId,
                            rating: rating
                        })
                    });

                    if (!response.ok) {
                        throw new Error('Failed to rate resource');
                    }

                    // Update stars visually
                    container.querySelectorAll('.star-button').forEach((star, index) => {
                        star.className = `star-button ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`;
                    });

                } catch (error) {
                    alert('Failed to rate resource. Please try again.');
                }
            });
        });
    });
}

document.getElementById('careerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    getCareerPath();
});
