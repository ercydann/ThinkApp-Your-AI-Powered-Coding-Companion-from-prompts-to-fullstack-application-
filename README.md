# ThinkApp: Your AI-Powered Coding Companion

ThinkApp is a micro SaaS application designed to revolutionize the way developers interact with code. Inspired by the groundbreaking Bolt.New project by TubeGuruji, and powered by cutting-edge AI, ThinkApp is your ultimate coding companion.

Whether you're a seasoned developer or just starting out, ThinkApp streamlines your workflow, making coding faster, smarter, and more enjoyable.

## Features That Empower You

🤖 **AI-Powered Code Generation**: Harness the power of Google's Gemini AI to convert your ideas into functional code. Simply describe what you want, and watch as ThinkApp generates code snippets or even entire project structures for you.

💬 **Intelligent AI Chat Assistant**: Engage in conversation with the AI to get coding advice, explanations, or help with debugging.

🖥 **Interactive Workspace**: Work within a user-friendly environment where you can edit code, converse with the AI, and visualize your projects instantly.

💻 **Live Code Preview**: Utilize Sandpack to get a real-time, interactive code editing and preview environment that updates as you type.

💰 **Flexible Pricing**: ThinkApp offers plans tailored to your needs, including a free tier for casual users and premium plans for power users, ensuring everyone can benefit from its features.

🔒 **Secure Authentication**: Secure and straightforward login experience with Google OAuth, keeping your projects safe and accessible only to you.

💳 **Seamless Payments**: Upgrade your plan effortlessly with our integrated PayPal payment system, handling all transactions securely.

💾 **Persistent Storage**: Your work is important. With Convex, your projects are saved and accessible across all your sessions, from any device.

🎨 **Customizable Themes and Settings**: Personalize your workspace with customizable themes and settings to suit your coding style.

🌐 **Cross-Platform Accessibility**: Access ThinkApp from any device with a web browser. It's cloud-based, so there's nothing to install.

## 🌐 Live Demo  
Ready to experience ThinkApp in action? Check out our live demo:  
👉 [Live Demo](https://bolt-clone-2.vercel.app)

## 🛠 Technologies Powering ThinkApp
ThinkApp is built with a modern stack designed for performance, scalability, and an excellent developer experience:

- **Next.js**: For building server-side rendered, SEO-friendly, and highly performant React applications.
- **React**: The core of our UI, providing a declarative and component-based approach to building interfaces.
- **Tailwind CSS**: A utility-first CSS framework that allows for rapid and custom UI development without leaving your HTML.
- **Convex**: Our backend platform of choice for seamless data storage, real-time updates, and serverless functions.
- **Google Generative AI**: Brings advanced AI capabilities, including natural language processing and code generation, to your fingertips.
- **Sandpack**: Enables live, interactive code editing and preview capabilities.
- **PayPal API**: For secure and straightforward payment processing, making plan upgrades a breeze.
- **Lucide React**: A library of beautiful, open-source icons to enhance the visual appeal of your projects.

## 🚀 Getting Started: Your Journey with ThinkApp
Embarking on your ThinkApp journey is easy. Follow these steps to get started:

### 1. Clone the Repository
```sh
git clone https://github.com/nasserml/thinkapp.git
cd thinkapp
```

### 2. Install Dependencies
You can use npm, yarn, pnpm, or bun to install the required packages:
```sh
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Set Up Environment Variables
Create a `.env` file at the root of the project and populate it with your API keys and configuration details. Refer to `.env.example` for the structure.
```sh
NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID=<your_google_auth_client_id>
CONVEX_DEPLOYMENT=<your_convex_deployment>
NEXT_PUBLIC_CONVEX_URL=<your_convex_url>
NEXT_PUBLIC_GEMINI_API_KEY=<your_gemini_api_key>
NEXT_PUBLIC_PAYPAL_CLIENT_ID=<your_paypal_client_id>
```
**Note:** You'll need to obtain API keys from the respective services.

### 4. Launch the Development Server
Start the development server:
```sh
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure
```
thinkapp/
├── app/                   # Main application logic
│   ├── (main)/            # Main app routes and layouts
│   │   ├── pricing/       # Pricing page
│   │   └── workspace/     # Workspace page for projects
│   ├── api/               # API routes
│   │   ├── ai-chat/       # AI chat API endpoint
│   │   └── gen-ai-code/   # Code generation API endpoint
│   ├── ConvexClientProvider.jsx # Convex provider setup
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   └── provider.jsx       # Global state providers
├── components/            # Reusable UI components
│   ├── custom/            # Custom application-specific components
│   └── ui/                # Shadcn UI components
├── configs/               # Configuration for AI models and other settings
├── context/               # React context for global state
├── convex/                # Convex backend functions
│   ├── schema.js          # Database schema
│   ├── users.js           # User-related database operations
│   ├── workspace.js       # Workspace-related database operations
│   └── _generated/        # Auto-generated Convex files
├── data/                  # Static data (prompts, lookups, colors)
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── public/                # Public assets (images, icons)
├── .env.example           # Example environment variables
├── components.json        # Shadcn UI components configuration
├── jsconfig.json          # JavaScript configuration
├── next.config.mjs        # Next.js configuration
├── package.json           # Project dependencies and scripts
├── postcss.config.mjs     # PostCSS configuration
└── tailwind.config.mjs    # Tailwind CSS configuration
```
