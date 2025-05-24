// Career paths database
const careerPaths = {
    "data analyst": {
        steps: [
            {
                title: "Learn SQL Fundamentals",
                resources: [
                    { name: "SQLZoo", url: "https://sqlzoo.net/", type: "Interactive" },
                    { name: "W3Schools SQL", url: "https://www.w3schools.com/sql/", type: "Tutorial" }
                ]
            },
            {
                title: "Master Python Basics",
                resources: [
                    { name: "Python.org Tutorial", url: "https://docs.python.org/3/tutorial/", type: "Documentation" },
                    { name: "Codecademy Python", url: "https://www.codecademy.com/learn/learn-python", type: "Course" }
                ]
            },
            {
                title: "Data Analysis Libraries",
                resources: [
                    { name: "Pandas Documentation", url: "https://pandas.pydata.org/docs/", type: "Documentation" },
                    { name: "NumPy Tutorial", url: "https://numpy.org/doc/stable/user/quickstart.html", type: "Tutorial" }
                ]
            }
        ]
    },
    "web developer": {
        steps: [
            {
                title: "HTML & CSS Fundamentals",
                resources: [
                    { name: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Learn", type: "Documentation" },
                    { name: "freeCodeCamp", url: "https://www.freecodecamp.org/", type: "Interactive" }
                ]
            },
            {
                title: "JavaScript Essentials",
                resources: [
                    { name: "JavaScript.info", url: "https://javascript.info/", type: "Tutorial" },
                    { name: "Eloquent JavaScript", url: "https://eloquentjavascript.net/", type: "Book" }
                ]
            },
            {
                title: "Frontend Frameworks",
                resources: [
                    { name: "React Tutorial", url: "https://reactjs.org/tutorial/tutorial.html", type: "Tutorial" },
                    { name: "Vue.js Guide", url: "https://vuejs.org/v2/guide/", type: "Documentation" }
                ]
            }
        ]
    }
};

// Function to fetch inspirational quote
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

// Function to generate career path
async function getCareerPath() {
    const careerInput = document.getElementById('careerInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    
    if (!careerPaths[careerInput]) {
        resultDiv.innerHTML = `
            <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                Career path not found. Please try one of the available careers.
            </div>
        `;
        return;
    }

    const quote = await getQuote();
    const path = careerPaths[careerInput];
    
    let html = `
        <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div class="mb-6 text-center italic text-gray-600">${quote}</div>
            <h2 class="text-2xl font-bold mb-4">Learning Path for ${careerInput.charAt(0).toUpperCase() + careerInput.slice(1)}</h2>
            <div class="space-y-6">
    `;

    path.steps.forEach((step, index) => {
        html += `
            <div class="border-l-4 border-blue-500 pl-4">
                <h3 class="text-xl font-semibold mb-2">Step ${index + 1}: ${step.title}</h3>
                <div class="space-y-2">
                    ${step.resources.map(resource => `
                        <div class="flex items-center">
                            <span class="w-20 text-sm text-gray-500">${resource.type}</span>
                            <a href="${resource.url}" target="_blank" class="text-blue-600 hover:text-blue-800 underline">
                                ${resource.name}
                            </a>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });

    html += `
            </div>
        </div>
    `;

    resultDiv.innerHTML = html;
}
