<script setup>
import { ref, onMounted } from 'vue';

// State
const drawer = ref(false);
const skills = ref([
    '.NET Core & ASP.NET Core', 'Go (Golang)', 'RESTful APIs', 'Microservices',
    'Docker & Kubernetes', 'PostgreSQL & SQL Server', 'Redis', 'RabbitMQ / Kafka',
    'CI/CD & DevOps', 'Git', 'Cloud (AWS/Azure)', 'Agile Methodologies'
]);
const posts = ref([]);
const loading = ref(true);
const error = ref(null);

// IMPORTANT: Replace 'purejoymind' with your actual dev.to username
const devToUsername = 'purejoymind';

// Methods
const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    drawer.value = false; // Close drawer on navigation
};

const fetchDevToPosts = async () => {
    try {
        const response = await fetch(`https://dev.to/api/articles?username=${devToUsername}&per_page=6`);
        if (!response.ok) {
            throw new Error(`Failed to fetch posts. Status: ${response.status}`);
        }
        posts.value = await response.json();
    } catch (err) {
        error.value = err.message || 'An error occurred while fetching blog posts.';
        console.error(err);
    } finally {
        loading.value = false;
    }
};

// Lifecycle Hooks
onMounted(() => {
    fetchDevToPosts();
});
</script>

<template>
  <v-app theme="dark">
    <!-- App Bar with new dark color -->
    <v-app-bar app color="#111827" flat>
        <v-container class="mx-auto d-flex align-center">
            <v-toolbar-title class="font-weight-bold text-xl">Mazdak Parnian</v-toolbar-title>
            <v-spacer></v-spacer>
            <div class="hidden md:flex">
                <v-btn text @click="scrollTo('home')">Home</v-btn>
                <v-btn text @click="scrollTo('about')">About</v-btn>
                <v-btn text @click="scrollTo('skills')">Skills</v-btn>
                <v-btn text @click="scrollTo('blog')">Blog</v-btn>
                <v-btn text @click="scrollTo('contact')">Contact</v-btn>
            </div>
            <v-app-bar-nav-icon class="md:hidden" @click="drawer = !drawer"></v-app-bar-nav-icon>
        </v-container>
    </v-app-bar>

    <!-- Navigation Drawer with a complementary dark color -->
    <v-navigation-drawer v-model="drawer" app temporary right color="#1F2937">
        <v-list>
            <v-list-item @click="scrollTo('home')"><v-list-item-title>Home</v-list-item-title></v-list-item>
            <v-list-item @click="scrollTo('about')"><v-list-item-title>About</v-list-item-title></v-list-item>
            <v-list-item @click="scrollTo('skills')"><v-list-item-title>Skills</v-list-item-title></v-list-item>
            <v-list-item @click="scrollTo('blog')"><v-list-item-title>Blog</v-list-item-title></v-list-item>
            <v-list-item @click="scrollTo('contact')"><v-list-item-title>Contact</v-list-item-title></v-list-item>
        </v-list>
    </v-navigation-drawer>

    <!-- Main content area with the primary dark background -->
    <v-main class="bg-primary-dark">
        <!-- Home Section -->
        <section id="home" class="h-[80vh] flex items-center">
            <v-container class="mx-auto">
                <v-row align="center" justify="center">
                    <v-col cols="12" md="8" class="text-center">
                        <h1 class="text-4xl md:text-6xl font-bold mb-4">Backend Engineer</h1>
                        <h2 class="text-2xl md:text-4xl font-semibold mb-6">Building <span class="text-gradient">Scalable</span> & <span class="text-gradient">Maintainable</span> Software</h2>
                        <p class="text-lg text-slate-300 mb-8 max-w-3xl mx-auto">
                            Specializing in .NET and Go to create robust, high-performance backend systems and APIs that power modern web applications.
                        </p>
                        <v-btn color="teal-accent-4" size="large" @click="scrollTo('contact')">Get In Touch</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </section>

        <!-- About Section -->
        <section id="about" class="section bg-secondary-dark">
            <v-container class="mx-auto">
                <h2 class="section-title text-center text-white">About Me</h2>
                <v-row align="center" justify="center">
                    <v-col cols="12" md="8">
                        <v-card class="p-6 bg-transparent" flat>
                            <p class="text-lg text-slate-300 leading-relaxed">
                                I am a results-driven Backend Engineer with a passion for architecting and developing clean, efficient, and scalable software solutions. With extensive experience in <strong class="text-white">.NET</strong> and a growing expertise in <strong class="text-white">Go (Golang)</strong>, I thrive on tackling complex challenges and building systems that are not only powerful but also easy to maintain and extend.
                            </p>
                            <p class="text-lg text-slate-300 leading-relaxed mt-4">
                                My philosophy revolves around writing pragmatic, testable code and leveraging modern design patterns, including microservices and domain-driven design. I am committed to continuous learning and applying best practices to deliver high-quality software that meets business needs and provides a seamless user experience.
                            </p>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </section>

        <!-- Skills Section -->
        <section id="skills" class="section bg-primary-dark">
            <v-container class="mx-auto">
                <h2 class="section-title text-center text-white">My Specialties</h2>
                <div class="max-w-4xl mx-auto text-center">
                    <v-chip v-for="skill in skills" 
                            :key="skill" 
                            style="margin: 0.4rem" 
                            color="cyan-darken-2" 
                            label 
                            size="large" 
                            class="skill-chip">
                        {{ skill }}
                    </v-chip>
                </div>
            </v-container>
        </section>

        <!-- Blog Section -->
        <section id="blog" class="section bg-secondary-dark">
            <v-container class="mx-auto">
                <h2 class="section-title text-center text-white">My Blog Posts</h2>
                <p class="text-center text-slate-300 mb-8">Articles from my dev.to profile.</p>
                
                <div v-if="loading" class="text-center">
                    <v-progress-circular indeterminate color="teal-accent-4"></v-progress-circular>
                    <p class="mt-4">Fetching latest posts...</p>
                </div>

                <div v-if="error" class="text-center">
                    <p class="text-red-lighten-2">{{ error }}</p>
                </div>

                <v-row v-if="!loading && !error">
                    <v-col v-for="post in posts" :key="post.id" cols="12" md="6" lg="4">
                        <v-card :href="post.url" target="_blank" class="h-full flex flex-col blog-card" color="#1F2937" flat>
                            <v-img :src="post.cover_image || 'https://placehold.co/600x400/1f2937/4b5563?text=.'" height="200px" cover></v-img>
                            <v-card-title class="font-bold">{{ post.title }}</v-card-title>
                            <v-card-text class="flex-grow text-slate-300">{{ post.description }}</v-card-text>
                            <v-card-actions class="p-4">
                                <div class="d-flex flex-wrap ga-2">
                                    <v-chip v-for="tag in post.tag_list" :key="tag" size="small" variant="outlined">#{{tag}}</v-chip>
                                </div>
                                <v-spacer></v-spacer>
                                <div class="d-flex align-center mr-2">
                                    <v-icon size="small" color="pink-lighten-2">mdi-heart</v-icon>
                                    <span class="text-sm ml-1">{{ post.public_reactions_count }}</span>
                                </div>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </section>

        <!-- Footer -->
        <footer id="contact" class="section bg-primary-dark text-white">
            <v-container class="mx-auto text-center">
                <h2 class="text-3xl font-bold mb-4">Let's Connect</h2>
                <p class="text-slate-300 mb-6">Feel free to reach out for collaborations or just a friendly chat.</p>
                <div class="mb-6">
                    <v-btn href="mailto:mazdak.parniandg@gmail.com" class="mx-2" icon><v-icon>mdi-email</v-icon></v-btn>
                    <v-btn href="https://github.com/purejoymind" target="_blank" class="mx-2" icon><v-icon>mdi-github</v-icon></v-btn>
                    <v-btn href="https://linkedin.com/in/mazdak-parniandg" target="_blank" class="mx-2" icon><v-icon>mdi-linkedin</v-icon></v-btn>
                    <v-btn href="https://dev.to/purejoymind" target="_blank" class="mx-2" icon><v-icon>mdi-dev-to</v-icon></v-btn>
                </div>
                <p class="text-slate-400 text-sm">&copy; {{ new Date().getFullYear() }} Mazdak Parnian Dargahi. All Rights Reserved.</p>
            </v-container>
        </footer>
    </v-main>
  </v-app>
