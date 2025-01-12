document.getElementById("submit-btn").addEventListener("click", function () {
    const profilePhotoInput = document.getElementById("profile-photo");
    const introName = document.getElementById("intro-name")?.value || "";
    const summary = document.getElementById("summary")?.value || "";
    const socialLinks = {
        GitHub: document.getElementById("github")?.value || "",
        LinkedIn: document.getElementById("linkedin")?.value || "",
        Gmail: document.getElementById("gmail")?.value || "",
        Instagram: document.getElementById("instagram")?.value || "",
    };
    const skills = document.getElementById("skills")?.value.split(",").map(skill => skill.trim()) || [];
    const achievements = document.getElementById("achievements")?.value || "";

    // Education data handling
    const schoolName = document.getElementById("school-level").value;
    const schoolPercentage = document.getElementById("school-percentage").value;
    
    const collegeName = document.getElementById("college-level").value;
    const collegePercentage = document.getElementById("college-percentage").value;
    
    const universityName = document.getElementById("university-level").value;
    const universityPercentage = document.getElementById("university-percentage").value;

    // Ensure all fields are filled
    if (!schoolName || !collegeName || !universityName || !schoolPercentage || !collegePercentage || !universityPercentage) {
        alert("Please enter valid names and percentages for all education levels.");
        return;
    }

    // Save the education data to localStorage
    const educationData = {
        labels: [schoolName, collegeName, universityName],
        percentages: [schoolPercentage, collegePercentage, universityPercentage],
    };
    localStorage.setItem("educationData", JSON.stringify(educationData));

    // Ensure profile photo is uploaded
    if (!profilePhotoInput?.files[0]) {
        alert("Please upload a profile photo.");
        return;
    }

    // Read the uploaded profile photo
    const reader = new FileReader();
    reader.onload = function (event) {
        const profilePhoto = event.target.result; // Base64 URL of the image

        // Store all form data in localStorage
        const portfolioData = {
            profilePhoto,
            introName,
            summary,
            socialLinks,
            skills,
            achievements,
            education: educationData, // Save the education data here
            internships: document.getElementById("internships")?.value || "",
            projects: document.getElementById("projects")?.value || "",
            certifications: document.getElementById("certifications")?.value || "",
        };
        localStorage.setItem("portfolioData", JSON.stringify(portfolioData));
        window.location.href = "portfolio.html";
    };

    reader.readAsDataURL(profilePhotoInput.files[0]); // Read the file as a data URL
});
