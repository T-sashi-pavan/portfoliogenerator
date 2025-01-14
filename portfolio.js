document.addEventListener("DOMContentLoaded", function () {
    const data = JSON.parse(localStorage.getItem("portfolioData"));
    const container = document.getElementById("portfolio-container");

   // Add a background image
    document.body.style.background = "url('https://tse3.mm.bing.net/th?id=OIP.7aK-TKcKlGoR8gXXiKuM7gHaEv&pid=Api&P=0&h=180') center center/cover no-repeat fixed";
    document.body.style.overflowX = "hidden";
    container.innerHTML = `
        <div style="text-align: center; padding: 20px; background: linear-gradient(to right, #4facfe, #00f2fe); color: white; border-radius: 10px;">
            <h1 style="font-size: 36px; font-weight: bold; margin: 0; animation: fadeIn 2s;">Welcome to My Portfolio</h1>
        </div>

        <!-- Profile Photo and Summary -->
        <div style="display: flex; align-items: center; gap: 20px; margin: 20px 0; background: #f4f4f4; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
            <div style="flex: 1; display: flex; justify-content: center; align-items: center;">
                <img src="${data.profilePhoto}" alt="Profile Photo" 
                     style="width: 200px; height: 200px; border-radius: 50%; object-fit: cover; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3); transition: transform 0.3s; border: 8px solid #4facfe;">
            </div>
            <div style="flex: 2;">
                <h1 style="margin-bottom: 10px; font-size: 28px; font-weight: bold; color: #333;">${data.introName}</h1>
                <p style="font-size: 18px; color: #555; line-height: 1.6;">${data.summary}</p>
            </div>
        </div>

<h2 style="margin-top: 30px; font-size: 24px; color: #444; text-align: center; background: #e0f7fa; padding: 10px; border-radius: 10px;">Social Links</h2>
<ul style="list-style: none; padding: 0; display: flex; justify-content: center; gap: 15px;">
    ${Object.entries(data.socialLinks)
        .map(
            ([platform, url]) => {
                let iconUrl = '';
                switch (platform.toLowerCase()) {
                    case 'gmail':
                        iconUrl = 'https://tse2.mm.bing.net/th?id=OIP.loCwsn7u3iAGhlFClCumdgHaHa&pid=Api&P=0&h=180';
                        break;
                    case 'instagram':
                        iconUrl = 'https://tse1.mm.bing.net/th?id=OIP.c13aaIgKOFzozFvk88X81gHaHZ&pid=Api&P=0&h=180';
                        break;
                    case 'linkedin':
                        iconUrl = 'https://tse2.mm.bing.net/th?id=OIP.VJhVCn_KEP55vMgXH9jepwHaHY&pid=Api&P=0&h=180';
                        break;
                    case 'github':
                        iconUrl = 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg';
                        break;
                    default:
                        iconUrl = 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Question_mark.svg';
                        break;
                }
                return `
                    <li style="transition: transform 0.3s;">
                        <a href="${url}" target="_blank" 
                           style="text-decoration: none; color: #007bff; font-size: 18px; display: flex; align-items: center; gap: 8px;">
                            <img src="${iconUrl}" alt="${platform} Icon" style="width: 25px; height: 25px; transition: transform 0.3s;"> ${platform}
                        </a>
                    </li>
                `;
            })
        .join("")}
</ul>


    <!-- Sections with Charts -->
<div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #f5f7fa, #c3cfe2); border-radius: 15px; box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);">
    <!-- Skills Section -->
    <div style="flex: 1; text-align: center; background: linear-gradient(135deg, #00c6ff, #0072ff); padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);">
        <h2 style="font-size: 24px; color: #fff; text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);">Skills</h2>
        <div style="width: 300px; height: 300px; margin: 0 auto; position: relative;">
            <canvas id="skillsChart"></canvas>
        </div>
    </div>

    <!-- Education Section -->
    <div style="flex: 1; text-align: center; background: linear-gradient(135deg, #ff9a9e, #fad0c4); padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);">
        <h2 style="font-size: 24px; color: #444; text-shadow: 1px 1px 3px rgba(255, 255, 255, 0.5);">Education</h2>
        <div style="width: 550px; height: 300px; margin: 0 auto; position: relative;">
            <canvas id="educationChart"></canvas>
        </div>
    </div>
</div>

<!-- Achievements and Internships -->
<div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #c2e59c, #64b3f4); border-radius: 15px; box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);">
    <!-- Achievements Section -->
    <div style="flex: 1; text-align: center; background: linear-gradient(135deg, #fbc2eb, #a6c1ee); padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);">
        <h2 style="font-size: 24px; color: #fff; margin-bottom: 25px; font-family: 'Arial', sans-serif; text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);">
            Achievements
        </h2>
        <div style="width: 350px; height: 350px; margin: 0 auto; position: relative;">
            <canvas id="achievementsChart"></canvas>
        </div>
    </div>

    <!-- Internships Section -->
    <div style="flex: 1; text-align: center; background: linear-gradient(135deg, #89f7fe, #66a6ff); padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);">
        <h2 style="font-size: 24px; color: #fff; margin-bottom: 25px; font-family: 'Arial', sans-serif; text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);">
            Internships
        </h2>
        <div style="width: 350px; height: 350px; margin: 0 auto; position: relative;">
            <canvas id="internshipsChart"></canvas>
        </div>
    </div>
</div>

<!-- Certifications and Projects in separate rows -->
<div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 40px; margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #f3ec10, #af4210); border-radius: 15px; box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); color: white;">
    <!-- Certifications Section -->
    <div style="flex: 1; text-align: center; padding: 30px; background: linear-gradient(135deg, #8e9eab, #eef2f3); border-radius: 12px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);">
        <h2 style="font-size: 24px; color: #333; margin-bottom: 25px; font-family: 'Arial', sans-serif; text-shadow: 1px 1px 3px rgba(255, 255, 255, 0.8);">
            Certifications
        </h2>
        <div style="width: 100%; max-width: 350px; height: 350px; margin: 0 auto; position: relative;">
            <canvas id="certificationsChart"></canvas>
        </div>
    </div>

    <!-- Projects Section -->
    <div style="flex: 1; text-align: center; padding: 30px; background: linear-gradient(135deg, #ff9966, #ff5e62); border-radius: 12px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);">
        <h2 style="font-size: 24px; color: #fff; margin-bottom: 25px; font-family: 'Arial', sans-serif; text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);">
            Projects
        </h2>
        <div style="width: 100%; max-width: 350px; height:350px; margin: 0 auto; position: relative;">
            <canvas id="projectsChart"></canvas>
        </div>
    </div>
</div>

       
  <button id="generate-link" style="margin: 20px auto; display: block; padding: 10px 20px; font-size: 16px; background-color: #4facfe; color: white; border: none; border-radius: 5px; cursor: pointer;">Generate Link</button>
        <div id="link-container" style="text-align: center; margin-top: 20px;"></div>
     
    `;

    // Add animations for elements on scroll
    const sections = document.querySelectorAll("div");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.transform = "scale(1.05)";
                    entry.target.style.transition = "transform 0.5s";
                } else {
                    entry.target.style.transform = "scale(1)";
                }
            });
        },
        { threshold: 0.2 }
    );
    sections.forEach((section) => observer.observe(section));

    // Add transitions for profile pic
    const profilePic = document.querySelector("img");
    profilePic.addEventListener("mouseenter", () => {
        profilePic.style.transform = "rotate(360deg) scale(1.1)";
    });
    profilePic.addEventListener("mouseleave", () => {
        profilePic.style.transform = "rotate(0deg) scale(1)";
    });

