import React from 'react'

type Plan = {
    title: string
    price: string
    description: string
    features: string[]
    actionText: string
}

const plans: Plan[] = [
    {
        title: "Beginner Class",
        price: "Free",
        description: "Perfect for newcomers who want to start from scratch.",
        features: ["Basics Computer skill","Html","Css", "Intro to JavaScript", "Weekly Q&A"],
        actionText: "Join Free",
    },
    {
        title: "Full Stack Bootcamp",
        price: "$199/month",
        description:
            "Master frontend, backend, DevOps, and more. This program is built to get you hired.",
        features: [
            "Live Classes",
            "HTML, CSS, JS, React, Node.js",
            "Backend with Express & Databases",
            "CI/CD, Docker, Cloud Deployment",
            "DSA, Coding, Problem Solving",
            "Live Doubt Sessions",
            "1:1 Mentorship",
            "Job Prep & Resume Reviews",
            "Linkedin Post Creation",
            "Interview Preparation",
        ],
        actionText: "Enroll Now",
    },
    {
        title: "Mentorship Program",
        price: "$100/month",
        description: "Learn with guidance, feedback & regular mentorship.",
        features: [
            "Live Mentorship", 
            "Real Projects", 
            "Code Reviews",
            "Linkedin Post Creation",
            "Interview Preparation",
            "DSA, Coding, Problem Solving",
            "Live Classes",
            "1:1 Mentorship",
            "Job Prep & Resume Reviews",
        ],
        actionText: "Start Mentorship",
    },
]


const LiveClassCard = () => {
    return (
        <div className="w-[80%] mx-auto mt-10 mb-10">
            <h1 className="text-3xl font-bold mb-8 text-center">Our Classes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
                {plans.map((plan, idx) => (
                    <div
                        key={idx}
                        className="border rounded-xl p-6 bg-white dark:bg-black shadow-sm hover:shadow-md transition"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xl font-semibold">{plan.title}</span>
                            <span className="text-sm font-medium bg-muted px-3 py-1 rounded-full text-primary">
                                {plan.price}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                            {plan.description}
                        </p>
                        <ul className="space-y-2 text-sm mb-6">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <svg
                                        className="w-5 h-5 text-green-500 shrink-0"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <button className="w-full dark:text-black  bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition">
                            {plan.actionText}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LiveClassCard
