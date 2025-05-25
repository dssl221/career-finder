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

// Get career path from backend
async function getCareerPath(careerGoal) {
    const loader = document.getElementById('loader');
    const pathResult = document.getElementById('pathResult');
    const stepsContainer = document.getElementById('steps');

    try {
        loader.classList.remove('hidden');
        pathResult.classList.add('hidden');

        const response = await fetch('http://localhost:8000/api/generate-path/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ career_goal: careerGoal })
        });

        const data = await response.json();
        stepsContainer.innerHTML = '';

        data.steps.forEach((step, index) => {
            const stepElement = document.createElement('div');
            stepElement.className = 'bg-gray-50 p-6 rounded-lg';
            stepElement.innerHTML = `
                <h3 class="text-xl font-semibold text-gray-800 mb-4">
                    Step ${index + 1}: ${step.description}
                </h3>
                <div class="space-y-4">
                    ${step.resources.map(resource => `
                        <div class="bg-white p-4 rounded shadow-sm">
                            <a href="${resource.url}" 
                               target="_blank" 
                               class="text-indigo-600 hover:text-indigo-800 font-medium">
                                ${resource.title}
                            </a>
                            <div class="flex items-center mt-2">
                                <div class="text-yellow-400">
                                    ${'★'.repeat(Math.floor(resource.rating))}
                                    ${resource.rating % 1 ? '½' : ''}
                                    ${'☆'.repeat(5 - Math.ceil(resource.rating))}
                                </div>
                                <span class="ml-2 text-gray-600">${resource.rating}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            stepsContainer.appendChild(stepElement);
        });

        pathResult.classList.remove('hidden');
    } catch (error) {
        console.error('Error fetching career path:', error);
        stepsContainer.innerHTML = `
            <div class="bg-red-50 text-red-600 p-4 rounded">
                Error loading career path. Please try again.
            </div>
        `;
        pathResult.classList.remove('hidden');
    } finally {
        loader.classList.add('hidden');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    getQuote();
    
    const getPathButton = document.getElementById('getPath');
    const careerGoalInput = document.getElementById('careerGoal');

    getPathButton.addEventListener('click', () => {
        const careerGoal = careerGoalInput.value.trim();
        if (careerGoal) {
            getCareerPath(careerGoal);
        }
    });

    careerGoalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const careerGoal = careerGoalInput.value.trim();
            if (careerGoal) {
                getCareerPath(careerGoal);
            }
        }
    });
});