// Render Skills Chart
    const skillsCtx = document.getElementById("skillsChart").getContext("2d");
    new Chart(skillsCtx, {
        type: "doughnut",
        data: {
            labels: data.skills,
            datasets: [
                {
                    data: data.skills.map(() => Math.random() * 100),
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
                },
            ],
        },
        options: {
            maintainAspectRatio: true,
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
            },
        },
    });

    // Render Bar Graph for Education Progress
    const educationData = JSON.parse(localStorage.getItem("educationData")) || {
        percentages: [50, 75, 90],
        labels: ["School", "College", "University"],
    };
    const educationCtx = document.getElementById("educationChart").getContext("2d");
    renderEducationChart(educationCtx, educationData);

    // Render Achievements Chart
    const achievementsCtx = document.getElementById("achievementsChart").getContext("2d");
    const achievements = data.achievements.split(",").map(achievement => achievement.trim());
    const achievementsData = {
        labels: achievements,
        datasets: [
            {
                data: achievements.map(() => Math.random() * 100),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FF9F40"],
            },
        ],
    };
    new Chart(achievementsCtx, {
        type: "pie",
        data: achievementsData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
            },
        },
    });

    // Render Internships Doughnut Chart
    const internshipsCtx = document.getElementById("internshipsChart").getContext("2d");
    const internships = data.internships.split(",").map(internship => internship.trim());
    const internshipsData = {
        labels: internships,
        datasets: [
            {
                data: internships.map(() => Math.random() * 100),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FF9F40"],
            },
        ],
    };
    new Chart(internshipsCtx, {
        type: "doughnut",
        data: internshipsData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
            },
        },
    });

    // Render Certifications Pie Chart
    const certificationsCtx = document.getElementById("certificationsChart").getContext("2d");
    const certifications = data.certifications.split(",").map(certification => certification.trim());
    const certificationsData = {
        labels: certifications,
        datasets: [
            {
                data: certifications.map(() => Math.random() * 100),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FF9F40"],
            },
        ],
    };
    new Chart(certificationsCtx, {
        type: "pie",
        data: certificationsData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
            },
        },
    });

    // Render Projects Doughnut Chart
    const projectsCtx = document.getElementById("projectsChart").getContext("2d");
    const projects = data.projects.split(",").map(project => project.trim());
    const projectsData = {
        labels: projects,
        datasets: [
            {
                data: projects.map(() => Math.random() * 100),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FF9F40"],
            },
        ],
    };
    new Chart(projectsCtx, {
        type: "doughnut",
        data: projectsData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
            },
        },
    });

    function renderEducationChart(ctx, data) {
        if (window.educationChart && typeof window.educationChart.destroy === "function") {
            window.educationChart.destroy();
        }
        window.educationChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: "Education Progress (%)",
                        data: data.percentages,
                        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Education Levels",
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Progress (%)",
                        },
                        beginAtZero: true,
                        max: 100,
                    },
                },
            },
        });


    }

    // Generate Link functionality
  const generateLinkButton = document.getElementById("generate-link");

if (generateLinkButton) {
    generateLinkButton.addEventListener("click", function() {
        // Replace this with your custom public URL once your portfolio is deployed
        const portfolioUrl = "https://t-sashi-pavan.github.io/portfoliogenerator/portfolio.html";  // Example public URL from GitHub Pages or any platform
        const linkContainer = document.getElementById("link-container");
        linkContainer.innerHTML = `
            <p style="font-size: 18px;">Your portfolio link: <a href="${portfolioUrl}" target="_blank" style="color: #007bff;">${portfolioUrl}</a></p>
        `;
    });
} else {
    console.error("Generate Link button not found!");
}


});