</template>

<style scoped>
/* Define the new dark theme background colors */
.bg-primary-dark {
    background-color: #111827; /* A deep, dark blue-gray */
}
.bg-secondary-dark {
    background-color: #1F2937; /* A slightly lighter slate color for contrast */
}

/* Define text colors for better readability */
.text-slate-300 {
    color: #d1d5db;
}
.text-slate-400 {
    color: #9ca3af;
}

.section {
    padding: 80px 0;
}
.section-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

/* New vibrant gradient for headlines */
.text-gradient {
    background: linear-gradient(to right, #2DD4BF, #818CF8); /* Teal to Indigo */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* Styling for the skill chips with a new glow effect */
.skill-chip {
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  border: 1px solid transparent;
}

.skill-chip:hover {
  transform: translateY(-6px) scale(1.05);
  border-color: rgba(45, 212, 191, 0.8); /* Teal border */
  /* A vibrant teal glow */
  box-shadow: 0 0 15px rgba(20, 184, 166, 0.7),   /* Inner glow */
              0 0 25px rgba(20, 184, 166, 0.5),   /* Middle glow */
              0 0 40px rgba(20, 184, 166, 0.2);  /* Outer glow */
}

/* Style for blog cards */
.blog-card {
    border-radius: 1rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid #374151; /* Subtle border */
}

.blog-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
    border-color: #14B8A6; /* Highlight with accent color on hover */
}
</style>
