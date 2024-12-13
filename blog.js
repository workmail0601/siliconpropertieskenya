// Fetch blog posts from blog.json
async function fetchBlogPosts() {
    try {
        const response = await fetch('blog.json');
        if (!response.ok) throw new Error("Failed to fetch blog posts");
        const posts = await response.json();
        displayBlogPosts(posts);
    } catch (error) {
        console.error("Error fetching blog posts:", error);
    }
}

// Display blog posts in the blog list
function displayBlogPosts(posts) {
    const blogList = document.getElementById("blog-list");
    blogList.innerHTML = ""; // Clear existing content

    posts.forEach(post => {
        const blogItem = document.createElement("div");
        blogItem.className = "blog-item";

        blogItem.innerHTML = `
            <div class="blog-header">
                <img src="${post.image}" alt="${post.title}" class="blog-image">
                <h2>${post.title}</h2>
                <p>${post.excerpt}</p>
                <p class="blog-date">${new Date(post.date).toLocaleDateString()}</p>
                <button class="read-more" data-id="${post.id}">Read More</button>
            </div>
            <div class="blog-full-content" id="full-content-${post.id}" style="display: none;">
                <p>${post.fullContent}</p>
            </div>
        `;

        blogList.appendChild(blogItem);
    });

    // Add event listeners for "Read More" and "Show Less" buttons
    document.querySelectorAll(".read-more").forEach(button => {
        button.addEventListener("click", (e) => {
            const postId = e.target.getAttribute("data-id");
            toggleFullContent(postId);
        });
    });
}

// Toggle the visibility of the full content
function toggleFullContent(postId) {
    const fullContent = document.getElementById(`full-content-${postId}`);
    const button = document.querySelector(`.read-more[data-id="${postId}"]`);

    // If the content is currently hidden, show it and change the button text
    if (fullContent.style.display === "none") {
        // Collapse all open full content sections
        document.querySelectorAll(".blog-full-content").forEach(section => {
            section.style.display = "none";
        });

        // Reset all buttons to "Read More"
        document.querySelectorAll(".read-more").forEach(btn => {
            btn.textContent = "Read More";
        });

        // Expand the clicked full content section
        fullContent.style.display = "block";
        button.textContent = "Show Less";
    } else {
        // Collapse the full content section and change the button text
        fullContent.style.display = "none";
        button.textContent = "Read More";
    }
}

// Initialize blog page
document.addEventListener("DOMContentLoaded", fetchBlogPosts);
