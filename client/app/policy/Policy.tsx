import React from 'react';

type Props = {};

const Policy = (props: Props) => {
    return (
        <div className="min-h-screen  text-gray-800 dark:text-gray-200 py-10 px-6">
            <div className="max-w-4xl mx-auto  p-8 rounded-lg shadow-lg">
                {/* Header Section */}
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
                    Our Policies
                </h1>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
                    Welcome to our policy page. Below you’ll find detailed information
                    about our terms, privacy practices, and refund policy.
                </p>
                {/* Privacy Policy */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                        Privacy Policy
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        We value your privacy and are committed to protecting your personal
                        information. Our platform collects data such as your name, email
                        address, and usage patterns to provide a better learning experience.
                        This data is never shared with third parties without your consent.
                    </p>
                    <ul className="list-disc list-inside mt-4 text-gray-700 dark:text-gray-300">
                        <li>
                            Data is stored securely and used solely for improving our
                            services.
                        </li>
                        <li>
                            You have the right to access, update, or delete your personal
                            information.
                        </li>
                        <li>
                            Cookies are used to enhance your browsing experience but can be
                            disabled via your browser settings.
                        </li>
                    </ul>
                </section>
                {/* Terms of Use */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                        Terms of Use
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        By accessing and using our platform, you agree to the following
                        terms:
                    </p>
                    <ol className="list-decimal list-inside mt-4 text-gray-700 dark:text-gray-300">
                        <li>
                            The content provided is for personal use only and cannot be
                            redistributed without permission.
                        </li>
                        <li>
                            Users must not engage in any activity that compromises the
                            platform’s security or integrity.
                        </li>
                        <li>
                            Accounts may be suspended for violating community guidelines or
                            misusing the platform.
                        </li>
                    </ol>
                </section>
                {/* Refund Policy */}
                <section>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                        Refund Policy
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        We strive to ensure customer satisfaction, and our refund policy
                        reflects this commitment:
                    </p>
                    <ul className="list-disc list-inside mt-4 text-gray-700 dark:text-gray-300">
                        <li>
                            Refund requests must be made within 14 days of purchase for
                            eligible courses.
                        </li>
                        <li>
                            Refunds are not applicable for completed or heavily used courses.
                        </li>
                        <li>
                            All refund requests are subject to review and approval.
                        </li>
                    </ul>
                </section>
                {/* Footer Section */}
                <div className="mt-8 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                        For further assistance or questions about our policies, please
                        contact us at{' '}
                        <a
                            href="mailto:support@elearningplatform.com"
                            className="text-blue-500 dark:text-blue-300 underline"
                        >
                            support@elearningplatform.com
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Policy;
